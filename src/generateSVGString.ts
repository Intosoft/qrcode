import { generateGradientByConfig, isGradientColor } from './utils/gradient';
import { Config } from './config';
import { generateEyeballSVGFromConfig } from './eyeball';
import { generateEyeFrameSVGFromConfig } from './eyeframes';
import { generatePath } from './path';
import { generateMatrix, renderLogoFromConfig, isTransparent } from './utils';

export const generateSVGString = (config: Config) => {
    const matrix = generateMatrix(
        config.value || 'https://intosoft.com',
        config.errorCorrectionLevel || 'H',
    );

    const cellSize = config.length / matrix.length;
    const path = generatePath({ matrix, size: config.length, config });

    const svg = `<svg viewBox="${[
        -config.padding,
        -config.padding,
        config.length + config.padding * 2,
        config.length + config.padding * 2,
    ].join(' ')}" width="${config.length}" height="${
        config.length
    }" xmlns="http://www.w3.org/2000/svg">
    <defs>
    ${generateGradientByConfig(config)}
    ${renderLogoFromConfig(config, cellSize)}
    </defs>
 
<rect x="${-config.padding}" y="${-config.padding}" width="${
        config.length + config.padding * 2
    }" height="${config.length + config.padding * 2}" fill="${
        isTransparent(config.colors.background) ? 'none' : config.colors.background
    }" />

 
 
  <path d="${path}" 
     stroke-linecap="butt" 
     stroke-width="${0}"  fill="${
         isGradientColor(config.colors.body) ? 'url(#body)' : config.colors.body
     }"  stroke="${isGradientColor(config.colors.body) ? 'url(#body)' : config.colors.body}" /> 
  ${generateEyeFrameSVGFromConfig(config, matrix.length, matrix)}      
  ${generateEyeballSVGFromConfig(config, matrix.length, matrix)} 

  <use href="#logo"/>
  </svg>`;

    if (config.isReactNative) {
        return {
            svgString: svg,
            cellSize,
        };
    }

    return svg;
};
