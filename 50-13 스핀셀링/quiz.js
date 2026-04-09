// ========== QUIZ DATA ==========
const quizData = {
  concept: [
    {
      q: "Huthwaite 연구에서 밝혀진 대규모 영업(B2B)의 핵심 성공 요인은?",
      options: ["제품 특징을 많이 설명하는 것", "고객의 니즈를 심화시키는 질문을 하는 것", "가격 할인을 제시하는 것", "빠르게 해결책을 제안하는 것"],
      answer: 1,
      explain: "Huthwaite의 35,000건 이상의 영업 콜 연구 결과, 성공적인 영업사원은 질문을 통해 고객의 니즈를 심화시키는 것이 핵심이라는 것을 밝혔습니다."
    },
    {
      q: "'잠재니즈(Implied Need)'란 무엇입니까?",
      options: ["고객이 명확히 원하는 것을 표현한 것", "고객의 문제, 어려움, 불만족에 대한 표현", "영업사원이 파악한 고객의 숨겨진 요구", "고객이 예산을 확보한 상태의 니즈"],
      answer: 1,
      explain: "잠재니즈(IN)는 고객이 표현하는 문제, 어려움, 불만족입니다. '~가 걱정이다', '~에 어려움이 있다' 등으로 표현됩니다."
    },
    {
      q: "'현재니즈(Explicit Need)'란 무엇입니까?",
      options: ["현재 사용 중인 제품에 대한 불만", "고객이 표현한 바람, 욕구, 행동 의도", "영업사원이 발견한 숨은 문제", "시장에서 현재 요구되는 트렌드"],
      answer: 1,
      explain: "현재니즈(EN)는 고객이 명확히 표현한 바람, 욕구, 의도입니다. '~를 원한다', '~가 필요하다', '~를 찾고 있다' 등으로 표현됩니다."
    },
    {
      q: "잠재니즈를 현재니즈로 전환하는 이유는?",
      options: ["고객을 설득하기 위해", "해결책 제시의 효과를 높이기 위해", "빠르게 계약을 마무리하기 위해", "경쟁사 대비 우위를 확보하기 위해"],
      answer: 1,
      explain: "잠재니즈 상태에서 해결책을 제시하면 거부감이 생깁니다. 현재니즈로 충분히 전환된 후 해결책을 제시해야 고객이 수용합니다."
    },
    {
      q: "SPIN에서 가장 중요한 원칙은?",
      options: ["많은 특징을 설명한다", "고객이 더 많이 말하게 한다", "빠르게 제안한다", "가격 우위를 강조한다"],
      answer: 1,
      explain: "SPIN의 핵심 원칙은 '고객이 더 많이 말하게 하는 것'입니다. 질문을 통해 고객 스스로 니즈를 인식하고 표현하게 합니다."
    },
    {
      q: "소규모 영업과 대규모 영업의 가장 큰 차이는?",
      options: ["제품 가격의 차이", "의사결정 주기와 복잡성", "고객의 지식 수준", "영업사원의 경험"],
      answer: 1,
      explain: "대규모 영업은 의사결정 주기가 길고, 다수의 의사결정자가 관여하며, 리스크가 크기 때문에 질문을 통한 니즈 심화가 더 중요합니다."
    },
    {
      q: "성공적인 영업 콜에서 해결책은 언제 제시해야 합니까?",
      options: ["상담 초반에 바로", "고객이 질문할 때", "현재니즈가 충분히 형성된 후", "경쟁사 제안 후"],
      answer: 2,
      explain: "잠재니즈가 현재니즈로 충분히 전환된 후에 해결책을 제시해야 합니다. 너무 빠른 제안은 거부감을 유발합니다."
    },
    {
      q: "Huthwaite 연구에서 분석한 영업 콜 수는 약?",
      options: ["5,000건", "15,000건", "35,000건", "50,000건"],
      answer: 2,
      explain: "Huthwaite는 23개국, 27개 산업에서 35,000건 이상의 영업 콜을 분석하여 SPIN 방법론을 개발했습니다."
    }
  ],
  buyingCycle: [
    {
      q: "구매사이클(Buying Cycle)의 첫 번째 단계는?",
      options: ["옵션 평가", "니즈 인식", "우려 해소", "실행"],
      answer: 1,
      explain: "구매사이클: 니즈인식(RoN) → 옵션평가(EoO) → 우려해소(RoC) → 실행(Implementation)"
    },
    {
      q: "구매사이클에서 '옵션 평가(EoO)' 단계의 특징은?",
      options: ["고객이 문제를 인식하기 시작함", "다양한 해결방안을 비교 검토함", "구매 후 불안감을 느낌", "새로운 시스템을 도입함"],
      answer: 1,
      explain: "옵션 평가 단계에서 고객은 자신의 니즈를 충족할 다양한 방안을 비교 검토합니다."
    },
    {
      q: "구매사이클에서 '우려 해소(RoC)' 단계에서 고객이 느끼는 것은?",
      options: ["흥분과 기대", "위험과 불안", "완전한 만족", "무관심"],
      answer: 1,
      explain: "우려 해소 단계에서 고객은 결정에 대한 위험과 불안을 느낍니다. 이때 영업사원은 이를 적절히 대처해야 합니다."
    },
    {
      q: "'시간에 따른 변화(Changes Over Time)'란?",
      options: ["계약 기간의 변경", "고객의 니즈와 우선순위가 시간에 따라 변하는 것", "가격 인상", "제품 업데이트"],
      answer: 1,
      explain: "고객의 니즈, 우선순위, 상황은 시간에 따라 변합니다. 영업사원은 이 변화를 인식하고 대응해야 합니다."
    },
    {
      q: "SPIN 질문이 가장 효과적인 구매사이클 단계는?",
      options: ["옵션 평가", "니즈 인식", "우려 해소", "실행"],
      answer: 1,
      explain: "SPIN 질문은 '니즈 인식' 단계에서 가장 효과적입니다. 고객이 자신의 문제와 니즈를 인식하도록 도와줍니다."
    }
  ],
  spinType: [
    {
      q: "'현재 어떤 시스템을 사용하고 계십니까?'는 어떤 유형의 질문입니까?",
      options: ["상황질문(S)", "문제질문(P)", "시사질문(I)", "해결질문(N)"],
      answer: 0,
      explain: "상황질문(S)은 고객의 현재 상황, 배경, 사실을 파악하는 질문입니다."
    },
    {
      q: "'그 부분에서 어려움은 없으십니까?'는 어떤 유형의 질문입니까?",
      options: ["상황질문(S)", "문제질문(P)", "시사질문(I)", "해결질문(N)"],
      answer: 1,
      explain: "문제질문(P)은 고객의 문제, 어려움, 불만족을 탐색하는 질문입니다."
    },
    {
      q: "'그 문제로 인해 다른 부서에도 영향이 있지 않습니까?'는 어떤 유형입니까?",
      options: ["상황질문(S)", "문제질문(P)", "시사질문(I)", "해결질문(N)"],
      answer: 2,
      explain: "시사질문(I)은 문제의 영향, 결과, 파급효과를 탐색하여 문제의 심각성을 인식시키는 질문입니다."
    },
    {
      q: "'만약 이 문제가 해결된다면 어떤 도움이 되겠습니까?'는 어떤 유형입니까?",
      options: ["상황질문(S)", "문제질문(P)", "시사질문(I)", "해결질문(N)"],
      answer: 3,
      explain: "해결질문(N)은 해결책의 가치와 유용성을 고객 스스로 말하게 하는 질문입니다."
    },
    {
      q: "상황질문(S)을 너무 많이 하면 어떤 문제가 발생합니까?",
      options: ["고객이 편안해진다", "고객이 지루해하고 방어적이 된다", "니즈가 빨리 파악된다", "영업 성공률이 높아진다"],
      answer: 1,
      explain: "상황질문이 과도하면 고객은 심문받는 느낌을 받아 방어적이 됩니다. 꼭 필요한 만큼만 사용해야 합니다."
    },
    {
      q: "시사질문(I)의 가장 중요한 역할은?",
      options: ["고객의 배경을 파악한다", "문제를 발견한다", "문제의 심각성과 영향을 확대한다", "해결책을 제안한다"],
      answer: 2,
      explain: "시사질문은 발견된 문제의 영향과 결과를 탐색하여, 잠재니즈를 현재니즈로 전환하는 데 핵심적인 역할을 합니다."
    },
    {
      q: "해결질문(N)의 효과는?",
      options: ["문제를 발견한다", "고객이 해결책의 가치를 스스로 말하게 한다", "새로운 문제를 탐색한다", "가격 협상을 시작한다"],
      answer: 1,
      explain: "해결질문은 고객이 해결책의 가치와 유용성을 스스로 표현하게 하여, 자연스럽게 제안을 수용하게 만듭니다."
    },
    {
      q: "SPIN 질문의 올바른 순서는?",
      options: ["P→S→N→I", "S→P→I→N", "I→P→S→N", "N→I→P→S"],
      answer: 1,
      explain: "SPIN: 상황(S) → 문제(P) → 시사(I) → 해결(N) 순서로 진행하며, 상황에 따라 유연하게 조합합니다."
    }
  ],
  advanced: [
    {
      q: "영업에서 '특징(Feature)'과 '이익(Benefit)'의 가장 큰 차이는?",
      options: ["가격 차이", "특징은 제품 설명이고 이익은 고객의 현재니즈를 충족시키는 것", "설명하는 시점의 차이", "고객의 관심 차이"],
      answer: 1,
      explain: "특징(F)은 제품의 사실적 설명, 이익(B)은 고객이 표현한 현재니즈(EN)를 충족시키는 방법입니다."
    },
    {
      q: "성공적인 상담의 마무리(Closing) 방법은?",
      options: ["강력한 클로징 기법 사용", "가격 할인 제시", "SMART 기준에 맞는 진전(Advance) 약속", "다음 미팅 일정 확인만"],
      answer: 2,
      explain: "대규모 영업에서는 SMART(구체적, 측정 가능, 고객 행동 중심, 현실적, 시간 기반) 기준의 진전을 약속해야 합니다."
    },
    {
      q: "'진전(Advance)'과 '지속(Continuation)'의 차이는?",
      options: ["같은 의미이다", "진전은 판매 과정이 앞으로 나아가는 것, 지속은 제자리인 것", "진전은 계약, 지속은 미팅", "차이가 없다"],
      answer: 1,
      explain: "진전(Advance)은 판매를 앞으로 움직이는 구체적 행동이고, 지속(Continuation)은 아무런 진척 없이 관계만 유지하는 것입니다."
    },
    {
      q: "고객의 우려(Concern)에 대처하는 올바른 방법은?",
      options: ["무시하고 장점을 강조한다", "인정하고 탐색 질문으로 이해한다", "즉시 가격을 낮춘다", "경쟁사를 비방한다"],
      answer: 1,
      explain: "고객의 우려는 무시하면 안 됩니다. 인정하고, 탐색 질문을 통해 진짜 이유를 이해한 후 적절히 대응해야 합니다."
    },
    {
      q: "콜 플랜(Call Plan)에서 가장 먼저 해야 할 것은?",
      options: ["제품 프레젠테이션 준비", "진전 목표(Advance) 설정", "경쟁사 분석", "가격표 확인"],
      answer: 1,
      explain: "콜 플랜의 첫 번째 단계는 이번 상담에서 달성할 구체적인 진전 목표를 설정하는 것입니다."
    },
    {
      q: "BAF 순서의 의미는?",
      options: ["Buy-Assign-Follow", "Benefit-Advantage-Feature", "Big-Average-Fine", "Before-After-Future"],
      answer: 1,
      explain: "BAF는 이익(B)→장점(A)→특징(F) 순서로 제시하는 것으로, 고객의 니즈를 먼저 언급한 후 해결 방법과 특징을 설명합니다."
    }
  ]
};

