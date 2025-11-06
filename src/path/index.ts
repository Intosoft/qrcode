import { getEyeBallPositions, getEyeFramePositions, getLogoPathPositions } from '../utils';
import { Config } from '../config';
import { checkNeighbors } from '../utils/path';
import { generateEyeFrameSVGFromConfig } from '../eyeframes';
import { generateEyeballSVGFromConfig } from '../eyeball';
import { pathGenerator } from './generator';

interface GeneratePathProps {
    size: number;
    matrix: number[][];
    config: Config;
    eyeballOnly?: boolean;
    eyeFrameOnly?: boolean;
}

export const generatePath = ({
    size,
    matrix: paramMatrix,
    config,
    eyeFrameOnly,
    eyeballOnly,
}: GeneratePathProps) => {
    const matrix = paramMatrix;
    const cellSize = size / matrix.length;
    const matrixLength = matrix.length;
    const eyeBallPositions = getEyeBallPositions(matrixLength);
    const eyeFramePositions = getEyeFramePositions(matrixLength);
    const logoPathPositions = getLogoPathPositions(matrixLength, config.logo?.size);
    
    const eyeBallSet = new Set(eyeBallPositions.map(([i, j]) => `${i},${j}`));
    const eyeFrameSet = new Set(eyeFramePositions.map(([i, j]) => `${i},${j}`));
    const logoSet = new Set(logoPathPositions.map(([i, j]) => `${i},${j}`));
    
    let path = '';

    if (config.logo?.removeBackground) {
        for (let i = 0; i < matrixLength; i++) {
            for (let j = 0; j < matrixLength; j++) {
                if (logoSet.has(`${i},${j}`)) {
                    matrix[i][j] = 0;
                }
            }
        }
    }

    matrix.forEach((row, i) => {
        row.forEach((column, j) => {
            if (column) {
                const posKey = `${i},${j}`;
                
                if (eyeFrameSet.has(posKey)) {
                    if (eyeFrameOnly) {
                        const neighbors = checkNeighbors({ matrix, i, j });
                        path += pathGenerator({
                            config,
                            i,
                            j,
                            isXFirst: j === 0,
                            isXLast: j === matrixLength - 1,
                            isYFirst: i === 0,
                            isYLast: i === matrixLength - 1,
                            neighbors,
                            cellSize,
                        });
                    }
                    if (config.shapes.eyeFrame !== 'body') {
                        return;
                    }
                }

                if (eyeBallSet.has(posKey)) {
                    if (eyeballOnly) {
                        const neighbors = checkNeighbors({ matrix, i, j });
                        path += pathGenerator({
                            config,
                            i,
                            j,
                            isXFirst: j === 0,
                            isXLast: j === matrixLength - 1,
                            isYFirst: i === 0,
                            isYLast: i === matrixLength - 1,
                            neighbors,
                            cellSize,
                        });
                    }
                    if (config.shapes.eyeball !== 'body') {
                        return;
                    }
                }

                if (!eyeballOnly && !eyeFrameOnly) {
                    const neighbors = checkNeighbors({ matrix, i, j });
                    path += pathGenerator({
                        config,
                        i,
                        j,
                        isXFirst: j === 0,
                        isXLast: j === matrixLength - 1,
                        isYFirst: i === 0,
                        isYLast: i === matrixLength - 1,
                        neighbors,
                        cellSize,
                    });
                }
            }
        });
    });
    if (!eyeballOnly && !eyeFrameOnly) {
        path += generateEyeFrameSVGFromConfig(config, matrix.length, matrix, true);
        path += generateEyeballSVGFromConfig(config, matrix.length, matrix, true);
    }

    return path;
};
