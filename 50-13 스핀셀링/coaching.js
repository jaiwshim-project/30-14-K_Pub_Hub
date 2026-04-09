// ========== COACHING REPORT - 종합 코칭 리포트 ==========

// 캐시된 데이터
let coachingMembers = [];
let coachingLogs = [];
let coachingTeamNames = {};

// 활동 유형 한글 매핑
const ACTIVITY_LABELS = {
  quiz: '개념 퀴즈',
  needs: '니즈 구분',
  scenario: 'SPIN 질문구분',
  practice: '질문 연습',
  'spin-needs': 'SPIN질문&니즈',
  fab: 'FAB/BAF',
  roleplay: 'AI 롤플레이',
  callplan: '콜플랜 작성'
};

const ACTIVITY_COLORS = {
  quiz: 'var(--blue)',
  needs: 'var(--green)',
  scenario: 'var(--purple)',
  practice: 'var(--accent)',
  'spin-needs': 'var(--orange)',
  fab: 'var(--gold)',
  roleplay: 'var(--accent-light)',
  callplan: 'var(--blue-light)'
};

const SCORE_CATEGORIES = [
  { key: 'score_quiz', label: '퀴즈', color: 'var(--blue)', max: 80 },
  { key: 'score_needs', label: '니즈 구분', color: 'var(--green)', max: 80 },
  { key: 'score_scenario', label: 'SPIN 질문구분', color: 'var(--purple)', max: 100 },
  { key: 'score_practice', label: '질문 연습', color: 'var(--accent)', max: 120 },
  { key: 'score_roleplay', label: '롤플레이', color: 'var(--accent-light)', max: 100 },
  { key: 'score_fab', label: 'FAB/BAF', color: 'var(--gold)', max: 90 }
];
const COACHING_TOTAL_MAX = 600;

const TEAM_COLORS = ['var(--blue)', 'var(--accent)', 'var(--green)', 'var(--purple)', 'var(--gold)'];

// ========== 데이터 로드 ==========
async function loadCoachingData() {
  try {
    const session = getSavedSession();
    if (!session) {
      document.getElementById('coachingLoading').innerHTML =
        '<div style="font-size:40px; margin-bottom:12px;">⚠️</div><div>교육 세션이 선택되지 않았습니다.<br><a href="index.html" style="color:var(--accent);">홈으로 이동</a></div>';
      return;
    }

    const [members, logs, teamNames] = await Promise.all([
      fetchAllMembers(),
      fetchActivityLogs(session.id),
      fetchTeamNames()
    ]);

    coachingMembers = members || [];
    coachingLogs = logs || [];
    coachingTeamNames = teamNames || { A: '팀 A', B: '팀 B', C: '팀 C', D: '팀 D', E: '팀 E' };

    // 로딩 숨기고 첫 번째 탭 표시
    document.getElementById('coachingLoading').style.display = 'none';
    renderOverviewTab();
    renderMemberSelect();
    renderAiTab();
    document.getElementById('panelOverview').classList.add('active');
  } catch (e) {
    console.error('Coaching data load error:', e);
    document.getElementById('coachingLoading').innerHTML =
      '<div style="font-size:40px; margin-bottom:12px;">❌</div><div>데이터 로드 실패. 새로고침해 주세요.</div>';
  }
}

// ========== 탭 전환 ==========
function switchCoachingTab(tab) {
  // 탭 버튼
  document.querySelectorAll('.coaching-tab').forEach(btn => btn.classList.remove('active'));
  const tabs = ['overview', 'member', 'ai'];
  const idx = tabs.indexOf(tab);
  if (idx >= 0) document.querySelectorAll('.coaching-tab')[idx].classList.add('active');

  // 패널
  document.querySelectorAll('.coaching-panel').forEach(p => p.classList.remove('active'));
  const panelId = { overview: 'panelOverview', member: 'panelMember', ai: 'panelAi' };
  const panel = document.getElementById(panelId[tab]);
  if (panel) panel.classList.add('active');

  // 교육생 탭: 빈 상태 표시
  if (tab === 'member') {
    const sel = document.getElementById('memberSelect');
    if (sel && !sel.value) {
      document.getElementById('memberEmpty').style.display = 'block';
      document.getElementById('memberAnalysis').style.display = 'none';
    }
  }
}

