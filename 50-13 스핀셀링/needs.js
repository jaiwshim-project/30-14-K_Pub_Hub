// ========== NEEDS DATA ==========
const needsData = [
  { text: "요즘 재고 관리가 너무 복잡해서 골치가 아프다.", type: "IN", explain: "불만족/어려움의 표현 = 잠재니즈" },
  { text: "생산성을 최소 20% 이상 높일 수 있는 시스템이 필요합니다.", type: "EN", explain: "명확한 바람/욕구의 표현 = 현재니즈" },
  { text: "직원들이 새 시스템 교육에 시간을 너무 많이 빼앗긴다.", type: "IN", explain: "문제/어려움의 표현 = 잠재니즈" },
  { text: "납기 지연 문제를 해결할 수 있는 솔루션을 찾고 있습니다.", type: "EN", explain: "행동 의도의 표현 = 현재니즈" },
  { text: "현재 수작업 프로세스로 인해 오류가 자주 발생합니다.", type: "IN", explain: "문제의 표현 = 잠재니즈" },
  { text: "실시간으로 재고 상황을 볼 수 있으면 좋겠습니다.", type: "EN", explain: "바람의 표현 = 현재니즈" },
  { text: "매달 보고서 작성하는 데 3일이나 걸린다.", type: "IN", explain: "어려움의 표현 = 잠재니즈" },
  { text: "고객 응대 시간을 절반으로 줄이고 싶습니다.", type: "EN", explain: "욕구의 표현 = 현재니즈" },
  { text: "영업팀 간 정보 공유가 안 돼서 같은 고객에게 중복 연락하는 경우가 있다.", type: "IN", explain: "문제의 표현 = 잠재니즈" },
  { text: "모바일에서도 바로 승인 처리할 수 있는 기능이 꼭 있어야 합니다.", type: "EN", explain: "명확한 요구의 표현 = 현재니즈" },
  { text: "경쟁사보다 견적 응답 시간이 2배나 느리다.", type: "IN", explain: "문제의 표현 = 잠재니즈" },
  { text: "데이터 분석을 자동화하여 의사결정 속도를 높이고 싶습니다.", type: "EN", explain: "바람/의도의 표현 = 현재니즈" },
  { text: "요즘 품질 관련 클레임이 증가하고 있어서 걱정입니다.", type: "IN", explain: "걱정의 표현 = 잠재니즈" },
  { text: "통합 대시보드를 통해 전사 KPI를 한 눈에 보고 싶습니다.", type: "EN", explain: "바람의 표현 = 현재니즈" },
  { text: "신입 직원 온보딩에 3개월이나 걸려서 비효율적이다.", type: "IN", explain: "불만족의 표현 = 잠재니즈" },
  { text: "클라우드 기반으로 전환하여 IT 인프라 비용을 절감하려고 합니다.", type: "EN", explain: "행동 의도의 표현 = 현재니즈" }
];

// ========== NEEDS FUNCTIONS ==========
function startNeeds() {
  const cards = [...needsData];
  shuffleArray(cards);
  const selected = cards.slice(0, 8);

  const container = document.getElementById('needsCards');
  container.innerHTML = '';
  document.getElementById('needsResult').style.display = 'none';

  selected.forEach((item, i) => {
    container.innerHTML += `
      <div class="need-card" id="needCard${i}" data-type="${item.type}" data-explain="${item.explain}">
        <p style="font-size:14px; line-height:1.6; margin-bottom:4px;">"${item.text}"</p>
        <div class="need-btns">
          <button class="need-btn in" onclick="selectNeed(${i},'IN')">잠재니즈 (IN)</button>
          <button class="need-btn en" onclick="selectNeed(${i},'EN')">현재니즈 (EN)</button>
        </div>
      </div>
    `;
  });
}

function selectNeed(idx, type) {
  const card = document.getElementById(`needCard${idx}`);
  card.querySelectorAll('.need-btn').forEach(b => b.classList.remove('active'));
  card.querySelector(`.need-btn.${type.toLowerCase()}`).classList.add('active');
  card.dataset.selected = type;
}

function showNeedsAnswers() {
  let correct = 0;
  let total = 0;

  document.querySelectorAll('.need-card').forEach(card => {
    const answer = card.dataset.type;
    const selected = card.dataset.selected;
    total++;

    if (selected === answer) {
      card.classList.add('correct');
      correct++;
    } else {
      card.classList.add('wrong');
    }

    const explain = card.dataset.explain;
    if (!card.querySelector('.need-explain')) {
      const div = document.createElement('div');
      div.className = 'need-explain';
      div.style.cssText = 'margin-top:8px; font-size:12px; color:var(--gold); font-weight:600;';
      div.textContent = `정답: ${answer} - ${explain}`;
      card.appendChild(div);
    }
  });

  if (correct > 0) addScore(correct * 10, 'needs');

  const result = document.getElementById('needsResult');
  result.style.display = 'block';
  result.innerHTML = `<div class="ai-feedback"><div class="ai-label">🤖 결과</div>
    <p>${total}문제 중 <strong style="color:var(--gold);">${correct}문제</strong> 정답! (+${correct * 10}점)</p></div>`;

  addActivity(`IN/EN 구분: ${correct}/${total}`);
}

// Auto-init
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => startNeeds(), 100);
});
