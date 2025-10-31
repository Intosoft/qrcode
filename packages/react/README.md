# @intosoft/qrcode-react

React components and hooks for the @intosoft/qrcode library.

## Installation

```bash
npm install @intosoft/qrcode-react
# or
yarn add @intosoft/qrcode-react
```

## Usage

### QRCode Component

```tsx
import React from 'react';
import { QRCode } from '@intosoft/qrcode-react';

function App() {
  return (
    <QRCode
      config={{
        value: 'https://example.com',
        length: 300,
        colors: {
          body: '#2563eb',
          background: '#f8fafc'
        }
      }}
      alt="QR code for example.com"
      style={{ margin: '20px' }}
    />
  );
}
```

### useQRCode Hook

```tsx
import { useQRCode } from '@intosoft/qrcode-react';

function CustomQRCode() {
  const { svgString, isLoading, error } = useQRCode({
    value: 'https://example.com',
    length: 300
  });

  if (isLoading) return <div>Generating QR code...</div>;
  if (error) return <div>Error: {error}</div>;

  return <div dangerouslySetInnerHTML={{ __html: svgString }} />;
}
```

### useQRCodeDownload Hook

```tsx
import { useQRCodeDownload } from '@intosoft/qrcode-react';

function DownloadButton() {
  const downloadQR = useQRCodeDownload({
    value: 'https://example.com'
  });

  return (
    <button onClick={() => downloadQR('my-qr-code.png')}>
      Download QR Code
    </button>
  );
}
```

## API Reference

### QRCode Component Props

- `config`: QR code configuration object
- `style?`: Optional CSS styles
- `className?`: Optional CSS class name
- `alt?`: Alt text for accessibility
- `title?`: Title for accessibility

### useQRCode Hook

Returns an object with:
- `svgString`: Generated SVG string or null
- `isLoading`: Loading state (always false in current implementation)
- `error`: Error message or null

### useQRCodeDownload Hook

Returns a function that accepts:
- `filename?`: Optional filename for download (default: 'qr-code.png')
