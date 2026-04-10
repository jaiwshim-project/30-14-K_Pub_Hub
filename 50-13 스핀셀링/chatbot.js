// ========== SPIN Selling AI Chatbot (Gemini RAG) ==========
(function() {
  'use strict';

  const GEMINI_KEY = 'AIzaSyDmQRNn9M3ExdtlKyW68tXN6P47eufsiWk';
  const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + GEMINI_KEY;

  const SPIN_KNOWLEDGE = `당신은 Korn Ferry 공인 SPIN Selling AI 교육 도우미입니다.
SPIN Selling 방법론과 이 교육 플랫폼 사용법에 대해 전문적으로 답변합니다.
반드시 한국어로 답변하고, 간결하면서도 실용적인 조언을 제공하세요.

=== SPIN Selling 핵심 지식 ===

【SPIN 질문 유형】
S (Situation/상황질문): 고객의 현재 상황, 배경, 사실을 파악하는 질문
- 목적: 고객의 현재 상태를 이해
- 예시: "현재 어떤 시스템을 사용하고 계시나요?", "영업팀 규모는 어떻게 되나요?"
- 주의: 너무 많으면 고객이 지루해함. 최소한으로 사용

P (Problem/문제질문): 고객의 어려움, 불만, 문제점을 탐색하는 질문
- 목적: 잠재니즈(Implied Needs) 발견
- 예시: "현재 시스템에서 불편한 점은 없으신가요?", "처리 시간이 오래 걸리는 경우가 있나요?"
- 잠재니즈를 끌어내는 핵심 질문

I (Implication/시사질문): 문제의 영향과 결과를 심화시키는 질문
- 목적: 잠재니즈를 현재니즈로 발전시킴 (문제의 심각성 인식)
- 예시: "그 문제가 팀 생산성에 어떤 영향을 미치고 있나요?", "그로 인한 추가 비용은 얼마나 되나요?"
- 대형 영업에서 가장 중요한 질문. 고객이 문제의 심각성을 스스로 깨닫게 함

N (Need-Payoff/해결질문): 해결책의 가치와 이점을 고객이 스스로 말하게 하는 질문
- 목적: 현재니즈(Explicit Needs)를 강화, 고객이 솔루션의 가치를 직접 표현
- 예시: "만약 처리 시간을 50% 줄일 수 있다면 어떤 도움이 될까요?", "이 문제가 해결되면 어떤 변화가 있을까요?"
- 고객이 스스로 솔루션의 필요성을 말하게 하는 강력한 기법

【니즈 구분】
잠재니즈 (Implied Needs): 고객이 문제, 어려움, 불만을 표현하는 것
- "~가 어렵다", "~에 문제가 있다", "~가 불만이다"
현재니즈 (Explicit Needs): 고객이 해결책에 대한 명확한 욕구/바람을 표현하는 것
- "~가 필요하다", "~를 원한다", "~를 찾고 있다"

【SPIN과 구매 사이클】
1. 니즈 인식 단계: S→P 질문으로 잠재니즈 발견
2. 대안 평가 단계: I 질문으로 문제 심화, N 질문으로 해결 가치 확인
3. 의구심 해소 단계: FAB/BAF로 제안
4. 의사결정 단계: 클로징

【FAB vs BAF】
FAB (Feature-Advantage-Benefit):
- Feature(특징): 제품/서비스의 사실적 특성
- Advantage(장점): 그 특징이 어떻게 도움이 되는지
- Benefit(이점): 고객의 현재니즈를 충족시키는 구체적 가치

BAF (Benefit-Advantage-Feature): 역순 제시
- 먼저 고객 이점을 말하고, 장점, 특징 순으로 설명
- 고객 중심 프레젠테이션에 더 효과적

【콜플랜 (Call Plan)】
효과적인 영업 상담 준비의 6단계:
1. 상담 목적 설정 (Advance 목표)
2. 고객 배경 정보 정리
3. SPIN 질문 준비 (S→P→I→N 순서)
4. FAB/BAF 시나리오 준비
5. 예상 반론 및 대응 준비
6. 다음 단계(Advance) 계획

【대형 영업 vs 소형 영업】
- 소형 영업: 단순 제품, 1회 상담, 클로징 기법 중요
- 대형 영업: 복잡한 솔루션, 다수 의사결정자, 장기 사이클
  → SPIN이 특히 효과적. I/N 질문의 비중이 높을수록 성공률 상승

【온톨로지 기반 역량 분석】
약점 → 이슈 → 근본원인 → 전략 → 실행과제
- S 과다 사용 → 정보 수집에만 치중 → 니즈 개발 역량 부족 → I/N 질문 훈련 필요
- I 미사용 → 문제 심화 실패 → 잠재니즈가 현재니즈로 전환 안됨 → 시사질문 시나리오 연습
- N 미사용 → 고객이 솔루션 가치를 말하지 않음 → 해결질문 활용법 학습

=== 플랫폼 사용 가이드 ===

【접속 방법】
1. spin-selling.vercel.app 접속
2. 교육 세션 선택 (비밀번호 입력)
3. 역할 선택: 강사/교육매니저/교육생
4. 교육생은 팀과 이름을 선택하여 입장

【12가지 학습 활동】
1. 프리리딩: SPIN 3.0 교재 PDF 미리 읽기 (로그인 불필요)
2. 퀴즈: SPIN 개념, 구매사이클, 질문유형, 고급 문제
3. 니즈 구분: 잠재니즈/현재니즈 식별 연습
4. SPIN 질문 구분: 시나리오 속 질문이 S/P/I/N 중 무엇인지 분류
5. 질문 연습: 11개 산업별 시나리오로 SPIN 질문 직접 작성
6. SPIN질문&니즈 구분: 대화에서 질문 유형과 니즈를 동시에 분석
7. FAB/BAF: 특징-장점-이점 연습
8. 롤플레이: AI 고객과 실전 대화 연습 (10개 산업, 3단계 난이도)
9. 콜플랜 작성: 6개 섹션 콜플랜 + AI 평가
10. 스핀도구들: 스코어보드, 코칭리포트, AI분석리포트
11. 사전/사후 설문조사
12. AI 분석리포트: 개인별 역량 진단 + 이메일 발송

【점수 체계】
- 각 문제 10점, 카테고리별 만점이 다름
- 퀴즈: 80점, 니즈: 80점, 시나리오: 100점, 질문연습: 120점, 롤플레이: 100점, FAB: 90점
- 총점: 600점 만점

답변 시 참고:
- 구체적인 예시를 들어 설명하세요
- SPIN 질문 작성법을 물으면 산업/상황에 맞는 예시를 제공하세요
- 플랫폼 기능 질문에는 단계별로 안내하세요
- 모르는 내용은 솔직히 말하세요`;

  let isOpen = false;
  let isLoading = false;
  let chatHistory = [];

  // === UI 생성 ===
  function createChatbotUI() {
    const container = document.createElement('div');
    container.id = 'chatbot-container';
    container.innerHTML = `
    <style>
      #chatbot-container { --cb-primary: #0a2240; --cb-primary-hover: #0d2d52; --cb-gold: #f5a623; --cb-bg: #ffffff; --cb-surface: #f8fafc; --cb-border: #e2e8f0; --cb-text: #1e293b; --cb-text2: #64748b; --cb-user-bg: #0a2240; --cb-ai-bg: #f1f5f9; --cb-shadow: 0 20px 60px rgba(0,0,0,0.18); --cb-font: 'Noto Sans KR', 'Inter', -apple-system, sans-serif; }
      .cb-toggle { position:fixed; bottom:24px; right:24px; width:60px; height:60px; border-radius:50%; background:linear-gradient(135deg, var(--cb-primary), #0d3161); color:white; border:none; cursor:pointer; box-shadow:0 4px 20px rgba(10,34,64,0.4); display:flex; align-items:center; justify-content:center; transition:all 0.3s cubic-bezier(0.4,0,0.2,1); z-index:10000; }
      .cb-toggle:hover { transform:scale(1.08); box-shadow:0 6px 28px rgba(10,34,64,0.5); }
      .cb-toggle svg { width:26px; height:26px; transition:transform 0.3s; }
      .cb-toggle.active .cb-icon-chat { display:none; }
      .cb-toggle.active .cb-icon-close { display:block; }
      .cb-toggle .cb-icon-close { display:none; }
      .cb-window { position:fixed; bottom:100px; right:24px; width:400px; height:560px; background:var(--cb-bg); border-radius:20px; box-shadow:var(--cb-shadow); display:flex; flex-direction:column; overflow:hidden; z-index:9999; transform:translateY(20px) scale(0.95); opacity:0; visibility:hidden; transition:all 0.3s cubic-bezier(0.4,0,0.2,1); border:1px solid var(--cb-border); }
      .cb-window.open { transform:translateY(0) scale(1); opacity:1; visibility:visible; }
      .cb-header { padding:16px 20px; background:linear-gradient(135deg, var(--cb-primary), #0d3161); display:flex; align-items:center; justify-content:space-between; }
      .cb-header-info { display:flex; align-items:center; gap:12px; }
      .cb-header-avatar { width:36px; height:36px; border-radius:50%; background:rgba(255,255,255,0.15); display:flex; align-items:center; justify-content:center; font-size:18px; }
      .cb-header-title { font-family:var(--cb-font); font-size:15px; font-weight:700; color:#ffffff; }
      .cb-header-status { font-family:var(--cb-font); font-size:11px; color:rgba(255,255,255,0.8); display:flex; align-items:center; gap:4px; }
      .cb-header-dot { width:6px; height:6px; border-radius:50%; background:#2ecc71; }
      .cb-header-close { background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); cursor:pointer; color:white; padding:6px; border-radius:8px; transition:background 0.2s; display:flex; align-items:center; justify-content:center; }
      .cb-header-close:hover { background:rgba(255,255,255,0.2); }
      .cb-messages { flex:1; overflow-y:auto; padding:16px 16px; display:flex; flex-direction:column; gap:12px; background:var(--cb-surface); }
      .cb-messages::-webkit-scrollbar { width:4px; }
      .cb-messages::-webkit-scrollbar-thumb { background:var(--cb-border); border-radius:2px; }
      .cb-msg { display:flex; gap:8px; max-width:88%; animation:cbFadeIn 0.3s ease; }
      .cb-msg.user { align-self:flex-end; flex-direction:row-reverse; }
      .cb-msg.ai { align-self:flex-start; }
      .cb-avatar { width:28px; height:28px; border-radius:50%; background:var(--cb-primary); color:white; display:flex; align-items:center; justify-content:center; font-size:13px; flex-shrink:0; }
      .cb-bubble { padding:10px 14px; border-radius:16px; font-family:var(--cb-font); font-size:13.5px; line-height:1.65; word-break:break-word; }
      .cb-msg.user .cb-bubble { background:var(--cb-user-bg); color:#ffffff; border-bottom-right-radius:4px; }
      .cb-msg.ai .cb-bubble { background:var(--cb-ai-bg); color:var(--cb-text); border-bottom-left-radius:4px; }
      .cb-bubble strong { font-weight:700; }
      .cb-bubble code { background:rgba(0,0,0,0.06); padding:1px 5px; border-radius:4px; font-size:12px; font-family:'Consolas',monospace; }
      .cb-bubble pre { background:#1e293b; color:#e2e8f0; padding:10px 12px; border-radius:8px; overflow-x:auto; font-size:12px; margin:8px 0; }
      .cb-bubble ul, .cb-bubble ol { margin:6px 0; padding-left:18px; }
      .cb-bubble li { margin:2px 0; }
      .cb-typing { display:flex; gap:4px; padding:10px 14px; background:var(--cb-ai-bg); border-radius:16px; border-bottom-left-radius:4px; width:fit-content; }
      .cb-typing-dot { width:7px; height:7px; border-radius:50%; background:var(--cb-text2); animation:cbBounce 1.4s ease-in-out infinite; }
      .cb-typing-dot:nth-child(2) { animation-delay:0.2s; }
      .cb-typing-dot:nth-child(3) { animation-delay:0.4s; }
      @keyframes cbBounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-6px)} }
      @keyframes cbFadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
      .cb-input-area { padding:12px 16px; background:var(--cb-bg); border-top:1px solid var(--cb-border); display:flex; align-items:flex-end; gap:8px; }
      .cb-input { flex:1; border:1.5px solid var(--cb-border); border-radius:12px; padding:10px 14px; font-family:var(--cb-font); font-size:13.5px; color:var(--cb-text); background:var(--cb-surface); outline:none; resize:none; max-height:80px; min-height:40px; transition:border-color 0.2s; line-height:1.5; }
      .cb-input:focus { border-color:var(--cb-primary); }
      .cb-input::placeholder { color:var(--cb-text2); }
      .cb-send { width:40px; height:40px; border-radius:50%; background:var(--cb-primary); color:white; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s; flex-shrink:0; }
      .cb-send:hover { background:var(--cb-primary-hover); }
      .cb-send:disabled { background:var(--cb-border); cursor:not-allowed; }
      .cb-welcome { text-align:center; padding:32px 20px; }
      .cb-welcome-icon { font-size:48px; margin-bottom:12px; }
      .cb-welcome-title { font-size:16px; font-weight:700; color:var(--cb-text); margin-bottom:6px; font-family:var(--cb-font); }
      .cb-welcome-desc { font-size:13px; color:var(--cb-text2); line-height:1.6; font-family:var(--cb-font); margin-bottom:16px; }
      .cb-suggestions { display:flex; flex-direction:column; gap:6px; }
      .cb-suggest-btn { background:white; border:1.5px solid var(--cb-border); border-radius:10px; padding:8px 14px; font-family:var(--cb-font); font-size:12px; color:var(--cb-text); cursor:pointer; text-align:left; transition:all 0.2s; }
      .cb-suggest-btn:hover { border-color:var(--cb-primary); background:#f0f3f8; }
      .cb-badge { position:absolute; top:-4px; right:-4px; width:18px; height:18px; border-radius:50%; background:var(--cb-gold); color:var(--cb-primary); font-size:10px; font-weight:800; display:flex; align-items:center; justify-content:center; display:none; }
      @media(max-width:480px) { .cb-window { bottom:0; right:0; width:100%; height:100%; border-radius:0; } .cb-toggle { bottom:16px; right:16px; } }
    </style>
    <button class="cb-toggle" id="cbToggle" aria-label="SPIN AI 채팅">
      <svg class="cb-icon-chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      <svg class="cb-icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <div class="cb-window" id="cbWindow">
      <div class="cb-header">
        <div class="cb-header-info">
          <div class="cb-header-avatar">🤖</div>
          <div>
            <div class="cb-header-title">SPIN AI 도우미</div>
            <div class="cb-header-status"><span class="cb-header-dot"></span> 온라인</div>
          </div>
        </div>
        <button class="cb-header-close" id="cbClose" aria-label="닫기">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div class="cb-messages" id="cbMessages">
        <div class="cb-welcome" id="cbWelcome">
          <div class="cb-welcome-icon">🎓</div>
          <div class="cb-welcome-title">SPIN Selling AI 도우미</div>
          <div class="cb-welcome-desc">SPIN Selling 방법론과 플랫폼 사용법에 대해<br>무엇이든 물어보세요!</div>
          <div class="cb-suggestions">
            <button class="cb-suggest-btn" onclick="window._cbSuggest(this.textContent)">💡 SPIN 질문 유형의 차이점을 알려주세요</button>
            <button class="cb-suggest-btn" onclick="window._cbSuggest(this.textContent)">📝 시사질문(I)을 잘 만드는 방법은?</button>
            <button class="cb-suggest-btn" onclick="window._cbSuggest(this.textContent)">🎯 잠재니즈와 현재니즈의 차이는?</button>
            <button class="cb-suggest-btn" onclick="window._cbSuggest(this.textContent)">🎭 롤플레이에서 높은 점수 받는 팁</button>
          </div>
        </div>
      </div>
      <div class="cb-input-area">
        <textarea class="cb-input" id="cbInput" placeholder="SPIN Selling에 대해 물어보세요..." rows="1"></textarea>
        <button class="cb-send" id="cbSend" aria-label="전송">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
    </div>`;
    document.body.appendChild(container);
  }

  // === 마크다운 렌더링 ===
  function renderMd(text) {
    return text
      .replace(/```(\w*)\n([\s\S]*?)```/g, function(m, lang, code) { return '<pre><code>' + code.replace(/</g,'&lt;') + '</code></pre>'; })
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^- (.+)/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
      .replace(/\n/g, '<br>');
  }

  // === 메시지 추가 ===
  function addMsg(content, role) {
    const welcome = document.getElementById('cbWelcome');
    if (welcome) welcome.remove();

    const msgs = document.getElementById('cbMessages');
    const div = document.createElement('div');
    div.className = 'cb-msg ' + role;

    if (role === 'ai') {
      div.innerHTML = '<div class="cb-avatar">🤖</div><div class="cb-bubble">' + renderMd(content) + '</div>';
    } else {
      div.innerHTML = '<div class="cb-bubble">' + content.replace(/</g,'&lt;').replace(/\n/g,'<br>') + '</div>';
    }
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function showTyping() {
    const msgs = document.getElementById('cbMessages');
    const div = document.createElement('div');
    div.className = 'cb-msg ai';
    div.id = 'cbTyping';
    div.innerHTML = '<div class="cb-avatar">🤖</div><div class="cb-typing"><div class="cb-typing-dot"></div><div class="cb-typing-dot"></div><div class="cb-typing-dot"></div></div>';
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function hideTyping() {
    const t = document.getElementById('cbTyping');
    if (t) t.remove();
  }

  // === Gemini API 호출 ===
  async function callGemini(userMsg) {
    const contents = [
      { role: 'user', parts: [{ text: SPIN_KNOWLEDGE + '\n\n---\n\n사용자 질문: ' + (chatHistory.length === 0 ? '' : '이전 대화:\n' + chatHistory.slice(-8).map(h => h.role + ': ' + h.content).join('\n') + '\n\n현재 질문: ') + userMsg }] }
    ];

    const res = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: contents,
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 1024,
          topP: 0.9
        }
      })
    });

    if (!res.ok) throw new Error('API ' + res.status);
    const data = await res.json();
    return data.candidates[0].content.parts[0].text;
  }

  // === 전송 ===
  async function sendMessage() {
    const input = document.getElementById('cbInput');
    const msg = input.value.trim();
    if (!msg || isLoading) return;

    addMsg(msg, 'user');
    chatHistory.push({ role: 'user', content: msg });
    input.value = '';
    input.style.height = 'auto';

    isLoading = true;
    document.getElementById('cbSend').disabled = true;
    showTyping();

    try {
      const reply = await callGemini(msg);
      hideTyping();
      addMsg(reply, 'ai');
      chatHistory.push({ role: 'ai', content: reply });
    } catch (e) {
      hideTyping();
      addMsg('죄송합니다. 오류가 발생했습니다. 잠시 후 다시 시도해주세요.', 'ai');
      console.error('Chatbot error:', e);
    } finally {
      isLoading = false;
      document.getElementById('cbSend').disabled = false;
      input.focus();
    }
  }

  // === 제안 질문 클릭 ===
  window._cbSuggest = function(text) {
    document.getElementById('cbInput').value = text.replace(/^[^\s]+\s/, '');
    sendMessage();
  };

  // === 초기화 ===
  function init() {
    createChatbotUI();

    const toggle = document.getElementById('cbToggle');
    const win = document.getElementById('cbWindow');
    const close = document.getElementById('cbClose');
    const send = document.getElementById('cbSend');
    const input = document.getElementById('cbInput');

    function toggleChat() {
      isOpen = !isOpen;
      win.classList.toggle('open', isOpen);
      toggle.classList.toggle('active', isOpen);
      if (isOpen) input.focus();
    }

    toggle.addEventListener('click', toggleChat);
    close.addEventListener('click', toggleChat);
    send.addEventListener('click', sendMessage);

    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    });

    input.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 80) + 'px';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