// ========== 유틸 ==========
function getRegisteredMembers() {
  return coachingMembers.filter(m => m.name && m.name.trim() !== '');
}

function getMemberTotalScore(m) {
  return (m.score_quiz || 0) + (m.score_needs || 0) + (m.score_scenario || 0) +
         (m.score_practice || 0) + (m.score_roleplay || 0) + (m.score_fab || 0);
}

function getTeamDisplayName(teamId) {
  return coachingTeamNames[teamId] || ('팀 ' + teamId);
}

function formatTime(isoStr) {
  if (!isoStr) return '';
  const d = new Date(isoStr);
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  const hour = d.getHours().toString().padStart(2, '0');
  const min = d.getMinutes().toString().padStart(2, '0');
  return `${month}/${day} ${hour}:${min}`;
}

function getGrade(totalScore) {
  if (totalScore >= 300) return 'A+';
  if (totalScore >= 250) return 'A';
  if (totalScore >= 200) return 'B+';
  if (totalScore >= 150) return 'B';
  if (totalScore >= 100) return 'C+';
  if (totalScore >= 50) return 'C';
  return 'D';
}

// ========== 탭 1: 전체 현황 렌더링 ==========
function renderOverviewTab() {
  const registered = getRegisteredMembers();
  const totalMembers = registered.length;

  // 활동 참여한 멤버 ID 집합
  const activeMemberIds = new Set(coachingLogs.map(l => l.member_id));
  const activeCount = registered.filter(m => activeMemberIds.has(m.id)).length;
  const participationRate = totalMembers > 0 ? Math.round((activeCount / totalMembers) * 100) : 0;

  // 평균 점수
  const avgScore = totalMembers > 0
    ? Math.round(registered.reduce((s, m) => s + getMemberTotalScore(m), 0) / totalMembers)
    : 0;

  // 통계 카드
  document.getElementById('overviewStats').innerHTML = `
    <div class="coaching-stat-card">
      <div class="coaching-stat-value" style="color:var(--blue);">${totalMembers}</div>
      <div class="coaching-stat-label">등록 인원</div>
    </div>
    <div class="coaching-stat-card">
      <div class="coaching-stat-value" style="color:var(--green);">${participationRate}%</div>
      <div class="coaching-stat-label">활동 참여율</div>
    </div>
    <div class="coaching-stat-card">
      <div class="coaching-stat-value" style="color:var(--purple);">${coachingLogs.length}</div>
      <div class="coaching-stat-label">총 활동 수</div>
    </div>
    <div class="coaching-stat-card">
      <div class="coaching-stat-value" style="color:var(--gold);">${avgScore}</div>
      <div class="coaching-stat-label">평균 점수</div>
    </div>
  `;

  // 활동별 참여율 바 차트
  renderActivityBarChart(registered);

  // 팀별 평균 점수
  renderTeamBarChart(registered);

  // 최근 활동 타임라인
  renderRecentTimeline();
}

function renderActivityBarChart(registered) {
  const types = Object.keys(ACTIVITY_LABELS);
  const totalMembers = registered.length || 1;

  // 각 활동별 참여 멤버 수
  const participation = {};
  types.forEach(t => participation[t] = new Set());
  coachingLogs.forEach(log => {
    if (participation[log.activity_type]) {
      participation[log.activity_type].add(log.member_id);
    }
  });

  let html = '';
  types.forEach(type => {
    const count = participation[type].size;
    const pct = Math.round((count / totalMembers) * 100);
    html += `
      <div class="bar-row">
        <div class="bar-label">${ACTIVITY_LABELS[type]}</div>
        <div class="bar-track">
          <div class="bar-fill" style="width:${Math.max(pct, 2)}%; background:${ACTIVITY_COLORS[type]};">
            ${pct >= 15 ? `<span class="bar-fill-text">${pct}%</span>` : ''}
          </div>
        </div>
        <div class="bar-value">${count}명</div>
      </div>`;
  });

  document.getElementById('activityBarChart').innerHTML = html;
}

