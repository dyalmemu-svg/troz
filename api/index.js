export default function handler(req, res) {
  const { payload } = req.query;

  if (!payload) {
    return res.status(400).send('Missing payload token.');
  }

  try {
    // 1. Decode the Base64 string from the URL
    const decodedText = Buffer.from(payload, 'base64').toString('utf-8');
    const data = JSON.parse(decodedText);

    // 2. Validate destination URL
    if (!data.d) {
      return res.status(400).send('Target URL missing in payload.');
    }

    // 3. Issue immediate 307 Temporary Redirect
    return res.redirect(307, data.d);
  } catch (error) {
    return res.status(400).send('Invalid or corrupted Base64 payload.');
  }
}
