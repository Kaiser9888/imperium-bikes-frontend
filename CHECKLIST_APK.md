# ✅ CHECKLIST PRÉ-COMPILAÇÃO APK

## 🔍 Antes de Executar `build-apk.bat`

Use este checklist para garantir que tudo está pronto:

### ✅ Ambiente

- [ ] Windows 10 ou superior
- [ ] Conexão com internet estável
- [ ] 10 GB de espaço em disco disponível
- [ ] 8 GB de RAM (16 GB ideal)

### ✅ Ferramentas Instaladas

- [ ] Node.js (versão 16+) - Verificar: `node --version`
- [ ] npm (versão 8+) - Verificar: `npm --version`
- [ ] Java JDK 17 - Verificar: `java -version`
- [ ] Android Studio - Instalado e funcionando
- [ ] Git (opcional mas recomendado)

### ✅ Android SDK Instalado

- [ ] API 36 instalada (targetSdkVersion)
- [ ] API 24 instalada (minSdkVersion)
- [ ] Build Tools 36.x instalada
- [ ] Android Emulator (opcional, para testes)
- [ ] Android Platform Tools (adb, fastboot)

**Como verificar:**
1. Abra Android Studio
2. Menu: Tools → SDK Manager
3. Procure pelas versões acima
4. Se faltarem, clique para instalar

### ✅ Variáveis de Ambiente

- [ ] JAVA_HOME configurada
  ```cmd
  echo %JAVA_HOME%      REM Deve retornar C:\Program Files\Java\jdk-17
  ```

- [ ] ANDROID_HOME ou ANDROID_SDK_ROOT configurada
  ```cmd
  echo %ANDROID_HOME%   REM Deve retornar um caminho
  ```

- [ ] PATH contém os executáveis
  ```cmd
  where java.exe       REM Deve encontrar Java
  where adb.exe        REM Deve encontrar adb (Android tools)
  ```

### ✅ Projeto

- [ ] Arquivo `.env` existe
  ```cmd
  type .env            REM Deve mostrar VITE_API_URL=https://...
  ```

- [ ] Pasta `android/` existe
  ```cmd
  dir android          REM Deve mostrar vários arquivos
  ```

- [ ] `package.json` existe
  ```cmd
  type package.json    REM Deve mostrar estrutura JSON
  ```

- [ ] Sem erros em `capacitor.config.json`

### ✅ Espaço em Disco

- [ ] Pelo menos 10 GB livres no C:
  ```cmd
  dir c:\             REM Verifica espaço disponível
  ```

- [ ] Sem pasta `node_modules` gigante (será recriada)

### ✅ Teste de Conectividade

- [ ] Conectado à internet
- [ ] Backend acessível:
  ```powershell
  Invoke-WebRequest -Uri "https://imperium-bikes-backend.onrender.com" -UseBasicParsing
  ```
  Deve retornar status 200 ou 301 (não 404 ou 500)

- [ ] NPM consegue baixar pacotes:
  ```cmd
  npm search react     REM Deve retornar resultados
  ```

---

## 🚀 Executar Build

### Passo 1: Abrir Terminal

1. Abra Windows Explorer
2. Navegue para: `C:\Users\Lenovo\Desktop\imperium-bikes-frontend`
3. Digite `cmd` na barra de endereço e pressione Enter
4. Terminal abre neste diretório

### Passo 2: Executar Verificação

```cmd
check-environment.bat
```

**Resultado esperado:** Todos os itens marcados com ✓

Se tiver ✗, solucione antes de continuar!

### Passo 3: Executar Build

```cmd
build-apk.bat
```

**Tempo estimado:**
- Primeira vez: 30-60 minutos (downloads + compilação)
- Próximas vezes: 5-10 minutos

### Passo 4: Monitorar Progresso

Você verá mensagens assim:

```
[ETAPA 1/6] Verificando ambiente...
✓ Environment OK!

[ETAPA 2/6] Instalando dependências NPM...
✓ Dependências instaladas!

[ETAPA 3/6] Compilando aplicação React (Vite)...
✓ Build concluido - dist/ gerado

[ETAPA 4/6] Sincronizando com Capacitor...
✓ Sincronizacao concluida

[ETAPA 5/6] Preparando certificado de assinatura...
✓ Debug keystore encontrado

[ETAPA 6/6] Compilando APK (debug)...
✓ APK compilado com sucesso!
```

### Passo 5: Resultado Final

Se bem-sucedido:

```
=====================================================
 BUILD CONCLUIDO COM SUCESSO!
=====================================================

APK gerado: android\app\build\outputs\apk\debug\app-debug.apk
Tamanho: XX.XX MB
```

---

## 🔴 Se Aparecer Erro

### Erro: "npm install falhou"
```
Solução:
cd C:\Users\Lenovo\Desktop\imperium-bikes-frontend
npm cache clean --force
npm install
```

