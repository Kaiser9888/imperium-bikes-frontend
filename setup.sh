#!/bin/bash

# Imperium Bikes Frontend - Script de Setup

echo "🚀 Iniciando setup do Imperium Bikes Frontend..."
echo ""

# Verificar se node está instalado
if ! command -v node &> /dev/null; then
  echo "❌ Node.js não está instalado. Por favor, instale do site: https://nodejs.org"
  exit 1
fi

echo "✅ Node.js encontrado: $(node -v)"
echo "✅ NPM encontrado: $(npm -v)"
echo ""

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

if [ $? -ne 0 ]; then
  echo "❌ Erro ao instalar dependências"
  exit 1
fi

echo ""
echo "✅ Dependências instaladas com sucesso!"
echo ""

# Criar arquivo .env
if [ ! -f .env ]; then
  echo "🔧 Criando arquivo .env..."
  cp .env.example .env
  echo "✅ Arquivo .env criado"
fi

echo ""
echo "🎉 Setup completo!"
echo ""
echo "Para iniciar o desenvolvimento:"
echo "  npm run dev"
echo ""
echo "Para build de produção:"
echo "  npm run build"
echo ""

