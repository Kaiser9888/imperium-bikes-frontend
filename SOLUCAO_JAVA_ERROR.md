# 🔧 SOLUÇÃO: Erro Java Compilation "invalid source release: 21"

## ❌ O Erro

```
Execution failed for task ':capacitor-android:compileDebugJavaWithJavac'.
> Java compilation initialization error
    error: invalid source release: 21
```

## ✅ Causa

O Gradle está tentando compilar com Java 21, mas você tem Java 17 instalado. Há incompatibilidade de versão.

## ✅ Solução Aplicada

Atualizei o arquivo `android/gradle.properties`:

```ini
# JVM args aumentados (melhor performance)
org.gradle.jvmargs=-Xmx2048m

# Força uso de Java 17
org.gradle.java.home=C:\\Program Files\\Java\\jdk-17
android.useJavaModuleSystem=true
```

---

## 🚀 PRÓXIMAS ETAPAS

### Passo 1: Limpar e Tentar Novamente
```cmd
cd android
gradlew.bat clean
gradlew.bat assembleDebug
```

### Se Ainda Não Funcionar: Opção 2 - Instalar Java 21

Se o erro persistir, instale Java 21:

```
1. Acesse: https://www.oracle.com/java/technologies/downloads/
2. Baixe: JDK 21 (Windows x64)
3. Instale normalmente
4. Configure JAVA_HOME para Java 21:
   C:\Program Files\Java\jdk-21
5. Reinicie PowerShell
6. Tente novamente: gradlew.bat assembleDebug
```

### Se Ainda Não Funcionar: Opção 3 - Downgrade Capacitor

```cmd
# No diretório do projeto:
npm install @capacitor/android@8.1.0
npm install @capacitor/cli@8.1.0
npm install @capacitor/core@8.1.0

# Depois tentar build:
cd android
gradlew.bat clean
gradlew.bat assembleDebug
```

---

## 📋 RESUMO DOS COMANDOS

```cmd
REM 1. Ir para pasta android
cd android

REM 2. Limpar cache
gradlew.bat clean

REM 3. Tentar build debug
gradlew.bat assembleDebug

REM 4. Se funcionar, build release
gradlew.bat assembleRelease

REM 5. APK estará em:
REM android\app\build\outputs\apk\debug\app-debug.apk
```

---

## ✅ Checklist

- [x] Atualizado `gradle.properties`
- [x] JVM args aumentados para 2048m
- [x] Java 17 forçado
- [ ] Execute: `gradlew.bat clean`
- [ ] Execute: `gradlew.bat assembleDebug`
- [ ] Verifique APK em: `android/app/build/outputs/apk/debug/app-debug.apk`

---

## 💡 Dica

Se continuar dando erro, pode ser porque:

1. **Java não está no PATH** → Verifique `echo %JAVA_HOME%`
2. **Java 21 instalado e conflitando** → Remova ou use Java 17
3. **Cache antigo de Gradle** → Delete pasta `android/.gradle`

---

## 📞 Próximo Passo

Execute no PowerShell:

```powershell
cd C:\Users\Lenovo\Desktop\imperium-bikes-frontend\android
.\gradlew.bat clean
.\gradlew.bat assembleDebug
```

Se funcionar, o APK estará em:
```
C:\Users\Lenovo\Desktop\imperium-bikes-frontend\android\app\build\outputs\apk\debug\app-debug.apk
```

---

**Boa sorte! 🚀**

