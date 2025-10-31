# 🎨 Intosoft QRCode - Complete Features Guide

## ✨ Design Patterns

### Body Shapes (17 Options)

Your QR code can use any of these beautiful body patterns:

#### Classic Shapes
- **`square`** - Traditional square pixels (default)
- **`square-small`** - Smaller squares with gaps
- **`square-horizontal`** - Horizontally stretched rectangles
- **`square-vertical`** - Vertically stretched rectangles
- **`circle`** - Perfect circles
- **`circle-small`** - Smaller circles with gaps

#### Rounded Shapes
- **`rounded-horizontal`** - Rounded on horizontal edges
- **`rounded-vertical`** - Rounded on vertical edges

#### Geometric Shapes
- **`diamond`** - Diamond/rhombus shapes
- **`star`** - Star patterns (5 points)
- **`star-small`** - Smaller stars (4 points)

#### Premium Styles ✨
- **`dots`** - Smart dots with triangular connections
- **`classy`** - Elegant rounded corners on edges
- **`mosaic`** - Tile-like pattern with intelligent corners
- **`fluid`** - Organic flowing design
- **`edge-cut`** - Sharp angular cuts
- **`japanese`** - Minimalist Japanese-inspired design

### Eye Frame Shapes (18 Options)

Customize the outer square of the three positioning eyes:

- **`square`** - Classic square frame
- **`circle`** - Circular frame
- **`rounded`** - Fully rounded corners
- **`leaf`** - Leaf-style (3 rounded corners)
- **`pointed`** - Single pointed corner
- **`body`** - Match the body pattern
- **`body-square`** - Square matching body color
- **`body-square-small`** - Small square matching body
- **`body-square-horizontal`** - Horizontal rectangle matching body
- **`body-square-vertical`** - Vertical rectangle matching body
- **`body-circle`** - Circle matching body
- **`body-rounded-horizontal`** - Horizontal rounded matching body
- **`body-rounded-vertical`** - Vertical rounded matching body
- **`body-diamond`** - Diamond matching body
- **`body-star`** - Star matching body
- **`body-star-small`** - Small star matching body
- **`body-circle-small`** - Small circle matching body

### Eyeball Shapes (18 Options)

Customize the inner dot of the three positioning eyes:

- **`square`** - Classic square eyeball
- **`circle`** - Circular eyeball
- **`rounded`** - Fully rounded
- **`leaf`** - Leaf-style (3 rounded corners)
- **`pointed`** - Opposite corners rounded
- **`extra-rounded`** - Single corner rounded
- **`body`** - Match the body pattern
- All `body-*` options same as Eye Frame

---

## 🎨 Color Customization

### Full Color Control

```typescript
{
  colors: {
    background: '#ffffff',     // QR code background
    body: '#000000',           // Main body color
    eyeFrame: {                // Eye frame colors (outer square)
      topLeft: '#ff0000',      // Top-left eye
      topRight: '#00ff00',     // Top-right eye
      bottomLeft: '#0000ff',   // Bottom-left eye
    },
    eyeball: {                 // Eyeball colors (inner dot)
      topLeft: '#ff0000',
      topRight: '#00ff00',
      bottomLeft: '#0000ff',
    }
  }
}
```

### Special Color Values

- **`'body'`** - Use the main body color for eyes
- **Hex colors** - `#ff0000`, `#00ff00`
- **RGB** - `rgb(255, 0, 0)`
- **RGBA** - `rgba(255, 0, 0, 0.8)` (with transparency)
- **Named colors** - `red`, `blue`, `green`

---

## 🖼️ Logo Integration

### Comprehensive Logo Options

```typescript
{
  logo: {
    url: string;              // URL or data URI
    size?: number;            // Size in cells (default: 40)
    removeBackground?: boolean; // Clear QR behind logo (default: false)
    padding?: number;         // White space around logo (default: 0)
    opacity?: number;         // 0-1 transparency (default: 1)
    borderRadius?: number;    // Rounded corners in pixels (default: 0)
    excavate?: boolean;       // Remove QR dots behind logo (default: true)
  }
}
```

### Supported Image Formats

✅ **PNG** - Perfect for logos with transparency  
✅ **JPEG/JPG** - Good for photos  
✅ **WebP** - Modern format with great compression  
✅ **SVG** - Vector logos (best quality)  
✅ **GIF** - Animated or static  
✅ **Data URIs** - Embedded base64 images  

### Logo Examples

**Simple Logo:**
```typescript
{
  logo: {
    url: 'https://example.com/logo.png',
    size: 40
  }
}
```

**Logo with Padding and Rounded Corners:**
```typescript
{
  logo: {
    url: 'https://example.com/logo.png',
    size: 50,
    padding: 5,              // 5 cells of white space
    borderRadius: 10,        // 10px rounded corners
    removeBackground: true,  // Clear QR dots behind logo
    opacity: 0.9            // Slightly transparent
  }
}
```

