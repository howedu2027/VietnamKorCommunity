# HoweduBridge (베·한 교사 커뮤니티 플랫폼)

> **Cộng đồng Giáo viên Việt Nam - Hàn Quốc | 베트남·한국 교사 커뮤니티 플랫폼 | Vietnam - Korea Teacher Community**

**HoweduBridge**는 베트남과 한국의 교육자들이 언어의 장벽 없이 교육 자료를 공유하고, 수업 아이디어를 나누며, 전문성을 함께 발전시켜 나갈 수 있도록 돕는 다국어 교육 교류 플랫폼입니다.

---

## 🌟 주요 기능 (Key Features)

1. **3개 국어 동시 자동 번역 (Trilingual Real-time Translation)**
   - 베트남어(Tiếng Việt), 한국어(한국어), 영어(English) 3개 국어를 지원합니다.
   - 글 작성 시 3개 국어로 자동 번역 및 저장되어 언어 선택 탭으로 자유롭게 열람할 수 있습니다.
   - 기본 인터페이스 언어는 베트남 교사들을 배려하여 베트남어로 기본 설정되어 있습니다.

2. **교육 자료 & 게시판 (Educational Resource Board)**
   - 전체 / 자료공유 / 질문·답변 / 토론 / 공지사항 카테고리 필터링.
   - 페이지네이션 (10개 단위 페이지 이동).
   - 이미지 및 교육 파일 첨부/미리보기 지원.
   - 댓글 작성 및 좋아요 인터랙션.

3. **활동 교사 랭킹 (Top Active Teachers)**
   - 플랫폼에서 가장 많은 교육 자료와 글을 공유한 교사 상위 10명을 랭킹으로 표시.
   - 간편 회원가입 (아이디, 비밀번호, 이름, 국적, 직책, 이메일).

4. **지원 및 정보 센터 (Support & Info Modal)**
   - 이용 가이드, 자주 묻는 질문(FAQ), 고객센터 문의(베트남/한국 전담 이메일).
   - 플랫폼 소개, 이용약관, 개인정보처리방침 전용 팝업.

---

## 🚀 시작하기 (Getting Started)

### 필수 요구사항 (Prerequisites)
- [Node.js](https://nodejs.org/) v18 이상 (Node.js 22+ 권장, `node:sqlite` 내장 지원)

### 설치 및 실행 (Installation & Run)

```bash
# 1. 의존성 패키지 설치
npm install

# 2. 서버 실행
npm start
# 또는
node server.js
```

실행 후 브라우저에서 아래 주소로 접속합니다:
```
http://localhost:3000
```

---

## 📁 디렉토리 구조 (Directory Structure)

```
├── db/
│   ├── database.js     # SQLite (node:sqlite) 데이터베이스 스키마 및 초기 시드
│   └── edubridge.db    # 로컬 SQLite 데이터베이스
├── public/
│   ├── index.html      # 메인 웹 애플리케이션 마크업
│   ├── styles.css      # 스타일시트 (디자인 시스템 & 반응형 UI)
│   ├── app.js          # 프론트엔드 인터랙션 & API 통신
│   ├── translations.js # 3개 국어 다국어 사전 (VI/KO/EN)
│   └── hero_banner.jpg # 히어로 배너 이미지
├── services/
│   └── translator.js   # 3개 국어 자동 번역 서비스 모듈
├── uploads/            # 사용자가 업로드한 이미지 및 첨부파일
├── server.js           # Express 백엔드 REST API 서버
├── package.json        # 프로젝트 메타데이터 및 의존성
└── README.md           # 프로젝트 안내 문서
```

---

## 📄 라이선스 (License)

Copyright © 2026 HoweduBridge. All rights reserved.
