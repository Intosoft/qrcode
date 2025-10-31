# IntosoftQRCode iOS

[![Swift](https://img.shields.io/badge/Swift-5.9-orange.svg)](https://swift.org)
[![Platform](https://img.shields.io/badge/Platform-iOS%2013.0+-lightgrey.svg)](https://developer.apple.com/ios/)
[![SPM](https://img.shields.io/badge/SPM-compatible-brightgreen.svg)](https://swift.org/package-manager/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/Intosoft/qrcode/blob/main/LICENSE)

Native Swift wrapper for Intosoft QRCode - the most customizable QR code generator.

## Installation

### Swift Package Manager (Recommended)

Add to your `Package.swift`:

```swift
dependencies: [
    .package(url: "https://github.com/Intosoft/qrcode.git", from: "0.1.4")
]
```

Or in Xcode:
1. File → Add Package Dependencies
2. Enter: `https://github.com/Intosoft/qrcode`
3. Select version `0.1.4` or later

## Quick Start

```swift
import IntosoftQRCode

do {
    let svg = try IntosoftQRCode.generateSVG(
        text: "https://example.com",
        width: 300,
        height: 300
    )
    // Use svg in your UI
} catch {
    print("Error: \(error)")
}
```

## Features

- ✅ Zero external dependencies (uses built-in JavaScriptCore)
- ✅ Full customization (shapes, colors, gradients, logos)
- ✅ Type-safe Swift API
- ✅ SwiftUI and UIKit support
- ✅ Offline - no network required

## Documentation

- [Full iOS Documentation](./README.md)
- [Complete Examples](./Examples.swift)
- [Main Repository](https://github.com/Intosoft/qrcode)

## License

MIT License - See [LICENSE](../../LICENSE)
