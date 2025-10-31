# Testing Guide - v0.2.0 Features

This guide helps you test and verify all the new features added in v0.2.0.

## Quick Test Commands

```bash
# Build the project
yarn build

# Start the design showcase
python3 -m http.server 8080
# Then open: http://localhost:8080/examples/design-showcase.html

# Type check
./node_modules/.bin/tsc --noEmit

# Run existing examples
cd examples/node && node index.js
```

---

## 1. Testing New Body Shapes

### Test: Mosaic Shape

```typescript
import { generateSVGString } from '@intosoft/qrcode';

const svg = generateSVGString({
    value: 'https://test-mosaic.com',
    length: 300,
    shapes: {
        body: 'mosaic',
        eyeFrame: 'rounded',
        eyeball: 'circle'
    }
});

// Expected: Tile-like pattern with adaptive rounded corners
// Verify: Corners should be rounded based on neighbors
```

### Test: Fluid Shape

```typescript
const svg = generateSVGString({
    value: 'https://test-fluid.com',
    shapes: {
        body: 'fluid',
        eyeFrame: 'leaf',
        eyeball: 'rounded'
    }
});

// Expected: Organic flowing design with circles and rounded connections
// Verify: Isolated dots are circles, connected areas flow smoothly
```

### Test: Edge-Cut Shape

```typescript
const svg = generateSVGString({
    value: 'https://test-edge-cut.com',
    shapes: {
        body: 'edge-cut',
        eyeFrame: 'pointed',
        eyeball: 'rounded'
    }
});

// Expected: Angular aesthetic with edge treatment
// Verify: Sharp, modern appearance
```

### Test: Japanese Shape

```typescript
const svg = generateSVGString({
    value: 'https://test-japanese.com',
    shapes: {
        body: 'japanese',
        eyeFrame: 'body',
        eyeball: 'circle'
    }
});

// Expected: Minimalist with circles and shrunk rectangles
// Verify: Clean, zen-like appearance
```

---

## 2. Testing Logo Features

### Test: Logo with Padding

```typescript
const svg = generateSVGString({
    value: 'https://test-logo-padding.com',
    errorCorrectionLevel: 'H',
    logo: {
        url: 'https://via.placeholder.com/100/667eea/ffffff?text=LOGO',
        size: 50,
        padding: 8  // NEW
    }
});

// Expected: White space around logo
// Verify: Background rectangle visible around logo
// Visual: Logo has breathing room, doesn't touch QR pattern
```

### Test: Logo with Border Radius

```typescript
const svg = generateSVGString({
    value: 'https://test-logo-rounded.com',
    errorCorrectionLevel: 'H',
    logo: {
        url: 'https://via.placeholder.com/100/ff6b6b/ffffff?text=LOGO',
        size: 50,
        borderRadius: 15  // NEW
    }
});

// Expected: Rounded corners on logo
// Verify: SVG contains <clipPath> element
// Visual: Logo has smooth rounded corners
```

### Test: Circular Logo

```typescript
const svg = generateSVGString({
    value: 'https://test-logo-circular.com',
    errorCorrectionLevel: 'H',
    logo: {
        url: 'https://via.placeholder.com/100/4ecdc4/ffffff?text=LOGO',
        size: 50,
        borderRadius: 50  // Half of size = fully circular
    }
});

// Expected: Perfectly circular logo
// Verify: clipPath creates circle shape
// Visual: Logo is perfectly round
```

### Test: Logo with Opacity

```typescript
const svg = generateSVGString({
    value: 'https://test-logo-opacity.com',
    errorCorrectionLevel: 'H',
    logo: {
        url: 'https://via.placeholder.com/100/f7b731/ffffff?text=LOGO',
        size: 50,
        opacity: 0.7  // NEW
    }
});

// Expected: Semi-transparent logo
// Verify: <image> tag has opacity="0.7" attribute
// Visual: Logo is slightly see-through
```

### Test: All Logo Features Combined

```typescript
const svg = generateSVGString({
    value: 'https://test-logo-all.com',
    errorCorrectionLevel: 'H',
    logo: {
        url: 'https://via.placeholder.com/100/a29bfe/ffffff?text=LOGO',
        size: 55,
        padding: 6,
        borderRadius: 12,
        opacity: 0.95,
        removeBackground: true,
        excavate: true
    }
});

// Expected: All features working together
// Verify:
//   - Background rectangle with padding
//   - Rounded corners via clipPath
//   - Opacity attribute
//   - QR dots cleared behind logo
```