function renderTeamBarChart(registered) {
  const teams = ['A', 'B', 'C', 'D', 'E'];
  const teamScores = {};

  teams.forEach(t => {
    const teamMembers = registered.filter(m => m.team_id === t);
    if (teamMembers.length > 0) {
      teamScores[t] = Math.round(teamMembers.reduce((s, m) => s + getMemberTotalScore(m), 0) / teamMembers.length);
    } else {
      teamScores[t] = 0;
    }
  });

  const maxScore = Math.max(...Object.values(teamScores), 1);

  let html = '';
  teams.forEach((t, i) => {
    const score = teamScores[t];
    const pct = Math.round((score / maxScore) * 100);
    const teamMembers = registered.filter(m => m.team_id === t);
    if (teamMembers.length === 0) return; // 멤버 없는 팀 건너뛰기

    html += `
      <div class="team-bar-row">
        <div class="team-bar-label">${getTeamDisplayName(t)}</div>
        <div class="team-bar-track">
          <div class="team-bar-fill" style="width:${Math.max(pct, 3)}%; background:${TEAM_COLORS[i]};">
            <span class="team-bar-value">${score}/600점</span>
          </div>
        </div>
      </div>`;
  });

  document.getElementById('teamBarChart').innerHTML = html || '<div style="color:var(--text-muted); font-size:13px; padding:16px;">등록된 팀 데이터가 없습니다.</div>';
}

function renderRecentTimeline() {
  const recent = coachingLogs.slice(0, 20);

  if (recent.length === 0) {
    document.getElementById('recentTimeline').innerHTML =
      '<div style="color:var(--text-muted); font-size:13px; padding:16px;">아직 활동 기록이 없습니다.</div>';
    return;
  }

  let html = '';
  recent.forEach(log => {
    const memberInfo = log.spin_members || {};
    const memberName = memberInfo.name || '알 수 없음';
    const teamId = memberInfo.team_id || '?';
    const color = ACTIVITY_COLORS[log.activity_type] || 'var(--text-muted)';
    const label = ACTIVITY_LABELS[log.activity_type] || log.activity_type;
    const scoreText = log.score ? ` (+${log.score}점)` : '';

    // activity_data에서 간략 정보 추출
    let detail = '';
    if (log.activity_data) {
      const data = typeof log.activity_data === 'string' ? JSON.parse(log.activity_data) : log.activity_data;
      if (data.correct !== undefined && data.total !== undefined) {
        detail = ` - ${data.correct}/${data.total} 정답`;
      } else if (data.spin_type) {
        detail = ` - ${getTypeName(data.spin_type)}`;
      } else if (data.scenario) {
        detail = ` - ${data.scenario.substring(0, 30)}...`;
      }
    }

    html += `
      <div class="timeline-item">
        <div class="timeline-dot" style="background:${color};"></div>
        <div class="timeline-content">
          <div class="timeline-title">[팀 ${teamId}] ${memberName} - ${label}${scoreText}</div>
          <div class="timeline-meta">${formatTime(log.created_at)}${detail}</div>
        </div>
      </div>`;
  });

  document.getElementById('recentTimeline').innerHTML = html;
}

// ========== 탭 2: 교육생별 분석 ==========
function renderMemberSelect() {
  const registered = getRegisteredMembers();
  const select = document.getElementById('memberSelect');
  const teams = ['A', 'B', 'C', 'D', 'E'];

  let html = '<option value="">-- 교육생을 선택하세요 --</option>';
  teams.forEach(t => {
    const teamMembers = registered.filter(m => m.team_id === t);
    if (teamMembers.length === 0) return;

    html += `<optgroup label="${getTeamDisplayName(t)}">`;
    teamMembers.forEach(m => {
      const total = getMemberTotalScore(m);
      html += `<option value="${m.id}">${m.name} (${total}/600점)</option>`;
    });
    html += '</optgroup>';
  });

  select.innerHTML = html;
}

function selectMemberForAnalysis(memberId) {
  if (!memberId) {
    document.getElementById('memberAnalysis').style.display = 'none';
    document.getElementById('memberEmpty').style.display = 'block';
    return;
  }

  document.getElementById('memberEmpty').style.display = 'none';
  document.getElementById('memberAnalysis').style.display = 'block';

  const member = coachingMembers.find(m => m.id == memberId);
  if (!member) return;

  const memberLogs = coachingLogs.filter(l => l.member_id == memberId);

  // 이름 표시
  document.getElementById('memberNameTitle').textContent = `${member.name} (팀 ${member.team_id})`;

  // 점수 바
  renderMemberScoreBars(member);

  // SPIN 역량 분석
  renderMemberSpinAnalysis(memberLogs);

  // 강점/약점 진단
  renderMemberDiagnosis(member, memberLogs);

  // 활동 이력
  renderMemberTimeline(memberLogs);
}

