import { Config } from "./config";
import QRCode, { QRCodeErrorCorrectionLevel } from "qrcode";

export const generateMatrix = (
  value: string,
  errorCorrectionLevel: QRCodeErrorCorrectionLevel
) => {
  const arr = Array.from(
    QRCode.create(value, { errorCorrectionLevel }).modules.data
  );
  const sqrt = Math.sqrt(arr.length);

  const rows = [];
  for (let i = 0; i < arr.length; i += sqrt) {
    rows.push(arr.slice(i, i + sqrt));
  }

  return rows;
};

export const getEyeFramePositions = (matrixLength: number) => {
  const count = 7;
  const offset = 0;
  return getPositions({ matrixLength, count, offset });
};

export const getEyeBallPositions = (matrixLength: number) => {
  const count = 3;
  const offset = 2;

  const innerItems = [
    //top-left
    [3, 3],
    //top-right
    [matrixLength - 1 - 3, 3],
    //bottom-left
    [3, matrixLength - 1 - 3],
  ];
  return [...getPositions({ matrixLength, count, offset }), ...innerItems];
};

interface GetPositions {
  matrixLength: number;
  offset: number;
  count: number;
}

export const getPositions = ({ matrixLength, offset, count }: GetPositions) => {
  const lastPosition = matrixLength - 1;
  const emptyArray = Array(count).fill("");
  const countPosition = count - 1;

  return [
    //top-left
    // horizontal
    ...emptyArray.map((_, index) => [index + offset, 0 + offset]),
    ...emptyArray.map((_, index) => [index + offset, countPosition + offset]),
    // vertical
    ...emptyArray.map((_, index) => [0 + offset, index + offset]),
    ...emptyArray.map((_, index) => [countPosition + offset, index + offset]),

    // top-right
    // horizontal
    ...emptyArray.map((_, index) => [
      lastPosition - index - offset,
      0 + offset,
    ]),
    ...emptyArray.map((_, index) => [
      lastPosition - index - offset,
      countPosition + offset,
    ]),
    // vertical
    ...emptyArray.map((_, index) => [lastPosition - offset, index + offset]),
    ...emptyArray.map((_, index) => [
      lastPosition - countPosition - offset,
      index + offset,
    ]),

    // bottom-left
    // horizontal
    ...emptyArray.map((_, index) => [index + offset, lastPosition - offset]),
    ...emptyArray.map((_, index) => [
      index + offset,
      lastPosition - countPosition - offset,
    ]),
    // vertical
    ...emptyArray.map((_, index) => [
      0 + offset,
      lastPosition - index - offset,
    ]),
    ...emptyArray.map((_, index) => [
      countPosition + offset,
      lastPosition - index - offset,
    ]),
  ];
};
interface GetEyesPositionProps {
  matrixLength: number;
  cellSize: number;
}

export const getPositionForEyes = ({
  matrixLength,
  cellSize,
}: GetEyesPositionProps) => {
  return {
    eyeball: {
      topLeft: {
        x: 3.5 * cellSize,
        y: 3.5 * cellSize,
      },
      topRight: {
        x: (matrixLength - 3.5) * cellSize,
        y: 3.5 * cellSize,
      },
      bottomLeft: {
        x: 3.5 * cellSize,
        y: (matrixLength - 3.5) * cellSize,
      },
    },
    eyeFrame: {
      topLeft: {
        x: 0,
        y: 0,
      },
      topRight: {
        x: (matrixLength - 7) * cellSize,
        y: 0,
      },
      bottomLeft: {
        x: 0,
        y: (matrixLength - 7) * cellSize,
      },
    },
  };
};

export const renderLogoFromConfig = (config: Config) => {
  if (config.logo?.url) {
    const centerX = (config.length - config.logo.width) / 2;
    const centerY = (config.length - config.logo.height) / 2;
    return `<image 
    id="logo" 
    xlink:href="${config.logo.url}" 
    height="${config.logo.height}"
    width="${config.logo.width}" x="${centerX}" y="${centerY}" />`;
  }

  return "";
};

export const getLogoPathPositions = (matrixLength: number) => {
  const count = 7;
  const startPos = Math.ceil((matrixLength - 1) / 2 - count / 2);

  const positions = Array(count)
    .fill(0)
    .map((_, i) => {
      return Array(count)
        .fill(0)
        .map((_, j) => {
          return [startPos + i, startPos + j];
        });
    })
    .flat();

  console.log("logo path positions", positions);
  return positions;
};
