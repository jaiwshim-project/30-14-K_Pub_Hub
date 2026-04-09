import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { to, name, team, company, date, trainer, reportHtml, subject } = await req.json();

    if (!to || !reportHtml) {
      return new Response(
        JSON.stringify({ error: "to, reportHtml 필수" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const emailSubject = subject || `[SPIN Selling AI] ${name}님 교육 참가 결과 AI 분석리포트`;

    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: 'Noto Sans KR', 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; background: #f0f3f8; color: #000; }
    .email-wrap { max-width: 700px; margin: 0 auto; background: #fff; }
    .email-header { background: linear-gradient(135deg, #0a2240, #0d3161); padding: 24px 32px; color: #fff; }
    .email-header h1 { font-size: 22px; font-weight: 800; margin: 0 0 4px; }
    .email-header p { font-size: 12px; opacity: 0.8; margin: 0; }
    .email-info { padding: 16px 32px; background: #f0f3f8; font-size: 13px; border-bottom: 1px solid #e2e8f0; }
    .email-info span { margin-right: 20px; }
    .email-info strong { color: #0a2240; }
    .email-body { padding: 24px 32px; }
    .email-footer { padding: 16px 32px; background: #0a2240; color: rgba(255,255,255,0.7); font-size: 11px; text-align: center; }
  </style>
</head>
<body>
  <div class="email-wrap">
    <div class="email-header">
      <h1>SPIN Selling AI — 교육 참가 결과 AI 분석리포트</h1>
      <p>AI가 분석한 개인별 SPIN 역량 진단 및 맞춤 코칭</p>
    </div>
    <div class="email-info">
      <span><strong>교육생:</strong> ${name || ''}</span>
      <span><strong>팀:</strong> ${team || ''}</span>
      <span><strong>회사:</strong> ${company || ''}</span>
      <span><strong>교육일:</strong> ${date || ''}</span>
      <span><strong>강사:</strong> ${trainer || ''}</span>
    </div>
    <div class="email-body">
      ${reportHtml}
    </div>
    <div class="email-footer">
      본 리포트는 SPIN Selling AI 플랫폼에서 자동 생성되었습니다.<br>
      &copy; 2026 Korn Ferry SPIN Selling Official Program | 심재우 대표 | SB Consulting
    </div>
  </div>
</body>
</html>`;

    // Send via Resend API
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "SPIN Selling AI <noreply@resend.dev>",
        to: [to],
        subject: emailSubject,
        html: htmlBody,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      return new Response(
        JSON.stringify({ success: true, id: data.id, to }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } else {
      return new Response(
        JSON.stringify({ success: false, error: data }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
