import {
  getEyeBallPositions,
  getEyeFramePositions,
  getLogoPathPositions,
} from "./../utils";
import { generateCirclePath, generateRoundedPath } from "./circle";

import {
  generateDiamondPath,
  generateSquarePath,
  generateStarPath,
} from "./square";
import { Config } from "../config";
import { checkNeighbors } from "../utils/path";
import { generateEyeFrameSVGFromConfig } from "../eyeframes";
import { generateEyeballSVGFromConfig } from "../eyeball";
interface GeneratePathProps {
  size: number;
  matrix: number[][];
  config: Config;
}

export const generatePath = ({ size, matrix, config }: GeneratePathProps) => {
  const cellSize = size / matrix.length;
  const eyeBallPositions = getEyeBallPositions(matrix.length);
  const eyeFramePositions = getEyeFramePositions(matrix.length);
  const logoPathPositions = getLogoPathPositions(matrix.length);
  let path = "";

  matrix.forEach((row, i) => {
    row.forEach((column, j) => {
      for (let pos of logoPathPositions) {
        if (pos[0] === i && pos[1] === j) {
          matrix[i][j] = 0;
        }
      }
    });
  });

  matrix.forEach((row, i) => {
    row.forEach((column, j) => {
      if (column) {
        const neighbors = checkNeighbors({ matrix, i, j });

        const isXLast = j == matrix.length - 1;
        const isXFirst = j == 0;

        const isYLast = i == matrix.length - 1;
        const isYFirst = i == 0;

        for (let pos of eyeFramePositions) {
          if (pos[0] === i && pos[1] === j) {
            if (config.shapes.eyeFrame === "circle-item") {
              path += generateCirclePath({ i, j, cellSize });
            }
            if (config.shapes.eyeFrame !== "body") {
              return;
            }
          }
        }

        for (let pos of eyeBallPositions) {
          if (pos[0] === i && pos[1] === j) {
            if (config.shapes.eyeball === "circle-item") {
              path += generateCirclePath({ i, j, cellSize });
            }
            if (config.shapes.eyeball !== "body") {
              return;
            }
          }
        }
        if (config.shapes.body === "square") {
          path += generateSquarePath({
            i,
            j,
            height: cellSize,
            width: cellSize,
            cellSize,
          });
        } else if (config.shapes.body === "square-small") {
          path += generateSquarePath({
            i,
            j,
            height: cellSize - 0.5,
            width: cellSize - 0.5,
            cellSize,
          });
        } else if (config.shapes.body === "square-vertical") {
          path += generateSquarePath({
            i,
            j,
            height: cellSize - 0.5,

            cellSize,
          });
        } else if (config.shapes.body === "square-horizontal") {
          path += generateSquarePath({
            i,
            j,
            width: cellSize - 0.5,
            cellSize,
          });
        } else if (config.shapes.body === "diamond") {
          path += generateDiamondPath({
            i,
            j,
            height: cellSize,
            width: cellSize,
            cellSize,
          });
        } else if (config.shapes.body === "star") {
          path += generateStarPath({
            i,
            j,
            height: cellSize,
            width: cellSize,
            cellSize,
          });
        } else if (config.shapes.body === "star-small") {
          path += generateStarPath({
            i,
            j,
            height: cellSize,
            width: cellSize,
            cellSize,
            points: 4,
          });
        } else if (config.shapes.body === "circle") {
          path += generateCirclePath({ i, j, cellSize });
        } else if (config.shapes.body === "circle-small") {
          path += generateCirclePath({
            i,
            j,
            cellSize,
            diameter: cellSize - cellSize * 0.1,
          });
        } else if (config.shapes.body === "rounded-horizontal") {
          if (!neighbors.left && !neighbors.right) {
            path += generateCirclePath({
              i,
              j,
              cellSize,
              diameter: cellSize - cellSize * 0.1,
            });
            return;
          }

          if (neighbors.left && neighbors.right) {
            path += generateSquarePath({
              i,
              j,
              cellSize,
              height: cellSize - cellSize * 0.1,
              width: cellSize,
            });
            return;
          }

          if (!neighbors.left || (neighbors.right && isXFirst)) {
            path += generateRoundedPath({
              i,
              j,
              cellSize,
              roundedSide: "left",
              height: cellSize - cellSize * 0.1,
            });
            return;
          }

          if (!neighbors.right || (neighbors.left && isYLast)) {
            path += generateRoundedPath({
              i,
              j,
              cellSize,
              roundedSide: "right",
              height: cellSize - cellSize * 0.1,
            });
            return;
          }
        } else if (config.shapes.body === "rounded-vertical") {
          if (!neighbors.top && !neighbors.bottom) {
            path += generateCirclePath({
              i,
              j,
              cellSize,
              diameter: cellSize - cellSize * 0.1,
            });
            return;
          }

          if (neighbors.top && neighbors.bottom) {
            path += generateSquarePath({
              i,
              j,
              cellSize,
              width: cellSize - cellSize * 0.1,
            });
            return;
          }

          if (!neighbors.top || (neighbors.bottom && isXFirst)) {
            path += generateRoundedPath({
              i,
              j,
              cellSize,
              roundedSide: "top",
              width: cellSize - cellSize * 0.1,
            });
            return;
          }

          if (!neighbors.bottom || (neighbors.top && isXLast)) {
            path += generateRoundedPath({
              i,
              j,
              cellSize,
              roundedSide: "bottom",
              width: cellSize - cellSize * 0.1,
            });
            return;
          }
        }
      }
    });
  });

  path += generateEyeFrameSVGFromConfig(config, matrix.length, true);
  path += generateEyeballSVGFromConfig(config, matrix.length, true);
  return path;
};
