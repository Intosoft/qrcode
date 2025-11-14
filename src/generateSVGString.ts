import { generateGradientByConfig, isGradientColor, normalizeColorValue } from './utils/gradient';
import { ConfigInput, createConfig, ColorValue } from './config';
import { generateEyeballSVGFromConfig } from './eyeball';
import { generateEyeFrameSVGFromConfig } from './eyeframes';
import { generatePath } from './path';
import { generateMatrix, renderLogoFromConfig } from './utils';
import { cleanSVGPath, validateColor, formatNumber, validateSVG } from './utils/svg';

// Check if color is transparent
function isTransparent(color: ColorValue): boolean {
    if (typeof color === 'string') {
        const normalized = color.toLowerCase();
        return (
            normalized === 'transparent' ||
            normalized === 'none' ||
            (normalized.includes('rgba(') && normalized.includes(',0)'))
        );
    }
    return false;
}

export interface ReactNativeQRResult {
    svgString: string;
    cellSize: number;
}

interface InternalOptions {
    forReactNative?: boolean;
}

const validateConfigInput = (input: unknown): input is ConfigInput => {
    if (!input || typeof input !== 'object') {
        throw new Error('Config is required and must be an object');
    }

    const configInput = input as Record<string, unknown>;

    if (!configInput.value || typeof configInput.value !== 'string') {
        throw new Error('Config value is required and must be a string');
    }

    if (configInput.value.length === 0) {
        throw new Error('Config value cannot be an empty string');
    }

    if (configInput.value.length > 7089) {
        throw new Error('Config value exceeds maximum QR code capacity (7089 characters)');
    }

    if (
        configInput.length !== undefined &&
        (typeof configInput.length !== 'number' || configInput.length <= 0)
    ) {
        throw new Error('Config length must be a positive number');
    }

    if (configInput.length !== undefined && configInput.length > 10000) {
        throw new Error('Config length is too large (maximum: 10000px)');
    }

    if (
        configInput.padding !== undefined &&
        (typeof configInput.padding !== 'number' || configInput.padding < 0)
    ) {
        throw new Error('Config padding must be a non-negative number');
    }

    if (configInput.padding !== undefined && configInput.padding > 500) {
        throw new Error('Config padding is too large (maximum: 500px)');
    }

    return true;
};

export function generateSVGString(configInput: ConfigInput, options?: InternalOptions): string;
export function generateSVGString(
    configInput: ConfigInput,
    options: InternalOptions & { forReactNative: true },
): ReactNativeQRResult;
export function generateSVGString(
    configInput: ConfigInput,
    options?: InternalOptions,
): string | ReactNativeQRResult {
    try {
        validateConfigInput(configInput);

        const config = createConfig(configInput);
        const matrix = generateMatrix(config.value, config.errorCorrectionLevel);
        const matrixLength = matrix.length;
        const cellSize = config.length / matrixLength;

        const path = cleanSVGPath(generatePath({ matrix, size: config.length, config }));

        const gradientDef = generateGradientByConfig(config);
        const logoDef = renderLogoFromConfig(config, cellSize, options?.forReactNative);

        const defsContent = [gradientDef, logoDef].filter(Boolean).join('\n    ');

        const padding = config.padding;
        const viewBoxMinX = formatNumber(-padding);
        const viewBoxMinY = formatNumber(-padding);
        const viewBoxWidth = formatNumber(config.length + padding * 2);
        const viewBoxHeight = formatNumber(config.length + padding * 2);

        const backgroundIsGradient = isGradientColor(config.colors.background);
        const bgColorStr = isTransparent(config.colors.background)
            ? 'none'
            : backgroundIsGradient
              ? 'url(#background)'
              : normalizeColorValue(config.colors.background);
        const backgroundColor = validateColor(bgColorStr);

        const bodyColorStr = isGradientColor(config.colors.body)
            ? 'url(#body)'
            : normalizeColorValue(config.colors.body);
        const bodyFill = validateColor(bodyColorStr);

        const svgParts = [
            `<svg`,
            `  xmlns="http://www.w3.org/2000/svg"`,
            `  xmlns:xlink="http://www.w3.org/1999/xlink"`,
            `  width="${formatNumber(config.length)}"`,
            `  height="${formatNumber(config.length)}"`,
            `  viewBox="${viewBoxMinX} ${viewBoxMinY} ${viewBoxWidth} ${viewBoxHeight}"`,
            `  shape-rendering="crispEdges">`,
            defsContent ? `  <defs>\n    ${defsContent}\n  </defs>` : '',
            `  <rect`,
            `    x="${viewBoxMinX}"`,
            `    y="${viewBoxMinY}"`,
            `    width="${viewBoxWidth}"`,
            `    height="${viewBoxHeight}"`,
            `    fill="${backgroundColor}"/>`,
            `  <path`,
            `    fill="${bodyFill}"`,
            `    d="${path}"/>`,
            `  ${generateEyeFrameSVGFromConfig(config, matrix.length, matrix)}`,
            `  ${generateEyeballSVGFromConfig(config, matrix.length, matrix)}`,
            config.logo?.url && !options?.forReactNative ? `  <use xlink:href="#logo"/>` : '',
            `</svg>`,
        ]
            .filter((line) => line !== '')
            .join('\n');

        const svg = svgParts;

        if (process.env.NODE_ENV === 'development') {
            const validation = validateSVG(svg);
            if (!validation.valid) {
                console.warn('SVG validation warnings:', validation.errors);
            }
        }

        if (options?.forReactNative) {
            return {
                svgString: svg,
                cellSize,
            };
        }

        return svg;
    } catch (error) {
        console.error('Error generating SVG string:', error);
        throw new Error(
            `Failed to generate QR code: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
    }
}
