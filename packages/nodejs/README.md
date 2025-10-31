# @intosoft/qrcode-nodejs

Node.js helper for [@intosoft/qrcode](../README.md) with file system integration, image format conversion, and Express.js middleware support.

## Installation

```bash
npm install @intosoft/qrcode @intosoft/qrcode-nodejs
```

## Features

- 💾 **File System Integration** - Save QR codes directly to files
- 🖼️ **Multiple Formats** - Support for SVG, PNG, JPEG, WebP, and AVIF
- 🚀 **Express.js Middleware** - Easy integration with web servers
- 📦 **Batch Processing** - Generate multiple QR codes efficiently
- 🔄 **Stream Processing** - Handle large-scale QR code generation
- ⚡ **High Performance** - Optimized for server-side generation

## Quick Start

### Basic File Generation

```javascript
import { saveQRCodeToFile } from '@intosoft/qrcode-nodejs';

// Save as SVG
await saveQRCodeToFile('Hello World!', {
  filePath: './output/qr-code.svg',
  width: 300,
  height: 300
});

// Save as PNG with custom quality
await saveQRCodeToFile('https://example.com', {
  filePath: './qrcodes/website.png',
  quality: 90,
  compressionLevel: 6,
  createDirectories: true
});
```

### Express.js Integration

```javascript
import express from 'express';
import { createQRCodeMiddleware } from '@intosoft/qrcode-nodejs';

const app = express();

// Serve QR codes at /qr?text=Hello+World
app.use('/qr', createQRCodeMiddleware({
  format: 'png',
  width: 300,
  height: 300,
  cacheControl: 'public, max-age=3600'
}));

// Custom route with text in URL path
app.get('/qr/:text', createQRCodeMiddleware({
  textParam: 'text',
  format: 'svg'
}));

app.listen(3000);
```

### Buffer Generation

```javascript
import { generateQRCodeBuffer } from '@intosoft/qrcode-nodejs';

const pngBuffer = await generateQRCodeBuffer('Hello World!', {
  format: 'png',
  width: 400,
  height: 400,
  quality: 95
});

// Use buffer with HTTP response
res.set('Content-Type', 'image/png');
res.send(pngBuffer);
```

## API Reference

### saveQRCodeToFile(text, options)

Saves a QR code to a file with automatic format detection.

**Parameters:**
- `text: string` - The text content to encode
- `options: SaveQRCodeOptions` - Configuration options

**Options:**
```typescript
interface SaveQRCodeOptions extends ConfigInput {
  filePath: string;                    // Output file path
  format?: 'svg' | 'png' | 'jpeg' | 'webp' | 'avif'; // Format (auto-detected from extension)
  quality?: number;                    // Quality for lossy formats (0-100)
  progressive?: boolean;               // Enable progressive JPEG
  compressionLevel?: number;           // PNG compression level (0-9)
  createDirectories?: boolean;         // Create directories if they don't exist
}
```

**Examples:**
```javascript
// Basic SVG
await saveQRCodeToFile('Hello World!', {
  filePath: './output/qr.svg'
});

// High-quality PNG with custom options
await saveQRCodeToFile('https://example.com', {
  filePath: './output/website.png',
  width: 500,
  height: 500,
  quality: 95,
  compressionLevel: 9,
  eyeFrameShape: 'circle',
  bodyShape: 'rounded'
});

// JPEG with progressive encoding
await saveQRCodeToFile('Large amount of data here', {
  filePath: './output/data.jpg',
  quality: 85,
  progressive: true,
  createDirectories: true
});
```

### generateQRCodeBuffer(text, options)

Generates a QR code as a buffer in the specified format.

**Parameters:**
- `text: string` - The text content to encode
- `options: QRCodeBufferOptions` - Configuration options

**Options:**
```typescript
interface QRCodeBufferOptions extends ConfigInput {
  format: 'png' | 'jpeg' | 'webp' | 'avif'; // Output format
  quality?: number;                          // Quality for lossy formats
  progressive?: boolean;                     // Enable progressive JPEG
  compressionLevel?: number;                 // PNG compression level
}
```

