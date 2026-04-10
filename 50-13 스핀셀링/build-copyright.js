// Build copyright-source-bundle.html by reading source files and embedding them
const fs = require('fs');
const path = require('path');

const PROJECT = __dirname;

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function readLines(file, fromLine, toLine) {
  const content = fs.readFileSync(path.join(PROJECT, file), 'utf8');
  const lines = content.split(/\r?\n/);
  const total = lines.length;
  const start = fromLine ? fromLine - 1 : 0;
  const end = toLine ? Math.min(toLine, lines.length) : lines.length;
  return { lines: lines.slice(start, end), total, start };
}

function renderFile(file, label, opts) {
  opts = opts || {};
  const { lines, total, start } = readLines(file, opts.from, opts.to);
  const widthPad = String(start + lines.length).length;
  const body = lines.map((ln, i) => {
    const n = String(start + i + 1).padStart(widthPad, ' ');
    return `<span class="ln">${n}</span>  ${escapeHtml(ln)}`;
  }).join('\n');
  const rangeNote = (opts.from || opts.to)
    ? `  (${opts.from || 1}–${opts.to || total} 행 발췌 · 전체 ${total}행)`
    : `  (전체 ${total}행)`;
  return `
  <section class="file-section">
    <div class="file-header">
      <div class="file-name">${escapeHtml(label || file)}</div>
      <div class="file-meta">${escapeHtml(file)}${rangeNote}</div>
    </div>
    <pre class="code">${body}</pre>
  </section>`;
}

// 파일 구성: 처음 3개 + 마지막 2개
const sections = [];

sections.push(renderFile('index.html', '① index.html — 랜딩 페이지 (세션 선택 + 관리자 패널)'));
sections.push(renderFile('common.js', '② common.js — 공통 로직 (세션/사용자/점수/네비게이션)'));
sections.push(renderFile('common.css', '③ common.css — 전역 스타일 (처음 200줄 발췌)', { from: 1, to: 200 }));
sections.push(renderFile('spin-knowledge-base.js', '④ spin-knowledge-base.js — RAG 지식베이스'));
sections.push(renderFile('chatbot.js', '⑤ chatbot.js — SPIN AI Bot (Gemini RAG 챗봇)'));

// 파일 목록 (TOC)
const files = [
  { n: '01', name: 'index.html', desc: '랜딩 페이지 (세션 선택, 비밀번호 모달, 관리자 패널)', lines: 387 },
  { n: '02', name: 'common.js', desc: '공통 로직 — 세션/사용자/점수/네비게이션/푸터', lines: 754 },
  { n: '03', name: 'common.css (발췌)', desc: '전역 스타일시트 (처음 200줄)', lines: '200/1552' },
  { n: '04', name: 'spin-knowledge-base.js', desc: 'RAG 지식베이스 (SPIN 방법론 + 플랫폼 가이드)', lines: 104 },
  { n: '05', name: 'chatbot.js', desc: 'SPIN AI Bot — Gemini 2.0 Flash RAG 챗봇', lines: 467 }
];

const tocRows = files.map(f => `
  <tr>
    <td class="toc-num">${f.n}</td>
    <td class="toc-name">${escapeHtml(f.name)}</td>
    <td class="toc-desc">${escapeHtml(f.desc)}</td>
    <td class="toc-lines">${f.lines}</td>
  </tr>`).join('');