function renderMemberScoreBars(member) {
  let html = '';
  SCORE_CATEGORIES.forEach(cat => {
    const score = member[cat.key] || 0;
    const max = cat.max;
    const pct = Math.round((score / max) * 100);
    html += `
      <div class="score-bar-row">
        <div class="score-bar-label">${cat.label}</div>
        <div class="score-bar-track">
          <div class="score-bar-fill" style="width:${Math.max(pct, 2)}%; background:${cat.color};"></div>
        </div>
        <div class="score-bar-value">${score} <span style="color:var(--text-disabled,#aaa); font-size:11px;">/ ${max}</span></div>
      </div>`;
  });

  const totalScore = getMemberTotalScore(member);
  html += `
    <div class="score-bar-row" style="margin-top:8px; padding-top:8px; border-top:1px solid var(--border,#e0e0e0);">
      <div class="score-bar-label" style="font-weight:800;">합계</div>
      <div class="score-bar-track">
        <div class="score-bar-fill" style="width:${Math.max(Math.round((totalScore / COACHING_TOTAL_MAX) * 100), 2)}%; background:var(--accent);"></div>
      </div>
      <div class="score-bar-value" style="font-weight:800;">${totalScore} <span style="color:var(--text-disabled,#aaa); font-size:11px;">/ ${COACHING_TOTAL_MAX}</span></div>
    </div>`;

  document.getElementById('memberScoreBars').innerHTML = html;
}

function renderMemberSpinAnalysis(memberLogs) {
  // 롤플레이/질문연습 로그에서 SPIN 비율 추출
  const spinCounts = { S: 0, P: 0, I: 0, N: 0 };

  memberLogs.forEach(log => {
    if (!log.activity_data) return;
    const data = typeof log.activity_data === 'string' ? JSON.parse(log.activity_data) : log.activity_data;

    // spin_type이 있는 경우 (practice, spin-needs 등)
    if (data.spin_type && spinCounts[data.spin_type] !== undefined) {
      spinCounts[data.spin_type]++;
    }

    // SPIN 카운트가 직접 있는 경우 (roleplay 등)
    if (data.spin_counts) {
      spinCounts.S += (data.spin_counts.S || 0);
      spinCounts.P += (data.spin_counts.P || 0);
      spinCounts.I += (data.spin_counts.I || 0);
      spinCounts.N += (data.spin_counts.N || 0);
    }

    // questions 배열이 있는 경우
    if (data.questions && Array.isArray(data.questions)) {
      data.questions.forEach(q => {
        if (q.type && spinCounts[q.type] !== undefined) {
          spinCounts[q.type]++;
        }
      });
    }
  });

  const total = spinCounts.S + spinCounts.P + spinCounts.I + spinCounts.N;
  const spinColors = { S: 'var(--blue)', P: 'var(--accent)', I: 'var(--purple)', N: 'var(--gold)' };
  const spinLabels = { S: '상황질문 (S)', P: '문제질문 (P)', I: '시사질문 (I)', N: '해결질문 (N)' };

  // 분포 카드
  let distHtml = '';
  ['S', 'P', 'I', 'N'].forEach(type => {
    const count = spinCounts[type];
    const pct = total > 0 ? Math.round((count / total) * 100) : 0;
    distHtml += `
      <div class="spin-dist-item">
        <div class="spin-dist-label" style="color:${spinColors[type]};">${spinLabels[type]}</div>
        <div class="spin-dist-value" style="color:${spinColors[type]};">${count}</div>
        <div class="spin-dist-pct">${pct}%</div>
      </div>`;
  });
  document.getElementById('memberSpinDist').innerHTML = distHtml;

  // 바 차트
  let barHtml = '';
  if (total > 0) {
    ['S', 'P', 'I', 'N'].forEach(type => {
      const count = spinCounts[type];
      const pct = Math.round((count / total) * 100);
      barHtml += `
        <div class="bar-row">
          <div class="bar-label" style="color:${spinColors[type]};">${spinLabels[type]}</div>
          <div class="bar-track">
            <div class="bar-fill" style="width:${Math.max(pct, 2)}%; background:${spinColors[type]};">
              ${pct >= 12 ? `<span class="bar-fill-text">${pct}%</span>` : ''}
            </div>
          </div>
          <div class="bar-value">${count}회</div>
        </div>`;
    });
  } else {
    barHtml = '<div style="color:var(--text-muted); font-size:13px;">SPIN 질문 데이터가 아직 없습니다.</div>';
  }
  document.getElementById('memberSpinBars').innerHTML = barHtml;
}

