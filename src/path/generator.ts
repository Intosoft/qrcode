import { generateCirclePath, generateRoundedPath } from './circle';

import {
    generateDiamondPath,
    generateRoundedCornerEyeballPath,
    generateSquarePath,
    generateStarPath,
    generateTrianglePath,
} from './square';
import { Config } from '../config';

interface GeneratorPathProps {
    config: Config;
    i: number;
    j: number;
    cellSize: number;
    neighbors: {
        top: boolean;
        bottom: boolean;
        left: boolean;
        right: boolean;
    };
    isXFirst: boolean;
    isXLast: boolean;
    isYFirst: boolean;
    isYLast: boolean;
}

export const pathGenerator = ({
    config,
    i,
    j,
    cellSize,
    neighbors,
    isXFirst,
    isXLast,
    isYLast,
}: GeneratorPathProps) => {
    const path = '';
    switch (config.shapes.body) {
        case 'square': {
            return generateSquarePath({
                i,
                j,
                height: cellSize,
                width: cellSize,
                cellSize,
            });
        }
        case 'square-small': {
            return generateSquarePath({
                i,
                j,
                height: cellSize - cellSize * 0.1,
                width: cellSize - cellSize * 0.1,
                cellSize,
            });
        }
        case 'square-vertical': {
            return generateSquarePath({
                i,
                j,
                height: cellSize - cellSize * 0.1,
                cellSize,
            });
        }
        case 'square-horizontal': {
            return generateSquarePath({
                i,
                j,
                width: cellSize - cellSize * 0.1,
                cellSize,
            });
        }
        case 'diamond': {
            return generateDiamondPath({
                i,
                j,
                height: cellSize,
                width: cellSize,
                cellSize,
            });
        }
        case 'star': {
            return generateStarPath({
                i,
                j,
                height: cellSize,
                width: cellSize,
                cellSize,
            });
        }
        case 'star-small': {
            return generateStarPath({
                i,
                j,
                height: cellSize,
                width: cellSize,
                cellSize,
                points: 4,
            });
        }
        case 'circle': {
            return generateCirclePath({ i, j, cellSize });
        }
        case 'circle-small': {
            return generateCirclePath({
                i,
                j,
                cellSize,
                diameter: cellSize - cellSize * 0.1,
            });
        }
        case 'rounded-horizontal': {
            if (!neighbors.left && !neighbors.right) {
                return generateCirclePath({
                    i,
                    j,
                    cellSize,
                    diameter: cellSize - cellSize * 0.1,
                });
            }

            if (neighbors.left && neighbors.right) {
                return generateSquarePath({
                    i,
                    j,
                    cellSize,
                    height: cellSize - cellSize * 0.1,
                    width: cellSize,
                });
            }

            if (!neighbors.left || (neighbors.right && isXFirst)) {
                return generateRoundedPath({
                    i,
                    j,
                    cellSize,
                    roundedSide: 'left',
                    height: cellSize - cellSize * 0.1,
                });
            }

            if (!neighbors.right || (neighbors.left && isYLast)) {
                return generateRoundedPath({
                    i,
                    j,
                    cellSize,
                    roundedSide: 'right',
                    height: cellSize - cellSize * 0.1,
                });
            }
            break;
        }
        case 'rounded-vertical': {
            if (!neighbors.top && !neighbors.bottom) {
                return generateCirclePath({
                    i,
                    j,
                    cellSize,
                    diameter: cellSize - cellSize * 0.1,
                });
            }

            if (neighbors.top && neighbors.bottom) {
                return generateSquarePath({
                    i,
                    j,
                    cellSize,
                    width: cellSize - cellSize * 0.1,
                });
            }

            if (!neighbors.top || (neighbors.bottom && isXFirst)) {
                return generateRoundedPath({
                    i,
                    j,
                    cellSize,
                    roundedSide: 'top',
                    width: cellSize - cellSize * 0.1,
                });
            }

            if (!neighbors.bottom || (neighbors.top && isXLast)) {
                return generateRoundedPath({
                    i,
                    j,
                    cellSize,
                    roundedSide: 'bottom',
                    width: cellSize - cellSize * 0.1,
                });
            }
            return path;
        }

        case 'styleA': {
            const x = j * cellSize;
            const y = i * cellSize;
            if (!neighbors.top && !neighbors.bottom && !neighbors.left && !neighbors.right) {
                return generateRoundedCornerEyeballPath({
                    x,
                    y,
                    cellSize,
                    length: cellSize,
                    roundedCorners: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
                });
            }

            if (!neighbors.top && !neighbors.bottom && !neighbors.left) {
                return generateTrianglePath({
                    i,
                    j,
                    cellSize,
                    direction: 'left',
                });
            }
            if (!neighbors.top && !neighbors.bottom && !neighbors.right) {
                return generateTrianglePath({
                    i,
                    j,
                    cellSize,
                    direction: 'right',
                });
            }
            if (!neighbors.top && !neighbors.left && !neighbors.right) {
                return generateTrianglePath({
                    i,
                    j,
                    cellSize,
                    direction: 'top',
                });
            }
            if (!neighbors.bottom && !neighbors.left && !neighbors.right) {
                return generateTrianglePath({
                    i,
                    j,
                    cellSize,
                    direction: 'bottom',
                });
            }
            if (!neighbors.top && !neighbors.left) {
                return generateRoundedCornerEyeballPath({
                    x,
                    y,
                    cellSize,
                    length: cellSize,
                    roundedCorners: ['top-left'],
                });
            }
            if (!neighbors.top && !neighbors.right) {
                return generateRoundedCornerEyeballPath({
                    x,
                    y,
                    cellSize,
                    length: cellSize,
                    roundedCorners: ['top-right'],
                });
            }
            if (!neighbors.bottom && !neighbors.left) {
                return generateRoundedCornerEyeballPath({
                    x,
                    y,
                    cellSize,
                    length: cellSize,
                    roundedCorners: ['bottom-left'],
                });
            }
            if (!neighbors.bottom && !neighbors.right) {
                return generateRoundedCornerEyeballPath({
                    x,
                    y,
                    cellSize,
                    length: cellSize,
                    roundedCorners: ['bottom-right'],
                });
            }

            return generateSquarePath({
                i,
                j,
                cellSize,
            });
        }
        case 'styleB': {
            const x = j * cellSize;
            const y = i * cellSize;
            if (!neighbors.top && !neighbors.bottom && !neighbors.left && !neighbors.right) {
                return generateRoundedCornerEyeballPath({
                    x,
                    y,
                    cellSize,
                    length: cellSize,
                    roundedCorners: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
                });
            }

            if (!neighbors.top && !neighbors.bottom && !neighbors.left) {
                return generateRoundedCornerEyeballPath({
                    x,
                    y,
                    cellSize,
                    length: cellSize,
                    roundedCorners: ['top-left', 'bottom-left'],
                });
            }
            if (!neighbors.top && !neighbors.bottom && !neighbors.right) {
                return generateRoundedCornerEyeballPath({
                    x,
                    y,
                    cellSize,
                    length: cellSize,
                    roundedCorners: ['top-right', 'bottom-right'],
                });
            }
            if (!neighbors.top && !neighbors.left && !neighbors.right) {
                return generateRoundedCornerEyeballPath({
                    x,
                    y,
                    cellSize,
                    length: cellSize,
                    roundedCorners: ['top-left', 'top-right'],
                });
            }
            if (!neighbors.bottom && !neighbors.left && !neighbors.right) {
                return generateRoundedCornerEyeballPath({
                    x,
                    y,
                    cellSize,
                    length: cellSize,
                    roundedCorners: ['bottom-left', 'bottom-right'],
                });
            }
            if (!neighbors.top && !neighbors.left) {
                return generateRoundedCornerEyeballPath({
                    x,
                    y,
                    cellSize,
                    length: cellSize,
                    roundedCorners: ['top-left'],
                });
            }
            if (!neighbors.top && !neighbors.right) {
                return generateRoundedCornerEyeballPath({
                    x,
                    y,
                    cellSize,
                    length: cellSize,
                    roundedCorners: ['top-right'],
                });
            }
            if (!neighbors.bottom && !neighbors.left) {
                return generateRoundedCornerEyeballPath({
                    x,
                    y,
                    cellSize,
                    length: cellSize,
                    roundedCorners: ['bottom-left'],
                });
            }
            if (!neighbors.bottom && !neighbors.right) {
                return generateRoundedCornerEyeballPath({
                    x,
                    y,
                    cellSize,
                    length: cellSize,
                    roundedCorners: ['bottom-right'],
                });
            }

            return generateSquarePath({
                i,
                j,
                cellSize,
            });
        }
        default:
            return path;
    }
    return path;
};
