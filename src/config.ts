export type EyeFrameShape = "square" | "circle" | "rounded" | "circle-item";
export type EyeballShape = "square" | "circle" | "circle-item";
export type BodyShape = "square" | "circle";

export interface Config {
  length: number;
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

export const defaultConfig: Config = {
  length: 400,
  shapes: {
    eyeFrame: "circle",
    body: "square",
    eyeball: "circle",
  },
  colors: {
    background: "white",
    body: "black",
    eyeFrame: {
      topLeft: "black",
      topRight: "black",
      bottomLeft: "black",
    },
    eyeball: {
      topLeft: "black",
      topRight: "black",
      bottomLeft: "black",
    },
  },
};
