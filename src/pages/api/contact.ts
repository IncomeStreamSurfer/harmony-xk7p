import type { APIRoute } from 'astro';
import { sendContactAck } from '../../lib/email';
export const prerender = false;
const rateLimitMap = new Map<string, number[]>();
function isRateLimited(ip: string): boolean {
  const now = Date.now(); const windowMs = 60_000; const maxRequests = 3;
  const timestamps = (rateLimitMap.get(ip) ?? []).filter(t => now - t < windowMs);
  timestamps.push(now); rateLimitMap.set(ip, timestamps);
  return timestamps.length > maxRequests;
}
export const POST: APIRoute = async ({ request }) => {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (isRateLimited(ip)) return new Response(JSON.stringify({ error: 'Too many requests' }), { status: 429 });
  let body: any;
  try { body = await request.json(); } catch { return new Response(JSON.stringify({ error: 'Invalid' }), { status: 400 }); }
  if (body.website?.trim()) return new Response(JSON.stringify({ ok: true }), { status: 200 });
  const renderTime = parseInt(body._t ?? '0', 10);
  if (Date.now() - renderTime < 3000) return new Response(JSON.stringify({ ok: true }), { status: 200 });
  const { name, email, message } = body;
  if (!name || !email || !message) return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
  try { await sendContactAck({ to: email, name }); } catch (_) {}
  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
};
