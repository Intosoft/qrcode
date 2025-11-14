const { generateSVGString } = require('./dist/index.js');

const svg = generateSVGString({
    value: 'Test',
    length: 500,
});

// Extract dimensions
const widthMatch = svg.match(/width="([^"]+)"/);
const heightMatch = svg.match(/height="([^"]+)"/);
const viewBoxMatch = svg.match(/viewBox="([^"]+)"/);

console.log('Input config.length: 500');
console.log('SVG width:', widthMatch ? widthMatch[1] : 'not found');
console.log('SVG height:', heightMatch ? heightMatch[1] : 'not found');
console.log('ViewBox:', viewBoxMatch ? viewBoxMatch[1] : 'not found');
console.log('');

// Check default
const svg2 = generateSVGString({
    value: 'Test',
});

const widthMatch2 = svg2.match(/width="([^"]+)"/);
console.log('Default (should be 300):',widthMatch2 ? widthMatch2[1] : 'not found');
