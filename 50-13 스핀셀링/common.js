// ========== SUPABASE CONFIG ==========
const SUPABASE_URL = 'https://xwpxulvywjthliphjuie.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3cHh1bHZ5d2p0aGxpcGhqdWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MjA3NTIsImV4cCI6MjA5MTA5Njc1Mn0.RauiZnZ2D-0hcHaoiUWkf-3dvb6QtGv5Q0RjZrLjaME';
const SB_HEADERS = {
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json'
};

// ========== STATE ==========
const state = {
  session: null, // { id, company_name, training_date }
  user: null,    // { id, team_id, name, slot }
  personalScore: 0,
  spinCounts: { S: 0, P: 0, I: 0, N: 0 },
  quizCorrect: 0,
  quizTotal: 0,
  activities: [],
  currentQuiz: null,
  currentQuizIdx: 0,
  currentQuizQuestions: [],
  selectedSpinType: 'S',
  practiceHistory: [],
  roleplayMessages: [],
  roleplayScenario: null,
  roleplayTurnCount: 0
};

// ========== STORAGE HELPER (file:// 호환) ==========
// file:// 프로토콜에서는 localStorage가 페이지 간 공유 안 됨
// → window.name을 공유 저장소로 사용 (같은 탭에서 페이지 이동 시 유지)
const _store = {};
function _initStore() {
  try {
    if (window.name && window.name.startsWith('{')) {
      Object.assign(_store, JSON.parse(window.name));
    }
  } catch(e) {}
}
_initStore();

function _getItem(key) {
  // 1차: localStorage 시도
  try {
    const v = localStorage.getItem(key);
    if (v) return v;
  } catch(e) {}
  // 2차: window.name 저장소
  return _store[key] || null;
}

function _setItem(key, value) {
  try { localStorage.setItem(key, value); } catch(e) {}
  _store[key] = value;
  try { window.name = JSON.stringify(_store); } catch(e) {}
}

function _removeItem(key) {
  try { localStorage.removeItem(key); } catch(e) {}
  delete _store[key];
  try { window.name = JSON.stringify(_store); } catch(e) {}
}

// ========== SESSION MANAGEMENT ==========
function getSavedSession() {
  return JSON.parse(_getItem('spin_session_id') || 'null');
}

function saveSessionId(session) {
  _setItem('spin_session_id', JSON.stringify(session));
  state.session = session;
}

function clearSessionId() {
  _removeItem('spin_session_id');
  state.session = null;
}

// Create new training session + 20 members
async function createSession(companyName, trainingDate, password) {
  // 1. Create session (memo에 비밀번호 저장)
  const res = await fetch(`${SUPABASE_URL}/rest/v1/spin_sessions`, {
    method: 'POST',
    headers: { ...SB_HEADERS, 'Prefer': 'return=representation' },
    body: JSON.stringify({
      company_name: companyName,
      training_date: trainingDate || '',
      memo: password || '',
      team_names: { A: '팀 A', B: '팀 B', C: '팀 C', D: '팀 D', E: '팀 E' }
    })
  });
  const sessions = await res.json();
  const session = sessions[0];

  // 2. Create 35 members (5 teams x 7)
  const members = [];
  ['A','B','C','D','E'].forEach(team => {
    for (let slot = 0; slot < 7; slot++) {
      members.push({
        team_id: team,
        slot: slot,
        name: '',
        session_id: session.id,
        score_quiz: 0, score_needs: 0, score_scenario: 0,
        score_practice: 0, score_roleplay: 0, score_fab: 0
      });
    }
  });

  await fetch(`${SUPABASE_URL}/rest/v1/spin_members`, {
    method: 'POST',
    headers: SB_HEADERS,
    body: JSON.stringify(members)
  });

  return session;
}

// Fetch all sessions (삭제된 세션 제외)
async function fetchSessions() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/spin_sessions?company_name=neq.&select=*&order=created_at.desc`,
    { headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` } }
  );
  return await res.json();
}

