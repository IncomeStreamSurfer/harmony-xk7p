import type { APIRoute } from 'astro';
import { stripe } from '../../lib/stripe';
import { anonClient } from '../../lib/supabase';
export const prerender = false;
export const POST: APIRoute = async ({ request }) => {
  try {
    const { items, customer_email } = await request.json() as { items: Array<{ product_id: string; qty: number; variant_sku?: string; name?: string; price_cents?: number; image?: string }>; customer_email?: string; };
    if (!items?.length) return new Response(JSON.stringify({ error: 'Empty cart' }), { status: 400 });
    const sb = anonClient();
    const { data: dbProducts } = await sb.from('products').select('id, slug, name, description, price_pence, currency, image_url').in('slug', items.map(i => i.product_id));
    const line_items = items.map((it) => {
      const dbProd = dbProducts?.find((x: any) => x.slug === it.product_id);
      const priceCents = dbProd ? dbProd.price_pence : (it.price_cents ?? 1999);
      const name = dbProd ? dbProd.name : (it.name ?? 'Product');
      const image = dbProd ? dbProd.image_url : it.image;
      return { quantity: Math.max(1, Math.floor(it.qty)), price_data: { currency: (dbProd?.currency ?? 'usd').toLowerCase(), unit_amount: priceCents, product_data: { name, images: image ? [image] : undefined } } };
    });
    const origin = import.meta.env.PUBLIC_SITE_URL ?? `${request.headers.get('x-forwarded-proto') ?? 'https'}://${request.headers.get('x-forwarded-host') ?? request.headers.get('host')}`;
    const session = await stripe().checkout.sessions.create({ mode: 'payment', line_items, customer_email, success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`, cancel_url: `${origin}/checkout/cancel`, metadata: { cart: JSON.stringify(items).slice(0, 500) } });
    return new Response(JSON.stringify({ url: session.url }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message ?? 'Checkout failed' }), { status: 500 });
  }
};
