const { generateSVGString } = require('./dist/index.js');

console.log('Testing complex scenarios...\n');

// Test with logo
try {
    console.log('Test: With logo...');
    const svg = generateSVGString({
        value: 'https://intosoft.com',
        logo: {
            url: 'https://example.com/logo.png',
            size: 5,
            removeBackground: true,
        },
    });
    console.log('✅ Logo test passed, length:', svg.length);
    console.log('Contains logo:', svg.includes('logo'));
} catch (error) {
    console.error('❌ Logo test failed:', error.message);
}

// Test with eye frames
try {
    console.log('\nTest: With custom eye frames...');
    const svg = generateSVGString({
        value: 'Test',
        eyeFrameShape: 'square',
        eyeBallShape: 'dots',
    });
    console.log('✅ Eye frames test passed, length:', svg.length);
} catch (error) {
    console.error('❌ Eye frames test failed:', error.message);
}

// Test edge case: very long text
try {
    console.log('\nTest: Long text...');
    const svg = generateSVGString({
        value: 'A'.repeat(500),
    });
    console.log('✅ Long text test passed, length:', svg.length);
} catch (error) {
    console.error('❌ Long text test failed:', error.message);
}

// Test with all color options
try {
    console.log('\nTest: All color options...');
    const svg = generateSVGString({
        value: 'Color test',
        colors: {
            body: '#ff0000',
            background: '#ffffff',
            eyeball: '#00ff00',
            eyeFrame: '#0000ff',
        },
    });
    console.log('✅ Color test passed, length:', svg.length);
} catch (error) {
    console.error('❌ Color test failed:', error.message);
}

// Save a more complex example
const fs = require('fs');
const complexSvg = generateSVGString({
    value: 'https://intosoft.com',
    bodyShape: 'hexagon',
    eyeFrameShape: 'square',
    eyeBallShape: 'circle',
    colors: {
        body: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        eyeball: '#667eea',
        eyeFrame: '#764ba2',
        background: '#ffffff',
    },
    length: 500,
    padding: 20,
});
fs.writeFileSync('/tmp/test-qr-complex.svg', complexSvg);
console.log('\n✅ Complex SVG written to /tmp/test-qr-complex.svg');
