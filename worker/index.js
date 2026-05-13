export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': 'https://shieldish.github.io',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      const body = await request.json();
      const ip = request.headers.get('CF-Connecting-IP') || 'Unknown';
      const country = request.cf?.country || 'Unknown';
      const city = request.cf?.city || 'Unknown';
      const region = request.cf?.region || '';
      const timezone = request.cf?.timezone || 'UTC';

      const visitTime = new Date().toLocaleString('fr-FR', { timeZone: timezone });

      const message = [
        `\u{1F310} *New Visitor on Portfolio*`,
        `━━━━━━━━━━━━━━━━━━━`,
        `\u{1F4CD} *Location:* ${city}, ${region} ${country}`,
        `\u{1F517} *IP:* \`${ip}\``,
        `\u{1F551} *Time:* ${visitTime} (${timezone})`,
        `⏱ *Time Spent:* ${body.timeSpent || 'just arrived'}`,
        `\u{1F5A5} *Device:* ${body.userAgent || 'Unknown'}`,
        `\u{1F4C4} *Page:* ${body.page || '/'}`,
        `\u{1F517} *Referrer:* ${body.referrer || 'Direct'}`,
        `━━━━━━━━━━━━━━━━━━━`,
      ].join('\n');

      await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: env.TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'Markdown',
        }),
      });

      return new Response(JSON.stringify({ ok: true }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: 'Invalid request' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }
  },
};
