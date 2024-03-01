import {
  generateLinearGradientByConfig,
  isGradientColor,
} from "./utils/gradient";
import { Config, EyeFrameShape, EyeballShape } from "./config";
import {
  circleEyeball,
  generateEyeballSVGFromConfig,
  squareEyeball,
} from "./eyeball";
import {
  circleEyeFrame,
  generateEyeFrameSVGFromConfig,
  roundedEyeFrame,
  squareEyeFrame,
} from "./eyeframes";
import { generatePath } from "./path";
import { generateMatrix, renderLogoFromConfig } from "./utils";

const quietZone = 0;

const eyeFrameFunction: {
  [key in Exclude<EyeFrameShape, "circle-item">]: Function;
} = {
  square: squareEyeFrame,
  circle: circleEyeFrame,
  rounded: roundedEyeFrame,
};

const eyeballFunction: {
  [key in Exclude<EyeballShape, "circle-item">]: Function;
} = {
  square: squareEyeball,
  circle: circleEyeball,
};

export const generateSVGString = (config: Config) => {
  const matrix = generateMatrix(config.value || "https://intosoft.com", "L");

  const path = generatePath({ matrix, size: config.length, config });

  const svg = `<svg viewBox="${[
    -quietZone,
    -quietZone,
    config.length + quietZone * 2,
    config.length + quietZone * 2,
  ].join(" ")}" width="${config.length}" height="${
    config.length
  }" xmlns="http://www.w3.org/2000/svg">
    <defs>
    ${generateLinearGradientByConfig(config)}
    </defs>
<g>
<rect x="${-quietZone}" y="${-quietZone}" width="${
    config.length + quietZone * 2
  }" height="${config.length + quietZone * 2}" fill="${
    config.colors.background
  }" />
  </g>
  ${renderLogoFromConfig(config)}
  <path d="${path}" 
     stroke-linecap="butt" 
     stroke-width="${0}"  fill="${
    isGradientColor(config.colors.body) ? "url(#body)" : config.colors.body
  }"  stroke="${
    isGradientColor(config.colors.body) ? "url(#body)" : config.colors.body
  }" /> 
  ${generateEyeFrameSVGFromConfig(config, matrix.length)}      
   ${generateEyeballSVGFromConfig(config, matrix.length)} 
    
   <use xlink:href="#logo"/>
  </svg>`;

  return svg;
};

export default {
  generateSVGString,
};

if (window) {
  //@ts-ignore
  window.IntosoftQRCode = { generateSVGString: generateSVGString };
}
