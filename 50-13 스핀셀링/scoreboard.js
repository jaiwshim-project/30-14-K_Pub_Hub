// Supabase config (SUPABASE_URL, SUPABASE_KEY, SB_HEADERS) is in common.js
// ========== CONSTANTS ==========
const TEAMS = ['A', 'B', 'C', 'D', 'E'];
const TEAM_COLORS = { A: 'var(--accent)', B: 'var(--blue)', C: 'var(--green)', D: 'var(--gold)', E: 'var(--purple)' };
const CATEGORIES = ['quiz', 'needs', 'scenario', 'practice', 'roleplay', 'fab'];
const CAT_LABELS = { quiz: '퀴즈', needs: '니즈구분', scenario: '시나리오', practice: '질문연습', roleplay: '롤플레이', fab: 'FAB' };

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

  const tabs = document.querySelectorAll('.sb-tab');
  if (tab === 'team') tabs[0].classList.add('active');
  if (tab === 'individual') tabs[1].classList.add('active');
  if (tab === 'ranking') tabs[2].classList.add('active');

  loadAndRender(tab);
}

async function loadAndRender(tab) {
  const members = await fetchMembers();
  const grouped = groupByTeam(members);

  if (tab === 'team') renderTeamSetup(grouped, members);
  else if (tab === 'individual') renderIndividualScores(grouped);
  else if (tab === 'ranking') renderRanking(grouped, members);
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
    const totals = {};
    CATEGORIES.forEach(c => {
      totals[c] = members.reduce((sum, m) => sum + (m['score_' + c] || 0), 0);
    });
    totals.total = CATEGORIES.reduce((sum, c) => sum + totals[c], 0);
    return { key: t, ...totals };
  }).sort((a, b) => b.total - a.total);

  // 팀별 등록 인원 수로 만점 계산 (인원 x 6카테고리 x 100점)
  const teamMemberCounts = {};
  TEAMS.forEach(t => {
    teamMemberCounts[t] = grouped[t] ? grouped[t].filter(m => m.name).length : 0;
  });

  tbody.innerHTML = teamStats.map((team, i) => {
    const rankClass = i < 3 ? `rank-${i + 1}` : '';
    const memberCount = teamMemberCounts[team.key] || 1;
    const maxPerPerson = 600; // 6 카테고리 x 100점
    const teamMax = memberCount * maxPerPerson;
    return `
      <tr>
        <td><span class="rank-badge ${rankClass}">${i + 1}</span></td>
        <td style="font-weight:600;"><span class="team-label-cell ${team.key}">팀 ${team.key}</span></td>
        <td>${team.quiz}</td>
        <td>${team.needs}</td>
        <td>${team.scenario}</td>
        <td>${team.practice}</td>
        <td>${team.roleplay}</td>
        <td>${team.fab}</td>
        <td class="score-total">${team.total}</td>
        <td style="min-width:80px; font-weight:700; color:var(--blue);">${team.total} / ${teamMax}</td>
      </tr>
    `;
  }).join('');
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
            onchange="handleScoreChange(${m.id}, '${c}', this.value, this)"></td>
        `).join('')}
        <td class="score-total" id="total-${m.id}">${total}</td>
      </tr>`;
    });

    // Team subtotal
    const teamTotals = {};
    CATEGORIES.forEach(c => {
      teamTotals[c] = members.reduce((sum, m) => sum + (m['score_' + c] || 0), 0);
    });
    const grandTotal = CATEGORIES.reduce((sum, c) => sum + teamTotals[c], 0);

    html += `<tr class="sb-summary-row">
      <td style="text-align:left; padding-left:16px;">팀 ${t} 소계</td>
      <td></td>
      ${CATEGORIES.map(c => `<td>${teamTotals[c]}</td>`).join('')}
      <td class="score-total">${grandTotal}</td>
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
        <td>${p.score_quiz || 0}</td>
        <td>${p.score_needs || 0}</td>
        <td>${p.score_scenario || 0}</td>
        <td>${p.score_practice || 0}</td>
        <td>${p.score_roleplay || 0}</td>
        <td>${p.score_fab || 0}</td>
        <td class="score-total">${p.total}</td>
      </tr>`;
    }).join('');
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
      if (totalEl) totalEl.textContent = total;
    }
  }, 300);
}

// ========== TAB 3: RANKING ==========
function renderRanking(grouped, members) {
  const medals = ['🥇', '🥈', '🥉', '4', '5'];

  const teamStats = TEAMS.map(t => {
    const ms = grouped[t];
    const totals = {};
    CATEGORIES.forEach(c => {
      totals[c] = ms.reduce((sum, m) => sum + (m['score_' + c] || 0), 0);
    });
    totals.total = CATEGORIES.reduce((sum, c) => sum + totals[c], 0);
    const memberNames = ms.filter(m => m.name).map(m => m.name);
    return { key: t, memberNames, ...totals };
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
          </div>
          <div style="font-size:12px; color:var(--text-muted); margin-bottom:8px;">
            ${team.memberNames.length > 0 ? team.memberNames.join(', ') : '(팀원 미등록)'}
          </div>
          <div style="display:flex; gap:12px; font-size:11px; color:var(--text-tertiary); margin-bottom:8px;">
            <span>퀴즈 ${team.quiz}</span>
            <span>니즈 ${team.needs}</span>
            <span>시나리오 ${team.scenario}</span>
            <span>질문 ${team.practice}</span>
            <span>롤플레이 ${team.roleplay}</span>
            <span>FAB ${team.fab}</span>
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
        <td>${p.score_quiz || 0}</td>
        <td>${p.score_needs || 0}</td>
        <td>${p.score_scenario || 0}</td>
        <td>${p.score_practice || 0}</td>
        <td>${p.score_roleplay || 0}</td>
        <td>${p.score_fab || 0}</td>
        <td class="score-total">${p.total}</td>
      </tr>
    `;
  }).join('') || '<tr><td colspan="10" style="text-align:center; color:var(--text-muted); padding:24px;">팀원 이름을 먼저 등록하세요</td></tr>';
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

// ========== AUTO REFRESH ==========
function startAutoRefresh() {
  setInterval(async () => {
    const activeTab = document.querySelector('.sb-tab.active');
    if (!activeTab) return;
    const idx = [...document.querySelectorAll('.sb-tab')].indexOf(activeTab);
    const tab = ['team', 'individual', 'ranking'][idx];
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
