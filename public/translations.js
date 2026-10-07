// ===== TRANSLATIONS DATA =====
// Complete i18n translations for Korean, English, and Vietnamese

const TRANSLATIONS = {
  ko: {
    // Navigation
    nav_home: '홈',
    nav_features: '소개',
    nav_board: '게시판',
    nav_members: '회원',
    nav_write: '✏️ 글쓰기',
    nav_register: '👤 회원가입',
    nav_login: '🔑 로그인',
    nav_logout: '🚪 로그아웃',
    nav_admin_panel: '👑 관리자 센터',
    admin_title: 'HoweduBridge 시스템 관리자 센터',
    admin_subtitle: '게시글, 회원, 댓글 및 플랫폼 활동 통계 통합 관리',
    admin_tab_stats: '📊 현황 요약',
    admin_tab_posts: '📝 게시글 관리',
    admin_tab_users: '👥 회원 관리',
    admin_tab_comments: '💬 댓글 관리',
    admin_tab_notice: '📢 공지 발송',
    admin_tab_security: '⚙️ 계정 보안',
    admin_sec_title: '관리자 아이디 및 비밀번호 변경',
    admin_sec_subtitle: '시스템 관리자 로그인 아이디와 접속 비밀번호를 안전하게 변경합니다.',
    admin_current_password: '현재 비밀번호',
    admin_new_username: '새 관리자 아이디 (ID)',
    admin_new_password: '새 비밀번호',
    admin_confirm_password: '새 비밀번호 확인',
    admin_btn_save_security: '관리자 계정 정보 변경',
    admin_security_success: '관리자 아이디와 비밀번호가 성공적으로 변경되었습니다!',
    admin_password_mismatch: '새 비밀번호가 서로 일치하지 않습니다.',
    admin_total_posts: '총 게시글',
    admin_total_users: '총 회원 수',
    admin_total_comments: '총 누적 댓글',
    admin_total_views: '총 누적 조회수',
    admin_btn_delete: '삭제',
    admin_confirm_delete: '정말 삭제하시겠습니까? (삭제된 데이터는 복구할 수 없습니다)',
    admin_login_demo: '👑 관리자 계정으로 바로 로그인 (admin)',
    user_greeting: '선생님 환영합니다!',

    // Hero
    hero_badge: '베트남·한국 교사 커뮤니티',
    hero_title: '교육의 다리를 놓는<br><span class="highlight">HoweduBridge</span>',
    hero_desc: '베트남과 한국의 교사들이 언어 장벽 없이 교육 자료를 공유하고, 서로의 경험을 나누며 함께 성장하는 글로벌 교육 커뮤니티입니다.',
    hero_join: '커뮤니티 참여하기',
    hero_explore: '둘러보기',

    // Stats
    stat_teachers: '등록 교사',
    stat_resources: '공유 자료',
    stat_posts: '게시글',
    stat_translations: '번역 횟수',

    // Features
    features_label: '주요 기능',
    features_title: '언어의 장벽을 넘어, 교육으로 하나 되다',
    features_desc: 'HoweduBridge는 베트남어, 한국어, 영어 실시간 번역 기능과 함께 교사들의 전문성 발전을 지원하는 다양한 기능을 제공합니다.',
    feature_translate_title: '실시간 3개국어 번역',
    feature_translate_desc: '베트남어, 한국어, 영어로 작성된 글을 버튼 하나로 다른 두 언어로 즉시 번역하여 확인할 수 있습니다.',
    feature_resource_title: '교육 자료 교환',
    feature_resource_desc: '수업 계획안, 교수 자료, 워크시트 등 다양한 교육 자료를 자유롭게 공유하고 다운로드할 수 있습니다.',
    feature_qna_title: '문의 & Q&A',
    feature_qna_desc: '교육 방법, 교과 과정, 문화 교류 등에 대해 자유롭게 질문하고 전문적인 답변을 받을 수 있습니다.',
    feature_community_title: '교사 네트워킹',
    feature_community_desc: '베트남과 한국의 교사들과 직접 연결되어 교육 관련 경험과 노하우를 나누고 함께 성장하세요.',

    // Board
    board_label: '커뮤니티 게시판',
    board_title: '함께 나누는 교육 이야기',
    board_desc: '교육 자료, 질문, 토론 등 다양한 주제로 자유롭게 소통하세요. 모든 글은 3개국어로 번역됩니다.',
    tab_all: '📋 전체',
    tab_resource: '📂 자료 공유',
    tab_question: '❓ 질문/문의',
    tab_discussion: '💬 자유 토론',
    tab_notice: '📢 공지사항',
    search_placeholder: '검색어를 입력하세요...',
    btn_write_post: '✏️ 새 글 작성',

    // Members
    members_label: '활동 회원 랭킹',
    members_title: 'Top 10 활동 교사 (최다 게시글 순)',
    members_desc: 'HoweduBridge에서 가장 많은 교육 자료와 글을 공유해 주신 활동 교사 상위 10분입니다.',
    member_posts_suffix: '개 글',

    // Footer
    footer_desc: '베트남과 한국 교사들이 언어 장벽 없이 교육 자료를 공유하고 함께 성장하는 글로벌 교육 커뮤니티 플랫폼입니다.',
    footer_community: '커뮤니티',
    footer_board: '게시판',
    footer_resources: '자료실',
    footer_qna: '질문/답변',
    footer_members: '회원 목록',
    footer_support: '지원',
    footer_guide: '이용 가이드',
    footer_faq: '자주 묻는 질문',
    footer_contact: '문의하기',
    footer_info: '정보',
    footer_about: '소개',
    footer_terms: '이용약관',
    footer_privacy: '개인정보처리방침',

    // Modals
    modal_post_detail: '게시글 상세',
    modal_write_post: '새 글 작성',
    form_category: '카테고리',
    form_language: '작성 언어',
    form_title: '제목',
    form_title_placeholder: '제목을 입력하세요',
    form_content: '내용',
    form_content_placeholder: '내용을 입력하세요...',
    form_author: '작성자 이름',
    form_author_placeholder: '이름을 입력하세요',
    form_image: '📷 이미지 첨부',
    form_image_hint: 'PNG, JPG, GIF, WebP (최대 10MB)',
    form_image_select: '파일 선택 또는 드래그앤드롭',
    form_image_remove: '이미지 삭제',
    has_image: '📷 이미지 포함',
    btn_cancel: '취소',
    btn_submit: '게시하기',
    cat_resource: '📂 자료 공유',
    cat_question: '❓ 질문/문의',
    cat_discussion: '💬 자유 토론',

    // Registration Modal
    modal_register: '교사 회원가입',
    form_username: '아이디 (ID)',
    form_username_placeholder: '아이디를 입력하세요',
    form_password: '비밀번호',
    form_password_placeholder: '비밀번호를 입력하세요',
    form_name: '이름 (성함)',
    form_name_placeholder: '예: 김민수 / Nguyễn Thị Mai',
    form_country: '국적',
    form_role: '직책 / 담당 과목',
    form_role_placeholder: '예: 초등학교 수학 교사, 화학 교사 등',
    form_email: '이메일 주소',
    form_email_placeholder: 'teacher@example.com',
    btn_register: '가입 완료',
    register_success: '회원가입이 완료되었습니다! HoweduBridge에 오신 것을 환영합니다.',

    // Post UI
    views: '조회',
    comments: '댓글',
    likes: '좋아요',
    translate_btn: '🌐 번역 보기',
    translation_title: '번역',
    comment_section_title: '💬 댓글',
    comment_placeholder: '댓글을 입력하세요...',
    btn_comment: '등록',
    translate_to_en: 'English',
    translate_to_vi: 'Tiếng Việt',
    translate_to_ko: '한국어',
    translating: '번역 중...',
    post_success: '게시글이 등록되었습니다!',
    comment_success: '댓글이 등록되었습니다!',
    reply: '답글',
    time_ago: '전',
    country_korea: '🇰🇷 한국',
    country_vietnam: '🇻🇳 베트남',
  },

  en: {
    // Navigation
    nav_home: 'Home',
    nav_features: 'About',
    nav_board: 'Board',
    nav_members: 'Members',
    nav_write: '✏️ Write',
    nav_register: '👤 Sign Up',
    nav_login: '🔑 Log In',
    nav_logout: '🚪 Log Out',
    nav_admin_panel: '👑 Admin Center',
    admin_title: 'HoweduBridge Admin Dashboard',
    admin_subtitle: 'Integrated management of posts, users, comments and platform analytics',
    admin_tab_stats: '📊 Overview',
    admin_tab_posts: '📝 Posts',
    admin_tab_users: '👥 Users',
    admin_tab_comments: '💬 Comments',
    admin_tab_notice: '📢 Notice Broadcast',
    admin_tab_security: '⚙️ Security',
    admin_sec_title: 'Change Admin Username & Password',
    admin_sec_subtitle: 'Update administrator login ID and password securely.',
    admin_current_password: 'Current Password',
    admin_new_username: 'New Admin Username (ID)',
    admin_new_password: 'New Password',
    admin_confirm_password: 'Confirm New Password',
    admin_btn_save_security: 'Update Admin Credentials',
    admin_security_success: 'Admin username and password updated successfully!',
    admin_password_mismatch: 'New passwords do not match.',
    admin_total_posts: 'Total Posts',
    admin_total_users: 'Total Members',
    admin_total_comments: 'Total Comments',
    admin_total_views: 'Total Views',
    admin_btn_delete: 'Delete',
    admin_confirm_delete: 'Are you sure you want to delete this item? (Cannot be undone)',
    admin_login_demo: '👑 Quick Log In as Administrator (admin)',
    user_greeting: 'Welcome, Teacher!',

    // Hero
    hero_badge: 'Vietnamese-Korean Teacher Community',
    hero_title: 'Bridging Education<br><span class="highlight">HoweduBridge</span>',
    hero_desc: 'A global educational community where Vietnamese and Korean teachers share resources, exchange experiences, and grow together without language barriers.',
    hero_join: 'Join Community',
    hero_explore: 'Explore',

    // Stats
    stat_teachers: 'Teachers',
    stat_resources: 'Resources',
    stat_posts: 'Posts',
    stat_translations: 'Translations',

    // Features
    features_label: 'Key Features',
    features_title: 'Beyond Language Barriers, United by Education',
    features_desc: 'HoweduBridge provides real-time translation between Vietnamese, Korean, and English along with tools to support teachers\' professional development.',
    feature_translate_title: 'Real-time Trilingual Translation',
    feature_translate_desc: 'Instantly translate posts written in Vietnamese, Korean, or English into the other two languages with a single click.',
    feature_resource_title: 'Resource Exchange',
    feature_resource_desc: 'Freely share and download lesson plans, teaching materials, worksheets, and various educational resources.',
    feature_qna_title: 'Q&A Forum',
    feature_qna_desc: 'Ask questions and get professional answers about teaching methods, curricula, and cultural exchange.',
    feature_community_title: 'Teacher Networking',
    feature_community_desc: 'Connect directly with teachers from Vietnam and Korea. Share experiences and know-how to grow together.',

    // Board
    board_label: 'Community Board',
    board_title: 'Sharing Educational Stories Together',
    board_desc: 'Communicate freely on topics like resources, questions, and discussions. All posts can be translated into 3 languages.',
    tab_all: '📋 All',
    tab_resource: '📂 Resources',
    tab_question: '❓ Q&A',
    tab_discussion: '💬 Discussion',
    tab_notice: '📢 Notices',
    search_placeholder: 'Search...',
    btn_write_post: '✏️ New Post',

    // Members
    members_label: 'Member Rankings',
    members_title: 'Top 10 Contributing Teachers (Most Posts)',
    members_desc: 'Meet the top 10 teachers who have shared the most educational resources and posts on HoweduBridge.',
    member_posts_suffix: 'posts',

    // Footer
    footer_desc: 'A global educational community platform where Vietnamese and Korean teachers share resources and grow together without language barriers.',
    footer_community: 'Community',
    footer_board: 'Board',
    footer_resources: 'Resources',
    footer_qna: 'Q&A',
    footer_members: 'Members',
    footer_support: 'Support',
    footer_guide: 'User Guide',
    footer_faq: 'FAQ',
    footer_contact: 'Contact Us',
    footer_info: 'Info',
    footer_about: 'About',
    footer_terms: 'Terms of Service',
    footer_privacy: 'Privacy Policy',

    // Modals
    modal_post_detail: 'Post Detail',
    modal_write_post: 'Write New Post',
    form_category: 'Category',
    form_language: 'Language',
    form_title: 'Title',
    form_title_placeholder: 'Enter title',
    form_content: 'Content',
    form_content_placeholder: 'Enter content...',
    form_author: 'Author Name',
    form_author_placeholder: 'Enter your name',
    form_image: '📷 Attach Image',
    form_image_hint: 'PNG, JPG, GIF, WebP (Max 10MB)',
    form_image_select: 'Choose file or drag & drop',
    form_image_remove: 'Remove Image',
    has_image: '📷 Has Image',
    btn_cancel: 'Cancel',
    btn_submit: 'Post',
    cat_resource: '📂 Resource',
    cat_question: '❓ Question',
    cat_discussion: '💬 Discussion',

    // Registration Modal
    modal_register: 'Teacher Sign Up',
    form_username: 'Username (ID)',
    form_username_placeholder: 'Enter username',
    form_password: 'Password',
    form_password_placeholder: 'Enter password',
    form_name: 'Full Name',
    form_name_placeholder: 'e.g. Nguyen Thi Mai',
    form_country: 'Nationality',
    form_role: 'Position / Subject',
    form_role_placeholder: 'e.g. Elementary Math Teacher',
    form_email: 'Email Address',
    form_email_placeholder: 'teacher@example.com',
    btn_register: 'Complete Sign Up',
    register_success: 'Registration complete! Welcome to HoweduBridge.',

    // Post UI
    views: 'views',
    comments: 'comments',
    likes: 'likes',
    translate_btn: '🌐 Translate',
    translation_title: 'Translation',
    comment_section_title: '💬 Comments',
    comment_placeholder: 'Write a comment...',
    btn_comment: 'Post',
    translate_to_en: 'English',
    translate_to_vi: 'Tiếng Việt',
    translate_to_ko: '한국어',
    translating: 'Translating...',
    post_success: 'Post published successfully!',
    comment_success: 'Comment posted successfully!',
    reply: 'Reply',
    time_ago: 'ago',
    country_korea: '🇰🇷 Korea',
    country_vietnam: '🇻🇳 Vietnam',
  },

  vi: {
    // Navigation
    nav_home: 'Trang chủ',
    nav_features: 'Giới thiệu',
    nav_board: 'Diễn đàn',
    nav_members: 'Thành viên',
    nav_write: '✏️ Viết bài',
    nav_register: '👤 Đăng ký',
    nav_login: '🔑 Đăng nhập',
    nav_logout: '🚪 Đăng xuất',
    nav_admin_panel: '👑 Quản trị viên',
    admin_title: 'Trung tâm Quản trị Hệ thống HoweduBridge',
    admin_subtitle: 'Quản lý toàn diện bài viết, thành viên, bình luận và dữ liệu thống kê cộng đồng',
    admin_tab_stats: '📊 Tổng quan',
    admin_tab_posts: '📝 Bài viết',
    admin_tab_users: '👥 Thành viên',
    admin_tab_comments: '💬 Bình luận',
    admin_tab_notice: '📢 Phát thông báo',
    admin_tab_security: '⚙️ Bảo mật',
    admin_sec_title: 'Đổi tên đăng nhập & Mật khẩu Quản trị',
    admin_sec_subtitle: 'Thay đổi tên đăng nhập và mật khẩu quản trị viên để bảo mật hệ thống.',
    admin_current_password: 'Mật khẩu hiện tại',
    admin_new_username: 'Tên đăng nhập mới (ID)',
    admin_new_password: 'Mật khẩu mới',
    admin_confirm_password: 'Xác nhận mật khẩu mới',
    admin_btn_save_security: 'Lưu thay đổi tài khoản',
    admin_security_success: 'Đã đổi tên đăng nhập và mật khẩu quản trị thành công!',
    admin_password_mismatch: 'Mật khẩu xác nhận không trùng khớp.',
    admin_total_posts: 'Tổng bài viết',
    admin_total_users: 'Tổng thành viên',
    admin_total_comments: 'Tổng bình luận',
    admin_total_views: 'Tổng lượt xem',
    admin_btn_delete: 'Xóa',
    admin_confirm_delete: 'Thầy/Cô có chắc chắn muốn xóa mục này không? (Không thể hoàn tác)',
    admin_login_demo: '👑 Đăng nhập nhanh Quản trị viên (admin)',
    user_greeting: 'Xin chào quý thầy cô!',

    // Hero
    hero_badge: 'Cộng đồng Giáo viên Việt - Hàn',
    hero_title: 'Cầu nối Giáo dục<br><span class="highlight">HoweduBridge</span>',
    hero_desc: 'Cộng đồng giáo dục toàn cầu nơi giáo viên Việt Nam và Hàn Quốc chia sẻ tài liệu, trao đổi kinh nghiệm và cùng phát triển không có rào cản ngôn ngữ.',
    hero_join: 'Tham gia cộng đồng',
    hero_explore: 'Khám phá',

    // Stats
    stat_teachers: 'Giáo viên',
    stat_resources: 'Tài liệu',
    stat_posts: 'Bài viết',
    stat_translations: 'Lượt dịch',

    // Features
    features_label: 'Tính năng chính',
    features_title: 'Vượt qua rào cản ngôn ngữ, thống nhất bằng giáo dục',
    features_desc: 'HoweduBridge cung cấp dịch thuật thời gian thực giữa tiếng Việt, tiếng Hàn và tiếng Anh cùng các công cụ hỗ trợ phát triển chuyên môn cho giáo viên.',
    feature_translate_title: 'Dịch thuật 3 ngôn ngữ thời gian thực',
    feature_translate_desc: 'Dịch ngay lập tức bài viết bằng tiếng Việt, tiếng Hàn hoặc tiếng Anh sang hai ngôn ngữ còn lại chỉ bằng một cú nhấp.',
    feature_resource_title: 'Trao đổi tài liệu',
    feature_resource_desc: 'Tự do chia sẻ và tải xuống kế hoạch bài giảng, tài liệu giảng dạy, bài tập và nhiều tài liệu giáo dục khác.',
    feature_qna_title: 'Hỏi & Đáp',
    feature_qna_desc: 'Đặt câu hỏi và nhận câu trả lời chuyên nghiệp về phương pháp giảng dạy, chương trình giáo dục và giao lưu văn hóa.',
    feature_community_title: 'Kết nối giáo viên',
    feature_community_desc: 'Kết nối trực tiếp với giáo viên từ Việt Nam và Hàn Quốc. Chia sẻ kinh nghiệm và bí quyết để cùng phát triển.',

    // Board
    board_label: 'Diễn đàn cộng đồng',
    board_title: 'Cùng chia sẻ câu chuyện giáo dục',
    board_desc: 'Giao tiếp tự do về các chủ đề như tài liệu, câu hỏi và thảo luận. Tất cả bài viết có thể được dịch sang 3 ngôn ngữ.',
    tab_all: '📋 Tất cả',
    tab_resource: '📂 Tài liệu',
    tab_question: '❓ Hỏi/Đáp',
    tab_discussion: '💬 Thảo luận',
    tab_notice: '📢 Thông báo',
    search_placeholder: 'Tìm kiếm...',
    btn_write_post: '✏️ Viết bài mới',

    // Members
    members_label: 'Bảng xếp hạng thành viên',
    members_title: 'Top 10 Giáo viên tích cực nhất (Bài viết nhiều nhất)',
    members_desc: 'Danh sách 10 giáo viên đã chia sẻ nhiều tài liệu và bài viết nhất trên cộng đồng HoweduBridge.',
    member_posts_suffix: 'bài viết',

    // Footer
    footer_desc: 'Nền tảng cộng đồng giáo dục toàn cầu nơi giáo viên Việt Nam và Hàn Quốc chia sẻ tài liệu và cùng phát triển.',
    footer_community: 'Cộng đồng',
    footer_board: 'Diễn đàn',
    footer_resources: 'Tài liệu',
    footer_qna: 'Hỏi/Đáp',
    footer_members: 'Thành viên',
    footer_support: 'Hỗ trợ',
    footer_guide: 'Hướng dẫn',
    footer_faq: 'Câu hỏi thường gặp',
    footer_contact: 'Liên hệ',
    footer_info: 'Thông tin',
    footer_about: 'Giới thiệu',
    footer_terms: 'Điều khoản dịch vụ',
    footer_privacy: 'Chính sách bảo mật',

    // Modals
    modal_post_detail: 'Chi tiết bài viết',
    modal_write_post: 'Viết bài mới',
    form_category: 'Danh mục',
    form_language: 'Ngôn ngữ',
    form_title: 'Tiêu đề',
    form_title_placeholder: 'Nhập tiêu đề',
    form_content: 'Nội dung',
    form_content_placeholder: 'Nhập nội dung...',
    form_author: 'Tên tác giả',
    form_author_placeholder: 'Nhập tên của bạn',
    form_image: '📷 Đính kèm hình ảnh',
    form_image_hint: 'PNG, JPG, GIF, WebP (Tối đa 10MB)',
    form_image_select: 'Chọn tệp hoặc kéo thả',
    form_image_remove: 'Xóa ảnh',
    has_image: '📷 Có hình ảnh',
    btn_cancel: 'Hủy',
    btn_submit: 'Đăng bài',
    cat_resource: '📂 Tài liệu',
    cat_question: '❓ Câu hỏi',
    cat_discussion: '💬 Thảo luận',

    // Registration Modal
    modal_register: 'Đăng ký tài khoản giáo viên',
    form_username: 'Tên đăng nhập (ID)',
    form_username_placeholder: 'Nhập tên đăng nhập',
    form_password: 'Mật khẩu',
    form_password_placeholder: 'Nhập mật khẩu',
    form_name: 'Họ và tên',
    form_name_placeholder: 'Ví dụ: Nguyễn Thị Mai',
    form_country: 'Quốc tịch',
    form_role: 'Chức vụ / Chuyên môn',
    form_role_placeholder: 'Ví dụ: Giáo viên Toán tiểu học',
    form_email: 'Địa chỉ Email',
    form_email_placeholder: 'teacher@example.com',
    btn_register: 'Hoàn tất đăng ký',
    register_success: 'Đăng ký thành công! Chào mừng quý thầy cô đến với HoweduBridge.',

    // Post UI
    views: 'lượt xem',
    comments: 'bình luận',
    likes: 'thích',
    translate_btn: '🌐 Dịch',
    translation_title: 'Bản dịch',
    comment_section_title: '💬 Bình luận',
    comment_placeholder: 'Viết bình luận...',
    btn_comment: 'Gửi',
    translate_to_en: 'English',
    translate_to_vi: 'Tiếng Việt',
    translate_to_ko: '한국어',
    translating: 'Đang dịch...',
    post_success: 'Bài viết đã được đăng thành công!',
    comment_success: 'Bình luận đã được đăng thành công!',
    reply: 'Trả lời',
    time_ago: 'trước',
    country_korea: '🇰🇷 Hàn Quốc',
    country_vietnam: '🇻🇳 Việt Nam',
  }
};

