import { QRCodeErrorCorrectionLevel } from 'qrcode';

export type EyeFrameShape =
    | 'body'
    | 'square'
    | 'circle'
    | 'rounded'
    | 'leaf'
    | 'pointed'
    | 'body-square'
    | 'body-square-small'
    | 'body-square-horizontal'
    | 'body-square-vertical'
    | 'body-circle'
    | 'body-rounded-horizontal'
    | 'body-rounded-vertical'
    | 'body-diamond'
    | 'body-star'
    | 'body-star-small'
    | 'body-circle-small';

export type EyeballShape =
    | 'body'
    | 'square'
    | 'circle'
    | 'rounded'
    | 'leaf'
    | 'pointed'
    | 'extra-rounded'
    | 'body-square'
    | 'body-square-small'
    | 'body-square-horizontal'
    | 'body-square-vertical'
    | 'body-circle'
    | 'body-rounded-horizontal'
    | 'body-rounded-vertical'
    | 'body-diamond'
    | 'body-star'
    | 'body-star-small'
    | 'body-circle-small';

export type BodyShape =
    | 'square'
    | 'square-small'
    | 'square-horizontal'
    | 'square-vertical'
    | 'circle'
    | 'rounded-horizontal'
    | 'rounded-vertical'
    | 'diamond'
    | 'star'
    | 'star-small'
    | 'circle-small'
    | 'dots'
    | 'classy'
    | 'mosaic'
    | 'fluid'
    | 'edge-cut'
    | 'japanese'
    | 'hexagon'
    | 'wave';

export interface LogoConfig {
    url: string;
    size: number;
    removeBackground: boolean;
    padding?: number;
    opacity?: number;
    borderRadius?: number;
    excavate?: boolean;
}

export interface Config {
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
        background: string;
        body: string;
        eyeFrame: {
            topLeft: string;
            topRight: string;
            bottomLeft: string;
        };
        eyeball: {
            topLeft: string;
            topRight: string;
            bottomLeft: string;
        };
    };
}

export interface ConfigInput {
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
        background?: string;
        body?: string;
        eyeFrame?: {
            topLeft?: string;
            topRight?: string;
            bottomLeft?: string;
        };
        eyeball?: {
            topLeft?: string;
            topRight?: string;
            bottomLeft?: string;
        };
    };
}

export const DEFAULT_CONFIG: Omit<Config, 'value'> = {
    length: 300,
    padding: 20,
    errorCorrectionLevel: 'H',
    shapes: {
        eyeFrame: 'square',
        body: 'square',
        eyeball: 'square',
    },
    colors: {
        background: '#ffffff',
        body: '#000000',
        eyeFrame: {
            topLeft: '#000000',
            topRight: '#000000',
            bottomLeft: '#000000',
        },
        eyeball: {
            topLeft: '#000000',
            topRight: '#000000',
            bottomLeft: '#000000',
        },
    },
};

export const createConfig = (input: ConfigInput): Config => ({
    ...DEFAULT_CONFIG,
    ...input,
    shapes: {
        ...DEFAULT_CONFIG.shapes,
        ...input.shapes,
    },
    colors: {
        ...DEFAULT_CONFIG.colors,
        ...input.colors,
        eyeFrame: {
            ...DEFAULT_CONFIG.colors.eyeFrame,
            ...input.colors?.eyeFrame,
        },
        eyeball: {
            ...DEFAULT_CONFIG.colors.eyeball,
            ...input.colors?.eyeball,
        },
    },
    logo: input.logo
        ? {
              url: input.logo.url,
              size: input.logo.size ?? 40,
              removeBackground: input.logo.removeBackground ?? false,
              padding: input.logo.padding ?? 0,
              opacity: input.logo.opacity ?? 1,
              borderRadius: input.logo.borderRadius ?? 0,
              excavate: input.logo.excavate ?? true,
          }
        : undefined,
});
