# 🚀 Deploy para GitHub Pages

Este projeto está configurado para ser hospedado no GitHub Pages.

## 📋 Pré-requisitos

1. Ter um repositório no GitHub
2. Ter o `angular-cli-ghpages` instalado (já está no projeto)

## ⚙️ Configuração

### 1. Atualizar o script de deploy

No arquivo `package.json`, atualize a linha do script `deploy` com suas informações:

```json
"deploy": "ng deploy --base-href=https://SEU_USUARIO.github.io/SEU_REPOSITORIO/"
```

Substitua:
- `SEU_USUARIO` pelo seu nome de usuário do GitHub
- `SEU_REPOSITORIO` pelo nome do seu repositório

### 2. Configurar o GitHub Pages

1. Vá para as configurações do seu repositório no GitHub
2. Role até a seção "Pages"
3. Em "Source", selecione "Deploy from a branch"
4. Escolha a branch `gh-pages` (será criada automaticamente)
5. Clique em "Save"

## 🚀 Fazendo o Deploy

### Opção 1: Deploy automático (Recomendado)

```bash
npm run deploy
```

Este comando irá:
1. Fazer o build de produção
2. Criar a branch `gh-pages`
3. Fazer o push para o GitHub
4. Configurar o GitHub Pages automaticamente

### Opção 2: Deploy manual

```bash
# Build de produção
npm run build:prod

# Deploy
ng deploy --base-href=https://SEU_USUARIO.github.io/SEU_REPOSITORIO/
```

## 📁 Estrutura de Arquivos

- `index.html` na raiz: Página de redirecionamento para o GitHub Pages
- `.nojekyll`: Arquivo que desabilita o processamento Jekyll
- `dist/financeCalculator/`: Pasta com o build de produção

## 🔧 Troubleshooting

### Problema: Página não carrega
- Verifique se o `base-href` está correto no script de deploy
- Certifique-se de que a branch `gh-pages` foi criada
- Aguarde alguns minutos após o deploy (GitHub Pages pode demorar)

### Problema: Assets não carregam
- Verifique se o `base-href` termina com `/`
- Certifique-se de que o arquivo `.nojekyll` está na raiz

### Problema: Erro 404
- Verifique se o repositório está público
- Confirme se o GitHub Pages está habilitado nas configurações

## 🌐 URL do Site

Após o deploy, seu site estará disponível em:
`https://SEU_USUARIO.github.io/SEU_REPOSITORIO/`

## 📝 Notas

- O arquivo `index.html` na raiz redireciona automaticamente para o aplicativo Angular
- O deploy pode levar alguns minutos para ficar disponível
- Sempre faça o build de produção antes do deploy 