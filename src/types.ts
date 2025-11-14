import { Config, EyeFrameShape, EyeballShape, ColorValue } from './config';

interface StylePathGeneratorParams {
    matrixLength: number;
    size: number;
}
type EyePosition = 'topLeft' | 'topRight' | 'bottomLeft';

export interface GenerateEyeballSVGParams {
    shape: EyeballShape;
    color: ColorValue;
    size: number;
    matrixLength: number;
    position: EyePosition;
    pathOnly: boolean;
    matrix: number[][];
    config: Config;
}

export interface GenerateEyeFrameSVGParams {
    shape: EyeFrameShape;
    color: ColorValue;
    size: number;
    matrixLength: number;
    position: EyePosition;
    pathOnly: boolean;
    matrix: number[][];
    config: Config;
}

export interface StyledEyePathGeneratorParams extends StylePathGeneratorParams {
    position: EyePosition;
}
