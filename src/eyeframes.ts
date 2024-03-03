import { isGradientColor } from "./utils/gradient";
import {
  GenerateEyeFrameSVGParams,
  StyledEyePathGeneratorParams,
} from "./types";
import { getPositionForEyes } from "./utils";
import { Config, EyeFrameShape } from "./config";

import {
  generateOutlineCirclePath,
  generateOutlineRoundedSquarePath,
  generateOutlineSquarePath,
} from "./path/square";

interface CircleEyeFrameParams {
  x: number;
  y: number;
  length: number;
  cellSize: number;
}

export const circleEyeFramePath = ({ x, y, length }: CircleEyeFrameParams) => {
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
  position,
}: StyledEyePathGeneratorParams) => {
  let path = "";
  const cellSize = size / matrixLength;
  const positions = getPositionForEyes({
    matrixLength,
    cellSize,
  });

  const length = cellSize * 7;

  path += generateOutlineCirclePath({
    ...positions.eyeFrame[position],
    cellSize: cellSize,
    length,
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
  position,
}: StyledEyePathGeneratorParams) => {
  const cellSize = size / matrixLength;

  const length = cellSize * 7;
  const positions = getPositionForEyes({ matrixLength, cellSize });

  let path = "";
  path += generateOutlineSquarePath({
    ...positions.eyeFrame[position],
    length,
    cellSize,
  });

  return path;
};

interface RoundedEyeFrameParams {
  x: number;
  y: number;
  length: number;
  cellSize: number;
  strokeColor?: string;
}

const roundedEyeFramePath = ({
  cellSize,
  length,
  x,
  y,
}: RoundedEyeFrameParams) => {
  //Original Path
  //M106.19,130H33.81
  //A23.81,23.81,0,0,1,10,106.19V33.81
  //A23.81,23.81,0,0,1,33.81,10h72.38
  //A23.81,23.81,0,0,1,130,33.81v72.38
  //A23.81,23.81,0,0,1,106.19,130Z

  const dynamic1 = cellSize / 2; // 10
  const dynamic2 = cellSize * 1.1905; // 23.81
  const dynamic3 = dynamic2 + dynamic1; // 33.81
  const dynamic4 = length - dynamic3; // 106.19
  const dynamic5 = dynamic4 - dynamic3; //72.38

  return `M${x + dynamic4},${y + length - dynamic1}H${
    x + dynamic3
  }A${dynamic2},${dynamic2},0,0,1,${x + dynamic1},${y + length - dynamic3}V${
    y + dynamic3
  }A${dynamic2},${dynamic2},0,0,1,${x + dynamic3},${
    y + dynamic1
  }h${dynamic5}A${dynamic2},${dynamic2},0,0,1,${x + length - dynamic1},${
    y + dynamic3
  }v${dynamic5}A${dynamic2},${dynamic2},0,0,1,${x + length - dynamic3},${
    y + length - dynamic1
  }Z`;
};

export const roundedEyeFrame = ({
  matrixLength,
  size,
  position,
}: StyledEyePathGeneratorParams) => {
  const cellSize = size / matrixLength;

  const length = cellSize * 7;
  const positions = getPositionForEyes({ matrixLength, cellSize });

  return generateOutlineRoundedSquarePath({
    ...positions.eyeFrame[position],
    cellSize,
    length,
  });
};
const eyeFrameFunction: {
  [key in Exclude<EyeFrameShape, "circle-item"> as string]: Function;
} = {
  square: squareEyeFrame,
  circle: circleEyeFrame,
  rounded: roundedEyeFrame,
};

const generateEyeFrameSVG = ({
  shape,
  color,
  size,
  matrixLength,
  position,
  pathOnly,
}: GenerateEyeFrameSVGParams) => {
  if (shape == "circle-item") {
    return "";
  }

  const path = eyeFrameFunction[shape]({
    matrixLength: matrixLength,
    size: size,
    position,
  });
  if (pathOnly) {
    return path;
  }
  return `<path
  d="${path}" 
  fill="${isGradientColor(color) ? "url(#eyeFrame)" : color}"
 
  />`;
};

export const generateEyeFrameSVGFromConfig = (
  config: Config,
  matrixLength: number,
  isFromBody?: boolean
) => {
  const shape = config.shapes.eyeFrame;
  const colors = config.colors.eyeFrame;

  let svgString = "";

  if (shape === "body") {
    return "";
  }

  //top-left
  if (
    (colors.topLeft === "body" && isFromBody) ||
    (colors.topLeft !== "body" && !isFromBody)
  ) {
    svgString += generateEyeFrameSVG({
      shape,
      color: colors.topLeft === "body" ? config.colors.body : colors.topLeft,
      size: config.length,
      matrixLength,
      position: "topLeft",
      pathOnly: colors.topLeft === "body",
    });
  }

  //top-right
  if (
    (colors.topRight === "body" && isFromBody) ||
    (colors.topRight !== "body" && !isFromBody)
  ) {
    svgString += generateEyeFrameSVG({
      shape,
      color: colors.topRight === "body" ? config.colors.body : colors.topRight,
      size: config.length,
      matrixLength,
      position: "topRight",
      pathOnly: colors.topLeft === "body",
    });
  }

  //bottom-left
  if (
    (colors.bottomLeft === "body" && isFromBody) ||
    (colors.bottomLeft !== "body" && !isFromBody)
  ) {
    svgString += generateEyeFrameSVG({
      shape,
      color:
        colors.bottomLeft === "body" ? config.colors.body : colors.bottomLeft,
      size: config.length,
      matrixLength,
      position: "bottomLeft",
      pathOnly: colors.topLeft === "body",
    });
  }

  return svgString;
};