// ========== QUIZ SCORE TRACKING ==========
const quizMaxScores = { concept: 80, buyingCycle: 50, spinType: 80, advanced: 60, all: 150 };

function saveQuizScore(category, correct, total) {
  const scores = JSON.parse(localStorage.getItem('spin_quiz_scores') || '{}');
  const earned = correct * 10;
  // 최고 점수 유지
  if (!scores[category] || earned > scores[category].earned) {
    scores[category] = { earned, max: total * 10, correct, total };
  }
  localStorage.setItem('spin_quiz_scores', JSON.stringify(scores));
  updateScoreDisplay();
}

function updateScoreDisplay() {
  const scores = JSON.parse(localStorage.getItem('spin_quiz_scores') || '{}');
  const cats = ['concept', 'buyingCycle', 'spinType', 'advanced', 'all'];

  cats.forEach(cat => {
    const scoreEl = document.getElementById('score-' + cat);
    const cardEl = document.querySelector(`.quiz-cat-card[data-cat="${cat}"]`);
    if (!scoreEl || !cardEl) return;

    const max = quizMaxScores[cat];
    if (scores[cat]) {
      scoreEl.textContent = `${scores[cat].earned} / ${max}`;
      cardEl.classList.add('completed');
    } else {
      scoreEl.textContent = `0 / ${max}`;
      cardEl.classList.remove('completed');
    }
  });
}

