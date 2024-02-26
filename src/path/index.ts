import { squareEyeFramePath } from "../eyeframes";
import { getEyeBallPositions, getEyeFramePositions } from "./../utils";
import { generateCirclePath } from "./circle";
import { circleEyeball, squareEyeball } from "../eyeball";
import { generateSquarePath } from "./square";
interface GeneratePathProps {
  size: number;
  matrix: number[][];
}

export const generatePath = ({ size, matrix }: GeneratePathProps) => {
  const cellSize = size / matrix.length;
  const eyeBallPositions = getEyeBallPositions(matrix.length);
  const eyeFramePositions = getEyeFramePositions(matrix.length);
  let path = "";

  matrix.forEach((row, i) => {
    row.forEach((column, j) => {
      if (column) {
        for (let pos of eyeFramePositions) {
          if (pos[0] === i && pos[1] === j) {
            return;
          }
        }

        for (let pos of eyeBallPositions) {
          if (pos[0] === i && pos[1] === j) {
            return;
          }
        }
        path += generateSquarePath({ i, j, cellSize });
      }
    });
  });
  const matrixLength = matrix.length;

  path += squareEyeball({ matrixLength, size });
  // path += circleEyeball({ matrixLength, size });

  return path;
};
