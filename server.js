// ===== HoweduBridge Server =====
const express = require('express');
const multer = require('multer');
const path = require('path');
const { randomUUID } = require('node:crypto');
const { getDb } = require('./db/database');
const { translatePost, translateComment, translateText } = require('./services/translator');

const app = express();
const PORT = 3000;

// ===== Middleware =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ===== Multer (Image Upload) =====
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}_${randomUUID().slice(0, 8)}${ext}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('허용되지 않는 파일 형식입니다. (JPEG, PNG, GIF, WebP, PDF만 가능)'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

// ===== API Routes =====

// --- GET all posts (with optional category filter) ---
app.get('/api/posts', (req, res) => {
  try {
    const db = getDb();
    const { category, search } = req.query;

    let query = 'SELECT * FROM posts';
    const params = [];

    if (category && category !== 'all') {
      query += ' WHERE category = ?';
      params.push(category);
    }

    if (search) {
      const searchClause = category && category !== 'all' ? ' AND' : ' WHERE';
      query += `${searchClause} (title_ko LIKE ? OR title_en LIKE ? OR title_vi LIKE ? OR content_ko LIKE ? OR content_en LIKE ? OR content_vi LIKE ?)`;
      const s = `%${search}%`;
      params.push(s, s, s, s, s, s);
    }

    query += ' ORDER BY created_at DESC';

    const posts = db.prepare(query).all(...params);

    // Get comment counts
    const commentCountStmt = db.prepare('SELECT COUNT(*) as cnt FROM comments WHERE post_id = ?');
    const result = posts.map(post => ({
      id: post.id,
      category: post.category,
      lang: post.lang,
      author: post.author,
      authorInitial: post.author_initial,
      avatarColor: post.avatar_color,
      country: post.country,
      title: { ko: post.title_ko, en: post.title_en, vi: post.title_vi },
      content: { ko: post.content_ko, en: post.content_en, vi: post.content_vi },
      imageUrl: post.image_url,
      views: post.views,
      likes: post.likes,
      commentCount: commentCountStmt.get(post.id).cnt,
      createdAt: post.created_at
    }));

    res.json(result);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --- GET single post with comments ---
app.get('/api/posts/:id', (req, res) => {
  try {
    const db = getDb();
    const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    // Increment view count
    db.prepare('UPDATE posts SET views = views + 1 WHERE id = ?').run(req.params.id);

    const comments = db.prepare('SELECT * FROM comments WHERE post_id = ? ORDER BY created_at ASC').all(req.params.id);

    res.json({
      id: post.id,
      category: post.category,
      lang: post.lang,
      author: post.author,
      authorInitial: post.author_initial,
      avatarColor: post.avatar_color,
      country: post.country,
      title: { ko: post.title_ko, en: post.title_en, vi: post.title_vi },
      content: { ko: post.content_ko, en: post.content_en, vi: post.content_vi },
      imageUrl: post.image_url,
      views: post.views + 1,
      likes: post.likes,
      createdAt: post.created_at,
      comments: comments.map(c => ({
        id: c.id,
        author: c.author,
        authorInitial: c.author_initial,
        avatarColor: c.avatar_color,
        country: c.country,
        text: { ko: c.text_ko, en: c.text_en, vi: c.text_vi },
        createdAt: c.created_at
      }))
    });
  } catch (err) {
    console.error('Error fetching post:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --- CREATE post (with automatic trilingual translation & optional image) ---
app.post('/api/posts', upload.single('image'), async (req, res) => {
  try {
    const db = getDb();
    const { category, lang, author, title, content, country } = req.body;

    if (!category || !lang || !author || !title || !content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const id = `post_${Date.now()}`;
    const initial = author.charAt(0);
    const avatarColors = [
      'linear-gradient(135deg, #e85d3a, #f97b5e)',
      'linear-gradient(135deg, #14919b, #2dd4bf)',
      'linear-gradient(135deg, #2563a8, #60a5e8)',
      'linear-gradient(135deg, #d4a017, #f0c040)',
      'linear-gradient(135deg, #7c3aed, #a78bfa)',
      'linear-gradient(135deg, #059669, #34d399)',
    ];
    const avatarColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];
    const userCountry = country || (lang === 'vi' ? 'vietnam' : 'korea');
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // Automatically translate into Korean, Vietnamese, and English all at once
    let titleObj, contentObj;
    try {
      const transResult = await translatePost(title, content, lang);
      titleObj = transResult.title;
      contentObj = transResult.content;
    } catch (tErr) {
      console.warn('Translation error during post creation, using fallback:', tErr);
      titleObj = { ko: title, en: title, vi: title };
      contentObj = { ko: content, en: content, vi: content };
    }

    db.prepare(`
      INSERT INTO posts (id, category, lang, author, author_initial, avatar_color, country,
        title_ko, title_en, title_vi, content_ko, content_en, content_vi, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, category, lang, author, initial, avatarColor, userCountry,
      titleObj.ko, titleObj.en, titleObj.vi,
      contentObj.ko, contentObj.en, contentObj.vi, imageUrl);

    res.status(201).json({
      id,
      imageUrl,
      title: titleObj,
      content: contentObj
    });
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --- LIKE a post ---
app.post('/api/posts/:id/like', (req, res) => {
  try {
    const db = getDb();
    db.prepare('UPDATE posts SET likes = likes + 1 WHERE id = ?').run(req.params.id);
    const post = db.prepare('SELECT likes FROM posts WHERE id = ?').get(req.params.id);
    res.json({ likes: post ? post.likes : 0 });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --- ADD comment (with automatic trilingual translation) ---
app.post('/api/posts/:id/comments', async (req, res) => {
  try {
    const db = getDb();
    const { author, text, lang, country } = req.body;

    if (!author || !text || !lang) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const id = `comment_${Date.now()}`;
    const initial = author.charAt(0);
    const avatarColors = [
      'linear-gradient(135deg, #e85d3a, #f97b5e)',
      'linear-gradient(135deg, #14919b, #2dd4bf)',
      'linear-gradient(135deg, #2563a8, #60a5e8)',
      'linear-gradient(135deg, #d4a017, #f0c040)',
    ];
    const avatarColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];
    const userCountry = country || (lang === 'vi' ? 'vietnam' : 'korea');

    // Automatically translate comment text into ko, en, and vi
    let textObj;
    try {
      textObj = await translateComment(text, lang);
    } catch (tErr) {
      textObj = { ko: text, en: text, vi: text };
    }

    db.prepare(`
      INSERT INTO comments (id, post_id, author, author_initial, avatar_color, country,
        text_ko, text_en, text_vi)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, req.params.id, author, initial, avatarColor, userCountry,
      textObj.ko, textObj.en, textObj.vi);

    res.status(201).json({
      id,
      author,
      authorInitial: initial,
      avatarColor,
      country: userCountry,
      text: textObj,
      createdAt: new Date().toISOString()
    });
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --- TRANSLATE API (Instant standalone translation) ---
app.post('/api/translate', async (req, res) => {
  try {
    const { text, from, to } = req.body;
    if (!text || !from || !to) {
      return res.status(400).json({ error: 'text, from, to parameters required' });
    }
    const translated = await translateText(text, from, to);
    res.json({ translated });
  } catch (err) {
    res.status(500).json({ error: 'Translation failed' });
  }
});

// --- AUTH: Register ---
app.post('/api/register', (req, res) => {
  try {
    const db = getDb();
    const { username, password, name, country, role, email } = req.body;

    if (!username || !password || !name || !country || !role || !email) {
      return res.status(400).json({ error: '모든 항목을 입력해주세요.' });
    }

    // Check duplicate username
    const existing = db.prepare('SELECT id FROM users WHERE username = ?').get(username);
    if (existing) {
      return res.status(409).json({ error: '이미 사용 중인 아이디입니다.' });
    }

    const id = `user_${Date.now()}`;
    const initial = name.charAt(0);
    const avatarColors = [
      'linear-gradient(135deg, #e85d3a, #f97b5e)',
      'linear-gradient(135deg, #14919b, #2dd4bf)',
      'linear-gradient(135deg, #2563a8, #60a5e8)',
      'linear-gradient(135deg, #d4a017, #f0c040)',
      'linear-gradient(135deg, #7c3aed, #a78bfa)',
      'linear-gradient(135deg, #059669, #34d399)',
    ];
    const avatarColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];

    // Insert user
    db.prepare(`
      INSERT INTO users (id, username, password, name, country, role, email, avatar_color, initial)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, username, password, name, country, role, email, avatarColor, initial);

    // Also sync to members
    db.prepare(`
      INSERT OR REPLACE INTO members (id, name, initial, avatar_color, role_ko, role_en, role_vi, country)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, name, initial, avatarColor, role, role, role, country);

    res.status(201).json({
      id,
      username,
      name,
      country,
      role,
      email,
      initial,
      avatarColor
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: '회원가입 처리 중 오류가 발생했습니다.' });
  }
});

// --- AUTH: Login ---
app.post('/api/login', (req, res) => {
  try {
    const db = getDb();
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: '아이디와 비밀번호를 입력해주세요.' });
    }

    const user = db.prepare('SELECT * FROM users WHERE username = ? AND password = ?').get(username, password);
    if (!user) {
      return res.status(401).json({ error: '아이디 또는 비밀번호가 일치하지 않습니다.' });
    }

    res.json({
      id: user.id,
      username: user.username,
      name: user.name,
      country: user.country,
      role: user.role,
      email: user.email,
      initial: user.initial,
      avatarColor: user.avatar_color
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: '로그인 중 오류가 발생했습니다.' });
  }
});

// --- GET active members (Top 10 teachers with most posts) ---
app.get('/api/members', (req, res) => {
  try {
    const db = getDb();

    // Query top 10 authors who wrote the most posts
    const query = `
      SELECT 
        p.author AS name,
        p.author_initial AS initial,
        p.avatar_color,
        p.country,
        COALESCE(u.role, m.role_vi, m.role_ko, 'Giáo viên') AS role_vi,
        COALESCE(m.role_ko, u.role, '교사') AS role_ko,
        COALESCE(m.role_en, u.role, 'Teacher') AS role_en,
        COUNT(p.id) AS post_count
      FROM posts p
      LEFT JOIN users u ON u.name = p.author
      LEFT JOIN members m ON m.name = p.author
      WHERE p.category != 'notice'
      GROUP BY p.author
      ORDER BY post_count DESC, MAX(p.created_at) DESC
      LIMIT 10;
    `;

    const topMembers = db.prepare(query).all();

    const result = topMembers.map((m, index) => ({
      rank: index + 1,
      name: m.name,
      initial: m.initial,
      avatarColor: m.avatar_color,
      country: m.country,
      role: {
        ko: m.role_ko,
        en: m.role_en,
        vi: m.role_vi
      },
      postCount: m.post_count
    }));

    res.json(result);
  } catch (err) {
    console.error('Error fetching members:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --- POST /api/contact (Inquiries & Support) ---
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, category, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Vui lòng điền đầy đủ các thông tin bắt buộc / 필수 항목을 모두 입력해주세요.' });
    }
    const db = getDb();
    const id = `contact_${Date.now()}_${randomUUID().slice(0, 8)}`;
    db.prepare(`
      INSERT INTO contacts (id, name, email, category, subject, message)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(id, name, email, category || 'general', subject, message);

    res.json({ success: true, id, message: 'Inquiry received successfully' });
  } catch (err) {
    console.error('Contact API error:', err);
    res.status(500).json({ error: 'Lỗi gửi tin nhắn liên hệ / 문의 저장 중 오류가 발생했습니다.' });
  }
});

// --- Upload image only (standalone) ---
app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    res.json({ url: `/uploads/${req.file.filename}` });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --- Error handling for multer ---
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: '파일 크기가 10MB를 초과합니다.' });
    }
    return res.status(400).json({ error: err.message });
  }
  if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
});

// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`\n🌏 HoweduBridge Server is running!`);
  console.log(`   Local: http://localhost:${PORT}`);
  console.log(`   Database: SQLite (db/edubridge.db)`);
  console.log(`   Uploads: ./uploads/\n`);
});
