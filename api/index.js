import { createClient } from '@vercel/edge-config';

export default async function handler(req, res) {
  const { payload } = req.query;

  if (!payload) {
    return res.status(400).send('Missing link identifier.');
  }

  // Use EDGE_CONFIG first, fallback to GLOBAL_CONFIG
  const connectionString = process.env.EDGE_CONFIG || process.env.GLOBAL_CONFIG;

  if (!connectionString) {
    return res.status(500).send('Server Error: Missing EDGE_CONFIG environment variable in Vercel.');
  }

  try {
    const edgeConfig = createClient(connectionString);
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
