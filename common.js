/* ========================================
   K-AI출판허브 - Common JavaScript
   ======================================== */

// === i18n Translations ===
const translations = {
  ko: {
    'nav.home': '홈',
    'nav.library': 'AI 라이브러리',
    'nav.tutor': 'AI 북튜터',
    'nav.publishers': '출판사 연합관',
    'nav.community': '커뮤니티',
    'nav.b2b': 'B2B 솔루션',
    'nav.dashboard': '대시보드',
    'nav.partner': '파트너 센터',
    'nav.about': '소개',
    'search.placeholder': '도서, 출판사, 지식을 검색하세요...',
    'hero.title': '읽는 책에서 묻는 지식으로',
    'hero.subtitle': 'K-AI출판허브는 대한민국 출판사들의 디지털 전환과 상생을 위한 지능형 플랫폼입니다',
    'hero.cta1': 'AI 북튜터 체험하기',
    'hero.cta2': '출판사 입점하기',
    'stats.publishers': '입점 출판사',
    'stats.books': '등록 도서',
    'stats.queries': 'AI 질의',
    'stats.users': '활성 사용자',
    'section.recommended': 'AI 추천 도서',
    'section.publishers': '출판사 연합',
    'section.business': '비즈니스 모델',
    'section.viewAll': '전체 보기',
    'footer.copyright': '© 2026 K-AI출판허브. All rights reserved.',
    'footer.privacy': '개인정보처리방침',
    'footer.terms': '이용약관',
    'footer.contact': '문의하기',
    'common.login': '로그인',
    'common.signup': '회원가입',
    'common.logout': '로그아웃',
    'common.settings': '설정',
    'common.loading': '로딩 중...',
    'common.more': '더 보기',
    'common.close': '닫기',
    'common.save': '저장',
    'common.cancel': '취소',
    'common.delete': '삭제',
    'common.edit': '편집',
    'common.send': '전송',
    'tutor.welcome': '안녕하세요! 📚 AI 북튜터입니다. 선택하신 도서에 대해 무엇이든 물어보세요!',
    'tutor.placeholder': '질문을 입력하세요...',
    'tutor.quickSummary': '핵심 요약해줘',
    'tutor.quickQuiz': '퀴즈 내줘',
    'tutor.quickExplain': '쉽게 설명해줘',
    'tutor.quickRecommend': '관련 도서 추천',
    'library.myBooks': '내 서재',
    'library.totalBooks': '총 보유 도서',
    'library.completed': '완독 도서',
    'library.inProgress': '학습 중',
    'library.aiQueries': 'AI 질의 횟수',
  },
  en: {
    'nav.home': 'Home',
    'nav.library': 'AI Library',
    'nav.tutor': 'AI Book Tutor',
    'nav.publishers': 'Publishers',
    'nav.community': 'Community',
    'nav.b2b': 'B2B Solutions',
    'nav.dashboard': 'Dashboard',
    'nav.partner': 'Partner Center',
    'nav.about': 'About',
    'search.placeholder': 'Search books, publishers, knowledge...',
    'hero.title': 'From Reading to Asking',
    'hero.subtitle': 'K-AI Publishing Hub is an intelligent platform for digital transformation and co-prosperity of Korean publishers',
    'hero.cta1': 'Try AI Book Tutor',
    'hero.cta2': 'Join as Publisher',
    'stats.publishers': 'Publishers',
    'stats.books': 'Books',
    'stats.queries': 'AI Queries',
    'stats.users': 'Active Users',
    'section.recommended': 'AI Recommended Books',
    'section.publishers': 'Publisher Alliance',
    'section.business': 'Business Model',
    'section.viewAll': 'View All',
    'footer.copyright': '© 2026 K-AI Publishing Hub. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.contact': 'Contact Us',
    'common.login': 'Login',
    'common.signup': 'Sign Up',
    'common.logout': 'Logout',
    'common.settings': 'Settings',
    'common.loading': 'Loading...',
    'common.more': 'More',
    'common.close': 'Close',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.send': 'Send',
    'tutor.welcome': 'Hello! 📚 I\'m your AI Book Tutor. Ask me anything about your selected book!',
    'tutor.placeholder': 'Enter your question...',
    'tutor.quickSummary': 'Summarize key points',
    'tutor.quickQuiz': 'Give me a quiz',
    'tutor.quickExplain': 'Explain simply',
    'tutor.quickRecommend': 'Recommend related books',
    'library.myBooks': 'My Library',
    'library.totalBooks': 'Total Books',
    'library.completed': 'Completed',
    'library.inProgress': 'In Progress',
    'library.aiQueries': 'AI Queries',
  }
};