### Erro: "npm run build falhou"
```
Solução:
npm run build
REM Se erro de memória, aumentar:
set NODE_OPTIONS=--max_old_space_size=4096
npm run build
```

### Erro: "Gradle build falhou"
```
Solução 1 (Limpar cache):
cd android
gradlew.bat clean
cd ..
build-apk.bat

Solução 2 (Aumentar memória):
Editar: android/gradle.properties
Adicionar: org.gradle.jvmargs=-Xmx2048m

Solução 3 (Atualizar Gradle):
cd android
gradlew.bat wrapper --gradle-version=8.13.0
cd ..
```

### Erro: "Certificado não encontrado"
```
Solução:
cd android
keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=Debug,OU=Android,O=Imperium,C=BR"
cd ..
build-apk.bat
```

---

## 📱 Após Gerar APK

### Instalar em Emulador

```cmd
REM 1. Abrir Android Studio e iniciar emulador

REM 2. No terminal:
adb devices        REM Deve listar emulador

REM 3. Instalar:
adb install -r android\app\build\outputs\apk\debug\app-debug.apk
```

### Instalar em Celular USB

```cmd
REM 1. Conectar celular

REM 2. Ativar Modo Desenvolvedor (clicar 7x em "Número da Build")

REM 3. Ativar Depuração USB

REM 4. Permitir no celular

REM 5. No terminal:
adb devices        REM Deve listar celular

REM 6. Instalar:
adb install -r android\app\build\outputs\apk\debug\app-debug.apk
```

---

## 🧪 Testar App

Após instalar, teste:

1. **Abrir App**
   - Deve aparecer tela inicial

2. **Teste de Rede**
   - Ir para página de anúncios
   - Deve carregar lista do backend

3. **Teste de Navegação**
   - Clicar em Links
   - Navegar entre páginas

4. **Teste de Login**
   - Se possível, fazer login
   - Verificar se token é salvado

5. **Ver Logs**
   ```cmd
   adb logcat       REM Ver logs em tempo real
   ```

---

## 📊 Informações Técnicas

**Build Type:** Debug
- ✓ Certificado automático
- ✓ Mais rápido
- ✓ Adequado para testes
- ⚠ Não usar em produção

**Build Type:** Release
- ⚠ Precisa keystore próprio
- ✓ Seguro para Google Play
- ✓ Tamanho menor
- ⚠ Não se pode debugar

**App Details:**
- Package: com.imperiumbikes.app
- Min SDK: API 24
- Target SDK: API 36
- Capacitor: 8.3.1
- React: 18.2.0

---

## 📋 Arquivos Gerados

Após build bem-sucedido:

```
android/app/build/outputs/
├── apk/
│   └── debug/
│       └── app-debug.apk          ← ARQUIVO DO APP!
│
dist/                               ← Código React compilado
├── index.html
├── assets/
│   ├── *.js
│   └── *.css

node_modules/                       ← Dependências (ignorar)
android/app/build/                  ← Cache Gradle (ignorar)
```

---

## 🎯 Checklist Pós-Build

- [ ] APK foi gerado
- [ ] Arquivo tem tamanho razoável (5-50 MB)
- [ ] Instalou sem erros
- [ ] App abre no celular
- [ ] Consegue navegar
- [ ] Backend conecta corretamente

---

## 💾 Backup e Armazenamento

**Onde guardar:**
- Copie `android/app/build/outputs/apk/debug/app-debug.apk` para:
  - `Desktop/`
  - OneDrive
  - Pendrive
  - Qualquer lugar seguro

**Não deletar:**
- Pasta `android/` (precisa para novas compilações)
- Pasta `src/` (código fonte)
- `.env` (configurações)

**Seguro deletar:**
- `node_modules/` (será recriada com npm install)
- `dist/` (será recriada com npm run build)
- `android/app/build/` (será recriada com gradle build)

---

## 📞 Suporte Rápido

| Problema | Solução |
|----------|---------|
| "Node.js não encontrado" | Instale em nodejs.org |
| "Java não encontrado" | Instale Java JDK 17 |
| "Android SDK não encontrado" | Abra Android Studio e instale SDKs |
| "Gradle não encontra SDK" | Defina ANDROID_HOME nas variáveis de ambiente |
| "Build muito lento" | Normal primeira vez! Pode levar 1 hora |
| "Build travado" | Pressione Ctrl+C e tente novamente |
| "APK não instala" | Desinstale versão antiga: `adb uninstall com.imperiumbikes.app` |
| "Erro de SSL/TLS" | Backend pode estar offline, aguarde ou teste em navegador |

---

## ✨ Tudo Pronto!

Você está 100% preparado para gerar o APK! 🚀

**Próximo passo:** Execute `build-apk.bat` e aguarde!

---

*Versão: 1.0*
*Data: 2025-04-17*
*Projeto: Imperium Bikes Frontend*
