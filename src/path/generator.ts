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

        case 'dots': {
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
        case 'classy': {
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
        case 'mosaic': {
            const x = j * cellSize;
            const y = i * cellSize;
            const hasLeftNeighbor = neighbors.left;
            const hasTopNeighbor = neighbors.top;
            const hasRightNeighbor = neighbors.right;
            const hasBottomNeighbor = neighbors.bottom;

            const cornerRadius = cellSize * 0.3;
            
            const corners: ('top-left' | 'top-right' | 'bottom-left' | 'bottom-right')[] = [];
            if (!hasTopNeighbor && !hasLeftNeighbor) corners.push('top-left');
            if (!hasTopNeighbor && !hasRightNeighbor) corners.push('top-right');
            if (!hasBottomNeighbor && !hasLeftNeighbor) corners.push('bottom-left');
            if (!hasBottomNeighbor && !hasRightNeighbor) corners.push('bottom-right');

            if (corners.length > 0) {
                return generateRoundedCornerEyeballPath({
                    x,
                    y,
                    cellSize,
                    length: cellSize,
                    roundedCorners: corners,
                });
            }

            return generateSquarePath({ i, j, cellSize });
        }
        case 'fluid': {
            const x = j * cellSize;
            const y = i * cellSize;
            
            if (!neighbors.top && !neighbors.bottom && !neighbors.left && !neighbors.right) {
                return generateCirclePath({ i, j, cellSize, diameter: cellSize });
            }

            const corners: ('top-left' | 'top-right' | 'bottom-left' | 'bottom-right')[] = [];
            if (!neighbors.top || !neighbors.left) corners.push('top-left');
            if (!neighbors.top || !neighbors.right) corners.push('top-right');
            if (!neighbors.bottom || !neighbors.left) corners.push('bottom-left');
            if (!neighbors.bottom || !neighbors.right) corners.push('bottom-right');

            if (corners.length > 0) {
                return generateRoundedCornerEyeballPath({
                    x,
                    y,
                    cellSize,
                    length: cellSize,
                    roundedCorners: corners,
                });
            }

            return generateSquarePath({ i, j, cellSize });
        }
        case 'edge-cut': {
            const x = j * cellSize;
            const y = i * cellSize;
            
            if (!neighbors.top && !neighbors.left) {
                return generateRoundedCornerEyeballPath({
                    x,
                    y,
                    cellSize,
                    length: cellSize,
                    roundedCorners: [],
                });
            }
            if (!neighbors.top && !neighbors.right) {
                return generateRoundedCornerEyeballPath({
                    x,
                    y,
                    cellSize,
                    length: cellSize,
                    roundedCorners: [],
                });
            }
            if (!neighbors.bottom && !neighbors.left) {
                return generateRoundedCornerEyeballPath({
                    x,
                    y,
                    cellSize,
                    length: cellSize,
                    roundedCorners: [],
                });
            }
            if (!neighbors.bottom && !neighbors.right) {
                return generateRoundedCornerEyeballPath({
                    x,
                    y,
                    cellSize,
                    length: cellSize,
                    roundedCorners: [],
                });
            }

            return generateSquarePath({ i, j, cellSize });
        }
        case 'japanese': {
            const x = j * cellSize;
            const y = i * cellSize;
            const shrink = cellSize * 0.15;
            
            if (!neighbors.top && !neighbors.bottom && !neighbors.left && !neighbors.right) {
                return generateCirclePath({ i, j, cellSize, diameter: cellSize - shrink });
            }

            const hasNeighbors = [neighbors.top, neighbors.bottom, neighbors.left, neighbors.right].filter(Boolean).length;
            
            if (hasNeighbors === 1) {
                if (neighbors.top || neighbors.bottom) {
                    return generateSquarePath({
                        i,
                        j,
                        height: cellSize,
                        width: cellSize - shrink,
                        cellSize,
                    });
                } else {
                    return generateSquarePath({
                        i,
                        j,
                        height: cellSize - shrink,
                        width: cellSize,
                        cellSize,
                    });
                }
            }

            return generateSquarePath({ i, j, cellSize });
        }
        default:
            return path;
    }
    return path;
};