// ===== POST CONTENT TRANSLATIONS =====
// Pre-translated content for sample posts (simulating translation API)
const POST_TRANSLATIONS = {
  post1: {
    ko: {
      title: '베트남 초등학교 수학 교수법 공유합니다',
      content: '안녕하세요, 호치민시에서 초등학교 수학을 가르치고 있는 응우옌 교사입니다. 베트남의 초등학교 수학 교수법을 한국 선생님들과 나누고 싶어서 글을 올립니다.\n\n베트남에서는 초등학교 수학에서 시각적 교구를 많이 활용합니다. 특히 분수 개념을 가르칠 때 종이 접기를 활용한 방법이 효과적인데, 학생들이 직접 종이를 접어서 분수의 개념을 체험하게 합니다.\n\n또한 구구단은 노래와 리듬을 활용하여 암기시키는 방법을 많이 사용합니다. 관련 자료가 필요하시면 댓글로 남겨주세요!\n\n첨부한 PDF 파일에 저의 수업 계획안과 활동지가 포함되어 있습니다.'
    },
    en: {
      title: 'Sharing Vietnamese Elementary Math Teaching Methods',
      content: 'Hello, I am Teacher Nguyen, teaching elementary school math in Ho Chi Minh City. I would like to share Vietnamese elementary school math teaching methods with Korean teachers.\n\nIn Vietnam, we extensively use visual teaching aids in elementary math. The origami method is particularly effective when teaching fraction concepts - students fold paper themselves to experience the concept of fractions.\n\nWe also commonly use songs and rhythms for multiplication table memorization. If you need related materials, please leave a comment!\n\nThe attached PDF file contains my lesson plans and activity sheets.'
    },
    vi: {
      title: 'Chia sẻ phương pháp dạy Toán tiểu học Việt Nam',
      content: 'Xin chào, tôi là giáo viên Nguyễn, đang dạy Toán tiểu học tại Thành phố Hồ Chí Minh. Tôi muốn chia sẻ phương pháp dạy Toán tiểu học của Việt Nam với các thầy cô giáo Hàn Quốc.\n\nỞ Việt Nam, chúng tôi sử dụng rộng rãi các đồ dùng dạy học trực quan trong Toán tiểu học. Phương pháp gấp giấy origami đặc biệt hiệu quả khi dạy khái niệm phân số - học sinh tự gấp giấy để trải nghiệm khái niệm phân số.\n\nChúng tôi cũng thường sử dụng bài hát và nhịp điệu để học thuộc bảng cửu chương. Nếu bạn cần tài liệu liên quan, vui lòng để lại bình luận!\n\nFile PDF đính kèm chứa kế hoạch bài giảng và phiếu hoạt động của tôi.'
    }
  },
  post2: {
    ko: {
      title: '한국 고등학교 과학 실험 키트 교환 희망',
      content: '서울에서 고등학교 화학을 가르치고 있는 김민수 교사입니다.\n\n한국의 과학 실험 키트와 베트남의 교수 자료를 교환하고 싶습니다. 현재 보유하고 있는 자료는 다음과 같습니다:\n\n1. 화학 반응 속도 실험 키트 가이드 (한국어/영어)\n2. 산-염기 적정 실험 안내서\n3. 유기 화학 분자 모델 활동지\n4. 실험 안전 가이드라인 포스터\n\n베트남의 과학 교육 자료나 실험 방법론에 관심이 있습니다. 특히 베트남에서 사용하는 저비용 실험 대체재에 대해 배우고 싶습니다.\n\n관심 있으신 선생님은 댓글 부탁드립니다!'
    },
    en: {
      title: 'Looking to Exchange Korean High School Science Experiment Kits',
      content: 'I am Teacher Kim Minsu, teaching high school chemistry in Seoul.\n\nI would like to exchange Korean science experiment kits with Vietnamese teaching materials. The materials I currently have are:\n\n1. Chemical reaction rate experiment kit guide (Korean/English)\n2. Acid-base titration experiment manual\n3. Organic chemistry molecular model activity sheets\n4. Lab safety guidelines poster\n\nI am interested in Vietnamese science education materials and experiment methodologies. I particularly want to learn about low-cost experiment alternatives used in Vietnam.\n\nInterested teachers, please leave a comment!'
    },
    vi: {
      title: 'Muốn trao đổi bộ thí nghiệm Khoa học trường THPT Hàn Quốc',
      content: 'Tôi là giáo viên Kim Minsu, đang dạy Hóa học trường THPT tại Seoul.\n\nTôi muốn trao đổi bộ thí nghiệm khoa học Hàn Quốc với tài liệu giảng dạy Việt Nam. Các tài liệu tôi hiện có là:\n\n1. Hướng dẫn bộ thí nghiệm tốc độ phản ứng hóa học (Hàn/Anh)\n2. Sách hướng dẫn thí nghiệm chuẩn độ axit-bazơ\n3. Phiếu hoạt động mô hình phân tử hóa học hữu cơ\n4. Poster hướng dẫn an toàn phòng thí nghiệm\n\nTôi quan tâm đến tài liệu giáo dục khoa học và phương pháp thí nghiệm của Việt Nam. Đặc biệt, tôi muốn tìm hiểu về các vật liệu thí nghiệm thay thế chi phí thấp được sử dụng ở Việt Nam.\n\nCác thầy cô quan tâm, vui lòng để lại bình luận!'
    }
  },
  post3: {
    ko: {
      title: '베트남 문화 수업에 활용할 자료 찾고 있어요',
      content: '안녕하세요! 부산에서 중학교 사회과를 가르치는 박지영 교사입니다.\n\n내년에 다문화 이해 수업에서 베트남 문화를 다룰 예정인데, 실제 베트남에서 교육하시는 선생님들의 도움이 필요합니다.\n\n특히 다음과 같은 자료를 찾고 있습니다:\n- 베트남 전통 명절과 풍습에 대한 사진 및 설명 자료\n- 베트남 학교 생활을 보여주는 영상이나 사진\n- 베트남과 한국의 교육 시스템 비교 자료\n- 베트남 전통 음식 만들기 활동 가이드\n\n수업에서 학생들에게 생생한 베트남 문화를 전달하고 싶습니다. 도움 주실 수 있는 분이 계시면 감사하겠습니다! 🙏'
    },
    en: {
      title: 'Looking for Materials for Vietnamese Culture Class',
      content: 'Hello! I am Teacher Park Jiyoung, teaching middle school social studies in Busan.\n\nNext year, I plan to cover Vietnamese culture in my multicultural understanding class, and I need help from teachers who actually teach in Vietnam.\n\nSpecifically, I am looking for:\n- Photos and descriptions of Vietnamese traditional holidays and customs\n- Videos or photos showing Vietnamese school life\n- Comparative materials on Vietnamese and Korean education systems\n- Vietnamese traditional food cooking activity guides\n\nI want to deliver vivid Vietnamese culture to my students. I would appreciate any help! 🙏'
    },
    vi: {
      title: 'Tìm kiếm tài liệu cho lớp học Văn hóa Việt Nam',
      content: 'Xin chào! Tôi là giáo viên Park Jiyoung, dạy môn Xã hội tại trường THCS ở Busan.\n\nNăm tới, tôi dự định giới thiệu văn hóa Việt Nam trong lớp học hiểu biết đa văn hóa, và tôi cần sự giúp đỡ từ các thầy cô đang thực sự giảng dạy ở Việt Nam.\n\nCụ thể, tôi đang tìm kiếm:\n- Ảnh và mô tả về các ngày lễ truyền thống và phong tục Việt Nam\n- Video hoặc ảnh về cuộc sống học đường ở Việt Nam\n- Tài liệu so sánh hệ thống giáo dục Việt Nam và Hàn Quốc\n- Hướng dẫn hoạt động nấu ăn truyền thống Việt Nam\n\nTôi muốn truyền đạt văn hóa Việt Nam sinh động cho học sinh. Tôi sẽ rất biết ơn sự giúp đỡ! 🙏'
    }
  },
  post4: {
    ko: {
      title: '베트남어-한국어 교육용 플래시카드 제작했습니다',
      content: '하노이에서 한국어를 가르치는 쩐 티 란 교사입니다.\n\n베트남어와 한국어 학습에 도움이 될 교육용 플래시카드를 제작했습니다. 총 500장으로 구성되어 있으며 다음 카테고리를 포함합니다:\n\n📌 기본 인사말 (50장)\n📌 교실 용어 (80장)\n📌 일상 대화 (120장)\n📌 교육 관련 전문 용어 (100장)\n📌 문화 비교 어휘 (150장)\n\n각 카드에는 한국어, 베트남어, 영어 3개국어 표기와 발음 가이드가 포함되어 있습니다. PDF 형식으로 무료 배포할 예정입니다.\n\n관심 있으신 분은 댓글에 이메일을 남겨주시면 보내드리겠습니다!'
    },
    en: {
      title: 'Created Vietnamese-Korean Educational Flashcards',
      content: 'I am Teacher Tran Thi Lan, teaching Korean in Hanoi.\n\nI have created educational flashcards to help with Vietnamese and Korean language learning. The set consists of 500 cards in the following categories:\n\n📌 Basic Greetings (50 cards)\n📌 Classroom Terms (80 cards)\n📌 Daily Conversation (120 cards)\n📌 Education-related Terminology (100 cards)\n📌 Cultural Comparison Vocabulary (150 cards)\n\nEach card includes trilingual notation in Korean, Vietnamese, and English with pronunciation guides. I plan to distribute them for free in PDF format.\n\nIf interested, please leave your email in the comments and I will send them to you!'
    },
    vi: {
      title: 'Đã tạo Flashcard giáo dục Việt-Hàn',
      content: 'Tôi là giáo viên Trần Thị Lan, dạy tiếng Hàn tại Hà Nội.\n\nTôi đã tạo bộ flashcard giáo dục để hỗ trợ việc học tiếng Việt và tiếng Hàn. Bộ thẻ gồm 500 thẻ theo các danh mục sau:\n\n📌 Lời chào cơ bản (50 thẻ)\n📌 Thuật ngữ trong lớp học (80 thẻ)\n📌 Hội thoại hàng ngày (120 thẻ)\n📌 Thuật ngữ chuyên môn giáo dục (100 thẻ)\n📌 Từ vựng so sánh văn hóa (150 thẻ)\n\nMỗi thẻ bao gồm ký hiệu ba ngôn ngữ bằng tiếng Hàn, tiếng Việt và tiếng Anh kèm hướng dẫn phát âm. Tôi dự định phát hành miễn phí dưới dạng PDF.\n\nNếu quan tâm, vui lòng để lại email trong phần bình luận và tôi sẽ gửi cho bạn!'
    }
  },
  post5: {
    ko: {
      title: 'STEM 교육 베-한 공동 프로젝트 참가자 모집',
      content: '안녕하세요, 대전과학고등학교에서 물리학을 가르치는 이준혁 교사입니다.\n\n베트남과 한국 학생들이 함께 참여하는 STEM 공동 프로젝트를 기획하고 있습니다.\n\n🔬 프로젝트 주제: "지속 가능한 에너지 솔루션"\n📅 기간: 2027년 3월 ~ 6월 (4개월)\n👥 대상: 고등학교 1-2학년\n🌐 진행 방식: 온라인 화상 회의 + 자료 공유\n\n참여 학교에서는 각 5-6명의 학생 팀을 구성하여 태양열, 풍력, 바이오 에너지 등의 주제로 연구 프로젝트를 진행합니다. 최종 발표는 한국어, 베트남어, 영어로 진행되며 우수 팀에게는 상장이 수여됩니다.\n\n베트남 측 참가 학교를 모집하고 있으니 관심 있으신 선생님께서는 연락 부탁드립니다!'
    },
    en: {
      title: 'Recruiting Participants for Vietnam-Korea Joint STEM Project',
      content: 'Hello, I am Teacher Lee Junhyuk, teaching physics at Daejeon Science High School.\n\nI am planning a joint STEM project involving both Vietnamese and Korean students.\n\n🔬 Project Topic: "Sustainable Energy Solutions"\n📅 Duration: March - June 2027 (4 months)\n👥 Target: 10th-11th grade students\n🌐 Format: Online video conferences + resource sharing\n\nParticipating schools will form teams of 5-6 students to conduct research projects on topics like solar, wind, and bio energy. Final presentations will be given in Korean, Vietnamese, and English, and outstanding teams will receive certificates.\n\nWe are recruiting participating schools from Vietnam. Interested teachers, please contact us!'
    },
    vi: {
      title: 'Tuyển người tham gia Dự án STEM chung Việt-Hàn',
      content: 'Xin chào, tôi là giáo viên Lee Junhyuk, dạy Vật lý tại Trường THPT Khoa học Daejeon.\n\nTôi đang lên kế hoạch cho một dự án STEM chung có sự tham gia của học sinh Việt Nam và Hàn Quốc.\n\n🔬 Chủ đề dự án: "Giải pháp năng lượng bền vững"\n📅 Thời gian: Tháng 3 - Tháng 6 năm 2027 (4 tháng)\n👥 Đối tượng: Học sinh lớp 10-11\n🌐 Hình thức: Hội nghị truyền hình trực tuyến + Chia sẻ tài liệu\n\nCác trường tham gia sẽ thành lập đội 5-6 học sinh để thực hiện dự án nghiên cứu về các chủ đề như năng lượng mặt trời, gió và sinh học. Bài thuyết trình cuối cùng sẽ được trình bày bằng tiếng Hàn, tiếng Việt và tiếng Anh, và các đội xuất sắc sẽ nhận được giấy chứng nhận.\n\nChúng tôi đang tuyển các trường tham gia từ Việt Nam. Các thầy cô quan tâm, vui lòng liên hệ!'
    }
  },
  post6: {
    ko: {
      title: '베트남 교육과정 개편 소식 공유',
      content: '호치민시 교육청 소속 팜 반 둑 교사입니다.\n\n2027년부터 적용되는 베트남 교육과정 개편 내용을 한국 선생님들과 공유하고자 합니다.\n\n주요 변경 사항:\n✅ 컴퓨터 과학이 초등학교 3학년부터 필수 과목으로 지정\n✅ 영어 교육 시작 시기가 1학년으로 앞당겨짐\n✅ STEAM 통합 교육 과목 신설\n✅ 프로젝트 기반 학습(PBL) 비중 확대\n✅ 디지털 리터러시 교육 강화\n\n한국에서도 비슷한 교육과정 변화가 있는지 궁금합니다. 양국의 교육 트렌드를 비교해보면 좋을 것 같습니다.\n\n자세한 내용이 필요하시면 공식 문서 링크를 공유해 드리겠습니다.'
    },
    en: {
      title: 'Sharing News about Vietnam Curriculum Reform',
      content: 'I am Teacher Pham Van Duc from the Ho Chi Minh City Department of Education.\n\nI would like to share the Vietnamese curriculum reform changes effective from 2027 with Korean teachers.\n\nKey Changes:\n✅ Computer Science designated as mandatory from 3rd grade elementary\n✅ English education starting age moved to 1st grade\n✅ New integrated STEAM education subject\n✅ Expanded project-based learning (PBL) component\n✅ Strengthened digital literacy education\n\nI am curious if there are similar curriculum changes in Korea. It would be great to compare education trends between the two countries.\n\nIf you need more details, I will share official document links.'
    },
    vi: {
      title: 'Chia sẻ tin tức về cải cách chương trình giáo dục Việt Nam',
      content: 'Tôi là giáo viên Phạm Văn Đức thuộc Sở Giáo dục Thành phố Hồ Chí Minh.\n\nTôi muốn chia sẻ với các thầy cô Hàn Quốc về những thay đổi trong chương trình giáo dục Việt Nam có hiệu lực từ năm 2027.\n\nNhững thay đổi chính:\n✅ Khoa học Máy tính trở thành môn bắt buộc từ lớp 3 tiểu học\n✅ Thời điểm bắt đầu dạy tiếng Anh được đẩy lên lớp 1\n✅ Môn giáo dục STEAM tích hợp mới\n✅ Mở rộng thành phần học tập dựa trên dự án (PBL)\n✅ Tăng cường giáo dục kỹ năng số\n\nTôi tò mò liệu ở Hàn Quốc có những thay đổi chương trình tương tự không. Sẽ rất tốt nếu so sánh xu hướng giáo dục giữa hai nước.\n\nNếu bạn cần thêm chi tiết, tôi sẽ chia sẻ liên kết tài liệu chính thức.'
    }
  },
  post7: {
    ko: {
      title: '[공지] HoweduBridge 플랫폼 업데이트 안내',
      content: 'HoweduBridge 운영팀입니다.\n\n플랫폼 업데이트 소식을 알려드립니다.\n\n🆕 새로운 기능:\n• 실시간 채팅 기능 추가 (11월 예정)\n• 파일 공유 용량 확대 (100MB → 500MB)\n• 모바일 앱 베타 버전 출시\n• 화상 미팅 예약 기능 추가\n\n🔧 개선 사항:\n• 번역 정확도 향상 (AI 모델 업그레이드)\n• 페이지 로딩 속도 개선\n• 알림 시스템 개편\n\n항상 HoweduBridge를 이용해 주셔서 감사합니다. 더 나은 교사 커뮤니티를 위해 노력하겠습니다.\n\n문의사항은 댓글로 남겨주세요.'
    },
    en: {
      title: '[Notice] HoweduBridge Platform Update',
      content: 'From the HoweduBridge Operations Team.\n\nWe are pleased to announce platform updates.\n\n🆕 New Features:\n• Real-time chat function added (scheduled for November)\n• File sharing capacity expanded (100MB → 500MB)\n• Mobile app beta version released\n• Video meeting scheduling feature added\n\n🔧 Improvements:\n• Translation accuracy improved (AI model upgrade)\n• Page loading speed improved\n• Notification system revamped\n\nThank you for always using HoweduBridge. We will continue to work towards building a better teacher community.\n\nPlease leave any questions in the comments.'
    },
    vi: {
      title: '[Thông báo] Cập nhật nền tảng HoweduBridge',
      content: 'Từ Đội Vận hành HoweduBridge.\n\nChúng tôi vui mừng thông báo cập nhật nền tảng.\n\n🆕 Tính năng mới:\n• Thêm chức năng chat thời gian thực (dự kiến tháng 11)\n• Mở rộng dung lượng chia sẻ file (100MB → 500MB)\n• Phiên bản beta ứng dụng di động đã ra mắt\n• Thêm tính năng đặt lịch họp video\n\n🔧 Cải thiện:\n• Nâng cao độ chính xác dịch thuật (nâng cấp mô hình AI)\n• Cải thiện tốc độ tải trang\n• Cải tiến hệ thống thông báo\n\nCảm ơn bạn đã luôn sử dụng HoweduBridge. Chúng tôi sẽ tiếp tục nỗ lực xây dựng cộng đồng giáo viên tốt hơn.\n\nVui lòng để lại câu hỏi trong phần bình luận.'
    }
  }
};

