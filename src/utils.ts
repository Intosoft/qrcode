import QRCode, { QRCodeErrorCorrectionLevel } from 'qrcode';
import { Config } from './config';

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
        // top-left
        // horizontal
        ...emptyArray.map((_, index) => [index + offset, 0 + offset]),
        ...emptyArray.map((_, index) => [index + offset, countPosition + offset]),
        // vertical
        ...emptyArray.map((_, index) => [0 + offset, index + offset]),
        ...emptyArray.map((_, index) => [countPosition + offset, index + offset]),

        // top-right
        // horizontal
        ...emptyArray.map((_, index) => [lastPosition - index - offset, 0 + offset]),
        ...emptyArray.map((_, index) => [lastPosition - index - offset, countPosition + offset]),
        // vertical
        ...emptyArray.map((_, index) => [lastPosition - offset, index + offset]),
        ...emptyArray.map((_, index) => [lastPosition - countPosition - offset, index + offset]),

        // bottom-left
        // horizontal
        ...emptyArray.map((_, index) => [index + offset, lastPosition - offset]),
        ...emptyArray.map((_, index) => [index + offset, lastPosition - countPosition - offset]),
        // vertical
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
        // top-left
        [3, 3],
        // top-right
        [matrixLength - 1 - 3, 3],
        // bottom-left
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

export const renderLogoFromConfig = (config: Config, cellSize: number) => {
    if (!config.logo?.url || config.isReactNative) {
        return '';
    }

    const height = config.logo.size * cellSize;
    const width = config.logo.size * cellSize;

    const centerX = (config.length - width) / 2;
    const centerY = (config.length - height) / 2;
    return `<image 
    id="logo" 
    href="${config.logo.url}" 
    height="${height}"
    width="${width}" x="${centerX}" y="${centerY}" />`;
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

export const isTransparent = (color: string) => {
    if (color === 'transparent') {
        return true;
    }
    if (color.startsWith('#')) {
        return color === '#00000000' || color === '#0000';
    }
    if (color.startsWith('rgba')) {
        const rgbaValues = color.slice(5, -1).split(',');
        const alpha = parseFloat(rgbaValues[3]);
        return alpha === 0;
    }
    if (color.startsWith('rgb')) {
        return color === 'rgba(0,0,0,0)' || color === 'rgba(0, 0, 0, 0)';
    }
    return false; // Not transparent
};
