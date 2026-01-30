"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  BODY_SHAPES: () => BODY_SHAPES,
  EYEBALL_SHAPES: () => EYEBALL_SHAPES,
  EYEFRAME_SHAPES: () => EYEFRAME_SHAPES,
  cleanSVGPath: () => cleanSVGPath,
  default: () => src_default,
  formatNumber: () => formatNumber,
  generateBodyShapePreview: () => generateBodyShapePreview,
  generateContentString: () => generateContentString,
  generateEyeFrameShapePreview: () => generateEyeFrameShapePreview,
  generateEyeballShapePreview: () => generateEyeballShapePreview,
  generateSVGString: () => generateSVGString,
  generateShapePreviewSVG: () => generateShapePreviewSVG,
  isGradientColor: () => isGradientColor,
  normalizeColorValue: () => normalizeColorValue,
  validateColor: () => validateColor,
  validateSVG: () => validateSVG
});
module.exports = __toCommonJS(src_exports);

// src/generateContent.ts
var escapeWifiString = (str) => {
  return str.replace(/[\\;,:"]/g, "\\$&");
};
var generateWifi = (param) => {
  const ssid = escapeWifiString(param.ssid);
  const password = param.password ? escapeWifiString(param.password) : "";
  const encryption = param.encryption || (password ? "WPA" : "nopass");
  const hidden = param.hidden ? "H:true;" : "";
  return `WIFI:T:${encryption};S:${ssid};P:${password};${hidden};`;
};
var generateEmail = (param) => {
  const params = [];
  if (param.subject)
    params.push(`subject=${encodeURIComponent(param.subject)}`);
  if (param.body)
    params.push(`body=${encodeURIComponent(param.body)}`);
  if (param.cc)
    params.push(`cc=${encodeURIComponent(param.cc)}`);
  if (param.bcc)
    params.push(`bcc=${encodeURIComponent(param.bcc)}`);
  const queryString = params.length > 0 ? `?${params.join("&")}` : "";
  return `mailto:${encodeURIComponent(param.email)}${queryString}`;
};
var generateTel = (tel) => `tel:${String(tel).replace(/\s/g, "")}`;
var generateLocation = (param) => {
  const { latitude, longitude, label, zoom } = param;
  const coords = `${latitude},${longitude}`;
  const query = label ? encodeURIComponent(label) : coords;
  const zoomParam = zoom ? `&z=${zoom}` : "";
  return `geo:${coords}?q=${query}${zoomParam}`;
};
var generateSms = (param) => {
  const phone = String(param.phone).replace(/\s/g, "");
  const body = param.message ? `?body=${encodeURIComponent(param.message)}` : "";
  return `sms:${phone}${body}`;
};
var generateVCard = (param) => {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${param.lastName || ""};${param.firstName};;;`,
    `FN:${param.firstName}${param.lastName ? ` ${param.lastName}` : ""}`
  ];
  if (param.organization)
    lines.push(`ORG:${param.organization}`);
  if (param.title)
    lines.push(`TITLE:${param.title}`);
  if (param.email)
    lines.push(`EMAIL:${param.email}`);
  if (param.phone)
    lines.push(`TEL;TYPE=WORK,VOICE:${param.phone}`);
  if (param.mobile)
    lines.push(`TEL;TYPE=CELL:${param.mobile}`);
  if (param.fax)
    lines.push(`TEL;TYPE=FAX:${param.fax}`);
  if (param.website)
    lines.push(`URL:${param.website}`);
  if (param.note)
    lines.push(`NOTE:${param.note}`);
  if (param.address) {
    const { street = "", city = "", state = "", zip = "", country = "" } = param.address;
    lines.push(`ADR;TYPE=WORK:;;${street};${city};${state};${zip};${country}`);
  }
  lines.push("END:VCARD");
  return lines.join("\n");
};
var formatDateForVEvent = (date, allDay) => {
  if (allDay) {
    return date.toISOString().slice(0, 10).replace(/-/g, "");
  }
  return date.toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z";
};
var generateEvent = (param) => {
  const lines = [
    "BEGIN:VEVENT",
    `SUMMARY:${param.title}`,
    `DTSTART${param.allDay ? ";VALUE=DATE" : ""}:${formatDateForVEvent(param.start, param.allDay)}`
  ];
  if (param.end) {
    lines.push(`DTEND${param.allDay ? ";VALUE=DATE" : ""}:${formatDateForVEvent(param.end, param.allDay)}`);
  }
  if (param.location)
    lines.push(`LOCATION:${param.location}`);
  if (param.description)
    lines.push(`DESCRIPTION:${param.description}`);
  lines.push("END:VEVENT");
  return `BEGIN:VCALENDAR
VERSION:2.0
${lines.join("\n")}
END:VCALENDAR`;
};
var generateContentString = (type, param) => {
  switch (type) {
    case "wifi":
      return generateWifi(param);
    case "email":
      return generateEmail(param);
    case "tel":
      return generateTel(param);
    case "location":
      return generateLocation(param);
    case "sms":
      return generateSms(param);
    case "vcard":
      return generateVCard(param);
    case "event":
      return generateEvent(param);
    default:
      return "";
  }
};

// src/utils/gradient.ts
var isGradientColor = (color) => {
  if (typeof color === "string") {
    return color.includes("linear-gradient") || color.includes("radial-gradient") || color.includes("conic-gradient");
  }
  return typeof color === "object" && color !== null && "type" in color && "stops" in color;
};
var gradientConfigToString = (gradient) => {
  const { type, angle, stops } = gradient;
  const sortedStops = [...stops].sort((a, b) => a.offset - b.offset);
  const colorString = sortedStops.map((stop) => `${stop.color} ${stop.offset}%`).join(", ");
  if (type === "linear") {
    return `linear-gradient(${angle || 90}deg, ${colorString})`;
  } else {
    return `radial-gradient(circle, ${colorString})`;
  }
};
var normalizeColorValue = (color) => {
  if (typeof color === "string") {
    return color;
  }
  return gradientConfigToString(color);
};
var parseLinearGradient = (input) => {
  const matches = Array.from(
    input.matchAll(/((?:rgb|rgba|hsl|hsla|#[0-9a-f]{3,8}|[a-z]+)?(?:\([^)]+\))?)\s+(\d+%)/gi)
  );
  const angleMatch = input.match(/(\d+)deg/i);
  const angle = angleMatch ? angleMatch[1] : "0";
  const stops = matches.map((match) => ({
    color: match[1].trim(),
    percentage: match[2]
  }));
  if (stops.length === 0) {
    const colorMatches = input.match(
      /(#[0-9a-f]{3,8}|rgb\([^)]+\)|rgba\([^)]+\)|hsl\([^)]+\)|hsla\([^)]+\)|[a-z]+)/gi
    );
    if (colorMatches && colorMatches.length >= 2) {
      return {
        angle,
        stops: colorMatches.map((color, index) => ({
          color: color.trim(),
          percentage: `${index * 100 / (colorMatches.length - 1)}%`
        }))
      };
    }
    throw new Error("no stops found");
  }
  return { angle, stops };
};
var parseRadialGradient = (input) => {
  const matches = Array.from(
    input.matchAll(/((?:rgb|rgba|hsl|hsla|#[0-9a-f]{3,8}|[a-z]+)?(?:\([^)]+\))?)\s+(\d+%)/gi)
  );
  const stops = matches.map((match) => ({
    color: match[1].trim(),
    percentage: match[2]
  }));
  if (stops.length === 0) {
    const colorMatches = input.match(
      /(#[0-9a-f]{3,8}|rgb\([^)]+\)|rgba\([^)]+\)|hsl\([^)]+\)|hsla\([^)]+\)|[a-z]+)/gi
    );
    if (colorMatches && colorMatches.length >= 2) {
      return colorMatches.map((color, index) => ({
        color: color.trim(),
        percentage: `${index * 100 / (colorMatches.length - 1)}%`
      }));
    }
    throw new Error("no stops found");
  }
  return stops;
};
var generateSvgRadialGradient = (input, id) => {
  try {
    const stops = parseRadialGradient(input);
    if (!stops) {
      return "";
    }
    let svgCode = `<radialGradient id="${id}" cx="50%" cy="50%" r="50%">
`;
    stops.forEach((stop) => {
      const offsetValue = stop.percentage ? stop.percentage : "";
      svgCode += `  <stop offset="${offsetValue}" style="stop-color:${stop.color};stop-opacity:1" />
`;
    });
    svgCode += `</radialGradient>`;
    return svgCode;
  } catch (err) {
    console.error(err);
  }
  return "";
};
var generateSvgLinearGradient = (input, id) => {
  try {
    const { angle, stops } = parseLinearGradient(input);
    if (!stops) {
      return "";
    }
    let svgCode = `<linearGradient id="${id}" x1="0%" y1="0%" x2="100%" y2="0%" gradientTransform="rotate(${angle})">
`;
    let offset = 0;
    stops.forEach((stop) => {
      const offsetValue = (stop == null ? void 0 : stop.percentage) ? stop.percentage : `${offset}%`;
      svgCode += `  <stop offset="${offsetValue}" style="stop-color:${stop == null ? void 0 : stop.color};stop-opacity:1" />
`;
      if (!(stop == null ? void 0 : stop.percentage)) {
        offset += 100 / (stops.length - 1);
      }
    });
    svgCode += `</linearGradient>`;
    return svgCode;
  } catch (err) {
    console.error(err);
  }
  return "";
};
var generateSVGGradient = (color, id) => {
  if (color.includes("linear-gradient")) {
    return generateSvgLinearGradient(color, id);
  }
  return generateSvgRadialGradient(color, id);
};
var generateGradientByConfig = (config) => {
  let svgString = "";
  if (isGradientColor(config.colors.background)) {
    const backgroundColor = normalizeColorValue(config.colors.background);
    svgString += generateSVGGradient(backgroundColor, "background");
  }
  if (isGradientColor(config.colors.body)) {
    const bodyColor = normalizeColorValue(config.colors.body);
    svgString += generateSVGGradient(bodyColor, "body");
  }
  if (isGradientColor(config.colors.eyeFrame.topLeft)) {
    const eyeFrameColor = normalizeColorValue(config.colors.eyeFrame.topLeft);
    svgString += generateSVGGradient(eyeFrameColor, "eyeFrame");
  }
  if (isGradientColor(config.colors.eyeball.topLeft)) {
    const eyeballColor = normalizeColorValue(config.colors.eyeball.topLeft);
    svgString += generateSVGGradient(eyeballColor, "eyeball");
  }
  return svgString;
};

// src/config.ts
var DEFAULT_CONFIG = {
  length: 300,
  padding: 20,
  errorCorrectionLevel: "H",
  shapes: {
    eyeFrame: "square",
    body: "square",
    eyeball: "square"
  },
  colors: {
    background: "#ffffff",
    body: "#000000",
    eyeFrame: {
      topLeft: "#000000",
      topRight: "#000000",
      bottomLeft: "#000000"
    },
    eyeball: {
      topLeft: "#000000",
      topRight: "#000000",
      bottomLeft: "#000000"
    }
  }
};
var createConfig = (input) => {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  return __spreadProps(__spreadValues(__spreadValues({}, DEFAULT_CONFIG), input), {
    shapes: __spreadValues(__spreadValues({}, DEFAULT_CONFIG.shapes), input.shapes),
    colors: __spreadProps(__spreadValues(__spreadValues({}, DEFAULT_CONFIG.colors), input.colors), {
      eyeFrame: __spreadValues(__spreadValues({}, DEFAULT_CONFIG.colors.eyeFrame), (_a = input.colors) == null ? void 0 : _a.eyeFrame),
      eyeball: __spreadValues(__spreadValues({}, DEFAULT_CONFIG.colors.eyeball), (_b = input.colors) == null ? void 0 : _b.eyeball)
    }),
    logo: input.logo ? {
      url: input.logo.url,
      size: (_c = input.logo.size) != null ? _c : 40,
      removeBackground: (_d = input.logo.removeBackground) != null ? _d : false,
      padding: (_e = input.logo.padding) != null ? _e : 0,
      opacity: (_f = input.logo.opacity) != null ? _f : 1,
      borderRadius: (_g = input.logo.borderRadius) != null ? _g : 0,
      excavate: (_h = input.logo.excavate) != null ? _h : true
    } : void 0
  });
};
var BODY_SHAPES = [
  "square",
  "square-small",
  "square-horizontal",
  "square-vertical",
  "circle",
  "circle-small",
  "rounded-horizontal",
  "rounded-vertical",
  "diamond",
  "star",
  "star-small",
  "dots",
  "classy",
  "mosaic",
  "fluid",
  "edge-cut",
  "japanese",
  "hexagon",
  "wave",
  "leaf",
  "petal",
  "octagon",
  "cross",
  "pill",
  "crystal",
  "bubble",
  "tribal",
  "zigzag",
  "spiral",
  "neon",
  "tech"
];
var EYEFRAME_SHAPES = [
  "body",
  "square",
  "circle",
  "rounded",
  "leaf",
  "pointed",
  "body-square",
  "body-square-small",
  "body-square-horizontal",
  "body-square-vertical",
  "body-circle",
  "body-rounded-horizontal",
  "body-rounded-vertical",
  "body-diamond",
  "body-star",
  "body-star-small",
  "body-circle-small"
];
var EYEBALL_SHAPES = [
  "body",
  "square",
  "circle",
  "rounded",
  "leaf",
  "pointed",
  "extra-rounded",
  "body-square",
  "body-square-small",
  "body-square-horizontal",
  "body-square-vertical",
  "body-circle",
  "body-rounded-horizontal",
  "body-rounded-vertical",
  "body-diamond",
  "body-star",
  "body-star-small",
  "body-circle-small"
];

// src/path/square.ts
var generateSquarePath = ({
  i,
  j,
  width: _width,
  height: _height,
  cellSize
}) => {
  const height = _height || cellSize;
  const width = _width || cellSize;
  let path = "";
  const x = cellSize * j + (cellSize - width) / 2;
  const y = cellSize * i + (cellSize - height) / 2;
  path += `M${x},${y}`;
  path += `h${width} v${height} h-${width} v-${height} `;
  return path;
};
var generateDiamondPath = ({
  i,
  j,
  width: _width,
  height: _height,
  cellSize
}) => {
  const height = _height || cellSize;
  const width = _width || cellSize;
  let path = "";
  const x = cellSize * j + (cellSize - width) / 2;
  const y = cellSize * i + (cellSize - height) / 2;
  const midX = x + width / 2;
  const midY = y + height / 2;
  path += `M${midX},${y}`;
  path += `L${x + width},${midY} `;
  path += `L${midX},${y + height} `;
  path += `L${x},${midY} `;
  path += `L${midX},${y} `;
  return path;
};
var generateStarPath = ({
  i,
  j,
  width: _width,
  height: _height,
  cellSize,
  points = 5
}) => {
  const height = _height || cellSize;
  const width = _width || cellSize;
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const cx = cellSize * j + halfWidth;
  const cy = cellSize * i + halfHeight;
  const outerRadius = Math.min(halfWidth, halfHeight);
  const innerRadius = outerRadius / 2;
  let path = "";
  for (let i2 = 0; i2 < points; i2++) {
    const outerX = cx + outerRadius * Math.cos(Math.PI * 2 * i2 / points - Math.PI / 2);
    const outerY = cy + outerRadius * Math.sin(Math.PI * 2 * i2 / points - Math.PI / 2);
    const innerX = cx + innerRadius * Math.cos(Math.PI * 2 * (i2 + 0.5) / points - Math.PI / 2);
    const innerY = cy + innerRadius * Math.sin(Math.PI * 2 * (i2 + 0.5) / points - Math.PI / 2);
    if (i2 === 0) {
      path += `M${outerX},${outerY} `;
    } else {
      path += `L${outerX},${outerY} `;
    }
    path += `${innerX},${innerY} `;
  }
  path += "Z";
  return path;
};
var generateOutlineSquarePath = ({
  x,
  y,
  length,
  cellSize
}) => {
  let path = "";
  path += `M${x + length},${y + length}`;
  path += `H${x}V${y}`;
  path += `H${x + length}Z`;
  path += `M${x + cellSize},${y + length - cellSize}`;
  path += `H${x + length - cellSize}V${y + cellSize}`;
  path += `H${x + cellSize}Z`;
  return path;
};
var generateOutlineRoundedSquarePath = ({
  x,
  y,
  length,
  cellSize,
  roundedCorners
}) => {
  const dynamic1 = length * 0.267;
  const dynamic2 = length - dynamic1;
  const dynamic3 = dynamic1 - cellSize;
  let path = "";
  path += `M${x},${y + length}`;
  if (roundedCorners.includes("bottom-left")) {
    path += `H${x + dynamic1}`;
    path += `A${dynamic1},${dynamic1},0,0,1,${x},${y + dynamic2}`;
  } else {
    path += `H${x}`;
  }
  if (roundedCorners.includes("top-left")) {
    path += `V${y + dynamic1}`;
    path += `A${dynamic1},${dynamic1},0,0,1,${x + dynamic1},${y}`;
  } else {
    path += `V${y}`;
  }
  if (roundedCorners.includes("top-right")) {
    path += `H${x + dynamic2}`;
    path += `A${dynamic1},${dynamic1},0,0,1,${x + length},${y + dynamic1}`;
  } else {
    path += `H${x + length}`;
  }
  if (roundedCorners.includes("bottom-right")) {
    path += `V${y + dynamic2}`;
    path += `A${dynamic1},${dynamic1},0,0,1,${x + dynamic2},${y + length}`;
  } else {
    path += `V${y + length}`;
  }
  path += `Z`;
  let pathFixMX = x + dynamic1;
  const pathFixMY = y + cellSize;
  let hDynamic2 = dynamic2;
  let vDynamic2 = dynamic2;
  const hDynamic3 = dynamic3;
  const vDynamic3 = dynamic3;
  if (!roundedCorners.includes("top-left")) {
    pathFixMX = x + cellSize;
  }
  if (!roundedCorners.includes("bottom-left")) {
    vDynamic2 = dynamic2 + cellSize / 1.25;
  }
  if (!roundedCorners.includes("bottom-right")) {
    hDynamic2 = dynamic2 + cellSize / 1.25;
  }
  path += `M${pathFixMX},${pathFixMY}`;
  if (roundedCorners.includes("top-left")) {
    path += `a${vDynamic3},${vDynamic3},0,0,0,-${vDynamic3},${vDynamic3}`;
    path += `V${y + vDynamic2}`;
  } else {
    path += `V${y + vDynamic2}`;
  }
  if (roundedCorners.includes("bottom-left")) {
    path += `a${hDynamic3},${hDynamic3},0,0,0,${hDynamic3},${hDynamic3}`;
    path += `H${x + hDynamic2}`;
  } else {
    path += `H${x + hDynamic2}`;
  }
  if (roundedCorners.includes("bottom-right")) {
    path += `a${vDynamic3},${vDynamic3},0,0,0,${vDynamic3}-${vDynamic3}`;
    path += `V${y + dynamic1}`;
  } else {
    path += `V${y + dynamic1}`;
  }
  if (roundedCorners.includes("top-right")) {
    path += `a${hDynamic3},${hDynamic3},0,0,0,-${hDynamic3}-${hDynamic3}`;
  } else {
    path += `V${y + cellSize}`;
  }
  path += `Z`;
  return path;
};
var generateOutlineCirclePath = ({
  x,
  y,
  length,
  cellSize
}) => {
  let path = "";
  const radius = length / 2;
  path += `M${x + radius},${y + length}`;
  path += `A${radius},${radius},0,1,1,${length + x},${radius + y},${radius},${radius},0,0,1,${radius + x},${length + y}`;
  path += `Z`;
  path += `m${0},${-(length - cellSize)}`;
  path += `A${radius - cellSize},${radius - cellSize},0,1,0,${length - cellSize + x},${radius + y},${radius - cellSize},${radius - cellSize},0,0,0,${radius + x},${cellSize + y}`;
  path += `Z`;
  return path;
};
var generateRoundedCornerEyeballPath = ({
  x,
  y,
  length,
  roundedCorners
}) => {
  let path = "";
  const dynamic1 = length * 0.267;
  const dynamic2 = length - dynamic1;
  path += `M${x},${y + length}`;
  if (roundedCorners.includes("bottom-left")) {
    path += `H${x + dynamic1}`;
    path += `A${dynamic1},${dynamic1},0,0,1,${x},${y + dynamic2}`;
  } else {
    path += `H${x}`;
    path += `A${0},${0},0,0,1,${x},${y}`;
  }
  if (roundedCorners.includes("top-left")) {
    path += `V${y + dynamic1}`;
    path += `A${dynamic1},${dynamic1},0,0,1,${x + dynamic1},${y}`;
  } else {
    path += `V${y}`;
    path += `A${0},${0},0,0,1,${x + dynamic1},${y}`;
  }
  if (roundedCorners.includes("top-right")) {
    path += `H${x + dynamic2}`;
    path += `A${dynamic1},${dynamic1},0,0,1,${x + length},${y + dynamic1}`;
  } else {
    path += `H${x}`;
    path += `A${0},${0},0,0,1,${x + length},${y}`;
  }
  if (roundedCorners.includes("bottom-right")) {
    path += `V${y + length - dynamic1}`;
    path += `A${dynamic1},${dynamic1},0,0,1,${x + dynamic2},${y + length}`;
  } else {
    path += `V${y + length}`;
    path += `H${x + dynamic2}`;
  }
  path += `Z`;
  return path;
};
var generateHexagonPath = ({
  i,
  j,
  width: _width,
  height: _height,
  cellSize
}) => {
  const height = _height || cellSize;
  const width = _width || cellSize;
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const cx = cellSize * j + halfWidth;
  const cy = cellSize * i + halfHeight;
  const radius = Math.min(halfWidth, halfHeight);
  let path = "";
  for (let i2 = 0; i2 < 6; i2++) {
    const angle = Math.PI / 3 * i2 - Math.PI / 2;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    if (i2 === 0) {
      path += `M${x},${y} `;
    } else {
      path += `L${x},${y} `;
    }
  }
  path += "Z";
  return path;
};
var generateWavePath = ({
  i,
  j,
  width: _width,
  height: _height,
  cellSize
}) => {
  const height = _height || cellSize;
  const width = _width || cellSize;
  let path = "";
  const x = cellSize * j + (cellSize - width) / 2;
  const y = cellSize * i + (cellSize - height) / 2;
  const amplitude = width * 0.15;
  const frequency = 2;
  path += `M${x},${y + amplitude}`;
  for (let i2 = 0; i2 <= frequency; i2++) {
    const px = x + width / frequency * i2;
    const py = y + amplitude * (1 - Math.cos(Math.PI * 2 * i2 / frequency));
    const cpx = px + width / (frequency * 2);
    const cpy = py + amplitude * Math.sin(Math.PI * (2 * i2 + 1) / frequency);
    if (i2 < frequency) {
      path += `Q${cpx},${cpy},${px + width / frequency},${y + amplitude * (1 - Math.cos(Math.PI * 2 * (i2 + 1) / frequency))}`;
    }
  }
  path += `L${x + width},${y + height - amplitude}`;
  for (let i2 = frequency; i2 >= 0; i2--) {
    const px = x + width / frequency * i2;
    const py = y + height - amplitude * (1 - Math.cos(Math.PI * 2 * i2 / frequency));
    const cpx = px - width / (frequency * 2);
    const cpy = py - amplitude * Math.sin(Math.PI * (2 * i2 - 1) / frequency);
    if (i2 > 0) {
      path += `Q${cpx},${cpy},${px - width / frequency},${y + height - amplitude * (1 - Math.cos(Math.PI * 2 * (i2 - 1) / frequency))}`;
    }
  }
  path += `L${x},${y + amplitude}Z`;
  return path;
};
var generateLeafPath = ({
  i,
  j,
  width: _width,
  height: _height,
  cellSize
}) => {
  const height = _height || cellSize;
  const width = _width || cellSize;
  const x = cellSize * j + (cellSize - width) / 2;
  const y = cellSize * i + (cellSize - height) / 2;
  let path = "";
  const cx = x + width / 2;
  const cy = y + height / 2;
  path += `M${cx},${y}`;
  path += `C${x + width},${y + height * 0.3},${x + width},${y + height * 0.7},${cx},${y + height}`;
  path += `C${x},${y + height * 0.7},${x},${y + height * 0.3},${cx},${y}Z`;
  return path;
};
var generatePetalPath = ({
  i,
  j,
  width: _width,
  height: _height,
  cellSize
}) => {
  const height = _height || cellSize;
  const width = _width || cellSize;
  const x = cellSize * j + (cellSize - width) / 2;
  const y = cellSize * i + (cellSize - height) / 2;
  let path = "";
  const cx = x + width / 2;
  const cy = y + height / 2;
  const radius = Math.min(width, height) / 2;
  path += `M${cx},${cy}`;
  path += `Q${x + width},${y},${cx + radius},${cy}`;
  path += `Q${x + width},${y + height},${cx},${cy}`;
  path += `Q${x},${y + height},${cx - radius},${cy}`;
  path += `Q${x},${y},${cx},${cy}Z`;
  return path;
};
var generateOctagonPath = ({
  i,
  j,
  width: _width,
  height: _height,
  cellSize
}) => {
  const height = _height || cellSize;
  const width = _width || cellSize;
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const cx = cellSize * j + halfWidth;
  const cy = cellSize * i + halfHeight;
  const radius = Math.min(halfWidth, halfHeight);
  let path = "";
  for (let i2 = 0; i2 < 8; i2++) {
    const angle = Math.PI / 4 * i2 - Math.PI / 2;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    if (i2 === 0) {
      path += `M${x},${y} `;
    } else {
      path += `L${x},${y} `;
    }
  }
  path += "Z";
  return path;
};
var generateCrossPath = ({
  i,
  j,
  width: _width,
  height: _height,
  cellSize
}) => {
  const height = _height || cellSize;
  const width = _width || cellSize;
  const x = cellSize * j + (cellSize - width) / 2;
  const y = cellSize * i + (cellSize - height) / 2;
  let path = "";
  const barWidth = width * 0.3;
  const barHeight = height * 0.3;
  const cx = x + width / 2;
  const cy = y + height / 2;
  path += `M${cx - barWidth / 2},${y}`;
  path += `L${cx + barWidth / 2},${y}`;
  path += `L${cx + barWidth / 2},${y + height}`;
  path += `L${cx - barWidth / 2},${y + height}Z`;
  path += `M${x},${cy - barHeight / 2}`;
  path += `L${x + width},${cy - barHeight / 2}`;
  path += `L${x + width},${cy + barHeight / 2}`;
  path += `L${x},${cy + barHeight / 2}Z`;
  return path;
};
var generatePillPath = ({
  i,
  j,
  width: _width,
  height: _height,
  cellSize
}) => {
  const height = _height || cellSize * 0.9;
  const width = _width || cellSize * 0.9;
  const x = cellSize * j + (cellSize - width) / 2;
  const y = cellSize * i + (cellSize - height) / 2;
  let path = "";
  const radius = Math.min(width, height) / 2;
  path += `M${x + radius},${y}`;
  path += `L${x + width - radius},${y}`;
  path += `A${radius},${radius},0,0,1,${x + width - radius},${y + height}`;
  path += `L${x + radius},${y + height}`;
  path += `A${radius},${radius},0,0,1,${x + radius},${y}Z`;
  return path;
};
var generateCrystalPath = ({
  i,
  j,
  width: _width,
  height: _height,
  cellSize
}) => {
  const height = _height || cellSize;
  const width = _width || cellSize;
  const x = cellSize * j + (cellSize - width) / 2;
  const y = cellSize * i + (cellSize - height) / 2;
  let path = "";
  const cx = x + width / 2;
  const cy = y + height / 2;
  path += `M${cx},${y}`;
  path += `L${x + width * 0.75},${y + height * 0.25}`;
  path += `L${x + width},${cy}`;
  path += `L${x + width * 0.75},${y + height * 0.75}`;
  path += `L${cx},${y + height}`;
  path += `L${x + width * 0.25},${y + height * 0.75}`;
  path += `L${x},${cy}`;
  path += `L${x + width * 0.25},${y + height * 0.25}Z`;
  return path;
};
var generateBubblePath = ({
  i,
  j,
  width: _width,
  height: _height,
  cellSize
}) => {
  const height = _height || cellSize;
  const width = _width || cellSize;
  const x = cellSize * j + (cellSize - width) / 2;
  const y = cellSize * i + (cellSize - height) / 2;
  let path = "";
  const mainRadius = Math.min(width, height) * 0.35;
  const cx = x + width / 2;
  const cy = y + height / 2;
  path += `M${cx + mainRadius},${cy}`;
  path += `A${mainRadius},${mainRadius},0,1,1,${cx - mainRadius},${cy}`;
  path += `A${mainRadius},${mainRadius},0,0,1,${cx + mainRadius},${cy}Z`;
  return path;
};
var generateTribalPath = ({
  i,
  j,
  width: _width,
  height: _height,
  cellSize
}) => {
  const height = _height || cellSize;
  const width = _width || cellSize;
  const x = cellSize * j + (cellSize - width) / 2;
  const y = cellSize * i + (cellSize - height) / 2;
  let path = "";
  const cx = x + width / 2;
  path += `M${cx},${y}`;
  path += `L${x + width * 0.8},${y + height * 0.4}`;
  path += `L${x + width},${y + height * 0.6}`;
  path += `L${cx},${y + height}`;
  path += `L${x},${y + height * 0.6}`;
  path += `L${x + width * 0.2},${y + height * 0.4}Z`;
  return path;
};
var generateZigzagPath = ({
  i,
  j,
  width: _width,
  height: _height,
  cellSize
}) => {
  const height = _height || cellSize;
  const width = _width || cellSize;
  const x = cellSize * j + (cellSize - width) / 2;
  const y = cellSize * i + (cellSize - height) / 2;
  let path = "";
  path += `M${x + width * 0.6},${y}`;
  path += `L${x + width * 0.3},${y + height * 0.4}`;
  path += `L${x + width * 0.7},${y + height * 0.4}`;
  path += `L${x + width * 0.4},${y + height}`;
  path += `L${x + width},${y + height * 0.5}`;
  path += `L${x + width * 0.5},${y + height * 0.5}`;
  path += `L${x + width},${y}Z`;
  return path;
};
var generateSpiralPath = ({
  i,
  j,
  width: _width,
  height: _height,
  cellSize
}) => {
  const height = _height || cellSize;
  const width = _width || cellSize;
  const x = cellSize * j + (cellSize - width) / 2;
  const y = cellSize * i + (cellSize - height) / 2;
  let path = "";
  const cx = x + width / 2;
  const cy = y + height / 2;
  const maxRadius = Math.min(width, height) / 2;
  const turns = 2;
  const segments = 8;
  for (let i2 = 0; i2 <= segments; i2++) {
    const angle = Math.PI * 2 * turns * i2 / segments;
    const radius = maxRadius * i2 / segments;
    const px = cx + radius * Math.cos(angle);
    const py = cy + radius * Math.sin(angle);
    if (i2 === 0) {
      path += `M${px},${py}`;
    } else {
      path += `L${px},${py}`;
    }
  }
  return path;
};
var generateNeonPath = ({
  i,
  j,
  width: _width,
  height: _height,
  cellSize
}) => {
  const height = _height || cellSize * 0.9;
  const width = _width || cellSize * 0.9;
  const x = cellSize * j + (cellSize - width) / 2;
  const y = cellSize * i + (cellSize - height) / 2;
  let path = "";
  const radius = height / 4;
  path += `M${x + radius},${y}`;
  path += `L${x + width - radius},${y}`;
  path += `A${radius},${radius},0,0,1,${x + width - radius},${y + height}`;
  path += `L${x + radius},${y + height}`;
  path += `A${radius},${radius},0,0,1,${x + radius},${y}Z`;
  return path;
};
var generateTechPath = ({
  i,
  j,
  width: _width,
  height: _height,
  cellSize
}) => {
  const height = _height || cellSize;
  const width = _width || cellSize;
  const x = cellSize * j + (cellSize - width) / 2;
  const y = cellSize * i + (cellSize - height) / 2;
  let path = "";
  const notchSize = width * 0.15;
  path += `M${x + notchSize},${y}`;
  path += `L${x + width - notchSize},${y}`;
  path += `L${x + width},${y + notchSize}`;
  path += `L${x + width},${y + height - notchSize}`;
  path += `L${x + width - notchSize},${y + height}`;
  path += `L${x + notchSize},${y + height}`;
  path += `L${x},${y + height - notchSize}`;
  path += `L${x},${y + notchSize}Z`;
  return path;
};
var generateTrianglePath = ({
  i,
  j,
  width: _width,
  height: _height,
  cellSize,
  direction
}) => {
  const height = _height || cellSize;
  const width = _width || cellSize;
  let path = "";
  const x = cellSize * j + (cellSize - width) / 2;
  const y = cellSize * i + (cellSize - height) / 2;
  switch (direction) {
    case "top":
      path += `M${x + width / 2},${y}`;
      path += `l${width / 2},${height} l${-width},${0} Z`;
      break;
    case "left":
      path += `M${x},${y + height / 2}`;
      path += `l${width},${height / 2} l${0},${-height} Z`;
      break;
    case "right":
      path += `M${x + width},${y + height / 2}`;
      path += `l${-width},${height / 2} l${0},${-height} Z`;
      break;
    case "bottom":
      path += `M${x + width / 2},${y + height}`;
      path += `l${width / 2},${-height} l${-width},${0} Z`;
      break;
    default:
      break;
  }
  return path;
};

// src/utils.ts
var import_qrcode = __toESM(require("qrcode"));

// src/utils/svg.ts
function cleanSVGPath(path) {
  return path.replace(/\s+/g, " ").replace(/\s*,\s*/g, ",").replace(/([a-zA-Z])\s*/g, "$1").replace(/\s([a-zA-Z])/g, " $1").trim();
}
function validateColor(color) {
  if (color === "none" || color === "transparent" || color === "currentColor") {
    return color;
  }
  if (color.startsWith("#")) {
    if (color.length === 4) {
      return `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`;
    }
    return color.toUpperCase();
  }
  if (color.startsWith("rgb")) {
    return color.replace(/\s+/g, "");
  }
  if (color.startsWith("url(")) {
    return color;
  }
  return color;
}
function formatNumber(num, precision = 3) {
  const rounded = Number(num.toFixed(precision));
  const str = rounded.toString();
  if (str.includes(".")) {
    return str.replace(/(\.\d*?)0+$/, "$1").replace(/\.$/, "");
  }
  return str;
}
function getImageMimeType(url) {
  var _a;
  if (url.startsWith("data:image/")) {
    const match = url.match(/^data:image\/([a-z+]+);/i);
    return match ? match[1] : null;
  }
  const extension = (_a = url.split(".").pop()) == null ? void 0 : _a.toLowerCase();
  const mimeMap = {
    "png": "png",
    "jpg": "jpeg",
    "jpeg": "jpeg",
    "gif": "gif",
    "webp": "webp",
    "svg": "svg+xml",
    "bmp": "bmp",
    "ico": "x-icon"
  };
  return mimeMap[extension || ""] || null;
}
function validateURL(url) {
  if (url.startsWith("data:image/")) {
    const mimeType = getImageMimeType(url);
    const supportedTypes = ["png", "jpeg", "jpg", "gif", "webp", "svg+xml", "bmp"];
    if (mimeType && !supportedTypes.includes(mimeType)) {
      console.warn(`Unsupported image format in data URI: ${mimeType}. Supported formats: PNG, JPEG, GIF, WebP, SVG, BMP`);
    }
    return url;
  }
  if (url.startsWith("https://") || url.startsWith("http://")) {
    const mimeType = getImageMimeType(url);
    const supportedTypes = ["png", "jpeg", "gif", "webp", "svg+xml", "bmp", "x-icon"];
    if (mimeType && !supportedTypes.includes(mimeType)) {
      console.warn(`Image URL appears to have unsupported format: ${mimeType}. Supported formats: PNG, JPEG, GIF, WebP, SVG, BMP, ICO. The image may not render correctly.`);
    }
    return url;
  }
  if (!url.includes(":")) {
    return url;
  }
  const dangerousProtocols = ["javascript:", "data:text", "vbscript:"];
  if (dangerousProtocols.some((protocol) => url.toLowerCase().startsWith(protocol))) {
    console.warn(`Blocked potentially dangerous URL: ${url}`);
    return "";
  }
  return url;
}
function validateSVG(svg) {
  const errors = [];
  if (!svg.includes("<svg")) {
    errors.push("Missing <svg> root element");
  }
  if (!svg.includes("</svg>")) {
    errors.push("Missing closing </svg> tag");
  }
  if (!svg.includes('xmlns="http://www.w3.org/2000/svg"')) {
    errors.push("Missing xmlns attribute on <svg> element");
  }
  const openTags = (svg.match(/<[^/][^>]*>/g) || []).length;
  const closeTags = (svg.match(/<\/[^>]*>/g) || []).length;
  const selfClosing = (svg.match(/<[^>]*\/>/g) || []).length;
  if (openTags !== closeTags + selfClosing) {
    errors.push("Mismatched opening and closing tags");
  }
  return {
    valid: errors.length === 0,
    errors
  };
}

// src/utils.ts
var getPositions = ({ matrixLength, offset, count }) => {
  const lastPosition = matrixLength - 1;
  const emptyArray = Array(count).fill("");
  const countPosition = count - 1;
  return [
    ...emptyArray.map((_, index) => [index + offset, 0 + offset]),
    ...emptyArray.map((_, index) => [index + offset, countPosition + offset]),
    ...emptyArray.map((_, index) => [0 + offset, index + offset]),
    ...emptyArray.map((_, index) => [countPosition + offset, index + offset]),
    ...emptyArray.map((_, index) => [lastPosition - index - offset, 0 + offset]),
    ...emptyArray.map((_, index) => [lastPosition - index - offset, countPosition + offset]),
    ...emptyArray.map((_, index) => [lastPosition - offset, index + offset]),
    ...emptyArray.map((_, index) => [lastPosition - countPosition - offset, index + offset]),
    ...emptyArray.map((_, index) => [index + offset, lastPosition - offset]),
    ...emptyArray.map((_, index) => [index + offset, lastPosition - countPosition - offset]),
    ...emptyArray.map((_, index) => [0 + offset, lastPosition - index - offset]),
    ...emptyArray.map((_, index) => [countPosition + offset, lastPosition - index - offset])
  ];
};
var generateMatrix = (value, errorCorrectionLevel) => {
  const arr = Array.from(import_qrcode.default.create(value, { errorCorrectionLevel }).modules.data);
  const sqrt = Math.sqrt(arr.length);
  const rows = [];
  for (let i = 0; i < arr.length; i += sqrt) {
    rows.push(arr.slice(i, i + sqrt));
  }
  return rows;
};
var getEyeFramePositions = (matrixLength) => {
  const count = 7;
  const offset = 0;
  return getPositions({ matrixLength, count, offset });
};
var getEyeBallPositions = (matrixLength) => {
  const count = 3;
  const offset = 2;
  const innerItems = [
    [3, 3],
    [matrixLength - 1 - 3, 3],
    [3, matrixLength - 1 - 3]
  ];
  return [...getPositions({ matrixLength, count, offset }), ...innerItems];
};
var getPositionForEyes = ({ matrixLength, cellSize }) => ({
  eyeball: {
    topLeft: {
      x: 3.5 * cellSize,
      y: 3.5 * cellSize
    },
    topRight: {
      x: (matrixLength - 3.5) * cellSize,
      y: 3.5 * cellSize
    },
    bottomLeft: {
      x: 3.5 * cellSize,
      y: (matrixLength - 3.5) * cellSize
    }
  },
  eyeFrame: {
    topLeft: {
      x: 0,
      y: 0
    },
    topRight: {
      x: (matrixLength - 7) * cellSize,
      y: 0
    },
    bottomLeft: {
      x: 0,
      y: (matrixLength - 7) * cellSize
    }
  }
});
var renderLogoFromConfig = (config, cellSize, forReactNative) => {
  var _a, _b, _c, _d;
  if (!((_a = config.logo) == null ? void 0 : _a.url) || forReactNative) {
    return "";
  }
  const safeUrl = validateURL(config.logo.url);
  if (!safeUrl) {
    console.warn("Invalid or unsafe logo URL provided");
    return "";
  }
  const logoSize = config.logo.size * cellSize;
  const padding = ((_b = config.logo.padding) != null ? _b : 0) * cellSize;
  const totalSize = logoSize + padding * 2;
  const height = logoSize;
  const width = logoSize;
  const centerX = (config.length - totalSize) / 2;
  const centerY = (config.length - totalSize) / 2;
  const imageX = centerX + padding;
  const imageY = centerY + padding;
  const opacity = (_c = config.logo.opacity) != null ? _c : 1;
  const borderRadius = (_d = config.logo.borderRadius) != null ? _d : 0;
  const defs = borderRadius > 0 ? `
    <defs>
        <clipPath id="logo-clip">
            <rect x="${formatNumber(imageX)}" y="${formatNumber(imageY)}" 
                  width="${formatNumber(width)}" height="${formatNumber(height)}" 
                  rx="${formatNumber(borderRadius)}" ry="${formatNumber(borderRadius)}"/>
        </clipPath>
    </defs>` : "";
  const clipPathAttr = borderRadius > 0 ? ` clip-path="url(#logo-clip)"` : "";
  const opacityAttr = opacity < 1 ? ` opacity="${formatNumber(opacity)}"` : "";
  const backgroundRect = padding > 0 ? `
    <rect x="${formatNumber(centerX)}" y="${formatNumber(centerY)}" 
          width="${formatNumber(totalSize)}" height="${formatNumber(totalSize)}" 
          fill="${config.colors.background}" 
          rx="${formatNumber(borderRadius + padding)}"
          ry="${formatNumber(borderRadius + padding)}"/>` : "";
  return `${defs}
    ${backgroundRect}
    <image 
    id="logo" 
    href="${safeUrl}" 
    height="${formatNumber(height)}"
    width="${formatNumber(width)}" 
    x="${formatNumber(imageX)}" 
    y="${formatNumber(imageY)}"${clipPathAttr}${opacityAttr}/>`;
};
var getLogoPathPositions = (matrixLength, size) => {
  if (size) {
    const count = size;
    const startPos = Math.ceil((matrixLength - 1) / 2 - count / 2);
    const positions = Array(count).fill(0).map(
      (_, i) => Array(count).fill(0).map((_2, j) => [startPos + i, startPos + j])
    ).flat();
    return positions;
  }
  return [];
};

// src/utils/path.ts
var checkNeighbors = ({ matrix, i, j }) => {
  const numRows = matrix.length;
  const numCols = matrix[0].length;
  const neighbors = {
    top: false,
    bottom: false,
    left: false,
    right: false
  };
  if (matrix[i][j] === 1) {
    if (i > 0 && matrix[i - 1][j] === 1) {
      neighbors.top = true;
    }
    if (i < numRows - 1 && matrix[i + 1][j] === 1) {
      neighbors.bottom = true;
    }
    if (j > 0 && matrix[i][j - 1] === 1) {
      neighbors.left = true;
    }
    if (j < numCols - 1 && matrix[i][j + 1] === 1) {
      neighbors.right = true;
    }
  }
  return neighbors;
};

// src/eyeframes.ts
var circleEyeFrame = ({ matrixLength, size, position }) => {
  let path = "";
  const cellSize = size / matrixLength;
  const positions = getPositionForEyes({
    matrixLength,
    cellSize
  });
  const length = cellSize * 7;
  path += generateOutlineCirclePath(__spreadProps(__spreadValues({}, positions.eyeFrame[position]), {
    cellSize,
    length
  }));
  return path;
};
var squareEyeFrame = ({ matrixLength, size, position }) => {
  const cellSize = size / matrixLength;
  const length = cellSize * 7;
  const positions = getPositionForEyes({ matrixLength, cellSize });
  let path = "";
  path += generateOutlineSquarePath(__spreadProps(__spreadValues({}, positions.eyeFrame[position]), {
    length,
    cellSize
  }));
  return path;
};
var roundedEyeFrame = ({ matrixLength, size, position }) => {
  const cellSize = size / matrixLength;
  const length = cellSize * 7;
  const positions = getPositionForEyes({ matrixLength, cellSize });
  return generateOutlineRoundedSquarePath(__spreadProps(__spreadValues({}, positions.eyeFrame[position]), {
    cellSize,
    length,
    roundedCorners: ["top-left", "top-right", "bottom-right", "bottom-left"]
  }));
};
var styleAEyeFrame = ({ matrixLength, size, position }) => {
  const cellSize = size / matrixLength;
  const length = cellSize * 7;
  const positions = getPositionForEyes({ matrixLength, cellSize });
  const roundedCorners = {
    topLeft: ["top-left", "top-right", "bottom-left"],
    topRight: ["top-left", "top-right", "bottom-right"],
    bottomLeft: ["top-left", "bottom-right", "bottom-left"]
  };
  return generateOutlineRoundedSquarePath(__spreadProps(__spreadValues({}, positions.eyeFrame[position]), {
    cellSize,
    length,
    roundedCorners: roundedCorners[position]
  }));
};
var styleBEyeFrame = ({ matrixLength, size, position }) => {
  const cellSize = size / matrixLength;
  const length = cellSize * 7;
  const positions = getPositionForEyes({ matrixLength, cellSize });
  const roundedCorners = {
    topLeft: ["top-left"],
    topRight: ["top-right"],
    bottomLeft: ["bottom-left"]
  };
  return generateOutlineRoundedSquarePath(__spreadProps(__spreadValues({}, positions.eyeFrame[position]), {
    cellSize,
    length,
    roundedCorners: roundedCorners[position]
  }));
};
var eyeFrameFunction = {
  square: squareEyeFrame,
  circle: circleEyeFrame,
  rounded: roundedEyeFrame,
  leaf: styleAEyeFrame,
  pointed: styleBEyeFrame
};
var generateEyeFrameSVG = ({
  shape,
  color,
  size,
  matrixLength,
  position,
  pathOnly,
  config,
  matrix
}) => {
  if (shape === "body") {
    return "";
  }
  if (shape.includes("body-")) {
    const bodyShape = config.shapes.eyeFrame.replace("body-", "");
    const path2 = generatePath({
      matrix,
      size: config.length,
      config: __spreadProps(__spreadValues({}, config), {
        shapes: __spreadProps(__spreadValues({}, config.shapes), {
          body: bodyShape
        })
      }),
      eyeFrameOnly: true
    });
    if (pathOnly) {
      return path2;
    }
    return `<path fill="${isGradientColor(color) ? "url(#eyeFrame)" : color}" d="${path2}"/>`;
  }
  const path = eyeFrameFunction[shape]({
    matrixLength,
    size,
    position
  });
  if (pathOnly) {
    return path;
  }
  return `<path fill="${isGradientColor(color) ? "url(#eyeFrame)" : color}" d="${path}"/>`;
};
var generateEyeFrameSVGFromConfig = (config, matrixLength, matrix, isFromBody) => {
  const shape = config.shapes.eyeFrame;
  const colors = config.colors.eyeFrame;
  let svgString = "";
  if (shape === "body") {
    return "";
  }
  if (colors.topLeft === "body" && isFromBody || colors.topLeft !== "body" && !isFromBody) {
    svgString += generateEyeFrameSVG({
      shape,
      color: colors.topLeft === "body" ? config.colors.body : colors.topLeft,
      size: config.length,
      matrixLength,
      position: "topLeft",
      pathOnly: colors.topLeft === "body",
      config,
      matrix
    });
  }
  if (colors.topRight === "body" && isFromBody || colors.topRight !== "body" && !isFromBody) {
    svgString += generateEyeFrameSVG({
      shape,
      color: colors.topRight === "body" ? config.colors.body : colors.topRight,
      size: config.length,
      matrixLength,
      position: "topRight",
      pathOnly: colors.topRight === "body",
      config,
      matrix
    });
  }
  if (colors.bottomLeft === "body" && isFromBody || colors.bottomLeft !== "body" && !isFromBody) {
    svgString += generateEyeFrameSVG({
      shape,
      color: colors.bottomLeft === "body" ? config.colors.body : colors.bottomLeft,
      size: config.length,
      matrixLength,
      position: "bottomLeft",
      pathOnly: colors.bottomLeft === "body",
      config,
      matrix
    });
  }
  return svgString;
};

// src/path/circle.ts
var generateCirclePath = ({
  i,
  j,
  cellSize,
  diameter: _diameter
}) => {
  let path = "";
  const diameter = _diameter || cellSize;
  const x = cellSize * j;
  const y = cellSize * i;
  const cx = x + cellSize / 2;
  const cy = y + cellSize / 2;
  path += `M${cx},${cy} `;
  path += `m-${diameter / 2},0 `;
  path += `a${diameter / 2},${diameter / 2} 0 1,0 ${diameter},0 `;
  path += `a${diameter / 2},${diameter / 2} 0 1,0 -${diameter},0 `;
  return path;
};
var generateRoundedPath = ({
  i,
  j,
  width: _width,
  height: _height,
  cellSize,
  roundedSide
}) => {
  const height = _height || cellSize;
  const width = _width || cellSize;
  let path = "";
  const x = cellSize * j + (cellSize - width) / 2;
  const y = cellSize * i + (cellSize - height) / 2;
  const radius = Math.min(width, height) / 2;
  let borderRadiusTopLeft = 0;
  let borderRadiusTopRight = 0;
  let borderRadiusBottomLeft = 0;
  let borderRadiusBottomRight = 0;
  switch (roundedSide) {
    case "top": {
      borderRadiusTopLeft = radius;
      borderRadiusTopRight = radius;
      break;
    }
    case "right": {
      borderRadiusTopRight = radius;
      borderRadiusBottomRight = radius;
      break;
    }
    case "bottom": {
      borderRadiusBottomLeft = radius;
      borderRadiusBottomRight = radius;
      break;
    }
    case "left": {
      borderRadiusTopLeft = radius;
      borderRadiusBottomLeft = radius;
      break;
    }
    default:
      break;
  }
  path += `M${x},${y + borderRadiusTopLeft}
  A${borderRadiusTopLeft},${borderRadiusTopLeft},0,0,1,${x + borderRadiusTopLeft},${y}
  H${x + width - borderRadiusTopRight}
  A${borderRadiusTopRight},${borderRadiusTopRight},0,0,1,${x + width},${y + borderRadiusTopRight}
  V${y + height - borderRadiusBottomRight}
  A${borderRadiusBottomRight},${borderRadiusBottomRight},0,0,1,${x + width - borderRadiusBottomRight},${y + height}
  H${x + borderRadiusBottomLeft}
  A${borderRadiusBottomLeft},${borderRadiusBottomLeft},0,0,1,${x},${y + height - borderRadiusBottomLeft}
  V${y + borderRadiusTopLeft}Z`;
  return path;
};

// src/path/generator.ts
var pathGenerator = ({
  config,
  i,
  j,
  cellSize,
  neighbors,
  isXFirst,
  isXLast,
  isYFirst,
  isYLast
}) => {
  const path = "";
  switch (config.shapes.body) {
    case "square": {
      return generateSquarePath({
        i,
        j,
        height: cellSize,
        width: cellSize,
        cellSize
      });
    }
    case "square-small": {
      return generateSquarePath({
        i,
        j,
        height: cellSize - cellSize * 0.1,
        width: cellSize - cellSize * 0.1,
        cellSize
      });
    }
    case "square-vertical": {
      return generateSquarePath({
        i,
        j,
        height: cellSize - cellSize * 0.1,
        cellSize
      });
    }
    case "square-horizontal": {
      return generateSquarePath({
        i,
        j,
        width: cellSize - cellSize * 0.1,
        cellSize
      });
    }
    case "diamond": {
      return generateDiamondPath({
        i,
        j,
        height: cellSize,
        width: cellSize,
        cellSize
      });
    }
    case "star": {
      return generateStarPath({
        i,
        j,
        height: cellSize,
        width: cellSize,
        cellSize
      });
    }
    case "star-small": {
      return generateStarPath({
        i,
        j,
        height: cellSize,
        width: cellSize,
        cellSize,
        points: 4
      });
    }
    case "circle": {
      return generateCirclePath({ i, j, cellSize });
    }
    case "circle-small": {
      return generateCirclePath({
        i,
        j,
        cellSize,
        diameter: cellSize - cellSize * 0.1
      });
    }
    case "rounded-horizontal": {
      if (!neighbors.left && !neighbors.right) {
        return generateCirclePath({
          i,
          j,
          cellSize,
          diameter: cellSize - cellSize * 0.1
        });
      }
      if (neighbors.left && neighbors.right) {
        return generateSquarePath({
          i,
          j,
          cellSize,
          height: cellSize - cellSize * 0.1,
          width: cellSize
        });
      }
      if (!neighbors.left || neighbors.right && isXFirst) {
        return generateRoundedPath({
          i,
          j,
          cellSize,
          roundedSide: "left",
          height: cellSize - cellSize * 0.1
        });
      }
      if (!neighbors.right || neighbors.left && isYLast) {
        return generateRoundedPath({
          i,
          j,
          cellSize,
          roundedSide: "right",
          height: cellSize - cellSize * 0.1
        });
      }
      break;
    }
    case "rounded-vertical": {
      if (!neighbors.top && !neighbors.bottom) {
        return generateCirclePath({
          i,
          j,
          cellSize,
          diameter: cellSize - cellSize * 0.1
        });
      }
      if (neighbors.top && neighbors.bottom) {
        return generateSquarePath({
          i,
          j,
          cellSize,
          width: cellSize - cellSize * 0.1
        });
      }
      if (!neighbors.top || neighbors.bottom && isXFirst) {
        return generateRoundedPath({
          i,
          j,
          cellSize,
          roundedSide: "top",
          width: cellSize - cellSize * 0.1
        });
      }
      if (!neighbors.bottom || neighbors.top && isXLast) {
        return generateRoundedPath({
          i,
          j,
          cellSize,
          roundedSide: "bottom",
          width: cellSize - cellSize * 0.1
        });
      }
      return path;
    }
    case "dots": {
      const x = j * cellSize;
      const y = i * cellSize;
      if (!neighbors.top && !neighbors.bottom && !neighbors.left && !neighbors.right) {
        return generateRoundedCornerEyeballPath({
          x,
          y,
          cellSize,
          length: cellSize,
          roundedCorners: ["top-left", "top-right", "bottom-left", "bottom-right"]
        });
      }
      if (!neighbors.top && !neighbors.bottom && !neighbors.left) {
        return generateTrianglePath({
          i,
          j,
          cellSize,
          direction: "left"
        });
      }
      if (!neighbors.top && !neighbors.bottom && !neighbors.right) {
        return generateTrianglePath({
          i,
          j,
          cellSize,
          direction: "right"
        });
      }
      if (!neighbors.top && !neighbors.left && !neighbors.right) {
        return generateTrianglePath({
          i,
          j,
          cellSize,
          direction: "top"
        });
      }
      if (!neighbors.bottom && !neighbors.left && !neighbors.right) {
        return generateTrianglePath({
          i,
          j,
          cellSize,
          direction: "bottom"
        });
      }
      if (!neighbors.top && !neighbors.left) {
        return generateRoundedCornerEyeballPath({
          x,
          y,
          cellSize,
          length: cellSize,
          roundedCorners: ["top-left"]
        });
      }
      if (!neighbors.top && !neighbors.right) {
        return generateRoundedCornerEyeballPath({
          x,
          y,
          cellSize,
          length: cellSize,
          roundedCorners: ["top-right"]
        });
      }
      if (!neighbors.bottom && !neighbors.left) {
        return generateRoundedCornerEyeballPath({
          x,
          y,
          cellSize,
          length: cellSize,
          roundedCorners: ["bottom-left"]
        });
      }
      if (!neighbors.bottom && !neighbors.right) {
        return generateRoundedCornerEyeballPath({
          x,
          y,
          cellSize,
          length: cellSize,
          roundedCorners: ["bottom-right"]
        });
      }
      return generateSquarePath({
        i,
        j,
        cellSize
      });
    }
    case "classy": {
      const x = j * cellSize;
      const y = i * cellSize;
      if (!neighbors.top && !neighbors.bottom && !neighbors.left && !neighbors.right) {
        return generateRoundedCornerEyeballPath({
          x,
          y,
          cellSize,
          length: cellSize,
          roundedCorners: ["top-left", "top-right", "bottom-left", "bottom-right"]
        });
      }
      if (!neighbors.top && !neighbors.bottom && !neighbors.left) {
        return generateRoundedCornerEyeballPath({
          x,
          y,
          cellSize,
          length: cellSize,
          roundedCorners: ["top-left", "bottom-left"]
        });
      }
      if (!neighbors.top && !neighbors.bottom && !neighbors.right) {
        return generateRoundedCornerEyeballPath({
          x,
          y,
          cellSize,
          length: cellSize,
          roundedCorners: ["top-right", "bottom-right"]
        });
      }
      if (!neighbors.top && !neighbors.left && !neighbors.right) {
        return generateRoundedCornerEyeballPath({
          x,
          y,
          cellSize,
          length: cellSize,
          roundedCorners: ["top-left", "top-right"]
        });
      }
      if (!neighbors.bottom && !neighbors.left && !neighbors.right) {
        return generateRoundedCornerEyeballPath({
          x,
          y,
          cellSize,
          length: cellSize,
          roundedCorners: ["bottom-left", "bottom-right"]
        });
      }
      if (!neighbors.top && !neighbors.left) {
        return generateRoundedCornerEyeballPath({
          x,
          y,
          cellSize,
          length: cellSize,
          roundedCorners: ["top-left"]
        });
      }
      if (!neighbors.top && !neighbors.right) {
        return generateRoundedCornerEyeballPath({
          x,
          y,
          cellSize,
          length: cellSize,
          roundedCorners: ["top-right"]
        });
      }
      if (!neighbors.bottom && !neighbors.left) {
        return generateRoundedCornerEyeballPath({
          x,
          y,
          cellSize,
          length: cellSize,
          roundedCorners: ["bottom-left"]
        });
      }
      if (!neighbors.bottom && !neighbors.right) {
        return generateRoundedCornerEyeballPath({
          x,
          y,
          cellSize,
          length: cellSize,
          roundedCorners: ["bottom-right"]
        });
      }
      return generateSquarePath({
        i,
        j,
        cellSize
      });
    }
    case "mosaic": {
      const x = j * cellSize;
      const y = i * cellSize;
      const hasLeftNeighbor = neighbors.left;
      const hasTopNeighbor = neighbors.top;
      const hasRightNeighbor = neighbors.right;
      const hasBottomNeighbor = neighbors.bottom;
      const cornerRadius = cellSize * 0.3;
      const corners = [];
      if (!hasTopNeighbor && !hasLeftNeighbor)
        corners.push("top-left");
      if (!hasTopNeighbor && !hasRightNeighbor)
        corners.push("top-right");
      if (!hasBottomNeighbor && !hasLeftNeighbor)
        corners.push("bottom-left");
      if (!hasBottomNeighbor && !hasRightNeighbor)
        corners.push("bottom-right");
      if (corners.length > 0) {
        return generateRoundedCornerEyeballPath({
          x,
          y,
          cellSize,
          length: cellSize,
          roundedCorners: corners
        });
      }
      return generateSquarePath({ i, j, cellSize });
    }
    case "fluid": {
      const x = j * cellSize;
      const y = i * cellSize;
      if (!neighbors.top && !neighbors.bottom && !neighbors.left && !neighbors.right) {
        return generateCirclePath({ i, j, cellSize, diameter: cellSize });
      }
      const corners = [];
      if (!neighbors.top || !neighbors.left)
        corners.push("top-left");
      if (!neighbors.top || !neighbors.right)
        corners.push("top-right");
      if (!neighbors.bottom || !neighbors.left)
        corners.push("bottom-left");
      if (!neighbors.bottom || !neighbors.right)
        corners.push("bottom-right");
      if (corners.length > 0) {
        return generateRoundedCornerEyeballPath({
          x,
          y,
          cellSize,
          length: cellSize,
          roundedCorners: corners
        });
      }
      return generateSquarePath({ i, j, cellSize });
    }
    case "edge-cut": {
      const x = j * cellSize;
      const y = i * cellSize;
      const cutSize = cellSize * 0.2;
      let path2 = `M${x + cutSize},${y}`;
      path2 += `L${x + cellSize - cutSize},${y}`;
      if (!neighbors.top && !neighbors.right) {
        path2 += `L${x + cellSize},${y}`;
      } else {
        path2 += `L${x + cellSize},${y + cutSize}`;
      }
      path2 += `L${x + cellSize},${y + cellSize - cutSize}`;
      if (!neighbors.bottom && !neighbors.right) {
        path2 += `L${x + cellSize},${y + cellSize}`;
      } else {
        path2 += `L${x + cellSize - cutSize},${y + cellSize}`;
      }
      path2 += `L${x + cutSize},${y + cellSize}`;
      if (!neighbors.bottom && !neighbors.left) {
        path2 += `L${x},${y + cellSize}`;
      } else {
        path2 += `L${x},${y + cellSize - cutSize}`;
      }
      path2 += `L${x},${y + cutSize}`;
      if (!neighbors.top && !neighbors.left) {
        path2 += `L${x},${y}`;
      } else {
        path2 += `L${x + cutSize},${y}`;
      }
      path2 += "Z";
      return path2;
    }
    case "japanese": {
      const x = j * cellSize;
      const y = i * cellSize;
      const shrink = cellSize * 0.15;
      if (!neighbors.top && !neighbors.bottom && !neighbors.left && !neighbors.right) {
        return generateCirclePath({ i, j, cellSize, diameter: cellSize - shrink });
      }
      const hasNeighbors = [neighbors.top, neighbors.bottom, neighbors.left, neighbors.right].filter(Boolean).length;
      if (hasNeighbors === 1) {
        if (neighbors.top || neighbors.bottom) {
          return generateSquarePath({
            i,
            j,
            height: cellSize,
            width: cellSize - shrink,
            cellSize
          });
        } else {
          return generateSquarePath({
            i,
            j,
            height: cellSize - shrink,
            width: cellSize,
            cellSize
          });
        }
      }
      return generateSquarePath({ i, j, cellSize });
    }
    case "hexagon": {
      return generateHexagonPath({
        i,
        j,
        height: cellSize,
        width: cellSize,
        cellSize
      });
    }
    case "wave": {
      return generateWavePath({
        i,
        j,
        height: cellSize,
        width: cellSize,
        cellSize
      });
    }
    case "leaf": {
      return generateLeafPath({
        i,
        j,
        height: cellSize,
        width: cellSize,
        cellSize
      });
    }
    case "petal": {
      return generatePetalPath({
        i,
        j,
        height: cellSize,
        width: cellSize,
        cellSize
      });
    }
    case "octagon": {
      return generateOctagonPath({
        i,
        j,
        height: cellSize,
        width: cellSize,
        cellSize
      });
    }
    case "cross": {
      return generateCrossPath({
        i,
        j,
        height: cellSize,
        width: cellSize,
        cellSize
      });
    }
    case "pill": {
      return generatePillPath({
        i,
        j,
        height: cellSize,
        width: cellSize,
        cellSize
      });
    }
    case "crystal": {
      return generateCrystalPath({
        i,
        j,
        height: cellSize,
        width: cellSize,
        cellSize
      });
    }
    case "bubble": {
      return generateBubblePath({
        i,
        j,
        height: cellSize,
        width: cellSize,
        cellSize
      });
    }
    case "tribal": {
      return generateTribalPath({
        i,
        j,
        height: cellSize,
        width: cellSize,
        cellSize
      });
    }
    case "zigzag": {
      return generateZigzagPath({
        i,
        j,
        height: cellSize,
        width: cellSize,
        cellSize
      });
    }
    case "spiral": {
      return generateSpiralPath({
        i,
        j,
        height: cellSize,
        width: cellSize,
        cellSize
      });
    }
    case "neon": {
      return generateNeonPath({
        i,
        j,
        height: cellSize,
        width: cellSize,
        cellSize
      });
    }
    case "tech": {
      return generateTechPath({
        i,
        j,
        height: cellSize,
        width: cellSize,
        cellSize
      });
    }
    default:
      return path;
  }
  return path;
};

// src/path/index.ts
var generatePath = ({
  size,
  matrix: paramMatrix,
  config,
  eyeFrameOnly,
  eyeballOnly
}) => {
  var _a, _b;
  const matrix = paramMatrix;
  const cellSize = size / matrix.length;
  const matrixLength = matrix.length;
  const eyeBallPositions = getEyeBallPositions(matrixLength);
  const eyeFramePositions = getEyeFramePositions(matrixLength);
  const logoPathPositions = getLogoPathPositions(matrixLength, (_a = config.logo) == null ? void 0 : _a.size);
  const eyeBallSet = new Set(eyeBallPositions.map(([i, j]) => `${i},${j}`));
  const eyeFrameSet = new Set(eyeFramePositions.map(([i, j]) => `${i},${j}`));
  const logoSet = new Set(logoPathPositions.map(([i, j]) => `${i},${j}`));
  let path = "";
  if ((_b = config.logo) == null ? void 0 : _b.removeBackground) {
    for (let i = 0; i < matrixLength; i++) {
      for (let j = 0; j < matrixLength; j++) {
        if (logoSet.has(`${i},${j}`)) {
          matrix[i][j] = 0;
        }
      }
    }
  }
  matrix.forEach((row, i) => {
    row.forEach((column, j) => {
      if (column) {
        const posKey = `${i},${j}`;
        if (eyeFrameSet.has(posKey)) {
          if (eyeFrameOnly) {
            const neighbors = checkNeighbors({ matrix, i, j });
            path += pathGenerator({
              config,
              i,
              j,
              isXFirst: j === 0,
              isXLast: j === matrixLength - 1,
              isYFirst: i === 0,
              isYLast: i === matrixLength - 1,
              neighbors,
              cellSize
            });
          }
          if (config.shapes.eyeFrame !== "body") {
            return;
          }
        }
        if (eyeBallSet.has(posKey)) {
          if (eyeballOnly) {
            const neighbors = checkNeighbors({ matrix, i, j });
            path += pathGenerator({
              config,
              i,
              j,
              isXFirst: j === 0,
              isXLast: j === matrixLength - 1,
              isYFirst: i === 0,
              isYLast: i === matrixLength - 1,
              neighbors,
              cellSize
            });
          }
          if (config.shapes.eyeball !== "body") {
            return;
          }
        }
        if (!eyeballOnly && !eyeFrameOnly) {
          const neighbors = checkNeighbors({ matrix, i, j });
          path += pathGenerator({
            config,
            i,
            j,
            isXFirst: j === 0,
            isXLast: j === matrixLength - 1,
            isYFirst: i === 0,
            isYLast: i === matrixLength - 1,
            neighbors,
            cellSize
          });
        }
      }
    });
  });
  if (!eyeballOnly && !eyeFrameOnly) {
    path += generateEyeFrameSVGFromConfig(config, matrix.length, matrix, true);
    path += generateEyeballSVGFromConfig(config, matrix.length, matrix, true);
  }
  return path;
};

// src/eyeball.ts
var generateRoundedEyeballPos = (cellSize, matrixLength) => ({
  topLeft: {
    x: 2 * cellSize,
    y: 2 * cellSize
  },
  topRight: {
    x: (matrixLength - 4.95) * cellSize,
    y: 2 * cellSize
  },
  bottomLeft: {
    x: 2 * cellSize,
    y: (matrixLength - 4.95) * cellSize
  }
});
var circleEyeballPath = ({ x, y, radius }) => `M${x + radius},${y}A${radius},${radius},0,1,1,${x - radius},${y},${radius},${radius},0,0,1,${x + radius},${y}Z`;
var circleEyeball = ({ matrixLength, size, position }) => {
  let path = "";
  const cellSize = size / matrixLength;
  const positions = getPositionForEyes({ matrixLength, cellSize });
  const height = cellSize * 3;
  const radius = height / 2;
  path += circleEyeballPath(__spreadProps(__spreadValues({}, positions.eyeball[position]), {
    radius
  }));
  return path;
};
var squareEyeballPath = ({ length, x, y, cellSize }) => {
  const halfSize = length / 2;
  const startX = x - halfSize - cellSize / 2;
  const startY = y - halfSize - cellSize / 2;
  const endX = x + halfSize + cellSize / 2;
  const endY = y + halfSize + cellSize / 2;
  return `
  M ${startX} ${startY}
  L ${endX} ${startY}
  L ${endX} ${endY}
  L ${startX} ${endY}
  L ${startX} ${startY}
`;
};
var squareEyeball = ({ matrixLength, size, position }) => {
  const cellSize = size / matrixLength;
  const length = cellSize * 2;
  const positions = getPositionForEyes({ matrixLength, cellSize });
  return squareEyeballPath(__spreadProps(__spreadValues({}, positions.eyeball[position]), {
    length,
    cellSize
  }));
};
var roundedEyeball = ({ matrixLength, size, position }) => {
  const cellSize = size / matrixLength;
  const length = cellSize * 3;
  const positions = generateRoundedEyeballPos(cellSize, matrixLength);
  return generateRoundedCornerEyeballPath(__spreadProps(__spreadValues({}, positions[position]), {
    length,
    cellSize,
    roundedCorners: ["top-left", "bottom-left", "top-right", "bottom-right"]
  }));
};
var styleAEyeball = ({ matrixLength, size, position }) => {
  const cellSize = size / matrixLength;
  const length = cellSize * 3;
  const positions = generateRoundedEyeballPos(cellSize, matrixLength);
  const roundedCorners = {
    topLeft: ["top-left", "top-right", "bottom-left"],
    topRight: ["top-left", "top-right", "bottom-right"],
    bottomLeft: ["top-left", "bottom-right", "bottom-left"]
  };
  return generateRoundedCornerEyeballPath(__spreadProps(__spreadValues({}, positions[position]), {
    length,
    cellSize,
    roundedCorners: roundedCorners[position]
  }));
};
var styleBEyeball = ({ matrixLength, size, position }) => {
  const cellSize = size / matrixLength;
  const length = cellSize * 3;
  const positions = generateRoundedEyeballPos(cellSize, matrixLength);
  return generateRoundedCornerEyeballPath(__spreadProps(__spreadValues({}, positions[position]), {
    length,
    cellSize,
    roundedCorners: ["top-left", "bottom-right"]
  }));
};
var styleCEyeball = ({ matrixLength, size, position }) => {
  const cellSize = size / matrixLength;
  const length = cellSize * 3;
  const positions = generateRoundedEyeballPos(cellSize, matrixLength);
  const roundedCorners = {
    topLeft: ["top-left"],
    topRight: ["top-right"],
    bottomLeft: ["bottom-left"]
  };
  return generateRoundedCornerEyeballPath(__spreadProps(__spreadValues({}, positions[position]), {
    length,
    cellSize,
    roundedCorners: roundedCorners[position]
  }));
};
var eyeballFunction = {
  square: squareEyeball,
  circle: circleEyeball,
  rounded: roundedEyeball,
  leaf: styleAEyeball,
  pointed: styleBEyeball,
  "extra-rounded": styleCEyeball
};
var generateEyeballSVG = ({
  shape,
  color,
  size,
  matrixLength,
  position,
  pathOnly,
  matrix,
  config
}) => {
  if (shape === "body") {
    return "";
  }
  if (shape.includes("body-")) {
    const bodyShape = config.shapes.eyeball.replace("body-", "");
    const path2 = generatePath({
      matrix,
      size: config.length,
      config: __spreadProps(__spreadValues({}, config), {
        shapes: __spreadProps(__spreadValues({}, config.shapes), {
          body: bodyShape
        })
      }),
      eyeballOnly: true
    });
    if (pathOnly) {
      return path2;
    }
    return `<path fill="${isGradientColor(color) ? "url(#eyeball)" : color}" d="${path2}"/>`;
  }
  const path = eyeballFunction[shape]({
    matrixLength,
    size,
    position
  });
  if (pathOnly) {
    return path;
  }
  return `<path fill="${isGradientColor(color) ? "url(#eyeball)" : color}" d="${path}"/>`;
};
var generateEyeballSVGFromConfig = (config, matrixLength, matrix, isFromBody) => {
  const shape = config.shapes.eyeball;
  const colors = config.colors.eyeball;
  let svgString = "";
  if (shape === "body") {
    return "";
  }
  if (colors.topLeft === "body" && isFromBody || colors.topLeft !== "body" && !isFromBody) {
    svgString += generateEyeballSVG({
      shape,
      color: colors.topLeft === "body" ? config.colors.body : colors.topLeft,
      size: config.length,
      matrixLength,
      position: "topLeft",
      pathOnly: colors.topLeft === "body",
      matrix,
      config
    });
  }
  if (colors.topRight === "body" && isFromBody || colors.topRight !== "body" && !isFromBody) {
    svgString += generateEyeballSVG({
      shape,
      color: colors.topRight === "body" ? config.colors.body : colors.topRight,
      size: config.length,
      matrixLength,
      position: "topRight",
      pathOnly: colors.topRight === "body",
      matrix,
      config
    });
  }
  if (colors.bottomLeft === "body" && isFromBody || colors.bottomLeft !== "body" && !isFromBody) {
    svgString += generateEyeballSVG({
      shape,
      color: colors.bottomLeft === "body" ? config.colors.body : colors.bottomLeft,
      size: config.length,
      matrixLength,
      position: "bottomLeft",
      pathOnly: colors.bottomLeft === "body",
      matrix,
      config
    });
  }
  return svgString;
};

// src/generateSVGString.ts
function isTransparent(color) {
  if (typeof color === "string") {
    const normalized = color.toLowerCase();
    return normalized === "transparent" || normalized === "none" || normalized.includes("rgba(") && normalized.includes(",0)");
  }
  return false;
}
var validateConfigInput = (input) => {
  if (!input || typeof input !== "object") {
    throw new Error("Config is required and must be an object");
  }
  const configInput = input;
  if (!configInput.value || typeof configInput.value !== "string") {
    throw new Error("Config value is required and must be a string");
  }
  if (configInput.value.length === 0) {
    throw new Error("Config value cannot be an empty string");
  }
  if (configInput.value.length > 7089) {
    throw new Error("Config value exceeds maximum QR code capacity (7089 characters)");
  }
  if (configInput.length !== void 0 && (typeof configInput.length !== "number" || configInput.length <= 0)) {
    throw new Error("Config length must be a positive number");
  }
  if (configInput.length !== void 0 && configInput.length > 1e4) {
    throw new Error("Config length is too large (maximum: 10000px)");
  }
  if (configInput.padding !== void 0 && (typeof configInput.padding !== "number" || configInput.padding < 0)) {
    throw new Error("Config padding must be a non-negative number");
  }
  if (configInput.padding !== void 0 && configInput.padding > 500) {
    throw new Error("Config padding is too large (maximum: 500px)");
  }
  return true;
};
function generateSVGString(configInput, options) {
  var _a;
  try {
    validateConfigInput(configInput);
    const config = createConfig(configInput);
    const matrix = generateMatrix(config.value, config.errorCorrectionLevel);
    const matrixLength = matrix.length;
    const cellSize = config.length / matrixLength;
    const path = cleanSVGPath(generatePath({ matrix, size: config.length, config }));
    const gradientDef = generateGradientByConfig(config);
    const logoDef = renderLogoFromConfig(config, cellSize, options == null ? void 0 : options.forReactNative);
    const defsContent = [gradientDef, logoDef].filter(Boolean).join("\n    ");
    const padding = config.padding;
    const viewBoxMinX = formatNumber(-padding);
    const viewBoxMinY = formatNumber(-padding);
    const viewBoxWidth = formatNumber(config.length + padding * 2);
    const viewBoxHeight = formatNumber(config.length + padding * 2);
    const backgroundIsGradient = isGradientColor(config.colors.background);
    const bgColorStr = isTransparent(config.colors.background) ? "none" : backgroundIsGradient ? "url(#background)" : normalizeColorValue(config.colors.background);
    const backgroundColor = validateColor(bgColorStr);
    const bodyColorStr = isGradientColor(config.colors.body) ? "url(#body)" : normalizeColorValue(config.colors.body);
    const bodyFill = validateColor(bodyColorStr);
    const svgParts = [
      (options == null ? void 0 : options.forReactNative) ? "" : `<?xml version="1.0" encoding="UTF-8"?>`,
      `<svg`,
      `  xmlns="http://www.w3.org/2000/svg"`,
      `  xmlns:xlink="http://www.w3.org/1999/xlink"`,
      (options == null ? void 0 : options.forReactNative) ? "" : `  version="1.1"`,
      `  width="${formatNumber(config.length)}"`,
      `  height="${formatNumber(config.length)}"`,
      `  viewBox="${viewBoxMinX} ${viewBoxMinY} ${viewBoxWidth} ${viewBoxHeight}"`,
      `  shape-rendering="crispEdges">`,
      defsContent ? `  <defs>
    ${defsContent}
  </defs>` : "",
      `  <rect`,
      `    x="${viewBoxMinX}"`,
      `    y="${viewBoxMinY}"`,
      `    width="${viewBoxWidth}"`,
      `    height="${viewBoxHeight}"`,
      `    fill="${backgroundColor}"/>`,
      `  <path`,
      `    fill="${bodyFill}"`,
      `    d="${path}"/>`,
      `  ${generateEyeFrameSVGFromConfig(config, matrix.length, matrix)}`,
      `  ${generateEyeballSVGFromConfig(config, matrix.length, matrix)}`,
      ((_a = config.logo) == null ? void 0 : _a.url) && !(options == null ? void 0 : options.forReactNative) ? `  <use xlink:href="#logo"/>` : "",
      `</svg>`
    ].filter((line) => line !== "").join("\n");
    const svg = svgParts;
    if (options == null ? void 0 : options.forReactNative) {
      return {
        svgString: svg,
        cellSize
      };
    }
    return svg;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to generate QR code: ${message}`);
  }
}

// src/shapePreview.ts
function generateBodyShapePreview(shape, size = 64) {
  const config = createConfig({
    value: "A",
    shapes: { body: shape },
    length: size
  });
  const gridSize = 5;
  const cellSize = size / gridSize;
  const pattern = [
    [1, 0, 1, 0, 1],
    [0, 1, 1, 1, 0],
    [1, 1, 0, 1, 1],
    [0, 1, 1, 1, 0],
    [1, 0, 1, 0, 1]
  ];
  let paths = "";
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (pattern[i][j] === 1) {
        const neighbors = {
          top: i > 0 && pattern[i - 1][j] === 1,
          bottom: i < gridSize - 1 && pattern[i + 1][j] === 1,
          left: j > 0 && pattern[i][j - 1] === 1,
          right: j < gridSize - 1 && pattern[i][j + 1] === 1
        };
        const path = pathGenerator({
          config,
          i,
          j,
          cellSize,
          neighbors,
          isXFirst: j === 0,
          isXLast: j === gridSize - 1,
          isYFirst: i === 0,
          isYLast: i === gridSize - 1
        });
        paths += path;
      }
    }
  }
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg"><path d="${paths}" fill="white"/></svg>`;
}
function generateEyeFrameShapePreview(shape, size = 64) {
  if (shape === "body") {
    return generateBodyShapePreview("square", size);
  }
  const matrixLength = 7;
  const cellSize = size / matrixLength;
  const config = createConfig({
    value: "TEST",
    shapes: {
      body: shape.includes("body-") ? shape.replace("body-", "") : "square",
      eyeFrame: shape
    },
    length: size
  });
  let paths = "";
  for (let i = 0; i < matrixLength; i++) {
    for (let j = 0; j < matrixLength; j++) {
      const isOuterBorder = i === 0 || i === matrixLength - 1 || j === 0 || j === matrixLength - 1;
      const isInnerBorder = i === 1 || i === matrixLength - 2 || j === 1 || j === matrixLength - 2;
      if (isOuterBorder || isInnerBorder) {
        if (i >= 2 && i <= 4 && j >= 2 && j <= 4) {
          continue;
        }
        const neighbors = {
          top: i > 0 && !(i === 2 && j >= 2 && j <= 4),
          bottom: i < matrixLength - 1 && !(i === 4 && j >= 2 && j <= 4),
          left: j > 0 && !(j === 2 && i >= 2 && i <= 4),
          right: j < matrixLength - 1 && !(j === 4 && i >= 2 && i <= 4)
        };
        const path = pathGenerator({
          config,
          i,
          j,
          cellSize,
          neighbors,
          isXFirst: j === 0,
          isXLast: j === matrixLength - 1,
          isYFirst: i === 0,
          isYLast: i === matrixLength - 1
        });
        paths += path;
      }
    }
  }
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg"><path d="${paths}" fill="white"/></svg>`;
}
function generateEyeballShapePreview(shape, size = 64) {
  if (shape === "body") {
    return generateBodyShapePreview("square", size);
  }
  const matrixLength = 7;
  const cellSize = size / matrixLength;
  const config = createConfig({
    value: "TEST",
    shapes: {
      body: shape.includes("body-") ? shape.replace("body-", "") : "square",
      eyeball: shape
    },
    length: size
  });
  let paths = "";
  for (let i = 2; i <= 4; i++) {
    for (let j = 2; j <= 4; j++) {
      const neighbors = {
        top: i > 2,
        bottom: i < 4,
        left: j > 2,
        right: j < 4
      };
      const path = pathGenerator({
        config,
        i,
        j,
        cellSize,
        neighbors,
        isXFirst: j === 2,
        isXLast: j === 4,
        isYFirst: i === 2,
        isYLast: i === 4
      });
      paths += path;
    }
  }
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg"><path d="${paths}" fill="white"/></svg>`;
}
function generateShapePreviewSVG(shape, type, size = 24, color = "white") {
  let path;
  switch (type) {
    case "body":
      path = generateBodyShapePreview(shape, size);
      break;
    case "eyeFrame":
      path = generateEyeFrameShapePreview(shape, size);
      break;
    case "eyeball":
      path = generateEyeballShapePreview(shape, size);
      break;
    default:
      path = "";
  }
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <path d="${path}" fill="${color}"/>
</svg>`;
}

// src/index.ts
var src_default = {
  generateSVGString,
  generateContentString
};
if (typeof window !== "undefined") {
  window.qrcode = {
    generateSVGString,
    generateContentString
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BODY_SHAPES,
  EYEBALL_SHAPES,
  EYEFRAME_SHAPES,
  cleanSVGPath,
  formatNumber,
  generateBodyShapePreview,
  generateContentString,
  generateEyeFrameShapePreview,
  generateEyeballShapePreview,
  generateSVGString,
  generateShapePreviewSVG,
  isGradientColor,
  normalizeColorValue,
  validateColor,
  validateSVG
});
//# sourceMappingURL=index.js.map