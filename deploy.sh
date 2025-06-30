#!/bin/bash

# Script de Deploy para GitHub Pages
# Uso: ./deploy.sh

echo "🚀 Iniciando deploy para GitHub Pages..."

# Verificar se o usuário está logado no Git
if ! git config user.name > /dev/null 2>&1; then
    echo "❌ Erro: Configure seu usuário Git primeiro:"
    echo "git config --global user.name 'Seu Nome'"
    echo "git config --global user.email 'seu@email.com'"
    exit 1
fi

# Verificar se há mudanças não commitadas
if ! git diff-index --quiet HEAD --; then
    echo "⚠️  Aviso: Há mudanças não commitadas. Deseja continuar? (y/n)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        echo "❌ Deploy cancelado."
        exit 1
    fi
fi

# Fazer commit das mudanças se houver
if ! git diff-index --quiet HEAD --; then
    echo "📝 Fazendo commit das mudanças..."
    git add .
    git commit -m "Deploy: $(date)"
fi

# Fazer o build de produção
echo "🔨 Fazendo build de produção..."
npm run build:prod

# Fazer o deploy
echo "🚀 Fazendo deploy..."
npm run deploy

echo "✅ Deploy concluído!"
echo "🌐 Seu site estará disponível em alguns minutos em:"
echo "   https://SEU_USUARIO.github.io/SEU_REPOSITORIO/"
echo ""
echo "📝 Lembre-se de atualizar o script de deploy no package.json"
echo "   com suas informações do GitHub!" 