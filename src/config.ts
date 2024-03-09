import { QRCodeErrorCorrectionLevel } from 'qrcode';

export type EyeFrameShape =
    | 'body'
    | 'square'
    | 'circle'
    | 'rounded'
    | 'styleA'
    | 'styleB'
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
    | 'styleA'
    | 'styleB'
    | 'styleC'
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
    | 'circle-small';

export interface Config {
    length: number;
    padding: number;
    errorCorrectionLevel: QRCodeErrorCorrectionLevel;
    value: string;
    logo?: {
        url: string;
        size: number;
        removeBg: boolean;
    };
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
