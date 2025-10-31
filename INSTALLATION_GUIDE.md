# 📦 Installation Guide for Developers

This guide explains how developers can install and use Intosoft QRCode in their projects.

## 🌐 Web / Node.js / React / Vue / Angular

**Package Manager:** NPM / Yarn

### Installation

```bash
# NPM
npm install @intosoft/qrcode

# Yarn
yarn add @intosoft/qrcode

# PNPM
pnpm add @intosoft/qrcode
```

### Usage

```javascript
import { generateSVGString } from '@intosoft/qrcode';

const svg = generateSVGString({
  text: "https://example.com",
  width: 300,
  height: 300
});
```

### CDN (No Installation)

```html
<script src="https://unpkg.com/@intosoft/qrcode@0.1.4/dist/iife/index.js"></script>
<script>
  const svg = window.qrcode.generateSVGString({ text: "Hello" });
</script>
```

---

## 📱 React Native

**Package Manager:** NPM / Yarn

### Installation

```bash
# Install the package
npm install @intosoft/qrcode-react-native

# Install peer dependency
npm install react-native-svg

# iOS only - install pods
cd ios && pod install
```

### Usage

```jsx
import { QRCode } from '@intosoft/qrcode-react-native';

<QRCode text="https://example.com" width={300} height={300} />
```

---

## 🍎 iOS (Swift)

**Package Manager:** Swift Package Manager (SPM)

### Installation

#### Method 1: Xcode (Recommended)
1. Open your project in Xcode
2. Go to **File → Add Package Dependencies**
3. Enter the URL: `https://github.com/Intosoft/qrcode`
4. Select version `0.1.4` or later
5. Click **Add Package**

#### Method 2: Package.swift
```swift
// swift-tools-version:5.9
import PackageDescription

let package = Package(
    name: "YourApp",
    dependencies: [
        .package(url: "https://github.com/Intosoft/qrcode.git", from: "0.1.4")
    ],
    targets: [
        .target(
            name: "YourApp",
            dependencies: [
                .product(name: "IntosoftQRCode", package: "qrcode")
            ]
        )
    ]
)
```

### Usage

```swift
import IntosoftQRCode

do {
    let svg = try IntosoftQRCode.generateSVG(
        text: "https://example.com",
        width: 300,
        height: 300
    )
} catch {
    print("Error: \(error)")
}
```

---

## 🤖 Android (Kotlin/Java)

**Package Manager:** Gradle (via JitPack)

### Installation

#### Step 1: Add JitPack Repository

In your **root** `build.gradle` (or `settings.gradle` for newer projects):

```gradle
allprojects {
    repositories {
        google()
        mavenCentral()
        maven { url 'https://jitpack.io' }  // Add this line
    }
}
```

Or in `settings.gradle.kts` (Kotlin DSL):

```kotlin
dependencyResolutionManagement {
    repositories {
        google()
        mavenCentral()
        maven("https://jitpack.io")  // Add this line
    }
}
```

#### Step 2: Add Dependency

In your **app** `build.gradle`:

```gradle
dependencies {
    implementation 'com.github.Intosoft:qrcode:0.1.4'
}
```

Or in `build.gradle.kts` (Kotlin DSL):

```kotlin
dependencies {
    implementation("com.github.Intosoft:qrcode:0.1.4")
}
```

### Usage

**Kotlin:**
```kotlin
import com.intosoft.qrcode.*

val svg = IntosoftQRCode.generateSVG(
    context = this,
    text = "https://example.com",
    width = 300,
    height = 300
)
```

**Java:**
```java
import com.intosoft.qrcode.*;

String svg = IntosoftQRCode.Companion.generateSVG(
    this,
    "https://example.com",
    300,
    300
);
```

---

## 📊 Installation Method Comparison

| Platform | Package Manager | Repository | Installation Difficulty |
|----------|----------------|------------|------------------------|
| **Web/Node** | NPM/Yarn | npmjs.com | ⭐ Easy |
| **React Native** | NPM/Yarn | npmjs.com | ⭐⭐ Medium (requires native deps) |
| **iOS** | Swift Package Manager | GitHub | ⭐ Easy |
| **Android** | Gradle (JitPack) | jitpack.io | ⭐⭐ Medium (requires repository setup) |

