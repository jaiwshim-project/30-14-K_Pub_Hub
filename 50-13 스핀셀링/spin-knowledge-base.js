// ========== SPIN Selling 지식 베이스 (RAG용) ==========
// 플랫폼의 모든 정보를 청크로 분할하여 챗봇 RAG에 활용

const SPIN_KB = [
  // ===== SPIN 방법론 핵심 =====
  { id: 'spin-1', tag: 'SPIN 방법론', tags: ['SPIN', '질문', '유형', '방법론', '개념'], content: 'SPIN Selling은 Korn Ferry(구 Huthwaite)의 35,000건 영업 상담 연구를 기반으로 한 B2B 영업 방법론입니다. S(Situation/상황), P(Problem/문제), I(Implication/시사), N(Need-Payoff/해결) 4가지 질문 유형을 순서대로 활용하여 고객의 잠재니즈를 현재니즈로 전환합니다.' },
  { id: 'spin-2', tag: '상황질문(S)', tags: ['S', '상황', 'situation', '배경', '사실'], content: '상황질문(S)은 고객의 현재 상황, 배경, 사실을 파악하는 질문입니다. 예: "현재 어떤 시스템을 사용하고 계신가요?", "팀 규모는 어떻게 되나요?". 너무 많이 하면 고객이 지루해하므로 최소한으로 사용해야 합니다. 사전 조사로 답을 알 수 있는 질문은 생략하세요.' },
  { id: 'spin-3', tag: '문제질문(P)', tags: ['P', '문제', 'problem', '어려움', '불만', '잠재니즈'], content: '문제질문(P)은 고객의 어려움, 불만, 문제점을 탐색하는 질문입니다. 예: "현재 시스템에서 불편한 점은 없으신가요?", "처리 시간이 오래 걸리는 경우가 있나요?". 잠재니즈(Implied Needs)를 끌어내는 핵심 질문이며, 고객이 인지하지 못한 문제까지 발견할 수 있어야 합니다.' },
  { id: 'spin-4', tag: '시사질문(I)', tags: ['I', '시사', 'implication', '영향', '결과', '심화'], content: '시사질문(I)은 문제의 영향과 결과를 심화시키는 질문입니다. 예: "그 문제가 팀 생산성에 어떤 영향을 미치고 있나요?", "그로 인한 추가 비용은 얼마나 되나요?". 대형 영업에서 가장 중요한 질문 유형이며, 고객이 문제의 심각성을 스스로 깨닫게 합니다. 잠재니즈를 현재니즈로 전환하는 핵심 도구입니다.' },
  { id: 'spin-5', tag: '해결질문(N)', tags: ['N', '해결', 'need-payoff', '가치', '이점', '솔루션'], content: '해결질문(N)은 해결책의 가치와 이점을 고객이 스스로 말하게 하는 질문입니다. 예: "만약 처리 시간을 50% 줄일 수 있다면 어떤 도움이 될까요?", "이 문제가 해결되면 어떤 변화가 있을까요?". 현재니즈(Explicit Needs)를 강화하고, 고객이 솔루션의 가치를 직접 표현하게 만드는 강력한 기법입니다.' },
  { id: 'spin-6', tag: '잠재니즈 vs 현재니즈', tags: ['니즈', '잠재', '현재', 'implied', 'explicit'], content: '잠재니즈(Implied Needs)는 고객이 문제, 어려움, 불만을 표현하는 것입니다("~가 어렵다", "~에 문제가 있다"). 현재니즈(Explicit Needs)는 고객이 해결책에 대한 명확한 욕구/바람을 표현하는 것입니다("~가 필요하다", "~를 원한다"). 영업의 핵심은 잠재니즈를 시사질문(I)을 통해 현재니즈로 전환하는 것입니다.' },
  { id: 'spin-7', tag: '대형 영업 vs 소형 영업', tags: ['대형', '소형', '영업', '복잡'], content: '소형 영업은 단순 제품, 1회 상담, 클로징 기법이 중요합니다. 대형 영업은 복잡한 솔루션, 다수의 의사결정자, 장기 사이클이 특징이며 SPIN 질문법이 특히 효과적입니다. I/N 질문의 비중이 높을수록 대형 영업의 성공률이 상승합니다.' },
  { id: 'spin-8', tag: 'SPIN 순서', tags: ['순서', '흐름', '단계', 'S→P→I→N'], content: 'SPIN 질문의 자연스러운 순서는 S → P → I → N입니다. 1) 상황질문(S)으로 배경 파악 → 2) 문제질문(P)으로 잠재니즈 발견 → 3) 시사질문(I)으로 문제 심화 → 4) 해결질문(N)으로 가치 확인. 이 순서를 지켜야 자연스럽게 고객이 솔루션의 필요성을 직접 표현하게 됩니다.' },

  // ===== FAB/BAF =====
  { id: 'fab-1', tag: 'FAB 정의', tags: ['FAB', 'feature', 'advantage', 'benefit', '특징', '장점', '이점'], content: 'FAB는 Feature(특징) - Advantage(장점) - Benefit(이점)의 약자로, 제품/서비스를 고객에게 설명하는 프레임워크입니다. Feature는 사실적 특성, Advantage는 그 특징이 어떻게 도움이 되는지, Benefit은 고객의 현재니즈를 충족시키는 구체적 가치입니다.' },
  { id: 'fab-2', tag: 'BAF', tags: ['BAF', '역순'], content: 'BAF는 Benefit-Advantage-Feature의 역순 제시 방법입니다. 먼저 고객 이점(Benefit)을 말하고, 장점(Advantage), 특징(Feature) 순으로 설명합니다. 고객 중심 프레젠테이션에서 더 효과적입니다. 고객은 자신에게 어떤 가치가 있는지 가장 먼저 듣고 싶어합니다.' },

  // ===== 콜플랜 =====
  { id: 'callplan-1', tag: '콜플랜 6단계', tags: ['콜플랜', 'call plan', '준비', '계획'], content: '효과적인 콜플랜은 6단계입니다: 1) 상담 목적 설정(Advance 목표) - 다음 단계로 진전시킬 구체적 행동. 2) 고객 배경 정보 정리 - 업종, 규모, 이슈. 3) SPIN 질문 준비 - S/P/I/N 각 3개씩. 4) FAB/BAF 시나리오 - 핵심 가치 제안. 5) 예상 반론 및 대응 - 고객 우려 사항. 6) 다음 단계(Advance) 계획 - 후속 미팅 일정 확보.' },
  { id: 'callplan-2', tag: 'Advance', tags: ['advance', '진전', '다음 단계'], content: 'Advance(진전)는 SPIN Selling의 핵심 개념으로, 매 미팅이 실질적으로 다음 단계로 나아가게 하는 구체적 행동을 의미합니다. 단순한 "관심 표명"이나 "긍정적 반응"이 아닌, 구체적인 다음 약속(데모, 견적 요청, 의사결정자 미팅 등)을 확보해야 진전입니다.' },

  // ===== 온톨로지 분석 =====
  { id: 'onto-1', tag: '온톨로지 역량 분석', tags: ['온톨로지', 'ontology', '약점', '역량', '진단'], content: '온톨로지 기반 역량 분석은 5단계 체계입니다: 약점 → 이슈 → 근본원인 → 전략 → 실행과제. 예를 들어, "S 과다 사용"이라는 약점은 "정보 수집에만 치중"이라는 이슈로 이어지고, 근본원인은 "니즈 개발 역량 부족"이며, 전략은 "I/N 질문 훈련"이고, 실행과제는 "주 3회 시사질문 시나리오 연습"입니다.' },
  { id: 'onto-2', tag: 'I 미사용 진단', tags: ['시사질문', '미사용', '진단', '약점'], content: 'I질문(시사질문) 미사용은 가장 흔한 약점입니다. 결과: 문제 심화 실패 → 잠재니즈가 현재니즈로 전환 안됨 → 고객이 솔루션의 필요성을 인식하지 못함. 해결: 매 P질문 후 반드시 "그 문제가 ~에 어떤 영향을 미치나요?" 패턴의 I질문을 1개 이상 던지는 훈련.' },
  { id: 'onto-3', tag: 'N 미사용 진단', tags: ['해결질문', '미사용', '진단', '약점'], content: 'N질문(해결질문) 미사용 시: 고객이 솔루션의 가치를 스스로 표현하지 않음 → 영업 담당자가 일방적으로 설득해야 함 → 설득력 저하. 해결: 시사질문 후 자연스럽게 "만약 해결된다면 어떤 도움이 될까요?" 형식의 해결질문을 던져 고객이 직접 가치를 말하게 하기.' },

  // ===== 플랫폼 사용 가이드 =====
  { id: 'plat-1', tag: '교육 흐름', tags: ['교육', '시작', '입장', '로그인'], content: '교육 시작 흐름: 1) spin-selling.vercel.app 또는 jaiwshim-project.github.io/SPIN-Selling 접속 → 2) 교육 세션(회사명) 선택 → 3) 비밀번호 입력 → 4) 역할 선택(강사/매니저/교육생) → 5) 교육생은 팀과 이름 선택 후 진입 → 6) 12가지 활동 메뉴에서 학습 진행.' },
  { id: 'plat-2', tag: '12가지 학습 활동', tags: ['활동', '12', '학습', '메뉴'], content: '플랫폼의 12가지 학습 활동: 1.프리리딩(SPIN 3.0 PDF), 2.퀴즈, 3.니즈 구분, 4.SPIN 질문구분, 5.질문 연습, 6.SPIN질문&니즈 구분, 7.FAB/BAF, 8.AI 롤플레이, 9.콜플랜 작성, 10.스핀도구들(허브), 11.사전/사후 설문, 12.AI 분석리포트.' },
  { id: 'plat-3', tag: '점수 체계', tags: ['점수', '카테고리', '만점', 'score'], content: '점수 체계: 각 문제 10점 기준. 카테고리별 만점 - 퀴즈 80, 니즈 80, 질문구분 100, 질문연습 120, 롤플레이 100, FAB 90. 총점 만점 600점. 게임 점수도 본인 점수에 누적됩니다.' },
  { id: 'plat-4', tag: '강사 권한', tags: ['강사', '매니저', '권한', '관리'], content: '강사와 교육매니저의 권한: 팀 편성, 점수 조회(스코어보드), 코칭 리포트, AI 분석리포트 생성, 온톨로지 그래프, 수료증 발급, 30일 팔로업 관리, 교육생 접속 현황 실시간 확인. 매니저는 강사와 동일 권한이지만 교육 활동에 참여하지 않습니다.' },
  { id: 'plat-5', tag: '교육생 활동', tags: ['교육생', '학습', '참여'], content: '교육생은 12가지 활동을 순서대로 또는 자유롭게 진행할 수 있습니다. 모든 활동은 점수가 자동으로 기록되며, 본인 대시보드에서 진행률 프로그레스바로 확인 가능합니다. 본인의 AI 분석리포트도 직접 조회할 수 있습니다.' },

  // ===== 학습 게임 =====
  { id: 'game-hub', tag: '학습 게임 5종', tags: ['게임', '5종', '학습', 'game'], content: '학습 게임 5종: 1) 퀴즈 레이스(10문제, 30초/문제, 콤보 보너스), 2) 매칭 게임(60초, 라운드당 4쌍 매칭), 3) 플래시카드(132개 카드, S/P/I/N 4지선다), 4) 순서 정렬(SPIN 흐름 학습, 무한 라운드), 5) 다음 질문 선택(시나리오 분석, 10문제). 모두 점수가 본인 계정에 자동 누적되며 게임 리더보드에서 Top 10과 팀별 합산을 확인할 수 있습니다.' },
  { id: 'game-1', tag: '퀴즈 레이스 게임', tags: ['퀴즈', '레이스', 'quiz race', '콤보'], content: '퀴즈 레이스 게임: SPIN 질문을 보고 30초 안에 S/P/I/N 4지선다 중 정답을 선택. 총 10문제. 정답 +10점, 연속 정답 시 콤보 보너스 +5점/연속. 시간 초과나 오답 시 콤보 리셋. 최대 약 145점.' },
  { id: 'game-2', tag: '매칭 게임', tags: ['매칭', 'matching', '짝맞추기'], content: '매칭 게임: 왼쪽 4개 질문과 오른쪽 4개 SPIN 유형 카드를 짝맞추기. 60초 시간 제한 내에 무한 라운드 진행. 라운드당 4쌍 매칭. 정답 +25점, 라운드 클리어 보너스 +50점, 오답 -5점.' },
  { id: 'game-3', tag: '플래시카드 게임', tags: ['플래시카드', 'flashcard', '4지선다'], content: '플래시카드 게임: 132개 SPIN 질문 카드 중 무작위로 표시. 질문을 보고 S/P/I/N 4지선다 중 정답 선택. 시간 제한 없음. 정답 시 유형 설명, 오답 시 본인 선택과 정답 비교 + 활용팁 제공. 정답 1개당 10점.' },
  { id: 'game-4', tag: '순서 정렬 게임', tags: ['순서', '정렬', '흐름'], content: '순서 정렬 게임: 한 산업의 4개 SPIN 질문을 무작위로 표시. S→P→I→N 순서로 정렬. 클릭한 순서대로 1, 2, 3, 4 번호 매겨짐. 무한 라운드, 정답 라운드당 50점.' },
  { id: 'game-5', tag: '다음 질문 선택 게임', tags: ['다음', '선택', '시나리오'], content: '다음 질문 선택 게임: 고객 상황과 발언을 시나리오로 제시. 그 상황에서 영업담당자가 다음에 던져야 할 SPIN 질문 유형(S/P/I/N) 선택. 총 10문제, 정답 +25점/오답 -5점. 정답 시 효과적인 예시 질문 제공.' },

  // ===== 부가 기능 =====
  { id: 'feat-1', tag: 'AI 챗봇', tags: ['챗봇', 'AI', 'bot', '도우미'], content: 'SPIN AI Bot은 Gemini 2.0 Flash API 기반의 AI 도우미입니다. 우하단 녹색 플로팅 버튼으로 모든 페이지에서 접근 가능. 교육생의 점수와 약점을 분석하여 개인화된 코칭을 제공합니다. RAG 시스템으로 플랫폼의 모든 정보(이 지식베이스)를 검색하여 답변합니다.' },
  { id: 'feat-2', tag: '수료증', tags: ['수료증', 'certificate', '인쇄', 'PDF'], content: '교육 수료증(certificate.html)은 강사 대시보드에서 발급 가능. 교육생 정보(이름, 회사, 교육일, 총점)가 자동 채워지며 A4 가로 방향으로 인쇄/PDF 저장 가능. Korn Ferry 네이비 + 골드 보더 디자인.' },
  { id: 'feat-3', tag: 'SPIN 질문 라이브러리', tags: ['라이브러리', 'library', '132', '산업'], content: 'SPIN 질문 라이브러리(spin-library.html)는 11개 산업별 132개 우수 SPIN 질문 데이터베이스입니다. 산업 필터(IT, 제조, 금융, 의료, 유통, 건설, 자동차, 에너지, 교육, 컨설팅, 식품), SPIN 유형 필터(S/P/I/N), 키워드 검색 지원. 각 질문에 활용팁 포함.' },
  { id: 'feat-4', tag: '교육 자료실', tags: ['자료실', 'materials', '카테고리'], content: '교육 자료실(materials.html)은 14개 교육 자료를 4개 카테고리(리딩/템플릿/케이스/참고)로 정리합니다. SPIN 3.0 교재, 콜플랜 템플릿, FAB 분석 시트, 산업별 영업 사례, 온톨로지 가이드 등.' },
  { id: 'feat-5', tag: '협업 보드', tags: ['협업', 'collab', '보드', '팀'], content: '팀 협업 보드(collab-board.html)는 팀별로 SPIN 질문을 함께 작성하고 공유하는 실시간 보드입니다. S/P/I/N 유형 선택 후 질문 작성, 좋아요 기능, 10초마다 자동 동기화.' },
  { id: 'feat-6', tag: '음성 롤플레이', tags: ['음성', 'voice', '롤플레이', 'AI', '대화'], content: '음성 롤플레이(voice-roleplay.html)는 Web Speech API와 Gemini AI를 결합한 실시간 음성 대화 게임입니다. 마이크로 SPIN 질문을 던지면 AI 고객이 음성으로 응답합니다. SPIN 질문 유형이 실시간으로 카운트됩니다.' },
  { id: 'feat-7', tag: '교육 통계 대시보드', tags: ['통계', 'stats', '대시보드', '분석'], content: '교육 통계 대시보드(stats-dashboard.html)는 전체 교육 이력을 통합 분석합니다. 총 교육 횟수, 교육생 수, 활동 건수, 평균 점수, 카테고리별 평균 점수 바차트, SPIN 유형별 비율, 교육 이력 테이블.' },
  { id: 'feat-8', tag: '팀 대항전', tags: ['팀', '대항전', 'battle', '실시간'], content: '팀 대항전 모드(team-battle.html)는 대형 스크린용으로 설계된 실시간 팀별 점수 경쟁 페이지입니다. 5팀 점수를 막대 그래프로 표시, 1위 팀에 골드 글로우, 10초마다 자동 갱신, 전체화면 모드 지원.' },
  { id: 'feat-9', tag: '30일 팔로업', tags: ['30일', '팔로업', 'followup', '리마인더'], content: '30일 팔로업 프로그램(followup.html)은 교육 후 4주간의 주간 리마인더 콘텐츠입니다. 1주차 S/P 질문 실전 적용, 2주차 시사질문 도전, 3주차 해결질문 + FAB, 4주차 종합 실전 + 자기 평가.' },
  { id: 'feat-10', tag: 'LMS 연동', tags: ['LMS', 'xAPI', 'export', 'CSV'], content: 'LMS 연동(lms-export.html)은 교육 데이터를 xAPI JSON 또는 CSV 형식으로 내보내 기업 LMS에 연동합니다. 수료자 명단, 6개 영역 점수, 수료 여부 등 포함.' },
  { id: 'feat-11', tag: '게임 리더보드', tags: ['리더보드', 'leaderboard', '순위', 'top'], content: '게임 리더보드(game-leaderboard.html)는 5개 게임의 Top 10 개인 순위와 팀별 합산 점수를 표시합니다. 6개 탭(전체 + 5개 게임)으로 필터링 가능, 5초마다 자동 갱신, 1~3위 메달 표시.' },
  { id: 'feat-12', tag: '다크모드', tags: ['다크', 'dark', '모드', '테마'], content: '다크모드는 푸터의 🌙 다크모드 버튼으로 토글합니다. 라이트/다크 테마 전환 시 사용자 설정이 localStorage에 저장되어 다음 방문 시에도 유지됩니다.' },
  { id: 'feat-13', tag: 'PWA 앱 설치', tags: ['PWA', '앱', '설치', '모바일'], content: 'PWA(Progressive Web App) 지원: 모바일 브라우저에서 "홈 화면에 추가" 옵션으로 앱처럼 설치 가능. 오프라인 시 기본 화면 제공. manifest.json + service worker 기반.' }
];

