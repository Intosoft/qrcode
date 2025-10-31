 # [Intosoft QRCode](https://custoqr.com/) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Intosoft/qrcode/blob/main/LICENSE) [![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/) [![npm version](https://img.shields.io/npm/v/@intosoft/qrcode.svg)](https://www.npmjs.com/package/@intosoft/qrcode)

**The most customizable, developer-friendly QR code generator for modern web and mobile applications.**

Intosoft QRCode is a fully customizable, production-ready QR code generator with **best-in-class SVG output quality**. Our QR codes work flawlessly in web browsers, mobile apps, AND design tools like Adobe Illustrator.

## ✨ Key Features

-   **🎨 17 Body Shapes:** Including new artistic designs - mosaic, fluid, edge-cut, japanese styles
-   **👁️ 18 Eye Customizations:** Complete control over eye frames and eyeballs with matching options
-   **🖼️ Advanced Logo Integration:** Padding, opacity, border radius, and multi-format support (PNG, JPEG, SVG, WebP)
-   **📱 8 Platform Support:** Web, React, React Native, Vue, Angular, Node.js, iOS (Swift), Android (Kotlin)
-   **🎯 Production-Quality SVGs:** Perfect output for web browsers AND design tools (Illustrator, Figma, Inkscape)
-   **⚡ TypeScript First:** Full type safety with comprehensive TypeScript definitions
-   **🔒 Secure & Validated:** Built-in input validation, XSS protection, and image format detection
-   **📦 Multiple Formats:** Generate SVG, PNG, JPEG, WebP, and AVIF formats
-   **🚀 Zero Dependencies:** Core library has no runtime dependencies
-   **🌈 Unlimited Colors:** Gradients, RGB, RGBA, hex colors with full transparency support
-   **🍎 Native iOS Support:** Swift package using JavaScriptCore (zero external dependencies)
-   **🤖 Native Android Support:** Kotlin library with J2V8 JavaScript engine

## 🎯 Why Intosoft QRCode?

Unlike other QR code generators, we guarantee:

✅ **SVG output that opens perfectly in Adobe Illustrator**  
✅ **Consistent rendering across all browsers and platforms**  
✅ **Clean, optimized paths with proper number formatting**  
✅ **Valid XML structure with proper namespaces**  
✅ **Security-first approach with URL validation**

[Read our SVG Quality Guide →](./SVG_QUALITY_GUIDE.md)

