import { generateSVGString } from '../generateSVGString';
import { validateSVG } from '../utils/svg';

export function testBasicSVG() {
    const svg = generateSVGString({
        value: 'Hello World',
        length: 300,
    });

    const validation = validateSVG(svg);

    if (!validation.valid) {
        console.error('Basic SVG validation failed:', validation.errors);
        return false;
    }

    if (!svg.includes('xmlns="http://www.w3.org/2000/svg"')) {
        console.error('Missing SVG namespace');
        return false;
    }

    if (svg.includes('xlink:href') && !svg.includes('xmlns:xlink')) {
        console.error('Missing xlink namespace but xlink:href is used');
        return false;
    }

    console.log('✓ Basic SVG test passed');
    return true;
}

export function testGradientSVG() {
    const svg = generateSVGString({
        value: 'Gradient Test',
        length: 300,
        colors: {
            body: 'linear-gradient(45deg, rgba(255,0,0,1) 0%, rgba(0,0,255,1) 100%)',
        },
    });

    if (!svg.includes('<defs>')) {
        console.error('Missing defs element for gradients');
        return false;
    }

    if (!svg.includes('<linearGradient') && !svg.includes('<radialGradient')) {
        console.error('Missing gradient definition');
        return false;
    }

    if (!svg.includes('url(#')) {
        console.error('Missing gradient reference in fill attribute');
        return false;
    }

    console.log('✓ Gradient SVG test passed');
    return true;
}

export function testLogoSVG() {
    const svg = generateSVGString({
        value: 'With Logo',
        length: 300,
        logo: {
            url: 'https://via.placeholder.com/150',
            size: 50,
        },
    });

    if (!svg.includes('<image')) {
        console.error('Missing image element for logo');
        return false;
    }

    if (!svg.includes('href="https://via.placeholder.com')) {
        console.error('Logo URL not properly set');
        return false;
    }

    console.log('✓ Logo SVG test passed');
    return true;
}

export function testCustomShapes() {
    const shapes = ['square', 'circle', 'rounded', 'diamond', 'star'];

    for (const shape of shapes) {
        const svg = generateSVGString({
            value: `Shape Test: ${shape}`,
            length: 300,
            shapes: {
                body: shape as any,
            },
        });

        if (!svg.includes('<path')) {
            console.error(`Missing path element for shape: ${shape}`);
            return false;
        }
    }

    console.log('✓ Custom shapes test passed');
    return true;
}

export function testIllustratorCompatibility() {
    const svg = generateSVGString({
        value: 'Illustrator Test',
        length: 300,
    });

    if (!svg.includes('xmlns="http://www.w3.org/2000/svg"')) {
        console.error('Missing xmlns - required for Illustrator');
        return false;
    }

    if (svg.match(/[\d.]+e[-+]?\d+/i)) {
        console.error('Scientific notation found - may cause issues in Illustrator');
        return false;
    }

    const paths = svg.match(/<path[^>]*d="[^"]*"/g) || [];
    for (const path of paths) {
        const dAttribute = path.match(/d="([^"]*)"/);
        if (dAttribute && dAttribute[1]) {
            const pathData = dAttribute[1];

            if (pathData.includes('  ')) {
                console.warn('Multiple spaces in path data - may cause issues');
            }
        }
    }

    console.log('✓ Illustrator compatibility test passed');
    return true;
}

export function testFullConfiguration() {
    const svg = generateSVGString({
        value: 'Full Config Test',
        length: 400,
        padding: 20,
        errorCorrectionLevel: 'H',
        colors: {
            body: '#2563eb',
            background: '#ffffff',
            eyeFrame: {
                topLeft: '#dc2626',
                topRight: '#16a34a',
                bottomLeft: '#9333ea',
            },
            eyeball: {
                topLeft: '#ea580c',
                topRight: '#0891b2',
                bottomLeft: '#be123c',
            },
        },
        shapes: {
            body: 'circle',
            eyeFrame: 'circle',
            eyeball: 'square',
        },
    });

    const validation = validateSVG(svg);

    if (!validation.valid) {
        console.error('Full configuration validation failed:', validation.errors);
        return false;
    }

    console.log('✓ Full configuration test passed');
    return true;
}

export function runAllTests() {
    console.log('Running SVG validation tests...\n');

    const tests = [
        testBasicSVG,
        testGradientSVG,
        testLogoSVG,
        testCustomShapes,
        testIllustratorCompatibility,
        testFullConfiguration,
    ];

    let passed = 0;
    let failed = 0;

    for (const test of tests) {
        try {
            if (test()) {
                passed++;
            } else {
                failed++;
            }
        } catch (error) {
            console.error(`Test ${test.name} threw an error:`, error);
            failed++;
        }
    }

    console.log(`\nTest Results: ${passed} passed, ${failed} failed`);
    return failed === 0;
}

if (require.main === module) {
    const success = runAllTests();
    process.exit(success ? 0 : 1);
}
