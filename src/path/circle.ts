interface GenerateItemPathProps {
  i: number;
  j: number;
  cellSize: number;
}

export const generateCirclePath = ({
  i,
  j,
  cellSize,
}: GenerateItemPathProps) => {
  let path = "";
  const x = cellSize * j;
  const y = cellSize * i;

  const cx = x + cellSize / 2;
  const cy = y + cellSize / 2;
  // Draw the circle
  path += `M${cx},${cy} `;
  path += `m-${cellSize / 2},0 `;
  path += `a${cellSize / 2},${cellSize / 2} 0 1,0 ${cellSize},0 `;
  path += `a${cellSize / 2},${cellSize / 2} 0 1,0 -${cellSize},0 `;

  return path;
};