---

## 🚀 Auto-Deployment Setup

### For NPM Packages (Web/React Native)

**Already configured!** When you run:
```bash
npm publish
```

Your package automatically goes to npmjs.com.

### For iOS (Swift Package Manager)

**No deployment needed!** SPM reads directly from GitHub.

To release a new version:
```bash
git tag v0.1.5
git commit -m "Release v0.1.5"
git push origin main --tags
```

Developers automatically get updates when they update their dependencies.

### For Android (JitPack)

**Automatic via GitHub releases!**

#### Setup (One-time):

1. Make sure `build.gradle` has publishing configuration (✅ Already done)
2. Push code to GitHub
3. Create a release on GitHub

#### To Release:

```bash
# Create and push a tag
git tag v0.1.5
git push origin v0.1.5

# Create a GitHub Release
# Go to: https://github.com/Intosoft/qrcode/releases/new
# - Tag: v0.1.5
# - Title: v0.1.5
# - Click "Publish release"
```

**JitPack automatically builds your package!**

Verify at: `https://jitpack.io/#Intosoft/qrcode`

---

## 🎯 Recommended Installation Methods

### For JavaScript/TypeScript Developers
**Use NPM:**
```bash
npm install @intosoft/qrcode
```
✅ Standard, familiar, cached, fast

### For iOS Developers
**Use Swift Package Manager:**
```
https://github.com/Intosoft/qrcode
```
✅ Built into Xcode, no extra tools needed

### For Android Developers
**Use JitPack:**
```gradle
maven { url 'https://jitpack.io' }
implementation 'com.github.Intosoft:qrcode:0.1.4'
```
✅ Automatic from GitHub, no separate publishing needed

---

## 🔄 Version Updates

### Semantic Versioning

Follow semver: `MAJOR.MINOR.PATCH`

```
0.1.4 → 0.1.5  (Bug fix)
0.1.5 → 0.2.0  (New feature, backward compatible)
0.2.0 → 1.0.0  (Breaking changes)
```

### Release Checklist

1. ✅ Update version in `package.json`
2. ✅ Run `yarn build:native` to update native bundles
3. ✅ Update `CHANGELOG.md`
4. ✅ Commit changes: `git commit -am "Release v0.1.5"`
5. ✅ Create tag: `git tag v0.1.5`
6. ✅ Push: `git push origin main --tags`
7. ✅ Create GitHub Release
8. ✅ Publish to NPM: `npm publish`

**Done!** All platforms get the update:
- NPM: Immediate
- iOS (SPM): On developer's next dependency update
- Android (JitPack): Builds automatically from the tag

---

## 💡 Best Practices

### For Web/Node Developers
```bash
npm install @intosoft/qrcode --save
```

### For React Native Developers
```bash
npm install @intosoft/qrcode-react-native react-native-svg
cd ios && pod install  # iOS only
```

### For iOS Developers
**Add via Xcode UI** - most reliable and familiar

### For Android Developers
**Use JitPack** - simpler than setting up Maven Central

---

## 📚 Documentation Links

- **Main Docs**: [README.md](./README.md)
- **iOS Docs**: [packages/ios-swift/README.md](./packages/ios-swift/README.md)
- **Android Docs**: [packages/android-kotlin/README.md](./packages/android-kotlin/README.md)
- **Native Guide**: [NATIVE_INTEGRATION.md](./NATIVE_INTEGRATION.md)

---

## ❓ Troubleshooting

### "Package not found" on NPM
→ Run `npm publish` from the root directory

### "Package not found" on JitPack
→ Make sure you created a GitHub **Release** (not just a tag)
→ Check build status at `https://jitpack.io/#Intosoft/qrcode`

### iOS package not found in Xcode
→ Make sure the tag is pushed: `git push --tags`
→ Try "Reset Package Caches" in Xcode

### Android build fails
→ Make sure JitPack repository is added
→ Sync Gradle files
→ Check minimum SDK version (21+)

---

**Your library is now easily installable on all platforms!** 🎉
