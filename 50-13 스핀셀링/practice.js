// ========== PRACTICE CONTEXTS ==========
const practiceContexts = [
  {
    title: "제조업 시나리오",
    text: "<strong>상황:</strong> 당신은 기업용 솔루션 영업사원입니다. 고객사(중견 제조업체)의 생산관리 담당 이사를 만났습니다. 고객은 현재 수작업으로 생산 스케줄을 관리하고 있으며, 최근 납기 지연 문제가 발생하고 있다고 합니다."
  },
  {
    title: "IT 서비스 시나리오",
    text: "<strong>상황:</strong> 당신은 클라우드 서비스 영업사원입니다. 고객사(200명 규모 IT기업)의 CTO를 만났습니다. 고객은 자체 서버를 운영 중이며, 최근 서버 다운타임이 증가하여 서비스 안정성에 불안을 느끼고 있습니다."
  },
  {
    title: "금융 시나리오",
    text: "<strong>상황:</strong> 당신은 리스크 관리 솔루션 영업사원입니다. 고객사(중견 증권사)의 리스크 관리팀장을 만났습니다. 최근 규제 강화로 인해 리포팅 업무가 급증했고, 수작업 리포팅에 따른 오류 위험을 걱정하고 있습니다."
  },
  {
    title: "병원 시나리오",
    text: "<strong>상황:</strong> 당신은 의료 정보 시스템 영업사원입니다. 고객사(300병상 규모 종합병원)의 행정부원장을 만났습니다. 현재 진료 예약 시스템이 노후화되어 환자 대기 시간이 길고, 의료진 스케줄 관리에 어려움을 겪고 있습니다."
  }
];

// ========== PRACTICE FUNCTIONS ==========
function changePracticeContext(idx) {
  document.getElementById('practiceContext').innerHTML = practiceContexts[idx].text;
}

