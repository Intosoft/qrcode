import { generateRoundedCornerEyeballPath } from './path/square';
import { Config, BodyShape } from './config';
import { GenerateEyeballSVGParams, StyledEyePathGeneratorParams } from './types';
import { getPositionForEyes } from './utils';
import { isGradientColor } from './utils/gradient';
import { generatePath } from './path';

const generateRoundedEyeballPos = (cellSize: number, matrixLength: number) => ({
    topLeft: {
        x: 2 * cellSize,
        y: 2 * cellSize,
    },
    topRight: {
        x: (matrixLength - 4.95) * cellSize,
        y: 2 * cellSize,
    },
    bottomLeft: {
        x: 2 * cellSize,
        y: (matrixLength - 4.95) * cellSize,
    },
});

interface CircleEyeballParams {
    x: number;
    y: number;
    radius: number;
}

const circleEyeballPath = ({ x, y, radius }: CircleEyeballParams) =>
    `M${x + radius},${y}A${radius},${radius},0,1,1,${
        x - radius
    },${y},${radius},${radius},0,0,1,${x + radius},${y}Z`;

const circleEyeball = ({ matrixLength, size, position }: StyledEyePathGeneratorParams) => {
    let path = '';
    const cellSize = size / matrixLength;
    const positions = getPositionForEyes({ matrixLength, cellSize });

    const height = cellSize * 3;
    const radius = height / 2;

    path += circleEyeballPath({
        ...positions.eyeball[position],
        radius,
    });

    return path;
};

interface SquareEyeballParams {
    x: number;
    y: number;
    length: number;
    cellSize: number;

    strokeColor?: string;
}

const squareEyeballPath = ({ length, x, y, cellSize }: SquareEyeballParams) => {
    const halfSize = length / 2;
    const startX = x - halfSize - cellSize / 2;
    const startY = y - halfSize - cellSize / 2;
    const endX = x + halfSize + cellSize / 2;
    const endY = y + halfSize + cellSize / 2;
    return `
  M ${startX} ${startY}
  L ${endX} ${startY}
  L ${endX} ${endY}
  L ${startX} ${endY}
  L ${startX} ${startY}
`;
};

const squareEyeball = ({ matrixLength, size, position }: StyledEyePathGeneratorParams) => {
    const cellSize = size / matrixLength;

    const length = cellSize * 2;
    const positions = getPositionForEyes({ matrixLength, cellSize });

    return squareEyeballPath({
        ...positions.eyeball[position],
        length,
        cellSize,
    });
};

const roundedEyeball = ({ matrixLength, size, position }: StyledEyePathGeneratorParams) => {
    const cellSize = size / matrixLength;

    const length = cellSize * 3;
    const positions = generateRoundedEyeballPos(cellSize, matrixLength);
    return generateRoundedCornerEyeballPath({
        ...positions[position],
        length,
        cellSize,
        roundedCorners: ['top-left', 'bottom-left', 'top-right', 'bottom-right'],
    });
};

const styleAEyeball = ({ matrixLength, size, position }: StyledEyePathGeneratorParams) => {
    const cellSize = size / matrixLength;

    const length = cellSize * 3;
    const positions = generateRoundedEyeballPos(cellSize, matrixLength);

    const roundedCorners: {
        [key: string]: ('top-left' | 'top-right' | 'bottom-left' | 'bottom-right')[];
    } = {
        topLeft: ['top-left', 'top-right', 'bottom-left'],
        topRight: ['top-left', 'top-right', 'bottom-right'],
        bottomLeft: ['top-left', 'bottom-right', 'bottom-left'],
    };

    return generateRoundedCornerEyeballPath({
        ...positions[position],
        length,
        cellSize,
        roundedCorners: roundedCorners[position],
    });
};