// Fetch session password (stored in memo)
async function fetchSessionPassword(sessionId) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/spin_sessions?id=eq.${sessionId}&select=memo`,
    { headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` } }
  );
  const data = await res.json();
  return (data && data[0] && data[0].memo) || '';
}

// Fetch current session's team names
async function fetchTeamNames() {
  const session = getSavedSession();
  if (!session) return { A: '팀 A', B: '팀 B', C: '팀 C', D: '팀 D', E: '팀 E' };
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/spin_sessions?id=eq.${session.id}&select=team_names`,
    { headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` } }
  );
  const data = await res.json();
  return (data && data[0] && data[0].team_names) || { A: '팀 A', B: '팀 B', C: '팀 C', D: '팀 D', E: '팀 E' };
}

// Update team name in session
async function updateTeamName(teamKey, newName) {
  const session = getSavedSession();
  if (!session) return;
  const names = await fetchTeamNames();
  names[teamKey] = newName;
  await fetch(
    `${SUPABASE_URL}/rest/v1/spin_sessions?id=eq.${session.id}`,
    { method: 'PATCH', headers: SB_HEADERS, body: JSON.stringify({ team_names: names }) }
  );
}

// Save trainer name to Supabase session
async function saveTrainerName(name) {
  const session = getSavedSession();
  if (!session) return;
  const data = await fetchTeamNames();
  data.trainer_name = name;
  await fetch(
    `${SUPABASE_URL}/rest/v1/spin_sessions?id=eq.${session.id}`,
    { method: 'PATCH', headers: SB_HEADERS, body: JSON.stringify({ team_names: data }) }
  );
}

// Fetch trainer name from Supabase session
async function fetchTrainerName() {
  const data = await fetchTeamNames();
  return data.trainer_name || '';
}

// ========== ACCESS CODE ==========
function getMemberCode(memberId) {
  const code = ((memberId * 7919 + 104729) % 10000);
  return String(code).padStart(4, '0');
}

// ========== ROLE MANAGEMENT ==========
// roles: 'admin', 'trainer', 'trainee'
function getSavedRole() {
  return localStorage.getItem('spin_role') || null;
}

function saveRole(role) {
  localStorage.setItem('spin_role', role);
}

function clearRole() {
  localStorage.removeItem('spin_role');
}

function isTrainer() {
  return getSavedRole() === 'trainer';
}

function isAdmin() {
  return getSavedRole() === 'admin';
}

// ========== USER IDENTITY ==========
function getSavedUser() {
  return JSON.parse(localStorage.getItem('spin_current_user') || 'null');
}

function saveUser(user) {
  localStorage.setItem('spin_current_user', JSON.stringify(user));
  state.user = user;
}

function clearUser() {
  localStorage.removeItem('spin_current_user');
  state.user = null;
}

// Fetch members for current session
async function fetchAllMembers() {
  const session = getSavedSession();
  if (!session) return [];
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/spin_members?session_id=eq.${session.id}&select=*&order=team_id,slot`,
    { headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` } }
  );
  return await res.json();
}

// Update member score
async function supabaseAddScore(memberId, category, points) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/spin_members?id=eq.${memberId}&select=score_${category}`,
    { headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` } }
  );
  const data = await res.json();
  if (!data || !data[0]) return;

  const currentScore = data[0][`score_${category}`] || 0;
  const newScore = currentScore + points;

  await fetch(
    `${SUPABASE_URL}/rest/v1/spin_members?id=eq.${memberId}`,
    {
      method: 'PATCH',
      headers: SB_HEADERS,
      body: JSON.stringify({ [`score_${category}`]: newScore, updated_at: new Date().toISOString() })
    }
  );
}