function renderMemberDiagnosis(member, memberLogs) {
  const scores = SCORE_CATEGORIES.map(c => ({ label: c.label, score: member[c.key] || 0, max: c.max || 100 }));
  const sortedScores = [...scores].sort((a, b) => b.score - a.score);

  const strengths = sortedScores.filter(s => s.score > 0).slice(0, 2);
  const weaknesses = sortedScores.filter(s => s.score >= 0).reverse().slice(0, 2);

  // SPIN 분석
  const spinCounts = { S: 0, P: 0, I: 0, N: 0 };
  memberLogs.forEach(log => {
    if (!log.activity_data) return;
    const data = typeof log.activity_data === 'string' ? JSON.parse(log.activity_data) : log.activity_data;
    if (data.spin_type && spinCounts[data.spin_type] !== undefined) spinCounts[data.spin_type]++;
    if (data.spin_counts) {
      spinCounts.S += (data.spin_counts.S || 0);
      spinCounts.P += (data.spin_counts.P || 0);
      spinCounts.I += (data.spin_counts.I || 0);
      spinCounts.N += (data.spin_counts.N || 0);
    }
    if (data.questions && Array.isArray(data.questions)) {
      data.questions.forEach(q => { if (q.type && spinCounts[q.type] !== undefined) spinCounts[q.type]++; });
    }
  });

  let html = '';

  // 강점
  if (strengths.length > 0 && strengths[0].score > 0) {
    html += `<div class="diagnosis-box">
      <div class="diagnosis-title" style="color:var(--green);">💪 강점</div>`;
    strengths.forEach(s => {
      if (s.score > 0) html += `<div class="diagnosis-item">- ${s.label}: ${s.score}/${s.max || 100}점으로 우수한 성과</div>`;
    });
    html += '</div>';
  }

  // 약점
  const hasWeak = weaknesses.some(w => {
    const best = sortedScores[0].score;
    return best > 0 && w.score < best * 0.5;
  });
  if (hasWeak) {
    html += `<div class="diagnosis-box weak">
      <div class="diagnosis-title" style="color:var(--accent);">📌 개선 필요</div>`;
    weaknesses.forEach(w => {
      if (sortedScores[0].score > 0 && w.score < sortedScores[0].score * 0.5) {
        html += `<div class="diagnosis-item">- ${w.label}: 추가 학습이 필요합니다 (${w.score}/${w.max || 100}점)</div>`;
      }
    });
    html += '</div>';
  }

  // SPIN 질문 진단
  const spinTotal = spinCounts.S + spinCounts.P + spinCounts.I + spinCounts.N;
  if (spinTotal > 0) {
    const spinTips = [];
    if (spinCounts.S > spinTotal * 0.4) spinTips.push('상황질문(S) 비율이 높습니다. 핵심 상황질문만 선별하세요.');
    if (spinCounts.P < spinTotal * 0.15) spinTips.push('문제질문(P)이 부족합니다. 고객의 불만과 어려움을 더 탐색하세요.');
    if (spinCounts.I < spinTotal * 0.15) spinTips.push('시사질문(I) 활용을 늘려야 합니다. 잠재니즈를 현재니즈로 전환하는 핵심입니다.');
    if (spinCounts.N < spinTotal * 0.1) spinTips.push('해결질문(N)을 더 활용하세요. 고객이 해결책의 가치를 스스로 말하게 유도하세요.');
    if (spinTips.length === 0) spinTips.push('SPIN 질문을 균형있게 사용하고 있습니다.');

    html += `<div class="diagnosis-box" style="background:var(--pastel-blue); border-color:rgba(36,113,163,0.15);">
      <div class="diagnosis-title" style="color:var(--blue);">🔍 SPIN 질문 패턴 분석</div>`;
    spinTips.forEach(tip => { html += `<div class="diagnosis-item">- ${tip}</div>`; });
    html += '</div>';
  }

  if (!html) {
    html = '<div style="color:var(--text-muted); font-size:13px; padding:16px;">활동 데이터가 부족하여 진단할 수 없습니다.</div>';
  }

  document.getElementById('memberDiagnosis').innerHTML = html;
}