function selectSpinType(type) {
  state.selectedSpinType = type;
  document.querySelectorAll('.spin-type-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`.spin-type-btn.${type}`).classList.add('active');
}

function submitPracticeQuestion() {
  const input = document.getElementById('practiceInput');
  const question = input.value.trim();
  if (!question) { alert('질문을 입력하세요.'); return; }

  const type = state.selectedSpinType;
  state.spinCounts[type]++;

  const feedback = generateQuestionFeedback(question, type);

  const feedbackDiv = document.getElementById('practiceFeedback');
  feedbackDiv.style.display = 'block';
  feedbackDiv.innerHTML = `
    <div class="ai-label">🤖 AI 평가 - <span class="spin-tag ${type}">${type}</span> ${getTypeName(type)}</div>
    ${feedback}
  `;

  state.practiceHistory.push({ question, type, timestamp: new Date() });
  updatePracticeHistory();

  addScore(8, 'practice');
  addActivity(`질문 연습(${type}): "${question.substring(0, 30)}..."`);

  input.value = '';
}

function generateQuestionFeedback(question, type) {
  const hasQuestion = question.includes('?') || question.includes('까') || question.includes('니까') || question.includes('습니까');

  let feedback = '';

  if (!hasQuestion) {
    feedback += '<p style="color:var(--text-error); margin-bottom:8px;">⚠️ 질문 형태가 아닙니다. 고객에게 묻는 형태로 작성하세요.</p>';
  }

  const typeGuide = {
    S: {
      good: ['현재', '몇', '어떤', '사용', '운영', '규모', '시스템', '프로세스', '방법'],
      tip: '상황질문은 고객의 현재 상태, 배경, 사실을 파악합니다. 너무 많이 사용하면 고객이 심문받는 느낌을 받을 수 있으므로 꼭 필요한 것만 물으세요.',
      example: '"현재 어떤 방식으로 관리하고 계십니까?"'
    },
    P: {
      good: ['문제', '어려움', '불편', '불만', '걱정', '힘든', '어렵', '안되', '못하'],
      tip: '문제질문은 고객의 문제, 어려움, 불만족을 탐색합니다. 잠재니즈를 끌어내는 핵심 질문입니다.',
      example: '"그 부분에서 어려움을 겪고 계시지 않습니까?"'
    },
    I: {
      good: ['영향', '결과', '미치', '때문에', '그로 인해', '이어지', '파급', '비용', '손실', '다른'],
      tip: '시사질문은 문제의 영향과 파급효과를 탐색합니다. 잠재니즈를 현재니즈로 전환하는 가장 강력한 도구입니다.',
      example: '"그 문제로 인해 다른 부서에도 영향이 있지 않습니까?"'
    },
    N: {
      good: ['해결', '도움', '가능', '효과', '만약', '개선', '가치', '좋겠', '원하'],
      tip: '해결질문은 해결책의 가치를 고객이 스스로 말하게 합니다. "만약 ~한다면" 형태가 효과적입니다.',
      example: '"만약 이 문제가 해결된다면 어떤 도움이 되겠습니까?"'
    }
  };

  const guide = typeGuide[type];
  const matchCount = guide.good.filter(kw => question.includes(kw)).length;

  if (matchCount >= 2) {
    feedback += `<p style="color:var(--green);">✅ 좋은 ${getTypeName(type)}입니다! 핵심 키워드가 잘 포함되어 있습니다.</p>`;
  } else if (matchCount === 1) {
    feedback += `<p style="color:var(--gold);">⚡ 괜찮은 질문이지만, ${getTypeName(type)}의 특성을 더 강화할 수 있습니다.</p>`;
  } else {
    feedback += `<p style="color:var(--accent);">💡 이 질문이 ${getTypeName(type)}에 적합한지 다시 확인해보세요.</p>`;
  }

  feedback += `<p style="margin-top:8px; font-size:13px;"><strong>팁:</strong> ${guide.tip}</p>`;
  feedback += `<p style="margin-top:4px; font-size:13px;"><strong>예시:</strong> ${guide.example}</p>`;

  return feedback;
}

function showExampleQuestions() {
  const examples = {
    S: [
      "현재 어떤 시스템을 사용하고 계십니까?",
      "직원 수는 몇 명 정도 되십니까?",
      "연간 매출 규모는 어느 정도입니까?"
    ],
    P: [
      "그 부분에서 어려움은 없으십니까?",
      "현재 프로세스에서 가장 불편한 점은 무엇입니까?",
      "오류가 발생하는 빈도는 어떻습니까?"
    ],
    I: [
      "그 문제로 인해 다른 부서에도 영향이 있지 않습니까?",
      "그런 지연이 계속되면 고객 이탈로 이어지지 않겠습니까?",
      "연간으로 환산하면 비용이 얼마나 됩니까?"
    ],
    N: [
      "만약 이 문제가 해결된다면 어떤 도움이 되겠습니까?",
      "처리 시간이 50% 단축된다면 어떤 효과가 있겠습니까?",
      "실시간 데이터를 볼 수 있다면 의사결정에 도움이 되시겠습니까?"
    ]
  };

  const type = state.selectedSpinType;
  const feedbackDiv = document.getElementById('practiceFeedback');
  feedbackDiv.style.display = 'block';
  feedbackDiv.innerHTML = `
    <div class="ai-label">💡 ${getTypeName(type)} 예시</div>
    ${examples[type].map(e => `<p style="margin:6px 0; padding:8px; background:rgba(255,255,255,0.04); border-radius:8px;">• ${e}</p>`).join('')}
  `;
}

function updatePracticeHistory() {
  const div = document.getElementById('practiceHistory');
  const recent = state.practiceHistory.slice(-5).reverse();

  if (recent.length === 0) return;

  div.innerHTML = '<div style="font-size:13px; font-weight:600; margin-bottom:8px; color:var(--text-muted);">최근 연습 이력</div>';
  recent.forEach(item => {
    div.innerHTML += `
      <div style="padding:8px 12px; background:rgba(255,255,255,0.03); border-radius:8px; margin-bottom:6px; font-size:13px; display:flex; align-items:center; gap:8px;">
        <span class="spin-tag ${item.type}">${item.type}</span>
        <span style="color:var(--text-muted);">${item.question}</span>
      </div>
    `;
  });
}
