import { StylePathGeneratorParams } from "./types";
import { getPositionForEyes } from "./utils";

interface CircleEyeFrameParams {
  x: number;
  y: number;
  length: number;
  cellSize: number;
}

export const circleEyeFramePath = ({
  x,
  y,
  length,
  cellSize,
}: CircleEyeFrameParams) => {
  const radius = length / 2;

  return `M${x + radius},${y + length}h0A${radius},${radius},0,0,1,${x},${
    y + length / 2
  }h0A${radius},${radius},0,0,1,${
    x + radius
  },${y}h0A${radius},${radius},0,0,1,${x + length},${
    y + length / 2
  }h0A${radius},${radius},0,0,1,${x + radius},${y + length}Z`;
};

export const circleEyeFrame = ({
  matrixLength,
  size,
}: StylePathGeneratorParams) => {
  let path = "";
  const cellSize = size / matrixLength;
  const positions = getPositionForEyes({
    matrixLength,
    cellSize,
    addition: cellSize / 2,
  });

  const length = cellSize * 6;

  //top-left
  path += circleEyeFramePath({
    ...positions.eyeFrame.topLeft,
    length,
    cellSize,
  });

  //top-right
  path += circleEyeFramePath({
    ...positions.eyeFrame.topRight,
    length,
    cellSize,
  });

  path += circleEyeFramePath({
    ...positions.eyeFrame.bottomLeft,
    length,
    cellSize,
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
