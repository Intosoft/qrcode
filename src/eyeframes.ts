import { StylePathGeneratorParams } from "./types";
import { getPositionForEyes } from "./utils";

interface CircleEyeFrameParams {
  x: number;
  y: number;
  radius: number;
}

export const circleEyeFramePath = ({ x, y, radius }: CircleEyeFrameParams) => {
  return `M${x + radius},${y}A${radius},${radius},0,1,1,${
    x - radius
  },${y},${radius},${radius},0,0,1,${x + radius},${y}Z`;
};

export const circleEyeFrame = ({
  matrixLength,
  size,
}: StylePathGeneratorParams) => {
  let path = "";
  const cellSize = size / matrixLength;
  const positions = getPositionForEyes({ matrixLength, cellSize });

  const height = cellSize * 3;
  const radius = height / 2;
  //top-left
  path += circleEyeFramePath({
    ...positions.eyeFrame.topLeft,
    radius,
  });

  //top-right
  path += circleEyeFramePath({
    ...positions.eyeFrame.topRight,
    radius,
  });

  path += circleEyeFramePath({
    ...positions.eyeFrame.bottomLeft,
    radius,
  });

  return path;
};

interface SquareEyeFrameParams {
  x: number;
  y: number;
  length: number;
  cellSize: number;
  strokeColor?: string;
}

const squareEyeFramePath = ({
  cellSize,
  length,
  x,
  y,
}: SquareEyeFrameParams) => {
  return `M${x + cellSize / 2},${y + cellSize / 2}H${
    x + length - cellSize / 2
  }V${y + length - cellSize / 2}H${x + cellSize / 2}Z`;
};

export const squareEyeFrame = ({
  matrixLength,
  size,
}: StylePathGeneratorParams) => {
  const cellSize = size / matrixLength;

  const length = cellSize * 7;
  const positions = getPositionForEyes({ matrixLength, cellSize });

  let path = "";
  //top-left
  path += squareEyeFramePath({
    ...positions.eyeFrame.topLeft,
    length,
    cellSize,
  });

  //top-right
  path += squareEyeFramePath({
    ...positions.eyeFrame.topRight,
    length,
    cellSize,
  });

  //bottom-left
  path += squareEyeFramePath({
    ...positions.eyeFrame.bottomLeft,
    length,
    cellSize,
  });

  return path;
};
