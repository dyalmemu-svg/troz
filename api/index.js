export default function handler(req, res) {
  const { payload } = req.query;

  if (!payload) {
    return res.status(400).send('Missing payload');
  }

  try {
    // Decode Base64 string into JSON
    const decoded = Buffer.from(payload, 'base64').toString('utf-8');
    const data = JSON.parse(decoded);

    // Check for target URL
    if (data.d) {
      return res.redirect(307, data.d);
    }
    return res.status(400).send('Target URL missing in payload');
  } catch (error) {
    return res.status(400).send('Invalid Base64 string');
  }
}
