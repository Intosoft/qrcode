import { circleEyeFrame, squareEyeFrame } from "./eyeframes";
import { generatePath } from "./path";
import { generateMatrix } from "./utils";
import fs from "fs";

const size = 500;
const color = "red";
const backgroundColor = "white";

const quietZone = 0;
const enableLinearGradient = true;
const gradientDirection = ["0%", "0%", "100%", "100%"];
const linearGradient = ["rgb(255,0,0)", "rgb(0,255,255)"];

export const generateSVGFromMatrix = () => {
  const matrix = generateMatrix("https://intosoft.com", "L");

  const path = generatePath({ matrix, size });

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
    <g fill="${enableLinearGradient ? "url(#grad)" : color}"  stroke="${
    enableLinearGradient ? "url(#grad)" : color
  }">
      <path d="${path}" 
      stroke-linecap="butt" 
      stroke-width="${0}" /> 
      <path
      fill="none"
      d="${circleEyeFrame({
        matrixLength: matrix.length,
        size,
      })}" 
      stroke-width="${size / matrix.length}"
       
      />     
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
