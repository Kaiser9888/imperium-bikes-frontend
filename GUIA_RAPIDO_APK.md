# 🎯 GUIA SIMPLIFICADO: Gerar APK Android

## 📌 Resumo do Que Você Precisa Fazer

1. ✅ Instalar ferramentas (Node.js, Java, Android Studio)
2. ✅ Executar `build-apk.bat` (vai gerar o APK)
3. ✅ Instalar no celular com `adb install`

**Tempo total:** ~1 hora na primeira vez (maioria é download)

---

## 🛠️ ETAPA 1: Instalar Ferramentas (30 minutos)

### Passo 1.1: Node.js
```
1. Acesse: https://nodejs.org/
2. Baixe a versão LTS (verde, ex: 20.x)
3. Execute o instalador .exe
4. Clique NEXT em tudo (padrão OK)
5. Reinicie o PowerShell/CMD
```

✅ Verificar:
```cmd
node --version        REM Deve retornar v20.x.x
npm --version         REM Deve retornar 10.x.x
```

### Passo 1.2: Java JDK
```
1. Acesse: https://www.oracle.com/java/technologies/downloads/
2. Clique em "JDK 17" (LTS)
3. Escolha "Windows x64 Installer"
4. Execute o instalador
5. Anote onde instalou (ex: C:\Program Files\Java\jdk-17)
```

✅ Verificar:
```cmd
java -version         REM Deve retornar Java 17.x.x
```

### Passo 1.3: Android Studio + SDK
```
1. Acesse: https://developer.android.com/studio
2. Baixe para Windows
3. Execute o instalador
4. Siga "Setup Wizard"
5. Quando perguntar, escolha instalar Android SDK
6. IMPORTANTE: Instale estas versões de SDK:
   - Android API 36 (targetSdk)
   - Android API 24 (minSdk)
   - Build Tools 36.x
```

✅ Verificar (abrir Android Studio):
```
Menu: Tools → SDK Manager → Android SDK
Procure por "API 36" e "API 24" - devem estar instalados
```

---

## ⚙️ ETAPA 2: Verificar Configuração (5 minutos)

### Passo 2.1: Abrir Terminal no Projeto
```
1. Abra este diretório: C:\Users\Lenovo\Desktop\imperium-bikes-frontend
2. Digite "cmd" na barra de endereço (onde mostra o caminho)
3. Pressione Enter (abre terminal neste diretório)
```

### Passo 2.2: Executar Verificação
```cmd
check-environment.bat
```

Deve aparecer com ✓ em tudo. Se tiver ✗:
- Node.js não encontrado → Instale Node.js
- Java não encontrado → Instale Java
- Android SDK não encontrado → Abra Android Studio e instale SDKs

---

## 🚀 ETAPA 3: Gerar APK (20 minutos na 1ª vez)

### Passo 3.1: Executar Build

No terminal, execute:
```cmd
build-apk.bat
```

Vai fazer:
1. ✓ Instalar dependências (npm install)
2. ✓ Compilar React (npm run build)
3. ✓ Sincronizar com Capacitor
4. ✓ Compilar APK com Gradle

**IMPORTANTE:** Vai demorar bastante. Pode levar 20-60 minutos!

### Passo 3.2: Resultado

Quando terminar, procure por:
```
OK: APK compilado com sucesso!
Caminho: android\app\build\outputs\apk\debug\app-debug.apk
```

