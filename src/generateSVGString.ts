import { generateGradientByConfig, isGradientColor } from './utils/gradient';
import { ConfigInput, createConfig } from './config';
import { generateEyeballSVGFromConfig } from './eyeball';
import { generateEyeFrameSVGFromConfig } from './eyeframes';
import { generatePath } from './path';
import { generateMatrix, renderLogoFromConfig, isTransparent } from './utils';
import { cleanSVGPath, validateColor, formatNumber, validateSVG } from './utils/svg';

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

    if (
        configInput.length !== undefined &&
        (typeof configInput.length !== 'number' || configInput.length <= 0)
    ) {
        throw new Error('Config length must be a positive number');
    }

    if (
        configInput.padding !== undefined &&
        (typeof configInput.padding !== 'number' || configInput.padding < 0)
    ) {
        throw new Error('Config padding must be a non-negative number');
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

        const cellSize = config.length / matrix.length;
        const path = cleanSVGPath(generatePath({ matrix, size: config.length, config }));

        const defsContent = [
            generateGradientByConfig(config),
            renderLogoFromConfig(config, cellSize, options?.forReactNative),
        ]
            .filter(Boolean)
            .join('\n    ');

        const viewBoxMinX = formatNumber(-config.padding);
        const viewBoxMinY = formatNumber(-config.padding);
        const viewBoxWidth = formatNumber(config.length + config.padding * 2);
        const viewBoxHeight = formatNumber(config.length + config.padding * 2);

        const backgroundColor = validateColor(
            isTransparent(config.colors.background) ? 'none' : config.colors.background,
        );
        const bodyFill = validateColor(
            isGradientColor(config.colors.body) ? 'url(#body)' : config.colors.body,
        );

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
