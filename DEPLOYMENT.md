# Deployment Guide

## 📦 Package Distribution Overview

Your library is distributed across **3 different package managers** for different platforms:

| Platform | Package Manager | Repository | Auto-Deploy |
|----------|----------------|------------|-------------|
| **Web/Node.js** | NPM | npmjs.com | Manual (`npm publish`) |
| **iOS (Swift)** | Swift Package Manager | GitHub | ✅ Automatic (on git push) |
| **Android (Kotlin)** | JitPack | jitpack.io | ✅ Automatic (on GitHub release) |

---

## 🚀 Quick Release Process

### One-Command Release

```bash
./scripts/release.sh 0.1.5
```

This script:
1. ✅ Updates `package.json` version
2. ✅ Builds and updates native packages
3. ✅ Runs tests
4. ✅ Creates git commit and tag
5. ✅ Verifies everything is ready

Then manually:
1. Push to GitHub
2. Create GitHub Release
3. (Optional) Publish to NPM

---

## 📱 Platform-Specific Deployment

### 🌐 Web/Node.js (NPM)

**Repository:** https://www.npmjs.com/package/@intosoft/qrcode

#### Initial Setup (One-time)
```bash
# Login to NPM
npm login
```

#### Publishing
```bash
# Make sure you're on main branch
git checkout main

# Run the release script
./scripts/release.sh 0.1.5

# Push to GitHub
git push origin main --tags

# Publish to NPM
npm publish
```

#### What Developers Install
```bash
npm install @intosoft/qrcode
```

---

### 🍎 iOS (Swift Package Manager)

**Repository:** Direct from GitHub

#### Setup Required
✅ **None!** SPM reads directly from your GitHub repository.

#### Publishing
```bash
# Just push your tag to GitHub
git tag v0.1.5
git push origin v0.1.5
```

**That's it!** No build, no upload, no separate repository.

#### How It Works
- Swift Package Manager reads `Package.swift` from your GitHub repo
- Developers reference your GitHub URL
- SPM automatically downloads the package when they build

#### What Developers Install
```swift
// In Xcode or Package.swift
.package(url: "https://github.com/Intosoft/qrcode.git", from: "0.1.5")
```

---

### 🤖 Android (JitPack)

**Repository:** https://jitpack.io/#Intosoft/qrcode

#### Initial Setup (One-time)
✅ **Already configured!** Your `build.gradle` has the correct settings.

#### Publishing

**Method 1: Via GitHub Release (Recommended)**
1. Push your code and tag:
   ```bash
   git tag v0.1.5
   git push origin v0.1.5
   ```

2. Create a GitHub Release:
   - Go to https://github.com/Intosoft/qrcode/releases/new
   - Select tag: `v0.1.5`
   - Title: `v0.1.5`
   - Click "Publish release"

3. **JitPack automatically builds your package!**

**Method 2: Via Tag Only**
1. Push tag:
   ```bash
   git tag v0.1.5
   git push origin v0.1.5
   ```

2. Trigger JitPack build:
   ```bash
   curl "https://jitpack.io/api/builds/com.github.Intosoft/qrcode/v0.1.5"
   ```

#### Verify Deployment
Visit: https://jitpack.io/#Intosoft/qrcode

You should see:
- ✅ Green checkmark for your version
- Build log showing success

#### What Developers Install
```gradle
repositories {
    maven { url 'https://jitpack.io' }
}

dependencies {
    implementation 'com.github.Intosoft:qrcode:0.1.5'
}
```

---

## 🤖 Automated Deployment (GitHub Actions)

Your repository has a GitHub Actions workflow that automatically validates native packages on release.

**File:** `.github/workflows/publish-native.yml`

### What It Does
When you create a GitHub Release:
1. ✅ Builds Android package
2. ✅ Validates Swift package
3. ✅ Notifies JitPack
4. ✅ Creates release summary

