// Supabase config (SUPABASE_URL, SUPABASE_KEY, SB_HEADERS) is in common.js
// ========== CONSTANTS ==========
const TEAMS = ['A', 'B', 'C', 'D', 'E'];
const TEAM_COLORS = { A: 'var(--accent)', B: 'var(--blue)', C: 'var(--green)', D: 'var(--gold)', E: 'var(--purple)' };
const CATEGORIES = ['quiz', 'needs', 'scenario', 'practice', 'roleplay', 'fab'];
const CAT_LABELS = { quiz: '퀴즈', needs: '니즈구분', scenario: '시나리오', practice: '질문연습', roleplay: '롤플레이', fab: 'FAB' };
const CAT_MAX = { quiz: 80, needs: 80, scenario: 100, practice: 120, roleplay: 100, fab: 90 };
const TOTAL_MAX = 600;
const MAX_SUFFIX = '<span style="color:var(--text-disabled,#aaa); font-size:11px;">';

// ========== SUPABASE API (scoreboard) ==========
async function fetchMembers() {
  return await fetchAllMembers();
}

async function updateMember(id, data) {
  data.updated_at = new Date().toISOString();
  await fetch(
    `${SUPABASE_URL}/rest/v1/spin_members?id=eq.${id}`,
    { method: 'PATCH', headers: SB_HEADERS, body: JSON.stringify(data) }
  );
}

// Convert flat array to team-grouped structure
function groupByTeam(members) {
  const grouped = {};
  TEAMS.forEach(t => { grouped[t] = []; });
  members.forEach(m => {
    if (grouped[m.team_id]) grouped[m.team_id].push(m);
  });
  return grouped;
}

