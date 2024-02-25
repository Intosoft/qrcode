interface GenerateItemPathProps {
  i: number;
  j: number;
  cellSize: number;
}

export const generateSquarePath = ({
  i,
  j,
  cellSize,
}: GenerateItemPathProps) => {
  let path = "";
  const x = cellSize * j;
  const y = cellSize * i;

  path += `M${x},${y} `;

  path += `h${cellSize} v${cellSize} h-${cellSize} v-${cellSize} `;
  return path;
};
