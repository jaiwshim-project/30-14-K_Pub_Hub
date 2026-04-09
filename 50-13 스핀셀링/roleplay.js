// ========== ROLEPLAY SCENARIOS ==========
const roleplayScenarios = {
  riprock: {
    name: "Riprock Rooftops 담당자",
    context: "태양광 에너지 솔루션 고객. 83개동 관리, 에너지 비용 상승 중, 친환경 관심 있음",
    description: "당신은 태양광 패널 및 에너지 솔루션을 판매하는 영업사원입니다. 고객은 Riprock Rooftops의 부동산 관리 담당 매니저 Alex입니다. Riprock은 도심 외곽에 83개 건물(아파트, 상가, 오피스 혼합)을 관리하는 중견 부동산 관리 회사입니다. 건물 대부분이 15~25년 된 노후 건물로, 지붕 교체 시기가 다가오고 있습니다. 연간 에너지 비용이 건물당 평균 1,200만 원으로 전년 대비 15% 상승했으며, 전체 포트폴리오 에너지 비용이 약 10억 원에 달합니다. 최근 정부의 친환경 건축물 인증 의무화 정책이 발표되면서 2027년까지 에너지 효율 등급 B 이상을 달성해야 합니다. 경쟁 관리사인 Green Estate가 이미 태양광을 설치하여 입주율 96%를 기록 중이며, Riprock의 입주율은 현재 92%로 하락 추세입니다. Alex는 에너지 비용 절감과 입주율 제고에 관심이 있지만, 초기 투자비용과 건물별 지붕 상태 차이 때문에 결정을 망설이고 있습니다.",
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
    description: "당신은 스마트 팩토리 솔루션을 판매하는 영업사원입니다. 고객은 KM산업의 생산관리 담당 이사 박현수입니다. KM산업은 연매출 800억 원 규모의 자동차 부품 제조업체로, 부산과 화성에 2개 공장을 운영합니다. 총 직원 350명 중 생산직이 220명이며, 월 생산량은 약 5만 개입니다. 현재 생산 스케줄을 엑셀과 화이트보드로 관리하고 있으며, 생산관리 담당자 3명이 수작업으로 일정을 조율합니다. 최근 6개월간 납기 지연이 12건 발생하여 주요 완성차 고객사(H사, K사)로부터 경고를 받았습니다. 특히 긴급 주문 변경 시 2개 공장 간 재고와 일정 조율에 평균 4시간이 소요되며, 이 과정에서 오류가 빈번합니다. 불량률도 2.8%에서 3.5%로 상승했고, 품질 추적이 안 되어 원인 분석에 평균 3일이 걸립니다. 경쟁사인 DS부품은 MES 시스템을 도입하여 납기 준수율 99%를 달성했다는 소식이 있습니다. 박 이사는 디지털 전환 필요성을 느끼지만, 3억 원 이상의 투자에 대해 경영진 설득이 필요한 상황입니다.",
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
    description: "당신은 유통/재고 관리 솔루션을 판매하는 영업사원입니다. 고객은 Shop N Save의 구매담당 부장 김서연입니다. Shop N Save는 수도권과 충청권에 62개 매장을 운영하는 중형 슈퍼마켓 체인으로, 연매출 2,400억 원 규모입니다. 각 매장은 평균 3,000개 SKU를 취급하며, 식품이 매출의 65%를 차지합니다. 현재 재고 관리 시스템은 8년 전에 도입된 것으로, 매장별 재고 데이터가 본사에 하루 1회만 동기화됩니다. 식품 폐기율이 5.2%로 업계 평균(3.1%)을 크게 웃돌아 연간 폐기 손실이 약 45억 원입니다. 동시에 인기 상품 품절률이 8%로, 추정 매출 손실이 연간 70억 원에 달합니다. 물류센터에서 매장까지 배송 정확도는 94%에 불과하여 매장 직원의 검수 업무 부담이 큽니다. 올해 15개 신규 매장 오픈을 계획하고 있지만, 현 시스템으로는 확장이 어렵다고 판단하고 있습니다. 김 부장은 AI 기반 수요 예측과 자동 발주 시스템에 관심이 있지만, 매장 직원들의 적응력과 시스템 전환 리스크를 우려하고 있습니다.",
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
  ,
  finance: {
    name: "중견 증권사 리스크 관리팀장",
    label: "금융",
    context: "규제 대응, 리포팅 자동화 필요",
    description: "당신은 규제 대응 솔루션을 판매하는 영업사원입니다. 고객은 자산 운용 2조 원 규모 증권사의 리스크 관리팀장 이준혁입니다. 금융감독원 규제 강화로 일일 리포트 제출 서류가 기존 대비 3배로 늘었습니다. 팀원 5명이 엑셀로 데이터를 수집하고 수작업으로 리포트를 작성하는 데 하루 4시간을 소비합니다. 지난 분기 리포팅 오류로 금감원 지적과 과태료 2천만 원을 납부했습니다. 경쟁 증권사들은 자동화 솔루션을 도입하여 리포팅 시간을 80% 단축했다고 합니다. IT 부서와 협업이 원활하지 않고 예산 확보를 위해 경영진 설득이 필요한 상황입니다.",
    responses: ["네, 현재 리스크 리포트를 엑셀로 작성하고 있습니다.", "팀원 5명이 하루 4시간씩 리포팅에 매달리고 있어요.", "지난 분기에 금감원 지적을 받아서 정말 곤란했습니다.", "규제가 점점 강해지면서 인력으로는 한계를 느끼고 있어요.", "오류 한 건이 과태료와 평판 리스크로 이어지니까요.", "경쟁사가 자동화했다는 건 알고 있는데, 우리도 서둘러야 합니다.", "IT 부서와 사전 협의가 필요한데 일정이 안 맞아서 고민입니다.", "자동화하면 팀원들이 분석 업무에 집중할 수 있겠죠.", "구체적인 ROI 수치가 있으면 경영진 설득이 쉬울 것 같습니다.", "단계적으로 도입할 수 있다면 검토해보겠습니다."]
  },
  hospital: {
    name: "종합병원 행정부원장",
    label: "병원",
    context: "예약 시스템 노후화, 환자 대기 시간 문제",
    description: "당신은 통합 의료정보시스템(HIS) 영업사원입니다. 고객은 300병상 규모 종합병원의 행정부원장 최민호입니다. 진료 예약 시스템이 10년 전 도입된 것으로 온라인 예약이 불가능하여 전화에 의존합니다. 하루 800건 예약 전화가 몰리며 통화 대기 시간이 평균 8분, 부재중 전화율 35%입니다. 환자 대기 시간 평균 45분으로 만족도 최하위 항목이며, 의료진 이중 예약 사고가 월 15건 발생합니다. 인근 신규 병원 개원으로 외래 환자 수가 전년 대비 8% 감소했습니다. 병원장은 디지털 혁신을 통한 환자 경험 개선을 핵심 경영 과제로 선정했습니다.",
    responses: ["네, 현재 전화 예약만 가능한 상태입니다.", "하루 800건이 넘는 전화가 오는데 절반은 놓치고 있어요.", "환자분들 대기 시간이 길어서 불만이 정말 많습니다.", "이중 예약 사고가 월 15건이나 되니 의료진도 힘들어합니다.", "인근에 새 병원이 열리면서 환자가 줄고 있어 위기감이 큽니다.", "온라인 예약이 안 되니 젊은 환자층을 놓치고 있죠.", "대기 시간 문제가 병원 평판에 직결되니까요.", "디지털 전환은 병원장님도 강조하고 계십니다.", "환자 경험을 확실히 개선할 수 있다면 투자할 의향이 있습니다.", "단계적 도입이 가능하다면 좋겠습니다."]
  },
  logistics: {
    name: "대형 유통업체 물류센터장",
    label: "물류/유통",
    context: "엑셀 재고 관리, 품절/과잉 재고 반복",
    description: "당신은 스마트 물류 솔루션 영업사원입니다. 고객은 전국 8개 물류센터를 운영하는 대형 유통업체 물류센터장 정해원입니다. 재고 관리를 엑셀로 하고 있으며 각 센터별 데이터 취합에 하루 2시간이 소요됩니다. 성수기마다 인기 상품 품절율 15%, 비인기 상품 과잉 재고 폐기 비용 연간 8억 원입니다. 배송 오류율 3.2%로 업계 평균의 두 배이며, 경쟁사가 AI 수요 예측을 도입하여 재고 회전율을 40% 개선했습니다. 경영진은 올해 물류 디지털 전환을 핵심 과제로 설정했습니다.",
    responses: ["현재 8개 센터 재고를 엑셀로 관리하고 있습니다.", "데이터 취합에 하루 2시간이 걸려서 실시간 파악이 안 돼요.", "성수기마다 품절과 과잉 재고가 반복되는 게 가장 큰 문제입니다.", "폐기 비용만 연간 8억 원이에요. 정말 아까운 돈이죠.", "배송 오류율도 높아서 고객 클레임이 많습니다.", "경쟁사가 AI를 도입했다는 뉴스를 보고 위기감을 느꼈습니다.", "실시간 재고 파악이 되면 정말 많은 것이 바뀔 것 같습니다.", "경영진도 올해 안에 디지털 전환을 추진하라고 합니다.", "현장 직원들의 시스템 적응이 잘 될지 걱정이에요.", "구체적인 도입 사례와 효과를 보여주시면 좋겠습니다."]
  },
  construction: {
    name: "중견 건설사 프로젝트 관리 본부장",
    label: "건설/부동산",
    context: "현장별 개별 관리, 공기 지연 문제",
    description: "당신은 건설 프로젝트 관리 플랫폼 영업사원입니다. 고객은 연매출 3,000억 원 중견 건설사의 본부장 한상우입니다. 전국 12개 현장이 동시 진행 중이며 각 현장 소장이 개별 관리합니다. 본사 진척률 파악에 전화/카카오톡에 의존하고 월간 보고서 취합에 1주일이 걸립니다. 지난해 3개 현장 공기 지연으로 지체상금 15억 원을 물었고, 안전사고도 전년 대비 20% 증가했습니다. 본부장은 BIM 기반 관리에 관심이 있지만 현장 인력 IT 역량 부족이 걸림돌입니다.",
    responses: ["현재 12개 현장을 동시에 관리하고 있습니다.", "각 현장 소장에게 전화로 진척률을 확인하고 있어요.", "월간 보고서 취합에 1주일이 걸리니 의사결정이 늦어집니다.", "지난해 지체상금만 15억 원이었습니다. 큰 손실이죠.", "안전사고도 늘어나서 경영진이 많이 걱정하고 있습니다.", "자재 발주 타이밍을 놓쳐서 현장 대기가 발생하기도 합니다.", "실시간으로 현장 상황을 볼 수 있다면 정말 좋겠습니다.", "BIM에 관심은 있는데 현장 분들이 잘 쓸 수 있을지 걱정이에요.", "도입 효과가 확실하다면 투자를 검토할 수 있습니다.", "단계적으로 시범 현장부터 시작할 수 있을까요?"]
  },
  education: {
    name: "중견 기업 인재개발팀장",
    label: "교육/에듀테크",
    context: "교육 이수율 수작업 관리, 역량 갭 분석 불가",
    description: "당신은 기업 학습관리시스템(LMS) 영업사원입니다. 고객은 직원 500명 규모 제약회사의 인재개발팀장 윤서영입니다. 연간 40개 교육 과정을 운영하며 이수율 관리를 엑셀로 합니다. 법정 의무교육 미이수자 파악에 매월 3일이 소요되고, 지난해 미이수 과태료가 1,500만 원이었습니다. 직원별 역량 갭 분석이 안 되어 교육 효과를 측정할 수 없고, 해외 본사에서 글로벌 LMS 도입을 권고하고 있습니다. 내년까지 전 직원 디지털 역량 진단 및 맞춤형 학습 경로 제공을 요구받고 있습니다.",
    responses: ["현재 40개 과정을 엑셀로 관리하고 있습니다.", "법정 의무교육 미이수자 파악에 매달 3일이 걸려요.", "지난해 과태료 1,500만 원을 냈습니다. 반복되면 안 되죠.", "교육 효과를 수치로 보여줄 수 없어서 예산 정당성 설명이 어렵습니다.", "해외 본사에서 글로벌 표준 LMS를 도입하라고 합니다.", "직원별 역량 갭 분석이 안 되니 맞춤 교육이 불가능합니다.", "현업 부서 참여율이 낮을까 봐 걱정입니다.", "자동화되면 팀원들이 기획에 집중할 수 있겠죠.", "도입 후 이수율이 얼마나 올라가는지 사례가 있을까요?", "본사 요구 일정이 있어서 빠른 도입이 필요합니다."]
  },
  automotive: {
    name: "택배회사 운영이사",
    label: "자동차/모빌리티",
    context: "300대 차량 관제 불가, 배송 지연",
    description: "당신은 차량 관제 및 배차 최적화 솔루션 영업사원입니다. 고객은 일 평균 5만 건을 처리하는 중견 택배회사의 운영이사 강민수입니다. 300대 배송 차량의 실시간 위치 추적이 안 되어 배차를 기사 경험에 의존합니다. 차량당 일 평균 주행거리가 업계 평균보다 30% 길고 연료비가 연간 12억 원입니다. 배송 완료율 92%로 경쟁사 97%에 크게 뒤처지며, 기사 이직률 연 40%로 채용/교육 비용이 큽니다. 대형 이커머스 업체와의 계약 갱신에서 배송 품질 개선을 조건으로 제시받았습니다.",
    responses: ["300대 차량을 운영하는데 실시간 추적이 안 됩니다.", "배차를 기사 경험에 의존하다 보니 비효율이 큽니다.", "연료비만 연간 12억 원이에요. 경로 최적화가 절실합니다.", "배송 완료율이 92%인데 경쟁사는 97%라고 하니 차이가 크죠.", "기사분들 이직률이 40%나 되어 항상 인력 부족입니다.", "고객 불만 콜이 하루 150건 정도 옵니다.", "대형 고객사에서 품질 개선을 조건으로 내걸었어요.", "실시간 관제가 되면 많은 것이 해결될 것 같습니다.", "기사분들이 새 시스템을 잘 받아들일지 걱정이에요.", "투자 대비 효과가 명확하면 경영진도 동의할 겁니다."]
  },
  energy: {
    name: "대형 공장 시설관리 부장",
    label: "에너지/환경",
    context: "에너지 비용 급증, 탄소 규제 대응",
    description: "당신은 산업용 에너지 관리 솔루션(EMS) 영업사원입니다. 고객은 연간 전력 5,000만 kWh를 사용하는 대형 반도체 공장의 시설관리 부장 오진우입니다. 전기료가 연간 65억 원으로 매년 15%씩 상승하며 생산원가의 18%를 차지합니다. 탄소배출권 거래제 3기 대비 30% 감축이 필요하지만 설비별 에너지 사용량을 정확히 파악하지 못합니다. 200개 이상 설비 가동 중이며 비가동 대기전력이 총 사용량의 12%로 추정됩니다. ESG 경영 선언으로 이사회에서 에너지 효율화 로드맵을 요구하고 있습니다.",
    responses: ["전기료가 연간 65억 원인데 매년 15%씩 올라서 큰 부담입니다.", "200개 넘는 설비가 있는데 개별 전력 사용량을 모릅니다.", "비가동 시간 대기전력이 상당하다는 건 알지만 정확한 수치가 없어요.", "탄소배출 30% 감축이 필요한데 어디서부터 시작해야 할지 모르겠습니다.", "해외 고객사들이 탄소발자국 데이터를 요청하기 시작했습니다.", "ESG 경영 선언 이후 이사회 압박이 거세집니다.", "설비별 모니터링이 되면 비효율을 찾을 수 있겠죠.", "투자 비용도 중요하지만 규제 미대응 리스크가 더 클 것 같습니다.", "단계적으로 주요 설비부터 모니터링을 시작할 수 있을까요?", "구체적인 에너지 절감 사례가 있으면 보여주세요."]
  }
};

// 버튼 동적 생성
function renderRoleplayButtons() {
  const container = document.getElementById('roleplayBtns');
  if (!container) return;
  const labels = {
    riprock: 'Riprock Rooftops',
    manufacturing: '제조업',
    shopnsave: 'Shop N Save',
    finance: '금융',
    hospital: '병원',
    logistics: '물류/유통',
    construction: '건설/부동산',
    education: '교육/에듀테크',
    automotive: '자동차/모빌리티',
    energy: '에너지/환경'
  };
  container.innerHTML = Object.keys(labels).map(key =>
    `<button class="btn btn-sm btn-secondary roleplay-btn" data-type="${key}" onclick="startRoleplay('${key}')" style="font-size:11px; padding:5px 10px;">${labels[key]}</button>`
  ).join('');
}

// 난이도 설정
const difficultyConfig = {
  easy: {
    label: '난이도(하)',
    desc: '고객이 협조적입니다. 질문에 상세하게 답변하며, 문제와 니즈를 비교적 쉽게 표현합니다. SPIN 질문의 기본 흐름을 연습하기 좋습니다.',
    responseStyle: 'cooperative'
  },
  medium: {
    label: '난이도(중)',
    desc: '고객이 중립적입니다. 질문에 간략하게 답하며, 시사질문(I)과 해결질문(N)을 통해 니즈를 심화시켜야 합니다. 문제를 인정하지만 행동 의도는 쉽게 표현하지 않습니다.',
    responseStyle: 'neutral'
  },
  hard: {
    label: '난이도(상)',
    desc: '고객이 방어적입니다. 문제를 축소하거나 현 상태에 만족한다고 말합니다. 강력한 시사질문(I)으로 문제의 심각성을 인식시키고, 해결질문(N)으로 전환해야 합니다.',
    responseStyle: 'defensive'
  }
};

// 난이도별 평가 결과 저장
const evalResults = { easy: null, medium: null, hard: null };

document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    renderRoleplayButtons();
    loadEvalResults();
  }, 150);
});