**Examples:**
```javascript
// Generate PNG buffer
const pngBuffer = await generateQRCodeBuffer('Hello World!', {
  format: 'png',
  width: 300,
  height: 300,
  compressionLevel: 6
});

// Generate WebP buffer with high quality
const webpBuffer = await generateQRCodeBuffer('Data to encode', {
  format: 'webp',
  quality: 90,
  eyeFrameShape: 'rounded'
});
```

### createQRCodeMiddleware(options)

Creates Express.js middleware for serving QR codes.

**Parameters:**
- `options: QRCodeMiddlewareOptions` - Middleware configuration

**Options:**
```typescript
interface QRCodeMiddlewareOptions extends ConfigInput {
  textParam?: string;                        // Parameter name for text (default: 'text')
  format?: 'svg' | 'png' | 'jpeg' | 'webp' | 'avif'; // Output format
  quality?: number;                          // Quality for lossy formats
  cacheControl?: string;                     // Cache control header
  filename?: string | ((text: string) => string); // Custom filename
}
```

**Examples:**
```javascript
// Basic middleware
app.use('/qr', createQRCodeMiddleware({
  format: 'png',
  width: 200,
  height: 200
}));

// Advanced middleware with caching and custom headers
app.use('/api/qr', createQRCodeMiddleware({
  format: 'svg',
  cacheControl: 'public, max-age=86400',
  filename: (text) => `qr-${text.slice(0, 10)}.svg`,
  eyeFrameShape: 'circle'
}));

// Middleware with URL path parameter
app.get('/qr/:data', createQRCodeMiddleware({
  textParam: 'data',
  format: 'png',
  quality: 90
}));
```

### batchGenerateQRCodes(items, baseOptions)

Batch generate multiple QR codes to files.

**Parameters:**
- `items: Array<{text: string, filePath: string, ...}>` - Items to generate
- `baseOptions: Partial<SaveQRCodeOptions>` - Base options for all items

**Example:**
```javascript
await batchGenerateQRCodes([
  { 
    text: 'Hello World!', 
    filePath: './output/hello.png' 
  },
  { 
    text: 'https://example.com', 
    filePath: './output/website.svg' 
  },
  { 
    text: 'Custom QR', 
    filePath: './output/custom.png', 
    width: 400,
    eyeFrameShape: 'circle'
  }
], {
  createDirectories: true,
  quality: 90
});
```

### streamQRCodeGeneration(texts, generateFileName, options)

Stream QR code generation for large-scale processing.

**Parameters:**
- `texts: Iterable<string>` - Iterable of text content
- `generateFileName: (text: string, index: number) => string` - Filename generator
- `options: Partial<SaveQRCodeOptions>` - Generation options

**Example:**
```javascript
const urls = [
  'https://example.com',
  'https://google.com',
  'https://github.com'
];

await streamQRCodeGeneration(
  urls,
  (text, index) => `./qrcodes/url-${index}.png`,
  {
    format: 'png',
    width: 200,
    height: 200,
    createDirectories: true,
    quality: 85
  }
);
```

## Complete Examples

### REST API Server

```javascript
import express from 'express';
import { createQRCodeMiddleware, generateQRCodeBuffer } from '@intosoft/qrcode-nodejs';

const app = express();
app.use(express.json());

// Simple QR code endpoint
app.use('/qr', createQRCodeMiddleware({
  format: 'png',
  width: 300,
  height: 300,
  cacheControl: 'public, max-age=3600'
}));

// Custom QR code endpoint with POST data
app.post('/api/generate', async (req, res) => {
  try {
    const { text, format = 'png', ...options } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const buffer = await generateQRCodeBuffer(text, {
      format,
      ...options
    });

    res.set('Content-Type', `image/${format}`);
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to generate QR code',
      message: error.message 
    });
  }
});

app.listen(3000, () => {
  console.log('QR Code API server running on port 3000');
});
```

