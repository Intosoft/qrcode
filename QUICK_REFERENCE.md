# 📦 Developer Installation - Quick Reference

## How Developers Install Your Package

### 🌐 Web / Node.js / React / Vue / Angular
```bash
npm install @intosoft/qrcode
# or
yarn add @intosoft/qrcode
```

**Import:**
```javascript
import { generateSVGString } from '@intosoft/qrcode';
```

---

### 📱 React Native
```bash
npm install @intosoft/qrcode-react-native react-native-svg
cd ios && pod install  # iOS only
```

**Import:**
```jsx
import { QRCode } from '@intosoft/qrcode-react-native';
```

---

### 🍎 iOS (Swift)

**In Xcode:**
1. File → Add Package Dependencies
2. URL: `https://github.com/Intosoft/qrcode`
3. Version: `0.1.4` or "Up to Next Major"

**Or in Package.swift:**
```swift
dependencies: [
    .package(url: "https://github.com/Intosoft/qrcode.git", from: "0.1.4")
]
```

**Import:**
```swift
import IntosoftQRCode
```

---

### 🤖 Android (Kotlin/Java)

**Step 1:** Add JitPack to `build.gradle` (project level):
```gradle
allprojects {
    repositories {
        maven { url 'https://jitpack.io' }
    }
}
```

**Step 2:** Add dependency in `build.gradle` (app level):
```gradle
dependencies {
    implementation 'com.github.Intosoft:qrcode:0.1.4'
}
```

**Import:**
```kotlin
import com.intosoft.qrcode.*
```

---

## 🚀 How You Release Updates

### Quick Release (Recommended)
```bash
./scripts/release.sh 0.1.5
git push origin main --tags
```

Then create a GitHub Release at:
https://github.com/Intosoft/qrcode/releases/new

### What Happens
- ✅ **iOS**: Available immediately via SPM (from GitHub)
- ✅ **Android**: JitPack builds automatically (~5 min)
- ⏳ **NPM**: Run `npm publish` manually

---

## 📊 Summary Table

| Platform | Package Manager | Command |
|----------|----------------|---------|
| Web/Node | NPM | `npm install @intosoft/qrcode` |
| React Native | NPM | `npm install @intosoft/qrcode-react-native react-native-svg` |
| iOS | SPM | Add `https://github.com/Intosoft/qrcode` in Xcode |
| Android | JitPack | `implementation 'com.github.Intosoft:qrcode:0.1.4'` |

---

## 🔗 Useful Links

- **GitHub**: https://github.com/Intosoft/qrcode
- **NPM**: https://www.npmjs.com/package/@intosoft/qrcode
- **JitPack**: https://jitpack.io/#Intosoft/qrcode
- **Live Demo**: https://custoqr.com

---

## ✅ What's Already Set Up

- [x] NPM package configuration
- [x] iOS Swift Package manifest
- [x] Android Gradle publishing
- [x] JitPack integration
- [x] GitHub Actions workflow
- [x] Automated release script
- [x] Complete documentation
- [x] `.npmignore` updated (excludes native packages)

## 🎯 Next Step

**Test a release:**
```bash
./scripts/release.sh 0.1.5-beta
```

This creates everything but doesn't publish. You can verify all files are correct before doing a real release.
