# Platform Support Summary

Intosoft QRCode is available for all major platforms:

## 🌐 Web Platforms

| Platform | Package | Installation |
|----------|---------|--------------|
| **React** | `@intosoft/qrcode` | `npm i @intosoft/qrcode` |
| **Vue.js** | `@intosoft/qrcode` | `npm i @intosoft/qrcode` |
| **Angular** | `@intosoft/qrcode` | `npm i @intosoft/qrcode` |
| **Vanilla JS** | `@intosoft/qrcode` | `<script src="https://unpkg.com/@intosoft/qrcode/dist/iife/index.js">` |
| **Node.js** | `@intosoft/qrcode` | `npm i @intosoft/qrcode` |

## 📱 Mobile Platforms

| Platform | Package | Installation | Documentation |
|----------|---------|--------------|---------------|
| **React Native** | `@intosoft/qrcode-react-native` | `npm i @intosoft/qrcode-react-native react-native-svg` | [README](./packages/react-native/README.md) |
| **iOS (Swift)** | `IntosoftQRCode` | Swift Package Manager | [README](./packages/ios-swift/README.md) |
| **Android (Kotlin)** | `com.intosoft:qrcode-android` | Gradle/Maven | [README](./packages/android-kotlin/README.md) |

## 🔧 Technical Details

### JavaScript/TypeScript (Web & Node.js)
- **Bundle formats**: ESM, CJS, IIFE
- **Bundle size**: ~47KB (minified)
- **TypeScript**: Full type definitions included
- **Dependencies**: Zero runtime dependencies

### React Native
- **Technology**: react-native-svg for native rendering
- **Platforms**: iOS, Android, Web
- **Features**: Full customization, logo support, hooks API

### iOS (Swift)
- **Technology**: JavaScriptCore (built into iOS)
- **Bundle**: 110KB JavaScript embedded
- **Dependencies**: Zero external dependencies
- **Minimum**: iOS 13.0+
- **Distribution**: Swift Package Manager, CocoaPods

### Android (Kotlin)
- **Technology**: J2V8 (Google's V8 JavaScript engine)
- **Bundle**: 110KB JavaScript embedded
- **Dependencies**: J2V8, Gson
- **Minimum**: API 21+ (Android 5.0+)
- **Distribution**: JitPack, Maven Central

## 📊 Feature Comparison

| Feature | Web/Node | React Native | iOS Swift | Android Kotlin |
|---------|----------|--------------|-----------|----------------|
| SVG Generation | ✅ | ✅ | ✅ | ✅ |
| Custom Shapes | ✅ | ✅ | ✅ | ✅ |
| Gradients | ✅ | ✅ | ✅ | ✅ |
| Logo Support | ✅ | ✅ | ✅ | ✅ |
| TypeScript Types | ✅ | ✅ | Native Swift Types | Native Kotlin Types |
| Offline Support | ✅ | ✅ | ✅ | ✅ |
| Zero Network | ✅ | ✅ | ✅ | ✅ |

## 🚀 Quick Start by Platform

### Web (React)
```jsx
import { generateSVGString } from '@intosoft/qrcode';
const svg = generateSVGString({ text: "Hello" });
```

### React Native
```jsx
import { QRCode } from '@intosoft/qrcode-react-native';
<QRCode text="Hello" />
```

### iOS (Swift)
```swift
import IntosoftQRCode
let svg = try IntosoftQRCode.generateSVG(text: "Hello")
```

### Android (Kotlin)
```kotlin
import com.intosoft.qrcode.*
val svg = IntosoftQRCode.generateSVG(context, "Hello")
```

## 📖 Full Documentation

- [Main README](./README.md) - Web and Node.js usage
- [React Native Guide](./packages/react-native/README.md) - React Native integration
- [iOS Swift Guide](./packages/ios-swift/README.md) - Swift package usage
- [Android Kotlin Guide](./packages/android-kotlin/README.md) - Kotlin library usage
- [Native Integration Guide](./NATIVE_INTEGRATION.md) - How native packages work

## 🛠️ Development

### Building for All Platforms

```bash
# Build web bundle
yarn build:web

# Build native packages (iOS + Android)
yarn build:native

# Build everything
yarn build
```

### How Native Packages Work

The iOS and Android packages use your existing JavaScript code via JavaScript engines:
- **iOS**: Uses built-in JavaScriptCore framework
- **Android**: Uses J2V8 (V8 JavaScript engine)

This means:
- ✅ 100% code reuse - no duplication
- ✅ Single source of truth - update once, works everywhere
- ✅ Type-safe native APIs automatically wrap your JS
- ✅ Small footprint - only 110KB JavaScript bundle

See [NATIVE_INTEGRATION.md](./NATIVE_INTEGRATION.md) for complete details.