### File Processing CLI Tool

```javascript
#!/usr/bin/env node
import { saveQRCodeToFile, batchGenerateQRCodes } from '@intosoft/qrcode-nodejs';
import { readFileSync } from 'fs';
import { program } from 'commander';

program
  .command('generate <text>')
  .option('-o, --output <path>', 'Output file path')
  .option('-f, --format <format>', 'Output format', 'png')
  .option('-s, --size <size>', 'Size (width and height)', '300')
  .option('-q, --quality <quality>', 'Quality (0-100)', '90')
  .action(async (text, options) => {
    try {
      const size = parseInt(options.size);
      await saveQRCodeToFile(text, {
        filePath: options.output || `qr-${Date.now()}.${options.format}`,
        format: options.format,
        width: size,
        height: size,
        quality: parseInt(options.quality),
        createDirectories: true
      });
      console.log('QR code generated successfully!');
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

program
  .command('batch <file>')
  .option('-d, --directory <dir>', 'Output directory', './output')
  .action(async (file, options) => {
    try {
      const data = JSON.parse(readFileSync(file, 'utf8'));
      const items = data.map((item, index) => ({
        text: item.text,
        filePath: `${options.directory}/qr-${index}.png`,
        ...item.options
      }));

      await batchGenerateQRCodes(items, {
        createDirectories: true,
        width: 200,
        height: 200
      });

      console.log(`Generated ${items.length} QR codes successfully!`);
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

program.parse();
```

### Background Job Processor

```javascript
import { Queue, Worker } from 'bullmq';
import { saveQRCodeToFile } from '@intosoft/qrcode-nodejs';
import Redis from 'ioredis';

const redis = new Redis();
const qrQueue = new Queue('qr-generation', { connection: redis });

// Add jobs to queue
export async function enqueueQRGeneration(text, options) {
  return qrQueue.add('generate', { text, options });
}

// Process jobs
const worker = new Worker('qr-generation', async (job) => {
  const { text, options } = job.data;
  
  try {
    await saveQRCodeToFile(text, {
      ...options,
      createDirectories: true
    });
    
    return { success: true, filePath: options.filePath };
  } catch (error) {
    throw new Error(`QR generation failed: ${error.message}`);
  }
}, { connection: redis });

worker.on('completed', (job, result) => {
  console.log(`QR code generated: ${result.filePath}`);
});

worker.on('failed', (job, err) => {
  console.error(`Job failed: ${err.message}`);
});
```

## Configuration Options

All functions accept the same configuration options as the core [@intosoft/qrcode](../README.md#configuration) library:

- `width`, `height` - QR code dimensions
- `eyeFrameShape` - Shape of eye frames ('square', 'circle', 'rounded')
- `eyeballShape` - Shape of eyeballs ('square', 'circle')
- `bodyShape` - Shape of body dots ('square', 'circle', 'rounded')
- `gradient` - Gradient configuration
- `logo` - Logo configuration
- And more...

## Performance Tips

1. **Use appropriate formats**: SVG for scalability, PNG for web, JPEG for photos
2. **Optimize quality**: Balance file size vs quality based on use case
3. **Batch processing**: Use `batchGenerateQRCodes` for multiple files
4. **Caching**: Implement caching in your Express middleware
5. **Streaming**: Use `streamQRCodeGeneration` for large datasets

## Dependencies

- **Sharp**: High-performance image processing
- **@intosoft/qrcode**: Core QR code generation library

## Error Handling

All functions throw descriptive errors:

```javascript
try {
  await saveQRCodeToFile('text', { filePath: '/invalid/path.png' });
} catch (error) {
  console.error('Save failed:', error.message);
  // Handle error appropriately
}
```

## TypeScript Support

Full TypeScript definitions included:

```typescript
import { 
  saveQRCodeToFile,
  type SaveQRCodeOptions,
  type QRCodeBufferOptions 
} from '@intosoft/qrcode-nodejs';
```

## License

MIT - See [LICENSE](../../LICENSE) file for details.
