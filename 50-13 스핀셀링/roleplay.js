// ========== ROLEPLAY SCENARIOS ==========
const roleplayScenarios = {
  riprock: {
    name: "Riprock Rooftops 담당자",
    context: "태양광 에너지 솔루션 고객. 83개동 관리, 에너지 비용 상승 중, 친환경 관심 있음",
    responses: [
      "네, 현재 83개 건물을 관리하고 있습니다. 대부분 10년 이상 된 건물이죠.",
      "솔직히 에너지 비용이 매년 올라서 고민이긴 합니다. 작년 대비 15%나 올랐거든요.",
      "입주민들이 에너지 효율에 대해 물어보는 경우가 늘고 있어요. 친환경 트렌드 때문인 것 같습니다.",
      "지붕 상태는 대체로 괜찮습니다만, 일부 건물은 보수가 필요한 상태입니다.",
      "경쟁 건물들이 태양광을 설치하기 시작해서 우리도 고려는 하고 있었습니다.",
      "비용 절감도 중요하지만, 초기 투자 비용이 걱정됩니다.",
      "입주율은 현재 92% 정도인데, 이게 떨어지면 큰 문제죠.",
      "환경 규제도 점점 강해지고 있어서 대비가 필요하긴 합니다.",
      "그 정도 효과가 있다면 확실히 관심이 있습니다. 좀 더 자세히 알고 싶네요.",
      "ROI가 3년 이내라면 검토해볼 의향이 있습니다."
    ]
  },
  manufacturing: {
    name: "중견 제조업체 생산관리 이사",
    context: "월 생산량 5만개, 수작업 스케줄링, 납기 지연 발생 중",
    responses: [
      "현재 엑셀로 생산 스케줄을 관리하고 있습니다. 20년 넘게 이렇게 해왔죠.",
      "생산라인이 3개이고, 직원은 약 150명입니다.",
      "납기 지연이 최근 3개월간 5건이나 발생했어요. 고객 클레임이 많아지고 있습니다.",
      "사실 가장 큰 문제는 갑작스러운 주문 변경에 대응하기 어렵다는 거예요.",
      "불량률도 조금씩 올라가고 있어서 걱정입니다.",
      "품질 관리도 수작업이라 추적이 잘 안 되는 부분이 있습니다.",
      "그런 문제가 반복되면 주요 거래처를 잃을 수도 있다는 걱정이 있습니다.",
      "생산 데이터를 실시간으로 볼 수 있다면 정말 도움이 되겠죠.",
      "비용 문제가 있어서... 투자 대비 효과가 명확해야 경영진을 설득할 수 있습니다.",
      "구체적인 도입 사례가 있으면 들어보고 싶습니다."
    ]
  },
  shopnsave: {
    name: "Shop N Save 구매담당 부장",
    context: "62개 매장 운영, 재고 관리 문제, 폐기 손실 발생 중",
    responses: [
      "전국에 62개 매장을 운영하고 있습니다. 각 매장별로 재고 관리를 하고 있죠.",
      "현재 재고 시스템이 좀 오래되어서 정확도가 떨어지는 편입니다.",
      "식품 폐기율이 5%를 넘어서 손실이 꽤 큽니다.",
      "매장별로 재고 현황이 달라서 본사에서 파악하기가 어렵습니다.",
      "인기 상품이 품절되는 경우가 종종 있어서 매출 기회를 놓치기도 합니다.",
      "물류비용도 비효율적으로 발생하는 부분이 있습니다.",
      "그런 비효율이 연간으로 따지면 상당한 금액이 되겠죠.",
      "실시간 재고 관리가 되면 좋겠다는 생각은 항상 하고 있었습니다.",
      "매장 직원들이 새 시스템을 잘 쓸 수 있을지도 걱정이에요.",
      "단계적으로 도입할 수 있다면 리스크를 줄일 수 있겠네요."
    ]
  }
};

