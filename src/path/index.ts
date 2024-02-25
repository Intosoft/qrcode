import { getEyeBallPositions, getEyeFramePositions } from "./../utils";
import { generateCirclePath } from "./circle";
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
            path += generateCirclePath({ i, j, cellSize });
            return;
          }
        }

        for (let pos of eyeBallPositions) {
          if (pos[0] === i && pos[1] === j) {
            path += generateSquarePath({ path, i, j, cellSize });
            return;
          }
        }
        path += generateSquarePath({ path, i, j, cellSize });
      }
    });
  });

  return path;
};