**Semi-Transparent Logo:**
```typescript
{
  logo: {
    url: 'data:image/png;base64,iVBORw0KG...',
    size: 35,
    opacity: 0.7,
    borderRadius: 50        // Fully circular logo
  }
}
```

---

## ⚙️ Technical Configuration

### Error Correction Levels

Higher error correction = more data redundancy = can have larger logos

- **`L`** (Low) - 7% damage recovery
- **`M`** (Medium) - 15% damage recovery (default)
- **`Q`** (Quartile) - 25% damage recovery
- **`H`** (High) - 30% damage recovery (recommended for logos)

```typescript
{
  errorCorrectionLevel: 'H'  // Best for QR codes with logos
}
```

### Size and Padding

```typescript
{
  length: 300,    // QR code size in pixels (default: 300)
  padding: 20,    // White border in pixels (default: 20)
}
```

---

## 🎯 Complete Examples

### Example 1: Modern Tech Company
```typescript
import { generateSVGString } from '@intosoft/qrcode';

const svg = generateSVGString({
  value: 'https://techcompany.com',
  length: 400,
  errorCorrectionLevel: 'H',
  shapes: {
    body: 'dots',
    eyeFrame: 'rounded',
    eyeball: 'circle'
  },
  colors: {
    background: '#ffffff',
    body: '#667eea',
    eyeFrame: {
      topLeft: '#764ba2',
      topRight: '#667eea',
      bottomLeft: '#f093fb'
    },
    eyeball: {
      topLeft: '#667eea',
      topRight: '#764ba2',
      bottomLeft: '#667eea'
    }
  },
  logo: {
    url: 'https://techcompany.com/logo.svg',
    size: 50,
    padding: 8,
    borderRadius: 12,
    removeBackground: true,
    opacity: 1
  }
});
```

### Example 2: Minimalist Japanese Style
```typescript
const svg = generateSVGString({
  value: 'https://minimal.design',
  shapes: {
    body: 'japanese',
    eyeFrame: 'body',
    eyeball: 'circle'
  },
  colors: {
    background: '#fafafa',
    body: '#1a1a1a',
    eyeFrame: {
      topLeft: 'body',
      topRight: 'body',
      bottomLeft: 'body'
    },
    eyeball: {
      topLeft: '#1a1a1a',
      topRight: '#1a1a1a',
      bottomLeft: '#1a1a1a'
    }
  },
  logo: {
    url: 'https://minimal.design/logo.png',
    size: 40,
    padding: 4,
    borderRadius: 40,  // Circular logo
    removeBackground: true
  }
});
```

### Example 3: Playful & Colorful
```typescript
const svg = generateSVGString({
  value: 'https://funbrand.com',
  shapes: {
    body: 'fluid',
    eyeFrame: 'leaf',
    eyeball: 'rounded'
  },
  colors: {
    background: '#fff5f7',
    body: '#ff6b6b',
    eyeFrame: {
      topLeft: '#4ecdc4',
      topRight: '#45b7d1',
      bottomLeft: '#f7b731'
    },
    eyeball: {
      topLeft: '#ee5a6f',
      topRight: '#2d98da',
      bottomLeft: '#f79f1f'
    }
  },
  logo: {
    url: 'https://funbrand.com/mascot.png',
    size: 55,
    padding: 6,
    borderRadius: 8,
    opacity: 0.95
  }
});
```

### Example 4: Corporate Professional
```typescript
const svg = generateSVGString({
  value: 'https://corporate.biz',
  errorCorrectionLevel: 'H',
  shapes: {
    body: 'classy',
    eyeFrame: 'square',
    eyeball: 'square'
  },
  colors: {
    background: '#ffffff',
    body: '#1e3a8a',
    eyeFrame: {
      topLeft: '#1e3a8a',
      topRight: '#1e3a8a',
      bottomLeft: '#1e3a8a'
    },
    eyeball: {
      topLeft: '#1e3a8a',
      topRight: '#1e3a8a',
      bottomLeft: '#1e3a8a'
    }
  },
  logo: {
    url: 'https://corporate.biz/logo.svg',
    size: 45,
    padding: 10,
    borderRadius: 4,
    removeBackground: true
  }
});
```

### Example 5: Artistic Mosaic
```typescript
const svg = generateSVGString({
  value: 'https://artist.gallery',
  shapes: {
    body: 'mosaic',
    eyeFrame: 'rounded',
    eyeball: 'leaf'
  },
  colors: {
    background: '#f8f9fa',
    body: '#2c3e50',
    eyeFrame: {
      topLeft: '#e74c3c',
      topRight: '#3498db',
      bottomLeft: '#f39c12'
    },
    eyeball: {
      topLeft: '#c0392b',
      topRight: '#2980b9',
      bottomLeft: '#d68910'
    }
  },
  logo: {
    url: 'https://artist.gallery/signature.png',
    size: 48,
    padding: 5,
    borderRadius: 24,  // Half of size for circular
    opacity: 0.92
  }
});
```