function renderMemberTimeline(memberLogs) {
  if (memberLogs.length === 0) {
    document.getElementById('memberTimeline').innerHTML =
      '<div style="color:var(--text-muted); font-size:13px; padding:16px;">활동 기록이 없습니다.</div>';
    return;
  }

  let html = '';
  memberLogs.slice(0, 30).forEach(log => {
    const color = ACTIVITY_COLORS[log.activity_type] || 'var(--text-muted)';
    const label = ACTIVITY_LABELS[log.activity_type] || log.activity_type;
    const scoreText = log.score ? ` (+${log.score}점)` : '';

    let detail = '';
    if (log.activity_data) {
      const data = typeof log.activity_data === 'string' ? JSON.parse(log.activity_data) : log.activity_data;
      if (data.correct !== undefined && data.total !== undefined) {
        detail = `${data.correct}/${data.total} 정답`;
      } else if (data.spin_type) {
        detail = getTypeName(data.spin_type);
      }
    }

    html += `
      <div class="timeline-item">
        <div class="timeline-dot" style="background:${color};"></div>
        <div class="timeline-content">
          <div class="timeline-title">${label}${scoreText}</div>
          <div class="timeline-meta">${formatTime(log.created_at)}${detail ? ' | ' + detail : ''}</div>
        </div>
      </div>`;
  });

  document.getElementById('memberTimeline').innerHTML = html;
}

