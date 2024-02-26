import { StylePathGeneratorParams } from "./types";

interface CircleEyeballParams {
  x: number;
  y: number;
  radius: number;
}

export const circleEyeballPath = ({ x, y, radius }: CircleEyeballParams) => {
  return `M${x + radius},${y}A${radius},${radius},0,1,1,${
    x - radius
  },${y},${radius},${radius},0,0,1,${x + radius},${y}Z`;
};

export const circleEyeball = ({
  matrixLength,
  size,
}: StylePathGeneratorParams) => {
  let path = "";
  const cellSize = size / matrixLength;

  const height = cellSize * 3;

  //top-left
  path += circleEyeballPath({
    x: 4 * cellSize,
    y: 4 * cellSize,
    radius: height / 2,
  });

  //top-right
  path += circleEyeballPath({
    x: (matrixLength - 3) * cellSize,
    y: 4 * cellSize,
    radius: height / 2,
  });

  path += circleEyeballPath({
    x: 4 * cellSize,
    y: (matrixLength - 3) * cellSize,
    radius: height / 2,
  });

  return path;
};

interface SquareEyeballParams {
  x: number;
  y: number;
  size: number;
  cellSize: number;
  strokeColor?: string;
}

const squareEyeballPath = ({ size, x, y, cellSize }: SquareEyeballParams) => {
  const halfSize = size / 2;
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

export const squareEyeball = ({
  matrixLength,
  size,
}: StylePathGeneratorParams) => {
  const cellSize = size / matrixLength;

  let path = "";
  //top-left
  path += squareEyeballPath({
    x: 4 * cellSize,
    y: 4 * cellSize,
    size: cellSize * 3,
    cellSize,
  });

  //top-right
  path += squareEyeballPath({
    x: (matrixLength - 3) * cellSize,
    y: 4 * cellSize,
    size: cellSize * 3,
    cellSize,
  });

  //bottom-left
  path += squareEyeballPath({
    x: 4 * cellSize,
    y: (matrixLength - 3) * cellSize,
    size: cellSize * 3,
    cellSize,
  });

  return path;
};