---

## 3. Testing Image Formats

### Test: PNG Logo

```typescript
const svg = generateSVGString({
    value: 'https://test.com',
    errorCorrectionLevel: 'H',
    logo: {
        url: 'https://example.com/logo.png',
        size: 40
    }
});

// Expected: Works without warnings
// Console: No format warnings
```

### Test: JPEG Logo

```typescript
const svg = generateSVGString({
    value: 'https://test.com',
    logo: {
        url: 'https://example.com/photo.jpg',
        size: 40
    }
});

// Expected: Works, may warn about transparency
// Console: Check for format detection message
```

### Test: SVG Logo

```typescript
const svg = generateSVGString({
    value: 'https://test.com',
    logo: {
        url: 'https://example.com/logo.svg',
        size: 40
    }
});

// Expected: Best quality, works perfectly
// Console: No warnings
```

### Test: WebP Logo

```typescript
const svg = generateSVGString({
    value: 'https://test.com',
    logo: {
        url: 'https://example.com/logo.webp',
        size: 40
    }
});

// Expected: Works with modern browsers
// Console: No warnings
```

### Test: Data URI (Base64)

```typescript
const svg = generateSVGString({
    value: 'https://test.com',
    logo: {
        url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
        size: 40
    }
});

// Expected: Works, format detected from MIME type
// Console: Format detected as 'png'
```

### Test: Unsupported Format

```typescript
const svg = generateSVGString({
    value: 'https://test.com',
    logo: {
        url: 'https://example.com/file.tiff',  // Not supported
        size: 40
    }
});

// Expected: Warning in console
// Console: "Image URL appears to have unsupported format: tiff"
```

---

## 4. Visual Testing Checklist

Open `examples/design-showcase.html` and verify:

### Body Shapes Section
- [ ] All 12 body shapes render correctly
- [ ] Mosaic shows adaptive corners
- [ ] Fluid shows organic flow
- [ ] Edge-cut shows angular design
- [ ] Japanese shows minimalist style
- [ ] All shapes are scannable

### Logo Integration Section
- [ ] Simple logo renders
- [ ] Logo with padding shows white space
- [ ] Rounded logo has smooth corners
- [ ] Circular logo is perfectly round
- [ ] Semi-transparent logo is visible but translucent
- [ ] Complete package combines all features

### Premium Designs Section
- [ ] Modern Tech design looks professional
- [ ] Minimalist Japanese is clean
- [ ] Playful & Fun is colorful
- [ ] Corporate Blue is professional
- [ ] Artistic Mosaic shows tile pattern
- [ ] Edge-Cut Modern has angular style

### Color Variations Section
- [ ] All color schemes render correctly
- [ ] Gradients are smooth
- [ ] Eye colors match configuration

---

## 5. Scanning Tests

Use your phone's camera or QR scanner app:

### Test 1: Simple New Shape
```typescript
const svg = generateSVGString({
    value: 'https://intosoft.com',
    shapes: { body: 'mosaic' }
});
```
- [ ] Scans successfully
- [ ] Opens correct URL
- [ ] Fast scan time

### Test 2: Complex Design
```typescript
const svg = generateSVGString({
    value: 'https://intosoft.com',
    shapes: { body: 'fluid', eyeFrame: 'leaf', eyeball: 'rounded' },
    colors: { body: '#ff6b6b' }
});
```
- [ ] Scans successfully
- [ ] Reasonable scan time

### Test 3: With Logo (High Error Correction)
```typescript
const svg = generateSVGString({
    value: 'https://intosoft.com',
    errorCorrectionLevel: 'H',
    logo: {
        url: 'https://via.placeholder.com/100',
        size: 50,
        padding: 5,
        borderRadius: 10,
        removeBackground: true
    }
});
```
- [ ] Scans successfully with logo
- [ ] Logo doesn't interfere with scanning

### Test 4: Maximum Logo Size
```typescript
const svg = generateSVGString({
    value: 'https://intosoft.com',
    errorCorrectionLevel: 'H',
    logo: {
        url: 'https://via.placeholder.com/100',
        size: 70  // Maximum recommended
    }
});
```
- [ ] Still scannable (if yes, logo size is acceptable)
- [ ] If not scannable, reduce logo size

