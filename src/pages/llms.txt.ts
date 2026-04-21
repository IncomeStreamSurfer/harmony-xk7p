import type { APIRoute } from 'astro';
export const prerender = false;
export const GET: APIRoute = async () => {
  const SITE = (import.meta.env.PUBLIC_SITE_URL ?? 'https://harmony-threads.vercel.app').replace(/\/$/, '');
  const lines = [
    '# Harmony Threads', '',
    '> Music-inspired graphic tees and digital content for rock fans. Wear the music. Own the story.', '',
    '## Key pages', '',
    `- [Home](${SITE}/): Harmony Threads homepage.`,
    `- [Shop](${SITE}/shop): Full product catalogue.`,
    `- [The Band T-Shirt](${SITE}/product/physical-product-the-band-t-shirt): Vintage graphic tee. S/M/L/XL. $19.99.`,
    `- [History of Rock Music](${SITE}/product/digital-product-the-history-of-rock-music): Digital book. PDF, Audio, Kindle. $14.99.`,
    `- [Signature Perfume](${SITE}/product/example-perfume): Premium fragrance. $74.99.`,
    `- [About](${SITE}/about): The story behind Harmony Threads.`,
    `- [Contact](${SITE}/contact): Get in touch.`,
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
