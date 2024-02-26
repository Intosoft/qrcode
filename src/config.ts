type EyeFrameShape = "square" | "circle" | "rounded" | "circle-item";
type EyeballShape = "square" | "circle" | "circle-item";
type BodyShape = "square" | "circle";

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
  eyeFrameShape: "circle-item",
  bodyShape: "circle",
  eyeballShape: "square",
  color: "black",
  backgroundColor: "white",
  length: 400,
  gradient: "",
  colors: {
    eyeFrame: "black",
    eyeball: "black",
    body: "black",
  },
};
