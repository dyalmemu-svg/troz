import { createClient } from '@vercel/edge-config';

export default async function handler(req, res) {
  const { payload } = req.query;

  if (!payload) {
    return res.status(400).send('Missing link identifier.');
  }

  try {
    // Pass the explicit environment variable name
    const edgeConfig = createClient(process.env.GLOBAL_CONFIG);
    const slug = payload.split('.')[0];
    const targetUrl = await edgeConfig.get(slug);

    if (!targetUrl) {
      return res.status(404).send('Link not found.');
    }

    return res.redirect(307, targetUrl);
  } catch (error) {
    return res.status(500).send(`Server Error: ${error.message}`);
  }
}