// === State Management ===
const AppState = {
  theme: localStorage.getItem('kai-theme') || 'light',
  language: localStorage.getItem('kai-lang') || 'ko',
  sidebarOpen: false,
};

// === DOM Ready ===
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLanguage();
  initSidebar();
  initScrollAnimations();
  initCurrentPageHighlight();
  initSearchBar();
});

// === Theme System ===
function initTheme() {
  const savedTheme = localStorage.getItem('kai-theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    AppState.theme = savedTheme;
  }
  updateThemeIcon();
}

function toggleTheme() {
  AppState.theme = AppState.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', AppState.theme);
  localStorage.setItem('kai-theme', AppState.theme);
  updateThemeIcon();
}

function updateThemeIcon() {
  const icons = document.querySelectorAll('.header-actions .fa-moon, .header-actions .fa-sun');
  icons.forEach(icon => {
    icon.className = AppState.theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
  });
}

// === Language System (i18n) ===
function initLanguage() {
  const savedLang = localStorage.getItem('kai-lang');
  if (savedLang) {
    AppState.language = savedLang;
  }
  applyTranslations();
  updateLangBadge();
}

function toggleLanguage() {
  AppState.language = AppState.language === 'ko' ? 'en' : 'ko';
  localStorage.setItem('kai-lang', AppState.language);
  applyTranslations();
  updateLangBadge();
}

function applyTranslations() {
  const lang = AppState.language;
  const dict = translations[lang] || translations['ko'];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) {
      el.placeholder = dict[key];
    }
  });

  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    if (dict[key]) {
      el.title = dict[key];
    }
  });
}

function t(key) {
  const dict = translations[AppState.language] || translations['ko'];
  return dict[key] || key;
}

function updateLangBadge() {
  const badges = document.querySelectorAll('.lang-badge');
  badges.forEach(badge => {
    badge.textContent = AppState.language.toUpperCase();
  });
}

// === Sidebar ===
function initSidebar() {
  // Create overlay
  let overlay = document.querySelector('.sidebar-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    overlay.addEventListener('click', closeSidebar);
    document.body.appendChild(overlay);
  }
}

function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  if (!sidebar) return;

  AppState.sidebarOpen = !AppState.sidebarOpen;

  if (AppState.sidebarOpen) {
    sidebar.classList.add('open');
    if (overlay) overlay.classList.add('active');
  } else {
    sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
  }
}

function closeSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  AppState.sidebarOpen = false;
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('active');
}

// === Current Page Highlight ===
function initCurrentPageHighlight() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
}

// === Scroll Animations ===
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

// === Search Bar ===
function initSearchBar() {
  const searchInputs = document.querySelectorAll('.search-bar input');
  searchInputs.forEach(input => {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = e.target.value.trim();
        if (query) {
          window.location.href = `search.html?q=${encodeURIComponent(query)}`;
        }
      }
    });
  });
}

// === Counter Animation ===
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (target - start) * eased);

    element.textContent = formatNumber(current);

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

function initCounters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        const target = parseInt(entry.target.dataset.target, 10);
        if (!isNaN(target)) {
          animateCounter(entry.target, target);
        }
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-counter]').forEach(el => {
    observer.observe(el);
  });
}

