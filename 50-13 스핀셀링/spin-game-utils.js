// ========== SPIN 게임 공용 유틸리티 ==========
// 게임 점수를 Supabase spin_activities에 저장하고, 리더보드를 조회하는 헬퍼

// 게임 점수 저장
async function saveGameScore(gameType, gameName, score, detail) {
  if (typeof getSavedSession !== 'function') return;
  const session = getSavedSession();
  const user = (typeof getSavedUser === 'function') ? getSavedUser() : null;
  if (!session || !user || !user.id) return;

  try {
    const res = await fetch(SUPABASE_URL + '/rest/v1/spin_activities', {
      method: 'POST',
      headers: SB_HEADERS,
      body: JSON.stringify({
        session_id: session.id,
        member_id: user.id,
        activity_type: 'game_' + gameType,
        activity_data: JSON.stringify({
          game: gameName,
          team: user.team_id || null,
          name: user.name || '익명',
          detail: detail || {},
          ts: new Date().toISOString()
        }),
        score: score
      })
    });
    if (!res.ok) {
      console.error('saveGameScore INSERT failed:', res.status);
      return;
    }

    // 교육생 본인 점수에도 누적
    const r = await fetch(SUPABASE_URL + '/rest/v1/spin_members?id=eq.' + user.id + '&select=score_quiz', {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
    });
    const rows = await r.json();
    if (rows && rows[0]) {
      const newScore = (rows[0].score_quiz || 0) + Math.round(score / 5);
      await fetch(SUPABASE_URL + '/rest/v1/spin_members?id=eq.' + user.id, {
        method: 'PATCH',
        headers: SB_HEADERS,
        body: JSON.stringify({ score_quiz: Math.min(newScore, 80), updated_at: new Date().toISOString() })
      });
    }
  } catch(e) { console.error('saveGameScore exception:', e); }
}

// 게임별 Top 10 리더보드 조회
async function fetchGameLeaderboard(gameType, limit) {
  if (typeof getSavedSession !== 'function') return [];
  const session = getSavedSession();
  if (!session) return [];

  try {
    const select = '&select=*,spin_members(name,team_id)';
    const url = gameType
      ? SUPABASE_URL + '/rest/v1/spin_activities?session_id=eq.' + session.id + '&activity_type=eq.game_' + gameType + select + '&order=score.desc&limit=' + (limit || 10)
      : SUPABASE_URL + '/rest/v1/spin_activities?session_id=eq.' + session.id + '&activity_type=like.game_*' + select + '&order=score.desc&limit=' + (limit || 10);
    const res = await fetch(url, { headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY } });
    const rows = await res.json();
    if (!Array.isArray(rows)) return [];
    // member_name 호환 필드 추가
    return rows.map(r => ({
      ...r,
      member_name: (r.spin_members && r.spin_members.name) || (function(){
        try { return JSON.parse(r.activity_data || '{}').name; } catch(e) { return '익명'; }
      })()
    }));
  } catch(e) { console.error(e); return []; }
}

// 팀별 게임 점수 합산
async function fetchTeamGameScores() {
  if (typeof getSavedSession !== 'function') return {};
  const session = getSavedSession();
  if (!session) return {};

  try {
    const res = await fetch(
      SUPABASE_URL + '/rest/v1/spin_activities?session_id=eq.' + session.id + '&activity_type=like.game_*&select=score,activity_data,spin_members(team_id)',
      { headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY } }
    );
    const rows = await res.json();
    const teams = { A: 0, B: 0, C: 0, D: 0, E: 0 };
    if (!Array.isArray(rows)) return teams;
    rows.forEach(r => {
      let team = r.spin_members && r.spin_members.team_id;
      if (!team) {
        try { team = JSON.parse(r.activity_data || '{}').team; } catch(e) {}
      }
      if (team && teams[team] !== undefined) teams[team] += r.score || 0;
    });
    return teams;
  } catch(e) { return {}; }
}

window.saveGameScore = saveGameScore;
window.fetchGameLeaderboard = fetchGameLeaderboard;
window.fetchTeamGameScores = fetchTeamGameScores;