---

## 6. Type Safety Tests

Create a new TypeScript file and test:

### Test: Type Inference

```typescript
import { generateSVGString, ConfigInput } from '@intosoft/qrcode';

// Should compile without errors
const config: ConfigInput = {
    value: 'https://test.com',
    shapes: {
        body: 'mosaic',  // New shape
    },
    logo: {
        url: 'https://example.com/logo.png',
        padding: 5,         // New property
        borderRadius: 10,   // New property
        opacity: 0.9       // New property
    }
};

const svg = generateSVGString(config);
```

- [ ] No TypeScript errors
- [ ] Autocomplete shows new shapes
- [ ] Autocomplete shows new logo properties

### Test: Invalid Values

```typescript
const config = {
    value: 'https://test.com',
    shapes: {
        body: 'invalid-shape',  // Should error
    },
    logo: {
        padding: 'not-a-number',  // Should error
        opacity: 2  // Should work (runtime validation may warn)
    }
};
```

- [ ] TypeScript shows error for invalid shape
- [ ] TypeScript shows error for invalid padding type

---

## 7. Performance Tests

### Test: Build Size

```bash
yarn build
ls -lh dist/
```

Expected sizes:
- [ ] CJS: ~54 KB
- [ ] ESM: ~52 KB
- [ ] IIFE: ~114 KB
- [ ] No significant size increase despite new features

### Test: Generation Speed

```javascript
console.time('generate');
for (let i = 0; i < 100; i++) {
    generateSVGString({
        value: `https://test-${i}.com`,
        shapes: { body: 'mosaic' },
        logo: {
            url: 'https://via.placeholder.com/100',
            padding: 5,
            borderRadius: 10
        }
    });
}
console.timeEnd('generate');
```

- [ ] Completes in reasonable time (< 1s for 100 QR codes)
- [ ] No memory leaks
- [ ] Consistent performance

---

## 8. Backward Compatibility Tests

### Test: Old Configurations Still Work

```typescript
// Pre-v0.2.0 configuration
const oldConfig = {
    value: 'https://test.com',
    shapes: {
        body: 'dots',
        eyeFrame: 'rounded',
        eyeball: 'circle'
    },
    logo: {
        url: 'https://example.com/logo.png',
        size: 40,
        removeBackground: true
    }
};

const svg = generateSVGString(oldConfig);
```

- [ ] Generates successfully
- [ ] No warnings or errors
- [ ] Output matches pre-v0.2.0 behavior

---

## 9. Edge Cases

### Test: Very Small Logo

```typescript
const svg = generateSVGString({
    value: 'https://test.com',
    logo: { url: '...', size: 10, padding: 2 }
});
```
- [ ] Renders correctly
- [ ] Padding proportional

### Test: Very Large Logo

```typescript
const svg = generateSVGString({
    value: 'https://test.com',
    errorCorrectionLevel: 'H',
    logo: { url: '...', size: 80 }  // Very large
});
```
- [ ] Generates (may not scan)
- [ ] Console warning recommended

### Test: Maximum Border Radius

```typescript
const svg = generateSVGString({
    value: 'https://test.com',
    logo: { url: '...', size: 50, borderRadius: 100 }
});
```
- [ ] Renders without breaking
- [ ] Creates interesting shape

### Test: Zero Values

```typescript
const svg = generateSVGString({
    value: 'https://test.com',
    logo: {
        url: '...',
        size: 40,
        padding: 0,
        borderRadius: 0,
        opacity: 1
    }
});
```
- [ ] Works identically to not specifying properties
- [ ] No extra SVG elements generated

---

## 10. Documentation Tests

### Verify Documentation Accuracy

- [ ] All code examples in FEATURES.md run without errors
- [ ] All examples in README.md work correctly
- [ ] Design showcase renders all examples
- [ ] TypeScript definitions match documentation
- [ ] CHANGELOG is complete and accurate

---

## Test Results Template

Copy this template and fill in your results:

```
## Test Results - v0.2.0

Date: _______________
Tester: _______________

### New Body Shapes
- Mosaic: ☐ Pass ☐ Fail
- Fluid: ☐ Pass ☐ Fail
- Edge-Cut: ☐ Pass ☐ Fail
- Japanese: ☐ Pass ☐ Fail

