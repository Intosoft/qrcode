interface GenerateItemPathProps {
  i: number;
  j: number;
  cellSize: number;
  height?: number;
  width?: number;
}

export const generateCirclePath = ({
  i,
  j,
  cellSize,
  diameter: _diameter,
}: GenerateItemPathProps & { diameter?: number }) => {
  let path = "";
  const diameter = _diameter || cellSize;
  const x = cellSize * j;
  const y = cellSize * i;

  const cx = x + cellSize / 2;
  const cy = y + cellSize / 2;
  // Draw the circle
  path += `M${cx},${cy} `;
  path += `m-${diameter / 2},0 `;
  path += `a${diameter / 2},${diameter / 2} 0 1,0 ${diameter},0 `;
  path += `a${diameter / 2},${diameter / 2} 0 1,0 -${diameter},0 `;

  return path;
};

export const generateRoundedPath = ({
  i,
  j,
  width: _width,
  height: _height,
  cellSize,
  roundedSide,
}: GenerateItemPathProps & {
  roundedSide: "top" | "left" | "right" | "bottom";
}) => {
  const height = _height || cellSize;
  const width = _width || cellSize;
  let path = "";

  const x = cellSize * j + (cellSize - width) / 2;
  const y = cellSize * i + (cellSize - height) / 2;

  const radius = Math.min(width, height) / 2;

  let borderRadiusTopLeft = 0;
  let borderRadiusTopRight = 0;
  let borderRadiusBottomLeft = 0;
  let borderRadiusBottomRight = 0;

  switch (roundedSide) {
    case "top": {
      borderRadiusTopLeft = radius;
      borderRadiusTopRight = radius;
      break;
    }
    case "right": {
      borderRadiusTopRight = radius;
      borderRadiusBottomRight = radius;
      break;
    }
    case "bottom": {
      borderRadiusBottomLeft = radius;
      borderRadiusBottomRight = radius;
      break;
    }
    case "left": {
      borderRadiusTopLeft = radius;
      borderRadiusBottomLeft = radius;
      break;
    }
  }

  path += `M${x},${y + borderRadiusTopLeft}
  A${borderRadiusTopLeft},${borderRadiusTopLeft},0,0,1,${
    x + borderRadiusTopLeft
  },${y}
  H${x + width - borderRadiusTopRight}
  A${borderRadiusTopRight},${borderRadiusTopRight},0,0,1,${x + width},${
    y + borderRadiusTopRight
  }
  V${y + height - borderRadiusBottomRight}
  A${borderRadiusBottomRight},${borderRadiusBottomRight},0,0,1,${
    x + width - borderRadiusBottomRight
  },${y + height}
  H${x + borderRadiusBottomLeft}
  A${borderRadiusBottomLeft},${borderRadiusBottomLeft},0,0,1,${x},${
    y + height - borderRadiusBottomLeft
  }
  V${y + borderRadiusTopLeft}Z`;

  return path;
};
