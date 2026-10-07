# Vibra Soluções — Credenciamento de Parceiro Premium

Checklist premium responsivo com envio automático por e-mail via Resend, pronto para Vercel.

## Variáveis no Vercel

- `RESEND_API_KEY`
- `CREDENCIAMENTO_TO_EMAIL`
- `CREDENCIAMENTO_FROM_EMAIL`

O destinatário pode ser alterado posteriormente modificando apenas `CREDENCIAMENTO_TO_EMAIL` no painel do Vercel.

## Arquivos

- `index.html` — formulário premium
- `public/vibra-logo.png` — logo oficial
- `api/send-credenciamento.js` — função serverless de envio
- `vercel.json` — configuração do Vercel
