# @intosoft/qrcode - Platform Helpers

This document provides an overview of all the platform-specific helper packages available for the @intosoft/qrcode library.

## 🎯 Quick Navigation

| Platform         | Package                         | Documentation                             | Features                                          |
| ---------------- | ------------------------------- | ----------------------------------------- | ------------------------------------------------- |
| **React**        | `@intosoft/qrcode-react`        | [README](packages/react/README.md)        | Components, hooks, download utilities             |
| **React Native** | `@intosoft/qrcode-react-native` | [README](packages/react-native/README.md) | Native SVG, sharing, mobile-optimized             |
| **Vue**          | `@intosoft/qrcode-vue`          | [README](packages/vue/README.md)          | Components, composables, reactivity               |
| **Angular**      | `@intosoft/qrcode-angular`      | [README](packages/angular/README.md)      | Service, component, module                        |
| **Vanilla JS**   | `@intosoft/qrcode-vanilla`      | [README](packages/vanilla/README.md)      | DOM manipulation, downloads, clipboard            |
| **Node.js**      | `@intosoft/qrcode-nodejs`       | [README](packages/nodejs/README.md)       | File system, Express middleware, batch processing |

## 🚀 Installation & Usage

Each helper package is designed to work seamlessly with its respective platform while providing a consistent API.

### React

```bash
npm install @intosoft/qrcode @intosoft/qrcode-react
```

```jsx
import { QRCode, useQRCode } from '@intosoft/qrcode-react';

function App() {
    return <QRCode text="Hello World!" width={200} height={200} eyeFrameShape="circle" />;
}
```

### React Native

```bash
npm install @intosoft/qrcode @intosoft/qrcode-react-native react-native-svg
```

```jsx
import { QRCode } from '@intosoft/qrcode-react-native';

function App() {
    return (
        <QRCode text="Hello World!" width={200} height={200} logoSource={require('./logo.png')} />
    );
}
```

### Vue

```bash
npm install @intosoft/qrcode @intosoft/qrcode-vue
```

```vue
<template>
    <QRCode text="Hello World!" :width="200" :height="200" eye-frame-shape="circle" />
</template>

<script setup>
import { QRCode } from '@intosoft/qrcode-vue';
</script>
```

### Angular

```bash
npm install @intosoft/qrcode @intosoft/qrcode-angular
```

```typescript
// app.module.ts
import { QRCodeModule } from '@intosoft/qrcode-angular';

@NgModule({
    imports: [QRCodeModule],
})
export class AppModule {}
```

```html
<!-- component.html -->
<qr-code text="Hello World!" [width]="200" [height]="200" eyeFrameShape="circle"> </qr-code>
```

### Vanilla JavaScript

```bash
npm install @intosoft/qrcode @intosoft/qrcode-vanilla
```

```javascript
import { createQRCodeElement } from '@intosoft/qrcode-vanilla';

await createQRCodeElement('Hello World!', {
    element: document.getElementById('container'),
    width: 200,
    height: 200,
});
```

### Node.js

```bash
npm install @intosoft/qrcode @intosoft/qrcode-nodejs
```

```javascript
import { saveQRCodeToFile } from '@intosoft/qrcode-nodejs';

await saveQRCodeToFile('Hello World!', {
    filePath: './qr-code.png',
    width: 300,
    height: 300,
});
```

## 🔧 Common Features

All helper packages provide:

-   **Type Safety**: Full TypeScript support with comprehensive type definitions
-   **Configuration**: All core QR code options (shapes, colors, gradients, logos)
-   **Error Handling**: Consistent error handling patterns
-   **Performance**: Optimized for each platform's specific requirements
-   **Documentation**: Comprehensive examples and API documentation

## 🎨 Shared Configuration

All packages accept the same base configuration options:

```typescript
interface ConfigInput {
    width?: number; // QR code width
    height?: number; // QR code height
    eyeFrameShape?: 'square' | 'circle' | 'rounded';
    eyeballShape?: 'square' | 'circle';
    bodyShape?: 'square' | 'circle' | 'rounded';
    gradient?: {
        type: 'linear' | 'radial';
        colors: string[];
        direction?: number;
    };
    logo?: {
        url: string;
        size: number;
        position?: { x: number; y: number };
    };
    // ... and more options
}
```

## 📱 Platform-Specific Features

### React

