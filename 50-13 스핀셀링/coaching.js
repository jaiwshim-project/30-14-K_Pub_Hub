// ========== COACHING FUNCTIONS ==========
function updateCoaching() {
  const { S, P, I, N } = state.spinCounts;
  document.getElementById('statS').textContent = S;
  document.getElementById('statP').textContent = P;
  document.getElementById('statI').textContent = I;
  document.getElementById('statN').textContent = N;

  const total = S + P + I + N;
  const barChart = document.getElementById('spinBarChart');

  if (total > 0) {
    const pctS = Math.round((S / total) * 100);
    const pctP = Math.round((P / total) * 100);
    const pctI = Math.round((I / total) * 100);
    const pctN = Math.round((N / total) * 100);

    barChart.innerHTML = `
      <div style="margin-bottom:10px;">
        <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
          <span style="font-size:12px; color:var(--blue); font-weight:600;">S 상황 (${pctS}%)</span>
          <span style="font-size:12px; color:var(--text-muted);">${S}회</span>
        </div>
        <div style="height:12px; background:var(--border-light); border-radius:6px; overflow:hidden;">
          <div style="height:100%; width:${pctS}%; background:var(--blue); border-radius:6px; transition:width 0.5s;"></div>
        </div>
      </div>
      <div style="margin-bottom:10px;">
        <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
          <span style="font-size:12px; color:var(--text-error); font-weight:600;">P 문제 (${pctP}%)</span>
          <span style="font-size:12px; color:var(--text-muted);">${P}회</span>
        </div>
        <div style="height:12px; background:var(--border-light); border-radius:6px; overflow:hidden;">
          <div style="height:100%; width:${pctP}%; background:var(--accent); border-radius:6px; transition:width 0.5s;"></div>
        </div>
      </div>
      <div style="margin-bottom:10px;">
        <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
          <span style="font-size:12px; color:var(--purple); font-weight:600;">I 시사 (${pctI}%)</span>
          <span style="font-size:12px; color:var(--text-muted);">${I}회</span>
        </div>
        <div style="height:12px; background:var(--border-light); border-radius:6px; overflow:hidden;">
          <div style="height:100%; width:${pctI}%; background:var(--purple); border-radius:6px; transition:width 0.5s;"></div>
        </div>
      </div>
      <div style="margin-bottom:10px;">
        <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
          <span style="font-size:12px; color:var(--gold); font-weight:600;">N 해결 (${pctN}%)</span>
          <span style="font-size:12px; color:var(--text-muted);">${N}회</span>
        </div>
        <div style="height:12px; background:var(--border-light); border-radius:6px; overflow:hidden;">
          <div style="height:100%; width:${pctN}%; background:var(--gold); border-radius:6px; transition:width 0.5s;"></div>
        </div>
      </div>
    `;

    const advice = document.getElementById('coachingAdvice');
    let tips = [];

    if (S > total * 0.4) tips.push('상황질문(S) 비율이 높습니다. 고객이 심문받는 느낌을 받을 수 있습니다. 꼭 필요한 상황질문만 하세요.');
    if (P < total * 0.15) tips.push('문제질문(P)이 부족합니다. 고객의 문제와 어려움을 더 탐색해보세요.');
    if (I < total * 0.15) tips.push('시사질문(I)이 부족합니다. 문제의 영향과 파급효과를 탐색하는 것이 잠재니즈→현재니즈 전환의 핵심입니다.');
    if (N < total * 0.1 && total >= 5) tips.push('해결질문(N)을 더 활용하세요. "만약 ~한다면" 형태로 해결책의 가치를 고객이 스스로 말하게 하세요.');
    if (tips.length === 0) tips.push('SPIN 질문을 균형있게 활용하고 있습니다. 특히 시사질문(I)과 해결질문(N)의 비율을 유지하세요.');

    advice.innerHTML = `<div class="ai-label">🤖 AI 코치</div>${tips.map(t => `<p style="margin:6px 0;">• ${t}</p>`).join('')}`;
  }

  const logDiv = document.getElementById('activityLog');
  logDiv.innerHTML = state.activities.slice(-10).reverse().map(a =>
    `<p style="padding:4px 0; border-bottom:1px solid var(--border-light);">• ${a}</p>`
  ).join('');
}

// Auto-init
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => updateCoaching(), 100);
});
