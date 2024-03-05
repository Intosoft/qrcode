import body1 from "../../assets/shape/body/1.svg";
import body2 from "../../assets/shape/body/2.svg";
import body3 from "../../assets/shape/body/3.svg";
import body4 from "../../assets/shape/body/4.svg";
import body5 from "../../assets/shape/body/5.svg";
import body6 from "../../assets/shape/body/6.svg";
import body7 from "../../assets/shape/body/7.svg";
import body8 from "../../assets/shape/body/8.svg";
import body9 from "../../assets/shape/body/9.svg";
import body10 from "../../assets/shape/body/10.svg";
import body11 from "../../assets/shape/body/11.svg";

import eyeball1 from "../../assets/shape/eyeball/1.svg";
import eyeball3 from "../../assets/shape/eyeball/3.svg";
import eyeball4 from "../../assets/shape/eyeball/4.svg";
import eyeball5 from "../../assets/shape/eyeball/5.svg";
import eyeball7 from "../../assets/shape/eyeball/7.svg";

import eyeframe1 from "../../assets/shape/eyeframe/1.svg";
import eyeframe2 from "../../assets/shape/eyeframe/2.svg";

import eyeframe4 from "../../assets/shape/eyeframe/4.svg";

import { BodyShape, EyeFrameShape, EyeballShape } from "../../../../src/config";

export const config: {
  body: [BodyShape, string][];
  eyeball: [EyeballShape, string][];
  eyeFrame: [EyeFrameShape, string][];
} = {
  body: [
    ["circle", body1],
    ["circle-small", body2],
    ["square", body3],
    ["square-small", body4],
    ["square-vertical", body5],
    ["square-horizontal", body6],
    ["rounded-horizontal", body7],
    ["rounded-vertical", body8],
    ["diamond", body9],
    ["star", body10],
    ["star-small", body11],
  ],
  eyeball: [
    ["circle", eyeball1],
    ["square", eyeball3],
    ["rounded", eyeball4],
    ["styleA", eyeball5],
    ["styleB", eyeball7],
    ["styleC", eyeball7],
    ["body-square", eyeball7],
    ["body-square-small", eyeball7],
    ["body-square-horizontal", eyeball7],
    ["body-square-vertical", eyeball7],
    ["body-circle", eyeball7],
    ["body-rounded-horizontal", eyeball7],
    ["body-rounded-vertical", eyeball7],
    ["body-diamond", eyeball7],
    ["body-star", eyeball7],
    ["body-star-small", eyeball7],
    ["body-circle-small", eyeball7],
  ],
  eyeFrame: [
    ["rounded", eyeframe1],
    ["styleA", eyeball5],
    ["styleB", eyeball7],
    ["circle", eyeframe2],
    // ["circle-item", eyeframe3],
    ["square", eyeframe4],
    ["body-square", eyeframe4],
    ["body-square-small", eyeframe4],
    ["body-square-horizontal", eyeframe4],
    ["body-square-vertical", eyeframe4],
    ["body-circle", eyeframe4],
    ["body-rounded-horizontal", eyeframe4],
    ["body-rounded-vertical", eyeframe4],
    ["body-diamond", eyeframe4],
    ["body-star", eyeframe4],
    ["body-star-small", eyeframe4],
    ["body-circle-small", eyeframe4],
  ],
};
