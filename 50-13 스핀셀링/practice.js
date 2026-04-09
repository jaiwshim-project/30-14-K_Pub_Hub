// ========== PRACTICE CONTEXTS ==========
const practiceContexts = [
  {
    title: "제조업",
    text: "<strong>상황:</strong> 당신은 생산관리 솔루션을 판매하는 B2B 영업사원입니다. 고객사는 연매출 500억 원 규모의 중견 자동차 부품 제조업체이며, 생산관리 담당 이사와의 첫 미팅을 앞두고 있습니다. 이 회사는 현재 엑셀과 수작업으로 생산 스케줄을 관리하고 있으며, 3개 공장에서 월 200개 이상의 주문을 처리합니다. 최근 6개월간 납기 지연율이 12%에서 23%로 급증하여 주요 완성차 고객사로부터 경고를 받았습니다. 원자재 가격 상승과 인력 부족이 겹치면서 생산 효율성도 하락하고 있습니다. 경쟁사는 이미 스마트 팩토리 시스템을 도입하여 납기 준수율 98%를 달성하고 있다는 정보도 있습니다. 이사는 디지털 전환에 관심은 있지만 투자 대비 효과에 대해 확신이 없는 상태입니다."
  },
  {
    title: "IT 서비스",
    text: "<strong>상황:</strong> 당신은 하이브리드 클라우드 인프라 솔루션을 판매하는 영업사원입니다. 고객사는 직원 200명 규모의 핀테크 스타트업으로, CTO와의 미팅이 예정되어 있습니다. 이 회사는 자체 데이터센터에 서버 50대를 운영하고 있으며, 월 활성 사용자 30만 명의 모바일 결제 앱을 서비스합니다. 최근 3개월간 서버 다운타임이 월 평균 4시간으로 증가했고, 이로 인해 거래 실패 건수가 월 1,200건에 달합니다. 서버 관리 인력 3명이 24시간 교대 근무를 하고 있지만 야간 장애 대응이 늦어지는 문제가 반복됩니다. 내년 사용자 100만 명 돌파 목표를 세웠지만 현재 인프라로는 트래픽 급증에 대응하기 어렵다는 내부 보고가 있었습니다. 또한 금융 당국의 클라우드 보안 규제 준수도 시급한 과제입니다."
  },
  {
    title: "금융",
    text: "<strong>상황:</strong> 당신은 규제 대응 및 리스크 관리 솔루션을 판매하는 영업사원입니다. 고객사는 자산 운용 규모 2조 원의 중견 증권사이며, 리스크 관리팀장과 미팅합니다. 최근 금융감독원의 규제 강화로 일일 리스크 리포트, 스트레스 테스트 결과, VaR 산출 보고서 등 제출 서류가 기존 대비 3배로 늘었습니다. 현재 5명의 팀원이 엑셀과 이메일로 데이터를 수집하고 수작업으로 리포트를 작성하는 데 하루 4시간을 소비합니다. 지난 분기에 리포팅 오류로 금감원 지적을 받았고, 과태료 2천만 원을 납부했습니다. 팀장은 리포팅 자동화에 관심이 있지만, IT 부서와의 협업이 원활하지 않고 예산 확보에 대한 경영진 설득이 필요한 상황입니다. 경쟁 증권사들은 이미 자동화 솔루션을 도입하여 리포팅 시간을 80% 단축했다고 합니다."
  },
  {
    title: "병원",
    text: "<strong>상황:</strong> 당신은 통합 의료정보시스템(HIS) 영업사원입니다. 고객사는 300병상 규모의 종합병원이며, 행정부원장과 미팅합니다. 현재 진료 예약 시스템은 10년 전에 도입된 것으로, 온라인 예약이 불가능하여 전화 예약에 의존합니다. 하루 평균 800건의 예약 전화가 몰리면서 통화 대기 시간이 평균 8분이고, 부재중 전화율이 35%에 달합니다. 환자 대기 시간은 평균 45분으로 만족도 조사에서 가장 낮은 점수를 받는 항목입니다. 의료진 스케줄 관리도 수작업으로 이루어져 이중 예약 사고가 월 15건 발생하고 있습니다. 인근에 새 병원이 개원하면서 외래 환자 수가 전년 대비 8% 감소했고, 병원장은 디지털 혁신을 통한 환자 경험 개선을 핵심 경영 과제로 선정했습니다."
  },
  {
    title: "물류/유통",
    text: "<strong>상황:</strong> 당신은 스마트 물류 솔루션을 판매하는 영업사원입니다. 고객사는 전국 8개 물류센터를 운영하는 대형 유통업체이며, 물류센터장과 미팅합니다. 현재 재고 관리를 엑셀로 하고 있으며, 각 센터별 재고 데이터를 취합하는 데 하루 2시간이 소요됩니다. 실시간 재고 파악이 안 되어 성수기(추석, 설날)마다 인기 상품 품절율이 15%에 달하고, 동시에 비인기 상품 과잉 재고로 연간 폐기 비용이 8억 원입니다. 배송 오류율도 월 평균 3.2%로 업계 평균(1.5%)의 두 배입니다. 최근 경쟁사가 AI 기반 수요 예측 시스템을 도입하여 재고 회전율을 40% 개선했다는 뉴스가 나왔고, 경영진은 물류 디지털 전환을 올해 핵심 과제로 설정했습니다."
  },
  {
    title: "건설/부동산",
    text: "<strong>상황:</strong> 당신은 건설 프로젝트 관리 플랫폼을 판매하는 영업사원입니다. 고객사는 연매출 3,000억 원 규모의 중견 건설사이며, 프로젝트 관리 본부장과 미팅합니다. 현재 전국 12개 현장이 동시 진행 중이고, 각 현장 소장이 개별적으로 공정을 관리합니다. 본사에서 현장별 진척률을 파악하려면 각 소장에게 전화나 카카오톡으로 확인해야 하며, 월간 보고서 취합에 1주일이 걸립니다. 지난해 3개 현장에서 공기 지연이 발생하여 총 15억 원의 지체상금을 물었습니다. 안전사고도 전년 대비 20% 증가했고, 자재 발주 타이밍을 놓쳐 현장 대기 시간이 누적되는 문제도 있습니다. 본부장은 BIM 기반 관리에 관심이 있지만 현장 인력의 IT 역량이 부족하여 도입을 망설이고 있습니다."
  },
  {
    title: "교육/에듀테크",
    text: "<strong>상황:</strong> 당신은 기업 학습관리시스템(LMS) 영업사원입니다. 고객사는 직원 500명 규모의 중견 제약회사이며, 인재개발팀장과 미팅합니다. 현재 연간 40개 교육 과정을 운영하고 있으며, 교육 이수율 관리를 엑셀로 합니다. 법정 의무교육(안전보건, 개인정보보호 등) 미이수자 파악에 매월 3일이 소요되고, 지난해 미이수로 인한 과태료가 1,500만 원이었습니다. 직원별 역량 갭 분석이 안 되어 교육 효과를 측정할 수 없고, 교육 예산 정당성을 경영진에게 설명하기 어렵습니다. 해외 본사에서는 글로벌 표준 LMS 도입을 권고하고 있으며, 내년까지 전 직원 디지털 역량 진단 및 맞춤형 학습 경로 제공을 요구하고 있습니다. 팀장은 시스템 도입 필요성을 느끼지만 현업 부서의 참여율이 낮을까 우려합니다."
  },
  {
    title: "자동차/모빌리티",
    text: "<strong>상황:</strong> 당신은 차량 관제 및 배차 최적화 솔루션 영업사원입니다. 고객사는 일 평균 5만 건을 처리하는 중견 택배 회사이며, 운영이사와 미팅합니다. 300대의 배송 차량을 운영 중이지만 실시간 위치 추적이 안 되어 배차를 기사 경험에 의존합니다. 이로 인해 차량당 일 평균 주행거리가 업계 평균보다 30% 더 길고, 연료비가 연간 12억 원 발생합니다. 배송 완료율은 92%로 경쟁사(97%)에 크게 뒤처지며, 배송 지연에 대한 고객 불만 콜이 하루 평균 150건입니다. 기사 이직률도 연 40%로 높아 신규 기사 채용과 교육에 많은 비용이 들고 있습니다. 최근 대형 이커머스 업체와의 계약 갱신 협상에서 배송 품질 개선을 조건으로 제시받았습니다."
  },
  {
    title: "에너지/환경",
    text: "<strong>상황:</strong> 당신은 산업용 에너지 관리 솔루션(EMS) 영업사원입니다. 고객사는 연간 전력 사용량 5,000만 kWh의 대형 반도체 제조 공장이며, 시설관리 부장과 미팅합니다. 전기료가 연간 65억 원으로 매년 15%씩 상승하고 있으며, 전체 생산원가의 18%를 차지합니다. 정부의 탄소배출권 거래제 3기(2026~2030) 대비를 위해 탄소배출량 30% 감축이 필요하지만, 현재 설비별 에너지 사용량조차 정확히 파악하지 못합니다. 공장 내 200개 이상의 설비가 가동 중이고, 비가동 시간에도 대기전력이 총 사용량의 12%를 차지한다는 추정만 있습니다. 최근 ESG 경영 선언으로 이사회에서 에너지 효율화 로드맵 수립을 요구했고, 해외 고객사들도 공급망 탄소발자국 데이터를 요청하기 시작했습니다."
  },
  {
    title: "호텔/숙박",
    text: "<strong>상황:</strong> 당신은 호텔 통합 관리 시스템(PMS) 영업사원입니다. 고객사는 서울 강남에 위치한 150실 규모의 비즈니스 호텔이며, 총지배인과 미팅합니다. 현재 5개 OTA(온라인 여행사) 채널에서 예약을 받고 있지만, 각 채널의 재고를 수작업으로 관리하여 월 평균 8건의 오버부킹이 발생합니다. 오버부킹 시 인근 호텔로 고객을 전환 배치하는 비용이 건당 25만 원입니다. 체크인에 평균 7분이 소요되어 로비 혼잡이 심하고, 투숙객 리뷰 평점이 3.8점으로 경쟁 호텔(4.3점)보다 낮습니다. 객실 정비 상태 파악도 전화로 하고 있어 얼리 체크인 요청에 즉시 대응하지 못합니다. 총지배인은 올해 리뷰 평점 4.2점 달성과 객실 가동률 80%(현재 68%) 목표를 세웠습니다."
  },
  {
    title: "식품/외식",
    text: "<strong>상황:</strong> 당신은 프랜차이즈 통합 관리 솔루션 영업사원입니다. 고객사는 전국 50개 매장을 운영하는 한식 프랜차이즈 본사이며, 운영본부장과 미팅합니다. 각 매장이 개별적으로 식자재를 발주하고 있어 동일 식자재의 매장별 구매 단가가 최대 30% 차이가 납니다. 본사 표준 레시피 준수율이 60%에 불과하여 매장별 맛 편차에 대한 고객 불만이 증가하고 있습니다. 유통기한 관리도 수기로 하여 월 평균 폐기 비용이 매장당 120만 원이며, 지난해 식품위생 점검에서 3개 매장이 적발되어 브랜드 이미지에 타격을 입었습니다. 매출 데이터 취합도 수작업으로 하루가 걸리고, 신메뉴 테스트 결과를 체계적으로 분석하지 못합니다. 본부장은 내년 80개 매장 확장 계획을 앞두고 운영 표준화가 시급하다고 판단하고 있습니다."
  }
];

// ========== PRACTICE FUNCTIONS ==========
function renderContextButtons() {
  const container = document.getElementById('practiceContextBtns');
  if (!container) return;
  container.innerHTML = practiceContexts.map((ctx, i) =>
    `<button class="btn btn-sm btn-secondary" onclick="changePracticeContext(${i})" style="font-size:11px; padding:5px 10px;">${ctx.title}</button>`
  ).join('');
}

function changePracticeContext(idx) {
  document.getElementById('practiceContext').innerHTML = practiceContexts[idx].text;
  // 선택된 버튼 강조
  const btns = document.querySelectorAll('#practiceContextBtns .btn');
  btns.forEach((b, i) => {
    b.classList.toggle('active', i === idx);
  });
}

// 페이지 로드 시 버튼 생성
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => renderContextButtons(), 150);
});

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

  addScore(10, 'practice');
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