// ========== QUIZ FUNCTIONS ==========
function startQuiz(category) {
  state.currentQuizCategory = category;
  let questions;
  if (category === 'all') {
    questions = [...quizData.concept, ...quizData.buyingCycle, ...quizData.spinType, ...quizData.advanced];
    shuffleArray(questions);
    questions = questions.slice(0, 15);
  } else {
    questions = [...quizData[category]];
    shuffleArray(questions);
  }

  state.currentQuizQuestions = questions;
  state.currentQuizIdx = 0;
  state.currentQuiz = { correct: 0, total: questions.length };

  document.getElementById('quizArea').style.display = 'block';
  showQuizQuestion();
}

function showQuizQuestion() {
  const idx = state.currentQuizIdx;
  const q = state.currentQuizQuestions[idx];
  const total = state.currentQuizQuestions.length;

  document.getElementById('quizBarFill').style.width = ((idx / total) * 100) + '%';
  document.getElementById('quizCount').textContent = `${idx + 1} / ${total}`;
  document.getElementById('quizQuestion').textContent = q.q;
  document.getElementById('quizExplain').style.display = 'none';
  document.getElementById('quizNextBtn').style.display = 'none';

  const optionsDiv = document.getElementById('quizOptions');
  optionsDiv.innerHTML = '';

  q.options.forEach((opt, i) => {
    const div = document.createElement('div');
    div.className = 'quiz-option';
    div.textContent = opt;
    div.onclick = () => selectQuizAnswer(i);
    optionsDiv.appendChild(div);
  });
}