// ========== 1단계: 산업분야 선택 ==========
state.selectedScenarioType = null;
state.selectedDifficulty = null;

function selectScenario(type) {
  state.selectedScenarioType = type;
  const scenario = roleplayScenarios[type];

  // 버튼 활성
  document.querySelectorAll('.roleplay-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`.roleplay-btn[data-type="${type}"]`)?.classList.add('active');

  // 설명문
  const descEl = document.getElementById('scenarioDesc');
  descEl.style.display = 'block';
  descEl.innerHTML = `<div style="font-size:14px; font-weight:700; color:var(--text); margin-bottom:8px;">${scenario.name} — 사례 설명</div>
    <div style="font-size:13px; color:var(--text-secondary); line-height:1.8;">${scenario.description}</div>`;

  // 난이도가 이미 선택되어 있으면 채팅 시작
  if (state.selectedDifficulty) beginChat();
}

// ========== 2단계: 난이도 선택 ==========
function selectDifficulty(diff) {
  state.selectedDifficulty = diff;

  // 버튼 활성
  document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`.diff-btn.${diff}`)?.classList.add('active');

  // 설명 표시
  const desc = document.getElementById('diffDesc');
  desc.style.display = 'block';
  desc.textContent = difficultyConfig[diff].desc;

  // 산업분야가 이미 선택되어 있으면 채팅 시작
  if (state.selectedScenarioType) beginChat();
}

