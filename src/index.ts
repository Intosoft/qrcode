import { generateContentString, WifiEncryption } from './generateContent';
import { Config, BodyShape, EyeFrameShape, EyeballShape } from './config';
import { generateSVGString } from './generateSVGString';

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
    window.custoqr = { generateSVGString, generateContentString };
}
