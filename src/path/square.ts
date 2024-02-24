export const generateSquarePath = (cellSize: number, matrix: number[][]) => {
  let path = "";
  matrix.forEach((row, i) => {
    row.forEach((column, j) => {
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
