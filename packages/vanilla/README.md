# @intosoft/qrcode-vanilla

Vanilla JavaScript helper for [@intosoft/qrcode](../README.md) that provides easy-to-use functions for generating QR codes in the browser with DOM manipulation utilities and download functionality.

## Installation

```bash
npm install @intosoft/qrcode @intosoft/qrcode-vanilla
```

## Features

- 🎯 **Easy DOM integration** - Render QR codes directly into DOM elements
- 📥 **Download functionality** - Save QR codes as SVG, PNG, or JPEG files
- 📋 **Clipboard support** - Copy QR codes to clipboard
- 🎨 **Custom styling** - Add CSS classes and styles to generated elements
- 📱 **Data URLs** - Generate QR codes as data URLs for use in img elements
- 🔄 **Format conversion** - Convert between SVG and raster formats

## Quick Start

### Basic Usage

```javascript
import { createQRCodeElement } from '@intosoft/qrcode-vanilla';

// Render QR code into a DOM element
const container = document.getElementById('qr-container');
await createQRCodeElement('Hello World!', {
  element: container,
  width: 200,
  height: 200,
  eyeFrameShape: 'square'
});
```

### Using CDN (IIFE)

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/@intosoft/qrcode/dist/index.global.js"></script>
  <script src="https://unpkg.com/@intosoft/qrcode-vanilla/dist/index.global.js"></script>
</head>
<body>
  <div id="qr-container"></div>
  <script>
    QRCodeVanilla.createQRCodeElement('Hello World!', {
      element: document.getElementById('qr-container'),
      width: 200,
      height: 200
    });
  </script>
</body>
</html>
```

## API Reference

### createQRCodeElement(text, options)

Creates and renders a QR code SVG element into the specified DOM element.

```javascript
await createQRCodeElement('https://example.com', {
  element: document.getElementById('container'),
  width: 300,
  height: 300,
  replace: true,           // Replace existing content (default: true)
  className: 'my-qr-code', // Add CSS class
  style: {                 // Add custom styles
    border: '2px solid black',
    borderRadius: '10px'
  },
  // All QR code options from @intosoft/qrcode
  eyeFrameShape: 'circle',
  bodyShape: 'square',
  gradient: {
    type: 'linear',
    colors: ['#FF6B6B', '#4ECDC4']
  }
});
```

### downloadQRCode(text, options)

Downloads a QR code as a file in various formats.

```javascript
// Download as SVG
await downloadQRCode('https://example.com', {
  filename: 'my-qr-code',
  format: 'svg',
  width: 300,
  height: 300
});

// Download as PNG with 2x scale
await downloadQRCode('Hello World!', {
  filename: 'hello-qr',
  format: 'png',
  scale: 2,
  eyeFrameShape: 'circle'
});

// Download as JPEG with custom quality
await downloadQRCode('Data to encode', {
  filename: 'data-qr',
  format: 'jpeg',
  quality: 0.8,
  scale: 3
});
```

### copyQRCodeToClipboard(text, options)

Copies a QR code SVG to the clipboard.

```javascript
await copyQRCodeToClipboard('https://example.com', {
  width: 200,
  height: 200,
  eyeFrameShape: 'rounded'
});

console.log('QR code copied to clipboard!');
```

### createQRCodeDataURL(text, options)

Creates a QR code as a data URL for use in img elements.

```javascript
// Create PNG data URL
const dataUrl = await createQRCodeDataURL('Hello World!', {
  format: 'png',
  width: 200,
  height: 200,
  scale: 2
});

const img = document.createElement('img');
img.src = dataUrl;
document.body.appendChild(img);

