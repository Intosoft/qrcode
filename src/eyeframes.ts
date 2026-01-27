import { isGradientColor } from './utils/gradient';
import { GenerateEyeFrameSVGParams, StyledEyePathGeneratorParams } from './types';
import { getPositionForEyes } from './utils';
import { Config, BodyShape } from './config';

import {
    generateOutlineCirclePath,
    generateOutlineRoundedSquarePath,
    generateOutlineSquarePath,
} from './path/square';
import { generatePath } from './path';

const circleEyeFrame = ({ matrixLength, size, position }: StyledEyePathGeneratorParams) => {
    let path = '';
    const cellSize = size / matrixLength;
    const positions = getPositionForEyes({
        matrixLength,
        cellSize,
    });

    const length = cellSize * 7;

    path += generateOutlineCirclePath({
        ...positions.eyeFrame[position],
        cellSize,
        length,
    });

    return path;
};

const squareEyeFrame = ({ matrixLength, size, position }: StyledEyePathGeneratorParams) => {
    const cellSize = size / matrixLength;

    const length = cellSize * 7;
    const positions = getPositionForEyes({ matrixLength, cellSize });

    let path = '';
    path += generateOutlineSquarePath({
        ...positions.eyeFrame[position],
        length,
        cellSize,
    });

    return path;
};

const roundedEyeFrame = ({ matrixLength, size, position }: StyledEyePathGeneratorParams) => {
    const cellSize = size / matrixLength;

    const length = cellSize * 7;
    const positions = getPositionForEyes({ matrixLength, cellSize });

    return generateOutlineRoundedSquarePath({
        ...positions.eyeFrame[position],
        cellSize,
        length,
        roundedCorners: ['top-left', 'top-right', 'bottom-right', 'bottom-left'],
    });
};

const styleAEyeFrame = ({ matrixLength, size, position }: StyledEyePathGeneratorParams) => {
    const cellSize = size / matrixLength;

    const length = cellSize * 7;
    const positions = getPositionForEyes({ matrixLength, cellSize });
    const roundedCorners: {
        [key: string]: ('top-left' | 'top-right' | 'bottom-left' | 'bottom-right')[];
    } = {
        topLeft: ['top-left', 'top-right', 'bottom-left'],
        topRight: ['top-left', 'top-right', 'bottom-right'],
        bottomLeft: ['top-left', 'bottom-right', 'bottom-left'],
    };
    return generateOutlineRoundedSquarePath({
        ...positions.eyeFrame[position],
        cellSize,
        length,
        roundedCorners: roundedCorners[position],
    });
};

const styleBEyeFrame = ({ matrixLength, size, position }: StyledEyePathGeneratorParams) => {
    const cellSize = size / matrixLength;

    const length = cellSize * 7;
    const positions = getPositionForEyes({ matrixLength, cellSize });

    const roundedCorners: {
        [key: string]: ('top-left' | 'top-right' | 'bottom-left' | 'bottom-right')[];
    } = {
        topLeft: ['top-left'],
        topRight: ['top-right'],
        bottomLeft: ['bottom-left'],
    };

    return generateOutlineRoundedSquarePath({
        ...positions.eyeFrame[position],
        cellSize,
        length,
        roundedCorners: roundedCorners[position],
    });
};

const eyeFrameFunction: {
    [key: string]: (param: StyledEyePathGeneratorParams) => string;
} = {
    square: squareEyeFrame,
    circle: circleEyeFrame,
    rounded: roundedEyeFrame,
    leaf: styleAEyeFrame,
    pointed: styleBEyeFrame,
};

const generateEyeFrameSVG = ({
    shape,
    color,
    size,
    matrixLength,
    position,
    pathOnly,
    config,
    matrix,
}: GenerateEyeFrameSVGParams) => {
    if (shape === 'body') {
        return '';
    }
    if (shape.includes('body-')) {
        const bodyShape = config.shapes.eyeFrame.replace('body-', '') as BodyShape;
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
            eyeFrameOnly: true,
        });
        if (pathOnly) {
            return path;
        }
        return `<path fill="${isGradientColor(color) ? 'url(#eyeFrame)' : color}" d="${path}"/>`;
    }
    const path = eyeFrameFunction[shape]({
        matrixLength,
        size,
        position,
    });
    if (pathOnly) {
        return path;
    }
    return `<path fill="${isGradientColor(color) ? 'url(#eyeFrame)' : color}" d="${path}"/>`;
};

export const generateEyeFrameSVGFromConfig = (
    config: Config,
    matrixLength: number,
    matrix: number[][],
    isFromBody?: boolean,
) => {
    const shape = config.shapes.eyeFrame;
    const colors = config.colors.eyeFrame;

    let svgString = '';

    if (shape === 'body') {
        return '';
    }

    if ((colors.topLeft === 'body' && isFromBody) || (colors.topLeft !== 'body' && !isFromBody)) {
        svgString += generateEyeFrameSVG({
            shape,
            color: colors.topLeft === 'body' ? config.colors.body : colors.topLeft,
            size: config.length,
            matrixLength,
            position: 'topLeft',
            pathOnly: colors.topLeft === 'body',
            config,
            matrix,
        });
    }

    if ((colors.topRight === 'body' && isFromBody) || (colors.topRight !== 'body' && !isFromBody)) {
        svgString += generateEyeFrameSVG({
            shape,
            color: colors.topRight === 'body' ? config.colors.body : colors.topRight,
            size: config.length,
            matrixLength,
            position: 'topRight',
            pathOnly: colors.topRight === 'body',
            config,
            matrix,
        });
    }

    if (
        (colors.bottomLeft === 'body' && isFromBody) ||
        (colors.bottomLeft !== 'body' && !isFromBody)
    ) {
        svgString += generateEyeFrameSVG({
            shape,
            color: colors.bottomLeft === 'body' ? config.colors.body : colors.bottomLeft,
            size: config.length,
            matrixLength,
            position: 'bottomLeft',
            pathOnly: colors.bottomLeft === 'body',
            config,
            matrix,
        });
    }

    return svgString;
};
