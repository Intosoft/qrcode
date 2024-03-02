import { getEyeBallPositions, getEyeFramePositions } from "./../utils";
import { generateCirclePath, generateRoundedPath } from "./circle";

import { generateSquarePath } from "./square";
import { Config } from "../config";
import { checkNeighbors } from "../utils/path";
interface GeneratePathProps {
  size: number;
  matrix: number[][];
  config: Config;
}

export const generatePath = ({ size, matrix, config }: GeneratePathProps) => {
  const cellSize = size / matrix.length;
  const eyeBallPositions = getEyeBallPositions(matrix.length);
  const eyeFramePositions = getEyeFramePositions(matrix.length);
  let path = "";

  matrix.forEach((row, i) => {
    row.forEach((column, j) => {
      if (column) {
        for (let pos of eyeFramePositions) {
          if (pos[0] === i && pos[1] === j) {
            if (config.shapes.eyeFrame === "circle-item") {
              path += generateCirclePath({ i, j, cellSize });
            }
            return;
          }
        }

        for (let pos of eyeBallPositions) {
          if (pos[0] === i && pos[1] === j) {
            if (config.shapes.eyeball === "circle-item") {
              path += generateCirclePath({ i, j, cellSize });
            }
            return;
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
        } else if (config.shapes.body === "circle") {
          path += generateCirclePath({ i, j, cellSize });
        } else if (config.shapes.body === "rounded-horizontal") {
          const neighbors = checkNeighbors({ matrix, i, j });

          const isXLast = j == matrix.length - 1;
          const isXFirst = j == 0;

          const isYLast = i == matrix.length - 1;
          const isYFirst = i == 0;

          if (!neighbors.left && !neighbors.right) {
            path += generateCirclePath({
              i,
              j,
              cellSize,
              diameter: cellSize - 1,
            });
            return;
          }

          if (neighbors.left && neighbors.right) {
            path += generateSquarePath({
              i,
              j,
              cellSize,
              height: cellSize - 1,
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
              height: cellSize - 1,
            });
            return;
          }

          if (!neighbors.right || (neighbors.left && isYLast)) {
            path += generateRoundedPath({
              i,
              j,
              cellSize,
              roundedSide: "right",
              height: cellSize - 1,
            });
            return;
          }
        }
      }
    });
  });

  return path;
};
