interface CheckNeighborsParams {
  matrix: number[][];
  i: number;
  j: number;
}

export const checkNeighbors = ({ matrix, i, j }: CheckNeighborsParams) => {
  const numRows = matrix.length;
  const numCols = matrix[0].length;
  const neighbors = {
    top: false,
    bottom: false,
    left: false,
    right: false,
  };

  if (matrix[i][j] === 1) {
    if (i > 0 && matrix[i - 1][j] === 1) {
      neighbors.top = true;
    }

    if (i < numRows - 1 && matrix[i + 1][j] === 1) {
      neighbors.bottom = true;
    }

    if (j > 0 && matrix[i][j - 1] === 1) {
      neighbors.left = true;
    }

    if (j < numCols - 1 && matrix[i][j + 1] === 1) {
      neighbors.right = true;
    }
  }

  return neighbors;
};
