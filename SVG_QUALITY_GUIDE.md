# SVG Output Quality & Compatibility Guide

This guide explains how @intosoft/qrcode ensures high-quality SVG output that works consistently across all platforms, including web browsers and design tools like Adobe Illustrator.

## 🎯 Compatibility Guarantees

Our QR code SVGs are tested and verified to work with:

✅ **Web Browsers**

-   Chrome, Firefox, Safari, Edge (all modern versions)
-   Mobile browsers (iOS Safari, Chrome Mobile)

✅ **Design Tools**

-   Adobe Illustrator CC/2024+
-   Inkscape
-   Figma
-   Sketch
-   Affinity Designer

✅ **Other Tools**

-   SVG optimizers (SVGO, SVGOMG)
-   Vector conversion tools
-   Print production software

## 📋 What We've Fixed

### 1. **Proper XML & Namespace Declarations**

**Before:**

```xml
<svg viewBox="0 0 300 300" width="300" height="300">
```

**After:**

```xml
<svg
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  width="300"
  height="300"
  viewBox="0 0 300 300"
  shape-rendering="crispEdges">
```

### 2. **Clean Path Formatting**

**Before:**

```xml
<path d="M0,0 h10 v10 h-10 v-10  " fill="#000" stroke="#000" stroke-width="0"/>
```

**After:**

```xml
<path fill="#000" d="M0,0h10v10h-10v-10"/>
```

### 3. **Consistent Number Formatting**

**Before:**

```xml
<rect x="-20.000000000001" y="19.999999999999" width="340.00000000001"/>
```

**After:**

```xml
<rect x="-20" y="20" width="340"/>
```

### 4. **Proper Element Structure**

**Before:**

```xml
<defs>

        </defs>
<use href="#logo"/>
```

**After:**

```xml
<defs>
  <image id="logo" href="..." width="50" height="50" x="125" y="125"/>
</defs>
<use xlink:href="#logo"/>
```

## 🔧 SVG Validation Utilities

We provide utilities to help you validate and improve SVG output:

```typescript
import { validateSVG, cleanSVGPath, validateColor } from '@intosoft/qrcode';

// Validate SVG structure
const svg = generateSVGString({ value: 'Hello World' });
const validation = validateSVG(svg);

if (!validation.valid) {
    console.error('SVG issues:', validation.errors);
}

// Clean paths
const cleanPath = cleanSVGPath('M 0 , 0 L 10 , 10  Z  ');
console.log(cleanPath); // "M0,0L10,10Z"

// Validate colors
const color = validateColor('#abc'); // Converts to "#AABBCC"
```

## 🎨 Best Practices for Illustrator

### Opening SVG Files in Illustrator

1. **Direct Import** - Drag and drop or File → Open
2. **Place as Linked** - File → Place (maintains editability)
3. **Paste** - Copy SVG code and paste directly into Illustrator

### Common Issues & Solutions

#### Issue: "The file appears to be damaged"

**Solution:** This was caused by malformed paths. We've fixed this by:

-   Removing unnecessary stroke attributes
-   Properly closing all path elements
-   Using consistent number formatting

#### Issue: Gradients not appearing

**Solution:** We now properly define gradients in `<defs>` with unique IDs:

```xml
<defs>
  <linearGradient id="body" x1="0%" y1="0%" x2="100%" y2="0%" gradientTransform="rotate(45)">
    <stop offset="0%" style="stop-color:rgb(255,0,0);stop-opacity:1"/>
    <stop offset="100%" style="stop-color:rgb(0,0,255);stop-opacity:1"/>
  </linearGradient>
</defs>
```

#### Issue: Logo not showing

**Solution:** We validate and sanitize logo URLs:

```typescript
const svg = generateSVGString({
    value: 'Hello',
    logo: {
        url: 'https://example.com/logo.png', // Must be valid URL
        size: 50,
    },
});
```

## 📱 Platform-Specific Considerations

### Web Browsers

SVGs render perfectly in all modern browsers. For best results:

```typescript
// Use data URLs for inline rendering
const svg = generateSVGString({ value: 'Hello World' });
const dataUrl = `data:image/svg+xml,${encodeURIComponent(svg)}`;

// Or insert directly into DOM
document.getElementById('container').innerHTML = svg;
```

### React Native

React Native requires special handling:

```typescript
import { generateSVGString } from '@intosoft/qrcode';

// Set isReactNative flag
const { svgString } = generateSVGString({
  value: 'Hello World',
  isReactNative: true
});

// Use with react-native-svg
<SvgFromXml xml={svgString} />
```

### Node.js / Server-Side

Save to file or convert to other formats:

```typescript
import { generateSVGString } from '@intosoft/qrcode';
import fs from 'fs';

const svg = generateSVGString({ value: 'Hello World' });

// Save as SVG
fs.writeFileSync('qrcode.svg', svg);

// Or use with Sharp for PNG/JPEG conversion
import sharp from 'sharp';
const buffer = Buffer.from(svg);
await sharp(buffer).png().toFile('qrcode.png');
```

## 🔍 Troubleshooting

### SVG Not Loading in Browser

1. **Check for errors in console**

    ```javascript
    import { validateSVG } from '@intosoft/qrcode';
    const validation = validateSVG(yourSvgString);
    console.log(validation.errors);
    ```

2. **Verify content type**

    ```javascript
    // Correct MIME type
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svgString);
    ```

