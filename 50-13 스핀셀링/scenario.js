// ========== SCENARIO DATA ==========
const scenarios = [
  {
    title: "Riprock Rooftops - 태양광 패널",
    lines: [
      { num: 1, speaker: "판매", text: "현재 건물의 지붕 상태는 어떻습니까?", type: "S" },
      { num: 2, speaker: "판매", text: "에너지 비용 관련해서 어려운 점이 있으십니까?", type: "P" },
      { num: 3, speaker: "판매", text: "전기료가 계속 오르면 수익성에 어떤 영향이 있겠습니까?", type: "I" },
      { num: 4, speaker: "판매", text: "현재 건물에 몇 세대가 입주해 있습니까?", type: "S" },
      { num: 5, speaker: "판매", text: "입주민들이 에너지 효율에 대해 요구하는 것이 있습니까?", type: "P" },
      { num: 6, speaker: "판매", text: "에너지 비용이 높아지면 입주율에도 영향이 있지 않겠습니까?", type: "I" },
      { num: 7, speaker: "판매", text: "만약 에너지 비용을 30% 절감할 수 있다면, 경쟁력에 어떤 도움이 되겠습니까?", type: "N" },
      { num: 8, speaker: "판매", text: "친환경 건물 인증에 관심이 있으십니까?", type: "S" },
      { num: 9, speaker: "판매", text: "인증이 없어서 놓치는 기회가 있습니까?", type: "P" },
      { num: 10, speaker: "판매", text: "친환경 인증을 통한 건물 가치 상승이 도움이 되시겠습니까?", type: "N" }
    ]
  },
  {
    title: "IT 솔루션 영업 - ERP 도입",
    lines: [
      { num: 1, speaker: "판매", text: "현재 어떤 시스템으로 업무를 관리하고 계십니까?", type: "S" },
      { num: 2, speaker: "판매", text: "직원 수는 몇 명 정도 되십니까?", type: "S" },
      { num: 3, speaker: "판매", text: "현재 시스템에서 가장 불편한 점은 무엇입니까?", type: "P" },
      { num: 4, speaker: "판매", text: "부서 간 데이터 연동이 안 되면 어떤 문제가 생기고 있습니까?", type: "P" },
      { num: 5, speaker: "판매", text: "그로 인해 의사결정이 지연되는 경우가 있지 않습니까?", type: "I" },
      { num: 6, speaker: "판매", text: "의사결정 지연이 매출에 미치는 영향은 어느 정도라고 보십니까?", type: "I" },
      { num: 7, speaker: "판매", text: "통합 시스템으로 실시간 데이터를 볼 수 있다면 어떤 도움이 되겠습니까?", type: "N" },
      { num: 8, speaker: "판매", text: "데이터 입력 오류는 얼마나 자주 발생합니까?", type: "P" },
      { num: 9, speaker: "판매", text: "오류 수정에 드는 시간과 비용은 어느 정도입니까?", type: "I" },
      { num: 10, speaker: "판매", text: "자동화를 통해 오류를 90% 줄일 수 있다면, 그 효과가 어떻겠습니까?", type: "N" }
    ]
  }
];

// ========== SCENARIO FUNCTIONS ==========
function loadScenario(idx) {
  const scenario = scenarios[idx];
  const container = document.getElementById('scenarioContent');

  document.querySelectorAll('#sec-scenario .btn-sm, .main .btn-sm').forEach((b, i) => {
    b.classList.toggle('active', i === idx);
  });

  let html = `<h3 style="margin-bottom:12px;">${scenario.title}</h3>`;
  html += '<div class="scenario-dialogue">';

  scenario.lines.forEach((line, i) => {
    html += `
      <div class="dialogue-line" id="scenarioLine${i}">
        <div class="dialogue-num">${line.num}</div>
        <span class="dialogue-speaker">${line.speaker}:</span>
        <div style="flex:1;">
          <span>${line.text}</span>
          <div class="spin-classify-btns" data-answer="${line.type}" data-idx="${i}">
            <button class="spin-btn S" onclick="classifyLine(${i},'S')">S</button>
            <button class="spin-btn P" onclick="classifyLine(${i},'P')">P</button>
            <button class="spin-btn I" onclick="classifyLine(${i},'I')">I</button>
            <button class="spin-btn N" onclick="classifyLine(${i},'N')">N</button>
          </div>
        </div>
      </div>
    `;
  });

  html += '</div>';
  container.innerHTML = html;
  state.currentScenarioIdx = idx;
}

function classifyLine(idx, type) {
  const btns = document.querySelector(`[data-idx="${idx}"]`);
  btns.querySelectorAll('.spin-btn').forEach(b => b.classList.remove('active'));
  btns.querySelector(`.spin-btn.${type}`).classList.add('active');
  btns.dataset.selected = type;
}

function checkScenarioAnswers() {
  let correct = 0;
  let total = 0;

  document.querySelectorAll('.spin-classify-btns').forEach(group => {
    const answer = group.dataset.answer;
    const selected = group.dataset.selected;
    total++;

    group.querySelectorAll('.spin-btn').forEach(btn => btn.style.opacity = '0.4');

    if (selected === answer) {
      correct++;
      group.querySelector(`.spin-btn.${answer}`).style.opacity = '1';
      group.querySelector(`.spin-btn.${answer}`).style.boxShadow = '0 0 12px rgba(39,174,96,0.5)';
    } else {
      if (selected) {
        group.querySelector(`.spin-btn.${selected}`).style.opacity = '1';
        group.querySelector(`.spin-btn.${selected}`).style.background = 'rgba(231,76,60,0.3)';
      }
      group.querySelector(`.spin-btn.${answer}`).style.opacity = '1';
      group.querySelector(`.spin-btn.${answer}`).classList.add('active');
    }
  });

  if (correct > 0) addScore(correct * 5, 'scenario');
  addActivity(`시나리오 분석: ${correct}/${total}`);
  alert(`${total}문제 중 ${correct}문제 정답! (+${correct * 5}점)`);
}

function resetScenario() {
  loadScenario(state.currentScenarioIdx || 0);
}

// Auto-init
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => loadScenario(0), 100);
});
