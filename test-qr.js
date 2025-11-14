const { generateSVGString } = require('./dist/index.js');

// Test 1: Simple QR code
try {
    console.log('Test 1: Simple QR code generation...');
    const svg1 = generateSVGString({
        value: 'https://intosoft.com',
    });
    console.log('✅ Test 1 passed');
    console.log('SVG length:', svg1.length);
    console.log('Contains path:', svg1.includes('<path'));
    console.log('Contains svg:', svg1.includes('<svg'));
    console.log('');
} catch (error) {
    console.error('❌ Test 1 failed:', error.message);
}

// Test 2: With body shape
try {
    console.log('Test 2: With dots body shape...');
    const svg2 = generateSVGString({
        value: 'Test',
        bodyShape: 'dots',
    });
    console.log('✅ Test 2 passed');
    console.log('SVG length:', svg2.length);
    console.log('');
} catch (error) {
    console.error('❌ Test 2 failed:', error.message);
}

// Test 3: With gradient
try {
    console.log('Test 3: With gradient...');
    const svg3 = generateSVGString({
        value: 'Gradient test',
        colors: {
            body: 'linear-gradient(45deg, #ff0000 0%, #0000ff 100%)',
        },
    });
    console.log('✅ Test 3 passed');
    console.log('SVG length:', svg3.length);
    console.log('Contains gradient:', svg3.includes('linearGradient'));
    console.log('');
} catch (error) {
    console.error('❌ Test 3 failed:', error.message);
}

// Test 4: New shapes
try {
    console.log('Test 4: With hexagon shape...');
    const svg4 = generateSVGString({
        value: 'Hexagon',
        bodyShape: 'hexagon',
    });
    console.log('✅ Test 4 passed');
    console.log('SVG length:', svg4.length);
    console.log('');
} catch (error) {
    console.error('❌ Test 4 failed:', error.message);
}

try {
    console.log('Test 5: With wave shape...');
    const svg5 = generateSVGString({
        value: 'Wave',
        bodyShape: 'wave',
    });
    console.log('✅ Test 5 passed');
    console.log('SVG length:', svg5.length);
    console.log('');
} catch (error) {
    console.error('❌ Test 5 failed:', error.message);
}

// Test 6: Output a sample SVG to check visually
try {
    const fs = require('fs');
    const svg = generateSVGString({
        value: 'https://intosoft.com',
        bodyShape: 'square',
        colors: {
            body: '#000000',
            background: '#ffffff',
        },
    });
    fs.writeFileSync('/tmp/test-qr.svg', svg);
    console.log('✅ Sample SVG written to /tmp/test-qr.svg');
} catch (error) {
    console.error('❌ Failed to write SVG:', error.message);
}