3. **Check for CORS issues** (if loading external images)
    ```typescript
    // Ensure logo URLs are accessible
    logo: {
        url: 'https://cors-anywhere.herokuapp.com/https://example.com/logo.png';
    }
    ```

### SVG Not Opening in Illustrator

1. **Check file encoding**

    ```javascript
    // Save with UTF-8 encoding
    fs.writeFileSync('qrcode.svg', svg, { encoding: 'utf-8' });
    ```

2. **Add XML declaration** (optional but recommended)

    ```typescript
    import { addXMLDeclaration } from '@intosoft/qrcode';
    const svgWithDeclaration = addXMLDeclaration(svg);
    ```

3. **Validate structure**
    ```typescript
    import { validateSVG } from '@intosoft/qrcode';
    const { valid, errors } = validateSVG(svg);
    if (!valid) {
        console.error('Fix these issues:', errors);
    }
    ```

### Gradients Not Rendering

1. **Check gradient syntax**

    ```typescript
    // Correct format
    colors: {
        body: 'linear-gradient(45deg, rgba(255,0,0,1) 0%, rgba(0,0,255,1) 100%)';
    }
    ```

2. **Verify gradient IDs are unique**

    - Our library automatically generates unique IDs
    - Multiple QR codes on same page won't conflict

3. **Ensure gradients are in defs**
    - All gradients are automatically placed in `<defs>` section
    - Referenced via `url(#gradientId)`

## 📊 Performance Optimization

### File Size Optimization

```typescript
// Smaller file size with square shapes
const svg1 = generateSVGString({
    value: 'Hello',
    shapes: { body: 'square' },
}); // ~2-3KB

// Larger file with complex shapes
const svg2 = generateSVGString({
    value: 'Hello',
    shapes: { body: 'styleA' },
}); // ~5-8KB
```

### Rendering Performance

```typescript
// Best performance - simple shapes
shapes: { body: 'square', eyeFrame: 'square', eyeball: 'square' }

// Good performance - rounded shapes
shapes: { body: 'circle', eyeFrame: 'circle', eyeball: 'circle' }

// More complex - artistic styles
shapes: { body: 'styleA', eyeFrame: 'rounded', eyeball: 'styleB' }
```

## 🚀 Advanced Usage

### Custom SVG Post-Processing

```typescript
import { generateSVGString, cleanSVGPath } from '@intosoft/qrcode';

const svg = generateSVGString({ value: 'Hello World' });

// Add custom filters
const withFilter = svg.replace(
    '</defs>',
    `
  <filter id="shadow">
    <feDropShadow dx="2" dy="2" stdDeviation="3"/>
  </filter>
</defs>`,
);

const filtered = withFilter.replace('<path', '<path filter="url(#shadow)"');
```

### Batch Generation with Validation

```typescript
import { generateSVGString, validateSVG } from '@intosoft/qrcode';

const urls = ['https://site1.com', 'https://site2.com', 'https://site3.com'];

for (const url of urls) {
    const svg = generateSVGString({ value: url });
    const validation = validateSVG(svg);

    if (validation.valid) {
        fs.writeFileSync(`${url.replace(/[^a-z0-9]/gi, '_')}.svg`, svg);
    } else {
        console.error(`Invalid SVG for ${url}:`, validation.errors);
    }
}
```

## 📚 Additional Resources

-   [SVG Specification](https://www.w3.org/TR/SVG2/)
-   [Adobe Illustrator SVG Guidelines](https://helpx.adobe.com/illustrator/using/saving-artwork.html)
-   [MDN SVG Reference](https://developer.mozilla.org/en-US/docs/Web/SVG)
-   [SVGO Optimization Tool](https://github.com/svg/svgo)

## 💡 Tips for Developers

1. **Always validate SVG output in development**

    ```typescript
    if (process.env.NODE_ENV === 'development') {
        const validation = validateSVG(svg);
        if (!validation.valid) console.warn(validation.errors);
    }
    ```

2. **Use TypeScript for type safety**

    ```typescript
    import { ConfigInput } from '@intosoft/qrcode';

    const config: ConfigInput = {
        value: 'Hello',
        length: 300,
        // TypeScript will autocomplete and validate options
    };
    ```

3. **Test with real design tools**

    - Generate sample SVGs
    - Open in Illustrator, Inkscape, etc.
    - Verify they look correct before deploying

4. **Monitor file sizes**

    ```typescript
    const svg = generateSVGString({ value: 'Hello' });
    console.log(`SVG size: ${new Blob([svg]).size} bytes`);
    ```

5. **Use appropriate error correction levels**

    ```typescript
    // For printed QR codes or critical data
    errorCorrectionLevel: 'H'; // High (30% recovery)

    // For digital displays with reliable scanning
    errorCorrectionLevel: 'L'; // Low (7% recovery, smaller size)
    ```

## 🤝 Contributing

Found an SVG compatibility issue? Please:

1. Open an issue with:

    - The configuration used
    - Platform/tool experiencing the issue
    - Expected vs actual behavior
    - Sample SVG if possible

2. Include validation output:
    ```typescript
    import { validateSVG } from '@intosoft/qrcode';
    console.log(validateSVG(problematicSVG));
    ```

---

**Made with ❤️ by IntoSoft**  
For more information, visit our [GitHub repository](https://github.com/Intosoft/qrcode)
