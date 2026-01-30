import { QRCodeErrorCorrectionLevel } from 'qrcode';

type WifiEncryption = 'nopass' | 'WEP' | 'WPA' | 'WPA2';
interface GenerateWifiParam {
    ssid: string;
    password?: string;
    encryption?: WifiEncryption;
    hidden?: boolean;
}
interface GenerateEmailParam {
    email: string;
    subject?: string;
    body?: string;
    cc?: string;
    bcc?: string;
}
type GenerateTelParam = string | number;
interface GenerateLocationParam {
    latitude: number;
    longitude: number;
    label?: string;
    zoom?: number;
}
interface GenerateSmsParam {
    phone: string | number;
    message?: string;
}
interface GenerateVCardParam {
    firstName: string;
    lastName?: string;
    organization?: string;
    title?: string;
    email?: string;
    phone?: string;
    mobile?: string;
    fax?: string;
    address?: {
        street?: string;
        city?: string;
        state?: string;
        zip?: string;
        country?: string;
    };
    website?: string;
    note?: string;
}
interface GenerateEventParam {
    title: string;
    start: Date;
    end?: Date;
    location?: string;
    description?: string;
    allDay?: boolean;
}
type GenerateContentType = 'wifi' | 'email' | 'tel' | 'location' | 'sms' | 'vcard' | 'event';
declare const generateContentString: <T extends GenerateContentType, Param extends T extends "wifi" ? GenerateWifiParam : T extends "email" ? GenerateEmailParam : T extends "tel" ? GenerateTelParam : T extends "location" ? GenerateLocationParam : T extends "sms" ? GenerateSmsParam : T extends "vcard" ? GenerateVCardParam : T extends "event" ? GenerateEventParam : never>(type: T, param: Param) => string;

interface GradientStop {
    color: string;
    offset: number;
}
interface GradientConfig {
    type: 'linear' | 'radial';
    angle?: number;
    stops: GradientStop[];
}
type ColorValue = string | GradientConfig;
type EyeFrameShape = 'body' | 'square' | 'circle' | 'rounded' | 'leaf' | 'pointed' | 'body-square' | 'body-square-small' | 'body-square-horizontal' | 'body-square-vertical' | 'body-circle' | 'body-rounded-horizontal' | 'body-rounded-vertical' | 'body-diamond' | 'body-star' | 'body-star-small' | 'body-circle-small';
type EyeballShape = 'body' | 'square' | 'circle' | 'rounded' | 'leaf' | 'pointed' | 'extra-rounded' | 'body-square' | 'body-square-small' | 'body-square-horizontal' | 'body-square-vertical' | 'body-circle' | 'body-rounded-horizontal' | 'body-rounded-vertical' | 'body-diamond' | 'body-star' | 'body-star-small' | 'body-circle-small';
type BodyShape = 'square' | 'square-small' | 'square-horizontal' | 'square-vertical' | 'circle' | 'rounded-horizontal' | 'rounded-vertical' | 'diamond' | 'star' | 'star-small' | 'circle-small' | 'dots' | 'classy' | 'mosaic' | 'fluid' | 'edge-cut' | 'japanese' | 'hexagon' | 'wave' | 'leaf' | 'petal' | 'octagon' | 'cross' | 'pill' | 'crystal' | 'bubble' | 'tribal' | 'zigzag' | 'spiral' | 'neon' | 'tech';
interface LogoConfig {
    url: string;
    size: number;
    removeBackground: boolean;
    padding?: number;
    opacity?: number;
    borderRadius?: number;
    excavate?: boolean;
}
interface Config {
    length: number;
    padding: number;
    errorCorrectionLevel: QRCodeErrorCorrectionLevel;
    value: string;
    logo?: LogoConfig;
    shapes: {
        eyeFrame: EyeFrameShape;
        body: BodyShape;
        eyeball: EyeballShape;
    };
    colors: {
        background: ColorValue;
        body: ColorValue;
        eyeFrame: {
            topLeft: ColorValue;
            topRight: ColorValue;
            bottomLeft: ColorValue;
        };
        eyeball: {
            topLeft: ColorValue;
            topRight: ColorValue;
            bottomLeft: ColorValue;
        };
    };
}
interface ConfigInput {
    length?: number;
    padding?: number;
    errorCorrectionLevel?: QRCodeErrorCorrectionLevel;
    value: string;
    logo?: {
        url: string;
        size?: number;
        removeBackground?: boolean;
        padding?: number;
        opacity?: number;
        borderRadius?: number;
        excavate?: boolean;
    };
    shapes?: {
        eyeFrame?: EyeFrameShape;
        body?: BodyShape;
        eyeball?: EyeballShape;
    };
    colors?: {
        background?: ColorValue;
        body?: ColorValue;
        eyeFrame?: {
            topLeft?: ColorValue;
            topRight?: ColorValue;
            bottomLeft?: ColorValue;
        };
        eyeball?: {
            topLeft?: ColorValue;
            topRight?: ColorValue;
            bottomLeft?: ColorValue;
        };
    };
}
declare const BODY_SHAPES: readonly BodyShape[];
declare const EYEFRAME_SHAPES: readonly EyeFrameShape[];
declare const EYEBALL_SHAPES: readonly EyeballShape[];

