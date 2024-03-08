import { generateContentString, WifiEncryption } from './generateContent';
import { generateLinearGradientByConfig, isGradientColor } from './utils/gradient';
import { Config, BodyShape, EyeFrameShape, EyeballShape } from './config';
import { generateEyeballSVGFromConfig } from './eyeball';
import { generateEyeFrameSVGFromConfig } from './eyeframes';
import { generatePath } from './path';
import { generateMatrix, renderLogoFromConfig } from './utils';

const quietZone = 0;

function isTransparent(color: string) {
    if (color.startsWith('#')) {
        return color === '#00000000' || color === '#0000';
    }
    if (color.startsWith('rgba')) {
        const rgbaValues = color.slice(5, -1).split(',');
        const alpha = parseFloat(rgbaValues[3]);
        return alpha === 0;
    }
    if (color.startsWith('rgb')) {
        return color === 'rgba(0,0,0,0)' || color === 'rgba(0, 0, 0, 0)';
    }
    return false; // Not transparent
}

const generateSVGString = (config: Config) => {
    const matrix = generateMatrix(config.value || 'https://intosoft.com', 'H');

    const path = generatePath({ matrix, size: config.length, config });

    const svg = `<svg viewBox="${[
        -quietZone,
        -quietZone,
        config.length + quietZone * 2,
        config.length + quietZone * 2,
    ].join(' ')}" width="${config.length}" height="${
        config.length
    }" xmlns="http://www.w3.org/2000/svg">
    <defs>
    ${generateLinearGradientByConfig(config)}
    </defs>
<g>
<rect x="${-quietZone}" y="${-quietZone}" width="${
        config.length + quietZone * 2
    }" height="${config.length + quietZone * 2}" fill="${
        isTransparent(config.colors.background) ? 'none' : config.colors.background
    }" />
  </g>
  ${renderLogoFromConfig(config, config.length / matrix.length)}
  <path d="${path}" 
     stroke-linecap="butt" 
     stroke-width="${0}"  fill="${
         isGradientColor(config.colors.body) ? 'url(#body)' : config.colors.body
     }"  stroke="${isGradientColor(config.colors.body) ? 'url(#body)' : config.colors.body}" /> 
  ${generateEyeFrameSVGFromConfig(config, matrix.length, matrix)}      
  ${generateEyeballSVGFromConfig(config, matrix.length, matrix)} 
    
   <use href="#logo"/>
  </svg>`;

    return svg;
};
export { generateContentString, generateSVGString };

export type { Config, WifiEncryption, BodyShape, EyeFrameShape, EyeballShape };

export default {
    generateSVGString,
    generateContentString,
};

// eslint-disable-next-line no-undef
if (window) {
    // @ts-ignore
    // eslint-disable-next-line no-undef
    window.CustoQR = { generateSVGString, generateContentString };
}
