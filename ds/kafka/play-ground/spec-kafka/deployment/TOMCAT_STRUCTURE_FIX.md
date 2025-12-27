# Tomcat Directory Structure Fix

## Problem

You're seeing this error:
```
cp: cannot create regular file '/opt/tomcat/webapps/': Not a directory
```

And when you check the structure:
```bash
$ ls -l /opt/tomcat/
total 0
lrwxrwxrwx. 1 root root 25 Dec 27 03:45 apache-tomcat-9.0.96 -> /opt/apache-tomcat-9.0.96
```

## Root Cause

The directory structure is incorrect. Instead of:
```
/opt/tomcat -> /opt/apache-tomcat-9.0.96  (symlink)
/opt/apache-tomcat-9.0.96/                (directory with bin/, webapps/, etc.)
```

You have:
```
/opt/tomcat/                               (directory)
  └── apache-tomcat-9.0.96 -> /opt/apache-tomcat-9.0.96  (symlink inside directory)
```

This happens when the installation script creates `/opt/tomcat` as a directory before extracting Tomcat.

## Quick Fix (Automated)

Run the fix script:

```bash
cd deployment
sudo ./fix-tomcat-structure.sh
```

This will:
1. ✅ Stop Tomcat
2. ✅ Remove incorrect `/opt/tomcat` directory
3. ✅ Create correct symlink: `/opt/tomcat` → `/opt/apache-tomcat-9.0.96`
4. ✅ Fix permissions
5. ✅ Verify the structure

## Manual Fix

If you prefer to fix it manually:

```bash
# Stop Tomcat
sudo systemctl stop tomcat
sudo pkill -9 -f tomcat

# Remove incorrect directory
sudo rm -rf /opt/tomcat

# Create correct symlink
sudo ln -s /opt/apache-tomcat-9.0.96 /opt/tomcat

# Fix permissions
sudo chown -R tomcat:tomcat /opt/apache-tomcat-9.0.96
sudo chown -h tomcat:tomcat /opt/tomcat
sudo chmod +x /opt/tomcat/bin/*.sh

# Verify
ls -la /opt/ | grep tomcat
ls -la /opt/tomcat/
```

## Verification

After fixing, you should see:

```bash
$ ls -la /opt/ | grep tomcat
drwxr-xr-x.  9 tomcat tomcat  220 Dec 27 03:45 apache-tomcat-9.0.96
lrwxrwxrwx.  1 tomcat tomcat   25 Dec 27 04:00 tomcat -> apache-tomcat-9.0.96

$ ls -la /opt/tomcat/
total 132
drwxr-xr-x.  9 tomcat tomcat   220 Dec 27 03:45 .
drwxr-xr-x. 10 root   root     140 Dec 27 04:00 ..
drwxr-x---.  2 tomcat tomcat  4096 Dec 27 03:45 bin
drwx------.  2 tomcat tomcat   238 Dec 27 03:45 conf
drwxr-x---.  2 tomcat tomcat  4096 Dec 27 03:45 lib
drwxr-x---.  2 tomcat tomcat     6 Dec 27 03:45 logs
drwxr-x---.  2 tomcat tomcat    30 Dec 27 03:45 temp
drwxr-x---.  7 tomcat tomcat    81 Dec 27 03:45 webapps
drwxr-x---.  2 tomcat tomcat     6 Dec 27 03:45 work
-rw-r--r--.  1 tomcat tomcat 18992 Nov 22 10:30 BUILDING.txt
...

$ ls /opt/tomcat/webapps/
ROOT  docs  examples  host-manager  manager
```

## Test Deployment

After fixing, test the deployment:

```bash
# Copy a WAR file
sudo cp your-app.war /opt/tomcat/webapps/

# Should work without errors
ls -la /opt/tomcat/webapps/

# Start Tomcat
sudo systemctl start tomcat

# Check logs
sudo tail -f /opt/tomcat/logs/catalina.out
```

## Prevention

The installation scripts have been updated to prevent this issue:

1. **Remove existing `/opt/tomcat`** before creating symlink
2. **Verify symlink** points to correct directory with `bin/` folder
3. **Check for nested installations** and fix them automatically

If you're installing Tomcat manually, always ensure:
- Extract to `/opt/apache-tomcat-X.Y.Z/`
- Create symlink: `ln -s /opt/apache-tomcat-X.Y.Z /opt/tomcat`
- Never create `/opt/tomcat` as a directory first

## Related Scripts

- **`fix-tomcat-structure.sh`** - Automated fix for this issue
- **`fix-tomcat-symlink.sh`** - Fix for nested installations
- **`install-dependencies-rocky-dnf.sh`** - Updated installer (prevents issue)
- **`install-dependencies-rocky.sh`** - Updated installer (prevents issue)

## Troubleshooting

### Issue: "No such file or directory" after fix

```bash
# Verify symlink
ls -la /opt/tomcat
readlink -f /opt/tomcat

# Should point to existing directory
ls -la /opt/apache-tomcat-9.0.96/
```

### Issue: "Permission denied"

```bash
# Fix ownership
sudo chown -R tomcat:tomcat /opt/apache-tomcat-*
sudo chown -h tomcat:tomcat /opt/tomcat
sudo chmod +x /opt/tomcat/bin/*.sh
```

### Issue: Tomcat won't start after fix

```bash
# Check if old process is still running
ps aux | grep tomcat
sudo pkill -9 -f tomcat

# Check logs
sudo tail -50 /opt/tomcat/logs/catalina.out

# Try manual start
sudo -u tomcat /opt/tomcat/bin/catalina.sh start
```

## Summary

**Problem**: `/opt/tomcat` is a directory containing a symlink instead of being a symlink itself.

**Solution**: 
```bash
sudo ./fix-tomcat-structure.sh
```

**Expected Result**: `/opt/tomcat` → `/opt/apache-tomcat-9.0.96/` (with `bin/`, `webapps/`, etc.)

**Verification**: `ls -la /opt/tomcat/webapps/` should show Tomcat's default webapps.

