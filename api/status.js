export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ ok: false, error: 'Método não permitido.' });
  const emailConfigured = Boolean(
    process.env.RESEND_API_KEY &&
    process.env.CREDENCIAMENTO_TO_EMAIL &&
    process.env.CREDENCIAMENTO_FROM_EMAIL
  );
  return res.status(200).json({ ok: true, emailConfigured });
}
