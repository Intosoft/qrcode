import { generateMatrix } from "./utils";
import fs from "fs";
const value = "this is a QR code";
const size = 100;
const color = "black";
const backgroundColor = "white";

const logoSize = size * 0.2;
const logoBackgroundColor = "transparent";
const logoMargin = 2;
const logoBorderRadius = 0;
const quietZone = 0;
const enableLinearGradient = false;
const gradientDirection = ["0%", "0%", "100%", "100%"];
const linearGradient = ["rgb(255,0,0)", "rgb(0,255,255)"];
const ecl = "M";

export const generateSVGFromMatrix = () => {
  const matrix = generateMatrix("https://intosoft.com", "L");
  const cellSize = size / matrix.length;
  let path = "";
  matrix.forEach((row, i) => {
    let needDraw = false;
    row.forEach((column, j) => {
      if (column) {
        if (!needDraw) {
          path += `M${cellSize * j} ${cellSize / 2 + cellSize * i} `;
          needDraw = true;
        }
        if (needDraw && j === matrix.length - 1) {
          path += `L${cellSize * (j + 1)} ${cellSize / 2 + cellSize * i} `;
        }
      } else {
        if (needDraw) {
          path += `L${cellSize * j} ${cellSize / 2 + cellSize * i} `;
          needDraw = false;
        }
      }
    });
  });

  const svg = `<svg viewBox="${[
    -quietZone,
    -quietZone,
    size + quietZone * 2,
    size + quietZone * 2,
  ].join(
    " "
  )}" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="${gradientDirection[0]}" y1="${
    gradientDirection[1]
  }" x2="${gradientDirection[2]}" y2="${gradientDirection[3]}">
        <stop offset="0" stop-color="${linearGradient[0]}" stop-opacity="1" />
        <stop offset="1" stop-color="${linearGradient[1]}" stop-opacity="1" />
      </linearGradient>
    </defs>
    <g>
      <rect x="${-quietZone}" y="${-quietZone}" width="${
    size + quietZone * 2
  }" height="${size + quietZone * 2}" fill="${backgroundColor}" />
    </g>
    <g>
      <path d="${path}" stroke-linecap="butt" stroke="${
    enableLinearGradient ? "url(#grad)" : color
  }" stroke-width="${cellSize}" />
    </g>
  </svg>`;

  return svg;
};

function main() {
  const svg = generateSVGFromMatrix();
  fs.writeFile("./test-svg.svg", svg, (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return;
    }
    console.log("SVG file has been written!");
  });
}

main();
