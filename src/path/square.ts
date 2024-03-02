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

export const generateDiamondPath = ({
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

  const midX = x + width / 2;
  const midY = y + height / 2;

  path += `M${midX},${y}`;
  path += `L${x + width},${midY} `;
  path += `L${midX},${y + height} `;
  path += `L${x},${midY} `;
  path += `L${midX},${y} `;

  return path;
};

export const generateStarPath = ({
  i,
  j,
  width: _width,
  height: _height,
  cellSize,
}: GenerateItemPathProps) => {
  const height = _height || cellSize;
  const width = _width || cellSize;
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const cx = cellSize * j + halfWidth;
  const cy = cellSize * i + halfHeight;
  const outerRadius = Math.min(halfWidth, halfHeight);
  const innerRadius = outerRadius / 2;
  const numPoints = 5;

  let path = "";

  for (let i = 0; i < numPoints; i++) {
    const outerX =
      cx + outerRadius * Math.cos((Math.PI * 2 * i) / numPoints - Math.PI / 2);
    const outerY =
      cy + outerRadius * Math.sin((Math.PI * 2 * i) / numPoints - Math.PI / 2);
    const innerX =
      cx +
      innerRadius *
        Math.cos((Math.PI * 2 * (i + 0.5)) / numPoints - Math.PI / 2);
    const innerY =
      cy +
      innerRadius *
        Math.sin((Math.PI * 2 * (i + 0.5)) / numPoints - Math.PI / 2);

    if (i === 0) {
      path += `M${outerX},${outerY} `;
    } else {
      path += `L${outerX},${outerY} `;
    }
    path += `${innerX},${innerY} `;
  }

  path += "Z";

  return path;
};
