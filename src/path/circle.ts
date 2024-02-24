export const generateCirclePath = (cellSize: number, matrix: number[][]) => {
  let path = "";
  matrix.forEach((row, i) => {
    row.forEach((column, j) => {
      if (column) {
        const centerX = cellSize * j + cellSize / 2;
        const centerY = cellSize * i + cellSize / 2;
        path += `
          M${centerX},${centerY - cellSize / 2}
          A${cellSize / 2},${cellSize / 2} 0 1,1 ${centerX},${
          centerY + cellSize / 2
        }
          A${cellSize / 2},${cellSize / 2} 0 1,1 ${centerX},${
          centerY - cellSize / 2
        }`;
      }
    });
  });

  return path;
};
