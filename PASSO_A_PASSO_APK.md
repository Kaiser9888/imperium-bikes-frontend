# 📋 PASSO-A-PASSO: Resolver Erro Java 21 e Compilar APK

## ❌ Seu Erro

```
error: invalid source release: 21
```

**Causa:** Java 21 foi requerido, mas você tem Java 17.

---

## ✅ SOLUÇÃO RÁPIDA (O que fiz)

Atualizei `android/gradle.properties` para:
- Usar Java 17
- Aumentar memória JVM

---

## 🚀 AGORA EXECUTE (Copie e Cole)

### No PowerShell:

```powershell
# Ir para pasta android
cd C:\Users\Lenovo\Desktop\imperium-bikes-frontend\android

# Limpar cache
.\gradlew.bat clean

# Compilar
.\gradlew.bat assembleDebug
```

**Tempo estimado:** 5-10 minutos

---

## ✨ Se Funcionar

Você verá:
```
BUILD SUCCESSFUL in XXs
```

APK estará em:
```
C:\Users\Lenovo\Desktop\imperium-bikes-frontend\android\app\build\outputs\apk\debug\app-debug.apk
```

---

## ❌ Se Ainda Não Funcionar

### Opção 1: Verificar Java

```powershell
# Ver qual Java está usando
java -version

# Verificar JAVA_HOME
echo $env:JAVA_HOME

# Deve mostrar:
# C:\Program Files\Java\jdk-17
```

Se não mostrar jdk-17:
```powershell
# Configure JAVA_HOME manualmente
$env:JAVA_HOME = "C:\Program Files\Java\jdk-17"
echo $env:JAVA_HOME

# Tente novamente
cd C:\Users\Lenovo\Desktop\imperium-bikes-frontend\android
.\gradlew.bat clean
.\gradlew.bat assembleDebug
```

### Opção 2: Instalar Java 21

Se você quer usar Java 21:

```
1. Acesse: https://www.oracle.com/java/technologies/downloads/
2. Baixe: JDK 21 Windows x64
3. Instale
4. Configure JAVA_HOME:
   C:\Program Files\Java\jdk-21
5. Reinicie PowerShell
6. Tente novamente
```

### Opção 3: Limpar Cache Gradle Completo

```powershell
cd C:\Users\Lenovo\Desktop\imperium-bikes-frontend\android

# Deletar pasta .gradle
rmdir -Recurse -Force .gradle

# Deletar pasta build
rmdir -Recurse -Force build
rmdir -Recurse -Force app\build

# Tentar novamente
.\gradlew.bat clean
.\gradlew.bat assembleDebug
```

---

## 📱 Quando APK Estiver Pronto

```cmd
# Ver dispositivos conectados
adb devices

# Instalar no celular
adb install -r android\app\build\outputs\apk\debug\app-debug.apk

# Abrir app no celular
# Procure por "Imperium Bikes"
```

---

## 🎯 Resumo

| Passo | Comando | Tempo |
|-------|---------|-------|
| 1 | `cd android` | 1 seg |
| 2 | `gradlew.bat clean` | 30 seg |
| 3 | `gradlew.bat assembleDebug` | 5-10 min |
| 4 | APK pronto! | - |

---

## ✅ Checklist

- [x] gradle.properties atualizado
- [ ] PowerShell aberto
- [ ] Navegou para pasta android
- [ ] Executou `gradlew.bat clean`
- [ ] Executou `gradlew.bat assembleDebug`
- [ ] APK gerado com sucesso
- [ ] Conectou celular/emulador
- [ ] Instalou APK com `adb install`
- [ ] Testou app no celular

---

## 💡 Dica

Se der erro de memória:
```powershell
$env:GRADLE_OPTS = "-Xmx2048m"
.\gradlew.bat assembleDebug
```

---

**Próximo passo:** Execute os comandos acima no PowerShell! 🚀

