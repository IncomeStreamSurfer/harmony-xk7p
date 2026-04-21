const RESEND_API_KEY = import.meta.env.RESEND_API_KEY ?? process.env.RESEND_API_KEY ?? '';

interface OrderConfirmationData {
  to: string;
  orderId: string;
  amount: string;
  currency: string;
}

export async function sendOrderConfirmation({ to, orderId, amount, currency }: OrderConfirmationData) {
  if (!RESEND_API_KEY) return;
  const html = `<!DOCTYPE html><html><body style="font-family:Georgia,serif;background:#FAF7F2;padding:40px;color:#18110C;max-width:600px;margin:0 auto;"><h1>Order Confirmed</h1><p style="color:#8A7A6E;">Thank you for shopping at Harmony Threads.</p><hr style="border:none;border-top:1px solid rgba(24,17,12,0.12);margin:24px 0;"><p><strong>Order ID:</strong> ${orderId}</p><p><strong>Total:</strong> ${currency} ${amount}</p><hr style="border:none;border-top:1px solid rgba(24,17,12,0.12);margin:24px 0;"><p style="color:#8A7A6E;font-size:0.9rem;">We'll send shipping updates as soon as your order leaves our warehouse.</p><p style="margin-top:48px;font-size:0.8rem;color:#8A7A6E;">© 2026 Harmony Threads.</p></body></html>`;
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: 'Harmony Threads <orders@harmonythreads.com>', to: [to], subject: `Order confirmed — #${orderId}`, html }),
  });
}

interface ContactAckData { to: string; name: string; }
export async function sendContactAck({ to, name }: ContactAckData) {
  if (!RESEND_API_KEY) return;
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: 'Harmony Threads <hello@harmonythreads.com>', to: [to], subject: `We got your message, ${name}`, html: `<body style="font-family:Georgia,serif;background:#FAF7F2;padding:40px;color:#18110C;"><h1>Thanks, ${name}!</h1><p>We've received your message and will get back to you within 1-2 business days.</p><p style="color:#8A7A6E;">— The Harmony Threads team</p></body>` }),
  });
}
