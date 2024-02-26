type EyeFrameShape = "square" | "circle" | "rounded" | "circle-item";
type EyeballShape = "square" | "circle" | "circle-item";
type BodyShape = "square" | "circle";

export interface ConfigParam {
  eyeFrameShape?: EyeFrameShape;
  bodyShape?: BodyShape;
  eyeballShape?: EyeballShape;
  length?: number;
  color?: string;
  backgroundColor?: string;
  gradient?: string;
  colors?: {
    eyeFrame?: string;
    eyeball?: string;
    body?: string;
  };
}
export interface Config {
  eyeFrameShape: EyeFrameShape;
  bodyShape: BodyShape;
  eyeballShape: EyeballShape;
  length: number;
  color: string;
  backgroundColor: string;
  gradient: string;
  colors: {
    eyeFrame: string;
    eyeball: string;
    body: string;
  };
}

export const defaultConfig: Config = {
  eyeFrameShape: "circle",
  bodyShape: "square",
  eyeballShape: "circle-item",
  color: "black",
  backgroundColor: "transparent",
  length: 400,
  gradient: "",
  colors: {
    eyeFrame: "black",
    eyeball: "black",
    body: "black",
  },
};
