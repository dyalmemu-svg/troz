import { get } from '@vercel/edge-config';

export default async function handler(req, res) {
  const { payload } = req.query;

  if (!payload) {
    return res.status(400).send('Missing link identifier.');
  }

  try {
    // 1. Get the key name (e.g., "promo1" from /r/promo1)
    const slug = payload.split('.')[0];

    // 2. Fetch destination directly from Edge Config
    const targetUrl = await get(slug);

    if (!targetUrl) {
      return res.status(404).send('Link not found or inactive.');
    }

    // 3. Perform 307 redirect
    return res.redirect(307, targetUrl);
  } catch (error) {
    return res.status(500).send('Server error loading link.');
  }
}