// ========== ROLEPLAY FUNCTIONS ==========
function startRoleplay(type) {
  const scenario = roleplayScenarios[type];
  state.roleplayScenario = scenario;
  state.roleplayMessages = [];
  state.roleplayTurnCount = 0;

  const container = document.getElementById('chatContainer');
  container.innerHTML = '';

  addChatMessage('ai', `안녕하세요, ${scenario.name}입니다. 무엇을 도와드릴까요?`);
  document.getElementById('roleplayAnalysis').style.display = 'none';
}

function sendChat() {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (!msg || !state.roleplayScenario) return;

  addChatMessage('user', msg);
  input.value = '';

  state.roleplayTurnCount++;

  const qType = classifyQuestion(msg);
  if (qType) state.spinCounts[qType]++;

  setTimeout(() => {
    const responses = state.roleplayScenario.responses;
    const responseIdx = Math.min(state.roleplayTurnCount - 1, responses.length - 1);
    addChatMessage('ai', responses[responseIdx]);

    if (state.roleplayTurnCount >= 5) {
      document.getElementById('roleplayAnalysis').style.display = 'block';
      updateRoleplayAnalysis();
    }
  }, 800);

  addScore(5, 'roleplay');
}

function addChatMessage(role, text) {
  state.roleplayMessages.push({ role, text });
  const container = document.getElementById('chatContainer');
  const avatar = role === 'ai' ? '🏢' : '👤';

  container.innerHTML += `
    <div class="chat-msg ${role}">
      <div class="chat-avatar">${avatar}</div>
      <div class="chat-bubble">${text}</div>
    </div>
  `;
  container.scrollTop = container.scrollHeight;
}

function classifyQuestion(text) {
  const patterns = {
    S: ['현재', '몇', '어떤', '사용', '운영', '규모', '얼마나', '어디', '누가'],
    P: ['문제', '어려움', '불편', '불만', '걱정', '힘든', '어렵', '못', '안되'],
    I: ['영향', '결과', '미치', '때문에', '그로', '이어지', '파급', '손실'],
    N: ['해결', '도움', '가능', '효과', '만약', '개선', '좋겠', '원하']
  };

  let maxScore = 0;
  let maxType = null;

  for (const [type, keywords] of Object.entries(patterns)) {
    const score = keywords.filter(kw => text.includes(kw)).length;
    if (score > maxScore) { maxScore = score; maxType = type; }
  }

  return maxType;
}

function updateRoleplayAnalysis() {
  const total = state.roleplayTurnCount;
  const content = document.getElementById('roleplayAnalysisContent');

  content.innerHTML = `
    <p><strong>상담 턴 수:</strong> ${total}회</p>
    <p><strong>SPIN 질문 분석:</strong></p>
    <div style="display:flex; gap:12px; margin:8px 0;">
      <span class="spin-tag S" style="padding:4px 12px;">S: ${state.spinCounts.S}</span>
      <span class="spin-tag P" style="padding:4px 12px;">P: ${state.spinCounts.P}</span>
      <span class="spin-tag I" style="padding:4px 12px;">I: ${state.spinCounts.I}</span>
      <span class="spin-tag N" style="padding:4px 12px;">N: ${state.spinCounts.N}</span>
    </div>
    <p style="margin-top:8px;">${getCoachingTip()}</p>
  `;
}

function getCoachingTip() {
  const { S, P, I, N } = state.spinCounts;
  const total = S + P + I + N;
  if (total < 3) return '더 많은 질문을 해보세요.';

  if (S > total * 0.5) return '💡 상황질문(S) 비율이 높습니다. 문제질문(P)과 시사질문(I)을 더 활용해보세요.';
  if (I === 0) return '💡 시사질문(I)을 아직 사용하지 않았습니다. 문제의 영향을 탐색하는 질문을 추가해보세요.';
  if (N === 0 && total >= 5) return '💡 해결질문(N)을 사용해볼 시점입니다. "만약 ~한다면" 형태의 질문을 시도해보세요.';
  if (I >= 2 && N >= 1) return '✅ 훌륭합니다! SPIN 질문을 균형있게 활용하고 있습니다.';
  return '계속 진행해보세요. 다양한 유형의 질문을 시도해보세요.';
}
