import QRCode, { QRCodeErrorCorrectionLevel } from 'qrcode';
import { Config } from './config';
import { validateURL, formatNumber } from './utils/svg';

interface GetPositions {
    matrixLength: number;
    offset: number;
    count: number;
}

const getPositions = ({ matrixLength, offset, count }: GetPositions) => {
    const lastPosition = matrixLength - 1;
    const emptyArray = Array(count).fill('');
    const countPosition = count - 1;

    return [
        ...emptyArray.map((_, index) => [index + offset, 0 + offset]),
        ...emptyArray.map((_, index) => [index + offset, countPosition + offset]),
        ...emptyArray.map((_, index) => [0 + offset, index + offset]),
        ...emptyArray.map((_, index) => [countPosition + offset, index + offset]),

        ...emptyArray.map((_, index) => [lastPosition - index - offset, 0 + offset]),
        ...emptyArray.map((_, index) => [lastPosition - index - offset, countPosition + offset]),
        ...emptyArray.map((_, index) => [lastPosition - offset, index + offset]),
        ...emptyArray.map((_, index) => [lastPosition - countPosition - offset, index + offset]),

        ...emptyArray.map((_, index) => [index + offset, lastPosition - offset]),
        ...emptyArray.map((_, index) => [index + offset, lastPosition - countPosition - offset]),
        ...emptyArray.map((_, index) => [0 + offset, lastPosition - index - offset]),
        ...emptyArray.map((_, index) => [countPosition + offset, lastPosition - index - offset]),
    ];
};
export const generateMatrix = (value: string, errorCorrectionLevel: QRCodeErrorCorrectionLevel) => {
    const arr = Array.from(QRCode.create(value, { errorCorrectionLevel }).modules.data);
    const sqrt = Math.sqrt(arr.length);

    const rows = [];
    for (let i = 0; i < arr.length; i += sqrt) {
        rows.push(arr.slice(i, i + sqrt));
    }

    return rows;
};

export const getEyeFramePositions = (matrixLength: number) => {
    const count = 7;
    const offset = 0;
    return getPositions({ matrixLength, count, offset });
};

export const getEyeBallPositions = (matrixLength: number) => {
    const count = 3;
    const offset = 2;

    const innerItems = [
        [3, 3],
        [matrixLength - 1 - 3, 3],
        [3, matrixLength - 1 - 3],
    ];
    return [...getPositions({ matrixLength, count, offset }), ...innerItems];
};

interface GetEyesPositionProps {
    matrixLength: number;
    cellSize: number;
}

export const getPositionForEyes = ({ matrixLength, cellSize }: GetEyesPositionProps) => ({
    eyeball: {
        topLeft: {
            x: 3.5 * cellSize,
            y: 3.5 * cellSize,
        },
        topRight: {
            x: (matrixLength - 3.5) * cellSize,
            y: 3.5 * cellSize,
        },
        bottomLeft: {
            x: 3.5 * cellSize,
            y: (matrixLength - 3.5) * cellSize,
        },
    },
    eyeFrame: {
        topLeft: {
            x: 0,
            y: 0,
        },
        topRight: {
            x: (matrixLength - 7) * cellSize,
            y: 0,
        },
        bottomLeft: {
            x: 0,
            y: (matrixLength - 7) * cellSize,
        },
    },
});

export const renderLogoFromConfig = (
    config: Config,
    cellSize: number,
    forReactNative?: boolean,
) => {
    if (!config.logo?.url || forReactNative) {
        return '';
    }

    const safeUrl = validateURL(config.logo.url);
    if (!safeUrl) {
        console.warn('Invalid or unsafe logo URL provided');
        return '';
    }

    const logoSize = config.logo.size * cellSize;
    const padding = (config.logo.padding ?? 0) * cellSize;
    const totalSize = logoSize + (padding * 2);
    
    const height = logoSize;
    const width = logoSize;

    const centerX = (config.length - totalSize) / 2;
    const centerY = (config.length - totalSize) / 2;
    
    const imageX = centerX + padding;
    const imageY = centerY + padding;
    
    const opacity = config.logo.opacity ?? 1;
    const borderRadius = config.logo.borderRadius ?? 0;

    const defs = borderRadius > 0 ? `
    <defs>
        <clipPath id="logo-clip">
            <rect x="${formatNumber(imageX)}" y="${formatNumber(imageY)}" 
                  width="${formatNumber(width)}" height="${formatNumber(height)}" 
                  rx="${formatNumber(borderRadius)}" ry="${formatNumber(borderRadius)}"/>
        </clipPath>
    </defs>` : '';

    const clipPathAttr = borderRadius > 0 ? ` clip-path="url(#logo-clip)"` : '';
    const opacityAttr = opacity < 1 ? ` opacity="${formatNumber(opacity)}"` : '';

    const backgroundRect = padding > 0 ? `
    <rect x="${formatNumber(centerX)}" y="${formatNumber(centerY)}" 
          width="${formatNumber(totalSize)}" height="${formatNumber(totalSize)}" 
          fill="${config.colors.background}" 
          rx="${formatNumber(borderRadius + padding)}"
          ry="${formatNumber(borderRadius + padding)}"/>` : '';

    return `${defs}
    ${backgroundRect}
    <image 
    id="logo" 
    href="${safeUrl}" 
    height="${formatNumber(height)}"
    width="${formatNumber(width)}" 
    x="${formatNumber(imageX)}" 
    y="${formatNumber(imageY)}"${clipPathAttr}${opacityAttr}/>`;
};

export const getLogoPathPositions = (matrixLength: number, size?: number) => {
    if (size) {
        const count = size;
        const startPos = Math.ceil((matrixLength - 1) / 2 - count / 2);

        const positions = Array(count)
            .fill(0)
            .map((_, i) =>
                Array(count)
                    .fill(0)
                    .map((_, j) => [startPos + i, startPos + j]),
            )
            .flat();

        return positions;
    }
    return [];
};

export const isTransparent = (color: string): boolean => {
    const normalized = color.toLowerCase().trim();
    
    if (normalized === 'transparent' || normalized === 'none') {
        return true;
    }
    
    if (normalized.startsWith('#')) {
        if (normalized.length === 5) {
            return normalized[4] === '0';
        }
        if (normalized.length === 9) {
            return normalized.slice(7) === '00';
        }
        return false;
    }
    
    if (normalized.startsWith('rgba')) {
        const match = normalized.match(/rgba\s*\(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*,\s*([\d.]+)\s*\)/);
        if (match) {
            return parseFloat(match[1]) === 0;
        }
    }
    
    if (normalized.startsWith('hsla')) {
        const match = normalized.match(/hsla\s*\(\s*[\d.]+\s*,\s*[\d.%]+\s*,\s*[\d.%]+\s*,\s*([\d.]+)\s*\)/);
        if (match) {
            return parseFloat(match[1]) === 0;
        }
    }
    
    return false;
};
