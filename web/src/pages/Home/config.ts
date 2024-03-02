import circleBody from "../../assets/qrconfig/body/circle-item.png";
import squareBody from "../../assets/qrconfig/body/square.png";

import squareEyeball from "../../assets/qrconfig/eyeball/square.png";
import circleEyeball from "../../assets/qrconfig/eyeball/circle.png";
import circleItemEyeball from "../../assets/qrconfig/eyeball/circle-item.png";

import squareEyeFrame from "../../assets/qrconfig/eyeframe/square.png";
import circleEyeFrame from "../../assets/qrconfig/eyeframe/circle.png";
import circleItemEyeFrame from "../../assets/qrconfig/eyeframe/circle-item.png";
import roundedEyeFrame from "../../assets/qrconfig/eyeframe/rounded.png";
import { BodyShape, EyeFrameShape, EyeballShape } from "../../../../src/config";

export const config: {
  body: [BodyShape, string][];
  eyeball: [EyeballShape, string][];
  eyeFrame: [EyeFrameShape, string][];
} = {
  body: [
    ["circle", circleBody],
    ["circle-small", circleBody],
    ["square", squareBody],
    ["rounded-horizontal", squareBody],
    ["rounded-vertical", squareBody],
    ["diamond", squareBody],
    ["star", squareBody],
  ],
  eyeball: [
    ["circle", circleEyeball],
    ["circle-item", circleItemEyeball],
    ["square", squareEyeball],
  ],
  eyeFrame: [
    ["rounded", roundedEyeFrame],
    ["circle", circleEyeFrame],
    ["circle-item", circleItemEyeFrame],
    ["square", squareEyeFrame],
  ],
};