### Enable It
The workflow is already configured! Just create a GitHub Release and it runs automatically.

---

## 📋 Complete Release Checklist

### Before Release
- [ ] All features tested and working
- [ ] Documentation updated
- [ ] Examples updated
- [ ] Version number decided

### Release Process
```bash
# 1. Run the release script
./scripts/release.sh 0.1.5

# 2. Push to GitHub
git push origin main --tags

# 3. Create GitHub Release
# Visit: https://github.com/Intosoft/qrcode/releases/new
# - Tag: v0.1.5
# - Title: v0.1.5
# - Description: Changelog
# - Click "Publish release"

# 4. Publish to NPM (for web package)
npm publish

# 5. Verify deployments
# - JitPack: https://jitpack.io/#Intosoft/qrcode
# - NPM: https://www.npmjs.com/package/@intosoft/qrcode
# - GitHub: https://github.com/Intosoft/qrcode/releases
```

### After Release
- [ ] Test installation on all platforms
- [ ] Update website/documentation
- [ ] Announce on social media
- [ ] Update changelog

---

## 🔍 Verification

### Web/Node (NPM)
```bash
# Check if published
npm view @intosoft/qrcode version

# Test installation
npm install @intosoft/qrcode
```

### iOS (SPM)
```bash
# Clone and test
git clone https://github.com/Intosoft/qrcode.git
cd qrcode/packages/ios-swift
swift build
```

### Android (JitPack)
```bash
# Check build status
curl "https://jitpack.io/api/builds/com.github.Intosoft/qrcode/v0.1.5"

# Or visit in browser
open "https://jitpack.io/#Intosoft/qrcode"
```

---

## 🐛 Troubleshooting

### NPM: "You must be logged in to publish"
```bash
npm login
npm whoami  # Verify login
```

### iOS: "Package not found"
- Make sure tag is pushed: `git push --tags`
- Check `Package.swift` syntax is valid
- Try in Xcode: File → Reset Package Caches

### Android: JitPack build fails
- Check build log on https://jitpack.io/#Intosoft/qrcode
- Ensure `build.gradle` has correct configuration
- Verify `qrcode.js` exists in `src/main/assets/`

### Android: "Could not find com.github.Intosoft:qrcode"
- Make sure GitHub Release is created (not just tag)
- Wait 5-10 minutes for JitPack to build
- Check JitPack build status

---

## 📊 Distribution Status

After successful release, developers can install via:

### NPM (Web/Node/React)
```bash
npm install @intosoft/qrcode
```
Status: https://www.npmjs.com/package/@intosoft/qrcode

### Swift Package Manager (iOS)
```swift
.package(url: "https://github.com/Intosoft/qrcode.git", from: "0.1.5")
```
Status: Direct from GitHub (no separate status page)

### JitPack (Android)
```gradle
implementation 'com.github.Intosoft:qrcode:0.1.5'
```
Status: https://jitpack.io/#Intosoft/qrcode

---

## 🎯 Best Practices

1. **Use Semantic Versioning**
   - `0.1.5 → 0.1.6` (patch: bug fixes)
   - `0.1.6 → 0.2.0` (minor: new features)
   - `0.2.0 → 1.0.0` (major: breaking changes)

2. **Always Test Before Release**
   ```bash
   yarn test
   yarn build:native
   ./scripts/verify-native.sh
   ```

3. **Create Detailed Release Notes**
   - What's new
   - What's fixed
   - Breaking changes (if any)

4. **Tag Consistently**
   - Always use `v` prefix: `v0.1.5`
   - Match `package.json` version

5. **Update Documentation**
   - README.md
   - CHANGELOG.md
   - Migration guides for breaking changes

---

**Your deployment pipeline is now fully automated!** 🎉

The only manual steps are:
1. Run `./scripts/release.sh <version>`
2. Push to GitHub
3. Create GitHub Release
4. (Optional) `npm publish` for web package