// ========== TAB SWITCHING ==========
function switchTab(tab) {
  document.querySelectorAll('.sb-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('tabTeam').style.display = tab === 'team' ? 'block' : 'none';
  document.getElementById('tabIndividual').style.display = tab === 'individual' ? 'block' : 'none';
  document.getElementById('tabRanking').style.display = tab === 'ranking' ? 'block' : 'none';
  document.getElementById('tabSurveyPre').style.display = tab === 'surveyPre' ? 'block' : 'none';
  document.getElementById('tabSurveyPost').style.display = tab === 'surveyPost' ? 'block' : 'none';

  const tabs = document.querySelectorAll('.sb-tab');
  if (tab === 'team') tabs[0].classList.add('active');
  if (tab === 'individual') tabs[1].classList.add('active');
  if (tab === 'ranking') tabs[2].classList.add('active');
  if (tab === 'surveyPre') tabs[3].classList.add('active');
  if (tab === 'surveyPost') tabs[4].classList.add('active');

  loadAndRender(tab);
}

async function loadAndRender(tab) {
  const members = await fetchMembers();
  const grouped = groupByTeam(members);

  if (tab === 'team') renderTeamSetup(grouped, members);
  else if (tab === 'individual') renderIndividualScores(grouped);
  else if (tab === 'ranking') renderRanking(grouped, members);
  else if (tab === 'surveyPre') loadSurveyResults('pre', members);
  else if (tab === 'surveyPost') loadSurveyResults('post', members);
}

// ========== TAB 1: TEAM SETUP ==========
function renderTeamSetup(grouped, members) {
  const container = document.getElementById('teamSetup');

  container.innerHTML = TEAMS.map(t => {
    const teamMembers = grouped[t];
    const teamTotal = getMembersTotalScore(teamMembers);
    const memberInputs = teamMembers.map((m, i) => `
      <div>
        <div class="sb-member-label">팀원 ${i + 1}</div>
        <input class="sb-member-input" type="text" value="${m.name || ''}"
          placeholder="이름 입력"
          onchange="handleNameChange(${m.id}, this.value)">
      </div>
    `).join('');

    return `
      <div class="sb-team-card team-${t}">
        <div class="sb-team-name">팀 ${t}</div>
        <div class="sb-team-score">${teamTotal}점</div>
        ${memberInputs}
      </div>
    `;
  }).join('');

  renderTeamScoreTable(grouped);
}

async function handleNameChange(id, name) {
  await updateMember(id, { name: name.trim() });
}

function renderTeamScoreTable(grouped) {
  const tbody = document.getElementById('teamScoreBody');

  const teamStats = TEAMS.map(t => {
    const members = grouped[t];
    const count = members.length || 1;
    const avgs = {};
    CATEGORIES.forEach(c => {
      avgs[c] = Math.round(members.reduce((sum, m) => sum + (m['score_' + c] || 0), 0) / count * 10) / 10;
    });
    avgs.total = Math.round(CATEGORIES.reduce((sum, c) => sum + avgs[c], 0) * 10) / 10;
    return { key: t, count, ...avgs };
  }).sort((a, b) => b.total - a.total);

  tbody.innerHTML = teamStats.map((team, i) => {
    const rankClass = i < 3 ? `rank-${i + 1}` : '';
    return `
      <tr>
        <td><span class="rank-badge ${rankClass}">${i + 1}</span></td>
        <td style="font-weight:600;"><span class="team-label-cell ${team.key}">팀 ${team.key}</span> <span style="font-size:11px; color:var(--text-muted);">(${team.count}명)</span></td>
        <td>${team.quiz}${MAX_SUFFIX}/${CAT_MAX.quiz}</span></td>
        <td>${team.needs}${MAX_SUFFIX}/${CAT_MAX.needs}</span></td>
        <td>${team.scenario}${MAX_SUFFIX}/${CAT_MAX.scenario}</span></td>
        <td>${team.practice}${MAX_SUFFIX}/${CAT_MAX.practice}</span></td>
        <td>${team.roleplay}${MAX_SUFFIX}/${CAT_MAX.roleplay}</span></td>
        <td>${team.fab}${MAX_SUFFIX}/${CAT_MAX.fab}</span></td>
        <td class="score-total score-count-animated" data-target="${team.total}">${team.total}${MAX_SUFFIX}/${TOTAL_MAX}</span></td>
        <td style="min-width:80px; font-weight:700; color:var(--blue);">${team.total} / ${TOTAL_MAX}</td>
      </tr>
    `;
  }).join('');

  applyRowAnimations('teamScoreBody');
  animateScores();
}

// ========== TAB 2: INDIVIDUAL SCORES ==========
function renderIndividualScores(grouped) {
  const tbody = document.getElementById('individualScoreBody');
  let html = '';

  TEAMS.forEach(t => {
    const members = grouped[t];
    members.forEach((m) => {
      const name = m.name || `팀${t}-${m.slot + 1}`;
      const total = CATEGORIES.reduce((sum, c) => sum + (m['score_' + c] || 0), 0);

      html += `<tr>
        <td class="member-name-cell" style="text-align:left; padding-left:16px;"><a href="#" onclick="showMemberActivity(${m.id}, '${name.replace(/'/g,"\\'")}', '${t}'); return false;" style="color:var(--blue); text-decoration:underline; cursor:pointer;">${name}</a></td>
        <td><span class="team-label-cell ${t}">팀 ${t}</span></td>
        ${CATEGORIES.map(c => `
          <td><input class="score-cell-input" type="number" min="0" value="${m['score_' + c] || 0}"
            onchange="handleScoreChange(${m.id}, '${c}', this.value, this)">${MAX_SUFFIX}/${CAT_MAX[c]}</span></td>
        `).join('')}
        <td class="score-total" id="total-${m.id}">${total}${MAX_SUFFIX}/${TOTAL_MAX}</span></td>
      </tr>`;
    });

    // Team subtotal
    const teamTotals = {};
    CATEGORIES.forEach(c => {
      teamTotals[c] = members.reduce((sum, m) => sum + (m['score_' + c] || 0), 0);
    });
    const grandTotal = CATEGORIES.reduce((sum, c) => sum + teamTotals[c], 0);

    const memberCount = members.filter(m => m.name).length || members.length;
    html += `<tr class="sb-summary-row">
      <td style="text-align:left; padding-left:16px;">팀 ${t} 소계</td>
      <td></td>
      ${CATEGORIES.map(c => `<td>${teamTotals[c]}${MAX_SUFFIX}/${CAT_MAX[c] * memberCount}</span></td>`).join('')}
      <td class="score-total">${grandTotal}${MAX_SUFFIX}/${TOTAL_MAX * memberCount}</span></td>
    </tr>`;
  });

  tbody.innerHTML = html;

  // 개인 순위 (합계 기준 정렬)
  const allForRank = [];
  TEAMS.forEach(t => {
    grouped[t].forEach(m => {
      const total = CATEGORIES.reduce((sum, c) => sum + (m['score_' + c] || 0), 0);
      allForRank.push({ ...m, team: t, total });
    });
  });
  allForRank.sort((a, b) => b.total - a.total);

  const rankBody = document.getElementById('individualRankBody');
  if (rankBody) {
    rankBody.innerHTML = allForRank.map((p, i) => {
      const name = p.name || `팀${p.team}-${p.slot + 1}`;
      const rankClass = i < 3 ? `rank-${i + 1}` : '';
      return `<tr>
        <td><span class="rank-badge ${rankClass}">${i + 1}</span></td>
        <td class="member-name-cell">${name}</td>
        <td><span class="team-label-cell ${p.team}">팀 ${p.team}</span></td>
        <td>${p.score_quiz || 0}${MAX_SUFFIX}/${CAT_MAX.quiz}</span></td>
        <td>${p.score_needs || 0}${MAX_SUFFIX}/${CAT_MAX.needs}</span></td>
        <td>${p.score_scenario || 0}${MAX_SUFFIX}/${CAT_MAX.scenario}</span></td>
        <td>${p.score_practice || 0}${MAX_SUFFIX}/${CAT_MAX.practice}</span></td>
        <td>${p.score_roleplay || 0}${MAX_SUFFIX}/${CAT_MAX.roleplay}</span></td>
        <td>${p.score_fab || 0}${MAX_SUFFIX}/${CAT_MAX.fab}</span></td>
        <td class="score-total score-count-animated" data-target="${p.total}">${p.total}${MAX_SUFFIX}/${TOTAL_MAX}</span></td>
      </tr>`;
    }).join('');

    applyRowAnimations('individualRankBody');
    animateScores();
  }
}

let scoreUpdateTimer = null;
async function handleScoreChange(id, category, value, inputEl) {
  const score = Math.max(0, parseInt(value) || 0);
  inputEl.value = score;

  clearTimeout(scoreUpdateTimer);
  scoreUpdateTimer = setTimeout(async () => {
    await updateMember(id, { ['score_' + category]: score });
    const members = await fetchMembers();
    const member = members.find(m => m.id === id);
    if (member) {
      const total = CATEGORIES.reduce((sum, c) => sum + (member['score_' + c] || 0), 0);
      const totalEl = document.getElementById(`total-${id}`);
      if (totalEl) totalEl.innerHTML = `${total}${MAX_SUFFIX}/${TOTAL_MAX}</span>`;
    }
  }, 300);
}

// ========== TAB 3: RANKING ==========
function renderRanking(grouped, members) {
  const medals = ['🥇', '🥈', '🥉', '4', '5'];

  const teamStats = TEAMS.map(t => {
    const ms = grouped[t];
    const count = ms.length || 1;
    const avgs = {};
    CATEGORIES.forEach(c => {
      avgs[c] = Math.round(ms.reduce((sum, m) => sum + (m['score_' + c] || 0), 0) / count * 10) / 10;
    });
    avgs.total = Math.round(CATEGORIES.reduce((sum, c) => sum + avgs[c], 0) * 10) / 10;
    const memberNames = ms.filter(m => m.name).map(m => m.name);
    return { key: t, count, memberNames, ...avgs };
  }).sort((a, b) => b.total - a.total);

  const maxScore = Math.max(...teamStats.map(t => t.total), 1);

  document.getElementById('teamRankingCards').innerHTML = teamStats.map((team, i) => {
    const barPct = (team.total / maxScore) * 100;
    return `
      <div style="display:flex; align-items:center; gap:16px; padding:16px 0; border-bottom:1px solid var(--border-light);">
        <div style="font-size:28px; width:40px; text-align:center;">${medals[i]}</div>
        <div style="flex:1;">
          <div style="display:flex; align-items:baseline; gap:10px; margin-bottom:4px;">
            <span style="font-size:16px; font-weight:800; color:var(--text);">팀 ${team.key}</span>
            <span style="font-size:24px; font-weight:900; color:${TEAM_COLORS[team.key]};">${team.total}점</span>
            <span style="font-size:12px; color:var(--text-muted);">1인 평균 · ${team.count}명</span>
          </div>
          <div style="font-size:12px; color:var(--text-muted); margin-bottom:8px;">
            ${team.memberNames.length > 0 ? team.memberNames.join(', ') : '(팀원 미등록)'}
          </div>
          <div style="display:flex; gap:12px; font-size:11px; color:var(--text-tertiary); margin-bottom:8px; flex-wrap:wrap;">
            <span>퀴즈 ${team.quiz}<span style="opacity:0.5">/${CAT_MAX.quiz}</span></span>
            <span>니즈 ${team.needs}<span style="opacity:0.5">/${CAT_MAX.needs}</span></span>
            <span>시나리오 ${team.scenario}<span style="opacity:0.5">/${CAT_MAX.scenario}</span></span>
            <span>질문 ${team.practice}<span style="opacity:0.5">/${CAT_MAX.practice}</span></span>
            <span>롤플레이 ${team.roleplay}<span style="opacity:0.5">/${CAT_MAX.roleplay}</span></span>
            <span>FAB ${team.fab}<span style="opacity:0.5">/${CAT_MAX.fab}</span></span>
          </div>
          <div class="team-score-bar">
            <div class="team-score-fill" style="width:${barPct}%; background:${TEAM_COLORS[team.key]};"></div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // 개인 순위 — 이름 등록된 전원 표시, 6개 활동별 점수
  const allMembers = members
    .filter(m => m.name)
    .map(m => {
      const total = CATEGORIES.reduce((sum, c) => sum + (m['score_' + c] || 0), 0);
      return { ...m, total };
    })
    .sort((a, b) => b.total - a.total);

  document.getElementById('personalRankBody').innerHTML = allMembers.map((p, i) => {
    const rankClass = i < 3 ? `rank-${i + 1}` : '';
    return `
      <tr>
        <td><span class="rank-badge ${rankClass}">${i + 1}</span></td>
        <td class="member-name-cell">${p.name}</td>
        <td><span class="team-label-cell ${p.team_id}">팀 ${p.team_id}</span></td>
        <td>${p.score_quiz || 0}${MAX_SUFFIX}/${CAT_MAX.quiz}</span></td>
        <td>${p.score_needs || 0}${MAX_SUFFIX}/${CAT_MAX.needs}</span></td>
        <td>${p.score_scenario || 0}${MAX_SUFFIX}/${CAT_MAX.scenario}</span></td>
        <td>${p.score_practice || 0}${MAX_SUFFIX}/${CAT_MAX.practice}</span></td>
        <td>${p.score_roleplay || 0}${MAX_SUFFIX}/${CAT_MAX.roleplay}</span></td>
        <td>${p.score_fab || 0}${MAX_SUFFIX}/${CAT_MAX.fab}</span></td>
        <td class="score-total score-count-animated" data-target="${p.total}">${p.total}${MAX_SUFFIX}/${TOTAL_MAX}</span></td>
      </tr>
    `;
  }).join('') || '<tr><td colspan="10" style="text-align:center; color:var(--text-muted); padding:24px;">팀원 이름을 먼저 등록하세요</td></tr>';

  applyRowAnimations('personalRankBody');
  animateScores();
}

// ========== UTILS ==========
function getMembersTotalScore(members) {
  return members.reduce((sum, m) => {
    return sum + CATEGORIES.reduce((s, c) => s + (m['score_' + c] || 0), 0);
  }, 0);
}

async function resetAllScores() {
  if (!confirm('모든 점수를 초기화하시겠습니까? 팀원 이름은 유지됩니다.')) return;
  const members = await fetchMembers();
  for (const m of members) {
    await updateMember(m.id, {
      score_quiz: 0, score_needs: 0, score_scenario: 0,
      score_practice: 0, score_roleplay: 0, score_fab: 0
    });
  }
  loadAndRender('individual');
}

// ========== SURVEY QUESTIONS ==========
const PRE_QUESTIONS = [
  { id: 'pre_1', type: 'scale', text: 'SPIN Selling 방법론에 대해 얼마나 알고 계십니까?' },
  { id: 'pre_2', type: 'scale', text: '현재 영업 상담에서 질문 기법을 얼마나 활용하고 계십니까?' },
  { id: 'pre_3', type: 'scale', text: '고객의 잠재니즈와 현재니즈를 구분할 수 있습니까?' },
  { id: 'pre_4', type: 'scale', text: '영업 상담 전 체계적인 콜플랜을 작성하고 계십니까?' },
  { id: 'pre_5', type: 'scale', text: '고객의 문제를 심화시키는 질문(시사질문)을 활용하고 계십니까?' },
  { id: 'pre_6', type: 'text', text: '현재 영업 활동에서 가장 어려운 점은 무엇입니까?' },
  { id: 'pre_7', type: 'text', text: '이번 교육에서 가장 기대하는 것은 무엇입니까?' },
  { id: 'pre_8', type: 'text', text: '이번 교육을 통해 얻고 싶은 구체적인 역량은 무엇입니까?' }
];

const POST_QUESTIONS = [
  { id: 'post_1', type: 'scale', text: '교육 후 SPIN Selling 방법론에 대한 이해도가 향상되었습니까?' },
  { id: 'post_2', type: 'scale', text: '교육에서 배운 질문 기법을 실전에서 활용할 수 있다고 생각합니까?' },
  { id: 'post_3', type: 'scale', text: '잠재니즈와 현재니즈를 구분하는 능력이 향상되었습니까?' },
  { id: 'post_4', type: 'scale', text: '시사질문(I)과 해결질문(N) 활용에 자신감이 생겼습니까?' },
  { id: 'post_5', type: 'scale', text: '콜플랜 작성의 중요성을 이해하고 활용할 수 있습니까?' },
  { id: 'post_6', type: 'scale', text: '교육 내용의 실무 적용 가능성은 어떻습니까?' },
  { id: 'post_7', type: 'scale', text: '강사의 교육 진행에 대한 전반적인 만족도는?' },
  { id: 'post_8', type: 'scale', text: 'AI 실습 플랫폼 활용에 대한 만족도는?' },
  { id: 'post_9', type: 'text', text: '교육에서 가장 유익했던 내용은 무엇입니까?' },
  { id: 'post_10', type: 'text', text: '교육 개선을 위한 제안 사항이 있으시면 적어주세요.' }
];

async function loadSurveyResults(type, members) {
  const session = getSavedSession();
  if (!session) return;

  const containerId = type === 'pre' ? 'surveyPreResults' : 'surveyPostResults';
  const container = document.getElementById(containerId);
  container.innerHTML = '<div style="text-align:center; padding:20px; color:var(--text-muted);">불러오는 중...</div>';

  const questions = type === 'pre' ? PRE_QUESTIONS : POST_QUESTIONS;
  const totalMembers = members.filter(m => m.name).length;

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/spin_activities?session_id=eq.${session.id}&activity_type=eq.survey_${type}&select=*&order=created_at.desc`,
      { headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` } }
    );
    const logs = await res.json();

    if (!logs || logs.length === 0) {
      container.innerHTML = '<div style="text-align:center; padding:30px; color:var(--text-disabled);">아직 설문 응답이 없습니다.</div>';
      return;
    }

    // 멤버별 최신 응답만 (중복 제출 시 최신 것만)
    const memberAnswers = {};
    logs.forEach(log => {
      if (!memberAnswers[log.member_id]) {
        memberAnswers[log.member_id] = log.activity_data || {};
      }
    });

    const respondentCount = Object.keys(memberAnswers).length;
    const memberMap = {};
    members.forEach(m => { memberMap[m.id] = m; });

    let html = '';

    // 응답률
    html += `<div style="display:flex; gap:16px; margin-bottom:20px; flex-wrap:wrap;">
      <div style="flex:1; min-width:140px; text-align:center; padding:16px; background:var(--pastel-blue); border-radius:12px;">
        <div style="font-size:28px; font-weight:900; color:var(--blue);">${respondentCount} / ${totalMembers}</div>
        <div style="font-size:12px; color:var(--text-muted); margin-top:4px;">응답률 ${totalMembers > 0 ? Math.round((respondentCount / totalMembers) * 100) : 0}%</div>
      </div>
    </div>`;

    // Scale 문항: 평균 + 바 차트 + 개인별 응답
    const scaleQuestions = questions.filter(q => q.type === 'scale');
    const textQuestions = questions.filter(q => q.type === 'text');

    if (scaleQuestions.length > 0) {
      html += '<div style="font-size:15px; font-weight:800; color:var(--text); margin-bottom:12px;">5점 척도 문항</div>';

      scaleQuestions.forEach(q => {
        const scores = [];
        Object.entries(memberAnswers).forEach(([mid, data]) => {
          const val = parseFloat(data[q.id]);
          if (!isNaN(val)) scores.push({ memberId: parseInt(mid), score: val });
        });

        const avg = scores.length > 0 ? (scores.reduce((s, x) => s + x.score, 0) / scores.length).toFixed(1) : '-';
        const avgPct = scores.length > 0 ? (parseFloat(avg) / 5 * 100) : 0;
        const barColor = avgPct >= 80 ? 'var(--green)' : avgPct >= 60 ? 'var(--blue)' : avgPct >= 40 ? 'var(--gold)' : 'var(--accent)';

        html += `<div style="margin-bottom:16px; padding:14px; background:var(--bg); border:1px solid var(--border-light); border-radius:10px;">
          <div style="font-size:13px; font-weight:700; color:var(--text); margin-bottom:8px;">${q.text}</div>
          <div style="display:flex; align-items:center; gap:12px; margin-bottom:8px;">
            <div style="flex:1; height:24px; background:var(--border-light); border-radius:12px; overflow:hidden;">
              <div style="height:100%; width:${avgPct}%; background:${barColor}; border-radius:12px; display:flex; align-items:center; justify-content:flex-end; padding-right:8px; font-size:11px; color:white; font-weight:700; min-width:${avgPct > 0 ? '40px' : '0'};">${avg !== '-' ? avg : ''}</div>
            </div>
            <div style="font-size:18px; font-weight:900; color:${barColor}; min-width:50px; text-align:right;">${avg} / 5</div>
          </div>
          <div style="display:flex; flex-wrap:wrap; gap:6px;">
            ${scores.map(s => {
              const m = memberMap[s.memberId];
              const name = m ? m.name : '(알수없음)';
              return `<span style="font-size:11px; padding:3px 8px; background:var(--card); border:1px solid var(--border-light); border-radius:6px;">${name}: <strong>${s.score}</strong></span>`;
            }).join('')}
          </div>
        </div>`;
      });
    }

    // Text 문항: 답변 목록
    if (textQuestions.length > 0) {
      html += '<div style="font-size:15px; font-weight:800; color:var(--text); margin:20px 0 12px;">서술형 문항</div>';

      textQuestions.forEach(q => {
        const answers = [];
        Object.entries(memberAnswers).forEach(([mid, data]) => {
          const val = data[q.id];
          if (val && val.trim()) answers.push({ memberId: parseInt(mid), text: val.trim() });
        });

        html += `<div style="margin-bottom:16px; padding:14px; background:var(--bg); border:1px solid var(--border-light); border-radius:10px;">
          <div style="font-size:13px; font-weight:700; color:var(--text); margin-bottom:10px;">${q.text} <span style="font-size:11px; color:var(--text-muted);">(${answers.length}건)</span></div>`;

        if (answers.length === 0) {
          html += '<div style="font-size:12px; color:var(--text-disabled); padding:8px 0;">응답 없음</div>';
        } else {
          answers.forEach(a => {
            const m = memberMap[a.memberId];
            const name = m ? m.name : '(알수없음)';
            const team = m ? m.team_id : '';
            html += `<div style="display:flex; gap:8px; padding:8px 12px; background:var(--card); border:1px solid var(--border-light); border-radius:8px; margin-bottom:4px; align-items:flex-start;">
              <span style="flex:none; font-size:11px; font-weight:700; color:var(--blue); min-width:60px;">${name}${team ? ' (팀' + team + ')' : ''}</span>
              <span style="font-size:12px; color:var(--text-secondary); line-height:1.5;">${a.text}</span>
            </div>`;
          });
        }

        html += '</div>';
      });
    }

    container.innerHTML = html;
  } catch (err) {
    console.error('Survey load error:', err);
    container.innerHTML = '<div style="text-align:center; padding:20px; color:var(--accent);">설문 결과를 불러오는 중 오류가 발생했습니다.</div>';
  }
}

// ========== LEADERBOARD ANIMATIONS ==========
function animateScores() {
  document.querySelectorAll('.score-count-animated').forEach(el => {
    const target = parseInt(el.dataset.target || el.textContent);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 20));
    const interval = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(interval); }
      el.textContent = current;
    }, 30);
  });
}

function applyRowAnimations(tbodyId) {
  const tbody = document.getElementById(tbodyId);
  if (!tbody) return;
  tbody.querySelectorAll('tr:not(.sb-summary-row)').forEach(tr => {
    tr.classList.add('score-row-animated');
  });
  tbody.querySelectorAll('.rank-badge').forEach(badge => {
    badge.classList.add('rank-badge-animated');
  });
  // 1위 행에 골드 글로우
  const firstRow = tbody.querySelector('tr:first-child');
  if (firstRow) firstRow.classList.add('rank-1-glow');
}

// ========== AUTO REFRESH (30초 토글) ==========
let autoRefreshInterval = null;
function toggleAutoRefresh(btn) {
  if (autoRefreshInterval) {
    clearInterval(autoRefreshInterval);
    autoRefreshInterval = null;
    btn.textContent = '▶ 자동 새로고침 (30초)';
  } else {
    autoRefreshInterval = setInterval(() => location.reload(), 30000);
    btn.textContent = '⏸ 새로고침 중지';
  }
}

// ========== AUTO REFRESH (10초 탭 갱신) ==========
function startAutoRefresh() {
  setInterval(async () => {
    const activeTab = document.querySelector('.sb-tab.active');
    if (!activeTab) return;
    const idx = [...document.querySelectorAll('.sb-tab')].indexOf(activeTab);
    const tab = ['team', 'individual', 'ranking', 'surveyPre', 'surveyPost'][idx];
    if (document.activeElement && document.activeElement.classList.contains('score-cell-input')) return;
    if (document.activeElement && document.activeElement.classList.contains('sb-member-input')) return;
    await loadAndRender(tab);
  }, 10000);
}

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    loadAndRender('team');
    startAutoRefresh();
  }, 100);
});
