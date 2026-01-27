import { generateContentString } from './generateContent';
import { generateSVGString } from './generateSVGString';

export type {
    Config,
    ConfigInput,
    EyeFrameShape,
    EyeballShape,
    BodyShape,
    LogoConfig,
    ColorValue,
    GradientConfig,
    GradientStop,
} from './config';

export type { ReactNativeQRResult } from './generateSVGString';

export type {
    GenerateWifiParam,
    GenerateEmailParam,
    GenerateTelParam,
    GenerateLocationParam,
    GenerateSmsParam,
    GenerateVCardParam,
    GenerateEventParam,
    WifiEncryption,
} from './generateContent';

export { validateSVG, cleanSVGPath, validateColor, formatNumber } from './utils/svg';
export { isGradientColor, normalizeColorValue } from './utils/gradient';

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