// ===== COMMENT TRANSLATIONS =====
const COMMENT_TRANSLATIONS = {
  comment1: {
    ko: '정말 유용한 자료 감사합니다! 분수 교수법이 매우 인상적이네요. PDF 파일 부탁드려도 될까요?',
    en: 'Thank you for the really useful materials! The fraction teaching method is very impressive. May I request the PDF file?',
    vi: 'Cảm ơn tài liệu rất hữu ích! Phương pháp dạy phân số rất ấn tượng. Tôi có thể xin file PDF được không?'
  },
  comment2: {
    ko: '저도 관심 있습니다! 한국에서는 분수를 피자 그림으로 많이 설명하는데, 종이접기 방법이 더 실감나네요.',
    en: 'I am interested too! In Korea, we often explain fractions using pizza drawings, but the origami method seems more hands-on.',
    vi: 'Tôi cũng quan tâm! Ở Hàn Quốc, chúng tôi thường giải thích phân số bằng hình vẽ pizza, nhưng phương pháp gấp giấy có vẻ thực tế hơn.'
  },
  comment3: {
    ko: '화학 실험 키트 가이드 관심 있습니다. 저도 하노이에서 화학을 가르치고 있어요!',
    en: 'Interested in the chemistry experiment kit guide. I also teach chemistry in Hanoi!',
    vi: 'Quan tâm đến hướng dẫn bộ thí nghiệm hóa học. Tôi cũng dạy hóa học ở Hà Nội!'
  },
  comment4: {
    ko: '베트남 학교 사진 자료가 있어요. 이메일 주소 알려주시면 보내드릴게요!',
    en: 'I have Vietnamese school photo materials. Please share your email and I will send them!',
    vi: 'Tôi có tài liệu ảnh trường học Việt Nam. Vui lòng chia sẻ email và tôi sẽ gửi!'
  },
  comment5: {
    ko: '플래시카드 정말 기대됩니다! 이메일: teacher.kim@edu.kr',
    en: 'Really looking forward to the flashcards! Email: teacher.kim@edu.kr',
    vi: 'Rất mong đợi flashcard! Email: teacher.kim@edu.kr'
  },
  comment6: {
    ko: 'STEM 프로젝트 참여하고 싶습니다! 우리 학교에서 6명의 학생이 관심을 보이고 있어요.',
    en: 'Would like to participate in the STEM project! 6 students at our school are showing interest.',
    vi: 'Muốn tham gia dự án STEM! 6 học sinh ở trường chúng tôi đang thể hiện sự quan tâm.'
  }
};

