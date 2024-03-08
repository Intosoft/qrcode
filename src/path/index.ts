/* eslint-disable no-restricted-syntax */
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
    const eyeBallPositions = getEyeBallPositions(matrix.length);
    const eyeFramePositions = getEyeFramePositions(matrix.length);
    const logoPathPositions = getLogoPathPositions(matrix.length, config.logo?.size);
    let path = '';

    if (config.logo?.removeBg) {
        matrix.forEach((row, i) => {
            row.forEach((_, j) => {
                for (const pos of logoPathPositions) {
                    if (pos[0] === i && pos[1] === j) {
                        matrix[i][j] = 0;
                    }
                }
            });
        });
    }

    matrix.forEach((row, i) => {
        row.forEach((column, j) => {
            if (column) {
                const neighbors = checkNeighbors({ matrix, i, j });

                const isXLast = j === matrix.length - 1;
                const isXFirst = j === 0;

                const isYLast = i === matrix.length - 1;
                const isYFirst = i === 0;

                for (const pos of eyeFramePositions) {
                    if (pos[0] === i && pos[1] === j) {
                        if (eyeFrameOnly) {
                            path += pathGenerator({
                                config,
                                i,
                                j,
                                isXFirst,
                                isXLast,
                                isYFirst,
                                isYLast,
                                neighbors,
                                cellSize,
                            });
                        }
                        if (config.shapes.eyeFrame !== 'body') {
                            return;
                        }
                    }
                }

                for (const pos of eyeBallPositions) {
                    if (pos[0] === i && pos[1] === j) {
                        if (eyeballOnly) {
                            path += pathGenerator({
                                config,
                                i,
                                j,
                                isXFirst,
                                isXLast,
                                isYFirst,
                                isYLast,
                                neighbors,
                                cellSize,
                            });
                        }
                        if (config.shapes.eyeball !== 'body') {
                            return;
                        }
                    }
                }

                if (eyeballOnly || eyeFrameOnly) {
                    return;
                }

                path += pathGenerator({
                    config,
                    i,
                    j,
                    isXFirst,
                    isXLast,
                    isYFirst,
                    isYLast,
                    neighbors,
                    cellSize,
                });
            }
        });
    });
    if (!eyeballOnly && !eyeFrameOnly) {
        path += generateEyeFrameSVGFromConfig(config, matrix.length, matrix, true);
        path += generateEyeballSVGFromConfig(config, matrix.length, matrix, true);
    }

    return path;
};
