import { StylePathGeneratorParams } from "./types";
import { getPositionForEyes } from "./utils";

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
  const positions = getPositionForEyes({ matrixLength, cellSize });

  const height = cellSize * 3;
  const radius = height / 2;
  //top-left
  path += circleEyeballPath({
    ...positions.eyeball.topLeft,
    radius,
  });

  //top-right
  path += circleEyeballPath({
    ...positions.eyeball.topRight,
    radius,
  });

  path += circleEyeballPath({
    ...positions.eyeball.bottomLeft,
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

export const squareEyeball = ({
  matrixLength,
  size,
}: StylePathGeneratorParams) => {
  const cellSize = size / matrixLength;

  const length = cellSize * 3 - cellSize / 2;
  const positions = getPositionForEyes({ matrixLength, cellSize });

  let path = "";
  //top-left
  path += squareEyeballPath({
    ...positions.eyeball.topLeft,
    length,
    cellSize,
  });

  //top-right
  path += squareEyeballPath({
    ...positions.eyeball.topRight,
    length,
    cellSize,
  });

  //bottom-left
  path += squareEyeballPath({
    ...positions.eyeball.bottomLeft,
    length,
    cellSize,
  });

  return path;
};
