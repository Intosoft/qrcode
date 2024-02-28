import circleBody from "../../assets/qrconfig/body/circle-item.png";
import squareBody from "../../assets/qrconfig/body/square.png";

import squareEyeball from "../../assets/qrconfig/eyeball/square.png";
import circleEyeball from "../../assets/qrconfig/eyeball/circle.png";
import circleItemEyeball from "../../assets/qrconfig/eyeball/circle-item.png";

import squareEyeFrame from "../../assets/qrconfig/eyeframe/square.png";
import circleEyeFrame from "../../assets/qrconfig/eyeframe/circle.png";
import circleItemEyeFrame from "../../assets/qrconfig/eyeframe/circle-item.png";
import roundedEyeFrame from "../../assets/qrconfig/eyeframe/rounded.png";
import { Config } from "../../../../src/config";

export const config: {
  body: [Config["bodyShape"], string][];
  eyeball: [Config["eyeballShape"], string][];
  eyeFrame: [Config["eyeFrameShape"], string][];
} = {
  body: [
    ["circle", circleBody],
    ["square", squareBody],
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