---

## 🔍 Logo Best Practices

### Size Guidelines

| Logo Purpose | Recommended Size | Error Correction |
|--------------|------------------|------------------|
| Small icon | 30-40 cells | H |
| Normal logo | 40-55 cells | H |
| Large logo | 55-70 cells | H (max) |

⚠️ **Warning:** Logos larger than 70 cells may make the QR code unscannable!

### Image Format Recommendations

| Format | Best For | Transparency | Quality |
|--------|----------|--------------|---------|
| **SVG** | Logos, icons | ✅ Yes | ⭐⭐⭐⭐⭐ Best |
| **PNG** | Logos with transparency | ✅ Yes | ⭐⭐⭐⭐ Excellent |
| **WebP** | Modern web | ✅ Yes | ⭐⭐⭐⭐ Excellent |
| **JPEG** | Photos | ❌ No | ⭐⭐⭐ Good |
| **GIF** | Simple graphics | ✅ Yes | ⭐⭐ Fair |

### Logo Quality Tips

1. **Use high-resolution images** (at least 200x200px)
2. **Enable `removeBackground: true`** for better scanning
3. **Add `padding`** for logos that touch edges
4. **Use `borderRadius`** for softer appearance
5. **Set `errorCorrectionLevel: 'H'`** when using logos
6. **Test scanning** after adding a logo

---

## 🎨 Design Combinations

### Best Combinations by Style

**Modern/Tech:**
- Body: `dots`, `fluid`, `classy`
- Eye Frame: `rounded`, `leaf`
- Eye Ball: `circle`, `rounded`

**Professional/Corporate:**
- Body: `square`, `classy`, `mosaic`
- Eye Frame: `square`, `rounded`
- Eye Ball: `square`, `circle`

**Artistic/Creative:**
- Body: `mosaic`, `fluid`, `edge-cut`
- Eye Frame: `leaf`, `pointed`
- Eye Ball: `leaf`, `extra-rounded`

**Minimalist:**
- Body: `japanese`, `square-small`, `circle-small`
- Eye Frame: `body`, `square`
- Eye Ball: `circle`, `body`

---

## 📊 Feature Comparison

| Feature | Free Alternative | Intosoft QRCode |
|---------|-----------------|-----------------|
| Body Shapes | 1-3 | **17** ✨ |
| Eye Customization | Limited | **Full control** |
| Logo Support | Basic | **Advanced** (padding, opacity, border radius) |
| Color Options | Limited | **Unlimited** |
| Image Formats | PNG only | **All formats** (PNG, JPEG, SVG, WebP) |
| Error Correction | Basic | **All levels** (L, M, Q, H) |
| TypeScript Types | ❌ | ✅ Full support |
| Platform Support | Web only | **8 platforms** |

---

## 🚀 Performance

### File Sizes

| Configuration | SVG Size | Recommended Use |
|--------------|----------|-----------------|
| Simple (square) | ~2-5 KB | High-traffic pages |
| Complex (dots/classy) | ~8-15 KB | Normal use |
| With logo | +logo size | Marketing materials |

### Scanning Performance

All designs are optimized for scanning:
- ✅ Works with standard QR scanners
- ✅ Works with phone cameras
- ✅ High error correction ensures reliability
- ✅ Logo placement preserves scannability

---

## 💡 Tips & Tricks

### Making QR Codes Stand Out

1. **Use contrasting colors** for better scanning
2. **Match your brand colors** to eye elements
3. **Add your logo** with proper padding
4. **Use fluid/mosaic** for unique appearance
5. **Test on different backgrounds** before finalizing

### Common Mistakes to Avoid

❌ **Don't:** Use similar colors for body and background  
✅ **Do:** Use high contrast (dark on light, or vice versa)

❌ **Don't:** Make logos too large (>70 cells)  
✅ **Do:** Keep logos 40-55 cells with error correction H

❌ **Don't:** Use low-resolution logo images  
✅ **Do:** Use SVG or high-res PNG (200x200px minimum)

❌ **Don't:** Forget to test scanning  
✅ **Do:** Test with multiple devices before deploying

---

## 🎯 Summary

**You now have:**
- ✨ **17 body shape options** for unique designs
- 🎨 **18 eye frame shapes** for customization
- 👁️ **18 eyeball shapes** for variety
- 🖼️ **Advanced logo integration** with 6 options
- 🌈 **Unlimited color combinations**
- 📱 **Support for all image formats**
- ⚡ **Optimized for scanning performance**

**This makes Intosoft QRCode the most feature-rich QR code generator available!** 🚀