### Logo Features
- Padding: ☐ Pass ☐ Fail
- Border Radius: ☐ Pass ☐ Fail
- Opacity: ☐ Pass ☐ Fail
- Combined: ☐ Pass ☐ Fail

### Image Formats
- PNG: ☐ Pass ☐ Fail
- JPEG: ☐ Pass ☐ Fail
- SVG: ☐ Pass ☐ Fail
- WebP: ☐ Pass ☐ Fail
- Data URI: ☐ Pass ☐ Fail

### Visual Quality
- Design Showcase: ☐ Pass ☐ Fail
- All sections render: ☐ Pass ☐ Fail

### Scanning
- Simple shapes: ☐ Pass ☐ Fail
- Complex designs: ☐ Pass ☐ Fail
- With logo: ☐ Pass ☐ Fail

### Type Safety
- Compilation: ☐ Pass ☐ Fail
- Type inference: ☐ Pass ☐ Fail

### Performance
- Build size: ☐ Pass ☐ Fail
- Generation speed: ☐ Pass ☐ Fail

### Backward Compatibility
- Old configs: ☐ Pass ☐ Fail

### Overall Status
☐ All tests passed - Ready for release
☐ Some tests failed - Issues to address
☐ Major issues - Hold release

### Notes:
_______________________________
_______________________________
_______________________________
```

---

## Automated Testing Script

Create `test-v0.2.0.js`:

```javascript
const { generateSVGString } = require('./dist/index.js');
const fs = require('fs');

console.log('Testing v0.2.0 features...\n');

const tests = [
    {
        name: 'Mosaic Shape',
        config: { value: 'https://test.com', shapes: { body: 'mosaic' } }
    },
    {
        name: 'Fluid Shape',
        config: { value: 'https://test.com', shapes: { body: 'fluid' } }
    },
    {
        name: 'Edge-Cut Shape',
        config: { value: 'https://test.com', shapes: { body: 'edge-cut' } }
    },
    {
        name: 'Japanese Shape',
        config: { value: 'https://test.com', shapes: { body: 'japanese' } }
    },
    {
        name: 'Logo with Padding',
        config: {
            value: 'https://test.com',
            logo: { url: 'https://via.placeholder.com/100', size: 40, padding: 5 }
        }
    },
    {
        name: 'Logo with Border Radius',
        config: {
            value: 'https://test.com',
            logo: { url: 'https://via.placeholder.com/100', size: 40, borderRadius: 10 }
        }
    },
    {
        name: 'Logo with Opacity',
        config: {
            value: 'https://test.com',
            logo: { url: 'https://via.placeholder.com/100', size: 40, opacity: 0.8 }
        }
    },
    {
        name: 'All Logo Features',
        config: {
            value: 'https://test.com',
            logo: {
                url: 'https://via.placeholder.com/100',
                size: 50,
                padding: 6,
                borderRadius: 12,
                opacity: 0.95
            }
        }
    }
];

let passed = 0;
let failed = 0;

tests.forEach(test => {
    try {
        const svg = generateSVGString(test.config);
        if (svg && svg.includes('<svg')) {
            console.log(`✅ ${test.name}`);
            passed++;
        } else {
            console.log(`❌ ${test.name} - Invalid SVG output`);
            failed++;
        }
    } catch (error) {
        console.log(`❌ ${test.name} - Error: ${error.message}`);
        failed++;
    }
});

console.log(`\n${'='.repeat(50)}`);
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log(`Success rate: ${((passed / tests.length) * 100).toFixed(1)}%`);
console.log(`${'='.repeat(50)}\n`);

if (failed === 0) {
    console.log('🎉 All tests passed! Ready for release.\n');
    process.exit(0);
} else {
    console.log('⚠️  Some tests failed. Please review.\n');
    process.exit(1);
}
```

Run with:
```bash
node test-v0.2.0.js
```

---

## Release Checklist

Before releasing v0.2.0:

- [ ] All automated tests pass
- [ ] Manual visual tests completed
- [ ] Design showcase works perfectly
- [ ] All documentation reviewed and accurate
- [ ] TypeScript compilation successful
- [ ] Build process completes without errors
- [ ] Backward compatibility verified
- [ ] CHANGELOG updated
- [ ] Version bumped to 0.2.0
- [ ] Git tagged with v0.2.0
- [ ] Ready for npm publish

---

**Good luck with testing! 🚀**