// ========== SESSION BAR (shows current company) ==========
function getSessionBarHTML() {
  const session = getSavedSession();
  if (!session) return '';
  return `
<div style="background:linear-gradient(135deg, var(--primary), var(--secondary)); padding:8px 24px; text-align:center; position:sticky; top:74px; z-index:98; box-shadow:0 2px 8px rgba(0,0,0,0.15);">
  <span style="color:#ffffff; font-size:12px; font-weight:500;">현재 교육</span>
  <span style="color:var(--gold-light); font-size:18px; font-weight:800; margin-left:8px;">${session.company_name}</span>
  ${session.training_date ? `<span style="color:#ffffff; font-size:11px; margin-left:8px;">${session.training_date}</span>` : ''}
  <button onclick="switchSession()" style="margin-left:12px; background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.3); color:#ffffff; padding:3px 10px; border-radius:6px; font-size:10px; cursor:pointer; font-family:inherit;">변경</button>
</div>`;
}

function switchSession() {
  clearSessionId();
  clearUser();
  clearRole();
  location.href = 'index.html';
}

// ========== USER IDENTITY BAR ==========
function getUserBarHTML() {
  const role = getSavedRole();
  const user = getSavedUser();

  if (role === 'admin') {
    return `
<div id="userIdentityBar" style="display:none; background:linear-gradient(135deg, #0f172a, #1e293b); border-bottom:1px solid rgba(255,255,255,0.1); padding:8px 24px;">
  <div style="max-width:1100px; margin:0 auto; display:flex; align-items:center; justify-content:space-between;">
    <div style="display:flex; align-items:center; gap:10px;">
      <span style="background:#e74c3c; color:white; padding:3px 12px; border-radius:6px; font-size:11px; font-weight:800; letter-spacing:0.5px;">ADMIN</span>
      <span style="color:#ffffff; font-size:13px; font-weight:600;">시스템 관리자</span>
    </div>
    <button onclick="changeUser()" style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); color:#ffffff; padding:4px 12px; border-radius:6px; font-size:11px; cursor:pointer; font-family:inherit;">로그아웃</button>
  </div>
</div>`;
  }

  if ((role === 'trainer' || role === 'manager') && user) {
    return `
<div id="userIdentityBar" style="display:none; background:linear-gradient(135deg, #1a1a2e, #16213e); border-bottom:1px solid rgba(255,255,255,0.1); padding:8px 24px;">
  <div style="max-width:1100px; margin:0 auto; display:flex; align-items:center; justify-content:space-between;">
    <div style="display:flex; align-items:center; gap:10px;">
      <span style="background:var(--gold); color:#1a1a2e; padding:3px 12px; border-radius:6px; font-size:11px; font-weight:800; letter-spacing:0.5px;">TRAINER</span>
      <span style="color:#ffffff; font-size:14px; font-weight:700;">${user.name}</span>
    </div>
    <button onclick="changeUser()" style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); color:#ffffff; padding:4px 12px; border-radius:6px; font-size:11px; cursor:pointer; font-family:inherit;">변경</button>
  </div>
</div>`;
  }

  if (role === 'trainee' && user) {
    return `
<div id="userIdentityBar" style="display:none; background:var(--card); border-bottom:1px solid var(--border); padding:10px 24px;">
  <div style="max-width:1100px; margin:0 auto; display:flex; align-items:center; gap:12px;">
    <span style="background:rgba(192,57,43,0.08); color:var(--accent); padding:3px 10px; border-radius:6px; font-size:11px; font-weight:700;">팀 ${user.team_id}</span>
    <span style="font-size:14px; font-weight:700; color:var(--text);">${user.name}</span>
    <button onclick="changeUser()" style="background:none; border:1px solid var(--border); border-radius:6px; padding:3px 10px; font-size:11px; cursor:pointer; color:var(--text-muted); font-family:inherit;">변경</button>
  </div>
</div>`;
  }

  // 미로그인 상태 — 리다이렉트로 처리되므로 빈 바
  return '';
}

let allMembersCache = null;

function changeUser() {
  clearUser();
  clearRole();
  allMembersCache = null;
  location.href = 'index.html';
}