// ========== 탭 3: AI 코칭 ==========
function renderAiTab() {
  const registered = getRegisteredMembers();
  const totalMembers = registered.length;

  if (totalMembers === 0) {
    document.getElementById('aiInsightList').innerHTML =
      '<div class="ai-insight-item">등록된 교육생이 없어 분석할 수 없습니다.</div>';
    document.getElementById('globalSpinDist').innerHTML = '';
    document.getElementById('globalSpinBars').innerHTML = '';
    document.getElementById('coachingPointsList').innerHTML = '<li>교육생이 등록되면 코칭 포인트가 생성됩니다.</li>';
    return;
  }

  // === 인사이트 생성 ===
  const insights = [];

  // 1. 가장 어려워한 활동 (참여율 가장 낮은 것)
  const types = Object.keys(ACTIVITY_LABELS);
  const participation = {};
  types.forEach(t => participation[t] = new Set());
  coachingLogs.forEach(log => {
    if (participation[log.activity_type]) participation[log.activity_type].add(log.member_id);
  });

  const sortedByParticipation = types
    .map(t => ({ type: t, count: participation[t].size }))
    .sort((a, b) => a.count - b.count);

  if (sortedByParticipation.length > 0 && coachingLogs.length > 0) {
    const hardest = sortedByParticipation[0];
    const easiest = sortedByParticipation[sortedByParticipation.length - 1];
    insights.push(`이번 교육에서 교육생들이 가장 적게 참여한 활동은 <strong>${ACTIVITY_LABELS[hardest.type]}</strong>입니다 (${hardest.count}명 참여).`);
    insights.push(`가장 활발한 활동은 <strong>${ACTIVITY_LABELS[easiest.type]}</strong>입니다 (${easiest.count}명 참여).`);
  }

  // 2. 전체 SPIN 비율 분석
  const globalSpin = { S: 0, P: 0, I: 0, N: 0 };
  coachingLogs.forEach(log => {
    if (!log.activity_data) return;
    const data = typeof log.activity_data === 'string' ? JSON.parse(log.activity_data) : log.activity_data;
    if (data.spin_type && globalSpin[data.spin_type] !== undefined) globalSpin[data.spin_type]++;
    if (data.spin_counts) {
      globalSpin.S += (data.spin_counts.S || 0);
      globalSpin.P += (data.spin_counts.P || 0);
      globalSpin.I += (data.spin_counts.I || 0);
      globalSpin.N += (data.spin_counts.N || 0);
    }
    if (data.questions && Array.isArray(data.questions)) {
      data.questions.forEach(q => { if (q.type && globalSpin[q.type] !== undefined) globalSpin[q.type]++; });
    }
  });

  const spinTotal = globalSpin.S + globalSpin.P + globalSpin.I + globalSpin.N;
  if (spinTotal > 0) {
    const iPct = Math.round((globalSpin.I / spinTotal) * 100);
    const nPct = Math.round((globalSpin.N / spinTotal) * 100);
    if (iPct < 15) insights.push(`시사질문(I) 활용이 전반적으로 부족합니다 (${iPct}%). 잠재니즈를 현재니즈로 전환하는 핵심 질문을 더 연습해야 합니다.`);
    if (nPct < 10) insights.push(`해결질문(N)의 비율이 낮습니다 (${nPct}%). 고객이 해결책의 가치를 직접 말하게 유도하는 연습이 필요합니다.`);
    const sPct = Math.round((globalSpin.S / spinTotal) * 100);
    if (sPct > 40) insights.push(`상황질문(S) 비율이 ${sPct}%로 높습니다. 핵심 상황질문만 선별하여 사용하는 연습이 필요합니다.`);
  }

  // 3. 팀별 분석
  const teams = ['A', 'B', 'C', 'D', 'E'];
  const teamData = teams.map(t => {
    const teamMembers = registered.filter(m => m.team_id === t);
    const activeMembers = teamMembers.filter(m => {
      return coachingLogs.some(l => l.member_id === m.id);
    });
    return {
      team: t,
      name: getTeamDisplayName(t),
      memberCount: teamMembers.length,
      activeCount: activeMembers.length,
      rate: teamMembers.length > 0 ? Math.round((activeMembers.length / teamMembers.length) * 100) : 0,
      avgScore: teamMembers.length > 0 ? Math.round(teamMembers.reduce((s, m) => s + getMemberTotalScore(m), 0) / teamMembers.length) : 0
    };
  }).filter(t => t.memberCount > 0).sort((a, b) => b.rate - a.rate);

  if (teamData.length > 0) {
    insights.push(`<strong>${teamData[0].name}</strong>이(가) 가장 높은 참여율을 보이고 있습니다 (${teamData[0].rate}%).`);
  }

  // 4. 상위 3명
  const ranked = [...registered].sort((a, b) => getMemberTotalScore(b) - getMemberTotalScore(a));
  if (ranked.length >= 1) {
    const top3 = ranked.slice(0, 3).map(m => `${m.name}(${getGrade(getMemberTotalScore(m))})`).join(', ');
    insights.push(`상위 교육생: <strong>${top3}</strong>`);
  }

  // 인사이트 렌더링
  if (insights.length === 0) {
    insights.push('아직 분석할 활동 데이터가 충분하지 않습니다. 교육생들의 활동이 쌓이면 인사이트가 생성됩니다.');
  }
  document.getElementById('aiInsightList').innerHTML =
    insights.map(i => `<div class="ai-insight-item">${i}</div>`).join('');

  // === 전체 SPIN 분포 ===
  renderGlobalSpinDist(globalSpin, spinTotal);

  // === 권장 코칭 포인트 ===
  renderCoachingPoints(registered, globalSpin, spinTotal, participation, teamData);
}

