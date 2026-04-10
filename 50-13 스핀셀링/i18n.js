// ========== SPIN Selling i18n (다국어 지원) ==========
const I18N = {
  ko: {
    // 공통
    appName: 'SPIN Selling AI',
    appSub: 'AI 기반 교육 플랫폼',
    home: '홈',
    back: '이전',
    save: '저장',
    delete: '삭제',
    cancel: '취소',
    confirm: '확인',
    close: '닫기',
    search: '검색',
    loading: '로딩 중...',
    noData: '데이터가 없습니다',

    // 역할
    admin: '시스템 관리자',
    trainer: '강사',
    manager: '교육 매니저',
    trainee: '교육생',

    // 네비게이션
    prereading: '1.프리리딩',
    quiz: '2.퀴즈',
    needs: '3.니즈 구분',
    scenario: '4.SPIN 질문구분',
    practice: '5.질문 연습',
    spinNeeds: '6.SPIN질문&니즈 구분',
    fab: '7.FAB/BAF',
    roleplay: '8.롤플레이',
    callplan: '9.콜플랜 작성',
    spinTools: '10.스핀도구들',

    // SPIN 유형
    situation: '상황질문',
    problem: '문제질문',
    implication: '시사질문',
    needPayoff: '해결질문',

    // 점수
    score: '점수',
    totalScore: '총점',
    maxScore: '만점',
    average: '평균',
    rank: '순위',

    // 팀
    team: '팀',
    teamSetup: '팀 편성',
    teamBattle: '팀 대항전',
    members: '명',

    // 교육
    education: '교육',
    session: '세션',
    upcoming: '진행예정',
    active: '진행중',
    completed: '진행완료',
    createSession: '교육 생성',

    // 활동
    activity: '활동',
    progress: '진행률',
    certificate: '수료증',
    report: 'AI 분석리포트',

    // 챗봇
    chatbotName: 'SPIN AI Bot',
    chatbotWelcome: 'SPIN Selling에 대해 무엇이든 물어보세요!',
    chatbotPlaceholder: 'SPIN Selling에 대해 물어보세요...',

    // 푸터
    darkMode: '다크모드',
    manual: '매뉴얼',
    architecture: '구조도',
    adminPage: '관리자'
  },

  en: {
    appName: 'SPIN Selling AI',
    appSub: 'AI-Powered Training Platform',
    home: 'Home',
    back: 'Back',
    save: 'Save',
    delete: 'Delete',
    cancel: 'Cancel',
    confirm: 'Confirm',
    close: 'Close',
    search: 'Search',
    loading: 'Loading...',
    noData: 'No data available',

    admin: 'System Admin',
    trainer: 'Trainer',
    manager: 'Education Manager',
    trainee: 'Trainee',

    prereading: '1.Pre-reading',
    quiz: '2.Quiz',
    needs: '3.Needs Analysis',
    scenario: '4.SPIN Classification',
    practice: '5.Question Practice',
    spinNeeds: '6.SPIN & Needs',
    fab: '7.FAB/BAF',
    roleplay: '8.Roleplay',
    callplan: '9.Call Plan',
    spinTools: '10.SPIN Tools',

    situation: 'Situation',
    problem: 'Problem',
    implication: 'Implication',
    needPayoff: 'Need-Payoff',

    score: 'Score',
    totalScore: 'Total',
    maxScore: 'Max',
    average: 'Average',
    rank: 'Rank',

    team: 'Team',
    teamSetup: 'Team Setup',
    teamBattle: 'Team Battle',
    members: 'members',

    education: 'Education',
    session: 'Session',
    upcoming: 'Upcoming',
    active: 'In Progress',
    completed: 'Completed',
    createSession: 'Create Session',

    activity: 'Activity',
    progress: 'Progress',
    certificate: 'Certificate',
    report: 'AI Report',

    chatbotName: 'SPIN AI Bot',
    chatbotWelcome: 'Ask anything about SPIN Selling!',
    chatbotPlaceholder: 'Ask about SPIN Selling...',

    darkMode: 'Dark Mode',
    manual: 'Manual',
    architecture: 'Architecture',
    adminPage: 'Admin'
  }
};

// 현재 언어 가져오기
function getLang() {
  return localStorage.getItem('spin_lang') || 'ko';
}

// 언어 변경
function setLang(lang) {
  localStorage.setItem('spin_lang', lang);
  location.reload();
}

// 번역 가져오기
function t(key) {
  const lang = getLang();
  return (I18N[lang] && I18N[lang][key]) || (I18N.ko && I18N.ko[key]) || key;
}

// 언어 토글
function toggleLang() {
  const current = getLang();
  setLang(current === 'ko' ? 'en' : 'ko');
}

// 전역으로 노출
window.I18N = I18N;
window.getLang = getLang;
window.setLang = setLang;
window.t = t;
window.toggleLang = toggleLang;