function updateHeaderUser(user) {
  const headerTeam = document.getElementById('headerTeam');
  if (!headerTeam) return;

  const role = getSavedRole();
  if (!user && !role) {
    headerTeam.style.display = 'none';
    return;
  }

  headerTeam.style.display = 'flex';
  headerTeam.style.alignItems = 'center';
  headerTeam.style.gap = '8px';

  if (role === 'admin') {
    headerTeam.innerHTML = '<span>관리자</span>';
  } else if (role === 'manager' && user) {
    headerTeam.innerHTML = `<span>매니저 | ${user.name}</span><a href="scoreboard.html" style="background:rgba(245,166,35,0.2); border:1px solid rgba(245,166,35,0.4); color:var(--gold-light); padding:3px 10px; border-radius:6px; font-size:10px; font-weight:700; text-decoration:none; font-family:inherit;">📊 스코어보드</a><button onclick="switchIdentity()" style="background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.25); color:#ffffff; padding:3px 10px; border-radius:6px; font-size:10px; cursor:pointer; font-family:inherit;">변경</button>`;
  } else if (role === 'trainer' && user) {
    headerTeam.innerHTML = `<span>강사 | ${user.name}</span><a href="scoreboard.html" style="background:rgba(245,166,35,0.2); border:1px solid rgba(245,166,35,0.4); color:var(--gold-light); padding:3px 10px; border-radius:6px; font-size:10px; font-weight:700; text-decoration:none; font-family:inherit;">📊 스코어보드</a><button onclick="switchIdentity()" style="background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.25); color:#ffffff; padding:3px 10px; border-radius:6px; font-size:10px; cursor:pointer; font-family:inherit;">변경</button>`;
  } else if (role === 'trainee' && user) {
    headerTeam.innerHTML = `<span>팀 ${user.team_id} | ${user.name}</span><a href="company.html" style="background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.25); color:#ffffff; padding:3px 10px; border-radius:6px; font-size:10px; cursor:pointer; font-family:inherit; text-decoration:none; margin-left:4px;">내 대시보드</a><button onclick="switchIdentity()" style="background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.25); color:#ffffff; padding:3px 10px; border-radius:6px; font-size:10px; cursor:pointer; font-family:inherit;">변경</button>`;
  } else {
    headerTeam.style.display = 'none';
  }
}

function switchIdentity() {
  // 세션은 유지하고 역할/유저만 초기화 → company.html의 본인 선택 화면으로
  clearUser();
  clearRole();
  location.href = 'company.html';
}

function restoreUser() {
  const user = getSavedUser();
  const role = getSavedRole();
  if (user) {
    state.user = user;
  }
  updateHeaderUser(user);
}

// ========== SCORE MANAGEMENT ==========
function addScore(points, category) {
  state.personalScore += points;
  const headerScore = document.getElementById('headerScore');
  if (headerScore) {
    headerScore.textContent = `${state.personalScore} 점`;
    headerScore.style.display = 'block';
  }

  if (state.user && state.user.id) {
    supabaseAddScore(state.user.id, category, points);
  }
}

function addActivity(text) {
  const now = new Date();
  const time = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;
  state.activities.push(`[${time}] ${text}`);
}

// ========== ACTIVITY LOG (Supabase) ==========
async function saveActivityLog(activityType, activityData, score) {
  const session = getSavedSession();
  const user = getSavedUser();
  if (!session || !user || !user.id) return;

  try {
    await fetch(`${SUPABASE_URL}/rest/v1/spin_activities`, {
      method: 'POST',
      headers: SB_HEADERS,
      body: JSON.stringify({
        session_id: session.id,
        member_id: user.id,
        activity_type: activityType,
        activity_data: activityData,
        score: score || 0
      })
    });
  } catch (e) {
    console.log('Activity log save failed:', e);
  }
}

