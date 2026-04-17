# 📱 IMPERIUM BIKES FRONTEND - GERAÇÃO DE APK

## 🎯 Bem-vindo!

Este projeto React + Capacitor está **100% configurado** para gerar um APK Android!

---

## 📚 Documentação (Leia na Ordem)

### 1️⃣ **COMECE AQUI** ⭐ (5 minutos)
- **Arquivo:** `GUIA_RAPIDO_APK.md`
- **O que é:** Guia simplificado em 4 passos
- **Quando ler:** Antes de qualquer coisa
- **Por que:** Explicação clara e direta

### 2️⃣ **CHECKLIST** ✅ (10 minutos)
- **Arquivo:** `CHECKLIST_APK.md`
- **O que é:** Lista de verificação pré-build
- **Quando usar:** Antes de executar `build-apk.bat`
- **Por que:** Garantir que tudo está pronto

### 3️⃣ **GUIA COMPLETO** 📖 (30 minutos)
- **Arquivo:** `GUIA_APK.md`
- **O que é:** Documentação técnica detalhada
- **Quando ler:** Se tiver dúvidas técnicas
- **Por que:** Explicação profunda de cada etapa

### 4️⃣ **RESUMO** 📋 (10 minutos)
- **Arquivo:** `RESUMO_CONFIGURACAO_APK.md`
- **O que é:** Resumo do que foi feito
- **Quando ler:** Para entender o projeto
- **Por que:** Visão geral da configuração

### 5️⃣ **SOLUÇÃO DE PROBLEMAS** 🔧 (Consultar se erro)
- **Arquivo:** `TROUBLESHOOTING.md`
- **O que é:** Soluções para problemas comuns
- **Quando usar:** Se erro durante build
- **Por que:** Rápida resolução de problemas

---

## 🚀 Início Rápido (3 Passos)

### Passo 1: Verificar Ambiente
```cmd
check-environment.bat
```
✓ Tudo verde? Continue!
✗ Erro? Instale a ferramenta indicada

### Passo 2: Gerar APK
```cmd
build-apk.bat
```
⏳ Vai levar 20-60 minutos (primeira vez)

### Passo 3: Instalar
```cmd
adb install -r android\app\build\outputs\apk\debug\app-debug.apk
```
✓ Pronto! Abra no celular/emulador

---

## 📦 Arquivos Criados para Você

### Scripts de Compilação
| Arquivo | Tipo | Uso |
|---------|------|-----|
| `build-apk.bat` | Batch | ⭐ USAR ESTE - Compila APK |
| `check-environment.bat` | Batch | Verifica ambiente |
| `build-apk.ps1` | PowerShell | Alternativa para PowerShell |
| `check-environment.ps1` | PowerShell | Alternativa para PowerShell |

### Documentação
| Arquivo | Tamanho | Público |
|---------|--------|---------|
| `GUIA_RAPIDO_APK.md` | 15 KB | ⭐ LEIA PRIMEIRO |
| `GUIA_APK.md` | 25 KB | Completo |
| `CHECKLIST_APK.md` | 20 KB | Verificação |
| `TROUBLESHOOTING.md` | 20 KB | Problemas |
| `RESUMO_CONFIGURACAO_APK.md` | 15 KB | Resumo |
| `COMECE_APK.md` | 10 KB | Rápido |

---

## 🛠️ Ferramentas Necessárias

| Ferramenta | Versão Mínima | Status | Link |
|------------|---------------|--------|------|
| Node.js | 16.x | ⚠️ Instale | https://nodejs.org/ |
| npm | 8.x | ✓ Com Node.js | - |
| Java JDK | 11+ | ⚠️ Instale | https://oracle.com/java/ |
| Android Studio | 2020+ | ⚠️ Instale | https://developer.android.com/studio |
| Android SDK API 36 | 36 | ⚠️ Instale via Studio | Android Studio |
| Android SDK API 24 | 24 | ⚠️ Instale via Studio | Android Studio |

---

## 📱 Info do Projeto

```
Nome: Imperium Bikes
Package: com.imperiumbikes.app
Versão: 1.0
Backend: https://imperium-bikes-backend.onrender.com

Requisitos Android:
- Min API: 24 (Android 7.0)
- Target API: 36 (Android 15)
- Tamanho APK: ~15-30 MB

Tecnologias:
- React 18.2.0
- Vite 5.0.8
- Capacitor 8.3.1
- Axios 1.6.0
- React Router 6.20.0
```

---

## ⚡ Comandos Rápidos