const html = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<title>SPIN Selling AI 교육 플랫폼 — 소스코드 통합 문서 (저작권 등록용)</title>
<style>
@page { size: A4; margin: 20mm 15mm; }
@media print {
  .no-print { display: none !important; }
  .page-break { page-break-before: always; }
  .file-section { page-break-before: always; }
  .cover, .toc-page { page-break-after: always; }
}
* { box-sizing: border-box; }
html, body {
  margin: 0;
  padding: 0;
  font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
  color: #000;
  background: #fff;
  font-size: 10.5pt;
  line-height: 1.55;
}
.container {
  max-width: 210mm;
  margin: 0 auto;
  padding: 10mm 10mm;
  background: #fff;
}
/* ===== 표지 ===== */
.cover {
  min-height: 257mm;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 3px double #000;
  padding: 40mm 20mm;
}
.cover .doc-type {
  font-size: 13pt;
  letter-spacing: 8px;
  margin-bottom: 30mm;
  font-weight: 600;
}
.cover .title {
  font-size: 28pt;
  font-weight: 900;
  line-height: 1.3;
  margin-bottom: 10mm;
}
.cover .subtitle {
  font-size: 16pt;
  font-weight: 500;
  margin-bottom: 40mm;
  color: #333;
}
.cover .info-table {
  width: 75%;
  margin: 20mm auto 0;
  border-collapse: collapse;
  font-size: 11pt;
}
.cover .info-table th,
.cover .info-table td {
  border: 1px solid #000;
  padding: 10px 16px;
  text-align: left;
}
.cover .info-table th {
  background: #f0f0f0;
  width: 35%;
  font-weight: 700;
}
.cover .footer-line {
  margin-top: 30mm;
  font-size: 10pt;
  color: #555;
}
/* ===== TOC ===== */
.toc-page {
  padding: 20mm 0 0;
}
.toc-title {
  font-size: 20pt;
  font-weight: 900;
  border-bottom: 3px solid #000;
  padding-bottom: 8px;
  margin-bottom: 16px;
}
.toc-intro {
  font-size: 10pt;
  color: #333;
  margin-bottom: 14px;
  line-height: 1.6;
}
.toc-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 10pt;
}
.toc-table th,
.toc-table td {
  border: 1px solid #000;
  padding: 8px 10px;
  text-align: left;
  vertical-align: top;
}
.toc-table th {
  background: #e8e8e8;
  font-weight: 700;
}
.toc-num { width: 10%; text-align: center; }
.toc-name { width: 25%; font-weight: 700; }
.toc-desc { width: 50%; }
.toc-lines { width: 15%; text-align: center; }
.toc-note {
  margin-top: 16px;
  padding: 10px 14px;
  background: #f6f6f6;
  border-left: 4px solid #000;
  font-size: 9.5pt;
  line-height: 1.6;
}
/* ===== 파일 섹션 ===== */
.file-section {
  padding-top: 6mm;
}
.file-header {
  border-top: 3px solid #000;
  border-bottom: 1px solid #000;
  padding: 8px 0;
  margin-bottom: 8px;
}
.file-name {
  font-size: 13pt;
  font-weight: 900;
}
.file-meta {
  font-size: 9pt;
  color: #444;
  margin-top: 3px;
  font-family: 'Consolas', monospace;
}
pre.code {
  font-family: 'Consolas', 'Courier New', monospace;
  font-size: 8.5pt;
  line-height: 1.35;
  color: #000;
  background: #fff;
  border: 1px solid #ccc;
  padding: 8px 10px;
  margin: 0;
  white-space: pre-wrap;
  word-break: break-all;
}
.ln {
  display: inline-block;
  min-width: 3.5em;
  text-align: right;
  color: #888;
  user-select: none;
  margin-right: 6px;
  border-right: 1px solid #ddd;
  padding-right: 6px;
}
/* ===== 푸터 (페이지 하단 저작권) ===== */
.copyright-footer {
  margin-top: 14mm;
  padding-top: 6mm;
  border-top: 1px solid #000;
  font-size: 9pt;
  text-align: center;
  color: #333;
}
</style>
</head>
<body>
<div class="container">

  <!-- ========== 표지 ========== -->
  <section class="cover">
    <div class="doc-type">COPYRIGHT REGISTRATION</div>
    <div class="title">소스코드 통합 문서<br>— 저작권 등록용 —</div>
    <div class="subtitle">SPIN Selling AI 교육 플랫폼<br>(Korn Ferry 공인 B2B 영업 훈련 시스템)</div>

    <table class="info-table">
      <tr><th>저작물명</th><td>SPIN Selling AI 교육 플랫폼</td></tr>
      <tr><th>저작자</th><td>심재우 (SB Consulting)</td></tr>
      <tr><th>자격</th><td>Global Certified SPIN Master Trainer<br>(Korn Ferry 국제공인 마스터트레이너)</td></tr>
      <tr><th>저작물 종류</th><td>컴퓨터프로그램저작물 (웹 응용 프로그램)</td></tr>
      <tr><th>개발 언어</th><td>HTML5, CSS3, JavaScript (ES6+), Supabase, Gemini AI</td></tr>
      <tr><th>등록 기관</th><td>한국저작권위원회 (KCC)</td></tr>
      <tr><th>작성일</th><td>2026년 4월</td></tr>
    </table>

    <div class="footer-line">
      본 문서는 한국저작권위원회 컴퓨터프로그램저작물 등록 시 첨부용 소스코드 문서입니다.<br>
      권장 첨부 범위(처음 20쪽 + 마지막 20쪽)에 맞춰 핵심 5개 파일을 발췌·수록합니다.
    </div>
  </section>

  <!-- ========== 목차 ========== -->
  <section class="toc-page page-break">
    <div class="toc-title">수록 파일 목차</div>
    <div class="toc-intro">
      본 통합 문서는 SPIN Selling AI 교육 플랫폼의 핵심 소스코드 5개 파일을 한국저작권위원회 권장 양식
      (프로그램 앞 20쪽 + 뒤 20쪽)에 맞춰 수록한 것입니다. 각 파일은 새 페이지에서 시작하며, 좌측에 라인 번호가 표시됩니다.
    </div>
    <table class="toc-table">
      <thead>
        <tr>
          <th>번호</th>
          <th>파일명</th>
          <th>역할 설명</th>
          <th>행 수</th>
        </tr>
      </thead>
      <tbody>
        ${tocRows}
      </tbody>
    </table>
    <div class="toc-note">
      <strong>포함 원칙.</strong>
      프로젝트 전체는 100여 개 파일, 약 5만 행 규모입니다. 본 문서에는 플랫폼의 진입점(index.html), 공통 로직(common.js),
      전역 스타일의 대표 발췌(common.css 1~200행), RAG 지식베이스(spin-knowledge-base.js), AI 챗봇 엔진(chatbot.js)을 수록하여
      저작물의 창작적 표현을 대표할 수 있도록 구성했습니다.
    </div>
  </section>

  <!-- ========== 파일별 소스 ========== -->
  ${sections.join('\n')}

  <!-- ========== 저작권 푸터 ========== -->
  <div class="copyright-footer">
    &copy; 2024–2026 심재우 (SB Consulting) · SPIN Selling AI 교육 플랫폼 · All Rights Reserved.<br>
    Global Certified SPIN Master Trainer (Korn Ferry 국제공인 마스터트레이너) · 한국저작권위원회 등록용 소스코드 통합 문서
  </div>

</div>
</body>
</html>`;

fs.writeFileSync(path.join(PROJECT, 'copyright-source-bundle.html'), html, 'utf8');
console.log('Wrote copyright-source-bundle.html (' + html.length + ' bytes)');