// 세션의 모든 활동 로그 조회
async function fetchActivityLogs(sessionId) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/spin_activities?session_id=eq.${sessionId}&select=*,spin_members(name,team_id)&order=created_at.desc`,
    { headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` } }
  );
  return await res.json();
}

// 특정 멤버의 활동 로그 조회
async function fetchMemberLogs(memberId) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/spin_activities?member_id=eq.${memberId}&select=*&order=created_at.desc`,
    { headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` } }
  );
  return await res.json();
}

// ========== UTILS ==========
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function getTypeName(type) {
  const names = { S: '상황질문', P: '문제질문', I: '시사질문', N: '해결질문' };
  return names[type];
}

function closeModal(id) {
  document.getElementById(id).classList.remove('active');
}

// ========== FLOW NAVIGATION ==========
const FLOW_ORDER = [
  { page: 'team-setup.html', label: '팀 편성', icon: '👥' },
  { page: 'prereading.html', label: '프리리딩', icon: '📖' },
  { page: 'quiz.html', label: '개념 퀴즈', icon: '📝' },
  { page: 'needs.html', label: '니즈 구분', icon: '🎯' },
  { page: 'scenario.html', label: 'SPIN 질문구분', icon: '🔍' },
  { page: 'practice.html', label: '질문 연습', icon: '💬' },
  { page: 'spin-needs.html', label: 'SPIN질문&니즈 구분', icon: '🔎' },
  { page: 'fab.html', label: 'FAB/BAF', icon: '🧩' },
  { page: 'roleplay.html', label: 'AI 롤플레이', icon: '🎭' },
  { page: 'callplan.html', label: '콜플랜 작성', icon: '📋' },
  { page: 'spin-tools.html', label: '스핀도구들', icon: '🛠' }
];

function getFlowNavHTML(currentPage) {
  const idx = FLOW_ORDER.findIndex(f => currentPage.includes(f.page));
  if (idx < 0 || idx >= FLOW_ORDER.length - 1) return '';

  const next = FLOW_ORDER[idx + 1];
  const prev = idx > 0 ? FLOW_ORDER[idx - 1] : null;

  let html = '<div style="display:flex; justify-content:space-between; align-items:center; margin-top:32px; padding:20px 24px; background:var(--card); border:1px solid var(--border); border-radius:14px;">';

  if (prev) {
    html += `<a href="${prev.page}" style="display:flex; align-items:center; gap:8px; text-decoration:none; color:var(--text-tertiary); font-size:13px; font-weight:600; transition:color 0.2s;">
      <span style="font-size:18px;">&#8249;</span> ${prev.icon} ${prev.label}
    </a>`;
  } else {
    html += '<div></div>';
  }

  html += `<a href="${next.page}" style="display:flex; align-items:center; gap:8px; text-decoration:none; background:var(--accent); color:white; padding:10px 24px; border-radius:10px; font-size:14px; font-weight:700; transition:all 0.2s; box-shadow:0 2px 8px rgba(192,57,43,0.2);">
    다음: ${next.icon} ${next.label} <span style="font-size:18px;">&#8250;</span>
  </a>`;

  html += '</div>';
  return html;
}

// ========== AUTH (kept, unused) ==========
function getUsers() { return {}; }
function saveUsers() {}
function getCurrentSession() { return null; }
function saveSession() {}
function clearSession() {}
function showAuthScreen() {}
function showAuthError() {}
function doSignup() {}
function doLogin() {}
function doLogout() { switchSession(); }
function enterApp() {}
function checkAutoLogin() {}

