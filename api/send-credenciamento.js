export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido.' });
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CREDENCIAMENTO_TO_EMAIL;
  const from = process.env.CREDENCIAMENTO_FROM_EMAIL;
  if (!apiKey || !to || !from) return res.status(503).json({ code: 'EMAIL_NOT_CONFIGURED', error: 'O envio automático está temporariamente indisponível.' });

  try {
    const { data = {}, files = [] } = req.body || {};
    const esc = (v='') => String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
    const row = (label, value) => `<tr><td style="padding:8px 10px;border-bottom:1px solid #e7edf5;font-weight:700;color:#071a4d;width:34%">${esc(label)}</td><td style="padding:8px 10px;border-bottom:1px solid #e7edf5;color:#44546b">${esc(value || '—')}</td></tr>`;
    const section = (title, rows) => `<h2 style="margin:26px 0 8px;color:#071a4d;font-size:18px">${title}</h2><table cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid #dfe8f2;border-radius:10px;border-collapse:collapse">${rows}</table>`;

    const html = `<!doctype html><html><body style="margin:0;background:#f4f8fc;font-family:Arial,Helvetica,sans-serif"><table cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td align="center" style="padding:28px"><table cellpadding="0" cellspacing="0" border="0" width="640" style="max-width:640px;background:#fff;border-radius:16px"><tr><td style="padding:28px"><div style="background:#071a4d;color:#fff;padding:22px;border-radius:14px"><div style="font-size:12px;color:#7ee4ef;font-weight:700;letter-spacing:.08em">VIBRA SOLUÇÕES</div><div style="font-size:28px;font-weight:800;margin-top:6px">Novo credenciamento de parceiro</div></div>
    ${section('Dados pessoais', row('Nome completo',data.nome_completo)+row('CPF',data.cpf)+row('RG/CNH',data.rg_cnh)+row('Nascimento',data.data_nascimento)+row('Telefone',data.telefone)+row('E-mail',data.email)+row('Endereço',data.endereco_completo))}
    ${section('Empresa', row('Possui CNPJ',data.possui_cnpj)+row('Razão Social',data.razao_social)+row('Nome Fantasia',data.nome_fantasia)+row('CNPJ',data.cnpj)+row('Endereço comercial',data.endereco_comercial)+row('Telefone comercial',data.telefone_comercial)+row('E-mail comercial',data.email_comercial))}
    ${section('Sócios', row('Possui sócios',data.possui_socios)+row('Nomes',data.socios_nomes)+row('Documentos',data.socios_documentos))}
    ${section('Dados para pagamento', row('Banco',data.banco)+row('Agência',data.agencia)+row('Conta',data.conta)+row('Tipo de conta',data.tipo_conta)+row('Titular',data.titular)+row('CPF/CNPJ titular',data.documento_titular)+row('Chave PIX',data.pix))}
    ${section('Informações comerciais', row('Experiência com consórcio',data.experiencia_consorcio)+row('Produtos financeiros',data.produtos_financeiros)+row('Área de atuação',data.area_atuacao)+row('Regiões atendidas',data.regioes)+row('Carteira de clientes',data.carteira_clientes)+row('Equipe comercial',data.possui_equipe)+row('Quantidade da equipe',data.qtd_equipe)+row('Captação de clientes',data.captacao_clientes))}
    <p style="margin:24px 0 0;color:#66758d;font-size:12px">Anexos recebidos: <strong>${files.length}</strong></p>
    </td></tr></table></td></tr></table></body></html>`;

    const attachments = files.map(f => ({ filename: f.filename, content: f.content, content_type: f.contentType }));
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email || undefined,
        subject: `Novo credenciamento — ${data.nome_completo || 'Parceiro Vibra'}`,
        html,
        attachments
      })
    });
    const result = await response.json();
    if (!response.ok) return res.status(502).json({ error: result?.message || 'Falha no envio pelo serviço de e-mail.' });
    return res.status(200).json({ ok: true, id: result.id });
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno ao enviar o credenciamento.' });
  }
}