![Sample image](https://custoqr.com/sample.png)

### [🎨 Live Demo / Config Generator](https://custoqr.com)

### [🖼️ Design Showcase - See All Features](./examples/design-showcase.html)

**New in v0.2.0:**
- ✨ 4 New Body Shapes: Mosaic, Fluid, Edge-Cut, Japanese
- 🖼️ Advanced Logo Options: Padding, Opacity, Border Radius
- 📸 All Image Formats: PNG, JPEG, SVG, WebP, GIF, BMP
- 🎨 Feature-Rich Customization

## Installation

### JavaScript/TypeScript (Web, Node.js)

NPM

```
npm i @intosoft/qrcode
```

Yarn

```
yarn add @intosoft/qrcode
```

### iOS (Swift)

Swift Package Manager - Add to your `Package.swift` or Xcode:

```swift
dependencies: [
    .package(url: "https://github.com/Intosoft/qrcode.git", from: "0.1.4")
]
```

[📱 See iOS Documentation →](./packages/ios-swift/README.md)

### Android (Kotlin)

Gradle:

```gradle
dependencies {
    implementation 'com.intosoft:qrcode-android:0.1.4'
}
```

[🤖 See Android Documentation →](./packages/android-kotlin/README.md)

## Examples

### Quick Start

```typescript
import { generateSVGString } from '@intosoft/qrcode';

const svg = generateSVGString({
    value: 'https://intosoft.com',
    length: 300,
    shapes: {
        body: 'dots',              // Try: mosaic, fluid, edge-cut, japanese
        eyeFrame: 'rounded',
        eyeball: 'circle'
    },
    colors: {
        body: '#667eea',
        eyeFrame: {
            topLeft: '#764ba2',
            topRight: '#667eea',
            bottomLeft: '#667eea'
        }
    },
    logo: {
        url: 'https://example.com/logo.png',
        size: 50,
        padding: 5,              // NEW: White space around logo
        borderRadius: 10,        // NEW: Rounded corners
        opacity: 0.95,           // NEW: Transparency control
        removeBackground: true
    }
});
```

### React

```jsx
import { generateSVGString } from '@intosoft/qrcode';

const config = {}; // Paste config here
const svgString = generateSVGString(config);

export const RenderQR = () => {
    return <div dangerouslySetInnerHTML={{ __html: svgString }} />;
};
```

### React Native

First Install [react-native-svg](https://github.com/software-mansion/react-native-svg)
`npm i react-native-svg`

```jsx
import { QRCode } from "@intosoft/qrcode/native";

const config = {}; // Paste config here
// you can use locally imported image, url for the logo
// It support .svg too

export const RenderQR = () => {
    return <QRCode config={config} />;
};
```

### Vanilla JS

```html
<!DOCTYPE html>
  <html>
    <body>
      <div id="svg-container"></div>
    </body>
    <script src="https://unpkg.com/@intosoft/qrcode@0.1.4/dist/iife/index.js"></script>
    <script>
      window.addEventListener("load", function () {
        const config = {}; //paste config here
        const svgString = window.qrcode.generateSVGString(config);
        document.getElementById("svg-container").innerHTML = svgString;
      });
    </script>
  </html>
```

## 🎨 Feature-Rich Customization

### 17 Body Shapes

Choose from a wide variety of body patterns:

**Classic:** `square`, `square-small`, `square-horizontal`, `square-vertical`, `circle`, `circle-small`

**Rounded:** `rounded-horizontal`, `rounded-vertical`

**Geometric:** `diamond`, `star`, `star-small`

**Premium:** `dots`, `classy`, **`mosaic`** ✨, **`fluid`** ✨, **`edge-cut`** ✨, **`japanese`** ✨

### Advanced Logo Integration

```typescript
logo: {
    url: string;              // Any image URL or data URI
    size?: number;            // Size in cells (default: 40)
    padding?: number;         // White space padding (NEW ✨)
    borderRadius?: number;    // Rounded corners in px (NEW ✨)
    opacity?: number;         // 0-1 transparency (NEW ✨)
    removeBackground?: boolean; // Clear QR behind logo
    excavate?: boolean;       // Remove dots under logo
}
```

**Supported Image Formats:** PNG, JPEG, GIF, WebP, SVG, BMP, ICO

### Eye Customization

**Eye Frame Shapes (18 options):** `square`, `circle`, `rounded`, `leaf`, `pointed`, `body`, `body-*` variants

**Eyeball Shapes (18 options):** Same as eye frames with full control

[📖 See Complete Features Guide →](./FEATURES.md)


VueJS
```vue
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { generateSVGString } from '@intosoft/qrcode';

export default defineComponent({
  setup() {
    const svgString = ref<string>('');

    onMounted(() => {
      const config = {}; // Paste config here
      svgString.value = generateSVGString(config);
    });

    return {
      svgString
    };
  }
});
</script>

<template>
<div v-html="svgString"></div>
</template>
```

Angular
```ts
import { Component,ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeHtml, } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { generateSVGString } from '@intosoft/qrcode';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<div [innerHTML]="svgString"></div>'
})
export class AppComponent  {
  title = 'angular';
  svgString: SafeHtml = "";
  constructor(private sanitizer: DomSanitizer,private cdr: ChangeDetectorRef) {}
  
  ngOnInit(): void {
    const config = {}; //paste config here
    const svgString = generateSVGString(config);
    this.svgString = this.sanitizer.bypassSecurityTrustHtml(svgString)
    this.cdr.detectChanges();
  }
}
  ```
  
  NodeJs
  ```js
const qrcode  = require("@intosoft/qrcode");

const config = {}; // paste config here
const svgString = qrcode.generateSVGString(config);
  ```


[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/sakulbudhathoki)

### License [MIT licensed](./LICENSE).

_QR Code is a registered trademark of DENSO WAVE INCORPORATED._