// ========== COMMON HTML GENERATORS ==========
function getNavHTML(activePage) {
  const role = getSavedRole();
  const adminOnly = [];
  const adminTrainer = ['team-setup'];

  const items = [
    { page: 'index.html', section: 'home', icon: '🏠', label: '홈' },
    { page: 'team-setup.html', section: 'team-setup', icon: '👥', label: '팀 편성' },
    { page: 'prereading.html', section: 'prereading', icon: '📖', label: '1.프리리딩' },
    { page: 'quiz.html', section: 'quiz', icon: '📝', label: '2.퀴즈' },
    { page: 'needs.html', section: 'needs', icon: '🎯', label: '3.니즈 구분' },
    { page: 'scenario.html', section: 'scenario', icon: '🔍', label: '4.SPIN 질문구분' },
    { page: 'practice.html', section: 'practice', icon: '💬', label: '5.질문 연습' },
    { page: 'spin-needs.html', section: 'spin-needs', icon: '🔎', label: '6.SPIN질문&니즈 구분' },
    { page: 'fab.html', section: 'fab', icon: '🧩', label: '7.FAB/BAF' },
    { page: 'roleplay.html', section: 'roleplay', icon: '🎭', label: '8.롤플레이' },
    { page: 'callplan.html', section: 'callplan', icon: '📋', label: '9.콜플랜 작성' },
    { page: 'spin-tools.html', section: 'spin-tools', icon: '🛠', label: '10.스핀도구들' }
  ];

  let filtered;
  if (role === 'admin') {
    filtered = items;
  } else if (role === 'trainer' || role === 'manager') {
    filtered = items.filter(i => !adminOnly.includes(i.section));
  } else {
    filtered = items.filter(i => !adminOnly.includes(i.section) && !adminTrainer.includes(i.section));
  }

  const spinToolsSubmenu = `
    <div class="nav-submenu">
      <a href="spin-tools.html" class="nav-sub-item"><span>🛠</span> 스핀 도구 메인</a>
      <div class="nav-sub-divider">📚 자료 / 협업</div>
      <a href="spin-library.html" class="nav-sub-item"><span>📚</span> SPIN 질문 라이브러리</a>
      <a href="materials.html" class="nav-sub-item"><span>📂</span> 교육 자료실</a>
      <a href="collab-board.html" class="nav-sub-item"><span>📌</span> 팀 협업 보드</a>
      <div class="nav-sub-divider">🎮 학습 게임</div>
      <a href="games-hub.html" class="nav-sub-item" style="background:rgba(245,166,35,0.1);"><span>🎮</span> 게임 허브 (5종 모음)</a>
      <a href="game-quiz-race.html" class="nav-sub-item"><span>🏁</span> 퀴즈 레이스</a>
      <a href="game-match.html" class="nav-sub-item"><span>🧩</span> 매칭 게임</a>
      <a href="game-flash.html" class="nav-sub-item"><span>🃏</span> 플래시카드</a>
      <a href="game-order.html" class="nav-sub-item"><span>🔢</span> 순서 정렬</a>
      <a href="game-industry.html" class="nav-sub-item"><span>🎯</span> 산업 맞히기</a>
      <a href="game-leaderboard.html" class="nav-sub-item" style="background:rgba(245,166,35,0.1); color:var(--gold-light);"><span>🏆</span> 게임 리더보드</a>
    </div>`;

  return '<div class="nav" id="mainNav">' +
    filtered.map(item => {
      const isHome = item.section === 'home';
      const isSpinTools = item.section === 'spin-tools';
      const onclick = isHome ? ' onclick="clearSessionId();clearUser();clearRole();"' : '';
      if (isSpinTools) {
        return `<div class="nav-item-wrap" onmouseenter="positionSubmenu(this)"><a href="${item.page}" class="nav-item${item.section === activePage ? ' active' : ''}"><span class="nav-icon">${item.icon}</span> ${item.label} ▾</a>${spinToolsSubmenu}</div>`;
      }
      return `<a href="${item.page}"${onclick} class="nav-item${item.section === activePage ? ' active' : ''}"><span class="nav-icon">${item.icon}</span> ${item.label}</a>`;
    }).join('') +
    '</div>';
}