-   Component-based architecture
-   React hooks for state management
-   Download utilities for client-side file generation
-   Server-side rendering support

### React Native

-   Native SVG rendering for optimal performance
-   Built-in sharing functionality
-   Logo overlay support with automatic sizing
-   Cross-platform compatibility (iOS/Android)

### Vue

-   Vue 3 composition API support
-   Reactive QR code generation
-   Built-in download and sharing composables
-   Seamless integration with Vue ecosystem

### Angular

-   Angular service architecture
-   Dependency injection support
-   Component with full template integration
-   NgModule for easy integration

### Vanilla JavaScript

-   No framework dependencies
-   Direct DOM manipulation
-   Clipboard API integration
-   Format conversion (SVG, PNG, JPEG)
-   IIFE builds for script tag usage

### Node.js

-   File system integration
-   Express.js middleware
-   Multiple image format support (via Sharp)
-   Batch processing capabilities
-   Stream processing for large datasets

## 🛠️ Development & Building

### Monorepo Structure

```
packages/
├── react/                 # React helper
├── react-native/          # React Native helper
├── vue/                   # Vue helper
├── angular/               # Angular helper
├── vanilla/               # Vanilla JS helper
└── nodejs/                # Node.js helper
```

### Building All Packages

```bash
# Build core library and all packages
yarn build

# Build only packages
yarn build:packages

# Type check all packages
yarn test:packages
```

### Building Individual Packages

```bash
# Navigate to specific package
cd packages/react

# Build the package
yarn build

# Development mode (watch)
yarn dev
```

## 🧪 Testing

Each package includes:

-   TypeScript compilation tests
-   Linting and formatting
-   Type checking
-   Integration with core library

```bash
# Test all packages
yarn test:packages

# Test specific package
cd packages/react && yarn type-check
```

## 📦 Publishing

All packages are configured for NPM publishing:

-   Scoped packages under `@intosoft/`
-   Consistent versioning
-   Proper peer dependencies
-   Distribution files included

```bash
# From root directory
yarn publish --workspaces

# Or individual package
cd packages/react && yarn publish
```

## 🤝 Contributing

When adding new platform helpers:

1. **Create package directory**: `packages/[platform-name]/`
2. **Setup package.json**: Use existing packages as template
3. **Implement core functionality**: Component/service + utilities
4. **Add comprehensive README**: With examples and API docs
5. **Include TypeScript configs**: For proper type checking
6. **Add build configuration**: Using tsup or platform-specific tools
7. **Update this overview**: Add to the quick navigation table

### Package Template Structure

```
packages/new-platform/
├── package.json           # Package configuration
├── index.ts              # Main entry point
├── tsconfig.json         # TypeScript configuration
├── tsup.config.ts        # Build configuration
└── README.md             # Documentation
```

## 🔗 Integration Examples

### Multi-Platform App

Use different helpers based on the platform:

```javascript
// Web (React)
import { QRCode } from '@intosoft/qrcode-react';

// Mobile (React Native)
import { QRCode } from '@intosoft/qrcode-react-native';

// Server (Node.js)
import { saveQRCodeToFile } from '@intosoft/qrcode-nodejs';

// Same configuration works across platforms
const config = {
    text: 'https://example.com',
    width: 300,
    height: 300,
    eyeFrameShape: 'circle',
};
```

### Micro-frontend Architecture

Each micro-frontend can use its preferred framework:

```javascript
// Angular micro-frontend
import { QRCodeService } from '@intosoft/qrcode-angular';

// Vue micro-frontend
import { useQRCode } from '@intosoft/qrcode-vue';

// React micro-frontend
import { useQRCode } from '@intosoft/qrcode-react';
```

## 📋 Roadmap

Future platform helpers planned:

-   **Svelte**: `@intosoft/qrcode-svelte`
-   **Web Components**: `@intosoft/qrcode-webcomponents`
-   **Flutter/Dart**: `@intosoft/qrcode-flutter`
-   **Unity**: `@intosoft/qrcode-unity`
-   **Electron**: `@intosoft/qrcode-electron`

## 📄 License

All helper packages are licensed under MIT - see [LICENSE](LICENSE) file for details.

## 🆘 Support

-   **Documentation**: Individual package README files
-   **Issues**: GitHub issues with platform-specific labels
-   **Examples**: Complete examples in each package's README
-   **TypeScript**: Full type definitions included