// 한국어 토큰화 (간단한 N-gram + 공백 분리)
function tokenize(text) {
  if (!text) return [];
  const tokens = new Set();
  // 공백 분리 단어
  text.toLowerCase().split(/[\s,.()/\[\]"'?!\-—~+:;]+/).forEach(w => { if (w.length >= 2) tokens.add(w); });
  // 2-gram (한국어 대응)
  const clean = text.replace(/\s+/g, '');
  for (let i = 0; i < clean.length - 1; i++) {
    const bg = clean.slice(i, i + 2);
    if (/[가-힣A-Za-z]{2}/.test(bg)) tokens.add(bg.toLowerCase());
  }
  return [...tokens];
}

// BM25 스타일 검색
function searchKB(query, topK) {
  topK = topK || 5;
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return [];

  const scored = SPIN_KB.map(chunk => {
    const chunkText = chunk.tag + ' ' + (chunk.tags || []).join(' ') + ' ' + chunk.content;
    const chunkTokens = tokenize(chunkText);
    const chunkSet = new Set(chunkTokens);

    let score = 0;
    queryTokens.forEach(qt => {
      if (chunkSet.has(qt)) score += 1;
      // tag 매칭은 가중치
      if (chunk.tag && chunk.tag.toLowerCase().includes(qt)) score += 3;
      if (chunk.tags && chunk.tags.some(t => t.toLowerCase() === qt)) score += 5;
    });

    return { chunk: chunk, score: score };
  });

  return scored
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map(x => x.chunk);
}

window.SPIN_KB = SPIN_KB;
window.searchKB = searchKB;
