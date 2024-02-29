import { getEyeBallPositions, getEyeFramePositions } from "./../utils";
import { generateCirclePath } from "./circle";

import { generateSquarePath } from "./square";
import { Config } from "../config";
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
          path += generateSquarePath({ i, j, cellSize });
        } else if (config.shapes.body === "circle") {
          path += generateCirclePath({ i, j, cellSize });
        }
      }
    });
  });

  return path;
};
