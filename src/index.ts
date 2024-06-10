import { generateContentString } from './generateContent';

import { generateSVGString } from './generateSVGString';

export { generateContentString, generateSVGString };

export default {
    generateSVGString,
    generateContentString,
};

// eslint-disable-next-line no-undef
if (typeof window !== 'undefined') {
    // @ts-ignore
    // eslint-disable-next-line no-undef
    window.qrcode = { generateSVGString, generateContentString };
}
