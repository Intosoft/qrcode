import { getEyeBallPositions, getEyeFramePositions } from "./../utils";
interface GeneratePathProps {
  cellSize: number;
  matrix: number[][];
}

export const generateSquarePath = ({ cellSize, matrix }: GeneratePathProps) => {
  const eyeBallPositions = getEyeBallPositions(matrix.length);
  const eyeFramePositions = getEyeFramePositions(matrix.length);
  let path = "";
  matrix.forEach((row, i) => {
    row.forEach((column, j) => {
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
      if (column) {
        const x = cellSize * j;
        const y = cellSize * i;

        path += `M${x},${y} `;

        path += `h${cellSize} v${cellSize} h-${cellSize} v-${cellSize} `;
      }
    });
  });

  return path;
};
