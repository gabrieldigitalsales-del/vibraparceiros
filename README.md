# Credenciamento de Parceiro — Vibra Soluções

Projeto pronto para Vercel.

## Deploy
1. Suba **o conteúdo desta pasta na raiz do repositório**.
2. No Vercel, importe o repositório.
3. Framework Preset: **Other**.
4. Root Directory: deixe vazio / raiz do projeto.
5. Build Command: deixe vazio.
6. Output Directory: deixe vazio.
7. Faça o deploy.

O site abre mesmo sem configurar e-mail. Nesse caso, o formulário mostra uma mensagem amigável e mantém a opção de imprimir/salvar em PDF.

## Para ativar o envio automático
Configure em Settings > Environment Variables:
- `RESEND_API_KEY`
- `CREDENCIAMENTO_TO_EMAIL`
- `CREDENCIAMENTO_FROM_EMAIL`

Depois faça Redeploy.