interface ReactNativeQRResult {
    svgString: string;
    cellSize: number;
}
interface InternalOptions {
    forReactNative?: boolean;
}
declare function generateSVGString(configInput: ConfigInput, options?: InternalOptions): string;
declare function generateSVGString(configInput: ConfigInput, options: InternalOptions & {
    forReactNative: true;
}): ReactNativeQRResult;

declare function cleanSVGPath(path: string): string;
declare function validateColor(color: string): string;
declare function formatNumber(num: number, precision?: number): string;
declare function validateSVG(svg: string): {
    valid: boolean;
    errors: string[];
};

declare const isGradientColor: (color: ColorValue) => boolean;
declare const normalizeColorValue: (color: ColorValue) => string;

/**
 * Generate a body shape preview showing a grid pattern like in real QR code
 * @param shape - The body shape to preview
 * @param size - Size of the preview (default: 64)
 * @returns Complete SVG string with grid pattern
 */
declare function generateBodyShapePreview(shape: BodyShape, size?: number): string;
/**
 * Generate eye frame shape preview showing the frame in context of QR eye
 * @param shape - The eye frame shape
 * @param size - Size of the preview (default: 64)
 * @returns Complete SVG string with eye frame pattern
 */
declare function generateEyeFrameShapePreview(shape: EyeFrameShape, size?: number): string;
/**
 * Generate eyeball shape preview showing the eyeball in context of QR eye
 * @param shape - The eyeball shape
 * @param size - Size of the preview (default: 64)
 * @returns Complete SVG string with eyeball pattern
 */
declare function generateEyeballShapePreview(shape: EyeballShape, size?: number): string;
/**
 * Generate a complete SVG element for shape preview
 * @param shape - The shape to preview
 * @param type - Type of shape (body, eyeFrame, or eyeball)
 * @param size - Size of the SVG (default: 24)
 * @param color - Fill color (default: 'white')
 * @returns Complete SVG string
 */
declare function generateShapePreviewSVG(shape: BodyShape | EyeFrameShape | EyeballShape, type: 'body' | 'eyeFrame' | 'eyeball', size?: number, color?: string): string;

declare const _default: {
    generateSVGString: typeof generateSVGString;
    generateContentString: <T extends "wifi" | "email" | "tel" | "location" | "sms" | "vcard" | "event", Param extends T extends "wifi" ? GenerateWifiParam : T extends "email" ? GenerateEmailParam : T extends "tel" ? GenerateTelParam : T extends "location" ? GenerateLocationParam : T extends "sms" ? GenerateSmsParam : T extends "vcard" ? GenerateVCardParam : T extends "event" ? GenerateEventParam : never>(type: T, param: Param) => string;
};

export { BODY_SHAPES, type BodyShape, type ColorValue, type Config, type ConfigInput, EYEBALL_SHAPES, EYEFRAME_SHAPES, type EyeFrameShape, type EyeballShape, type GenerateEmailParam, type GenerateEventParam, type GenerateLocationParam, type GenerateSmsParam, type GenerateTelParam, type GenerateVCardParam, type GenerateWifiParam, type GradientConfig, type GradientStop, type LogoConfig, type ReactNativeQRResult, type WifiEncryption, cleanSVGPath, _default as default, formatNumber, generateBodyShapePreview, generateContentString, generateEyeFrameShapePreview, generateEyeballShapePreview, generateSVGString, generateShapePreviewSVG, isGradientColor, normalizeColorValue, validateColor, validateSVG };
