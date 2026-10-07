// ===== Database Setup (SQLite using Node.js built-in node:sqlite) =====
const { DatabaseSync } = require('node:sqlite');
const path = require('path');

const DB_PATH = path.join(__dirname, 'edubridge.db');

let db;

function getDb() {
  if (!db) {
    db = new DatabaseSync(DB_PATH);
    db.exec('PRAGMA journal_mode = WAL;');
    db.exec('PRAGMA foreign_keys = ON;');
    initTables();
    seedData();
  }
  return db;
}

function initTables() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      country TEXT NOT NULL CHECK(country IN ('vietnam','korea')),
      role TEXT NOT NULL,
      email TEXT NOT NULL,
      avatar_color TEXT NOT NULL,
      initial TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      category TEXT NOT NULL CHECK(category IN ('resource','question','discussion','notice')),
      lang TEXT NOT NULL CHECK(lang IN ('ko','en','vi')),
      author TEXT NOT NULL,
      author_initial TEXT NOT NULL,
      avatar_color TEXT NOT NULL,
      country TEXT NOT NULL CHECK(country IN ('korea','vietnam')),
      title_ko TEXT,
      title_en TEXT,
      title_vi TEXT,
      content_ko TEXT,
      content_en TEXT,
      content_vi TEXT,
      image_url TEXT,
      views INTEGER DEFAULT 0,
      likes INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS comments (
      id TEXT PRIMARY KEY,
      post_id TEXT NOT NULL,
      author TEXT NOT NULL,
      author_initial TEXT NOT NULL,
      avatar_color TEXT NOT NULL,
      country TEXT NOT NULL CHECK(country IN ('korea','vietnam')),
      text_ko TEXT,
      text_en TEXT,
      text_vi TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS members (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      initial TEXT NOT NULL,
      avatar_color TEXT NOT NULL,
      role_ko TEXT,
      role_en TEXT,
      role_vi TEXT,
      country TEXT NOT NULL CHECK(country IN ('korea','vietnam')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS contacts (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      category TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

function seedData() {
  // Check if data already exists
  const count = db.prepare('SELECT COUNT(*) as cnt FROM posts').get();
  if (count.cnt > 0) return;

  const AVATAR_COLORS = [
    'linear-gradient(135deg, #e85d3a, #f97b5e)',
    'linear-gradient(135deg, #14919b, #2dd4bf)',
    'linear-gradient(135deg, #2563a8, #60a5e8)',
    'linear-gradient(135deg, #d4a017, #f0c040)',
    'linear-gradient(135deg, #7c3aed, #a78bfa)',
    'linear-gradient(135deg, #059669, #34d399)',
    'linear-gradient(135deg, #dc2626, #f87171)',
    'linear-gradient(135deg, #9333ea, #c084fc)',
  ];

  // ===== Seed Users (10 Teachers) =====
  const insertUser = db.prepare(`
    INSERT INTO users (id, username, password, name, country, role, email, avatar_color, initial)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const seedUsers = [
    { id: 'u1', username: 'nguyen_mai', password: 'password123', name: 'Nguyễn Thị Mai', country: 'vietnam', role: 'Giáo viên Toán tiểu học', email: 'mai.nguyen@edu.vn', color: AVATAR_COLORS[0], initial: 'N' },
    { id: 'u2', username: 'kim_minsoo', password: 'password123', name: '김민수', country: 'korea', role: '고등학교 화학 교사', email: 'minsoo.kim@school.kr', color: AVATAR_COLORS[1], initial: '김' },
    { id: 'u3', username: 'tran_lan', password: 'password123', name: 'Trần Thị Lan', country: 'vietnam', role: 'Giáo viên Tiếng Hàn', email: 'lan.tran@edu.vn', color: AVATAR_COLORS[4], initial: 'T' },
    { id: 'u4', username: 'park_jiyoung', password: 'password123', name: '박지영', country: 'korea', role: '중학교 사회과 교사', email: 'jypark@school.kr', color: AVATAR_COLORS[3], initial: '박' },
    { id: 'u5', username: 'pham_duc', password: 'password123', name: 'Phạm Văn Đức', country: 'vietnam', role: 'Giáo viên Sở Giáo dục', email: 'duc.pham@edu.vn', color: AVATAR_COLORS[6], initial: 'P' },
    { id: 'u6', username: 'lee_junhyuk', password: 'password123', name: '이준혁', country: 'korea', role: '과학고 물리 교사', email: 'jh.lee@science.kr', color: AVATAR_COLORS[5], initial: '이' },
    { id: 'u7', username: 'le_hung', password: 'password123', name: 'Lê Văn Hùng', country: 'vietnam', role: 'Giáo viên Hóa học THPT', email: 'hung.le@edu.vn', color: AVATAR_COLORS[2], initial: 'L' },
    { id: 'u8', username: 'jung_suhyun', password: 'password123', name: '정수현', country: 'korea', role: '중학교 영어 교사', email: 'sh.jung@school.kr', color: AVATAR_COLORS[7], initial: '정' },
    { id: 'u9', username: 'hoang_tuan', password: 'password123', name: 'Hoàng Minh Tuấn', country: 'vietnam', role: 'Giáo viên Tin học', email: 'tuan.hoang@edu.vn', color: AVATAR_COLORS[1], initial: 'H' },
    { id: 'u10', username: 'choi_yoojin', password: 'password123', name: '최유진', country: 'korea', role: '초등학교 미술 교사', email: 'yj.choi@school.kr', color: AVATAR_COLORS[0], initial: '최' },
  ];

  db.exec('BEGIN TRANSACTION;');
  for (const u of seedUsers) {
    insertUser.run(u.id, u.username, u.password, u.name, u.country, u.role, u.email, u.color, u.initial);
  }
  db.exec('COMMIT;');

  // ===== Seed Members =====
  const insertMember = db.prepare(`
    INSERT INTO members (id, name, initial, avatar_color, role_ko, role_en, role_vi, country)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const seedMembers = [
    { id: 'm1', name: 'Nguyễn Thị Mai', initial: 'N', color: AVATAR_COLORS[0], ko: '초등학교 수학 교사', en: 'Elementary Math Teacher', vi: 'Giáo viên Toán tiểu học', country: 'vietnam' },
    { id: 'm2', name: '김민수', initial: '김', color: AVATAR_COLORS[1], ko: '고등학교 화학 교사', en: 'High School Chemistry Teacher', vi: 'Giáo viên Hóa học THPT', country: 'korea' },
    { id: 'm3', name: 'Trần Thị Lan', initial: 'T', color: AVATAR_COLORS[4], ko: '한국어 교사', en: 'Korean Language Teacher', vi: 'Giáo viên Tiếng Hàn', country: 'vietnam' },
    { id: 'm4', name: '박지영', initial: '박', color: AVATAR_COLORS[3], ko: '중학교 사회과 교사', en: 'Middle School Social Studies Teacher', vi: 'Giáo viên Xã hội THCS', country: 'korea' },
    { id: 'm5', name: 'Phạm Văn Đức', initial: 'P', color: AVATAR_COLORS[6], ko: '교육청 소속 교사', en: 'Dept. of Education Teacher', vi: 'Giáo viên Sở Giáo dục', country: 'vietnam' },
    { id: 'm6', name: '이준혁', initial: '이', color: AVATAR_COLORS[5], ko: '과학고 물리 교사', en: 'Science HS Physics Teacher', vi: 'Giáo viên Vật lý Trường Khoa học', country: 'korea' },
    { id: 'm7', name: 'Lê Văn Hùng', initial: 'L', color: AVATAR_COLORS[2], ko: '고등학교 화학 교사', en: 'High School Chemistry Teacher', vi: 'Giáo viên Hóa học THPT', country: 'vietnam' },
    { id: 'm8', name: '정수현', initial: '정', color: AVATAR_COLORS[7], ko: '중학교 영어 교사', en: 'Middle School English Teacher', vi: 'Giáo viên Tiếng Anh THCS', country: 'korea' },
    { id: 'm9', name: 'Hoàng Minh Tuấn', initial: 'H', color: AVATAR_COLORS[1], ko: '초등 정보 교사', en: 'Elementary IT Teacher', vi: 'Giáo viên Tin học', country: 'vietnam' },
    { id: 'm10', name: '최유진', initial: '최', color: AVATAR_COLORS[0], ko: '초등학교 미술 교사', en: 'Elementary Art Teacher', vi: 'Giáo viên Mỹ thuật', country: 'korea' },
  ];

  db.exec('BEGIN TRANSACTION;');
  for (const m of seedMembers) {
    insertMember.run(m.id, m.name, m.initial, m.color, m.ko, m.en, m.vi, m.country);
  }
  db.exec('COMMIT;');

  // ===== Seed Posts (Ranked by author post count) =====
  const insertPost = db.prepare(`
    INSERT INTO posts (id, category, lang, author, author_initial, avatar_color, country,
      title_ko, title_en, title_vi, content_ko, content_en, content_vi, image_url, views, likes, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const seedPosts = [
    // 1위: Nguyễn Thị Mai (총 4개)
    {
      id: 'post1', category: 'resource', lang: 'vi',
      author: 'Nguyễn Thị Mai', initial: 'N', color: AVATAR_COLORS[0], country: 'vietnam',
      title_ko: '베트남 초등학교 수학 교수법 공유합니다',
      title_en: 'Sharing Vietnamese Elementary Math Teaching Methods',
      title_vi: 'Chia sẻ phương pháp dạy Toán tiểu học Việt Nam',
      content_ko: '안녕하세요, 호치민시에서 초등학교 수학을 가르치고 있는 응우옌 교사입니다. 베트남의 초등학교 수학 교수법을 한국 선생님들과 나누고 싶어서 글을 올립니다.\n\n베트남에서는 초등학교 수학에서 시각적 교구를 많이 활용합니다. 특히 분수 개념을 가르칠 때 종이 접기를 활용한 방법이 효과적입니다.',
      content_en: 'Hello, I am Teacher Nguyen, teaching elementary school math in Ho Chi Minh City. I would like to share Vietnamese elementary school math teaching methods with Korean teachers.\n\nIn Vietnam, we extensively use visual teaching aids in elementary math. The origami method is particularly effective.',
      content_vi: 'Xin chào, tôi là giáo viên Nguyễn, đang dạy Toán tiểu học tại Thành phố Hồ Chí Minh. Tôi muốn chia sẻ phương pháp dạy Toán tiểu học của Việt Nam với các thầy cô giáo Hàn Quốc.\n\nỞ Việt Nam, chúng tôi sử dụng rộng rãi các đồ dùng dạy học trực quan trong Toán tiểu học. Phương pháp gấp giấy origami đặc biệt hiệu quả.',
      image_url: '/uploads/sample_lesson_plan.jpg',
      views: 342, likes: 45, date: '2026-10-06'
    },
    {
      id: 'post1_2', category: 'resource', lang: 'vi',
      author: 'Nguyễn Thị Mai', initial: 'N', color: AVATAR_COLORS[0], country: 'vietnam',
      title_ko: '초등 수학 놀이 학습 활동지 20종',
      title_en: '20 Math Play Learning Activity Worksheets for Elementary',
      title_vi: '20 phiếu hoạt động học Toán qua trò chơi cho tiểu học',
      content_ko: '학생들이 수학을 지루해하지 않고 놀이처럼 배울 수 있는 활동지 모음입니다.',
      content_en: 'A collection of activity sheets that allow students to learn math like a game without getting bored.',
      content_vi: 'Bộ sưu tập phiếu hoạt động giúp học sinh học Toán như một trò chơi mà không thấy nhàm chán.',
      image_url: null, views: 210, likes: 32, date: '2026-10-05'
    },
    {
      id: 'post1_3', category: 'question', lang: 'vi',
      author: 'Nguyễn Thị Mai', initial: 'N', color: AVATAR_COLORS[0], country: 'vietnam',
      title_ko: '한국 초등학교의 구구단 지도 방식이 궁금합니다',
      title_en: 'Curious about multiplication table guidance methods in Korean elementary schools',
      title_vi: 'Tò mò về phương pháp hướng dẫn bảng cửu chương ở tiểu học Hàn Quốc',
      content_ko: '한국에서는 학생들이 구구단을 몇 학년에 어떤 방식으로 완벽히 외우나요?',
      content_en: 'In Korea, in which grade and how do students master the multiplication tables?',
      content_vi: 'Ở Hàn Quốc, học sinh thuộc bảng cửu chương ở lớp mấy và bằng phương pháp nào?',
      image_url: null, views: 180, likes: 25, date: '2026-10-04'
    },
    {
      id: 'post1_4', category: 'discussion', lang: 'vi',
      author: 'Nguyễn Thị Mai', initial: 'N', color: AVATAR_COLORS[0], country: 'vietnam',
      title_ko: '수학 교구 활용 수업 후기 및 피드백 교환',
      title_en: 'Math teaching aid class review and feedback exchange',
      title_vi: 'Đánh giá tiết học sử dụng giáo cụ Toán và trao đổi phản hồi',
      content_ko: '오늘 4학년 기하 수업에서 교구를 활용해 보았습니다. 학생들의 참여도가 매우 높았습니다.',
      content_en: 'Used geometry teaching aids in 4th grade class today. Student participation was very high.',
      content_vi: 'Hôm nay tôi đã sử dụng giáo cụ trong giờ hình học lớp 4. Học sinh tham gia rất hào hứng.',
      image_url: null, views: 165, likes: 19, date: '2026-10-03'
    },

    // 2위: 김민수 (총 3개)
    {
      id: 'post2', category: 'resource', lang: 'ko',
      author: '김민수', initial: '김', color: AVATAR_COLORS[1], country: 'korea',
      title_ko: '한국 고등학교 화학 실험 안전 가이드 (베·한 대역본)',
      title_en: 'Korean High School Chemistry Lab Safety Guide (Ko-Vi Bilingual)',
      title_vi: 'Hướng dẫn an toàn phòng thí nghiệm Hóa học THPT Hàn Quốc (Song ngữ Việt-Hàn)',
      content_ko: '서울의 한 고등학교에서 화학을 담당하고 있는 김민수입니다.\n\n베트남 학교와의 교류를 위해 실험실 안전 규칙 가이드를 베트남어와 한국어로 함께 정리했습니다.',
      content_en: 'I am Kim Min-soo, teaching chemistry at a high school in Seoul.\n\nCompiled lab safety guidelines in both Vietnamese and Korean for school exchanges.',
      content_vi: 'Tôi là Kim Min-soo, phụ trách môn Hóa học tại một trường THPT ở Seoul.\n\nTôi đã tổng hợp các quy tắc an toàn phòng thí nghiệm bằng cả tiếng Việt và tiếng Hàn cho giao lưu học đường.',
      image_url: null, views: 256, likes: 38, date: '2026-10-05'
    },
    {
      id: 'post2_2', category: 'discussion', lang: 'ko',
      author: '김민수', initial: '김', color: AVATAR_COLORS[1], country: 'korea',
      title_ko: '친환경 화학 수업 아이디어 공유',
      title_en: 'Eco-friendly chemistry lesson ideas sharing',
      title_vi: 'Chia sẻ ý tưởng bài học Hóa học thân thiện với môi trường',
      content_ko: '폐식용유로 비누 만들기, 천연 지시약 실험 등 학교에서 쉽게 할 수 있는 친환경 실험들입니다.',
      content_en: 'Eco-friendly experiments like soap from used cooking oil and natural indicators.',
      content_vi: 'Các thí nghiệm thân thiện với môi trường như làm xà phòng từ dầu ăn đã qua sử dụng và chất chỉ thị tự nhiên.',
      image_url: null, views: 190, likes: 28, date: '2026-10-04'
    },
    {
      id: 'post2_3', category: 'resource', lang: 'ko',
      author: '김민수', initial: '김', color: AVATAR_COLORS[1], country: 'korea',
      title_ko: '주기율표 암기용 인터랙티브 카드 게임 자료',
      title_en: 'Interactive Card Game Materials for Periodic Table Memorization',
      title_vi: 'Tài liệu trò chơi thẻ bài tương tác ghi nhớ bảng tuần hoàn',
      content_ko: '원소 기호와 특징을 게임을 통해 익힐 수 있는 인쇄용 카드 파일입니다.',
      content_en: 'Printable card files to learn element symbols and properties through gaming.',
      content_vi: 'File thẻ in để học ký hiệu và đặc tính nguyên tố thông qua trò chơi.',
      image_url: null, views: 220, likes: 35, date: '2026-10-02'
    },

    // 3위: Trần Thị Lan (총 3개)
    {
      id: 'post4', category: 'resource', lang: 'vi',
      author: 'Trần Thị Lan', initial: 'T', color: AVATAR_COLORS[4], country: 'vietnam',
      title_ko: '베트남인을 위한 한국어 기초 플래시카드 자료',
      title_en: 'Korean Beginner Flashcard Materials for Vietnamese Learners',
      title_vi: 'Tài liệu Flashcard tiếng Hàn cơ bản cho người Việt',
      content_ko: '하노이 세종학당에서 한국어를 가르치고 있습니다. 베트남인 학습자들이 가장 헷갈려하는 한국어 자음/모음 플래시카드입니다.',
      content_en: 'Teaching Korean at King Sejong Institute Hanoi. Flashcards for consonants and vowels that Vietnamese learners often confuse.',
      content_vi: 'Tôi đang dạy tiếng Hàn tại Viện King Sejong Hà Nội. Đây là bộ flashcard phụ âm/nguyên âm mà học viên Việt Nam hay nhầm lẫn nhất.',
      image_url: null, views: 520, likes: 72, date: '2026-10-03'
    },
    {
      id: 'post4_2', category: 'question', lang: 'vi',
      author: 'Trần Thị Lan', initial: 'T', color: AVATAR_COLORS[4], country: 'vietnam',
      title_ko: 'TOPIK I 대비 말하기 지도 노하우 문의',
      title_en: 'Inquiry on Speaking Teaching Know-how for TOPIK I',
      title_vi: 'Hỏi kinh nghiệm hướng dẫn kỹ năng nói chuẩn bị cho TOPIK I',
      content_ko: '베트남 학생들의 한국어 발음 교정을 효과적으로 돕는 방법이 있을까요?',
      content_en: 'Are there effective methods to help correct Korean pronunciation for Vietnamese students?',
      content_vi: 'Có phương pháp hiệu quả nào giúp sửa phát âm tiếng Hàn cho học sinh Việt Nam không?',
      image_url: null, views: 230, likes: 31, date: '2026-10-02'
    },
    {
      id: 'post4_3', category: 'resource', lang: 'vi',
      author: 'Trần Thị Lan', initial: 'T', color: AVATAR_COLORS[4], country: 'vietnam',
      title_ko: '베트남-한국 명절 문화 비교 수업 PPT',
      title_en: 'Vietnam-Korea Traditional Holiday Culture Comparison PPT',
      title_vi: 'PPT bài giảng so sánh văn hóa ngày lễ truyền thống Việt - Hàn',
      content_ko: '설날(Tết)과 추석(Tết Trung Thu)을 주제로 양국의 문화를 비교하는 수업 슬라이드입니다.',
      content_en: 'Class slides comparing cultures of both countries focusing on Lunar New Year and Chuseok.',
      content_vi: 'Slide bài giảng so sánh văn hóa hai nước với chủ đề Tết Nguyên Đán và Tết Trung Thu.',
      image_url: null, views: 310, likes: 49, date: '2026-09-30'
    },

    // 4위: 박지영 (총 2개)
    {
      id: 'post3', category: 'question', lang: 'ko',
      author: '박지영', initial: '박', color: AVATAR_COLORS[3], country: 'korea',
      title_ko: '베트남 역사/문화 수업 자료 추천 부탁드립니다',
      title_en: 'Looking for Recommendations on Vietnamese History & Culture Teaching Materials',
      title_vi: 'Xin giới thiệu tài liệu giảng dạy Lịch sử & Văn hóa Việt Nam',
      content_ko: '중학교 사회과 교사 박지영입니다. 다문화 이해 교육의 일환으로 베트남 역사와 문화 단원을 준비하고 있습니다.',
      content_en: 'Middle school social studies teacher Park Ji-young. Preparing a unit on Vietnamese history and culture.',
      content_vi: 'Tôi là giáo viên Xã hội THCS Park Ji-young. Tôi đang chuẩn bị bài giảng về lịch sử và văn hóa Việt Nam.',
      image_url: null, views: 198, likes: 27, date: '2026-10-04'
    },
    {
      id: 'post3_2', category: 'resource', lang: 'ko',
      author: '박지영', initial: '박', color: AVATAR_COLORS[3], country: 'korea',
      title_ko: '다문화 감수성 증진을 위한 세계시민 교육 워크시트',
      title_en: 'Global Citizenship Education Worksheets for Enhancing Multicultural Sensitivity',
      title_vi: 'Phiếu học tập giáo dục công dân toàn cầu nâng cao nhận thức đa văn hóa',
      content_ko: '학생들이 아시아 이웃 국가들에 대해 편견 없이 배우도록 설계된 활동지입니다.',
      content_en: 'Worksheets designed for students to learn about neighboring Asian countries without prejudice.',
      content_vi: 'Phiếu hoạt động được thiết kế để học sinh tìm hiểu về các nước láng giềng châu Á mà không có định kiến.',
      image_url: null, views: 175, likes: 24, date: '2026-10-01'
    },

    // 5위: Phạm Văn Đức (총 2개)
    {
      id: 'post6', category: 'discussion', lang: 'vi',
      author: 'Phạm Văn Đức', initial: 'P', color: AVATAR_COLORS[6], country: 'vietnam',
      title_ko: '베트남 교육과정 개편 소식 공유합니다 (2027년 적용)',
      title_en: 'Sharing News on Vietnam Curriculum Reform (Effective 2027)',
      title_vi: 'Chia sẻ tin tức về cải cách chương trình giáo dục Việt Nam (áp dụng từ 2027)',
      content_ko: '호치민시 교육청 소속 팜 반 둑 교사입니다. 2027년부터 적용되는 베트남 교육과정 개편 내용을 공유합니다.',
      content_en: 'I am Teacher Pham Van Duc from the Ho Chi Minh City Dept of Education. Sharing curriculum reform details.',
      content_vi: 'Tôi là giáo viên Phạm Văn Đức thuộc Sở Giáo dục TP.HCM. Chia sẻ những thay đổi trong chương trình giáo dục 2027.',
      image_url: null, views: 389, likes: 43, date: '2026-10-01'
    },
    {
      id: 'post6_2', category: 'resource', lang: 'vi',
      author: 'Phạm Văn Đức', initial: 'P', color: AVATAR_COLORS[6], country: 'vietnam',
      title_ko: '베트남 초중등 디지털 리터러시 교육 가이드라인 번역본',
      title_en: 'Vietnamese Elementary & Secondary Digital Literacy Education Guidelines',
      title_vi: 'Hướng dẫn giáo dục kỹ năng số cho học sinh phổ thông Việt Nam',
      content_ko: '디지털 환경에서 교사와 학생이 지켜야 할 윤리와 활용 가이드입니다.',
      content_en: 'Ethics and application guidelines for teachers and students in digital environments.',
      content_vi: 'Quy tắc đạo đức và hướng dẫn ứng dụng kỹ thuật số cho giáo viên và học sinh.',
      image_url: null, views: 245, likes: 36, date: '2026-09-29'
    },

    // 6위: 이준혁 (총 2개)
    {
      id: 'post5', category: 'discussion', lang: 'ko',
      author: '이준혁', initial: '이', color: AVATAR_COLORS[5], country: 'korea',
      title_ko: '베-한 학생 공동 온라인 과학 프로젝트 제안합니다',
      title_en: 'Proposing a Vietnam-Korea Joint Online Science Project for Students',
      title_vi: 'Đề xuất dự án Khoa học trực tuyến chung cho học sinh Việt - Hàn',
      content_ko: '과학고등학교에서 물리를 가르치고 있는 이준혁입니다. 베트남 학생들과 한국 학생들이 온라인으로 팀을 이루어 기후변화 데이터를 분석하는 프로젝트를 기획하고 있습니다.',
      content_en: 'I am Lee Jun-hyuk teaching physics at a science high school. Planning an online collaborative project on climate change.',
      content_vi: 'Tôi là Lee Jun-hyuk dạy Vật lý tại trường THPT Khoa học. Đang lên kế hoạch dự án trực tuyến phân tích dữ liệu biến đổi khí hậu.',
      image_url: null, views: 412, likes: 58, date: '2026-10-02'
    },
    {
      id: 'post5_2', category: 'resource', lang: 'ko',
      author: '이준혁', initial: '이', color: AVATAR_COLORS[5], country: 'korea',
      title_ko: '스마트폰 센서를 활용한 물리 역학 실험 가이드',
      title_en: 'Physics Mechanics Experiment Guide Using Smartphone Sensors',
      title_vi: 'Hướng dẫn thí nghiệm cơ học Vật lý sử dụng cảm biến điện thoại thông minh',
      content_ko: '비싼 장비 없이 스마트폰의 가속도 센서로 중력가속도를 측정하는 수업 지도안입니다.',
      content_en: 'Lesson plan to measure gravitational acceleration using smartphone accelerometer sensors.',
      content_vi: 'Giáo án đo gia tốc trọng trường bằng cảm biến gia tốc trên điện thoại thông minh không cần thiết bị đắt tiền.',
      image_url: null, views: 290, likes: 41, date: '2026-09-28'
    },

    // 7위: Lê Văn Hùng (총 1개)
    {
      id: 'post7_hung', category: 'resource', lang: 'vi',
      author: 'Lê Văn Hùng', initial: 'L', color: AVATAR_COLORS[2], country: 'vietnam',
      title_ko: '베트남 고등학교 유기화학 반응식 요약표',
      title_en: 'Organic Chemistry Reaction Summary Table for Vietnamese High Schools',
      title_vi: 'Bảng tóm tắt các phản ứng Hóa học hữu cơ THPT Việt Nam',
      content_ko: '고3 대입 시험을 준비하는 학생들을 위한 유기화학 반응 정리표입니다.',
      content_en: 'Organic chemistry reaction summary sheet for 12th graders preparing for university entrance exams.',
      content_vi: 'Bảng tóm tắt phản ứng hóa học hữu cơ cho học sinh lớp 12 chuẩn bị thi tốt nghiệp và đại học.',
      image_url: null, views: 188, likes: 23, date: '2026-09-27'
    },

    // 8위: 정수현 (총 1개)
    {
      id: 'post8_jung', category: 'resource', lang: 'ko',
      author: '정수현', initial: '정', color: AVATAR_COLORS[7], country: 'korea',
      title_ko: '글로벌 펜팔 교환을 위한 영작문 템플릿',
      title_en: 'English Writing Templates for Global Pen Pal Exchange',
      title_vi: 'Mẫu viết tiếng Anh để giao lưu thư bạn bè quốc tế',
      content_ko: '베트남과 한국 학생들이 영어로 편지를 주고받을 때 유용한 표현 템플릿입니다.',
      content_en: 'Useful expression templates when Vietnamese and Korean students exchange letters in English.',
      content_vi: 'Mẫu câu biểu đạt hữu ích khi học sinh Việt Nam và Hàn Quốc trao đổi thư từ bằng tiếng Anh.',
      image_url: null, views: 234, likes: 30, date: '2026-09-26'
    },

    // 9위: Hoàng Minh Tuấn (총 1개)
    {
      id: 'post9_tuan', category: 'resource', lang: 'vi',
      author: 'Hoàng Minh Tuấn', initial: 'H', color: AVATAR_COLORS[1], country: 'vietnam',
      title_ko: '초등학생을 위한 블록 코딩(스크래치) 기초 프로젝트 5선',
      title_en: '5 Basic Block Coding (Scratch) Projects for Elementary Students',
      title_vi: '5 dự án lập trình khối (Scratch) cơ bản cho học sinh tiểu học',
      content_ko: '게임을 만들며 배우는 초등 코딩 교육 수업 자료입니다.',
      content_en: 'Elementary coding education materials learning through making games.',
      content_vi: 'Tài liệu giảng dạy lập trình tiểu học học qua việc tự tạo trò chơi.',
      image_url: null, views: 215, likes: 29, date: '2026-09-25'
    },

    // 10위: 최유진 (총 1개)
    {
      id: 'post10_choi', category: 'resource', lang: 'ko',
      author: '최유진', initial: '최', color: AVATAR_COLORS[0], country: 'korea',
      title_ko: '전통 문양을 활용한 종이공예 미술 수업안',
      title_en: 'Paper Craft Art Lesson Plan Using Traditional Patterns',
      title_vi: 'Giáo án Mỹ thuật gấp giấy thủ công sử dụng hoa văn truyền thống',
      content_ko: '한국의 단청 문양과 베트남의 연꽃 문양을 접목한 다문화 미술 활동입니다.',
      content_en: 'Multicultural art activity combining Korean Dancheong patterns and Vietnamese lotus motifs.',
      content_vi: 'Hoạt động mỹ thuật đa văn hóa kết hợp hoa văn Dancheong Hàn Quốc và họa tiết hoa sen Việt Nam.',
      image_url: null, views: 195, likes: 26, date: '2026-09-24'
    },

    // 공지사항
    {
      id: 'post7', category: 'notice', lang: 'ko',
      author: 'HoweduBridge 운영팀', initial: 'E', color: AVATAR_COLORS[2], country: 'korea',
      title_ko: '[공지] HoweduBridge 플랫폼 업데이트 안내',
      title_en: '[Notice] HoweduBridge Platform Update',
      title_vi: '[Thông báo] Cập nhật nền tảng HoweduBridge',
      content_ko: 'HoweduBridge 운영팀입니다.\n\n플랫폼 업데이트 소식을 알려드립니다.\n\n🆕 새로운 기능:\n• 회원가입 및 교사 프로필 기능 오픈\n• 이미지 업로드 및 첨부 기능\n• 활동 회원 랭킹 시스템\n\n항상 HoweduBridge를 이용해 주셔서 감사합니다.',
      content_en: 'From HoweduBridge Operations Team.\n\n🆕 New Features:\n• Registration & Teacher Profile open\n• Image upload & attachment support\n• Active Member Ranking System\n\nThank you for using HoweduBridge.',
      content_vi: 'Từ Đội Vận hành HoweduBridge.\n\n🆕 Tính năng mới:\n• Mở đăng ký thành viên & hồ sơ giáo viên\n• Hỗ trợ tải lên và đính kèm hình ảnh\n• Hệ thống xếp hạng thành viên tích cực\n\nCảm ơn bạn đã sử dụng HoweduBridge.',
      image_url: null, views: 1250, likes: 89, date: '2026-10-07'
    }
  ];

  db.exec('BEGIN TRANSACTION;');
  for (const p of seedPosts) {
    insertPost.run(
      p.id, p.category, p.lang, p.author, p.initial, p.color, p.country,
      p.title_ko, p.title_en, p.title_vi,
      p.content_ko, p.content_en, p.content_vi,
      p.image_url || null, p.views, p.likes, p.date + 'T00:00:00'
    );
  }
  db.exec('COMMIT;');

  // ===== Seed Comments =====
  const insertComment = db.prepare(`
    INSERT INTO comments (id, post_id, author, author_initial, avatar_color, country,
      text_ko, text_en, text_vi)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const seedComments = [
    { id: 'c1_1', postId: 'post1', author: '김민수', initial: '김', color: AVATAR_COLORS[1], country: 'korea',
      ko: '정말 유용한 자료 감사합니다! 분수 교수법이 매우 인상적이네요.',
      en: 'Thank you for the really useful materials! The fraction teaching method is very impressive.',
      vi: 'Cảm ơn tài liệu rất hữu ích! Phương pháp dạy phân số rất ấn tượng.' },
    { id: 'c1_2', postId: 'post1', author: 'Trần Thị Lan', initial: 'T', color: AVATAR_COLORS[4], country: 'vietnam',
      ko: '저희 학교에서도 적용해보고 싶습니다!',
      en: 'Would love to apply this at our school as well!',
      vi: 'Tôi cũng rất muốn áp dụng phương pháp này tại trường của mình!' },
    { id: 'c2_1', postId: 'post2', author: 'Lê Văn Hùng', initial: 'L', color: AVATAR_COLORS[2], country: 'vietnam',
      ko: '화학 실험 안전 가이드 감사히 쓰겠습니다.',
      en: 'Will make great use of the chemistry lab safety guide.',
      vi: 'Cảm ơn thầy, tôi sẽ sử dụng hướng dẫn an toàn thí nghiệm hóa học này thật hiệu quả.' }
  ];

  db.exec('BEGIN TRANSACTION;');
  for (const c of seedComments) {
    insertComment.run(c.id, c.postId, c.author, c.initial, c.color, c.country, c.ko, c.en, c.vi);
  }
  db.exec('COMMIT;');
}

module.exports = { getDb };
