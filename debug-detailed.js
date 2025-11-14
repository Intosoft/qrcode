const mod = require('./dist/index.js');

// Patch formatNumber to see what's being passed
const Module = require('module');
const originalRequire = Module.prototype.require;

console.log('Testing with value="Test", length=500\n');

const svg = mod.generateSVGString({
    value: 'Test',
    length: 500,
    padding: 20,
});

console.log('\nGenerated SVG (first 500 chars):');
console.log(svg.substring(0, 500));
console.log('\n...\n');

// Extract and analyze
const widthMatch = svg.match(/<svg[^>]*width="([^"]+)"/);
const viewBoxMatch = svg.match(/viewBox="([^"]+)"/);

console.log('Extracted width:', widthMatch ? widthMatch[1] : 'NOT FOUND');
console.log('Extracted viewBox:', viewBoxMatch ? viewBoxMatch[1] : 'NOT FOUND');
