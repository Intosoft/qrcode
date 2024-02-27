import { Config, ConfigParam, defaultConfig } from "./config";
import { circleEyeball, squareEyeball } from "./eyeball";
import { circleEyeFrame, roundedEyeFrame, squareEyeFrame } from "./eyeframes";
import { generatePath } from "./path";
import { generateMatrix } from "./utils";

const quietZone = 0;
const enableLinearGradient = true;
const gradientDirection = ["0%", "0%", "100%", "100%"];
const linearGradient = ["black", "black"];

const eyeFrameFunction: {
  [key in Exclude<
    keyof Config["eyeFrameShape"],
    "circle-item"
  > as string]: Function;
} = {
  square: squareEyeFrame,
  circle: circleEyeFrame,
  rounded: roundedEyeFrame,
};

const eyeballFunction: {
  [key in Exclude<
    keyof Config["eyeballShape"],
    "circle-item"
  > as string]: Function;
} = {
  square: squareEyeball,
  circle: circleEyeball,
};

export const generateSVGString = (paramConfig: ConfigParam = defaultConfig) => {
  //@ts-ignore
  const config: Config = {
    ...defaultConfig,
    ...paramConfig,
  };

  for (const [key, value] of Object.entries(config.colors)) {
    if (!value) {
      //@ts-ignore
      config.colors[key] = config.color || defaultConfig.color;
    }
  }

  const matrix = generateMatrix("https://intosoft.com", "L");

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
      <linearGradient id="grad" x1="${gradientDirection[0]}" y1="${
    gradientDirection[1]
  }" x2="${gradientDirection[2]}" y2="${gradientDirection[3]}">
        <stop offset="0" stop-color="${linearGradient[0]}" stop-opacity="1" />
        <stop offset="1" stop-color="${linearGradient[1]}" stop-opacity="1" />
      </linearGradient>
    </defs>
    <g>
      <rect x="${-quietZone}" y="${-quietZone}" width="${
    config.length + quietZone * 2
  }" height="${config.length + quietZone * 2}" fill="${
    config.backgroundColor
  }" />
    </g>
    <g fill="${enableLinearGradient ? "url(#grad)" : config.color}"  stroke="${
    enableLinearGradient ? "url(#grad)" : config.color
  }">
  <path d="${path}" 
     stroke-linecap="butt" 
     stroke-width="${0}" /> 
     ${
       config.eyeFrameShape !== "circle-item"
         ? `<path
      fill="none"
      d="${eyeFrameFunction[config.eyeFrameShape]({
        matrixLength: matrix.length,
        size: config.length,
      })}" 
      stroke-width="${config.length / matrix.length}"
      />`
         : ""
     }  

     ${
       config.eyeballShape !== "circle-item"
         ? `<path
     fill="${enableLinearGradient ? "url(#grad)" : config.color}"
     d="${eyeballFunction[config.eyeballShape]({
       matrixLength: matrix.length,
       size: config.length,
     })}" 
     stroke-width="0"
     />`
         : ""
     }  
    </g>
    
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