// === Utility Functions ===
function formatNumber(num) {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '만';
  }
  return num.toLocaleString('ko-KR');
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  if (AppState.language === 'ko') {
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  }
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function timeAgo(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = Math.floor((now - date) / 1000);

  if (AppState.language === 'ko') {
    if (diff < 60) return '방금 전';
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}일 전`;
    return formatDate(dateStr);
  } else {
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
    return formatDate(dateStr);
  }
}

// === Toast Notifications ===
function showToast(message, type = 'info', duration = 3000) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-info-circle' };
  toast.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100px)';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// === Loading Spinner ===
function showLoading(container) {
  const spinner = document.createElement('div');
  spinner.className = 'loading-spinner';
  spinner.id = 'global-spinner';
  if (typeof container === 'string') {
    document.querySelector(container)?.appendChild(spinner);
  } else if (container) {
    container.appendChild(spinner);
  }
  return spinner;
}

function hideLoading() {
  document.getElementById('global-spinner')?.remove();
}

// === Tab System ===
function initTabs(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const tabs = container.querySelectorAll('.tab');
  const contents = container.parentElement.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      contents.forEach(c => {
        c.classList.remove('active');
        if (c.id === target || c.dataset.tab === target) {
          c.classList.add('active');
        }
      });
    });
  });
}

// === Accordion ===
function initAccordions() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isOpen = item.classList.contains('open');

      // Close all in same group
      item.parentElement.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('open');
      });

      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

// === Modal ===
function openModal(modalId) {
  const overlay = document.getElementById(modalId);
  if (overlay) {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const overlay = document.getElementById(modalId);
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Close modal on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach(m => {
      m.classList.remove('active');
    });
    document.body.style.overflow = '';
    closeSidebar();
  }
});

// === Book Card Slider ===
function initSlider(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  container.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
    container.style.cursor = 'grabbing';
  });

  container.addEventListener('mouseleave', () => {
    isDown = false;
    container.style.cursor = 'grab';
  });

  container.addEventListener('mouseup', () => {
    isDown = false;
    container.style.cursor = 'grab';
  });

  container.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 2;
    container.scrollLeft = scrollLeft - walk;
  });
}

// === Sample Book Data ===
const sampleBooks = [
  {
    id: 'book-001', title: '요양보호사 양성 표준교재 2024', author: '보건복지부',
    publisher: '진한엠앤비', publisherId: 'pub-001', category: '의료/간호',
    coverColor: '#1B4D8E', coverIcon: '🏥', price: 35000, pages: 720,
    progress: 72, aiEnabled: true, rating: 4.6, sales: 12500, aiQueries: 45600
  },
  {
    id: 'book-002', title: '전기차 공학 개론', author: '이정훈',
    publisher: '진한엠앤비', publisherId: 'pub-001', category: '공학',
    coverColor: '#00B894', coverIcon: '🔋', price: 38000, pages: 520,
    progress: 45, aiEnabled: true, rating: 4.4, sales: 8300, aiQueries: 23100
  },
  {
    id: 'book-003', title: '드론 설계 및 제어 실무', author: '김상현',
    publisher: '진한엠앤비', publisherId: 'pub-001', category: '공학',
    coverColor: '#FF6B35', coverIcon: '🚁', price: 42000, pages: 480,
    progress: 30, aiEnabled: true, rating: 4.5, sales: 6200, aiQueries: 18400
  },
  {
    id: 'book-004', title: 'Python 데이터 분석 완전정복', author: '박민수',
    publisher: '한빛미디어', publisherId: 'pub-002', category: 'IT/프로그래밍',
    coverColor: '#3498DB', coverIcon: '🐍', price: 32000, pages: 600,
    progress: 88, aiEnabled: true, rating: 4.7, sales: 15200, aiQueries: 52000
  },
  {
    id: 'book-005', title: '스마트팩토리 구축 가이드', author: '정대영',
    publisher: '청문각', publisherId: 'pub-004', category: '공학',
    coverColor: '#9B59B6', coverIcon: '🏭', price: 45000, pages: 550,
    progress: 15, aiEnabled: true, rating: 4.3, sales: 4800, aiQueries: 12300
  },
  {
    id: 'book-006', title: '신재생에너지 시스템 공학', author: '최영석',
    publisher: '진한엠앤비', publisherId: 'pub-001', category: '공학',
    coverColor: '#27AE60', coverIcon: '☀️', price: 40000, pages: 490,
    progress: 60, aiEnabled: true, rating: 4.5, sales: 5600, aiQueries: 15700
  },
  {
    id: 'book-007', title: 'AI 머신러닝 이론과 실습', author: '한지원',
    publisher: '에이콘출판', publisherId: 'pub-003', category: 'IT/AI',
    coverColor: '#E74C3C', coverIcon: '🤖', price: 36000, pages: 680,
    progress: 55, aiEnabled: true, rating: 4.8, sales: 18700, aiQueries: 67200
  },
  {
    id: 'book-008', title: '데이터 사이언스 입문', author: '윤서연',
    publisher: '한빛미디어', publisherId: 'pub-002', category: 'IT/데이터',
    coverColor: '#F39C12', coverIcon: '📊', price: 29000, pages: 420,
    progress: 95, aiEnabled: true, rating: 4.6, sales: 11300, aiQueries: 38900
  }
];

const samplePublishers = [
  { id: 'pub-001', name: '진한엠앤비', logo: '📘', specialty: ['공학', '기술', '자격증'], bookCount: 245, aiEnabled: true, description: '공학, IT, 드론, 자동차 등 전문 기술 서적 분야 30년 전통의 출판사' },
  { id: 'pub-002', name: '한빛미디어', logo: '📙', specialty: ['IT', '프로그래밍', '데이터'], bookCount: 320, aiEnabled: true, description: 'IT 분야 최고의 전문 출판사' },
  { id: 'pub-003', name: '에이콘출판', logo: '📗', specialty: ['IT전문서', 'AI', '보안'], bookCount: 180, aiEnabled: true, description: 'IT 전문서 전문 출판사' },
  { id: 'pub-004', name: '청문각', logo: '📕', specialty: ['이공계', '교재', '수학'], bookCount: 150, aiEnabled: false, description: '대학 이공계 교재 전문 출판사' },
  { id: 'pub-005', name: '교문사', logo: '📓', specialty: ['의학', '간호', '보건'], bookCount: 200, aiEnabled: true, description: '의학 및 간호학 전문 출판사' },
  { id: 'pub-006', name: '시대고시기획', logo: '📔', specialty: ['자격증', '시험', '공무원'], bookCount: 280, aiEnabled: false, description: '자격증 및 공무원 시험 전문 출판사' }
];

// === Render Helpers ===
function renderBookCard(book) {
  return `
    <div class="book-card" onclick="location.href='book-detail.html?id=${book.id}'">
      <div class="book-cover" style="background: linear-gradient(135deg, ${book.coverColor}, ${book.coverColor}99)">
        <span style="font-size:64px">${book.coverIcon}</span>
      </div>
      <div class="book-info">
        <div class="book-title">${book.title}</div>
        <div class="book-author">${book.author}</div>
        <div class="book-publisher">${book.publisher}</div>
        <div class="book-meta">
          <div class="progress-bar"><div class="progress-fill" style="width:${book.progress}%"></div></div>
          <span class="progress-text">${book.progress}%</span>
        </div>
      </div>
    </div>
  `;
}

function renderPublisherCard(pub) {
  return `
    <div class="publisher-card" onclick="location.href='publishers.html?id=${pub.id}'">
      <div class="publisher-logo">${pub.logo}</div>
      <div class="publisher-name">${pub.name}</div>
      <div class="publisher-specialty">
        ${pub.specialty.map(s => `<span class="tag">${s}</span>`).join('')}
      </div>
      <div style="font-size:13px;color:var(--text-secondary)">
        도서 ${pub.bookCount}권 ${pub.aiEnabled ? '· <span style="color:var(--accent)">AI 활성</span>' : ''}
      </div>
    </div>
  `;
}

function renderPostCard(post) {
  return `
    <div class="post-card">
      <div class="post-header">
        <div class="post-avatar">${post.avatar}</div>
        <div>
          <div style="font-size:13px;font-weight:600">${post.author}</div>
          <div style="font-size:11px;color:var(--text-muted)">${post.time}</div>
        </div>
        <span class="tag ${post.tagType}" style="margin-left:auto">${post.tag}</span>
      </div>
      <div class="post-title">${post.title}</div>
      <div class="post-preview">${post.preview}</div>
      <div class="post-footer">
        <span><i class="fas fa-heart"></i> ${post.likes}</span>
        <span><i class="fas fa-comment"></i> ${post.comments}</span>
        <span><i class="fas fa-eye"></i> ${post.views}</span>
      </div>
    </div>
  `;
}