// Create SVG data URL
const svgDataUrl = await createQRCodeDataURL('Text content', {
  format: 'svg',
  width: 150,
  height: 150
});
```

## Configuration Options

All functions accept the same configuration options as the core [@intosoft/qrcode](../README.md#configuration) library, plus additional options specific to each function:

### QRCodeElementOptions

- `element: HTMLElement` - The DOM element to render into
- `replace?: boolean` - Whether to replace existing content (default: true)
- `className?: string` - CSS class to add to the SVG
- `style?: Partial<CSSStyleDeclaration>` - Custom styles to apply

### QRCodeDownloadOptions

- `filename?: string` - Filename without extension (default: 'qrcode')
- `format?: 'svg' | 'png' | 'jpeg'` - Download format (default: 'svg')
- `quality?: number` - JPEG quality 0-1 (default: 0.9)
- `scale?: number` - Scale factor for raster formats (default: 1)

## Examples

### Interactive QR Code Generator

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .qr-container {
      border: 2px solid #ddd;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
      text-align: center;
    }
    .controls {
      margin: 20px 0;
    }
    .controls input, .controls select, .controls button {
      margin: 5px;
      padding: 8px;
    }
  </style>
</head>
<body>
  <div class="controls">
    <input type="text" id="text-input" placeholder="Enter text for QR code" value="Hello World!">
    <select id="eye-shape">
      <option value="square">Square Eyes</option>
      <option value="circle">Circle Eyes</option>
      <option value="rounded">Rounded Eyes</option>
    </select>
    <button onclick="generateQR()">Generate QR Code</button>
    <button onclick="downloadQR()">Download PNG</button>
    <button onclick="copyQR()">Copy to Clipboard</button>
  </div>
  
  <div id="qr-container" class="qr-container">
    <p>QR code will appear here</p>
  </div>

  <script type="module">
    import { createQRCodeElement, downloadQRCode, copyQRCodeToClipboard } from '@intosoft/qrcode-vanilla';
    
    window.generateQR = async function() {
      const text = document.getElementById('text-input').value;
      const eyeShape = document.getElementById('eye-shape').value;
      const container = document.getElementById('qr-container');
      
      try {
        await createQRCodeElement(text, {
          element: container,
          width: 250,
          height: 250,
          eyeFrameShape: eyeShape,
          className: 'generated-qr',
          style: {
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }
        });
      } catch (error) {
        container.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
      }
    };
    
    window.downloadQR = async function() {
      const text = document.getElementById('text-input').value;
      const eyeShape = document.getElementById('eye-shape').value;
      
      try {
        await downloadQRCode(text, {
          filename: 'my-qr-code',
          format: 'png',
          scale: 2,
          eyeFrameShape: eyeShape,
          width: 300,
          height: 300
        });
      } catch (error) {
        alert(`Download failed: ${error.message}`);
      }
    };
    
    window.copyQR = async function() {
      const text = document.getElementById('text-input').value;
      const eyeShape = document.getElementById('eye-shape').value;
      
      try {
        await copyQRCodeToClipboard(text, {
          eyeFrameShape: eyeShape,
          width: 200,
          height: 200
        });
        alert('QR code SVG copied to clipboard!');
      } catch (error) {
        alert(`Copy failed: ${error.message}`);
      }
    };
    
    // Generate initial QR code
    generateQR();
  </script>
</body>
</html>
```

### Dynamic QR Code with Real-time Updates

```javascript
import { createQRCodeElement } from '@intosoft/qrcode-vanilla';

class QRCodeWidget {
  constructor(container) {
    this.container = container;
    this.currentText = '';
    this.options = {
      width: 200,
      height: 200,
      eyeFrameShape: 'square'
    };
  }
  
  async updateText(text) {
    if (text !== this.currentText) {
      this.currentText = text;
      await this.render();
    }
  }
  
  async updateOptions(newOptions) {
    this.options = { ...this.options, ...newOptions };
    await this.render();
  }
  
  async render() {
    if (!this.currentText) {
      this.container.innerHTML = '<p>Enter text to generate QR code</p>';
      return;
    }
    
    try {
      await createQRCodeElement(this.currentText, {
        element: this.container,
        ...this.options
      });
    } catch (error) {
      this.container.innerHTML = `<p>Error: ${error.message}</p>`;
    }
  }
}

// Usage
const widget = new QRCodeWidget(document.getElementById('qr-widget'));

// Update on input change
document.getElementById('text-input').addEventListener('input', (e) => {
  widget.updateText(e.target.value);
});

// Update on option change
document.getElementById('shape-select').addEventListener('change', (e) => {
  widget.updateOptions({ eyeFrameShape: e.target.value });
});
```

## TypeScript Support

The package includes full TypeScript definitions:

```typescript
import { 
  createQRCodeElement, 
  downloadQRCode,
  type QRCodeElementOptions,
  type QRCodeDownloadOptions 
} from '@intosoft/qrcode-vanilla';

const options: QRCodeElementOptions = {
  element: document.getElementById('container')!,
  width: 300,
  height: 300,
  eyeFrameShape: 'circle',
  className: 'my-qr'
};

await createQRCodeElement('Hello TypeScript!', options);
```

## Browser Compatibility

- Modern browsers with ES2020 support
- Requires DOM and Canvas APIs for raster format conversion
- Clipboard API for copy functionality (HTTPS required)

## Error Handling

All functions throw descriptive errors that you should handle:

```javascript
try {
  await createQRCodeElement('text', { element: null });
} catch (error) {
  console.error('QR code generation failed:', error.message);
  // Handle error appropriately
}
```

## License

MIT - See [LICENSE](../../LICENSE) file for details.
