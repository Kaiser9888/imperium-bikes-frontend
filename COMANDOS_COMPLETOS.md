# 📋 COMANDOS COMPLETOS - Imperium Bikes APK

## 🎯 RESUMO RÁPIDO

```
1. RODAR: npm run dev
2. BUILD: npm run build
3. APK: build-apk.bat
4. INSTALAR: adb install -r app-debug.apk
5. GIT: git add . && git commit -m "..." && git push
```

---

## 🚀 1. RODAR O PROJETO (DESENVOLVIMENTO)

### Comando Principal:
```bash
npm run dev
```

### Detalhes:
- Abre em: http://localhost:5173
- Hot reload automático
- Para desenvolvimento

### Parar:
- Pressione `Ctrl + C` no terminal

---

## 🏗️ 2. BUILD PARA PRODUÇÃO

### Comando:
```bash
npm run build
```

### Resultado:
- Cria pasta `dist/` com arquivos otimizados
- Pronto para deploy

### Preview da Build:
```bash
npm run preview
```
- Testa a build localmente antes de deploy

---

## 📱 3. GERAR APK ANDROID

### Verificar Ambiente Primeiro:
```cmd
check-environment.bat
```

### Gerar APK Debug (Testes):
```cmd
build-apk.bat
```

### Gerar APK Release (Produção):
```cmd
build-apk.bat release
```

### Resultado:
- APK em: `android/app/build/outputs/apk/debug/app-debug.apk`
- Ou: `android/app/build/outputs/apk/release/app-release.apk`

---

## 📲 4. INSTALAR NO CELULAR

### Ver Dispositivos Conectados:
```cmd
adb devices
```

### Instalar APK Debug:
```cmd
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

### Instalar APK Release:
```cmd
adb install -r android/app/build/outputs/apk/release/app-release.apk
```

### Ver Logs do App:
```cmd
adb logcat
```

### Desinstalar App:
```cmd
adb uninstall com.imperiumbikes.app
```

---

## 📦 5. DEPLOY PARA PRODUÇÃO (OPCIONAL)

### Usando Scripts NPM:
```bash
# Build + Capacitor sync
npm run cap:build

# Apenas sync com Android
npm run cap:sync

# Limpar cache
npm run android:clean
```

---

## 🔧 6. SCRIPTS ÚTEIS

### Verificar Keystore:
```cmd
verificar-keystore.bat
```

### Criar Keystore Release:
```cmd
criar-keystore-release.bat
```

### Limpar Cache Gradle:
```cmd
cd android
gradlew.bat clean
cd ..
```

---

## 🌐 7. BACKEND

### URL Configurada:
```
https://imperium-bikes-backend.onrender.com
```

### Arquivo .env:
```
VITE_API_URL=https://imperium-bikes-backend.onrender.com
```

---

## 📊 8. GIT - VOCÊ FARÁ MANUALMENTE

### Adicionar Todos os Arquivos:
```bash
git add .
```

### Ver Status:
```bash
git status
```

### Commit:
```bash
git commit -m "Adicionando configuração completa para APK Android

- Scripts de build automatizados
- Documentação completa
- Configuração Capacitor
- Scripts npm adicionados
- Keystore management
- Troubleshooting completo"
```

### Push:
```bash
git push origin main
```

### Ou se for master:
```bash
git push origin master
```

---

## 📋 SEQUÊNCIA COMPLETA

### Desenvolvimento:
```bash
# 1. Rodar projeto
npm run dev

# 2. Testar mudanças
# Abrir http://localhost:5173

# 3. Build para produção
npm run build

# 4. Preview
npm run preview
```

### APK:
```bash
# 1. Verificar ambiente
check-environment.bat

# 2. Gerar APK
build-apk.bat

# 3. Instalar no celular
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

### Git:
```bash
# 1. Adicionar arquivos
git add .

# 2. Commit
git commit -m "Adicionando APK configuration"

# 3. Push
git push origin main
```

---

## ⚠️ DICAS IMPORTANTES

### APK:
- Debug APK: Para testes (criado automaticamente)
- Release APK: Para Google Play (precisa keystore próprio)

### Git:
- **NÃO versione** keystore files (.keystore)
- **NÃO versione** pasta `android/app/build/`
- **SIM versione** scripts .bat e documentação

### Desenvolvimento:
- Use `npm run dev` para desenvolvimento
- Use `npm run build` para testar produção
- Use `npm run preview` para ver build local

### Celular:
- Ative "Modo de Desenvolvedor" no celular
- Ative "Depuração USB"
- Permita depuração quando conectar

---

## 🎯 COMANDOS POR ORDEM DE USO

```
1. npm run dev                    # Desenvolver
2. npm run build                  # Build produção
3. npm run preview                # Testar build
4. check-environment.bat          # Verificar APK
5. build-apk.bat                  # Gerar APK
6. adb devices                    # Ver celular
7. adb install -r app-debug.apk   # Instalar
8. adb logcat                     # Ver logs
9. git add .                      # Git
10. git commit -m "..."           # Git
11. git push origin main          # Git
```

---

## 📞 SUPORTE

Se erro:
- `TROUBLESHOOTING.md` - Solução de problemas
- `GUIA_APK.md` - Guia completo
- `COMECE_RAPIDO.md` - Início rápido

---

**Boa sorte! 🚀**