function selectQuizAnswer(selected) {
  const q = state.currentQuizQuestions[state.currentQuizIdx];
  const options = document.querySelectorAll('.quiz-option');

  options.forEach((opt, i) => {
    opt.onclick = null;
    if (i === q.answer) opt.classList.add('correct');
    if (i === selected && selected !== q.answer) opt.classList.add('wrong');
  });

  if (selected === q.answer) {
    state.currentQuiz.correct++;
    addScore(10, 'quiz');
  }

  document.getElementById('quizExplain').textContent = q.explain;
  document.getElementById('quizExplain').style.display = 'block';
  document.getElementById('quizNextBtn').style.display = 'inline-flex';

  state.quizCorrect += (selected === q.answer) ? 1 : 0;
  state.quizTotal++;
}

function nextQuiz() {
  state.currentQuizIdx++;
  if (state.currentQuizIdx >= state.currentQuizQuestions.length) {
    const score = state.currentQuiz.correct;
    const total = state.currentQuiz.total;
    document.getElementById('quizFinalScore').textContent = `${score} / ${total}`;
    document.getElementById('quizFinalMsg').textContent =
      score === total ? '완벽합니다! 모든 문제를 맞추셨습니다!' :
      score >= total * 0.8 ? '훌륭합니다! 핵심 개념을 잘 이해하고 계십니다.' :
      score >= total * 0.6 ? '좋습니다! 몇 가지 개념을 복습하면 더 좋겠습니다.' :
      '핵심 개념을 다시 한번 복습해보세요.';
    document.getElementById('quizResultModal').classList.add('active');
    document.getElementById('quizArea').style.display = 'none';
    saveQuizScore(state.currentQuizCategory, score, total);
    addActivity(`퀴즈 완료: ${score}/${total} (${Math.round(score/total*100)}%)`);
    return;
  }
  showQuizQuestion();
}

// 페이지 로드 시 점수 복원
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => updateScoreDisplay(), 200);
});