// ===== SUPPORT & INFO CENTER TRILINGUAL CONTENT =====
const INFO_CENTER_DATA = {
  vi: {
    guide: {
      title: '📖 Hướng dẫn sử dụng HoweduBridge',
      subtitle: 'Cẩm nang toàn diện dành cho giáo viên Việt Nam và Hàn Quốc',
      intro_title: 'Chào mừng các thầy cô đến với HoweduBridge!',
      intro_desc: 'HoweduBridge là cầu nối giáo dục kỹ thuật số giúp giáo viên hai nước dễ dàng kết nối, chia sẻ học liệu và trao đổi chuyên môn mà không bị rào cản ngôn ngữ cản trở.',
      steps: [
        {
          num: '1',
          icon: '🌐',
          title: 'Hệ thống dịch tự động 3 ngôn ngữ',
          desc: 'Các thầy cô có thể thoải mái viết bài bằng Tiếng Việt. Hệ thống AI tự động dịch ngay lập tức sang Tiếng Hàn và Tiếng Anh để đồng nghiệp tại Hàn Quốc hiểu rõ nội dung. Khi xem bài viết, chỉ cần bấm các nút cờ ngôn ngữ để chuyển đổi giao diện.',
          tip: 'Mẹo: Viết câu rõ ràng, mạch lạc sẽ giúp bản dịch đạt độ chính xác cao nhất.'
        },
        {
          num: '2',
          icon: '📂',
          title: 'Chia sẻ giáo án & học liệu trực quan',
          desc: 'Bấm nút "✏️ Viết bài" để đăng giáo án, phiếu bài tập hoặc hình ảnh lớp học thực tế (hỗ trợ JPG, PNG, GIF, WebP đến 10MB). Các thầy cô Hàn Quốc có thể tải về và ứng dụng vào bài giảng.',
          tip: 'Phân loại bài viết chính xác (Tài liệu, Câu hỏi, Thảo luận) để các đồng nghiệp dễ tìm kiếm.'
        },
        {
          num: '3',
          icon: '💬',
          title: 'Giao lưu học hỏi & Phản hồi bình luận',
          desc: 'Bình luận trực tiếp dưới mỗi bài viết để đặt câu hỏi về phương pháp dạy học, kinh nghiệm sư phạm và giao lưu văn hóa giữa hai quốc gia.',
          tip: 'Hãy luôn giữ tinh thần tôn trọng, cởi mở và xây dựng trong môi trường giáo dục quốc tế.'
        },
        {
          num: '4',
          icon: '🏆',
          title: 'Vinh danh giáo viên tích cực (Top 10)',
          desc: 'Nền tảng tự động thống kê số lượng bài viết đóng góp của mỗi thành viên. Top 10 giáo viên có nhiều cống hiến nhất sẽ được tôn vinh trang trọng tại bảng xếp hạng trang chủ.',
          tip: 'Đăng nhập trước khi viết bài để bài viết được cộng điểm xếp hạng vào tài khoản của bạn.'
        }
      ]
    },
    faq: {
      title: '❓ Câu hỏi thường gặp (FAQ)',
      subtitle: 'Giải đáp các thắc mắc phổ biến nhất khi tham gia cộng đồng HoweduBridge',
      intro_title: 'Những câu hỏi được quan tâm nhất',
      intro_desc: 'Bấm vào từng câu hỏi để xem câu trả lời chi tiết. Nếu cần hỗ trợ thêm, các thầy cô vui lòng gửi tin nhắn tại mục "Liên hệ".',
      items: [
        {
          q: '1. Tôi nên viết bài bằng Tiếng Việt, Tiếng Hàn hay Tiếng Anh?',
          a: 'Các thầy cô có thể viết bài bằng bất kỳ ngôn ngữ nào trong 3 ngôn ngữ trên (thuận tiện nhất là Tiếng Việt). HoweduBridge đã tích hợp công cụ tự động dịch sang 2 ngôn ngữ còn lại ngay khi bạn đăng bài, đảm bảo mọi thành viên đều tiếp cận được.'
        },
        {
          q: '2. Tôi có thể đính kèm những loại tệp nào và dung lượng tối đa là bao nhiêu?',
          a: 'Hiện tại nền tảng hỗ trợ đính kèm hình ảnh minh họa bài giảng (JPG, JPEG, PNG, GIF, WebP) với dung lượng tối đa 10MB cho mỗi bài viết. Hình ảnh được lưu trữ an toàn và hiển thị trực quan trong bài viết.'
        },
        {
          q: '3. Thủ tục đăng ký tài khoản có phức tạp không?',
          a: 'Rất nhanh chóng và đơn giản! Bạn chỉ cần nhập Tên đăng nhập, Mật khẩu, Họ tên, Quốc tịch (Việt Nam hoặc Hàn Quốc), Chức vụ/Chuyên môn và Email. Không yêu cầu các thủ tục xác minh rườm rà.'
        },
        {
          q: '4. Tôi có được phép sử dụng các tài liệu trên HoweduBridge cho lớp học thực tế không?',
          a: 'Hoàn toàn được phép! Tất cả giáo án và tài liệu được chia sẻ trên HoweduBridge nhằm phục vụ mục đích phi thương mại, đổi mới giáo dục và hỗ trợ giảng dạy. Vui lòng ghi nhận tên tác giả khi sử dụng.'
        },
        {
          q: '5. Nếu phát hiện câu dịch chưa chuẩn xác, tôi có thể phản hồi như thế nào?',
          a: 'Bạn có thể để lại bình luận góp ý dưới bài viết đó hoặc gửi thông tin qua mục "Liên hệ hỗ trợ". Ban quản trị và nhóm ngôn ngữ sẽ cập nhật từ điển chuyên ngành sư phạm để bản dịch ngày càng hoàn thiện.'
        },
        {
          q: '6. Có thể kết nối giao lưu lớp học trực tuyến giữa trường Việt Nam và trường Hàn Quốc không?',
          a: 'Chắc chắn có! Các thầy cô hãy tạo bài viết trong mục "💬 Thảo luận" hoặc gửi thư liên hệ cho Ban điều phối dự án để được hỗ trợ kết nối lớp học kết nghĩa giữa hai nước.'
        }
      ]
    },
    contact: {
      title: '✉️ Liên hệ & Hỗ trợ',
      subtitle: 'Ban điều hành dự án HoweduBridge luôn sẵn sàng đồng hành cùng các thầy cô',
      form_title: 'Gửi yêu cầu hoặc câu hỏi',
      name_label: 'Họ và tên *',
      name_placeholder: 'Nguyễn Thị Mai',
      email_label: 'Địa chỉ Email *',
      email_placeholder: 'teacher@example.com',
      cat_label: 'Chủ đề liên hệ *',
      cat_options: [
        { val: 'resource', text: '📂 Trao đổi tài liệu giáo dục' },
        { val: 'translation', text: '🌐 Góp ý hoàn thiện bản dịch' },
        { val: 'partnership', text: '🏫 Hợp tác kết nghĩa trường học' },
        { val: 'account', text: '⚙️ Hỗ trợ kỹ thuật & tài khoản' },
        { val: 'other', text: '💬 Ý kiến đóng góp khác' }
      ],
      subj_label: 'Tiêu đề tin nhắn *',
      subj_placeholder: 'Ví dụ: Đề xuất dự án giao lưu học sinh tiểu học',
      msg_label: 'Nội dung chi tiết *',
      msg_placeholder: 'Vui lòng mô tả chi tiết câu hỏi hoặc đề xuất của thầy/cô...',
      btn_submit: 'Gửi tin nhắn liên hệ',
      offices_title: 'Văn phòng điều phối',
      vn_title: '🇻🇳 Văn phòng Hà Nội (Việt Nam)',
      vn_addr: '📍 Quận Hoàn Kiếm, TP. Hà Nội',
      vn_email: '📧 contact-vn@howedubridge.org',
      vn_tel: '📞 (+84) 24 3823 4567',
      kr_title: '🇰🇷 Trung tâm Seoul (Hàn Quốc)',
      kr_addr: '📍 Jongno-gu, Seoul, Republic of Korea',
      kr_email: '📧 contact-kr@howedubridge.org',
      kr_tel: '📞 (+82) 2 734 8920',
      hours_title: '⏰ Thời gian hỗ trợ',
      hours_text: 'Thứ Hai - Thứ Sáu: 08:30 - 17:30 (Giờ ICT / KST)'
    },
    about: {
      title: '🌏 Giới thiệu HoweduBridge',
      subtitle: 'Sứ mệnh kết nối những nhà giáo dục tiên phong Việt Nam và Hàn Quốc',
      banner_title: 'Kết nối tri thức · Lan tỏa yêu thương sư phạm',
      banner_desc: 'HoweduBridge ra đời với mục tiêu phá bỏ mọi rào cản ngôn ngữ, tạo không gian học thuật mở và thân thiện cho giáo viên hai nước cùng phát triển.',
      pillars: [
        { icon: '🌐', title: 'Không rào cản ngôn ngữ', desc: 'Công nghệ dịch thuật 3 ngôn ngữ song song giúp trao đổi kiến thức tự nhiên và trọn vẹn.' },
        { icon: '📚', title: 'Học liệu mở phong phú', desc: 'Kho tài liệu bài giảng, phương pháp STEM, văn hóa phong phú do chính giáo viên xây dựng.' },
        { icon: '🤝', title: 'Tình hữu nghị sâu sắc', desc: 'Thúc đẩy sự thấu hiểu văn hóa và hợp tác giáo dục bền chặt giữa thế hệ trẻ hai nước.' }
      ],
      story_title: 'Ý nghĩa dự án',
      story_text: 'Việt Nam và Hàn Quốc có mối quan hệ gắn bó sâu sắc về văn hóa và kinh tế. Thông qua HoweduBridge, chúng tôi kỳ vọng sẽ xây dựng một mạng lưới bền vững nơi các thầy cô không chỉ học hỏi phương pháp dạy học hiện đại của nhau, mà còn cùng nhau ươm mầm cho những công dân toàn cầu tương lai.'
    },
    terms: {
      title: '📜 Điều khoản dịch vụ',
      subtitle: 'Quy định sử dụng nền tảng và bảo vệ quyền lợi giáo viên',
      articles: [
        { id: '1', title: 'Điều 1 (Mục đích)', text: 'Quy chế này điều chỉnh quyền và trách nhiệm của các bên khi tham gia nền tảng trao đổi giáo dục phi lợi nhuận HoweduBridge.' },
        { id: '2', title: 'Điều 2 (Tài khoản giáo viên)', text: 'Thành viên cam kết cung cấp thông tin chính xác khi đăng ký và tự bảo mật thông tin tài khoản của mình. Mỗi giáo viên chịu trách nhiệm về các hoạt động diễn ra dưới tài khoản cá nhân.' },
        { id: '3', title: 'Điều 3 (Quyền sở hữu học liệu)', text: 'Tài liệu do giáo viên tải lên vẫn thuộc quyền tác giả của người đăng. Bằng việc đăng tải, người dùng cấp quyền cho các thành viên khác sử dụng tài liệu vào mục đích giảng dạy phi thương mại.' },
        { id: '4', title: 'Điều 4 (Chuẩn mực ứng xử)', text: 'Thành viên cam kết giữ gìn đạo đức nhà giáo, không đăng tải nội dung quảng cáo thương mại, nội dung kích động thù địch hoặc vi phạm thuần phong mỹ tục.' },
        { id: '5', title: 'Điều 5 (Xử lý vi phạm)', text: 'Ban quản trị có quyền tạm khóa hoặc xóa vĩnh viễn các tài khoản vi phạm nghiêm trọng quy chế mà không cần thông báo trước.' },
        { id: '6', title: 'Điều 6 (Hiệu lực)', text: 'Điều khoản này có hiệu lực kể từ ngày công bố và áp dụng chung cho mọi thành viên trên toàn cầu.' }
      ]
    },
    privacy: {
      title: '🔒 Chính sách bảo mật',
      subtitle: 'Cam kết minh bạch và bảo vệ tối đa dữ liệu của nhà giáo',
      articles: [
        { id: '1', title: '1. Thông tin thu thập', text: 'HoweduBridge chỉ thu thập các thông tin tối thiểu cần thiết cho việc tương tác sư phạm: Tên đăng nhập, Mật khẩu (được mã hóa), Họ tên, Quốc tịch, Chuyên môn giảng dạy và Địa chỉ Email.' },
        { id: '2', title: '2. Mục đích sử dụng', text: 'Thông tin được sử dụng để: Duy trì tài khoản, hiển thị tên tác giả trên bài viết và thống kê bảng xếp hạng cống hiến của cộng đồng.' },
        { id: '3', title: '3. Không chia sẻ bên thứ ba', text: 'HoweduBridge cam kết tuyệt đối không bán, chia sẻ hoặc chuyển giao thông tin cá nhân của các thầy cô cho bất kỳ đơn vị quảng cáo hoặc thương mại nào.' },
        { id: '4', title: '4. Thời gian lưu trữ', text: 'Dữ liệu được lưu trữ an toàn trong suốt thời gian tài khoản hoạt động. Khi thành viên yêu cầu hủy tài khoản, mọi thông tin cá nhân sẽ được xóa vĩnh viễn.' },
        { id: '5', title: '5. Quyền của thành viên', text: 'Các thầy cô có quyền kiểm tra, chỉnh sửa thông tin cá nhân hoặc yêu cầu ngừng sử dụng dịch vụ bất kỳ lúc nào.' },
        { id: '6', title: '6. Bộ phận phụ trách', text: 'Mọi thắc mắc về bảo mật xin gửi về: privacy@howedubridge.org (Trưởng ban an toàn thông tin HoweduBridge).' }
      ]
    }
  },

  ko: {
    guide: {
      title: '📖 HoweduBridge 이용 가이드',
      subtitle: '베트남·한국 교사를 위한 완벽 활용 안내서',
      intro_title: '선생님, HoweduBridge에 오신 것을 환영합니다!',
      intro_desc: 'HoweduBridge는 언어의 장벽 없이 베트남과 한국의 교사들이 교육 자료를 공유하고 전문성을 함께 발전시켜 나가는 글로벌 교육 허브입니다.',
      steps: [
        {
          num: '1',
          icon: '🌐',
          title: '실시간 3개국어 자동 번역 시스템',
          desc: '한국어로 편안하게 글을 작성하시면 시스템이 자동으로 베트남어와 영어로 즉시 번역하여 저장합니다. 베트남 현지 교사들도 모국어로 완벽하게 이해할 수 있으며, 게시글 상세 창에서 원클릭으로 언어를 전환하여 비교해 볼 수 있습니다.',
          tip: 'Tip: 명확하고 완성된 문장으로 작성하시면 번역 품질이 더욱 우수해집니다.'
        },
        {
          num: '2',
          icon: '📂',
          title: '수업 지도안 & 교수 자료 공유',
          desc: '"✏️ 새 글 작성" 버튼을 눌러 수업 지도안, 활동지, 수업 현장 사진(JPG, PNG, GIF, WebP 최대 10MB)을 첨부하여 자유롭게 공유하세요. 동료 교사들이 실제 수업에 유용하게 활용할 수 있습니다.',
          tip: '카테고리(자료 공유, 질문, 자유 토론)를 알맞게 지정하면 검색이 훨씬 쉬워집니다.'
        },
        {
          num: '3',
          icon: '💬',
          title: '질문/문의 및 교사 간 실시간 피드백',
          desc: '다문화 교육 노하우, 베트남 현지 교육 과정, 교과 지도법 등에 대해 자유롭게 질문을 남기고 실시간 댓글로 소통하세요.',
          tip: '상호 존중과 교직 윤리를 바탕으로 열린 마음의 교육적 소통을 지향합니다.'
        },
        {
          num: '4',
          icon: '🏆',
          title: 'Top 10 활동 교사 랭킹 시스템',
          desc: '게시글과 교육 자료를 많이 공유해주신 열정적인 상위 10명의 활동 교사분들이 메인 화면의 회원 랭킹에 자랑스럽게 소개됩니다.',
          tip: '로그인 후 글을 작성하시면 나의 활동 실적이 랭킹 점수에 즉시 반영됩니다.'
        }
      ]
    },
    faq: {
      title: '❓ 자주 묻는 질문 (FAQ)',
      subtitle: 'HoweduBridge 이용 시 가장 궁금해하시는 질문들을 모았습니다',
      intro_title: '자주 묻는 핵심 질문',
      intro_desc: '질문을 클릭하시면 상세한 답변을 확인하실 수 있습니다. 추가 문의사항은 [문의하기] 메뉴를 이용해 주세요.',
      items: [
        {
          q: '1. 베트남어, 한국어, 영어 중 어떤 언어로 글을 작성해야 하나요?',
          a: '선생님께서 가장 편하신 모국어(한국어)로 작성하시면 됩니다. 시스템이 자동으로 베트남어와 영어로 실시간 번역하여 저장하므로, 베트남 현지 교사들도 자국어로 바로 읽을 수 있습니다.'
        },
        {
          q: '2. 첨부 가능한 파일 형식과 최대 파일 크기는 어떻게 되나요?',
          a: '이미지 파일(JPG, JPEG, PNG, GIF, WebP)을 첨부하실 수 있으며, 게시글 1건당 최대 10MB까지 안전하게 업로드됩니다.'
        },
        {
          q: '3. 회원가입 절차가 복잡한가요?',
          a: '매우 간단합니다! 아이디, 비밀번호, 성함, 국적(베트남/한국), 담당 직책/과목, 이메일 주소만 입력하시면 별도의 복잡한 인증 절차 없이 즉시 가입되어 모든 기능을 이용하실 수 있습니다.'
        },
        {
          q: '4. 공유된 교육 자료를 실제 학교 수업에 활용해도 되나요?',
          a: '네, 물론입니다! HoweduBridge에 공유된 모든 자료는 공교육 혁신과 교사 협력을 위한 오픈 교육 자료(OER)이므로 비영리 교육 목적으로 자유롭게 수업에 활용하실 수 있습니다.'
        },
        {
          q: '5. 번역된 문장에 어색한 표현이 있을 때는 어떻게 하나요?',
          a: '해당 글의 댓글이나 [문의하기] 메뉴를 통해 피드백을 남겨주시면, 교과 전문 번역 사전에 즉시 반영하여 번역의 정확도를 지속적으로 고도화하겠습니다.'
        },
        {
          q: '6. 베트남 학교와 온·오프라인 자매결연이나 공동 수업 프로젝트도 가능한가요?',
          a: '네! 자유 토론 게시판에 프로젝트 제안을 올리시거나 문의하기를 통해 운영팀에 요청하시면 베·한 교류 전담팀이 현지 학교와의 연계를 적극 지원해 드립니다.'
        }
      ]
    },
    contact: {
      title: '✉️ 문의하기 & 교사 지원',
      subtitle: 'HoweduBridge 운영팀은 선생님들의 목소리에 언제나 귀 기울이고 있습니다',
      form_title: '문의 및 제안 보내기',
      name_label: '선생님 성함 *',
      name_placeholder: '김민수',
      email_label: '이메일 주소 *',
      email_placeholder: 'teacher@korea.kr',
      cat_label: '문의 분야 *',
      cat_options: [
        { val: 'resource', text: '📂 교육 자료 교환 및 수업 문의' },
        { val: 'translation', text: '🌐 번역 품질 개선 및 피드백' },
        { val: 'partnership', text: '🏫 학교 간 교류 및 자매결연 제안' },
        { val: 'account', text: '⚙️ 계정 및 시스템 기술 지원' },
        { val: 'other', text: '💬 기타 의견 및 제휴 제안' }
      ],
      subj_label: '문의 제목 *',
      subj_placeholder: '예: 초등 과학 공동 수업 프로젝트 제휴 문의',
      msg_label: '상세 내용 *',
      msg_placeholder: '문의하시고자 하는 내용을 자세히 기재해 주세요...',
      btn_submit: '문의 내용 전송하기',
      offices_title: '현지 지원 센터 안내',
      vn_title: '🇻🇳 베트남 하노이 지원센터',
      vn_addr: '📍 Hoan Kiem, Hanoi, Vietnam',
      vn_email: '📧 contact-vn@howedubridge.org',
      vn_tel: '📞 (+84) 24 3823 4567',
      kr_title: '🇰🇷 대한민국 서울 글로벌 교육본부',
      kr_addr: '📍 서울특별시 종로구 글로벌 교육협력센터',
      kr_email: '📧 contact-kr@howedubridge.org',
      kr_tel: '📞 (+82) 2 734 8920',
      hours_title: '⏰ 운영 및 상담 시간',
      hours_text: '월요일 ~ 금요일 09:00 - 18:00 (베트남/한국 표준시)'
    },
    about: {
      title: '🌏 HoweduBridge 소개',
      subtitle: '베트남과 한국을 잇는 미래 교육의 든든한 동반자',
      banner_title: '언어의 장벽을 넘어, 교육으로 하나 되는 미래',
      banner_desc: 'HoweduBridge는 베트남과 한국 교사들이 교육 자료를 자유롭게 나누고, 서로의 문화를 깊이 이해하며 함께 성장할 수 있도록 설립된 글로벌 교사 플랫폼입니다.',
      pillars: [
        { icon: '🌐', title: '언어 장벽 제로', desc: '자체 3개국어 실시간 자동 번역으로 언어가 달라도 완벽하게 소통합니다.' },
        { icon: '📚', title: '열린 교육 자료', desc: '검증된 수업 지도안, 활동지, STEM 교구 아이디어를 자유롭게 공유합니다.' },
        { icon: '🤝', title: '문화 상호 존중', desc: '양국 교육 현장의 생생한 경험을 나누며 미래 글로벌 인재를 함께 육성합니다.' }
      ],
      story_title: '설립 배경과 비전',
      story_text: '베트남과 한국은 오랜 역사적·경제적 협력 관계를 넘어 미래 교육 분야에서도 가장 중요한 파트너입니다. HoweduBridge는 양국의 일선 교사들이 직접 연결되어 함께 교재를 만들고 수업을 혁신하는 실질적인 교류의 장을 제공합니다.'
    },
    terms: {
      title: '📜 이용약관',
      subtitle: '건전한 교사 커뮤니티 운영과 권리 보호를 위한 기본 규정',
      articles: [
        { id: '1', title: '제1조 (목적)', text: '본 약관은 HoweduBridge가 제공하는 베·한 교사 커뮤니티 플랫폼의 이용 조건 및 절차, 회원과 플랫폼 간의 권리와 의무를 규정함을 목적으로 합니다.' },
        { id: '2', title: '제2조 (회원가입 및 계정 관리)', text: '회원은 진실된 교원 정보를 바탕으로 가입해야 하며, 본인의 계정 및 비밀번호를 안전하게 관리할 책임이 있습니다.' },
        { id: '3', title: '제3조 (저작권 및 자료의 이용)', text: '회원이 게시한 교육 자료의 저작권은 작성자에게 있으며, 타 회원은 이를 비영리 교육 목적으로 수업에 자유롭게 열람 및 활용할 수 있습니다.' },
        { id: '4', title: '제4조 (교사의 권리와 의무)', text: '회원은 교직자로서의 품위를 지켜야 하며, 상업적 광고, 타인의 명예 훼손, 비방 및 저작권 침해 게시물을 등록해서는 안 됩니다.' },
        { id: '5', title: '제5조 (게시물의 관리 및 이용제한)', text: '운영진은 본 약관을 위반한 게시물을 사전 통보 없이 블라인드 처리하거나 회원의 이용 자격을 일시 또는 영구히 정지할 수 있습니다.' },
        { id: '6', title: '제6조 (준거법 및 분쟁해결)', text: '본 약관에 명시되지 않은 사항은 관계 법령 및 일반적인 국제 교육 교류 관례에 따릅니다.' }
      ]
    },
    privacy: {
      title: '🔒 개인정보처리방침',
      subtitle: '선생님의 소중한 개인정보를 안전하게 보호합니다',
      articles: [
        { id: '1', title: '1. 수집하는 개인정보 항목', text: 'HoweduBridge는 회원 식별 및 최소한의 교류를 위해 다음의 정보만을 수집합니다: 아이디, 암호화된 비밀번호, 성명, 국적, 직책/담당과목, 이메일 주소.' },
        { id: '2', title: '2. 개인정보 수집 및 이용 목적', text: '수집된 정보는 회원 본인 확인, 게시글 작성자 표시, 우수 활동 교사 랭킹 산정 및 고객 문의 응대에만 제한적으로 사용됩니다.' },
        { id: '3', title: '3. 제3자 제공 금지', text: 'HoweduBridge는 어떠한 경우에도 회원의 개인정보를 상업적 마케팅 목적으로 외부 제3자에게 판매하거나 제공하지 않습니다.' },
        { id: '4', title: '4. 보유 및 파기 절차', text: '회원의 개인정보는 회원 탈퇴 시까지 안전하게 보관되며, 탈퇴 요청 시 복구 불가능한 방법으로 즉시 영구 파기됩니다.' },
        { id: '5', title: '5. 회원의 권리', text: '회원은 언제든지 본인의 개인정보를 열람, 수정하거나 탈퇴를 요청할 수 있는 완전한 권리를 가집니다.' },
        { id: '6', title: '6. 개인정보 보호책임자', text: '개인정보 보호 관련 문의 및 권리 행사는 privacy@howedubridge.org 로 접수해 주시면 신속히 처리해 드립니다.' }
      ]
    }
  },

  en: {
    guide: {
      title: '📖 HoweduBridge User Guide',
      subtitle: 'Comprehensive guide for Vietnamese and Korean educators',
      intro_title: 'Welcome to HoweduBridge!',
      intro_desc: 'HoweduBridge is a global educational platform connecting Vietnamese and Korean teachers to share lesson plans, collaborate, and exchange pedagogical expertise without language boundaries.',
      steps: [
        {
          num: '1',
          icon: '🌐',
          title: 'Real-Time Trilingual Translation',
          desc: 'Write comfortably in your preferred language. Our system automatically translates your post into Vietnamese, Korean, and English upon submission. Readers can switch between languages instantly with one click.',
          tip: 'Tip: Writing clear and well-punctuated sentences produces the highest translation accuracy.'
        },
        {
          num: '2',
          icon: '📂',
          title: 'Lesson Plans & Material Exchange',
          desc: 'Click "✏️ Write Post" to share worksheets, lesson designs, and photos of classroom activities (supports JPG, PNG, GIF, WebP up to 10MB).',
          tip: 'Choose the correct category (Resources, Questions, Discussions) to help fellow educators locate your content easily.'
        },
        {
          num: '3',
          icon: '💬',
          title: 'Questions, Feedback & Collaboration',
          desc: 'Leave inquiries regarding cross-cultural pedagogy, STEM activities, or curriculum standards. Engage with colleagues through live comment threads.',
          tip: 'We promote a respectful, constructive, and supportive academic community.'
        },
        {
          num: '4',
          icon: '🏆',
          title: 'Top 10 Active Teachers Recognition',
          desc: 'Teachers who share the highest volume of quality educational posts are honored in our homepage Top 10 Active Teachers ranking.',
          tip: 'Ensure you are logged in when posting so contributions are attributed to your account profile.'
        }
      ]
    },
    faq: {
      title: '❓ Frequently Asked Questions (FAQ)',
      subtitle: 'Answers to common questions about HoweduBridge',
      intro_title: 'Top Questions from Educators',
      intro_desc: 'Click any question to view the answer. For specific inquiries, contact us via the "Contact Us" tab.',
      items: [
        {
          q: '1. Which language should I write in?',
          a: 'You can write in Vietnamese, Korean, or English. HoweduBridge automatically translates every post and comment into the other two languages upon publication.'
        },
        {
          q: '2. What file formats and sizes are supported for attachments?',
          a: 'We support standard educational image formats (JPG, JPEG, PNG, GIF, WebP) up to 10MB per post.'
        },
        {
          q: '3. Is the sign-up process simple?',
          a: 'Yes, extremely streamlined! You only need to provide a Username, Password, Name, Country (Vietnam/Korea), Role/Subject, and Email.'
        },
        {
          q: '4. Can I use shared resources in my actual classroom lessons?',
          a: 'Absolutely! All resources on HoweduBridge are Open Educational Resources (OER) shared for non-profit instructional use and collaborative innovation.'
        },
        {
          q: '5. What should I do if I notice a translation error?',
          a: 'You can leave a note in the comments or reach out via the "Contact Us" tab. Our bilingual team continuously improves specialized educational vocabulary.'
        },
        {
          q: '6. Can schools organize cross-border sister-school projects?',
          a: 'Yes! Post your proposal in the Discussion board or message our coordination team via Contact Us for official pairing assistance.'
        }
      ]
    },
    contact: {
      title: '✉️ Contact & Support',
      subtitle: 'The HoweduBridge team is here to assist educators 24/7',
      form_title: 'Submit an Inquiry',
      name_label: 'Your Name *',
      name_placeholder: 'Teacher Name',
      email_label: 'Email Address *',
      email_placeholder: 'teacher@school.edu',
      cat_label: 'Inquiry Category *',
      cat_options: [
        { val: 'resource', text: '📂 Educational Resource Inquiries' },
        { val: 'translation', text: '🌐 Translation Correction & Feedback' },
        { val: 'partnership', text: '🏫 School Partnership & Exchange' },
        { val: 'account', text: '⚙️ Account & Technical Support' },
        { val: 'other', text: '💬 General Feedback & Suggestions' }
      ],
      subj_label: 'Subject *',
      subj_placeholder: 'e.g., Elementary STEM Lesson Collaboration Inquiry',
      msg_label: 'Detailed Message *',
      msg_placeholder: 'Please describe your inquiry or proposal in detail...',
      btn_submit: 'Send Message',
      offices_title: 'Liaison Offices',
      vn_title: '🇻🇳 Hanoi Liaison Office (Vietnam)',
      vn_addr: '📍 Hoan Kiem District, Hanoi, Vietnam',
      vn_email: '📧 contact-vn@howedubridge.org',
      vn_tel: '📞 (+84) 24 3823 4567',
      kr_title: '🇰🇷 Seoul Hub (Republic of Korea)',
      kr_addr: '📍 Jongno-gu, Seoul, Republic of Korea',
      kr_email: '📧 contact-kr@howedubridge.org',
      kr_tel: '📞 (+82) 2 734 8920',
      hours_title: '⏰ Operating Hours',
      hours_text: 'Monday - Friday: 09:00 - 18:00 (ICT / KST)'
    },
    about: {
      title: '🌏 About HoweduBridge',
      subtitle: 'Bridging Vietnamese and Korean educators for future generations',
      banner_title: 'Transcending Language · Uniting Through Education',
      banner_desc: 'HoweduBridge connects frontline educators from Vietnam and Korea, fostering an open ecosystem of mutual learning and pedagogical innovation.',
      pillars: [
        { icon: '🌐', title: 'Zero Language Barrier', desc: 'Real-time AI trilingual translation enables authentic, effortless dialogue.' },
        { icon: '📚', title: 'Open Educational Resources', desc: 'Freely share and adapt lesson plans, STEM designs, and classroom worksheets.' },
        { icon: '🤝', title: 'Cross-Cultural Empathy', desc: 'Deepening bilateral understanding and equipping students for a globalized world.' }
      ],
      story_title: 'Our Vision',
      story_text: 'Vietnam and Korea share rich cultural bonds. HoweduBridge empowers educators to transcend borders, learn from each other’s teaching methodologies, and build lasting friendships.'
    },
    terms: {
      title: '📜 Terms of Service',
      subtitle: 'Platform rules and educator rights protection',
      articles: [
        { id: '1', title: 'Article 1 (Purpose)', text: 'These terms govern the use of HoweduBridge, a non-profit academic collaboration platform connecting educators in Vietnam and Korea.' },
        { id: '2', title: 'Article 2 (User Accounts)', text: 'Members agree to provide truthful credentials and maintain the confidentiality of their login details.' },
        { id: '3', title: 'Article 3 (Intellectual Property)', text: 'Authors retain copyright over their submitted materials while granting fellow members a royalty-free license for non-commercial educational use.' },
        { id: '4', title: 'Article 4 (Professional Conduct)', text: 'Users agree to uphold professional educator ethics, avoiding commercial advertising, slander, or infringement of intellectual property.' },
        { id: '5', title: 'Article 5 (Moderation)', text: 'Administrators reserve the right to remove non-compliant content or suspend accounts violating these terms.' },
        { id: '6', title: 'Article 6 (Governing Principles)', text: 'Matters not specified herein shall be governed by customary international academic cooperation standards.' }
      ]
    },
    privacy: {
      title: '🔒 Privacy Policy',
      subtitle: 'Committed to safeguarding educator personal data',
      articles: [
        { id: '1', title: '1. Information Collected', text: 'HoweduBridge collects minimal data necessary for community engagement: Username, encrypted Password, Full Name, Country, Teaching Role, and Email.' },
        { id: '2', title: '2. Purpose of Use', text: 'Data is used solely for authentication, authorship attribution, active contributor rankings, and customer support.' },
        { id: '3', title: '3. Zero Third-Party Sharing', text: 'HoweduBridge strictly does not sell, lease, or share personal data with commercial marketing entities.' },
        { id: '4', title: '4. Retention & Deletion', text: 'Data is securely maintained during active membership and permanently erased upon account cancellation requests.' },
        { id: '5', title: '5. User Rights', text: 'Members retain full rights to inspect, rectify, or request the deletion of their personal records at any time.' },
        { id: '6', title: '6. Privacy Officer Contact', text: 'Direct privacy inquiries to: privacy@howedubridge.org (Data Protection Lead).' }
      ]
    }
  }
};

