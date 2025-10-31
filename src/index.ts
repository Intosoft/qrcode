import { generateContentString } from './generateContent';
import { generateSVGString } from './generateSVGString';

export type {
    Config,
    ConfigInput,
    EyeFrameShape,
    EyeballShape,
    BodyShape,
    LogoConfig,
} from './config';
export type { ReactNativeQRResult } from './generateSVGString';

export { validateSVG, cleanSVGPath, validateColor, formatNumber } from './utils/svg';

export { generateContentString, generateSVGString };

export default {
    generateSVGString,
    generateContentString,
};

if (typeof window !== 'undefined') {
    (window as unknown as Record<string, unknown>).qrcode = {
        generateSVGString,
        generateContentString,
    };
}