function renderGlobalSpinDist(globalSpin, spinTotal) {
  const spinColors = { S: 'var(--blue)', P: 'var(--accent)', I: 'var(--purple)', N: 'var(--gold)' };
  const spinLabels = { S: '상황질문 (S)', P: '문제질문 (P)', I: '시사질문 (I)', N: '해결질문 (N)' };

  // 분포 카드
  let distHtml = '';
  ['S', 'P', 'I', 'N'].forEach(type => {
    const count = globalSpin[type];
    const pct = spinTotal > 0 ? Math.round((count / spinTotal) * 100) : 0;
    distHtml += `
      <div class="spin-dist-item">
        <div class="spin-dist-label" style="color:${spinColors[type]};">${spinLabels[type]}</div>
        <div class="spin-dist-value" style="color:${spinColors[type]};">${count}</div>
        <div class="spin-dist-pct">${pct}%</div>
      </div>`;
  });
  document.getElementById('globalSpinDist').innerHTML = distHtml;

  // 바 차트
  let barHtml = '';
  if (spinTotal > 0) {
    ['S', 'P', 'I', 'N'].forEach(type => {
      const count = globalSpin[type];
      const pct = Math.round((count / spinTotal) * 100);
      barHtml += `
        <div class="bar-row">
          <div class="bar-label" style="color:${spinColors[type]};">${spinLabels[type]}</div>
          <div class="bar-track">
            <div class="bar-fill" style="width:${Math.max(pct, 2)}%; background:${spinColors[type]};">
              ${pct >= 12 ? `<span class="bar-fill-text">${pct}%</span>` : ''}
            </div>
          </div>
          <div class="bar-value">${count}회</div>
        </div>`;
    });
  } else {
    barHtml = '<div style="color:var(--text-muted); font-size:13px;">SPIN 질문 데이터가 아직 없습니다.</div>';
  }
  document.getElementById('globalSpinBars').innerHTML = barHtml;
}

function renderCoachingPoints(registered, globalSpin, spinTotal, participation, teamData) {
  const points = [];

  // SPIN 관련
  if (spinTotal > 0) {
    const iPct = Math.round((globalSpin.I / spinTotal) * 100);
    const nPct = Math.round((globalSpin.N / spinTotal) * 100);
    const sPct = Math.round((globalSpin.S / spinTotal) * 100);

    if (iPct < 20) points.push('시사질문(I) 연습을 강화하세요. "만약 이 문제가 계속된다면..." 형태의 질문으로 고객이 문제의 심각성을 인식하게 해야 합니다.');
    if (nPct < 15) points.push('해결질문(N) 활용을 늘리세요. "만약 ~가 가능하다면 어떤 도움이 될까요?" 형태로 고객이 해결책의 가치를 스스로 설명하게 유도하세요.');
    if (sPct > 35) points.push('상황질문(S) 비율을 줄이세요. 사전 조사로 대체 가능한 상황질문은 생략하고, 핵심 상황질문만 사용하세요.');
  }

  // 참여율 관련
  const types = Object.keys(ACTIVITY_LABELS);
  types.forEach(t => {
    const rate = registered.length > 0 ? Math.round((participation[t].size / registered.length) * 100) : 0;
    if (rate < 30 && rate > 0) {
      points.push(`${ACTIVITY_LABELS[t]} 참여율이 ${rate}%로 낮습니다. 교육생들의 적극적인 참여를 독려해 주세요.`);
    }
  });

  // 팀 격차
  if (teamData.length >= 2) {
    const maxTeam = teamData[0];
    const minTeam = teamData[teamData.length - 1];
    if (maxTeam.avgScore > 0 && minTeam.avgScore < maxTeam.avgScore * 0.5) {
      points.push(`${minTeam.name}의 평균 점수(${minTeam.avgScore}점)가 ${maxTeam.name}(${maxTeam.avgScore}점)에 비해 낮습니다. 추가 지원이 필요할 수 있습니다.`);
    }
  }

  // 하위 교육생
  const ranked = [...registered].sort((a, b) => getMemberTotalScore(b) - getMemberTotalScore(a));
  const bottom = ranked.filter(m => getMemberTotalScore(m) < 30);
  if (bottom.length > 0 && registered.length >= 5) {
    points.push(`${bottom.length}명의 교육생이 총점 30점 미만입니다. 개별 코칭으로 참여를 유도하세요.`);
  }

  // 기본 포인트
  if (points.length === 0) {
    points.push('교육이 원활하게 진행되고 있습니다. 교육생들의 실전 적용을 위해 롤플레이와 콜플랜 작성을 권장합니다.');
    points.push('SPIN 질문의 균형 잡힌 사용을 지속적으로 강조하세요. 특히 시사질문(I)과 해결질문(N)의 중요성을 반복 설명해 주세요.');
  }

  document.getElementById('coachingPointsList').innerHTML =
    points.map(p => `<li>${p}</li>`).join('');
}

// ========== 초기화 ==========
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => loadCoachingData(), 200);
});
