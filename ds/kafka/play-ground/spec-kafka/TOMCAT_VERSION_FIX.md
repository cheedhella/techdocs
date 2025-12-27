# Tomcat Version Compatibility Fix

## Problem

You're seeing this error:
```
java.lang.NoClassDefFoundError: javax/servlet/ServletContextListener
```

## Root Cause

**Homebrew installs Tomcat 10+ by default**, which uses:
- `jakarta.servlet.*` (Jakarta EE 9+)

**Your application uses:**
- `javax.servlet.*` (Java EE / Jakarta EE 8)
- Spring 5.x
- Struts 2.5.x

These are incompatible!

## Solution: Use Tomcat 9

Tomcat 9 is the last version that supports `javax.servlet` (Java EE 8).

### Step 1: Uninstall Tomcat 10+

```bash
# Stop current Tomcat
brew services stop tomcat

# Uninstall Tomcat 10+
brew uninstall tomcat
```

### Step 2: Install Tomcat 9

```bash
# Install Tomcat 9
brew install tomcat@9

# Link it
brew link tomcat@9 --force

# Verify version
/opt/homebrew/opt/tomcat@9/bin/version.sh | grep "Server version"
# Should show: Apache Tomcat/9.x.x
```

### Step 3: Start Tomcat 9

```bash
# Start Tomcat 9
brew services start tomcat@9
```

### Step 4: Update Deployment Script

The deployment script needs to detect Tomcat 9:

Edit `deploy-native.sh` to check for `tomcat@9`:

```bash
# Detect Homebrew Tomcat on macOS
if [[ "$OSTYPE" == "darwin"* ]] && [ -d "/opt/homebrew/opt/tomcat@9" ]; then
    TOMCAT_HOME="/opt/homebrew/opt/tomcat@9/libexec"
    echo "Detected Homebrew Tomcat 9 at $TOMCAT_HOME"
elif [[ "$OSTYPE" == "darwin"* ]] && [ -d "/usr/local/opt/tomcat@9" ]; then
    TOMCAT_HOME="/usr/local/opt/tomcat@9/libexec"
    echo "Detected Homebrew Tomcat 9 at $TOMCAT_HOME"
# ... rest of detection
fi
```

### Step 5: Rebuild and Deploy

```bash
# Rebuild
mvn clean install

# Deploy
./deploy-native.sh
```

## Tomcat 9 Locations (Homebrew)

### Apple Silicon (M1/M2/M3)
```bash
Tomcat Home: /opt/homebrew/opt/tomcat@9/libexec
Webapps: /opt/homebrew/opt/tomcat@9/libexec/webapps
Config: /opt/homebrew/etc/tomcat@9
Logs: /opt/homebrew/var/log/tomcat@9/catalina.out
```

### Intel Mac
```bash
Tomcat Home: /usr/local/opt/tomcat@9/libexec
Webapps: /usr/local/opt/tomcat@9/libexec/webapps
Config: /usr/local/etc/tomcat@9
Logs: /usr/local/var/log/tomcat@9/catalina.out
```

## Tomcat 9 Commands

```bash
# Start
brew services start tomcat@9

# Stop
brew services stop tomcat@9

# Restart
brew services restart tomcat@9

# Status
brew services list | grep tomcat

# View logs (Apple Silicon)
tail -f /opt/homebrew/var/log/tomcat@9/catalina.out

# View logs (Intel Mac)
tail -f /usr/local/var/log/tomcat@9/catalina.out
```

## Alternative: Upgrade to Jakarta EE

If you want to use Tomcat 10+, you need to upgrade:

### Required Changes

1. **Upgrade Spring to 6.x:**
   ```xml
   <spring.version>6.0.13</spring.version>
   ```

2. **Upgrade Struts to 6.x:**
   ```xml
   <struts2.version>6.3.0</struts2.version>
   ```

3. **Change servlet dependency:**
   ```xml
   <dependency>
       <groupId>jakarta.servlet</groupId>
       <artifactId>jakarta.servlet-api</artifactId>
       <version>6.0.0</version>
       <scope>provided</scope>
   </dependency>
   ```

4. **Update imports in all Java files:**
   ```java
   // Change from:
   import javax.servlet.*;
   
   // To:
   import jakarta.servlet.*;
   ```

**This is a major upgrade and not recommended for quick deployment.**

## Recommended Solution

**Use Tomcat 9** - It's stable, well-tested, and compatible with your current code.

```bash
# Quick fix
brew uninstall tomcat
brew install tomcat@9
brew services start tomcat@9
```

## Verification

After installing Tomcat 9:

```bash
# Check version
/opt/homebrew/opt/tomcat@9/bin/version.sh | grep "Server version"

# Should show:
# Server version: Apache Tomcat/9.x.x

# Check if running
brew services list | grep tomcat

# Test deployment
./deploy-native.sh
```

## Summary

✅ **Problem:** Tomcat 10+ uses jakarta.servlet, your app uses javax.servlet

✅ **Solution:** Use Tomcat 9 (last version with javax.servlet support)

✅ **Commands:**
```bash
brew uninstall tomcat
brew install tomcat@9
brew services start tomcat@9
./deploy-native.sh
```

✅ **Logs:**
```bash
tail -f /opt/homebrew/var/log/tomcat@9/catalina.out
```