function positionSubmenu(wrap) {
  const submenu = wrap.querySelector('.nav-submenu');
  if (!submenu) return;
  const rect = wrap.getBoundingClientRect();
  submenu.style.top = (rect.bottom) + 'px';
  // 우측 정렬, 화면 밖으로 나가지 않도록
  const submenuWidth = 250;
  let leftPos = rect.right - submenuWidth;
  if (leftPos < 8) leftPos = 8;
  submenu.style.left = leftPos + 'px';
  submenu.style.right = 'auto';
}

function toggleDarkMode() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('spin_theme', next);
}
// 페이지 로드 시 테마 복원
(function(){ const t = localStorage.getItem('spin_theme'); if (t) document.documentElement.setAttribute('data-theme', t); })();

function getFooterHTML() {
  return `
<footer class="footer">
  <div class="footer-inner">
    <div class="footer-top">
      <div class="footer-brand">
        <div class="footer-logo">
          <img src="logo-kornferry.png" alt="Korn Ferry" class="footer-logo-img">
        </div>
        <p class="footer-desc">Korn Ferry(Huthwaite) 35,000건 영업 연구 기반<br>세계 최고의 B2B 영업 방법론을 AI와 함께 체화하는 실전형 훈련 플랫폼</p>
      </div>
      <div class="footer-links">
        <div class="footer-col">
          <h4>교육 프로그램</h4>
          <a href="quiz.html">개념 퀴즈</a>
          <a href="needs.html">IN/EN 구분 실습</a>
          <a href="scenario.html">SPIN 질문구분</a>
          <a href="practice.html">질문 연습</a>
        </div>
        <div class="footer-col">
          <h4>실전 훈련</h4>
          <a href="roleplay.html">AI 롤플레이</a>
          <a href="fab.html">FAB/BAF 연습</a>
          <a href="callplan.html">콜플랜 작성</a>
          <a href="spin-tools.html">스핀 도구들</a>
        </div>
        <div class="footer-col">
          <h4>SPIN 방법론</h4>
          <span>S - 상황질문 (Situation)</span>
          <span>P - 문제질문 (Problem)</span>
          <span>I - 시사질문 (Implication)</span>
          <span>N - 해결질문 (Need-Payoff)</span>
        </div>
      </div>
    </div>
    <div class="footer-divider"></div>
    <div class="footer-bottom">
      <div class="footer-copy">
        <span>&copy; 2024 Korn Ferry SPIN Selling Official Program</span>
        <span class="footer-sep">|</span>
        <span>심재우 대표 &middot; SB Consulting</span>
        <span class="footer-sep">|</span>
        <span>Global Certified SPIN Master Trainer (국제공인 마스터트레이너)</span>
      </div>
      <div class="footer-badges">
        <span class="footer-badge">Korn Ferry Certified</span>
        <span class="footer-badge accent">AI-Enhanced</span>
        <a href="report-sample.html" style="background:rgba(245,166,35,0.15); border:1px solid rgba(245,166,35,0.3); color:var(--gold-light); padding:4px 14px; border-radius:6px; font-size:11px; font-weight:600; text-decoration:none; transition:all 0.2s; cursor:pointer;" onmouseover="this.style.color='#ffffff'" onmouseout="this.style.color='var(--gold-light)'">📋 AI리포트 샘플</a>
        <a href="admin.html" style="background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); color:#ffffff; padding:4px 14px; border-radius:6px; font-size:11px; font-weight:600; text-decoration:none; transition:all 0.2s; cursor:pointer;" onmouseover="this.style.color='#ffffff'" onmouseout="this.style.color='#ffffff'">🔧 관리자</a>
        <a href="manual.html" style="background:rgba(46,204,113,0.15); border:1px solid rgba(46,204,113,0.3); color:#2ecc71; padding:4px 14px; border-radius:6px; font-size:11px; font-weight:600; text-decoration:none; transition:all 0.2s; cursor:pointer;" onmouseover="this.style.color='#ffffff'" onmouseout="this.style.color='#2ecc71'">📘 매뉴얼</a>
        <a href="#" onclick="event.preventDefault();if(prompt('비밀번호:')==='9633')window.open('architecture.svg','_blank');else alert('비밀번호가 틀립니다');" style="background:rgba(36,113,163,0.15); border:1px solid rgba(36,113,163,0.3); color:#3498db; padding:4px 14px; border-radius:6px; font-size:11px; font-weight:600; text-decoration:none; transition:all 0.2s; cursor:pointer;" onmouseover="this.style.color='#ffffff'" onmouseout="this.style.color='#3498db'">🏗 구조도</a>
        <button onclick="toggleDarkMode()" style="background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); color:#ffffff; padding:4px 14px; border-radius:6px; font-size:11px; font-weight:600; cursor:pointer; font-family:inherit;">🌙 다크모드</button>
      </div>
    </div>
  </div>
</footer>`;
}

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', function() {
  const pathname = window.location.pathname;
  const isHome = pathname.endsWith('index.html') || pathname.endsWith('/');
  const isCompany = pathname.includes('company');
  const isScoreboard = pathname.includes('scoreboard');
  const isPrereading = pathname.includes('prereading');
  const isAdmin = pathname.includes('admin');
  const session = getSavedSession();

  const role = getSavedRole();

  // 세션 없음 → 랜딩 페이지로
  if (!session && !isHome && !isPrereading && !isAdmin) {
    location.href = 'index.html';
    return;
  }

  // 세션 있지만 역할 없음 → company.html로 (역할 선택)
  if (session && !role && !isHome && !isCompany && !isPrereading && !isAdmin) {
    location.href = 'company.html';
    return;
  }

  // 교육생인데 유저 미선택 → company.html로
  if (role === 'trainee' && !getSavedUser() && !isHome && !isCompany && !isPrereading && !isAdmin) {
    location.href = 'company.html';
    return;
  }

  // Inject session bar (세션이 있고 홈이 아닐 때)
  const headerEl = document.querySelector('.header');
  if (session && headerEl && !isHome) {
    headerEl.insertAdjacentHTML('afterend', getSessionBarHTML());
  }

  // Inject nav
  const navPlaceholder = document.getElementById('navPlaceholder');
  if (navPlaceholder) {
    const activePage = navPlaceholder.dataset.active;
    navPlaceholder.outerHTML = getNavHTML(activePage);
  }

  // Inject user identity bar (not on home/scoreboard)
  const nav = document.getElementById('mainNav');
  if (nav && !isScoreboard && !isHome && session) {
    nav.insertAdjacentHTML('afterend', getUserBarHTML());
    const bar = document.getElementById('userIdentityBar');
    if (bar) bar.style.display = 'block';
  }

  // Inject flow navigation
  const flowNavPlaceholder = document.getElementById('flowNavPlaceholder');
  if (flowNavPlaceholder) {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const flowHTML = getFlowNavHTML(currentPage);
    if (flowHTML) {
      flowNavPlaceholder.outerHTML = '<div class="main">' + flowHTML + '</div>';
    } else {
      flowNavPlaceholder.remove();
    }
  }

  // Inject footer
  const footerPlaceholder = document.getElementById('footerPlaceholder');
  if (footerPlaceholder) {
    footerPlaceholder.outerHTML = getFooterHTML();
  }

  // Show main app
  const mainApp = document.getElementById('mainApp');
  if (mainApp) mainApp.style.display = 'block';

  // Hide auth overlays
  const authLogin = document.getElementById('authLogin');
  const authSignup = document.getElementById('authSignup');
  if (authLogin) authLogin.classList.add('hidden');
  if (authSignup) authSignup.classList.add('hidden');

  // Restore session state
  if (session) {
    state.session = session;
  }

  // Restore saved user
  restoreUser();

  // Load chatbot
  const cbScript = document.createElement('script');
  cbScript.src = 'chatbot.js';
  document.body.appendChild(cbScript);
});