// ========== 3단계: 상담 시작 ==========
function beginChat() {
  if (!state.selectedScenarioType || !state.selectedDifficulty) return;

  const scenario = roleplayScenarios[state.selectedScenarioType];
  state.roleplayScenario = scenario;
  state.roleplayMessages = [];
  state.roleplayTurnCount = 0;
  state.spinCounts = { S: 0, P: 0, I: 0, N: 0 };

  const container = document.getElementById('chatContainer');
  container.innerHTML = '';

  const diffLabel = difficultyConfig[state.selectedDifficulty].label;
  addChatMessage('ai', `안녕하세요, ${scenario.name}입니다. [${diffLabel}] 무엇을 도와드릴까요?`);
  document.getElementById('roleplayAnalysis').style.display = 'none';
}

// 기존 startRoleplay를 selectScenario로 대체
function startRoleplay(type) {
  selectScenario(type);
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

  // 점수는 AI평가받기에서 일괄 반영
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

// ========== AI 종합 평가 ==========
function requestAIEvaluation() {
  if (!state.roleplayScenario) {
    alert('먼저 사례를 선택하고 대화를 시작하세요.');
    return;
  }

  const userMessages = state.roleplayMessages.filter(m => m.role === 'user');
  if (userMessages.length < 3) {
    alert('최소 3개 이상 질문한 후 평가를 받을 수 있습니다.');
    return;
  }

  const { S, P, I, N } = state.spinCounts;
  const totalQ = S + P + I + N;
  const totalTurns = state.roleplayTurnCount;

  // 질문 목록 추출
  const questions = userMessages.map(m => m.text);

  // SPIN 비율 분석
  const sRatio = totalQ > 0 ? Math.round((S / totalQ) * 100) : 0;
  const pRatio = totalQ > 0 ? Math.round((P / totalQ) * 100) : 0;
  const iRatio = totalQ > 0 ? Math.round((I / totalQ) * 100) : 0;
  const nRatio = totalQ > 0 ? Math.round((N / totalQ) * 100) : 0;

  // 점수 계산 (100점 만점)
  let score = 0;
  let feedback = [];

  // 1. SPIN 균형 (30점)
  const hasAllTypes = S > 0 && P > 0 && I > 0 && N > 0;
  if (hasAllTypes) {
    score += 30;
    feedback.push({ icon: '✅', text: 'SPIN 4가지 유형을 모두 활용했습니다.', category: 'SPIN 균형' });
  } else {
    const missing = [];
    if (S === 0) missing.push('상황질문(S)');
    if (P === 0) missing.push('문제질문(P)');
    if (I === 0) missing.push('시사질문(I)');
    if (N === 0) missing.push('해결질문(N)');
    const partial = (4 - missing.length) / 4 * 30;
    score += Math.round(partial);
    feedback.push({ icon: '⚠️', text: `${missing.join(', ')}을 사용하지 않았습니다. SPIN 4가지 유형을 모두 활용하세요.`, category: 'SPIN 균형' });
  }

  // 2. SPIN 순서 (20점) — S→P→I→N 순서 지향
  const typeSequence = userMessages.map(m => classifyQuestion(m.text)).filter(Boolean);
  let orderScore = 0;
  const idealOrder = { S: 1, P: 2, I: 3, N: 4 };
  for (let i = 1; i < typeSequence.length; i++) {
    if (idealOrder[typeSequence[i]] >= idealOrder[typeSequence[i-1]]) orderScore++;
  }
  const orderRatio = typeSequence.length > 1 ? orderScore / (typeSequence.length - 1) : 0;
  const orderPoints = Math.round(orderRatio * 20);
  score += orderPoints;
  if (orderRatio >= 0.7) {
    feedback.push({ icon: '✅', text: 'S→P→I→N 순서를 잘 따르고 있습니다. 자연스러운 대화 흐름입니다.', category: '질문 순서' });
  } else if (orderRatio >= 0.4) {
    feedback.push({ icon: '💡', text: 'SPIN 순서(S→P→I→N)를 더 의식적으로 따라보세요. 상황 파악 후 문제를 탐색하고, 시사점을 확대한 뒤 해결 가치를 물어야 합니다.', category: '질문 순서' });
  } else {
    feedback.push({ icon: '⚠️', text: '질문 순서가 불규칙합니다. SPIN은 S(상황)→P(문제)→I(시사)→N(해결) 순서로 진행해야 고객의 니즈가 자연스럽게 발전합니다.', category: '질문 순서' });
  }

  // 3. 상황질문 비율 (15점) — 너무 많으면 감점
  if (sRatio <= 30) {
    score += 15;
    feedback.push({ icon: '✅', text: `상황질문 비율이 ${sRatio}%로 적절합니다. 고객의 시간을 존중하고 있습니다.`, category: '상황질문(S)' });
  } else if (sRatio <= 50) {
    score += 8;
    feedback.push({ icon: '💡', text: `상황질문이 ${sRatio}%입니다. 30% 이하로 줄이세요. 상황질문이 많으면 고객이 심문받는 느낌을 받습니다.`, category: '상황질문(S)' });
  } else {
    score += 3;
    feedback.push({ icon: '⚠️', text: `상황질문이 ${sRatio}%로 과다합니다. Huthwaite 연구에 따르면 성공적인 상담에서 상황질문 비율은 낮습니다. 문제/시사/해결 질문으로 전환하세요.`, category: '상황질문(S)' });
  }

  // 4. 시사질문 활용 (20점) — 핵심 스킬
  if (I >= 2) {
    score += 20;
    feedback.push({ icon: '✅', text: `시사질문을 ${I}회 사용했습니다. 잠재니즈를 현재니즈로 전환하는 핵심 스킬을 잘 활용하고 있습니다.`, category: '시사질문(I)' });
  } else if (I === 1) {
    score += 10;
    feedback.push({ icon: '💡', text: '시사질문을 1회만 사용했습니다. 문제의 영향, 파급효과, 비용을 탐색하는 시사질문을 더 활용하세요. "그 문제로 인해 ~에도 영향이 있지 않습니까?" 형태가 효과적입니다.', category: '시사질문(I)' });
  } else {
    feedback.push({ icon: '⚠️', text: '시사질문(I)을 사용하지 않았습니다. 이것은 SPIN에서 가장 강력한 질문 유형입니다. 발견한 문제의 영향과 결과를 탐색하여 고객이 문제의 심각성을 인식하게 하세요.', category: '시사질문(I)' });
  }

  // 5. 해결질문 & 마무리 (15점)
  if (N >= 1) {
    score += 15;
    feedback.push({ icon: '✅', text: `해결질문을 ${N}회 사용했습니다. 고객이 솔루션의 가치를 스스로 말하게 하는 좋은 접근입니다.`, category: '해결질문(N)' });
  } else if (totalTurns >= 5) {
    feedback.push({ icon: '💡', text: '대화가 충분히 진행되었지만 해결질문(N)을 아직 사용하지 않았습니다. "만약 이 문제가 해결된다면 어떤 도움이 되겠습니까?" 같은 질문으로 고객이 가치를 표현하게 하세요.', category: '해결질문(N)' });
  }

  // 종합 평가 등급
  let grade, gradeColor, gradeMsg;
  if (score >= 90) { grade = 'A+'; gradeColor = 'var(--green)'; gradeMsg = '탁월한 SPIN 상담입니다! 실전에서도 높은 성과를 낼 수 있습니다.'; }
  else if (score >= 80) { grade = 'A'; gradeColor = 'var(--green)'; gradeMsg = '매우 우수합니다. 몇 가지만 보완하면 완벽한 상담이 됩니다.'; }
  else if (score >= 70) { grade = 'B+'; gradeColor = 'var(--blue)'; gradeMsg = '좋은 상담입니다. 아래 피드백을 참고하여 더 발전시켜보세요.'; }
  else if (score >= 60) { grade = 'B'; gradeColor = 'var(--blue)'; gradeMsg = '기본기를 갖추고 있습니다. 시사질문(I)과 해결질문(N) 활용을 강화하세요.'; }
  else if (score >= 50) { grade = 'C'; gradeColor = 'var(--gold)'; gradeMsg = '개선이 필요합니다. SPIN 순서와 질문 유형 균형에 더 집중하세요.'; }
  else { grade = 'D'; gradeColor = 'var(--accent)'; gradeMsg = 'SPIN 방법론을 다시 복습하고 재도전해보세요.'; }

  // 점수를 Supabase에 반영 (100점 만점 기준)
  if (score > 0) {
    addScore(score, 'roleplay');
    addActivity(`AI 롤플레이 평가: ${grade} (${score}/100점)`);
    saveActivityLog('roleplay', { grade: grade, score: score, turns: totalTurns, difficulty: state.selectedDifficulty, spinCounts: {S,P,I,N}, questions: questions }, score);
  }

  // 난이도별 결과 저장
  const diff = state.selectedDifficulty || 'easy';
  const evalHTML = buildEvalHTML({ grade, gradeColor, gradeMsg, score, totalTurns, S, P, I, N, sRatio, pRatio, iRatio, nRatio, totalQ, feedback, questions });

  evalResults[diff] = { score, grade, html: evalHTML };
  saveEvalResults();

  // 해당 난이도 탭 활성화 + 결과 표시
  updateEvalTabs();
  switchEvalTab(diff);

  // 스크롤
  const evalContent = document.getElementById('evalContent' + diff.charAt(0).toUpperCase() + diff.slice(1));
  if (evalContent) evalContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function buildEvalHTML(d) {
  return `
    <div style="background:linear-gradient(135deg, #ffffff, var(--pastel-blue)); border:1.5px solid rgba(36,113,163,0.12); border-radius:12px; padding:20px;">
      <div style="display:flex; gap:12px; margin-bottom:16px; flex-wrap:wrap;">
        <div style="text-align:center; padding:14px 20px; background:var(--card); border:1.5px solid var(--border); border-radius:12px; flex:1; min-width:100px;">
          <div style="font-size:32px; font-weight:900; color:${d.gradeColor};">${d.grade}</div>
          <div style="font-size:10px; color:var(--text-muted); margin-top:4px;">등급</div>
        </div>
        <div style="text-align:center; padding:14px 20px; background:var(--card); border:1.5px solid var(--border); border-radius:12px; flex:1; min-width:100px;">
          <div style="font-size:32px; font-weight:900; color:${d.gradeColor};">${d.score}</div>
          <div style="font-size:10px; color:var(--text-muted); margin-top:4px;">/ 100점</div>
        </div>
        <div style="text-align:center; padding:14px 20px; background:var(--card); border:1.5px solid var(--border); border-radius:12px; flex:1; min-width:100px;">
          <div style="font-size:32px; font-weight:900; color:var(--text);">${d.totalTurns}</div>
          <div style="font-size:10px; color:var(--text-muted); margin-top:4px;">대화 턴</div>
        </div>
      </div>
      <div style="padding:10px 14px; background:rgba(36,113,163,0.04); border-radius:10px; margin-bottom:16px; font-size:13px; color:var(--text-secondary); line-height:1.6;">${d.gradeMsg}</div>
      <div style="margin-bottom:16px;">
        <div style="font-size:12px; font-weight:700; color:var(--text); margin-bottom:6px;">SPIN 질문 비율</div>
        <div style="display:flex; height:22px; border-radius:8px; overflow:hidden; border:1px solid var(--border);">
          ${d.S > 0 ? `<div style="width:${d.sRatio}%; background:var(--blue); display:flex; align-items:center; justify-content:center; color:white; font-size:9px; font-weight:700;">S ${d.sRatio}%</div>` : ''}
          ${d.P > 0 ? `<div style="width:${d.pRatio}%; background:var(--accent); display:flex; align-items:center; justify-content:center; color:white; font-size:9px; font-weight:700;">P ${d.pRatio}%</div>` : ''}
          ${d.I > 0 ? `<div style="width:${d.iRatio}%; background:var(--purple); display:flex; align-items:center; justify-content:center; color:white; font-size:9px; font-weight:700;">I ${d.iRatio}%</div>` : ''}
          ${d.N > 0 ? `<div style="width:${d.nRatio}%; background:var(--green); display:flex; align-items:center; justify-content:center; color:white; font-size:9px; font-weight:700;">N ${d.nRatio}%</div>` : ''}
        </div>
        <div style="font-size:10px; color:var(--text-muted); margin-top:4px;">S:${d.S} P:${d.P} I:${d.I} N:${d.N} (총 ${d.totalQ}개)</div>
      </div>
      <div style="font-size:12px; font-weight:700; color:var(--text); margin-bottom:8px;">세부 피드백</div>
      ${d.feedback.map(f => `
        <div style="padding:8px 12px; background:var(--card); border:1px solid var(--border-light); border-radius:8px; margin-bottom:6px; display:flex; gap:8px; align-items:flex-start;">
          <span style="font-size:14px; flex:none;">${f.icon}</span>
          <div>
            <div style="font-size:10px; font-weight:700; color:var(--text-muted);">${f.category}</div>
            <div style="font-size:12px; color:var(--text-secondary); line-height:1.5;">${f.text}</div>
          </div>
        </div>
      `).join('')}
      <div style="margin-top:12px;">
        <div style="font-size:12px; font-weight:700; color:var(--text); margin-bottom:6px;">내가 한 질문 (${d.questions.length}개)</div>
        ${d.questions.map(q => {
          const qType = classifyQuestion(q);
          return `<div style="padding:4px 10px; background:var(--bg); border-radius:6px; margin-bottom:3px; font-size:11px; display:flex; align-items:center; gap:6px;">
            <span class="spin-tag ${qType || ''}" style="padding:2px 6px; font-size:9px;">${qType || '?'}</span>
            <span style="color:var(--text-tertiary);">${q}</span>
          </div>`;
        }).join('')}
      </div>
    </div>`;
}

// ========== 평가 탭 시스템 ==========
function switchEvalTab(diff) {
  // 탭 활성화
  document.querySelectorAll('.eval-tab').forEach(t => t.classList.remove('active'));
  document.querySelector(`.eval-tab.${diff}`)?.classList.add('active');

  // 콘텐츠 표시
  document.querySelectorAll('.eval-content').forEach(c => c.classList.remove('active'));
  const content = document.getElementById('evalContent' + diff.charAt(0).toUpperCase() + diff.slice(1));
  if (content) {
    content.classList.add('active');
    if (evalResults[diff]) {
      content.innerHTML = evalResults[diff].html;
    } else {
      content.innerHTML = '<div style="text-align:center; padding:40px; color:var(--text-disabled); font-size:14px;">이 난이도에서 아직 평가를 받지 않았습니다.<br>산업분야 → 난이도 선택 → 상담 → AI평가받기를 진행하세요.</div>';
    }
  }
}

function updateEvalTabs() {
  ['easy', 'medium', 'hard'].forEach(diff => {
    const scoreEl = document.getElementById('evalScore' + diff.charAt(0).toUpperCase() + diff.slice(1));
    if (scoreEl) {
      scoreEl.textContent = evalResults[diff] ? `${evalResults[diff].grade} (${evalResults[diff].score}/100점)` : '미완료';
    }
  });
}

function saveEvalResults() {
  const data = {};
  ['easy', 'medium', 'hard'].forEach(d => {
    if (evalResults[d]) data[d] = { score: evalResults[d].score, grade: evalResults[d].grade, html: evalResults[d].html };
  });
  localStorage.setItem('spin_roleplay_evals', JSON.stringify(data));
}

function loadEvalResults() {
  const data = JSON.parse(localStorage.getItem('spin_roleplay_evals') || '{}');
  ['easy', 'medium', 'hard'].forEach(d => {
    if (data[d]) evalResults[d] = data[d];
  });
  if (data.easy || data.medium || data.hard) {
    updateEvalTabs();
    const first = data.easy ? 'easy' : data.medium ? 'medium' : 'hard';
    switchEvalTab(first);
  }
}
