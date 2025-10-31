# @intosoft/qrcode-vue

Vue 3 components and composables for the @intosoft/qrcode library.

## Installation

```bash
npm install @intosoft/qrcode-vue
# or
yarn add @intosoft/qrcode-vue
```

## Usage

### QRCode Component

```vue
<template>
  <QRCode
    :config="{
      value: 'https://example.com',
      length: 300,
      colors: {
        body: '#2563eb',
        background: '#f8fafc'
      }
    }"
    alt="QR code for example.com"
  />
</template>

<script setup>
import { QRCode } from '@intosoft/qrcode-vue';
</script>
```

### useQRCode Composable

```vue
<template>
  <div v-if="error">Error: {{ error }}</div>
  <div v-else-if="svgString" v-html="svgString" />
  <div v-else>Loading...</div>
</template>

<script setup>
import { ref } from 'vue';
import { useQRCode } from '@intosoft/qrcode-vue';

const config = ref({
  value: 'https://example.com',
  length: 300
});

const { svgString, error } = useQRCode(config);
</script>
```

### useQRCodeDownload Composable

```vue
<template>
  <button @click="downloadQR('my-qr-code.png')">
    Download QR Code
  </button>
</template>

<script setup>
import { useQRCodeDownload } from '@intosoft/qrcode-vue';

const config = {
  value: 'https://example.com'
};

const downloadQR = useQRCodeDownload(config);
</script>
```

## API Reference

### QRCode Component Props

- `config`: QR code configuration object (required)
- `alt?`: Alt text for accessibility (default: 'QR Code')
- `title?`: Title for accessibility
- `class?`: CSS class name

### useQRCode Composable

Parameters:
- `config`: QR code configuration (can be reactive)

Returns:
- `svgString`: Reactive SVG string or null
- `error`: Reactive error message or null
- `regenerate`: Function to manually regenerate QR code

### useQRCodeDownload Composable

Parameters:
- `config`: QR code configuration (can be reactive)

Returns:
- Function that accepts `filename?` parameter for download
