# Intosoft QRCode - iOS (Swift)

Native Swift wrapper for the Intosoft QRCode library. Generates beautiful, customizable QR codes using your existing JavaScript implementation via JavaScriptCore.

## Installation

### Swift Package Manager

Add to your `Package.swift`:

```swift
dependencies: [
    .package(url: "https://github.com/Intosoft/qrcode.git", from: "0.1.4")
]
```

Or in Xcode:
1. File → Add Package Dependencies
2. Enter: `https://github.com/Intosoft/qrcode.git`
3. Select the `ios-swift` package

## Usage

### Basic Example

```swift
import IntosoftQRCode

do {
    let svgString = try IntosoftQRCode.generateSVG(
        text: "https://example.com",
        width: 300,
        height: 300
    )
    
    // Use svgString in UIImageView or WKWebView
    print(svgString)
} catch {
    print("Error generating QR code: \(error)")
}
```

### Advanced Configuration

```swift
import IntosoftQRCode

// Create gradient
let gradient = GradientConfig(
    type: "linear",
    colors: ["#667eea", "#764ba2"],
    rotation: 45
)

// Add logo
let logo = LogoConfig(
    url: "https://example.com/logo.png",
    size: 0.2,
    removeBackground: true
)

// Full configuration
let config = QRCodeConfig(
    text: "https://example.com",
    width: 300,
    height: 300,
    margin: 10,
    dotsColor: "#000000",
    backgroundColor: "#ffffff",
    bodyShape: .dots,
    eyeballShape: .leaf,
    eyeFrameShape: .pointed,
    gradient: gradient,
    logo: logo
)

do {
    let svgString = try IntosoftQRCode.generateSVG(config: config)
    // Display the QR code
} catch {
    print("Error: \(error.localizedDescription)")
}
```

### Display in SwiftUI

```swift
import SwiftUI
import WebKit

struct QRCodeView: View {
    let svgString: String
    
    var body: some View {
        WebView(htmlContent: """
            <!DOCTYPE html>
            <html>
            <body style="margin:0;display:flex;justify-content:center;align-items:center;height:100vh;">
                \(svgString)
            </body>
            </html>
        """)
        .frame(width: 300, height: 300)
    }
}

struct WebView: UIViewRepresentable {
    let htmlContent: String
    
    func makeUIView(context: Context) -> WKWebView {
        return WKWebView()
    }
    
    func updateUIView(_ webView: WKWebView, context: Context) {
        webView.loadHTMLString(htmlContent, baseURL: nil)
    }
}
```

### Display in UIKit

```swift
import UIKit
import WebKit

class QRCodeViewController: UIViewController {
    let webView = WKWebView()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        view.addSubview(webView)
        webView.frame = CGRect(x: 50, y: 100, width: 300, height: 300)
        
        do {
            let svgString = try IntosoftQRCode.generateSVG(
                text: "https://example.com",
                width: 300,
                height: 300
            )
            
            let html = """
            <!DOCTYPE html>
            <html>
            <body style="margin:0;">
                \(svgString)
            </body>
            </html>
            """
            
            webView.loadHTMLString(html, baseURL: nil)
        } catch {
            print("Error: \(error)")
        }
    }
}
```

## Available Options

### Body Shapes
- `.dots` - Dotted pattern
- `.classy` - Classic squares with rounded corners

### Eyeball Shapes
- `.leaf` - Leaf-shaped eyeballs
- `.pointed` - Pointed corners
- `.extraRounded` - Extra rounded corners

### Eye Frame Shapes
- `.leaf` - Leaf-shaped frames
- `.pointed` - Pointed frames

## Error Handling

```swift
do {
    let svg = try IntosoftQRCode.generateSVG(text: "Hello")
} catch QRCodeError.failedToLoadJSBundle {
    print("JS bundle not found")
} catch QRCodeError.invalidConfiguration {
    print("Invalid config")
} catch {
    print("Other error: \(error)")
}
```

## Requirements

- iOS 13.0+ / macOS 10.15+
- Swift 5.9+
- Xcode 15.0+

## License

MIT License - see LICENSE file for details
