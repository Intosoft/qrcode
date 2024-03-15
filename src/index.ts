import { generateContentString } from './generateContent';

import { generateSVGString } from './generateSVGString';

export { generateContentString, generateSVGString };

export default {
    generateSVGString,
    generateContentString,
};

// eslint-disable-next-line no-undef
if (window) {
    // @ts-ignore
    // eslint-disable-next-line no-undef
    window.custoqr = { generateSVGString, generateContentString };
}
