import { Config, EyeFrameShape, EyeballShape } from "./config";

export interface StylePathGeneratorParams {
  matrixLength: number;
  size: number;
}
export type EyePosition = "topLeft" | "topRight" | "bottomLeft";

export interface GenerateEyeballSVGParams {
  shape: EyeballShape;
  color: string;
  size: number;
  matrixLength: number;
  position: EyePosition;
  pathOnly: boolean;
  matrix: number[][];
  config: Config;
}

export interface GenerateEyeFrameSVGParams {
  shape: EyeFrameShape;
  color: string;
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
