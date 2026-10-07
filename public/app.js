// ===== HoweduBridge App.js =====
// Full-stack trilingual community application with SQLite database & automatic translation
// Default Language: Vietnamese (Tiếng Việt)

(function () {
  'use strict';

  // ===== STATE =====
  let currentLang = 'vi'; // Default language: Vietnamese
  let currentCategory = 'all';
  let posts = [];
  let currentDetailPost = null;
  let selectedImageFile = null;
  let isApiAvailable = true;
  let currentUser = null;
  const POSTS_PER_PAGE = 6;
  let currentPage = 1;
  let currentInfoTab = 'guide';

  // ===== AVATAR COLORS =====
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

  // ===== INITIALIZATION =====
  async function init() {
    // Restore user session if stored
    try {
      const saved = localStorage.getItem('howedubridge_user') || localStorage.getItem('edubridge_user');
      if (saved) {
        currentUser = JSON.parse(saved);
      }
    } catch (e) {}

    initParticles();
    initNavbar();
    initLanguageSwitcher();
    initBoardTabs();
    initModals();
    initAuth();
    initImageUpload();
    initWriteForm();
    initSearch();
    initScrollAnimations();
    initSmoothScrolling();
    initFooterSubmenus();
    initInfoModal();
    initAdminDashboard();
    animateCounters();

    // Default to Vietnamese on startup
    setLanguage('vi');

    // Update authentication status in navbar
    updateAuthUI();

    // Fetch posts and top 10 members from SQLite backend
    await loadPosts();
    await renderMembers();
  }

  // ===== PARTICLES =====
  function initParticles() {
    const container = document.getElementById('hero-particles');
    if (!container) return;
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.setProperty('--tx', (Math.random() - 0.5) * 300 + 'px');
      p.style.setProperty('--ty', (Math.random() - 0.5) * 300 + 'px');
      p.style.animationDelay = Math.random() * 15 + 's';
      p.style.animationDuration = (10 + Math.random() * 10) + 's';
      container.appendChild(p);
    }
  }

  // ===== NAVBAR =====
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');

    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    mobileBtn?.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY + 100;
      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) {
          link.classList.toggle('active', scrollY >= top && scrollY < top + height);
        }
      });
    });
  }

  // ===== AUTH (REGISTER & LOGIN) =====
  function initAuth() {
    const regModal = document.getElementById('register-modal');
    const loginModal = document.getElementById('login-modal');
    const btnOpenReg = document.getElementById('btn-open-register');
    const btnOpenLogin = document.getElementById('btn-open-login');
    const closeReg = document.getElementById('modal-close-register');
    const cancelReg = document.getElementById('btn-cancel-register');
    const closeLogin = document.getElementById('modal-close-login');
    const cancelLogin = document.getElementById('btn-cancel-login');
    const btnLogout = document.getElementById('btn-logout');

    const regForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');

    // Open/Close Register Modal
    btnOpenReg?.addEventListener('click', () => {
      regForm.reset();
      regModal.classList.add('active');
    });
    closeReg?.addEventListener('click', () => regModal.classList.remove('active'));
    cancelReg?.addEventListener('click', () => regModal.classList.remove('active'));
    regModal?.addEventListener('click', (e) => {
      if (e.target === regModal) regModal.classList.remove('active');
    });

    // Open/Close Login Modal
    btnOpenLogin?.addEventListener('click', () => {
      loginForm.reset();
      loginModal.classList.add('active');
    });
    closeLogin?.addEventListener('click', () => loginModal.classList.remove('active'));
    cancelLogin?.addEventListener('click', () => loginModal.classList.remove('active'));
    loginModal?.addEventListener('click', (e) => {
      if (e.target === loginModal) loginModal.classList.remove('active');
    });

    // Logout
    btnLogout?.addEventListener('click', () => {
      currentUser = null;
      try {
        localStorage.removeItem('howedubridge_user');
        localStorage.removeItem('edubridge_user');
      } catch(e){}
      updateAuthUI();
      showToast(currentLang === 'vi' ? 'Đã đăng xuất.' : currentLang === 'ko' ? '로그아웃되었습니다.' : 'Logged out.');
    });

    // Handle Register Submit
    regForm?.addEventListener('submit', async (e) => {
      e.preventDefault();

      const username = document.getElementById('reg-username').value.trim();
      const password = document.getElementById('reg-password').value.trim();
      const name = document.getElementById('reg-name').value.trim();
      const country = document.getElementById('reg-country').value;
      const role = document.getElementById('reg-role').value.trim();
      const email = document.getElementById('reg-email').value.trim();

      if (!username || !password || !name || !role || !email) {
        alert(currentLang === 'vi' ? 'Vui lòng điền đầy đủ các thông tin.' : '모든 항목을 입력해주세요.');
        return;
      }

      const submitBtn = regForm.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      try {
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password, name, country, role, email })
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Registration failed');
        }

        currentUser = data;
        try {
          localStorage.setItem('howedubridge_user', JSON.stringify(data));
          localStorage.setItem('edubridge_user', JSON.stringify(data));
        } catch(e){}

        updateAuthUI();
        regModal.classList.remove('active');
        const t = TRANSLATIONS[currentLang];
        showToast(t.register_success || 'Đăng ký thành công!');

        await renderMembers();
      } catch (err) {
        alert(err.message);
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });

    // Handle Login Submit
    loginForm?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('login-username').value.trim();
      const password = document.getElementById('login-password').value.trim();

      if (!username || !password) return;

      const submitBtn = loginForm.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      try {
        const res = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Login failed');
        }

        currentUser = data;
        try {
          localStorage.setItem('howedubridge_user', JSON.stringify(data));
          localStorage.setItem('edubridge_user', JSON.stringify(data));
        } catch(e){}

        updateAuthUI();
        loginModal.classList.remove('active');
        showToast(currentLang === 'vi' ? `Chào mừng trở lại, thầy/cô ${data.name}!` : `${data.name}님 환영합니다!`);
      } catch (err) {
        alert(err.message);
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });

    // Quick Admin Login Demo Button
    document.getElementById('btn-quick-admin-login')?.addEventListener('click', () => {
      const usernameInput = document.getElementById('login-username');
      const passwordInput = document.getElementById('login-password');
      if (usernameInput && passwordInput) {
        usernameInput.value = 'admin';
        passwordInput.value = 'admin1234';
        document.getElementById('login-form')?.requestSubmit();
      }
    });
  }

  function updateAuthUI() {
    const guestActions = document.getElementById('nav-guest-actions');
    const userProfile = document.getElementById('nav-user-profile');
    const avatarEl = document.getElementById('nav-user-avatar');
    const nameEl = document.getElementById('nav-user-name');
    const btnAdminPanel = document.getElementById('btn-open-admin');

    if (currentUser) {
      if (guestActions) guestActions.style.display = 'none';
      if (userProfile) {
        userProfile.style.display = 'flex';
        if (avatarEl) {
          avatarEl.textContent = currentUser.initial || currentUser.name?.charAt(0) || '👤';
          if (currentUser.avatarColor) avatarEl.style.background = currentUser.avatarColor;
        }
        if (nameEl) {
          nameEl.textContent = currentUser.name + (currentUser.isAdmin ? ' 👑' : '');
        }
      }
      if (btnAdminPanel) {
        btnAdminPanel.style.display = currentUser.isAdmin ? 'inline-flex' : 'none';
      }
    } else {
      if (guestActions) guestActions.style.display = 'flex';
      if (userProfile) userProfile.style.display = 'none';
      if (btnAdminPanel) btnAdminPanel.style.display = 'none';
    }
  }

  // ===== LANGUAGE SWITCHER (GLOBAL) =====
  function initLanguageSwitcher() {
    const buttons = document.querySelectorAll('.lang-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        if (lang === currentLang) return;
        setLanguage(lang);
      });
    });
  }

  function setLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Update static i18n texts
    const t = TRANSLATIONS[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (t[key]) {
        el.innerHTML = t[key];
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      if (t[key]) {
        el.placeholder = t[key];
      }
    });

    document.documentElement.lang = lang;

    // Keep active board tab highlighted
    document.querySelectorAll('.board-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.category === currentCategory);
    });

    // Immediately re-render posts list and members with selected language
    renderPosts();
    renderMembers();

    // If modal is currently open, sync it as well
    if (currentDetailPost && document.getElementById('post-modal')?.classList.contains('active')) {
      renderPostDetailContent(lang);
    }

    // If info modal is open, re-render its content in the new language
    if (document.getElementById('info-modal')?.classList.contains('active')) {
      renderInfoTab(currentInfoTab);
    }
  }

  // ===== BOARD TABS (CATEGORY FILTERING) =====
  function initBoardTabs() {
    const tabs = document.querySelectorAll('.board-tab, .tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', async (e) => {
        e.preventDefault();
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentCategory = tab.dataset.category || 'all';
        currentPage = 1; // Reset to first page on category change

        // Check if there is an active search query
        const searchInput = document.getElementById('search-input');
        const query = searchInput ? searchInput.value.trim() : '';

        await loadPosts(query);
      });
    });
  }

  // ===== MODALS =====
  function initModals() {
    const postModal = document.getElementById('post-modal');
    const writeModal = document.getElementById('write-modal');
    const closePost = document.getElementById('modal-close-post');
    const closeWrite = document.getElementById('modal-close-write');
    const cancelWrite = document.getElementById('btn-cancel-write');

    const openWriteModal = () => {
      resetWriteForm();
      if (currentUser) {
        const authorInput = document.getElementById('write-author');
        if (authorInput) authorInput.value = currentUser.name;
        const langSelect = document.getElementById('write-language');
        if (langSelect) langSelect.value = currentUser.country === 'korea' ? 'ko' : 'vi';
      }
      writeModal.classList.add('active');
    };
    const closeWriteModal = () => writeModal.classList.remove('active');

    document.getElementById('btn-write-post')?.addEventListener('click', openWriteModal);
    document.getElementById('btn-write-post-2')?.addEventListener('click', openWriteModal);
    document.getElementById('nav-write-btn')?.addEventListener('click', (e) => {
      e.preventDefault();
      openWriteModal();
    });

    closePost?.addEventListener('click', () => {
      postModal.classList.remove('active');
      currentDetailPost = null;
    });
    closeWrite?.addEventListener('click', closeWriteModal);
    cancelWrite?.addEventListener('click', closeWriteModal);

    postModal?.addEventListener('click', (e) => {
      if (e.target === postModal) {
        postModal.classList.remove('active');
        currentDetailPost = null;
      }
    });
    writeModal?.addEventListener('click', (e) => {
      if (e.target === writeModal) closeWriteModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        postModal.classList.remove('active');
        writeModal.classList.remove('active');
        currentDetailPost = null;
        document.getElementById('register-modal')?.classList.remove('active');
        document.getElementById('login-modal')?.classList.remove('active');
        document.getElementById('info-modal')?.classList.remove('active');
      }
    });
  }

  // ===== IMAGE UPLOAD & PREVIEW =====
  function initImageUpload() {
    const uploadZone = document.getElementById('image-upload-zone');
    const fileInput = document.getElementById('write-image');
    const placeholder = document.getElementById('upload-placeholder');
    const previewWrapper = document.getElementById('image-preview-wrapper');
    const previewImg = document.getElementById('image-preview');
    const removeBtn = document.getElementById('btn-remove-image');

    if (!uploadZone || !fileInput) return;

    uploadZone.addEventListener('click', (e) => {
      if (e.target.closest('#btn-remove-image')) return;
      fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      handleFileSelected(file);
    });

    uploadZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadZone.classList.add('dragover');
    });

    uploadZone.addEventListener('dragleave', () => {
      uploadZone.classList.remove('dragover');
    });

    uploadZone.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadZone.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileSelected(e.dataTransfer.files[0]);
      }
    });

    removeBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      resetImageUpload();
    });
  }

  function handleFileSelected(file) {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert(currentLang === 'vi' ? 'Chỉ chấp nhận file hình ảnh (JPG, PNG, GIF, WebP).' : '이미지 파일만 업로드 가능합니다.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert(currentLang === 'vi' ? 'Dung lượng file tối đa là 10MB.' : '파일 크기는 최대 10MB까지 가능합니다.');
      return;
    }

    selectedImageFile = file;

    const reader = new FileReader();
    reader.onload = (e) => {
      const previewImg = document.getElementById('image-preview');
      const placeholder = document.getElementById('upload-placeholder');
      const previewWrapper = document.getElementById('image-preview-wrapper');

      if (previewImg && placeholder && previewWrapper) {
        previewImg.src = e.target.result;
        placeholder.style.display = 'none';
        previewWrapper.style.display = 'inline-block';
      }
    };
    reader.readAsDataURL(file);
  }

  function resetImageUpload() {
    selectedImageFile = null;
    const fileInput = document.getElementById('write-image');
    const placeholder = document.getElementById('upload-placeholder');
    const previewWrapper = document.getElementById('image-preview-wrapper');
    const previewImg = document.getElementById('image-preview');

    if (fileInput) fileInput.value = '';
    if (previewImg) previewImg.src = '';
    if (placeholder) placeholder.style.display = 'flex';
    if (previewWrapper) previewWrapper.style.display = 'none';
  }

  function resetWriteForm() {
    const form = document.getElementById('write-form');
    if (form) form.reset();
    resetImageUpload();
  }

  // ===== API / DATA FETCHING =====
  async function loadPosts(searchQuery = '') {
    try {
      let url = '/api/posts';
      const params = new URLSearchParams();
      if (currentCategory && currentCategory !== 'all') {
        params.append('category', currentCategory);
      }
      if (searchQuery) {
        params.append('search', searchQuery);
      }
      if (params.toString()) {
        url += '?' + params.toString();
      }

      const res = await fetch(url);
      if (res.ok) {
        posts = await res.json();
        isApiAvailable = true;
      } else {
        throw new Error('API response not OK');
      }
    } catch (err) {
      console.warn('API loadPosts error:', err);
      isApiAvailable = false;
    }
    renderPosts();
  }

  // ===== RENDER POSTS (MAIN BOARD) =====
  function renderPosts() {
    const container = document.getElementById('post-list');
    const paginationEl = document.getElementById('pagination');
    if (!container) return;

    if (posts.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📭</div>
          <p>${currentLang === 'vi' ? 'Không có bài viết nào.' : currentLang === 'ko' ? '게시글이 없습니다.' : 'No posts found.'}</p>
        </div>
      `;
      if (paginationEl) paginationEl.innerHTML = '';
      return;
    }

    const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE) || 1;
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const pagePosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

    const t = TRANSLATIONS[currentLang];

    container.innerHTML = pagePosts.map(post => {
      // Pick title and content in CURRENT language, with fallback
      const title = (post.title && (post.title[currentLang] || post.title[post.lang])) || '';
      const content = (post.content && (post.content[currentLang] || post.content[post.lang])) || '';

      const badgeClass = {
        resource: 'badge-resource',
        question: 'badge-question',
        discussion: 'badge-discussion',
        notice: 'badge-notice'
      }[post.category] || 'badge-discussion';

      const categoryLabel = {
        resource: { ko: '자료 공유', en: 'Resource', vi: 'Tài liệu' },
        question: { ko: '질문', en: 'Question', vi: 'Câu hỏi' },
        discussion: { ko: '토론', en: 'Discussion', vi: 'Thảo luận' },
        notice: { ko: '공지', en: 'Notice', vi: 'Thông báo' }
      }[post.category] || { ko: '기타', en: 'Other', vi: 'Khác' };

      const langLabel = { ko: '🇰🇷 KO', en: '🇺🇸 EN', vi: '🇻🇳 VI' }[post.lang] || '';
      const langClass = `lang-${post.lang}`;
      const countryLabel = post.country === 'korea' ? t.country_korea : t.country_vietnam;

      const dateStr = post.createdAt ? post.createdAt.split('T')[0] : '2026-10-07';
      const daysAgo = Math.floor((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24));
      const timeLabel = isNaN(daysAgo) || daysAgo <= 0
        ? (currentLang === 'vi' ? 'Hôm nay' : currentLang === 'ko' ? '오늘' : 'Today')
        : `${daysAgo}${currentLang === 'vi' ? ' ngày trước' : currentLang === 'ko' ? '일 전' : 'd ago'}`;

      const hasImage = !!post.imageUrl;
      const imageBadge = hasImage ? `<span class="post-card-image-badge">📷 ${t.has_image || 'Hình ảnh'}</span>` : '';
      const imageThumb = hasImage ? `
        <div class="post-card-thumb-container">
          <img src="${post.imageUrl}" class="post-card-thumb" alt="Post attachment" loading="lazy">
        </div>
      ` : '';

      return `
        <div class="post-card" data-post-id="${post.id}" onclick="window.HoweduBridge.openPost('${post.id}')">
          <div class="post-header">
            <div class="post-avatar" style="background: ${post.avatarColor}">${post.authorInitial}</div>
            <div class="post-meta">
              <div class="post-author">${post.author} <span class="post-lang-tag ${langClass}">${langLabel}</span>${imageBadge}</div>
              <div class="post-date">${countryLabel} · ${timeLabel}</div>
            </div>
            <span class="post-badge ${badgeClass}">${categoryLabel[currentLang]}</span>
          </div>
          ${imageThumb}
          <h4 class="post-title">${title}</h4>
          <p class="post-preview">${content}</p>
          <div class="post-footer">
            <span>👁 ${post.views} ${t.views}</span>
            <span>💬 ${post.commentCount ?? (post.comments ? post.comments.length : 0)} ${t.comments}</span>
            <span>❤️ ${post.likes} ${t.likes}</span>
          </div>
        </div>
      `;
    }).join('');

    renderPagination(totalPages);
  }

  // ===== RENDER PAGINATION =====
  function renderPagination(totalPages) {
    const paginationEl = document.getElementById('pagination');
    if (!paginationEl) return;

    if (totalPages <= 1) {
      paginationEl.innerHTML = '';
      return;
    }

    let html = '';
    // Previous button
    html += `<button class="page-btn" id="page-prev" ${currentPage <= 1 ? 'disabled' : ''} aria-label="Previous page">‹</button>`;

    // Page buttons
    for (let p = 1; p <= totalPages; p++) {
      html += `<button class="page-btn ${p === currentPage ? 'active' : ''}" data-page="${p}">${p}</button>`;
    }

    // Next button
    html += `<button class="page-btn" id="page-next" ${currentPage >= totalPages ? 'disabled' : ''} aria-label="Next page">›</button>`;

    paginationEl.innerHTML = html;

    // Attach listeners
    const prevBtn = paginationEl.querySelector('#page-prev');
    if (prevBtn && currentPage > 1) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        goToPage(currentPage - 1);
      });
    }

    const nextBtn = paginationEl.querySelector('#page-next');
    if (nextBtn && currentPage < totalPages) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        goToPage(currentPage + 1);
      });
    }

    paginationEl.querySelectorAll('.page-btn[data-page]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const p = parseInt(btn.dataset.page, 10);
        if (p && p !== currentPage) {
          goToPage(p);
        }
      });
    });
  }

  function goToPage(page) {
    currentPage = page;
    renderPosts();
    const boardEl = document.getElementById('board');
    if (boardEl) {
      boardEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // ===== OPEN POST DETAIL & TRILINGUAL RENDER =====
  async function openPost(postId) {
    let post = posts.find(p => p.id === postId);

    if (isApiAvailable) {
      try {
        const res = await fetch(`/api/posts/${postId}`);
        if (res.ok) {
          const detail = await res.json();
          post = detail;
          const idx = posts.findIndex(p => p.id === postId);
          if (idx !== -1) {
            posts[idx] = detail;
          }
        }
      } catch (e) {
        console.warn('Failed to load post detail via API:', e);
      }
    }

    if (!post) return;

    currentDetailPost = post;
    const modal = document.getElementById('post-modal');

    // Render detail using current selected language
    renderPostDetailContent(currentLang);
    modal.classList.add('active');
  }

  function renderPostDetailContent(displayLang) {
    if (!currentDetailPost) return;
    const post = currentDetailPost;
    const body = document.getElementById('modal-post-body');
    const t = TRANSLATIONS[currentLang];

    // Pick translated title and content
    const title = (post.title && (post.title[displayLang] || post.title[post.lang])) || '';
    const content = (post.content && (post.content[displayLang] || post.content[post.lang])) || '';
    const countryLabel = post.country === 'korea' ? t.country_korea : t.country_vietnam;
    const dateStr = post.createdAt ? post.createdAt.split('T')[0] : '2026-10-07';

    const imageBox = post.imageUrl ? `
      <div class="post-detail-image-box">
        <img src="${post.imageUrl}" alt="Attachment">
        <div class="post-detail-image-caption">
          <span>📷 ${t.has_image || 'Ảnh đính kèm'}</span> · <a href="${post.imageUrl}" target="_blank" rel="noopener">${currentLang === 'vi' ? 'Xem ảnh gốc ↗' : currentLang === 'ko' ? '원본 보기 ↗' : 'View full size ↗'}</a>
        </div>
      </div>
    ` : '';

    const langNames = {
      vi: '🇻🇳 Tiếng Việt',
      ko: '🇰🇷 한국어',
      en: '🇺🇸 English'
    };

    const categoryNames = {
      resource: currentLang === 'vi' ? '📂 Chia sẻ tài liệu' : currentLang === 'ko' ? '📂 자료 공유' : '📂 Resource',
      question: currentLang === 'vi' ? '❓ Hỏi & Đáp' : currentLang === 'ko' ? '❓ 질문/답변' : '❓ Q&A',
      discussion: currentLang === 'vi' ? '💬 Thảo luận' : currentLang === 'ko' ? '💬 자유 토론' : '💬 Discussion',
      notice: currentLang === 'vi' ? '📢 Thông báo' : currentLang === 'ko' ? '📢 공지사항' : '📢 Notice',
    };

    body.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-sm); flex-wrap:wrap; gap:8px;">
        <span class="post-badge badge-${post.category}">${categoryNames[post.category] || 'Diễn đàn'}</span>
        <span style="font-size:0.85rem; color:var(--neutral-500);">
          ${currentLang === 'vi' ? 'Ngôn ngữ gốc' : currentLang === 'ko' ? '작성 원문' : 'Original'}: <strong>${langNames[post.lang] || post.lang}</strong>
        </span>
      </div>

      <h2 class="modal-post-title" id="modal-display-title">${title}</h2>
      
      <div class="modal-post-meta">
        <div class="post-avatar" style="background: ${post.avatarColor}; width:40px; height:40px; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-weight:700;">${post.authorInitial}</div>
        <div>
          <div class="post-author">${post.author}</div>
          <div class="post-date">${countryLabel} · ${dateStr}</div>
        </div>
        <div style="margin-left:auto; display:flex; align-items:center; gap:8px;">
          <button class="btn btn-ghost btn-sm" onclick="window.HoweduBridge.likePost('${post.id}')">❤️ ${post.likes}</button>
          <span class="post-lang-tag lang-${displayLang}">${langNames[displayLang]}</span>
          ${currentUser?.isAdmin ? `<button class="btn-danger-sm" onclick="window.HoweduBridge.adminDeletePost('${post.id}', true)">🗑️ ${currentLang==='vi'?'Xóa bài':'삭제'}</button>` : ''}
        </div>
      </div>

      ${imageBox}

      <div class="modal-post-content" id="modal-display-content">${content.replace(/\n/g, '<br>')}</div>

      <!-- Trilingual Language Switching Tabs -->
      <div class="translation-panel" id="translation-panel">
        <div class="translation-header">
          <div>
            <h4>🌐 ${currentLang === 'vi' ? 'Chuyển đổi ngôn ngữ hiển thị (3개국어 번역 보기)' : currentLang === 'ko' ? '언어별 내용 보기 (3개국어)' : 'View in Language'}</h4>
            <div style="font-size:0.8rem; color:var(--neutral-500); margin-top:2px;">
              ${currentLang === 'vi' ? 'Bấm nút để xem ngay bài viết bằng Tiếng Việt, Tiếng Hàn hoặc Tiếng Anh' : '버튼을 누르면 해당 언어로 완벽 번역된 본문이 즉시 표시됩니다.'}
            </div>
          </div>
          <div class="translation-tabs" id="translation-tabs">
            <button class="translation-tab ${displayLang === 'vi' ? 'active' : ''}" onclick="window.HoweduBridge.switchDetailLang('vi')">🇻🇳 Tiếng Việt</button>
            <button class="translation-tab ${displayLang === 'ko' ? 'active' : ''}" onclick="window.HoweduBridge.switchDetailLang('ko')">🇰🇷 한국어</button>
            <button class="translation-tab ${displayLang === 'en' ? 'active' : ''}" onclick="window.HoweduBridge.switchDetailLang('en')">🇺🇸 English</button>
          </div>
        </div>
        <div class="translation-content" id="translation-content">
          <div style="font-size:1.05rem; font-weight:700; color:var(--neutral-900); margin-bottom:10px;">
            ${(post.title && (post.title[displayLang] || post.title[post.lang])) || ''}
          </div>
          <div style="white-space: pre-line; line-height: 1.7; color: var(--neutral-700);">
            ${(post.content && (post.content[displayLang] || post.content[post.lang])) || ''}
          </div>
        </div>
      </div>

      <!-- Comments Section -->
      <div class="comments-section">
        <h3 class="comments-title">${t.comment_section_title} (<span id="comment-count-${post.id}">${post.comments ? post.comments.length : 0}</span>)</h3>
        <div class="comment-list" id="comment-list-${post.id}">
          ${(post.comments || []).map(c => renderCommentItem(c, displayLang)).join('')}
        </div>
        <div class="comment-input-wrapper">
          <input type="text" class="comment-input" id="comment-input-${post.id}" placeholder="${t.comment_placeholder}">
          <button class="btn btn-primary btn-sm" onclick="window.HoweduBridge.addComment('${post.id}')">${t.btn_comment}</button>
        </div>
      </div>
    `;
  }

  function switchDetailLang(targetLang) {
    if (!currentDetailPost) return;
    renderPostDetailContent(targetLang);
  }

  function renderCommentItem(comment, displayLang = currentLang) {
    const t = TRANSLATIONS[currentLang];
    const text = (comment.text && (comment.text[displayLang] || comment.text[currentLang] || comment.text.vi || comment.text.ko || comment.text.en)) || '';
    const countryLabel = comment.country === 'korea' ? t.country_korea : t.country_vietnam;

    return `
      <div class="comment-item">
        <div class="comment-avatar" style="background: ${comment.avatarColor}">${comment.authorInitial || comment.author?.charAt(0) || '👤'}</div>
        <div class="comment-body">
          <div class="comment-author">${comment.author} <span style="font-weight:400; font-size:0.75rem; color:var(--neutral-400);">${countryLabel}</span></div>
          <div class="comment-text">${text}</div>
          <div class="comment-actions">
            <span style="cursor:pointer;" onclick="window.HoweduBridge.showToast('❤️ ' + (currentLang==='vi'?'Đã thích bình luận!':'댓글 좋아요!'))">❤️ ${t.likes}</span>
            ${currentUser?.isAdmin ? `<span style="cursor:pointer; color:#dc2626; margin-left:10px; font-weight:600; font-size:0.8rem;" onclick="window.HoweduBridge.adminDeleteComment('${comment.id}', '${comment.post_id || ''}')">🗑️ ${currentLang==='vi'?'Xóa':'삭제'}</span>` : ''}
          </div>
        </div>
      </div>
    `;
  }

  // ===== ADD COMMENT =====
  async function addComment(postId) {
    const input = document.getElementById(`comment-input-${postId}`);
    if (!input) return;

    const text = input.value.trim();
    if (!text) return;

    const t = TRANSLATIONS[currentLang];
    const author = currentUser ? currentUser.name : (currentLang === 'vi' ? 'Giáo viên ẩn danh' : '익명 교사');
    const country = currentUser ? currentUser.country : (currentLang === 'vi' ? 'vietnam' : 'korea');

    const submitBtn = input.nextElementSibling;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = '⏳';
    }

    if (isApiAvailable) {
      try {
        const res = await fetch(`/api/posts/${postId}/comments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            author,
            text,
            lang: currentLang,
            country
          })
        });

        if (res.ok) {
          const newComment = await res.json();
          if (currentDetailPost) {
            if (!currentDetailPost.comments) currentDetailPost.comments = [];
            currentDetailPost.comments.push(newComment);
          }
          const commentList = document.getElementById(`comment-list-${postId}`);
          const countEl = document.getElementById(`comment-count-${postId}`);

          if (commentList) {
            commentList.insertAdjacentHTML('beforeend', renderCommentItem(newComment, currentLang));
          }
          if (countEl) {
            countEl.textContent = parseInt(countEl.textContent || '0', 10) + 1;
          }

          input.value = '';
          showToast(t.comment_success);
          loadPosts();
          return;
        }
      } catch (e) {
        console.warn('Add comment API failed:', e);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = t.btn_comment;
        }
      }
    }

    input.value = '';
    showToast(t.comment_success);
  }

  // ===== LIKE POST =====
  async function likePost(postId) {
    if (isApiAvailable) {
      try {
        const res = await fetch(`/api/posts/${postId}/like`, { method: 'POST' });
        if (res.ok) {
          const data = await res.json();
          if (currentDetailPost && currentDetailPost.id === postId) {
            currentDetailPost.likes = data.likes;
          }
          showToast('❤️ ' + (currentLang === 'vi' ? 'Đã thích bài viết!' : '좋아요가 반영되었습니다!'));
          await loadPosts();
          return;
        }
      } catch (e) {
        console.warn('Like API failed:', e);
      }
    }
  }

  // ===== WRITE FORM (POST CREATION WITH 3-LANGUAGE AUTO TRANSLATE) =====
  function initWriteForm() {
    const form = document.getElementById('write-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const category = document.getElementById('write-category').value;
      const lang = document.getElementById('write-language').value;
      const title = document.getElementById('write-title').value.trim();
      const content = document.getElementById('write-content').value.trim();
      const author = document.getElementById('write-author').value.trim();

      if (!title || !content || !author) {
        alert(currentLang === 'vi' ? 'Vui lòng điền đầy đủ các thông tin.' : '모든 필수 항목을 입력해주세요.');
        return;
      }

      const t = TRANSLATIONS[currentLang];
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : '';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = currentLang === 'vi'
          ? '🌐 Đang tự động dịch sang 3 ngôn ngữ...'
          : currentLang === 'ko'
          ? '🌐 3개국어 자동 번역 및 저장 중...'
          : '🌐 Translating into 3 languages...';
      }

      try {
        if (isApiAvailable) {
          const formData = new FormData();
          formData.append('category', category);
          formData.append('lang', lang);
          formData.append('title', title);
          formData.append('content', content);
          formData.append('author', author);
          formData.append('country', currentUser ? currentUser.country : (lang === 'vi' ? 'vietnam' : 'korea'));

          if (selectedImageFile) {
            formData.append('image', selectedImageFile);
          }

          const res = await fetch('/api/posts', {
            method: 'POST',
            body: formData
          });

          if (!res.ok) {
            throw new Error(`Upload failed with status ${res.status}`);
          }
        }

        resetWriteForm();
        document.getElementById('write-modal').classList.remove('active');
        showToast(currentLang === 'vi' ? '✅ Bài viết đã được dịch tự động và đăng thành công!' : '✅ 게시글이 3개국어로 자동 번역되어 등록되었습니다!');

        // Refresh posts & active member rankings
        currentPage = 1;
        await loadPosts();
        await renderMembers();

        document.getElementById('board')?.scrollIntoView({ behavior: 'smooth' });
      } catch (err) {
        console.error('Error submitting post:', err);
        alert('Lỗi đăng bài / 오류 발생: ' + err.message);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      }
    });
  }

  // ===== SEARCH =====
  function initSearch() {
    const input = document.getElementById('search-input');
    if (!input) return;

    let debounceTimer;
    input.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        currentPage = 1;
        const query = input.value.trim();
        loadPosts(query);
      }, 300);
    });
  }

  // ===== MEMBERS (TOP 10 ACTIVE TEACHERS) =====
  async function renderMembers() {
    const container = document.getElementById('members-grid');
    if (!container) return;

    let members = [];
    if (isApiAvailable) {
      try {
        const res = await fetch('/api/members');
        if (res.ok) {
          const apiMembers = await res.json();
          if (apiMembers && apiMembers.length > 0) {
            members = apiMembers;
          }
        }
      } catch (e) {
        console.warn('Load members API failed:', e);
      }
    }

    const t = TRANSLATIONS[currentLang];
    const postSuffix = t.member_posts_suffix || (currentLang === 'vi' ? 'bài viết' : currentLang === 'ko' ? '개 글' : 'posts');

    const top10 = members.slice(0, 10);

    container.innerHTML = top10.map((m, index) => {
      const rank = m.rank || index + 1;
      const rankClass = rank <= 3 ? `member-rank-${rank}` : '';
      const countryLabel = m.country === 'korea' ? t.country_korea : t.country_vietnam;
      const roleText = (m.role && (m.role[currentLang] || m.role.vi || m.role.ko || m.role.en)) || (m.role || '');

      return `
        <div class="member-card">
          <div class="member-rank-badge ${rankClass}">#${rank}</div>
          <div class="member-avatar-lg" style="background: ${m.avatarColor}">${m.initial}</div>
          <div class="member-name">${m.name}</div>
          <div class="member-role">${roleText}</div>
          <div class="member-country">${countryLabel}</div>
          <div class="member-posts-count">📝 ${m.postCount || 1} ${postSuffix}</div>
        </div>
      `;
    }).join('');
  }

  // ===== SCROLL ANIMATIONS =====
  function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  }

  // ===== FOOTER SUBMENUS =====
  function initFooterSubmenus() {
    // 1. Community Submenus
    const linkBoard = document.getElementById('footer-link-board');
    const linkResources = document.getElementById('footer-link-resources');
    const linkQna = document.getElementById('footer-link-qna');
    const linkMembers = document.getElementById('footer-link-members');

    linkBoard?.addEventListener('click', (e) => {
      e.preventDefault();
      switchBoardCategory('all');
    });

    linkResources?.addEventListener('click', (e) => {
      e.preventDefault();
      switchBoardCategory('resource');
    });

    linkQna?.addEventListener('click', (e) => {
      e.preventDefault();
      switchBoardCategory('question');
    });

    linkMembers?.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('members')?.scrollIntoView({ behavior: 'smooth' });
    });

    // 2. Support & Info Submenus
    const infoLinks = [
      { id: 'footer-link-guide', tab: 'guide' },
      { id: 'footer-link-faq', tab: 'faq' },
      { id: 'footer-link-contact', tab: 'contact' },
      { id: 'footer-link-about', tab: 'about' },
      { id: 'footer-link-terms', tab: 'terms' },
      { id: 'footer-link-privacy', tab: 'privacy' },
    ];

    infoLinks.forEach(({ id, tab }) => {
      const el = document.getElementById(id);
      el?.addEventListener('click', (e) => {
        e.preventDefault();
        openInfoModal(tab);
      });
    });
  }

  async function switchBoardCategory(category) {
    currentCategory = category;
    currentPage = 1;

    // Update active tab buttons in board UI
    document.querySelectorAll('.board-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.category === category);
    });

    const searchInput = document.getElementById('search-input');
    const query = searchInput ? searchInput.value.trim() : '';

    await loadPosts(query);

    const boardEl = document.getElementById('board');
    if (boardEl) {
      boardEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // ===== INFO & SUPPORT MODAL =====
  function initInfoModal() {
    const modal = document.getElementById('info-modal');
    const closeBtn = document.getElementById('modal-close-info');
    const tabs = document.querySelectorAll('.info-tab-btn');

    closeBtn?.addEventListener('click', () => {
      modal?.classList.remove('active');
    });

    modal?.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });

    tabs.forEach(tabBtn => {
      tabBtn.addEventListener('click', () => {
        const tabKey = tabBtn.dataset.tab;
        if (tabKey) {
          switchInfoTab(tabKey);
        }
      });
    });
  }

  function openInfoModal(tabKey = 'guide') {
    const modal = document.getElementById('info-modal');
    if (!modal) return;

    currentInfoTab = tabKey;
    switchInfoTab(tabKey);
    modal.classList.add('active');
  }

  function switchInfoTab(tabKey) {
    currentInfoTab = tabKey;

    // Update tab button active styles
    document.querySelectorAll('.info-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabKey);
    });

    // Update Modal Header Icon
    const iconEl = document.getElementById('info-modal-icon');
    const icons = {
      guide: '📖',
      faq: '❓',
      contact: '✉️',
      about: '🌏',
      terms: '📜',
      privacy: '🔒'
    };

    if (iconEl) iconEl.textContent = icons[tabKey] || 'ℹ️';

    renderInfoTab(tabKey);
  }

  function renderInfoTab(tabKey) {
    const bodyEl = document.getElementById('info-modal-body');
    const titleEl = document.getElementById('info-modal-title');
    const subtitleEl = document.getElementById('info-modal-subtitle');
    if (!bodyEl) return;

    const langData = (typeof INFO_CENTER_DATA !== 'undefined' && INFO_CENTER_DATA[currentLang]) ? INFO_CENTER_DATA[currentLang] : (INFO_CENTER_DATA && INFO_CENTER_DATA['vi']);
    if (!langData) return;

    const tabData = langData[tabKey];
    if (!tabData) return;

    if (titleEl) titleEl.textContent = tabData.title;
    if (subtitleEl) subtitleEl.textContent = tabData.subtitle;

    let html = '';

    if (tabKey === 'guide') {
      html = `
        <div class="info-section-intro">
          <h4>${tabData.intro_title}</h4>
          <p>${tabData.intro_desc}</p>
        </div>
        <div class="guide-steps-grid">
          ${tabData.steps.map(s => `
            <div class="guide-step-card">
              <div class="guide-step-number">${s.num}</div>
              <div class="guide-step-title">${s.icon} ${s.title}</div>
              <div class="guide-step-desc">${s.desc}</div>
              <div class="guide-step-tip">💡 ${s.tip}</div>
            </div>
          `).join('')}
        </div>
      `;
    } else if (tabKey === 'faq') {
      html = `
        <div class="info-section-intro">
          <h4>${tabData.intro_title}</h4>
          <p>${tabData.intro_desc}</p>
        </div>
        <div class="faq-list">
          ${tabData.items.map((item, idx) => `
            <div class="faq-item ${idx === 0 ? 'open' : ''}" data-faq-index="${idx}">
              <div class="faq-question">
                <span>${item.q}</span>
                <span class="faq-chevron">▼</span>
              </div>
              <div class="faq-answer">
                ${item.a}
              </div>
            </div>
          `).join('')}
        </div>
      `;
    } else if (tabKey === 'contact') {
      const userAuthor = currentUser ? currentUser.name : '';
      const userEmail = currentUser ? currentUser.email : '';
      html = `
        <div class="contact-layout">
          <div class="contact-card">
            <h5>✉️ ${tabData.form_title}</h5>
            <form id="contact-support-form" class="write-form" style="display:flex; flex-direction:column; gap:12px;">
              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label">${tabData.name_label}</label>
                <input type="text" id="contact-name" class="form-input" required value="${userAuthor}" placeholder="${tabData.name_placeholder}">
              </div>
              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label">${tabData.email_label}</label>
                <input type="email" id="contact-email" class="form-input" required value="${userEmail}" placeholder="${tabData.email_placeholder}">
              </div>
              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label">${tabData.cat_label}</label>
                <select id="contact-category" class="form-select">
                  ${tabData.cat_options.map(o => `<option value="${o.val}">${o.text}</option>`).join('')}
                </select>
              </div>
              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label">${tabData.subj_label}</label>
                <input type="text" id="contact-subject" class="form-input" required placeholder="${tabData.subj_placeholder}">
              </div>
              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label">${tabData.msg_label}</label>
                <textarea id="contact-message" class="form-textarea" rows="4" required placeholder="${tabData.msg_placeholder}"></textarea>
              </div>
              <button type="submit" class="btn btn-primary" id="btn-submit-contact" style="width:100%; margin-top:8px;">
                🚀 ${tabData.btn_submit}
              </button>
            </form>
          </div>

          <div>
            <div class="contact-card">
              <h5>🏢 ${tabData.offices_title}</h5>
              <div class="office-item">
                <div class="office-title">${tabData.vn_title}</div>
                <div class="office-detail">${tabData.vn_addr}</div>
                <div class="office-detail">${tabData.vn_email}</div>
                <div class="office-detail">${tabData.vn_tel}</div>
              </div>
              <div class="office-item">
                <div class="office-title">${tabData.kr_title}</div>
                <div class="office-detail">${tabData.kr_addr}</div>
                <div class="office-detail">${tabData.kr_email}</div>
                <div class="office-detail">${tabData.kr_tel}</div>
              </div>
              <div style="font-size:0.8rem; color:var(--neutral-500); padding:8px 12px; background:var(--neutral-100); border-radius:var(--radius-sm); line-height:1.5;">
                <strong>${tabData.hours_title}</strong>: ${tabData.hours_text}
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (tabKey === 'about') {
      html = `
        <div class="about-hero-box">
          <h3>${tabData.banner_title}</h3>
          <p>${tabData.banner_desc}</p>
        </div>
        <div class="pillars-grid">
          ${tabData.pillars.map(p => `
            <div class="pillar-card">
              <div class="pillar-icon">${p.icon}</div>
              <div class="pillar-title">${p.title}</div>
              <div class="pillar-desc">${p.desc}</div>
            </div>
          `).join('')}
        </div>
        <div class="info-section-intro">
          <h4>💡 ${tabData.story_title}</h4>
          <p style="white-space:pre-line; line-height:1.7;">${tabData.story_text}</p>
        </div>
      `;
    } else if (tabKey === 'terms') {
      html = `
        <div class="legal-box">
          <div style="margin-bottom:var(--space-md); padding-bottom:var(--space-sm); border-bottom:1px solid var(--neutral-200);">
            <h4 style="color:var(--neutral-900); font-size:1.15rem; margin-bottom:4px;">${tabData.title}</h4>
            <p style="color:var(--neutral-500); font-size:0.85rem; margin:0;">${tabData.subtitle}</p>
          </div>
          ${tabData.articles.map(art => `
            <div class="legal-article">
              <div class="legal-article-title">
                <span class="legal-article-badge">#${art.id}</span>
                <span>${art.title}</span>
              </div>
              <div class="legal-article-body">${art.text}</div>
            </div>
          `).join('')}
        </div>
      `;
    } else if (tabKey === 'privacy') {
      html = `
        <div class="legal-box">
          <div style="margin-bottom:var(--space-md); padding-bottom:var(--space-sm); border-bottom:1px solid var(--neutral-200);">
            <h4 style="color:var(--neutral-900); font-size:1.15rem; margin-bottom:4px;">${tabData.title}</h4>
            <p style="color:var(--neutral-500); font-size:0.85rem; margin:0;">${tabData.subtitle}</p>
          </div>
          ${tabData.articles.map(art => `
            <div class="legal-article">
              <div class="legal-article-title">
                <span class="legal-article-badge">#${art.id}</span>
                <span>${art.title}</span>
              </div>
              <div class="legal-article-body">${art.text}</div>
            </div>
          `).join('')}
        </div>
      `;
    }

    bodyEl.innerHTML = html;

    // Attach FAQ accordion toggle
    if (tabKey === 'faq') {
      bodyEl.querySelectorAll('.faq-item').forEach(item => {
        const questionEl = item.querySelector('.faq-question');
        questionEl?.addEventListener('click', () => {
          const isOpen = item.classList.contains('open');
          bodyEl.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
          if (!isOpen) {
            item.classList.add('open');
          }
        });
      });
    }

    // Attach Contact Form submit event
    if (tabKey === 'contact') {
      const contactForm = bodyEl.querySelector('#contact-support-form');
      contactForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const category = document.getElementById('contact-category').value;
        const subject = document.getElementById('contact-subject').value.trim();
        const message = document.getElementById('contact-message').value.trim();

        if (!name || !email || !subject || !message) {
          alert(currentLang === 'vi' ? 'Vui lòng điền đầy đủ các thông tin.' : '모든 필수 항목을 입력해주세요.');
          return;
        }

        const submitBtn = document.getElementById('btn-submit-contact');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = currentLang === 'vi' ? 'Đang gửi...' : '전송 중...';
        }

        try {
          const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, category, subject, message })
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'Failed');

          contactForm.reset();
          showToast(currentLang === 'vi'
            ? '✅ Tin nhắn đã được gửi thành công! Ban quản trị sẽ phản hồi sớm nhất.'
            : currentLang === 'ko'
            ? '✅ 문의가 성공적으로 접수되었습니다! 빠른 시일 내에 답변드리겠습니다.'
            : '✅ Message sent successfully! We will get back to you shortly.'
          );
        } catch (err) {
          alert('Lỗi / 오류: ' + err.message);
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = '🚀 ' + tabData.btn_submit;
          }
        }
      });
    }
  }

  // ===== SMOOTH SCROLLING =====
  function initSmoothScrolling() {
    // Logo Click to Home
    const logoHome = document.getElementById('logo-home');
    const footerLogoHome = document.getElementById('footer-logo-home');
    const scrollToHome = (e) => {
      e?.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.location.hash !== '#home') {
        try { history.pushState(null, '', '#home'); } catch (_) {}
      }
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      document.querySelector('.nav-link[href="#home"]')?.classList.add('active');
    };
    logoHome?.addEventListener('click', scrollToHome);
    footerLogoHome?.addEventListener('click', scrollToHome);

    document.querySelectorAll('a[href^="#"]').forEach(link => {
      // Exclude logos, footer submenu links and modal buttons that have specialized handlers
      if (link.id === 'logo-home' || link.id === 'footer-logo-home' || link.dataset.infoTab || link.id?.startsWith('footer-link-') || link.getAttribute('href') === '#info-modal') {
        return;
      }
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          document.getElementById('nav-menu')?.classList.remove('open');
        }
      });
    });

    document.getElementById('btn-join')?.addEventListener('click', () => {
      if (!currentUser) {
        document.getElementById('register-modal')?.classList.add('active');
      } else {
        resetWriteForm();
        document.getElementById('write-modal')?.classList.add('active');
      }
    });

    document.getElementById('btn-explore')?.addEventListener('click', () => {
      document.getElementById('board')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ===== COUNTER ANIMATION =====
  function animateCounters() {
    const counters = [
      { el: document.getElementById('stat-teachers'), target: 1240 },
      { el: document.getElementById('stat-resources'), target: 3580 },
      { el: document.getElementById('stat-posts'), target: 8920 },
      { el: document.getElementById('stat-translations'), target: 15600 },
    ];

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counterData = counters.find(c => c.el === entry.target);
          if (counterData && !counterData.animated) {
            counterData.animated = true;
            animateNumber(counterData.el, counterData.target);
          }
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => {
      if (c.el) observer.observe(c.el);
    });
  }

  function animateNumber(el, target) {
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      el.textContent = current.toLocaleString();
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // ===== ADMIN DASHBOARD =====
  function initAdminDashboard() {
    const adminModal = document.getElementById('admin-modal');
    const btnOpenAdmin = document.getElementById('btn-open-admin');
    const btnCloseAdmin = document.getElementById('modal-close-admin');
    const adminTabBtns = document.querySelectorAll('.admin-tab-btn');
    let currentAdminTab = 'stats';

    btnOpenAdmin?.addEventListener('click', () => {
      adminModal.classList.add('active');
      switchAdminTab('stats');
    });

    btnCloseAdmin?.addEventListener('click', () => {
      adminModal.classList.remove('active');
    });

    adminModal?.addEventListener('click', (e) => {
      if (e.target === adminModal) adminModal.classList.remove('active');
    });

    adminTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        switchAdminTab(tab);
      });
    });

    async function switchAdminTab(tabName) {
      currentAdminTab = tabName;
      adminTabBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === tabName));
      const body = document.getElementById('admin-modal-body');
      if (!body) return;

      body.innerHTML = '<div style="text-align:center; padding: 40px; color: var(--neutral-500);">Đang tải dữ liệu / 로딩 중...</div>';

      try {
        if (tabName === 'stats') {
          await renderAdminStats(body);
        } else if (tabName === 'posts') {
          await renderAdminPosts(body);
        } else if (tabName === 'users') {
          await renderAdminUsers(body);
        } else if (tabName === 'comments') {
          await renderAdminComments(body);
        } else if (tabName === 'notice') {
          renderAdminNoticeForm(body);
        } else if (tabName === 'security') {
          renderAdminSecurity(body);
        }
      } catch (err) {
        body.innerHTML = `<div style="color: #dc2626; padding: 20px;">Lỗi tải dữ liệu / 데이터 로딩 오류: ${err.message}</div>`;
      }
    }

    async function renderAdminStats(container) {
      const res = await fetch('/api/admin/stats');
      const stats = await res.json();

      const vnPosts = stats.postsByCountry.find(c => c.country === 'vietnam')?.count || 0;
      const krPosts = stats.postsByCountry.find(c => c.country === 'korea')?.count || 0;
      const totalPostCountry = vnPosts + krPosts || 1;
      const vnPostPercent = Math.round((vnPosts / totalPostCountry) * 100);
      const krPostPercent = 100 - vnPostPercent;

      const vnUsers = stats.usersByCountry.find(c => c.country === 'vietnam')?.count || 0;
      const krUsers = stats.usersByCountry.find(c => c.country === 'korea')?.count || 0;
      const totalUsersCountry = vnUsers + krUsers || 1;
      const vnUserPercent = Math.round((vnUsers / totalUsersCountry) * 100);
      const krUserPercent = 100 - vnUserPercent;

      container.innerHTML = `
        <div class="admin-stats-grid">
          <div class="admin-stat-card">
            <div class="admin-stat-icon" style="background: rgba(37, 99, 168, 0.12); color: #2563eb;">📝</div>
            <div class="admin-stat-info">
              <div class="admin-stat-val">${stats.totalPosts}</div>
              <div class="admin-stat-label">${currentLang === 'vi' ? 'Tổng bài viết' : currentLang === 'ko' ? '총 게시글 수' : 'Total Posts'}</div>
            </div>
          </div>
          <div class="admin-stat-card">
            <div class="admin-stat-icon" style="background: rgba(232, 93, 58, 0.12); color: #e85d3a;">👥</div>
            <div class="admin-stat-info">
              <div class="admin-stat-val">${stats.totalUsers}</div>
              <div class="admin-stat-label">${currentLang === 'vi' ? 'Giáo viên thành viên' : currentLang === 'ko' ? '총 교사 회원' : 'Total Teachers'}</div>
            </div>
          </div>
          <div class="admin-stat-card">
            <div class="admin-stat-icon" style="background: rgba(20, 145, 155, 0.12); color: #14919b;">💬</div>
            <div class="admin-stat-info">
              <div class="admin-stat-val">${stats.totalComments}</div>
              <div class="admin-stat-label">${currentLang === 'vi' ? 'Tổng bình luận' : currentLang === 'ko' ? '누적 댓글' : 'Total Comments'}</div>
            </div>
          </div>
          <div class="admin-stat-card">
            <div class="admin-stat-icon" style="background: rgba(245, 158, 11, 0.12); color: #d97706;">👁️</div>
            <div class="admin-stat-info">
              <div class="admin-stat-val">${stats.totalViews?.toLocaleString()}</div>
              <div class="admin-stat-label">${currentLang === 'vi' ? 'Tổng lượt xem' : currentLang === 'ko' ? '누적 조회수' : 'Total Views'}</div>
            </div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px;">
          <div class="admin-dist-card">
            <div class="admin-dist-header">
              <strong>${currentLang === 'vi' ? 'Tỷ lệ bài viết theo quốc gia' : currentLang === 'ko' ? '국적별 게시글 비중' : 'Posts by Country'}</strong>
              <span style="font-size: 0.85rem; color: var(--neutral-600);">🇻🇳 ${vnPostPercent}% vs 🇰🇷 ${krPostPercent}%</span>
            </div>
            <div class="admin-dist-bar">
              <div class="admin-dist-vn" style="width: ${vnPostPercent}%;"></div>
              <div class="admin-dist-kr" style="width: ${krPostPercent}%;"></div>
            </div>
            <div style="display:flex; justify-content: space-between; margin-top: 8px; font-size: 0.82rem; color: var(--neutral-500);">
              <span>🇻🇳 베트남: ${vnPosts}건</span>
              <span>🇰🇷 한국: ${krPosts}건</span>
            </div>
          </div>

          <div class="admin-dist-card">
            <div class="admin-dist-header">
              <strong>${currentLang === 'vi' ? 'Tỷ lệ giáo viên theo quốc gia' : currentLang === 'ko' ? '국적별 회원 비중' : 'Members by Country'}</strong>
              <span style="font-size: 0.85rem; color: var(--neutral-600);">🇻🇳 ${vnUserPercent}% vs 🇰🇷 ${krUserPercent}%</span>
            </div>
            <div class="admin-dist-bar">
              <div class="admin-dist-vn" style="width: ${vnUserPercent}%;"></div>
              <div class="admin-dist-kr" style="width: ${krUserPercent}%;"></div>
            </div>
            <div style="display:flex; justify-content: space-between; margin-top: 8px; font-size: 0.82rem; color: var(--neutral-500);">
              <span>🇻🇳 베트남 교사: ${vnUsers}명</span>
              <span>🇰🇷 한국 교사: ${krUsers}명</span>
            </div>
          </div>
        </div>

        <div class="admin-dist-card" style="margin-top: 16px;">
          <div class="admin-dist-header">
            <strong>${currentLang === 'vi' ? 'Phân loại chuyên mục' : currentLang === 'ko' ? '게시판 카테고리별 현황' : 'Posts by Category'}</strong>
          </div>
          <div style="display:flex; gap: 10px; flex-wrap: wrap;">
            ${stats.postsByCategory.map(cat => `
              <div style="background: var(--neutral-100); border: 1px solid var(--neutral-200); padding: 8px 14px; border-radius: var(--radius-md); font-size: 0.88rem;">
                <strong>${cat.category === 'resource' ? '📚 자료공유' : cat.category === 'question' ? '❓ 질문/답변' : cat.category === 'discussion' ? '💬 토론' : '📢 공지사항'}:</strong>
                <span style="color: var(--primary-700); font-weight: 700; margin-left: 4px;">${cat.count}건</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    async function renderAdminPosts(container) {
      const res = await fetch('/api/admin/posts');
      const posts = await res.json();

      container.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; gap: 12px; flex-wrap: wrap;">
          <input type="text" id="admin-post-filter" class="form-input" style="max-width: 300px; padding: 6px 12px; font-size: 0.88rem;" placeholder="${currentLang === 'vi' ? 'Tìm bài viết hoặc tác giả...' : '게시글 제목 또는 작성자 검색...'}">
          <div style="font-size: 0.88rem; color: var(--neutral-600);">${currentLang === 'vi' ? 'Tổng cộng' : '전체'}: <strong>${posts.length}</strong>${currentLang === 'vi' ? ' bài' : '개'}</div>
        </div>
        <div class="admin-table-container">
          <table class="admin-table" id="admin-posts-table">
            <thead>
              <tr>
                <th class="col-nowrap" style="width: 100px;">카테고리</th>
                <th style="min-width: 320px;">제목 (3개 국어)</th>
                <th class="col-nowrap">작성자</th>
                <th class="col-nowrap">국적</th>
                <th class="col-nowrap">조회/좋아요</th>
                <th class="col-nowrap">댓글</th>
                <th class="col-nowrap">작성일</th>
                <th class="col-nowrap" style="text-align: center;">관리</th>
              </tr>
            </thead>
            <tbody>
              ${posts.map(p => {
                const title = p.title[currentLang] || p.title.vi || p.title.ko;
                return `
                  <tr id="admin-row-post-${p.id}">
                    <td class="col-nowrap"><span class="badge" style="font-size:0.75rem;">${p.category}</span></td>
                    <td class="col-title">
                      <a href="javascript:void(0)" onclick="window.HoweduBridge.openPost('${p.id}')" style="color: var(--primary-700); font-weight: 600;">
                        ${title}
                      </a>
                    </td>
                    <td class="col-nowrap"><strong>${p.author}</strong></td>
                    <td class="col-nowrap">
                      <span class="${p.country === 'vietnam' ? 'badge-country-vn' : 'badge-country-kr'}">
                        ${p.country === 'vietnam' ? '🇻🇳 베트남' : '🇰🇷 한국'}
                      </span>
                    </td>
                    <td class="col-nowrap">👁️ ${p.views} · ❤️ ${p.likes}</td>
                    <td class="col-nowrap">💬 ${p.commentCount}</td>
                    <td class="col-nowrap" style="font-size: 0.82rem; color: var(--neutral-500);">${p.createdAt.slice(0, 10)}</td>
                    <td class="col-nowrap" style="text-align: center;">
                      <button class="btn-danger-sm" onclick="window.HoweduBridge.adminDeletePost('${p.id}')">
                        🗑️ 삭제
                      </button>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      `;

      const filterInput = document.getElementById('admin-post-filter');
      filterInput?.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        document.querySelectorAll('#admin-posts-table tbody tr').forEach(row => {
          const text = row.textContent.toLowerCase();
          row.style.display = text.includes(query) ? '' : 'none';
        });
      });
    }

    async function renderAdminUsers(container) {
      const res = await fetch('/api/admin/users');
      const users = await res.json();

      container.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <input type="text" id="admin-user-filter" class="form-input" style="max-width: 300px; padding: 6px 12px; font-size: 0.88rem;" placeholder="${currentLang === 'vi' ? 'Tìm thành viên...' : '회원 이름 또는 이메일 검색...'}">
          <div style="font-size: 0.88rem; color: var(--neutral-600);">${currentLang === 'vi' ? 'Tổng thành viên' : '가입 회원'}: <strong>${users.length}</strong>명</div>
        </div>
        <div class="admin-table-container">
          <table class="admin-table" id="admin-users-table">
            <thead>
              <tr>
                <th class="col-nowrap">아이디</th>
                <th class="col-nowrap">이름</th>
                <th class="col-nowrap">국적</th>
                <th class="col-nowrap">직책 / 담당과목</th>
                <th class="col-nowrap">이메일</th>
                <th class="col-nowrap">작성글 수</th>
                <th class="col-nowrap">가입일</th>
                <th class="col-nowrap" style="text-align: center;">관리</th>
              </tr>
            </thead>
            <tbody>
              ${users.map(u => `
                <tr id="admin-row-user-${u.id}">
                  <td class="col-nowrap"><code>${u.username}</code> ${u.username === 'admin' ? '👑' : ''}</td>
                  <td class="col-nowrap"><strong>${u.name}</strong></td>
                  <td class="col-nowrap">
                    <span class="${u.country === 'vietnam' ? 'badge-country-vn' : 'badge-country-kr'}">
                      ${u.country === 'vietnam' ? '🇻🇳 베트남' : '🇰🇷 한국'}
                    </span>
                  </td>
                  <td class="col-nowrap">${u.role}</td>
                  <td class="col-nowrap" style="font-size: 0.82rem;">${u.email}</td>
                  <td class="col-nowrap"><strong>${u.post_count}</strong>개</td>
                  <td class="col-nowrap" style="font-size: 0.82rem; color: var(--neutral-500);">${u.created_at ? u.created_at.slice(0, 10) : '-'}</td>
                  <td class="col-nowrap" style="text-align: center;">
                    ${u.username === 'admin' ? '<span style="color:var(--neutral-400); font-size:0.8rem;">관리자 보호</span>' : `
                      <button class="btn-danger-sm" onclick="window.HoweduBridge.adminDeleteUser('${u.id}')">
                        탈퇴 처리
                      </button>
                    `}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;

      const filterInput = document.getElementById('admin-user-filter');
      filterInput?.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        document.querySelectorAll('#admin-users-table tbody tr').forEach(row => {
          const text = row.textContent.toLowerCase();
          row.style.display = text.includes(query) ? '' : 'none';
        });
      });
    }

    async function renderAdminComments(container) {
      const res = await fetch('/api/admin/comments');
      const comments = await res.json();

      container.innerHTML = `
        <div style="margin-bottom: 12px; font-size: 0.88rem; color: var(--neutral-600);">
          ${currentLang === 'vi' ? 'Quản lý các bình luận gần đây nhất trong cộng đồng' : '플랫폼 전체 게시글에 등록된 최근 댓글 관리'} (최대 100건)
        </div>
        <div class="admin-table-container">
          <table class="admin-table">
            <thead>
              <tr>
                <th class="col-nowrap">작성자</th>
                <th class="col-nowrap">원문 게시글</th>
                <th style="min-width: 300px;">댓글 내용 (다국어)</th>
                <th class="col-nowrap">작성일시</th>
                <th class="col-nowrap" style="text-align: center;">관리</th>
              </tr>
            </thead>
            <tbody>
              ${comments.map(c => `
                <tr id="admin-row-comment-${c.id}">
                  <td class="col-nowrap">
                    <strong>${c.author}</strong><br>
                    <span style="font-size: 0.75rem; color: var(--neutral-500);">${c.country === 'vietnam' ? '🇻🇳 베트남' : '🇰🇷 한국'}</span>
                  </td>
                  <td class="col-nowrap" style="max-width: 260px; overflow: hidden; text-overflow: ellipsis;">
                    <a href="javascript:void(0)" onclick="window.HoweduBridge.openPost('${c.post_id}')" style="color: var(--primary-700); font-size: 0.82rem; font-weight: 600;">
                      ${c.post_title_ko || c.post_title_vi || c.post_id}
                    </a>
                  </td>
                  <td>
                    <div style="font-size: 0.88rem; line-height: 1.4;">${c.text_ko || c.text_vi || c.text_en}</div>
                  </td>
                  <td class="col-nowrap" style="font-size: 0.82rem; color: var(--neutral-500);">${c.created_at ? c.created_at.slice(0, 16) : '-'}</td>
                  <td class="col-nowrap" style="text-align: center;">
                    <button class="btn-danger-sm" onclick="window.HoweduBridge.adminDeleteComment('${c.id}')">
                      삭제
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    function renderAdminNoticeForm(container) {
      container.innerHTML = `
        <div style="background: white; border: 1px solid var(--neutral-200); border-radius: var(--radius-lg); padding: 24px;">
          <h4 style="margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
            <span>📢</span> ${currentLang === 'vi' ? 'Đăng thông báo chính thức toàn hệ thống' : '전체 공지사항 즉시 발송'}
          </h4>
          <p style="font-size: 0.88rem; color: var(--neutral-500); margin-bottom: 20px;">
            ${currentLang === 'vi' ? 'Bài viết sẽ được tự động dịch sang cả 3 thứ tiếng (Việt/Hàn/Anh) và ghim lên đầu diễn đàn dưới danh nghĩa Ban điều hành.' : '작성한 공지는 베트남어, 한국어, 영어 3개 국어로 자동 번역되어 게시판 최상단에 등록됩니다.'}
          </p>

          <form id="admin-notice-form">
            <div class="form-group">
              <label class="form-label">${currentLang === 'vi' ? 'Tiêu đề thông báo' : '공지사항 제목'}</label>
              <input type="text" class="form-input" id="admin-notice-title" required placeholder="${currentLang === 'vi' ? 'Ví dụ: [Thông báo] Cập nhật hướng dẫn sử dụng...' : '예: [공지] 2026 베·한 교사 세미나 개최 안내'}">
            </div>
            <div class="form-group">
              <label class="form-label">${currentLang === 'vi' ? 'Nội dung thông báo' : '공지사항 본문 내용'}</label>
              <textarea class="form-textarea" id="admin-notice-content" rows="6" required placeholder="${currentLang === 'vi' ? 'Nhập nội dung thông báo chính thức...' : '선생님들께 전달할 공지사항 상세 내용을 입력하세요.'}"></textarea>
            </div>
            <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 20px;">
              <button type="submit" class="btn btn-primary" id="btn-admin-submit-notice">
                📢 ${currentLang === 'vi' ? 'Phát hành thông báo' : '공지사항 즉시 등록'}
              </button>
            </div>
          </form>
        </div>
      `;

      document.getElementById('admin-notice-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('admin-notice-title').value.trim();
        const content = document.getElementById('admin-notice-content').value.trim();
        const submitBtn = document.getElementById('btn-admin-submit-notice');
        if (submitBtn) submitBtn.disabled = true;

        try {
          const res = await fetch('/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              category: 'notice',
              lang: currentLang,
              author: 'HoweduBridge 운영팀',
              country: 'korea',
              title,
              content
            })
          });

          if (!res.ok) throw new Error('공지 등록 실패');
          showToast(currentLang === 'vi' ? 'Đã đăng thông báo thành công!' : '공지사항이 성공적으로 등록되었습니다!');
          adminModal.classList.remove('active');
          await loadPosts();
        } catch (err) {
          alert(err.message);
        } finally {
          if (submitBtn) submitBtn.disabled = false;
        }
      });
    }

    function renderAdminSecurity(container) {
      container.innerHTML = `
        <div style="background: white; border: 1px solid var(--neutral-200); border-radius: var(--radius-lg); padding: 28px; max-width: 580px; margin: 0 auto; box-shadow: var(--shadow-sm);">
          <div style="text-align: center; margin-bottom: 24px;">
            <div style="width: 52px; height: 52px; border-radius: 50%; background: #fef3c7; color: #b45309; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; margin: 0 auto 12px;">⚙️</div>
            <h4 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 6px;">
              ${currentLang === 'vi' ? 'Đổi tên đăng nhập & Mật khẩu Quản trị' : currentLang === 'ko' ? '관리자 아이디 및 비밀번호 변경' : 'Change Admin Username & Password'}
            </h4>
            <p style="font-size: 0.85rem; color: var(--neutral-500); line-height: 1.5;">
              ${currentLang === 'vi' ? 'Cập nhật tài khoản quản trị viên tối cao để đảm bảo an toàn cho nền tảng HoweduBridge.' : '시스템 최고 관리자의 로그인 아이디와 비밀번호를 안전하게 변경합니다. 변경 후 새 정보로 즉시 적용됩니다.'}
            </p>
          </div>

          <form id="admin-security-form">
            <div class="form-group" style="margin-bottom: 18px;">
              <label class="form-label" style="font-weight: 600;">
                🔒 ${currentLang === 'vi' ? 'Mật khẩu hiện tại (Bắt buộc)' : '현재 사용 중인 비밀번호'}
              </label>
              <input type="password" class="form-input" id="admin-sec-current-pwd" required placeholder="••••••••">
            </div>

            <div style="border-top: 1px dashed var(--neutral-200); margin: 20px 0; padding-top: 20px;">
              <div class="form-group" style="margin-bottom: 18px;">
                <label class="form-label" style="font-weight: 600;">
                  👤 ${currentLang === 'vi' ? 'Tên đăng nhập mới (ID)' : '새 관리자 아이디 (ID)'}
                </label>
                <input type="text" class="form-input" id="admin-sec-new-username" required value="${currentUser?.username || 'admin'}" placeholder="admin_new">
                <div style="font-size: 0.76rem; color: var(--neutral-400); margin-top: 4px;">* ${currentLang === 'vi' ? 'Tối thiểu 3 ký tự (chữ cái và số)' : '영문/숫자 조합 최소 3자 이상'}</div>
              </div>

              <div class="form-group" style="margin-bottom: 18px;">
                <label class="form-label" style="font-weight: 600;">
                  🔑 ${currentLang === 'vi' ? 'Mật khẩu mới' : '새 비밀번호'}
                </label>
                <input type="password" class="form-input" id="admin-sec-new-pwd" required placeholder="••••••••">
                <div style="font-size: 0.76rem; color: var(--neutral-400); margin-top: 4px;">* ${currentLang === 'vi' ? 'Tối thiểu 4 ký tự' : '최소 4자 이상 입력'}</div>
              </div>

              <div class="form-group" style="margin-bottom: 24px;">
                <label class="form-label" style="font-weight: 600;">
                  ✅ ${currentLang === 'vi' ? 'Xác nhận mật khẩu mới' : '새 비밀번호 확인'}
                </label>
                <input type="password" class="form-input" id="admin-sec-confirm-pwd" required placeholder="••••••••">
              </div>
            </div>

            <button type="submit" class="btn btn-primary" id="btn-admin-save-security" style="width: 100%; justify-content: center; padding: 12px; font-weight: 700;">
              💾 ${currentLang === 'vi' ? 'Lưu thay đổi tài khoản' : '관리자 계정 정보 변경 저장'}
            </button>
          </form>
        </div>
      `;

      document.getElementById('admin-security-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const currentPassword = document.getElementById('admin-sec-current-pwd').value;
        const newUsername = document.getElementById('admin-sec-new-username').value.trim();
        const newPassword = document.getElementById('admin-sec-new-pwd').value;
        const confirmPassword = document.getElementById('admin-sec-confirm-pwd').value;

        if (newPassword !== confirmPassword) {
          alert(currentLang === 'vi' ? 'Mật khẩu xác nhận không trùng khớp.' : '새 비밀번호가 서로 일치하지 않습니다.');
          return;
        }

        const submitBtn = document.getElementById('btn-admin-save-security');
        if (submitBtn) submitBtn.disabled = true;

        try {
          const res = await fetch('/api/admin/change-credentials', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ currentPassword, newUsername, newPassword })
          });

          const data = await res.json();
          if (!res.ok) throw new Error(data.error || '변경 실패');

          // Update current user in memory and localStorage
          currentUser = data.user;
          try {
            localStorage.setItem('howedubridge_user', JSON.stringify(currentUser));
            localStorage.setItem('edubridge_user', JSON.stringify(currentUser));
          } catch (_) {}

          updateAuthUI();
          showToast(currentLang === 'vi' ? 'Đã đổi tên đăng nhập và mật khẩu quản trị thành công!' : '관리자 아이디와 비밀번호가 성공적으로 변경되었습니다!');
          
          // Re-render form with updated username
          renderAdminSecurity(container);
        } catch (err) {
          alert(err.message);
        } finally {
          if (submitBtn) submitBtn.disabled = false;
        }
      });
    }
  }

  // ===== ADMIN ACTIONS =====
  async function adminDeletePost(postId, closeDetailModal = false) {
    const confirmMsg = currentLang === 'vi' ? 'Thầy/Cô có chắc chắn muốn xóa bài viết này không?' : '정말 이 게시글을 삭제하시겠습니까? (댓글도 함께 삭제됩니다)';
    if (!confirm(confirmMsg)) return;

    try {
      const res = await fetch(`/api/admin/posts/${postId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('삭제 실패');

      document.getElementById(`admin-row-post-${postId}`)?.remove();
      if (closeDetailModal) {
        document.getElementById('post-modal')?.classList.remove('active');
      }
      showToast(currentLang === 'vi' ? 'Đã xóa bài viết thành công.' : '게시글이 삭제되었습니다.');
      await loadPosts();
    } catch (err) {
      alert(err.message);
    }
  }

  async function adminDeleteUser(userId) {
    const confirmMsg = currentLang === 'vi' ? 'Thầy/Cô có chắc chắn muốn xóa tài khoản này không?' : '정말 이 회원을 탈퇴 처리하시겠습니까?';
    if (!confirm(confirmMsg)) return;

    try {
      const res = await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '삭제 실패');

      document.getElementById(`admin-row-user-${userId}`)?.remove();
      showToast(currentLang === 'vi' ? 'Đã xóa người dùng thành công.' : '회원이 탈퇴 처리되었습니다.');
      await renderMembers();
    } catch (err) {
      alert(err.message);
    }
  }

  async function adminDeleteComment(commentId) {
    const confirmMsg = currentLang === 'vi' ? 'Thầy/Cô có chắc chắn muốn xóa bình luận này không?' : '정말 이 댓글을 삭제하시겠습니까?';
    if (!confirm(confirmMsg)) return;

    try {
      const res = await fetch(`/api/admin/comments/${commentId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('삭제 실패');

      document.getElementById(`admin-row-comment-${commentId}`)?.remove();
      showToast(currentLang === 'vi' ? 'Đã xóa bình luận.' : '댓글이 삭제되었습니다.');
    } catch (err) {
      alert(err.message);
    }
  }

  // ===== TOAST =====
  function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>✅</span><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // ===== PUBLIC API =====
  window.HoweduBridge = {
    openPost,
    switchDetailLang,
    addComment,
    likePost,
    showToast,
    goToPage,
    openInfoModal,
    switchBoardCategory,
    adminDeletePost,
    adminDeleteUser,
    adminDeleteComment
  };
  window.EduBridge = window.HoweduBridge;

  // ===== START =====
  document.addEventListener('DOMContentLoaded', init);
})();