```cmd
REM Verificar se tudo está OK
check-environment.bat

REM Compilar APK debug (USAR ESTE)
build-apk.bat

REM Compilar APK release (produção)
build-apk.bat release

REM Listar dispositivos
adb devices

REM Instalar APK
adb install -r android\app\build\outputs\apk\debug\app-debug.apk

REM Ver logs em tempo real
adb logcat

REM Desinstalar app
adb uninstall com.imperiumbikes.app

REM Limpar cache de build
cd android
gradlew.bat clean
cd ..

REM Scripts npm
npm run cap:sync           # Sincronizar com Capacitor
npm run android:debug      # Compilar APK debug
npm run android:release    # Compilar APK release
npm run android:clean      # Limpar cache
```

---

## 🔍 O Que Você Precisa Fazer

### ✅ ANTES de compilar:

- [ ] Ler `GUIA_RAPIDO_APK.md`
- [ ] Executar `check-environment.bat`
- [ ] Instalar ferramentas faltantes (Node, Java, Android)
- [ ] Verificar que `.env` existe e tem URL do backend

### ✅ DURANTE compilação:

- [ ] Executar `build-apk.bat`
- [ ] Não interromper (deixa compilar!)
- [ ] Primeira vez vai demorar (1-2 horas)

### ✅ APÓS geração:

- [ ] APK estará em: `android/app/build/outputs/apk/debug/app-debug.apk`
- [ ] Executar `adb install -r [caminho]`
- [ ] Testar no emulador ou celular
- [ ] Se erro, consultar `TROUBLESHOOTING.md`

---

## ❓ Dúvidas Frequentes

**P: Preciso instalar tudo de novo?**
R: Não, se já tem Node, Java e Android Studio, é rápido!

**P: Quanto tempo leva?**
R: Primeira vez 30-60 min. Próximas vezes 5-10 min.

**P: Posso pausar durante a compilação?**
R: Sim, mas vai precisar iniciar novamente depois.

**P: Onde fica o APK final?**
R: `android/app/build/outputs/apk/debug/app-debug.apk`

**P: Como instalo no celular?**
R: Conecte por USB e execute: `adb install -r [caminho_apk]`

**P: Backend está pronto?**
R: Sim! Já configurado em `.env` com: `https://imperium-bikes-backend.onrender.com`

**P: Erro de compilação, o que faço?**
R: Veja `TROUBLESHOOTING.md` - tem solução para tudo!

**P: Qual é a senha do keystore debug?**
R: Padrão Android: `android` / `android`

**P: Posso usar para Google Play Store?**
R: Não, debug APK é apenas para testes. Para Play Store, gere release APK.

---

## 📊 Status do Projeto

| Componente | Status | Ação |
|------------|--------|------|
| Código React | ✅ Pronto | - |
| Capacitor Android | ✅ Configurado | - |
| Backend URL | ✅ Configurado | - |
| Scripts Build | ✅ Criados | Use `build-apk.bat` |
| Documentação | ✅ Completa | Leia os .md |
| Ferramentas | ⚠️ Verificar | Execute `check-environment.bat` |

---

## 🎯 Próximos Passos

### Agora:
1. Leia `GUIA_RAPIDO_APK.md`
2. Execute `check-environment.bat`

### Depois:
3. Instale ferramentas faltantes
4. Execute `build-apk.bat`
5. Aguarde compilação

### Por fim:
6. Instale APK no dispositivo
7. Teste o app
8. Se erro, consulte `TROUBLESHOOTING.md`

---

## 📋 Checklist Final

Antes de começar, certifique-se:

- [ ] Windows 10 ou superior
- [ ] 10+ GB espaço em disco
- [ ] Conexão internet estável
- [ ] Node.js instalado
- [ ] Java JDK instalado
- [ ] Android Studio com SDK instalado
- [ ] APIs 24 e 36 instaladas

Se tudo marcado ✓, execute:
```cmd
build-apk.bat
```

---

## 🎉 Sucesso!

Se seguir os passos, você vai gerar um APK Android funcionando 100%!

### Leia agora: `GUIA_RAPIDO_APK.md` ⭐

---

## 📞 Suporte

| Dúvida | Arquivo |
|--------|---------|
| "Como começo?" | `GUIA_RAPIDO_APK.md` |
| "Tudo pronto?" | `CHECKLIST_APK.md` |
| "Mais detalhes?" | `GUIA_APK.md` |
| "Erro aconteceu!" | `TROUBLESHOOTING.md` |
| "O que foi feito?" | `RESUMO_CONFIGURACAO_APK.md` |

---

**Projeto:** Imperium Bikes Frontend
**Data:** 2025-04-17
**Status:** ✅ 100% Pronto para APK
**Versão:** 1.0

---

🚀 **Boa sorte!** Você consegue! 💪

