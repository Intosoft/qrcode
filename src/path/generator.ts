import { generateCirclePath, generateRoundedPath } from "./circle";

import {
  generateDiamondPath,
  generateSquarePath,
  generateStarPath,
} from "./square";
import { Config } from "../config";

interface GeneratorPathProps {
  config: Config;
  i: number;
  j: number;
  cellSize: number;
  neighbors: {
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
  };
  isXFirst: boolean;
  isXLast: boolean;
  isYFirst: boolean;
  isYLast: boolean;
}

export const pathGenerator = ({
  config,
  i,
  j,
  cellSize,
  neighbors,
  isXFirst,
  isXLast,
  isYFirst,
  isYLast,
}: GeneratorPathProps) => {
  let path = "";
  if (config.shapes.body === "square") {
    path += generateSquarePath({
      i,
      j,
      height: cellSize,
      width: cellSize,
      cellSize,
    });
  } else if (config.shapes.body === "square-small") {
    path += generateSquarePath({
      i,
      j,
      height: cellSize - cellSize * 0.1,
      width: cellSize - cellSize * 0.1,
      cellSize: cellSize,
    });
  } else if (config.shapes.body === "square-vertical") {
    path += generateSquarePath({
      i,
      j,
      height: cellSize - cellSize * 0.1,
      cellSize,
    });
  } else if (config.shapes.body === "square-horizontal") {
    path += generateSquarePath({
      i,
      j,
      width: cellSize - cellSize * 0.1,
      cellSize,
    });
  } else if (config.shapes.body === "diamond") {
    path += generateDiamondPath({
      i,
      j,
      height: cellSize,
      width: cellSize,
      cellSize,
    });
  } else if (config.shapes.body === "star") {
    path += generateStarPath({
      i,
      j,
      height: cellSize,
      width: cellSize,
      cellSize,
    });
  } else if (config.shapes.body === "star-small") {
    path += generateStarPath({
      i,
      j,
      height: cellSize,
      width: cellSize,
      cellSize,
      points: 4,
    });
  } else if (config.shapes.body === "circle") {
    path += generateCirclePath({ i, j, cellSize });
  } else if (config.shapes.body === "circle-small") {
    path += generateCirclePath({
      i,
      j,
      cellSize,
      diameter: cellSize - cellSize * 0.1,
    });
  } else if (config.shapes.body === "rounded-horizontal") {
    if (!neighbors.left && !neighbors.right) {
      path += generateCirclePath({
        i,
        j,
        cellSize,
        diameter: cellSize - cellSize * 0.1,
      });
      return path;
    }

    if (neighbors.left && neighbors.right) {
      path += generateSquarePath({
        i,
        j,
        cellSize,
        height: cellSize - cellSize * 0.1,
        width: cellSize,
      });
      return path;
    }

    if (!neighbors.left || (neighbors.right && isXFirst)) {
      path += generateRoundedPath({
        i,
        j,
        cellSize,
        roundedSide: "left",
        height: cellSize - cellSize * 0.1,
      });
      return path;
    }

    if (!neighbors.right || (neighbors.left && isYLast)) {
      path += generateRoundedPath({
        i,
        j,
        cellSize,
        roundedSide: "right",
        height: cellSize - cellSize * 0.1,
      });
      return path;
    }
  } else if (config.shapes.body === "rounded-vertical") {
    if (!neighbors.top && !neighbors.bottom) {
      path += generateCirclePath({
        i,
        j,
        cellSize,
        diameter: cellSize - cellSize * 0.1,
      });
      return path;
    }

    if (neighbors.top && neighbors.bottom) {
      path += generateSquarePath({
        i,
        j,
        cellSize,
        width: cellSize - cellSize * 0.1,
      });
      return path;
    }

    if (!neighbors.top || (neighbors.bottom && isXFirst)) {
      path += generateRoundedPath({
        i,
        j,
        cellSize,
        roundedSide: "top",
        width: cellSize - cellSize * 0.1,
      });
      return path;
    }

    if (!neighbors.bottom || (neighbors.top && isXLast)) {
      path += generateRoundedPath({
        i,
        j,
        cellSize,
        roundedSide: "bottom",
        width: cellSize - cellSize * 0.1,
      });
      return path;
    }
  }

  return path;
};
