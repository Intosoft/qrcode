# IntosoftQRCode Android

[![Kotlin](https://img.shields.io/badge/Kotlin-1.9+-purple.svg)](https://kotlinlang.org)
[![Platform](https://img.shields.io/badge/Platform-Android%205.0+-green.svg)](https://developer.android.com)
[![JitPack](https://jitpack.io/v/Intosoft/qrcode.svg)](https://jitpack.io/#Intosoft/qrcode)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/Intosoft/qrcode/blob/main/LICENSE)

Native Kotlin wrapper for Intosoft QRCode - the most customizable QR code generator.

## Installation

### Gradle (Recommended via JitPack)

Add JitPack repository in your root `build.gradle`:

```gradle
allprojects {
    repositories {
        maven { url 'https://jitpack.io' }
    }
}
```

Add dependency in your app `build.gradle`:

```gradle
dependencies {
    implementation 'com.github.Intosoft:qrcode:0.1.4'
}
```

### Gradle (Kotlin DSL)

```kotlin
repositories {
    maven("https://jitpack.io")
}

dependencies {
    implementation("com.github.Intosoft:qrcode:0.1.4")
}
```

## Quick Start

```kotlin
import com.intosoft.qrcode.*

val svg = IntosoftQRCode.generateSVG(
    context = this,
    text = "https://example.com",
    width = 300,
    height = 300
)
```

## Features

- ✅ Native Kotlin API with type-safe enums
- ✅ Full customization (shapes, colors, gradients, logos)
- ✅ Jetpack Compose support
- ✅ Traditional XML Views support
- ✅ Offline - no network required

## Documentation

- [Full Android Documentation](./README.md)
- [Complete Examples](./Examples.kt)
- [Main Repository](https://github.com/Intosoft/qrcode)

## License

MIT License - See [LICENSE](../../LICENSE)
