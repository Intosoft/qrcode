import { Config, EyeballShape } from "./config";
import {
  GenerateEyeballSVGParams,
  StyledEyePathGeneratorParams,
} from "./types";
import { getPositionForEyes } from "./utils";
import { isGradientColor } from "./utils/gradient";

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
  position,
}: StyledEyePathGeneratorParams) => {
  let path = "";
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

export const squareEyeball = ({
  matrixLength,
  size,
  position,
}: StyledEyePathGeneratorParams) => {
  const cellSize = size / matrixLength;

  const length = cellSize * 3 - cellSize / 2;
  const positions = getPositionForEyes({ matrixLength, cellSize });

  return squareEyeballPath({
    ...positions.eyeball[position],
    length,
    cellSize,
  });
};

const eyeballFunction: {
  [key in Exclude<EyeballShape, "circle-item"> as string]: Function;
} = {
  square: squareEyeball,
  circle: circleEyeball,
};

const generateEyeballSVG = ({
  shape,
  color,
  size,
  matrixLength,
  position,
}: GenerateEyeballSVGParams) => {
  if (shape == "circle-item") {
    return "";
  }
  return `<path
  fill="${isGradientColor(color) ? "url(#eyeball)" : color}"
  d="${eyeballFunction[shape]({
    matrixLength,
    size,
    position,
  })}" 
  stroke-width="0"
 
  />`;
};

export const generateEyeballSVGFromConfig = (
  config: Config,
  matrixLength: number
) => {
  const eyeballShape = config.shapes.eyeball;
  const eyeballColor = config.colors.eyeball;

  let svgString = "";

  //top-left
  svgString += generateEyeballSVG({
    shape: eyeballShape,
    color: eyeballColor.topLeft,
    size: config.length,
    matrixLength,
    position: "topLeft",
  });

  //top-right
  svgString += generateEyeballSVG({
    shape: eyeballShape,
    color: eyeballColor.topLeft,
    size: config.length,
    matrixLength,
    position: "topRight",
  });

  //bottom-left
  svgString += generateEyeballSVG({
    shape: eyeballShape,
    color: eyeballColor.topLeft,
    size: config.length,
    matrixLength,
    position: "bottomLeft",
  });

  return svgString;
};
