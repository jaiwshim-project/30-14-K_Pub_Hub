// ========== FAB DATA ==========
const fabData = [
  { text: "우리 시스템은 256비트 암호화를 사용합니다.", type: "F", explain: "제품의 사실적 특징 설명" },
  { text: "이 기능으로 데이터 보안을 강화할 수 있습니다.", type: "A", explain: "특징이 어떻게 사용되는지 설명" },
  { text: "말씀하신 고객 정보 유출 우려를 완전히 해소할 수 있습니다.", type: "B", explain: "고객의 현재니즈(EN)를 충족" },
  { text: "24시간 고객지원 센터를 운영합니다.", type: "F", explain: "서비스의 사실적 특징" },
  { text: "언제든 즉시 도움을 받을 수 있습니다.", type: "A", explain: "특징의 활용 방법" },
  { text: "말씀하신 야간 긴급 대응 문제를 해결할 수 있습니다.", type: "B", explain: "고객의 현재니즈 충족" },
  { text: "우리 소프트웨어는 모듈형 구조로 설계되었습니다.", type: "F", explain: "제품의 구조적 특징" },
  { text: "필요한 기능만 선택하여 비용을 절약할 수 있습니다.", type: "A", explain: "특징의 장점" },
  { text: "원하시는 단계적 도입이 가능하여 초기 투자 부담을 줄일 수 있습니다.", type: "B", explain: "고객의 현재니즈 충족" },
  { text: "클라우드 기반으로 어디서나 접속 가능합니다.", type: "F", explain: "기술적 특징" },
  { text: "재택근무 환경에서도 업무 연속성을 유지할 수 있습니다.", type: "A", explain: "특징의 활용" },
  { text: "말씀하신 원격 근무 시 협업 문제를 해결할 수 있습니다.", type: "B", explain: "고객의 현재니즈 충족" }
];

// ========== FAB FUNCTIONS ==========
function startFab() {
  const cards = [...fabData];
  shuffleArray(cards);
  const selected = cards.slice(0, 9);

  const container = document.getElementById('fabCards');
  container.innerHTML = '';
  document.getElementById('fabResult').style.display = 'none';

  selected.forEach((item, i) => {
    container.innerHTML += `
      <div class="fab-card" id="fabCard${i}" data-type="${item.type}" data-explain="${item.explain}">
        <p style="font-size:14px; line-height:1.6;">"${item.text}"</p>
        <div style="display:flex; gap:8px; margin-top:8px;">
          <button class="btn btn-sm btn-secondary" onclick="selectFab(${i},'F')" style="border-color:var(--blue); color:var(--blue);">특징 (F)</button>
          <button class="btn btn-sm btn-secondary" onclick="selectFab(${i},'A')" style="border-color:var(--purple); color:var(--purple);">장점 (A)</button>
          <button class="btn btn-sm btn-secondary" onclick="selectFab(${i},'B')" style="border-color:var(--green); color:var(--green);">이익 (B)</button>
        </div>
      </div>
    `;
  });
}

function selectFab(idx, type) {
  const card = document.getElementById(`fabCard${idx}`);
  card.querySelectorAll('.btn-sm').forEach(b => {
    b.style.background = 'transparent';
    b.style.color = b.style.borderColor;
  });
  const btn = card.querySelectorAll('.btn-sm')[type === 'F' ? 0 : type === 'A' ? 1 : 2];
  btn.style.background = btn.style.borderColor;
  btn.style.color = 'white';
  card.dataset.selected = type;
}

function checkFab() {
  let correct = 0;
  let total = 0;

  document.querySelectorAll('.fab-card').forEach(card => {
    const answer = card.dataset.type;
    const selected = card.dataset.selected;
    total++;

    if (selected === answer) {
      correct++;
      card.style.borderColor = 'var(--green)';
    } else {
      card.style.borderColor = 'var(--accent)';
    }

    if (!card.querySelector('.fab-explain-text')) {
      const div = document.createElement('div');
      div.className = 'fab-explain-text';
      div.style.cssText = 'margin-top:8px; font-size:12px; color:var(--gold);';
      const typeLabel = answer === 'F' ? '특징(F)' : answer === 'A' ? '장점(A)' : '이익(B)';
      div.textContent = `정답: ${typeLabel} - ${card.dataset.explain}`;
      card.appendChild(div);
    }
  });

  if (correct > 0) addScore(correct * 10, 'fab');

  const result = document.getElementById('fabResult');
  result.style.display = 'block';
  result.innerHTML = `<div class="ai-feedback"><div class="ai-label">🤖 결과</div>
    <p>${total}문제 중 <strong style="color:var(--gold);">${correct}문제</strong> 정답! (+${correct * 10}점)</p></div>`;

  addActivity(`FAB 구분: ${correct}/${total}`);
}

// Auto-init
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => startFab(), 100);
});