const styleBEyeball = ({ matrixLength, size, position }: StyledEyePathGeneratorParams) => {
    const cellSize = size / matrixLength;

    const length = cellSize * 3;
    const positions = generateRoundedEyeballPos(cellSize, matrixLength);

    return generateRoundedCornerEyeballPath({
        ...positions[position],
        length,
        cellSize,
        roundedCorners: ['top-left', 'bottom-right'],
    });
};

const styleCEyeball = ({ matrixLength, size, position }: StyledEyePathGeneratorParams) => {
    const cellSize = size / matrixLength;

    const length = cellSize * 3;
    const positions = generateRoundedEyeballPos(cellSize, matrixLength);

    const roundedCorners: {
        [key: string]: ('top-left' | 'top-right' | 'bottom-left' | 'bottom-right')[];
    } = {
        topLeft: ['top-left'],
        topRight: ['top-right'],
        bottomLeft: ['bottom-left'],
    };

    return generateRoundedCornerEyeballPath({
        ...positions[position],
        length,
        cellSize,
        roundedCorners: roundedCorners[position],
    });
};
const eyeballFunction: {
    [key: string]: (param: StyledEyePathGeneratorParams) => string;
} = {
    square: squareEyeball,
    circle: circleEyeball,
    rounded: roundedEyeball,
    leaf: styleAEyeball,
    pointed: styleBEyeball,
    'extra-rounded': styleCEyeball,
};

const generateEyeballSVG = ({
    shape,
    color,
    size,
    matrixLength,
    position,
    pathOnly,
    matrix,
    config,
}: GenerateEyeballSVGParams) => {
    if (shape === 'body') {
        return '';
    }
    if (shape.includes('body-')) {
        const bodyShape = config.shapes.eyeball.replace('body-', '') as BodyShape;
        const path = generatePath({
            matrix,
            size: config.length,
            config: {
                ...config,
                shapes: {
                    ...config.shapes,
                    body: bodyShape,
                },
            },
            eyeballOnly: true,
        });
        if (pathOnly) {
            return path;
        }
        return `<path fill="${isGradientColor(color) ? 'url(#eyeball)' : color}" d="${path}"/>`;
    }

    const path = eyeballFunction[shape]({
        matrixLength,
        size,
        position,
    });
    if (pathOnly) {
        return path;
    }
    return `<path fill="${isGradientColor(color) ? 'url(#eyeball)' : color}" d="${path}"/>`;
};

export const generateEyeballSVGFromConfig = (
    config: Config,
    matrixLength: number,
    matrix: number[][],
    isFromBody?: boolean,
) => {
    const shape = config.shapes.eyeball;
    const colors = config.colors.eyeball;

    let svgString = '';
    if (shape === 'body') {
        return '';
    }

    if ((colors.topLeft === 'body' && isFromBody) || (colors.topLeft !== 'body' && !isFromBody)) {
        svgString += generateEyeballSVG({
            shape,
            color: colors.topLeft === 'body' ? config.colors.body : colors.topLeft,
            size: config.length,
            matrixLength,
            position: 'topLeft',
            pathOnly: colors.topLeft === 'body',
            matrix,
            config,
        });
    }

    if ((colors.topRight === 'body' && isFromBody) || (colors.topRight !== 'body' && !isFromBody)) {
        svgString += generateEyeballSVG({
            shape,
            color: colors.topRight === 'body' ? config.colors.body : colors.topRight,
            size: config.length,
            matrixLength,
            position: 'topRight',
            pathOnly: colors.bottomLeft === 'body',
            matrix,
            config,
        });
    }

    if (
        (colors.bottomLeft === 'body' && isFromBody) ||
        (colors.bottomLeft !== 'body' && !isFromBody)
    ) {
        svgString += generateEyeballSVG({
            shape,
            color: colors.bottomLeft === 'body' ? config.colors.body : colors.bottomLeft,
            size: config.length,
            matrixLength,
            position: 'bottomLeft',
            pathOnly: colors.bottomLeft === 'body',
            matrix,
            config,
        });
    }

    return svgString;
};
