interface GenerateItemPathProps {
  i: number;
  j: number;
  cellSize: number;
  height?: number;
  width?: number;
}

export const generateSquarePath = ({
  i,
  j,
  width: _width,
  height: _height,
  cellSize,
}: GenerateItemPathProps) => {
  const height = _height || cellSize;
  const width = _width || cellSize;
  let path = "";

  const x = cellSize * j + (cellSize - width) / 2;
  const y = cellSize * i + (cellSize - height) / 2;

  path += `M${x},${y}`;
  path += `h${width} v${height} h-${width} v-${height} `;

  return path;
};
