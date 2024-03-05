import {
  getEyeBallPositions,
  getEyeFramePositions,
  getLogoPathPositions,
} from "./../utils";

import { Config } from "../config";
import { checkNeighbors } from "../utils/path";
import { generateEyeFrameSVGFromConfig } from "../eyeframes";
import { generateEyeballSVGFromConfig } from "../eyeball";
import { pathGenerator } from "./generator";
interface GeneratePathProps {
  size: number;
  matrix: number[][];
  config: Config;
  eyeballOnly?: boolean;
  eyeFrameOnly?: boolean;
}

export const generatePath = ({
  size,
  matrix,
  config,
  eyeFrameOnly,
  eyeballOnly,
}: GeneratePathProps) => {
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
            if (eyeFrameOnly) {
              path += pathGenerator({
                config,
                i,
                j,
                isXFirst,
                isXLast,
                isYFirst,
                isYLast,
                neighbors,
                cellSize,
              });
            }
            if (config.shapes.eyeFrame !== "body") {
              return;
            }
          }
        }

        for (let pos of eyeBallPositions) {
          if (pos[0] === i && pos[1] === j) {
            // if (
            //   config.shapes.eyeball.includes("body-") &&
            //   config.colors.eyeball.bottomLeft === "body"
            // ) {
            //   path += pathGenerator({
            //     config: {
            //       ...config,
            //       shapes: {
            //         ...config.shapes,
            //         //@ts-ignore
            //         body: config.shapes.eyeball.replace("body-", ""),
            //       },
            //     },
            //     i,
            //     j,
            //     isXFirst,
            //     isXLast,
            //     isYFirst,
            //     isYLast,
            //     neighbors,
            //     cellSize,
            //   });
            //   return;
            // }

            if (eyeballOnly) {
              path += pathGenerator({
                config,
                i,
                j,
                isXFirst,
                isXLast,
                isYFirst,
                isYLast,
                neighbors,
                cellSize,
              });
            }
            if (config.shapes.eyeball !== "body") {
              return;
            }
          }
        }

        if (eyeballOnly || eyeFrameOnly) {
          return;
        }

        path += pathGenerator({
          config,
          i,
          j,
          isXFirst,
          isXLast,
          isYFirst,
          isYLast,
          neighbors,
          cellSize,
        });
      }
    });
  });
  if (!eyeballOnly && !eyeFrameOnly) {
    path += generateEyeFrameSVGFromConfig(config, matrix.length, matrix, true);
    path += generateEyeballSVGFromConfig(config, matrix.length, matrix, true);
  }

  return path;
};