Se deu erro, veja a [Solução de Problemas](#solução-de-problemas)

---

## 📲 ETAPA 4: Instalar no Celular (10 minutos)

### Opção A: Emulador Android

```cmd
1. Abra Android Studio
2. Clique em "Device Manager" (à direita)
3. Se não tiver emulador, crie um:
   - Clique "Create Device"
   - Escolha "Pixel 4" (recomendado)
   - Escolha Android 14 ou 15
   - Clique "Next" → "Finish"
4. Clique play para iniciar o emulador
5. Espere carregar (pode levar alguns minutos)
6. No terminal, execute:

cd /d C:\Users\Lenovo\Desktop\imperium-bikes-frontend
adb install -r android\app\build\outputs\apk\debug\app-debug.apk

7. Espere aparecer "Success"
8. No emulador, procure por "Imperium Bikes"
9. Abra o app!
```

### Opção B: Celular Físico (USB)

```cmd
1. Conecte o celular ao PC via cabo USB
2. No celular, ative "Modo de Desenvolvedor":
   - Configurações → Sobre → Número da Build
   - Clique 7 vezes rápido
   - Uma mensagem vai aparecer "Desenvolvedor ativado"
3. Volte para Configurações → Opções de Desenvolvedor
4. Ative "Depuração USB"
5. Apareça uma janela no celular perguntando se permite
6. Marque "Sempre permitir deste computador"
7. Clique OK
8. No terminal, execute:

adb devices

Deve listar seu celular. Se não aparecer, tente outro cabo USB.

9. Agora instale:

cd /d C:\Users\Lenovo\Desktop\imperium-bikes-frontend
adb install -r android\app\build\outputs\apk\debug\app-debug.apk

10. Espere "Success"
11. Abra o app no celular!
```

---

## ✅ Verificar Se Funcionou

Dentro do app, teste:
- ✓ Consegue abrir?
- ✓ Consegue fazer login?
- ✓ Consegue ver anúncios?
- ✓ Consegue navegar entre páginas?

Se sim, **Parabéns! 🎉 Funcionou!**

---

## 🐛 Solução de Problemas

### Problema: "Node.js não encontrado"
```
Causa: Node.js não instalado
Solução:
1. Instale em: https://nodejs.org/
2. Reinicie PowerShell/CMD
3. Verifique: node --version
```

### Problema: "Java não encontrado"
```
Causa: Java não instalado
Solução:
1. Instale em: https://www.oracle.com/java/
2. Verifique: java -version
```

### Problema: "Android SDK não encontrado"
```
Causa: SDKs não instalados no Android Studio
Solução:
1. Abra Android Studio
2. Tools → SDK Manager
3. Instale: Android API 36 e 24
4. Instale: Build Tools 36.x
```

### Problema: "Build muito lento ou travado"
```
Normal! Primeira vez pode levar 30-60 minutos.
Se travar, pode:
1. Fechar (Ctrl+C)
2. Executar novamente
3. Ou limpar cache:
   cd android
   gradlew.bat clean
   cd ..
   build-apk.bat
```

### Problema: "APK não instala no celular"
```
Solução 1: Desinstalar versão antiga
adb uninstall com.imperiumbikes.app
adb install -r android\app\build\outputs\apk\debug\app-debug.apk

Solução 2: Usar flag -d
adb install -r -d android\app\build\outputs\apk\debug\app-debug.apk

Solução 3: Verificar conexão
adb devices        REM Deve listar o celular
```

### Problema: "Erro SSL/TLS na conexão com backend"
```
Problema: App não consegue conectar em:
https://imperium-bikes-backend.onrender.com

Verificar:
1. Testar no navegador:
   https://imperium-bikes-backend.onrender.com
   Deve funcionar

2. Verificar .env:
   cat .env
   Deve mostrar: VITE_API_URL=https://imperium-bikes-backend.onrender.com

3. Se conectar no navegador mas não no app:
   Pode ser problema de DNS
   Tente reinstalar o app no celular
```

---

## 📝 Comandos Rápidos

```cmd
REM Verificar ambiente
check-environment.bat

REM Gerar APK (DEBUG)
build-apk.bat

REM Gerar APK (RELEASE - produção)
build-apk.bat release

REM Ver dispositivos conectados
adb devices

REM Instalar APK
adb install -r android\app\build\outputs\apk\debug\app-debug.apk

REM Ver logs em tempo real
adb logcat

REM Desinstalar app
adb uninstall com.imperiumbikes.app

REM Limpar cache do build
cd android
gradlew.bat clean
cd ..

REM Apenas atualizar dependências
npm install

REM Apenas recompilar React
npm run build

REM Apenas sincronizar com Capacitor
npx cap sync android

REM Apenas compilar APK
cd android && gradlew.bat assembleDebug && cd ..
```

---

## 📊 Informações Importantes

**Backend:** https://imperium-bikes-backend.onrender.com
- ✓ Já configurado em `.env`
- ✓ Não precisa mudar nada

**App Info:**
- Nome: Imperium Bikes
- Package: com.imperiumbikes.app
- Android Min: API 24 (Android 7.0)
- Android Target: API 36 (Android 15)

**Arquivos importantes:**
- `.env` → Tem URL do backend
- `capacitor.config.json` → Config do Capacitor
- `android/` → Código Android nativo
- `src/` → Código React

---

## 🎬 Resumo em 4 Passos

```
PASSO 1: Instalar ferramentas (Node.js, Java, Android Studio)
         ↓
PASSO 2: check-environment.bat (verificar tudo OK)
         ↓
PASSO 3: build-apk.bat (gerar APK - pode demorar)
         ↓
PASSO 4: adb install -r android\app\build\outputs\apk\debug\app-debug.apk
         ↓
PRONTO! Abra no celular/emulador!
```

---

## 💡 Dicas Importantes

1. 🔄 **Primeira vez é lenta** - Downloads e cache do Gradle
2. 📚 **Leia `GUIA_APK.md`** - Para guia mais completo
3. 🆘 **Problema?** - Veja a Solução de Problemas acima
4. 🌐 **Backend** - Já está configurado automaticamente
5. 📱 **Celular** - Precisa ativar "Modo de Desenvolvedor"
6. ⏱️ **Paciência** - Primeira build pode levar 1 hora

---

## ✨ Parabéns!

Se seguir esses passos você vai ter um APK Android funcionando 100%! 🚀

**Qualquer dúvida, consulte `GUIA_APK.md` para guia detalhado.**

---

*Última atualização: 2025-04-17*
*Versão: 1.0*

