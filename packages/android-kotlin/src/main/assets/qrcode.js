"use strict";
(() => {
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
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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

  // node_modules/qrcode/lib/core/utils.js
  var require_utils = __commonJS({
    "node_modules/qrcode/lib/core/utils.js"(exports) {
      "use strict";
      var toSJISFunction;
      var CODEWORDS_COUNT = [
        0,
        // Not used
        26,
        44,
        70,
        100,
        134,
        172,
        196,
        242,
        292,
        346,
        404,
        466,
        532,
        581,
        655,
        733,
        815,
        901,
        991,
        1085,
        1156,
        1258,
        1364,
        1474,
        1588,
        1706,
        1828,
        1921,
        2051,
        2185,
        2323,
        2465,
        2611,
        2761,
        2876,
        3034,
        3196,
        3362,
        3532,
        3706
      ];
      exports.getSymbolSize = function getSymbolSize(version) {
        if (!version)
          throw new Error('"version" cannot be null or undefined');
        if (version < 1 || version > 40)
          throw new Error('"version" should be in range from 1 to 40');
        return version * 4 + 17;
      };
      exports.getSymbolTotalCodewords = function getSymbolTotalCodewords(version) {
        return CODEWORDS_COUNT[version];
      };
      exports.getBCHDigit = function(data) {
        let digit = 0;
        while (data !== 0) {
          digit++;
          data >>>= 1;
        }
        return digit;
      };
      exports.setToSJISFunction = function setToSJISFunction(f) {
        if (typeof f !== "function") {
          throw new Error('"toSJISFunc" is not a valid function.');
        }
        toSJISFunction = f;
      };
      exports.isKanjiModeEnabled = function() {
        return typeof toSJISFunction !== "undefined";
      };
      exports.toSJIS = function toSJIS(kanji) {
        return toSJISFunction(kanji);
      };
    }
  });

  // node_modules/qrcode/lib/core/error-correction-level.js
  var require_error_correction_level = __commonJS({
    "node_modules/qrcode/lib/core/error-correction-level.js"(exports) {
      "use strict";
      exports.L = { bit: 1 };
      exports.M = { bit: 0 };
      exports.Q = { bit: 3 };
      exports.H = { bit: 2 };
      function fromString(string) {
        if (typeof string !== "string") {
          throw new Error("Param is not a string");
        }
        const lcStr = string.toLowerCase();
        switch (lcStr) {
          case "l":
          case "low":
            return exports.L;
          case "m":
          case "medium":
            return exports.M;
          case "q":
          case "quartile":
            return exports.Q;
          case "h":
          case "high":
            return exports.H;
          default:
            throw new Error("Unknown EC Level: " + string);
        }
      }
      exports.isValid = function isValid(level) {
        return level && typeof level.bit !== "undefined" && level.bit >= 0 && level.bit < 4;
      };
      exports.from = function from(value, defaultValue) {
        if (exports.isValid(value)) {
          return value;
        }
        try {
          return fromString(value);
        } catch (e) {
          return defaultValue;
        }
      };
    }
  });

  // node_modules/qrcode/lib/core/bit-buffer.js
  var require_bit_buffer = __commonJS({
    "node_modules/qrcode/lib/core/bit-buffer.js"(exports, module) {
      "use strict";
      function BitBuffer() {
        this.buffer = [];
        this.length = 0;
      }
      BitBuffer.prototype = {
        get: function(index) {
          const bufIndex = Math.floor(index / 8);
          return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) === 1;
        },
        put: function(num, length) {
          for (let i = 0; i < length; i++) {
            this.putBit((num >>> length - i - 1 & 1) === 1);
          }
        },
        getLengthInBits: function() {
          return this.length;
        },
        putBit: function(bit) {
          const bufIndex = Math.floor(this.length / 8);
          if (this.buffer.length <= bufIndex) {
            this.buffer.push(0);
          }
          if (bit) {
            this.buffer[bufIndex] |= 128 >>> this.length % 8;
          }
          this.length++;
        }
      };
      module.exports = BitBuffer;
    }
  });

  // node_modules/qrcode/lib/core/bit-matrix.js
  var require_bit_matrix = __commonJS({
    "node_modules/qrcode/lib/core/bit-matrix.js"(exports, module) {
      "use strict";
      function BitMatrix(size) {
        if (!size || size < 1) {
          throw new Error("BitMatrix size must be defined and greater than 0");
        }
        this.size = size;
        this.data = new Uint8Array(size * size);
        this.reservedBit = new Uint8Array(size * size);
      }
      BitMatrix.prototype.set = function(row, col, value, reserved) {
        const index = row * this.size + col;
        this.data[index] = value;
        if (reserved)
          this.reservedBit[index] = true;
      };
      BitMatrix.prototype.get = function(row, col) {
        return this.data[row * this.size + col];
      };
      BitMatrix.prototype.xor = function(row, col, value) {
        this.data[row * this.size + col] ^= value;
      };
      BitMatrix.prototype.isReserved = function(row, col) {
        return this.reservedBit[row * this.size + col];
      };
      module.exports = BitMatrix;
    }
  });

  // node_modules/qrcode/lib/core/alignment-pattern.js
  var require_alignment_pattern = __commonJS({
    "node_modules/qrcode/lib/core/alignment-pattern.js"(exports) {
      "use strict";
      var getSymbolSize = require_utils().getSymbolSize;
      exports.getRowColCoords = function getRowColCoords(version) {
        if (version === 1)
          return [];
        const posCount = Math.floor(version / 7) + 2;
        const size = getSymbolSize(version);
        const intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2;
        const positions = [size - 7];
        for (let i = 1; i < posCount - 1; i++) {
          positions[i] = positions[i - 1] - intervals;
        }
        positions.push(6);
        return positions.reverse();
      };
      exports.getPositions = function getPositions2(version) {
        const coords = [];
        const pos = exports.getRowColCoords(version);
        const posLength = pos.length;
        for (let i = 0; i < posLength; i++) {
          for (let j = 0; j < posLength; j++) {
            if (i === 0 && j === 0 || // top-left
            i === 0 && j === posLength - 1 || // bottom-left
            i === posLength - 1 && j === 0) {
              continue;
            }
            coords.push([pos[i], pos[j]]);
          }
        }
        return coords;
      };
    }
  });

  // node_modules/qrcode/lib/core/finder-pattern.js
  var require_finder_pattern = __commonJS({
    "node_modules/qrcode/lib/core/finder-pattern.js"(exports) {
      "use strict";
      var getSymbolSize = require_utils().getSymbolSize;
      var FINDER_PATTERN_SIZE = 7;
      exports.getPositions = function getPositions2(version) {
        const size = getSymbolSize(version);
        return [
          // top-left
          [0, 0],
          // top-right
          [size - FINDER_PATTERN_SIZE, 0],
          // bottom-left
          [0, size - FINDER_PATTERN_SIZE]
        ];
      };
    }
  });

  // node_modules/qrcode/lib/core/mask-pattern.js
  var require_mask_pattern = __commonJS({
    "node_modules/qrcode/lib/core/mask-pattern.js"(exports) {
      "use strict";
      exports.Patterns = {
        PATTERN000: 0,
        PATTERN001: 1,
        PATTERN010: 2,
        PATTERN011: 3,
        PATTERN100: 4,
        PATTERN101: 5,
        PATTERN110: 6,
        PATTERN111: 7
      };
      var PenaltyScores = {
        N1: 3,
        N2: 3,
        N3: 40,
        N4: 10
      };
      exports.isValid = function isValid(mask) {
        return mask != null && mask !== "" && !isNaN(mask) && mask >= 0 && mask <= 7;
      };
      exports.from = function from(value) {
        return exports.isValid(value) ? parseInt(value, 10) : void 0;
      };
      exports.getPenaltyN1 = function getPenaltyN1(data) {
        const size = data.size;
        let points = 0;
        let sameCountCol = 0;
        let sameCountRow = 0;
        let lastCol = null;
        let lastRow = null;
        for (let row = 0; row < size; row++) {
          sameCountCol = sameCountRow = 0;
          lastCol = lastRow = null;
          for (let col = 0; col < size; col++) {
            let module2 = data.get(row, col);
            if (module2 === lastCol) {
              sameCountCol++;
            } else {
              if (sameCountCol >= 5)
                points += PenaltyScores.N1 + (sameCountCol - 5);
              lastCol = module2;
              sameCountCol = 1;
            }
            module2 = data.get(col, row);
            if (module2 === lastRow) {
              sameCountRow++;
            } else {
              if (sameCountRow >= 5)
                points += PenaltyScores.N1 + (sameCountRow - 5);
              lastRow = module2;
              sameCountRow = 1;
            }
          }
          if (sameCountCol >= 5)
            points += PenaltyScores.N1 + (sameCountCol - 5);
          if (sameCountRow >= 5)
            points += PenaltyScores.N1 + (sameCountRow - 5);
        }
        return points;
      };
      exports.getPenaltyN2 = function getPenaltyN2(data) {
        const size = data.size;
        let points = 0;
        for (let row = 0; row < size - 1; row++) {
          for (let col = 0; col < size - 1; col++) {
            const last = data.get(row, col) + data.get(row, col + 1) + data.get(row + 1, col) + data.get(row + 1, col + 1);
            if (last === 4 || last === 0)
              points++;
          }
        }
        return points * PenaltyScores.N2;
      };
      exports.getPenaltyN3 = function getPenaltyN3(data) {
        const size = data.size;
        let points = 0;
        let bitsCol = 0;
        let bitsRow = 0;
        for (let row = 0; row < size; row++) {
          bitsCol = bitsRow = 0;
          for (let col = 0; col < size; col++) {
            bitsCol = bitsCol << 1 & 2047 | data.get(row, col);
            if (col >= 10 && (bitsCol === 1488 || bitsCol === 93))
              points++;
            bitsRow = bitsRow << 1 & 2047 | data.get(col, row);
            if (col >= 10 && (bitsRow === 1488 || bitsRow === 93))
              points++;
          }
        }
        return points * PenaltyScores.N3;
      };
      exports.getPenaltyN4 = function getPenaltyN4(data) {
        let darkCount = 0;
        const modulesCount = data.data.length;
        for (let i = 0; i < modulesCount; i++)
          darkCount += data.data[i];
        const k = Math.abs(Math.ceil(darkCount * 100 / modulesCount / 5) - 10);
        return k * PenaltyScores.N4;
      };
      function getMaskAt(maskPattern, i, j) {
        switch (maskPattern) {
          case exports.Patterns.PATTERN000:
            return (i + j) % 2 === 0;
          case exports.Patterns.PATTERN001:
            return i % 2 === 0;
          case exports.Patterns.PATTERN010:
            return j % 3 === 0;
          case exports.Patterns.PATTERN011:
            return (i + j) % 3 === 0;
          case exports.Patterns.PATTERN100:
            return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;
          case exports.Patterns.PATTERN101:
            return i * j % 2 + i * j % 3 === 0;
          case exports.Patterns.PATTERN110:
            return (i * j % 2 + i * j % 3) % 2 === 0;
          case exports.Patterns.PATTERN111:
            return (i * j % 3 + (i + j) % 2) % 2 === 0;
          default:
            throw new Error("bad maskPattern:" + maskPattern);
        }
      }
      exports.applyMask = function applyMask(pattern, data) {
        const size = data.size;
        for (let col = 0; col < size; col++) {
          for (let row = 0; row < size; row++) {
            if (data.isReserved(row, col))
              continue;
            data.xor(row, col, getMaskAt(pattern, row, col));
          }
        }
      };
      exports.getBestMask = function getBestMask(data, setupFormatFunc) {
        const numPatterns = Object.keys(exports.Patterns).length;
        let bestPattern = 0;
        let lowerPenalty = Infinity;
        for (let p = 0; p < numPatterns; p++) {
          setupFormatFunc(p);
          exports.applyMask(p, data);
          const penalty = exports.getPenaltyN1(data) + exports.getPenaltyN2(data) + exports.getPenaltyN3(data) + exports.getPenaltyN4(data);
          exports.applyMask(p, data);
          if (penalty < lowerPenalty) {
            lowerPenalty = penalty;
            bestPattern = p;
          }
        }
        return bestPattern;
      };
    }
  });

  // node_modules/qrcode/lib/core/error-correction-code.js
  var require_error_correction_code = __commonJS({
    "node_modules/qrcode/lib/core/error-correction-code.js"(exports) {
      "use strict";
      var ECLevel = require_error_correction_level();
      var EC_BLOCKS_TABLE = [
        // L  M  Q  H
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        2,
        2,
        1,
        2,
        2,
        4,
        1,
        2,
        4,
        4,
        2,
        4,
        4,
        4,
        2,
        4,
        6,
        5,
        2,
        4,
        6,
        6,
        2,
        5,
        8,
        8,
        4,
        5,
        8,
        8,
        4,
        5,
        8,
        11,
        4,
        8,
        10,
        11,
        4,
        9,
        12,
        16,
        4,
        9,
        16,
        16,
        6,
        10,
        12,
        18,
        6,
        10,
        17,
        16,
        6,
        11,
        16,
        19,
        6,
        13,
        18,
        21,
        7,
        14,
        21,
        25,
        8,
        16,
        20,
        25,
        8,
        17,
        23,
        25,
        9,
        17,
        23,
        34,
        9,
        18,
        25,
        30,
        10,
        20,
        27,
        32,
        12,
        21,
        29,
        35,
        12,
        23,
        34,
        37,
        12,
        25,
        34,
        40,
        13,
        26,
        35,
        42,
        14,
        28,
        38,
        45,
        15,
        29,
        40,
        48,
        16,
        31,
        43,
        51,
        17,
        33,
        45,
        54,
        18,
        35,
        48,
        57,
        19,
        37,
        51,
        60,
        19,
        38,
        53,
        63,
        20,
        40,
        56,
        66,
        21,
        43,
        59,
        70,
        22,
        45,
        62,
        74,
        24,
        47,
        65,
        77,
        25,
        49,
        68,
        81
      ];
      var EC_CODEWORDS_TABLE = [
        // L  M  Q  H
        7,
        10,
        13,
        17,
        10,
        16,
        22,
        28,
        15,
        26,
        36,
        44,
        20,
        36,
        52,
        64,
        26,
        48,
        72,
        88,
        36,
        64,
        96,
        112,
        40,
        72,
        108,
        130,
        48,
        88,
        132,
        156,
        60,
        110,
        160,
        192,
        72,
        130,
        192,
        224,
        80,
        150,
        224,
        264,
        96,
        176,
        260,
        308,
        104,
        198,
        288,
        352,
        120,
        216,
        320,
        384,
        132,
        240,
        360,
        432,
        144,
        280,
        408,
        480,
        168,
        308,
        448,
        532,
        180,
        338,
        504,
        588,
        196,
        364,
        546,
        650,
        224,
        416,
        600,
        700,
        224,
        442,
        644,
        750,
        252,
        476,
        690,
        816,
        270,
        504,
        750,
        900,
        300,
        560,
        810,
        960,
        312,
        588,
        870,
        1050,
        336,
        644,
        952,
        1110,
        360,
        700,
        1020,
        1200,
        390,
        728,
        1050,
        1260,
        420,
        784,
        1140,
        1350,
        450,
        812,
        1200,
        1440,
        480,
        868,
        1290,
        1530,
        510,
        924,
        1350,
        1620,
        540,
        980,
        1440,
        1710,
        570,
        1036,
        1530,
        1800,
        570,
        1064,
        1590,
        1890,
        600,
        1120,
        1680,
        1980,
        630,
        1204,
        1770,
        2100,
        660,
        1260,
        1860,
        2220,
        720,
        1316,
        1950,
        2310,
        750,
        1372,
        2040,
        2430
      ];
      exports.getBlocksCount = function getBlocksCount(version, errorCorrectionLevel) {
        switch (errorCorrectionLevel) {
          case ECLevel.L:
            return EC_BLOCKS_TABLE[(version - 1) * 4 + 0];
          case ECLevel.M:
            return EC_BLOCKS_TABLE[(version - 1) * 4 + 1];
          case ECLevel.Q:
            return EC_BLOCKS_TABLE[(version - 1) * 4 + 2];
          case ECLevel.H:
            return EC_BLOCKS_TABLE[(version - 1) * 4 + 3];
          default:
            return void 0;
        }
      };
      exports.getTotalCodewordsCount = function getTotalCodewordsCount(version, errorCorrectionLevel) {
        switch (errorCorrectionLevel) {
          case ECLevel.L:
            return EC_CODEWORDS_TABLE[(version - 1) * 4 + 0];
          case ECLevel.M:
            return EC_CODEWORDS_TABLE[(version - 1) * 4 + 1];
          case ECLevel.Q:
            return EC_CODEWORDS_TABLE[(version - 1) * 4 + 2];
          case ECLevel.H:
            return EC_CODEWORDS_TABLE[(version - 1) * 4 + 3];
          default:
            return void 0;
        }
      };
    }
  });

  // node_modules/qrcode/lib/core/galois-field.js
  var require_galois_field = __commonJS({
    "node_modules/qrcode/lib/core/galois-field.js"(exports) {
      "use strict";
      var EXP_TABLE = new Uint8Array(512);
      var LOG_TABLE = new Uint8Array(256);
      (function initTables() {
        let x = 1;
        for (let i = 0; i < 255; i++) {
          EXP_TABLE[i] = x;
          LOG_TABLE[x] = i;
          x <<= 1;
          if (x & 256) {
            x ^= 285;
          }
        }
        for (let i = 255; i < 512; i++) {
          EXP_TABLE[i] = EXP_TABLE[i - 255];
        }
      })();
      exports.log = function log(n) {
        if (n < 1)
          throw new Error("log(" + n + ")");
        return LOG_TABLE[n];
      };
      exports.exp = function exp(n) {
        return EXP_TABLE[n];
      };
      exports.mul = function mul(x, y) {
        if (x === 0 || y === 0)
          return 0;
        return EXP_TABLE[LOG_TABLE[x] + LOG_TABLE[y]];
      };
    }
  });

  // node_modules/qrcode/lib/core/polynomial.js
  var require_polynomial = __commonJS({
    "node_modules/qrcode/lib/core/polynomial.js"(exports) {
      "use strict";
      var GF = require_galois_field();
      exports.mul = function mul(p1, p2) {
        const coeff = new Uint8Array(p1.length + p2.length - 1);
        for (let i = 0; i < p1.length; i++) {
          for (let j = 0; j < p2.length; j++) {
            coeff[i + j] ^= GF.mul(p1[i], p2[j]);
          }
        }
        return coeff;
      };
      exports.mod = function mod(divident, divisor) {
        let result = new Uint8Array(divident);
        while (result.length - divisor.length >= 0) {
          const coeff = result[0];
          for (let i = 0; i < divisor.length; i++) {
            result[i] ^= GF.mul(divisor[i], coeff);
          }
          let offset = 0;
          while (offset < result.length && result[offset] === 0)
            offset++;
          result = result.slice(offset);
        }
        return result;
      };
      exports.generateECPolynomial = function generateECPolynomial(degree) {
        let poly = new Uint8Array([1]);
        for (let i = 0; i < degree; i++) {
          poly = exports.mul(poly, new Uint8Array([1, GF.exp(i)]));
        }
        return poly;
      };
    }
  });

  // node_modules/qrcode/lib/core/reed-solomon-encoder.js
  var require_reed_solomon_encoder = __commonJS({
    "node_modules/qrcode/lib/core/reed-solomon-encoder.js"(exports, module) {
      "use strict";
      var Polynomial = require_polynomial();
      function ReedSolomonEncoder(degree) {
        this.genPoly = void 0;
        this.degree = degree;
        if (this.degree)
          this.initialize(this.degree);
      }
      ReedSolomonEncoder.prototype.initialize = function initialize(degree) {
        this.degree = degree;
        this.genPoly = Polynomial.generateECPolynomial(this.degree);
      };
      ReedSolomonEncoder.prototype.encode = function encode(data) {
        if (!this.genPoly) {
          throw new Error("Encoder not initialized");
        }
        const paddedData = new Uint8Array(data.length + this.degree);
        paddedData.set(data);
        const remainder = Polynomial.mod(paddedData, this.genPoly);
        const start = this.degree - remainder.length;
        if (start > 0) {
          const buff = new Uint8Array(this.degree);
          buff.set(remainder, start);
          return buff;
        }
        return remainder;
      };
      module.exports = ReedSolomonEncoder;
    }
  });

  // node_modules/qrcode/lib/core/version-check.js
  var require_version_check = __commonJS({
    "node_modules/qrcode/lib/core/version-check.js"(exports) {
      "use strict";
      exports.isValid = function isValid(version) {
        return !isNaN(version) && version >= 1 && version <= 40;
      };
    }
  });

  // node_modules/qrcode/lib/core/regex.js
  var require_regex = __commonJS({
    "node_modules/qrcode/lib/core/regex.js"(exports) {
      "use strict";
      var numeric = "[0-9]+";
      var alphanumeric = "[A-Z $%*+\\-./:]+";
      var kanji = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
      kanji = kanji.replace(/u/g, "\\u");
      var byte = "(?:(?![A-Z0-9 $%*+\\-./:]|" + kanji + ")(?:.|[\r\n]))+";
      exports.KANJI = new RegExp(kanji, "g");
      exports.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g");
      exports.BYTE = new RegExp(byte, "g");
      exports.NUMERIC = new RegExp(numeric, "g");
      exports.ALPHANUMERIC = new RegExp(alphanumeric, "g");
      var TEST_KANJI = new RegExp("^" + kanji + "$");
      var TEST_NUMERIC = new RegExp("^" + numeric + "$");
      var TEST_ALPHANUMERIC = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
      exports.testKanji = function testKanji(str) {
        return TEST_KANJI.test(str);
      };
      exports.testNumeric = function testNumeric(str) {
        return TEST_NUMERIC.test(str);
      };
      exports.testAlphanumeric = function testAlphanumeric(str) {
        return TEST_ALPHANUMERIC.test(str);
      };
    }
  });

  // node_modules/qrcode/lib/core/mode.js
  var require_mode = __commonJS({
    "node_modules/qrcode/lib/core/mode.js"(exports) {
      "use strict";
      var VersionCheck = require_version_check();
      var Regex = require_regex();
      exports.NUMERIC = {
        id: "Numeric",
        bit: 1 << 0,
        ccBits: [10, 12, 14]
      };
      exports.ALPHANUMERIC = {
        id: "Alphanumeric",
        bit: 1 << 1,
        ccBits: [9, 11, 13]
      };
      exports.BYTE = {
        id: "Byte",
        bit: 1 << 2,
        ccBits: [8, 16, 16]
      };
      exports.KANJI = {
        id: "Kanji",
        bit: 1 << 3,
        ccBits: [8, 10, 12]
      };
      exports.MIXED = {
        bit: -1
      };
      exports.getCharCountIndicator = function getCharCountIndicator(mode, version) {
        if (!mode.ccBits)
          throw new Error("Invalid mode: " + mode);
        if (!VersionCheck.isValid(version)) {
          throw new Error("Invalid version: " + version);
        }
        if (version >= 1 && version < 10)
          return mode.ccBits[0];
        else if (version < 27)
          return mode.ccBits[1];
        return mode.ccBits[2];
      };
      exports.getBestModeForData = function getBestModeForData(dataStr) {
        if (Regex.testNumeric(dataStr))
          return exports.NUMERIC;
        else if (Regex.testAlphanumeric(dataStr))
          return exports.ALPHANUMERIC;
        else if (Regex.testKanji(dataStr))
          return exports.KANJI;
        else
          return exports.BYTE;
      };
      exports.toString = function toString(mode) {
        if (mode && mode.id)
          return mode.id;
        throw new Error("Invalid mode");
      };
      exports.isValid = function isValid(mode) {
        return mode && mode.bit && mode.ccBits;
      };
      function fromString(string) {
        if (typeof string !== "string") {
          throw new Error("Param is not a string");
        }
        const lcStr = string.toLowerCase();
        switch (lcStr) {
          case "numeric":
            return exports.NUMERIC;
          case "alphanumeric":
            return exports.ALPHANUMERIC;
          case "kanji":
            return exports.KANJI;
          case "byte":
            return exports.BYTE;
          default:
            throw new Error("Unknown mode: " + string);
        }
      }
      exports.from = function from(value, defaultValue) {
        if (exports.isValid(value)) {
          return value;
        }
        try {
          return fromString(value);
        } catch (e) {
          return defaultValue;
        }
      };
    }
  });

  // node_modules/qrcode/lib/core/version.js
  var require_version = __commonJS({
    "node_modules/qrcode/lib/core/version.js"(exports) {
      "use strict";
      var Utils = require_utils();
      var ECCode = require_error_correction_code();
      var ECLevel = require_error_correction_level();
      var Mode = require_mode();
      var VersionCheck = require_version_check();
      var G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
      var G18_BCH = Utils.getBCHDigit(G18);
      function getBestVersionForDataLength(mode, length, errorCorrectionLevel) {
        for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
          if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, mode)) {
            return currentVersion;
          }
        }
        return void 0;
      }
      function getReservedBitsCount(mode, version) {
        return Mode.getCharCountIndicator(mode, version) + 4;
      }
      function getTotalBitsFromDataArray(segments, version) {
        let totalBits = 0;
        segments.forEach(function(data) {
          const reservedBits = getReservedBitsCount(data.mode, version);
          totalBits += reservedBits + data.getBitsLength();
        });
        return totalBits;
      }
      function getBestVersionForMixedData(segments, errorCorrectionLevel) {
        for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
          const length = getTotalBitsFromDataArray(segments, currentVersion);
          if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, Mode.MIXED)) {
            return currentVersion;
          }
        }
        return void 0;
      }
      exports.from = function from(value, defaultValue) {
        if (VersionCheck.isValid(value)) {
          return parseInt(value, 10);
        }
        return defaultValue;
      };
      exports.getCapacity = function getCapacity(version, errorCorrectionLevel, mode) {
        if (!VersionCheck.isValid(version)) {
          throw new Error("Invalid QR Code version");
        }
        if (typeof mode === "undefined")
          mode = Mode.BYTE;
        const totalCodewords = Utils.getSymbolTotalCodewords(version);
        const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
        const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
        if (mode === Mode.MIXED)
          return dataTotalCodewordsBits;
        const usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode, version);
        switch (mode) {
          case Mode.NUMERIC:
            return Math.floor(usableBits / 10 * 3);
          case Mode.ALPHANUMERIC:
            return Math.floor(usableBits / 11 * 2);
          case Mode.KANJI:
            return Math.floor(usableBits / 13);
          case Mode.BYTE:
          default:
            return Math.floor(usableBits / 8);
        }
      };
      exports.getBestVersionForData = function getBestVersionForData(data, errorCorrectionLevel) {
        let seg;
        const ecl = ECLevel.from(errorCorrectionLevel, ECLevel.M);
        if (Array.isArray(data)) {
          if (data.length > 1) {
            return getBestVersionForMixedData(data, ecl);
          }
          if (data.length === 0) {
            return 1;
          }
          seg = data[0];
        } else {
          seg = data;
        }
        return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl);
      };
      exports.getEncodedBits = function getEncodedBits(version) {
        if (!VersionCheck.isValid(version) || version < 7) {
          throw new Error("Invalid QR Code version");
        }
        let d = version << 12;
        while (Utils.getBCHDigit(d) - G18_BCH >= 0) {
          d ^= G18 << Utils.getBCHDigit(d) - G18_BCH;
        }
        return version << 12 | d;
      };
    }
  });

  // node_modules/qrcode/lib/core/format-info.js
  var require_format_info = __commonJS({
    "node_modules/qrcode/lib/core/format-info.js"(exports) {
      "use strict";
      var Utils = require_utils();
      var G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
      var G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;
      var G15_BCH = Utils.getBCHDigit(G15);
      exports.getEncodedBits = function getEncodedBits(errorCorrectionLevel, mask) {
        const data = errorCorrectionLevel.bit << 3 | mask;
        let d = data << 10;
        while (Utils.getBCHDigit(d) - G15_BCH >= 0) {
          d ^= G15 << Utils.getBCHDigit(d) - G15_BCH;
        }
        return (data << 10 | d) ^ G15_MASK;
      };
    }
  });

  // node_modules/qrcode/lib/core/numeric-data.js
  var require_numeric_data = __commonJS({
    "node_modules/qrcode/lib/core/numeric-data.js"(exports, module) {
      "use strict";
      var Mode = require_mode();
      function NumericData(data) {
        this.mode = Mode.NUMERIC;
        this.data = data.toString();
      }
      NumericData.getBitsLength = function getBitsLength(length) {
        return 10 * Math.floor(length / 3) + (length % 3 ? length % 3 * 3 + 1 : 0);
      };
      NumericData.prototype.getLength = function getLength() {
        return this.data.length;
      };
      NumericData.prototype.getBitsLength = function getBitsLength() {
        return NumericData.getBitsLength(this.data.length);
      };
      NumericData.prototype.write = function write(bitBuffer) {
        let i, group, value;
        for (i = 0; i + 3 <= this.data.length; i += 3) {
          group = this.data.substr(i, 3);
          value = parseInt(group, 10);
          bitBuffer.put(value, 10);
        }
        const remainingNum = this.data.length - i;
        if (remainingNum > 0) {
          group = this.data.substr(i);
          value = parseInt(group, 10);
          bitBuffer.put(value, remainingNum * 3 + 1);
        }
      };
      module.exports = NumericData;
    }
  });

  // node_modules/qrcode/lib/core/alphanumeric-data.js
  var require_alphanumeric_data = __commonJS({
    "node_modules/qrcode/lib/core/alphanumeric-data.js"(exports, module) {
      "use strict";
      var Mode = require_mode();
      var ALPHA_NUM_CHARS = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        " ",
        "$",
        "%",
        "*",
        "+",
        "-",
        ".",
        "/",
        ":"
      ];
      function AlphanumericData(data) {
        this.mode = Mode.ALPHANUMERIC;
        this.data = data;
      }
      AlphanumericData.getBitsLength = function getBitsLength(length) {
        return 11 * Math.floor(length / 2) + 6 * (length % 2);
      };
      AlphanumericData.prototype.getLength = function getLength() {
        return this.data.length;
      };
      AlphanumericData.prototype.getBitsLength = function getBitsLength() {
        return AlphanumericData.getBitsLength(this.data.length);
      };
      AlphanumericData.prototype.write = function write(bitBuffer) {
        let i;
        for (i = 0; i + 2 <= this.data.length; i += 2) {
          let value = ALPHA_NUM_CHARS.indexOf(this.data[i]) * 45;
          value += ALPHA_NUM_CHARS.indexOf(this.data[i + 1]);
          bitBuffer.put(value, 11);
        }
        if (this.data.length % 2) {
          bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i]), 6);
        }
      };
      module.exports = AlphanumericData;
    }
  });

  // node_modules/encode-utf8/index.js
  var require_encode_utf8 = __commonJS({
    "node_modules/encode-utf8/index.js"(exports, module) {
      "use strict";
      module.exports = function encodeUtf8(input) {
        var result = [];
        var size = input.length;
        for (var index = 0; index < size; index++) {
          var point = input.charCodeAt(index);
          if (point >= 55296 && point <= 56319 && size > index + 1) {
            var second = input.charCodeAt(index + 1);
            if (second >= 56320 && second <= 57343) {
              point = (point - 55296) * 1024 + second - 56320 + 65536;
              index += 1;
            }
          }
          if (point < 128) {
            result.push(point);
            continue;
          }
          if (point < 2048) {
            result.push(point >> 6 | 192);
            result.push(point & 63 | 128);
            continue;
          }
          if (point < 55296 || point >= 57344 && point < 65536) {
            result.push(point >> 12 | 224);
            result.push(point >> 6 & 63 | 128);
            result.push(point & 63 | 128);
            continue;
          }
          if (point >= 65536 && point <= 1114111) {
            result.push(point >> 18 | 240);
            result.push(point >> 12 & 63 | 128);
            result.push(point >> 6 & 63 | 128);
            result.push(point & 63 | 128);
            continue;
          }
          result.push(239, 191, 189);
        }
        return new Uint8Array(result).buffer;
      };
    }
  });

  // node_modules/qrcode/lib/core/byte-data.js
  var require_byte_data = __commonJS({
    "node_modules/qrcode/lib/core/byte-data.js"(exports, module) {
      "use strict";
      var encodeUtf8 = require_encode_utf8();
      var Mode = require_mode();
      function ByteData(data) {
        this.mode = Mode.BYTE;
        if (typeof data === "string") {
          data = encodeUtf8(data);
        }
        this.data = new Uint8Array(data);
      }
      ByteData.getBitsLength = function getBitsLength(length) {
        return length * 8;
      };
      ByteData.prototype.getLength = function getLength() {
        return this.data.length;
      };
      ByteData.prototype.getBitsLength = function getBitsLength() {
        return ByteData.getBitsLength(this.data.length);
      };
      ByteData.prototype.write = function(bitBuffer) {
        for (let i = 0, l = this.data.length; i < l; i++) {
          bitBuffer.put(this.data[i], 8);
        }
      };
      module.exports = ByteData;
    }
  });

  // node_modules/qrcode/lib/core/kanji-data.js
  var require_kanji_data = __commonJS({
    "node_modules/qrcode/lib/core/kanji-data.js"(exports, module) {
      "use strict";
      var Mode = require_mode();
      var Utils = require_utils();
      function KanjiData(data) {
        this.mode = Mode.KANJI;
        this.data = data;
      }
      KanjiData.getBitsLength = function getBitsLength(length) {
        return length * 13;
      };
      KanjiData.prototype.getLength = function getLength() {
        return this.data.length;
      };
      KanjiData.prototype.getBitsLength = function getBitsLength() {
        return KanjiData.getBitsLength(this.data.length);
      };
      KanjiData.prototype.write = function(bitBuffer) {
        let i;
        for (i = 0; i < this.data.length; i++) {
          let value = Utils.toSJIS(this.data[i]);
          if (value >= 33088 && value <= 40956) {
            value -= 33088;
          } else if (value >= 57408 && value <= 60351) {
            value -= 49472;
          } else {
            throw new Error(
              "Invalid SJIS character: " + this.data[i] + "\nMake sure your charset is UTF-8"
            );
          }
          value = (value >>> 8 & 255) * 192 + (value & 255);
          bitBuffer.put(value, 13);
        }
      };
      module.exports = KanjiData;
    }
  });

  // node_modules/dijkstrajs/dijkstra.js
  var require_dijkstra = __commonJS({
    "node_modules/dijkstrajs/dijkstra.js"(exports, module) {
      "use strict";
      var dijkstra = {
        single_source_shortest_paths: function(graph, s, d) {
          var predecessors = {};
          var costs = {};
          costs[s] = 0;
          var open = dijkstra.PriorityQueue.make();
          open.push(s, 0);
          var closest, u, v, cost_of_s_to_u, adjacent_nodes, cost_of_e, cost_of_s_to_u_plus_cost_of_e, cost_of_s_to_v, first_visit;
          while (!open.empty()) {
            closest = open.pop();
            u = closest.value;
            cost_of_s_to_u = closest.cost;
            adjacent_nodes = graph[u] || {};
            for (v in adjacent_nodes) {
              if (adjacent_nodes.hasOwnProperty(v)) {
                cost_of_e = adjacent_nodes[v];
                cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;
                cost_of_s_to_v = costs[v];
                first_visit = typeof costs[v] === "undefined";
                if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
                  costs[v] = cost_of_s_to_u_plus_cost_of_e;
                  open.push(v, cost_of_s_to_u_plus_cost_of_e);
                  predecessors[v] = u;
                }
              }
            }
          }
          if (typeof d !== "undefined" && typeof costs[d] === "undefined") {
            var msg = ["Could not find a path from ", s, " to ", d, "."].join("");
            throw new Error(msg);
          }
          return predecessors;
        },
        extract_shortest_path_from_predecessor_list: function(predecessors, d) {
          var nodes = [];
          var u = d;
          var predecessor;
          while (u) {
            nodes.push(u);
            predecessor = predecessors[u];
            u = predecessors[u];
          }
          nodes.reverse();
          return nodes;
        },
        find_path: function(graph, s, d) {
          var predecessors = dijkstra.single_source_shortest_paths(graph, s, d);
          return dijkstra.extract_shortest_path_from_predecessor_list(
            predecessors,
            d
          );
        },
        /**
         * A very naive priority queue implementation.
         */
        PriorityQueue: {
          make: function(opts) {
            var T = dijkstra.PriorityQueue, t = {}, key;
            opts = opts || {};
            for (key in T) {
              if (T.hasOwnProperty(key)) {
                t[key] = T[key];
              }
            }
            t.queue = [];
            t.sorter = opts.sorter || T.default_sorter;
            return t;
          },
          default_sorter: function(a, b) {
            return a.cost - b.cost;
          },
          /**
           * Add a new item to the queue and ensure the highest priority element
           * is at the front of the queue.
           */
          push: function(value, cost) {
            var item = { value, cost };
            this.queue.push(item);
            this.queue.sort(this.sorter);
          },
          /**
           * Return the highest priority element in the queue.
           */
          pop: function() {
            return this.queue.shift();
          },
          empty: function() {
            return this.queue.length === 0;
          }
        }
      };
      if (typeof module !== "undefined") {
        module.exports = dijkstra;
      }
    }
  });

  // node_modules/qrcode/lib/core/segments.js
  var require_segments = __commonJS({
    "node_modules/qrcode/lib/core/segments.js"(exports) {
      "use strict";
      var Mode = require_mode();
      var NumericData = require_numeric_data();
      var AlphanumericData = require_alphanumeric_data();
      var ByteData = require_byte_data();
      var KanjiData = require_kanji_data();
      var Regex = require_regex();
      var Utils = require_utils();
      var dijkstra = require_dijkstra();
      function getStringByteLength(str) {
        return unescape(encodeURIComponent(str)).length;
      }
      function getSegments(regex, mode, str) {
        const segments = [];
        let result;
        while ((result = regex.exec(str)) !== null) {
          segments.push({
            data: result[0],
            index: result.index,
            mode,
            length: result[0].length
          });
        }
        return segments;
      }
      function getSegmentsFromString(dataStr) {
        const numSegs = getSegments(Regex.NUMERIC, Mode.NUMERIC, dataStr);
        const alphaNumSegs = getSegments(Regex.ALPHANUMERIC, Mode.ALPHANUMERIC, dataStr);
        let byteSegs;
        let kanjiSegs;
        if (Utils.isKanjiModeEnabled()) {
          byteSegs = getSegments(Regex.BYTE, Mode.BYTE, dataStr);
          kanjiSegs = getSegments(Regex.KANJI, Mode.KANJI, dataStr);
        } else {
          byteSegs = getSegments(Regex.BYTE_KANJI, Mode.BYTE, dataStr);
          kanjiSegs = [];
        }
        const segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs);
        return segs.sort(function(s1, s2) {
          return s1.index - s2.index;
        }).map(function(obj) {
          return {
            data: obj.data,
            mode: obj.mode,
            length: obj.length
          };
        });
      }
      function getSegmentBitsLength(length, mode) {
        switch (mode) {
          case Mode.NUMERIC:
            return NumericData.getBitsLength(length);
          case Mode.ALPHANUMERIC:
            return AlphanumericData.getBitsLength(length);
          case Mode.KANJI:
            return KanjiData.getBitsLength(length);
          case Mode.BYTE:
            return ByteData.getBitsLength(length);
        }
      }
      function mergeSegments(segs) {
        return segs.reduce(function(acc, curr) {
          const prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null;
          if (prevSeg && prevSeg.mode === curr.mode) {
            acc[acc.length - 1].data += curr.data;
            return acc;
          }
          acc.push(curr);
          return acc;
        }, []);
      }
      function buildNodes(segs) {
        const nodes = [];
        for (let i = 0; i < segs.length; i++) {
          const seg = segs[i];
          switch (seg.mode) {
            case Mode.NUMERIC:
              nodes.push([
                seg,
                { data: seg.data, mode: Mode.ALPHANUMERIC, length: seg.length },
                { data: seg.data, mode: Mode.BYTE, length: seg.length }
              ]);
              break;
            case Mode.ALPHANUMERIC:
              nodes.push([
                seg,
                { data: seg.data, mode: Mode.BYTE, length: seg.length }
              ]);
              break;
            case Mode.KANJI:
              nodes.push([
                seg,
                { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
              ]);
              break;
            case Mode.BYTE:
              nodes.push([
                { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
              ]);
          }
        }
        return nodes;
      }
      function buildGraph(nodes, version) {
        const table = {};
        const graph = { start: {} };
        let prevNodeIds = ["start"];
        for (let i = 0; i < nodes.length; i++) {
          const nodeGroup = nodes[i];
          const currentNodeIds = [];
          for (let j = 0; j < nodeGroup.length; j++) {
            const node = nodeGroup[j];
            const key = "" + i + j;
            currentNodeIds.push(key);
            table[key] = { node, lastCount: 0 };
            graph[key] = {};
            for (let n = 0; n < prevNodeIds.length; n++) {
              const prevNodeId = prevNodeIds[n];
              if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {
                graph[prevNodeId][key] = getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) - getSegmentBitsLength(table[prevNodeId].lastCount, node.mode);
                table[prevNodeId].lastCount += node.length;
              } else {
                if (table[prevNodeId])
                  table[prevNodeId].lastCount = node.length;
                graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) + 4 + Mode.getCharCountIndicator(node.mode, version);
              }
            }
          }
          prevNodeIds = currentNodeIds;
        }
        for (let n = 0; n < prevNodeIds.length; n++) {
          graph[prevNodeIds[n]].end = 0;
        }
        return { map: graph, table };
      }
      function buildSingleSegment(data, modesHint) {
        let mode;
        const bestMode = Mode.getBestModeForData(data);
        mode = Mode.from(modesHint, bestMode);
        if (mode !== Mode.BYTE && mode.bit < bestMode.bit) {
          throw new Error('"' + data + '" cannot be encoded with mode ' + Mode.toString(mode) + ".\n Suggested mode is: " + Mode.toString(bestMode));
        }
        if (mode === Mode.KANJI && !Utils.isKanjiModeEnabled()) {
          mode = Mode.BYTE;
        }
        switch (mode) {
          case Mode.NUMERIC:
            return new NumericData(data);
          case Mode.ALPHANUMERIC:
            return new AlphanumericData(data);
          case Mode.KANJI:
            return new KanjiData(data);
          case Mode.BYTE:
            return new ByteData(data);
        }
      }
      exports.fromArray = function fromArray(array) {
        return array.reduce(function(acc, seg) {
          if (typeof seg === "string") {
            acc.push(buildSingleSegment(seg, null));
          } else if (seg.data) {
            acc.push(buildSingleSegment(seg.data, seg.mode));
          }
          return acc;
        }, []);
      };
      exports.fromString = function fromString(data, version) {
        const segs = getSegmentsFromString(data, Utils.isKanjiModeEnabled());
        const nodes = buildNodes(segs);
        const graph = buildGraph(nodes, version);
        const path = dijkstra.find_path(graph.map, "start", "end");
        const optimizedSegs = [];
        for (let i = 1; i < path.length - 1; i++) {
          optimizedSegs.push(graph.table[path[i]].node);
        }
        return exports.fromArray(mergeSegments(optimizedSegs));
      };
      exports.rawSplit = function rawSplit(data) {
        return exports.fromArray(
          getSegmentsFromString(data, Utils.isKanjiModeEnabled())
        );
      };
    }
  });

  // node_modules/qrcode/lib/core/qrcode.js
  var require_qrcode = __commonJS({
    "node_modules/qrcode/lib/core/qrcode.js"(exports) {
      "use strict";
      var Utils = require_utils();
      var ECLevel = require_error_correction_level();
      var BitBuffer = require_bit_buffer();
      var BitMatrix = require_bit_matrix();
      var AlignmentPattern = require_alignment_pattern();
      var FinderPattern = require_finder_pattern();
      var MaskPattern = require_mask_pattern();
      var ECCode = require_error_correction_code();
      var ReedSolomonEncoder = require_reed_solomon_encoder();
      var Version = require_version();
      var FormatInfo = require_format_info();
      var Mode = require_mode();
      var Segments = require_segments();
      function setupFinderPattern(matrix, version) {
        const size = matrix.size;
        const pos = FinderPattern.getPositions(version);
        for (let i = 0; i < pos.length; i++) {
          const row = pos[i][0];
          const col = pos[i][1];
          for (let r = -1; r <= 7; r++) {
            if (row + r <= -1 || size <= row + r)
              continue;
            for (let c = -1; c <= 7; c++) {
              if (col + c <= -1 || size <= col + c)
                continue;
              if (r >= 0 && r <= 6 && (c === 0 || c === 6) || c >= 0 && c <= 6 && (r === 0 || r === 6) || r >= 2 && r <= 4 && c >= 2 && c <= 4) {
                matrix.set(row + r, col + c, true, true);
              } else {
                matrix.set(row + r, col + c, false, true);
              }
            }
          }
        }
      }
      function setupTimingPattern(matrix) {
        const size = matrix.size;
        for (let r = 8; r < size - 8; r++) {
          const value = r % 2 === 0;
          matrix.set(r, 6, value, true);
          matrix.set(6, r, value, true);
        }
      }
      function setupAlignmentPattern(matrix, version) {
        const pos = AlignmentPattern.getPositions(version);
        for (let i = 0; i < pos.length; i++) {
          const row = pos[i][0];
          const col = pos[i][1];
          for (let r = -2; r <= 2; r++) {
            for (let c = -2; c <= 2; c++) {
              if (r === -2 || r === 2 || c === -2 || c === 2 || r === 0 && c === 0) {
                matrix.set(row + r, col + c, true, true);
              } else {
                matrix.set(row + r, col + c, false, true);
              }
            }
          }
        }
      }
      function setupVersionInfo(matrix, version) {
        const size = matrix.size;
        const bits = Version.getEncodedBits(version);
        let row, col, mod;
        for (let i = 0; i < 18; i++) {
          row = Math.floor(i / 3);
          col = i % 3 + size - 8 - 3;
          mod = (bits >> i & 1) === 1;
          matrix.set(row, col, mod, true);
          matrix.set(col, row, mod, true);
        }
      }
      function setupFormatInfo(matrix, errorCorrectionLevel, maskPattern) {
        const size = matrix.size;
        const bits = FormatInfo.getEncodedBits(errorCorrectionLevel, maskPattern);
        let i, mod;
        for (i = 0; i < 15; i++) {
          mod = (bits >> i & 1) === 1;
          if (i < 6) {
            matrix.set(i, 8, mod, true);
          } else if (i < 8) {
            matrix.set(i + 1, 8, mod, true);
          } else {
            matrix.set(size - 15 + i, 8, mod, true);
          }
          if (i < 8) {
            matrix.set(8, size - i - 1, mod, true);
          } else if (i < 9) {
            matrix.set(8, 15 - i - 1 + 1, mod, true);
          } else {
            matrix.set(8, 15 - i - 1, mod, true);
          }
        }
        matrix.set(size - 8, 8, 1, true);
      }
      function setupData(matrix, data) {
        const size = matrix.size;
        let inc = -1;
        let row = size - 1;
        let bitIndex = 7;
        let byteIndex = 0;
        for (let col = size - 1; col > 0; col -= 2) {
          if (col === 6)
            col--;
          while (true) {
            for (let c = 0; c < 2; c++) {
              if (!matrix.isReserved(row, col - c)) {
                let dark = false;
                if (byteIndex < data.length) {
                  dark = (data[byteIndex] >>> bitIndex & 1) === 1;
                }
                matrix.set(row, col - c, dark);
                bitIndex--;
                if (bitIndex === -1) {
                  byteIndex++;
                  bitIndex = 7;
                }
              }
            }
            row += inc;
            if (row < 0 || size <= row) {
              row -= inc;
              inc = -inc;
              break;
            }
          }
        }
      }
      function createData(version, errorCorrectionLevel, segments) {
        const buffer = new BitBuffer();
        segments.forEach(function(data) {
          buffer.put(data.mode.bit, 4);
          buffer.put(data.getLength(), Mode.getCharCountIndicator(data.mode, version));
          data.write(buffer);
        });
        const totalCodewords = Utils.getSymbolTotalCodewords(version);
        const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
        const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
        if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) {
          buffer.put(0, 4);
        }
        while (buffer.getLengthInBits() % 8 !== 0) {
          buffer.putBit(0);
        }
        const remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8;
        for (let i = 0; i < remainingByte; i++) {
          buffer.put(i % 2 ? 17 : 236, 8);
        }
        return createCodewords(buffer, version, errorCorrectionLevel);
      }
      function createCodewords(bitBuffer, version, errorCorrectionLevel) {
        const totalCodewords = Utils.getSymbolTotalCodewords(version);
        const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
        const dataTotalCodewords = totalCodewords - ecTotalCodewords;
        const ecTotalBlocks = ECCode.getBlocksCount(version, errorCorrectionLevel);
        const blocksInGroup2 = totalCodewords % ecTotalBlocks;
        const blocksInGroup1 = ecTotalBlocks - blocksInGroup2;
        const totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks);
        const dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks);
        const dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1;
        const ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1;
        const rs = new ReedSolomonEncoder(ecCount);
        let offset = 0;
        const dcData = new Array(ecTotalBlocks);
        const ecData = new Array(ecTotalBlocks);
        let maxDataSize = 0;
        const buffer = new Uint8Array(bitBuffer.buffer);
        for (let b = 0; b < ecTotalBlocks; b++) {
          const dataSize = b < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2;
          dcData[b] = buffer.slice(offset, offset + dataSize);
          ecData[b] = rs.encode(dcData[b]);
          offset += dataSize;
          maxDataSize = Math.max(maxDataSize, dataSize);
        }
        const data = new Uint8Array(totalCodewords);
        let index = 0;
        let i, r;
        for (i = 0; i < maxDataSize; i++) {
          for (r = 0; r < ecTotalBlocks; r++) {
            if (i < dcData[r].length) {
              data[index++] = dcData[r][i];
            }
          }
        }
        for (i = 0; i < ecCount; i++) {
          for (r = 0; r < ecTotalBlocks; r++) {
            data[index++] = ecData[r][i];
          }
        }
        return data;
      }
      function createSymbol(data, version, errorCorrectionLevel, maskPattern) {
        let segments;
        if (Array.isArray(data)) {
          segments = Segments.fromArray(data);
        } else if (typeof data === "string") {
          let estimatedVersion = version;
          if (!estimatedVersion) {
            const rawSegments = Segments.rawSplit(data);
            estimatedVersion = Version.getBestVersionForData(rawSegments, errorCorrectionLevel);
          }
          segments = Segments.fromString(data, estimatedVersion || 40);
        } else {
          throw new Error("Invalid data");
        }
        const bestVersion = Version.getBestVersionForData(segments, errorCorrectionLevel);
        if (!bestVersion) {
          throw new Error("The amount of data is too big to be stored in a QR Code");
        }
        if (!version) {
          version = bestVersion;
        } else if (version < bestVersion) {
          throw new Error(
            "\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: " + bestVersion + ".\n"
          );
        }
        const dataBits = createData(version, errorCorrectionLevel, segments);
        const moduleCount = Utils.getSymbolSize(version);
        const modules = new BitMatrix(moduleCount);
        setupFinderPattern(modules, version);
        setupTimingPattern(modules);
        setupAlignmentPattern(modules, version);
        setupFormatInfo(modules, errorCorrectionLevel, 0);
        if (version >= 7) {
          setupVersionInfo(modules, version);
        }
        setupData(modules, dataBits);
        if (isNaN(maskPattern)) {
          maskPattern = MaskPattern.getBestMask(
            modules,
            setupFormatInfo.bind(null, modules, errorCorrectionLevel)
          );
        }
        MaskPattern.applyMask(maskPattern, modules);
        setupFormatInfo(modules, errorCorrectionLevel, maskPattern);
        return {
          modules,
          version,
          errorCorrectionLevel,
          maskPattern,
          segments
        };
      }
      exports.create = function create(data, options) {
        if (typeof data === "undefined" || data === "") {
          throw new Error("No input text");
        }
        let errorCorrectionLevel = ECLevel.M;
        let version;
        let mask;
        if (typeof options !== "undefined") {
          errorCorrectionLevel = ECLevel.from(options.errorCorrectionLevel, ECLevel.M);
          version = Version.from(options.version);
          mask = MaskPattern.from(options.maskPattern);
          if (options.toSJISFunc) {
            Utils.setToSJISFunction(options.toSJISFunc);
          }
        }
        return createSymbol(data, version, errorCorrectionLevel, mask);
      };
    }
  });

  // node_modules/qrcode/lib/server.js
  var require_server = __commonJS({
    "node_modules/qrcode/lib/server.js"(exports) {
      "use strict";
      var QRCode2 = require_qrcode();
      exports.create = QRCode2.create;
    }
  });

  // node_modules/qrcode/lib/index.js
  var require_lib = __commonJS({
    "node_modules/qrcode/lib/index.js"(exports, module) {
      "use strict";
      module.exports = require_server();
    }
  });

  // src/generateContent.ts
  var generateWifi = (param) => `WIFI:S:${param.ssid || ""};T:${param.encryption || "nopass"};P:${param.password || ""};;`;
  var generateEmail = (param) => {
    let dataString = `mailto:${param.email}`;
    if (param.subject || param.body) {
      dataString += `?subject=${param.subject || ""}&body=${param.body || ""}`;
    }
    return dataString;
  };
  var generateTel = (tel) => `tel:${tel}`;
  var generateLocation = (param) => `https://maps.google.com/local?q=${param.latitude || ""},${param.longitude}`;
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
      default:
        return "";
    }
  };

  // src/utils/gradient.ts
  var isGradientColor = (color) => color.includes("linear-gradient") || color.includes("radial-gradient") || color.includes("conic-gradient");
  var parseLinearGradient = (input) => {
    const matches = Array.from(input.matchAll(/((?:rgb|rgba|hsl|hsla|#[0-9a-f]{3,8}|[a-z]+)?(?:\([^)]+\))?)\s+(\d+%)/gi));
    const angleMatch = input.match(/(\d+)deg/i);
    const angle = angleMatch ? angleMatch[1] : "0";
    const stops = matches.map((match) => ({
      color: match[1].trim(),
      percentage: match[2]
    }));
    if (stops.length === 0) {
      const colorMatches = input.match(/(#[0-9a-f]{3,8}|rgb\([^)]+\)|rgba\([^)]+\)|hsl\([^)]+\)|hsla\([^)]+\)|[a-z]+)/gi);
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
    const matches = Array.from(input.matchAll(/((?:rgb|rgba|hsl|hsla|#[0-9a-f]{3,8}|[a-z]+)?(?:\([^)]+\))?)\s+(\d+%)/gi));
    const stops = matches.map((match) => ({
      color: match[1].trim(),
      percentage: match[2]
    }));
    if (stops.length === 0) {
      const colorMatches = input.match(/(#[0-9a-f]{3,8}|rgb\([^)]+\)|rgba\([^)]+\)|hsl\([^)]+\)|hsla\([^)]+\)|[a-z]+)/gi);
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
    if (isGradientColor(config.colors.body)) {
      svgString += generateSVGGradient(config.colors.body, "body");
    }
    if (isGradientColor(config.colors.eyeFrame.topLeft)) {
      svgString += generateSVGGradient(config.colors.eyeFrame.topLeft, "eyeFrame");
    }
    if (isGradientColor(config.colors.eyeball.topLeft)) {
      svgString += generateSVGGradient(config.colors.eyeball.topLeft, "eyeball");
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
  var import_qrcode = __toESM(require_lib());

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
    return rounded.toString().replace(/\.?0+$/, "");
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
  var isTransparent = (color) => {
    if (color === "transparent") {
      return true;
    }
    if (color.startsWith("#")) {
      return color === "#00000000" || color === "#0000";
    }
    if (color.startsWith("rgba")) {
      const rgbaValues = color.slice(5, -1).split(",");
      const alpha = parseFloat(rgbaValues[3]);
      return alpha === 0;
    }
    if (color.startsWith("rgb")) {
      return color === "rgba(0,0,0,0)" || color === "rgba(0, 0, 0, 0)";
    }
    return false;
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
        pathOnly: colors.topLeft === "body",
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
        pathOnly: colors.topLeft === "body",
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
        if (!neighbors.top && !neighbors.left) {
          return generateRoundedCornerEyeballPath({
            x,
            y,
            cellSize,
            length: cellSize,
            roundedCorners: []
          });
        }
        if (!neighbors.top && !neighbors.right) {
          return generateRoundedCornerEyeballPath({
            x,
            y,
            cellSize,
            length: cellSize,
            roundedCorners: []
          });
        }
        if (!neighbors.bottom && !neighbors.left) {
          return generateRoundedCornerEyeballPath({
            x,
            y,
            cellSize,
            length: cellSize,
            roundedCorners: []
          });
        }
        if (!neighbors.bottom && !neighbors.right) {
          return generateRoundedCornerEyeballPath({
            x,
            y,
            cellSize,
            length: cellSize,
            roundedCorners: []
          });
        }
        return generateSquarePath({ i, j, cellSize });
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
        pathOnly: colors.bottomLeft === "body",
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
      const backgroundColor = validateColor(
        isTransparent(config.colors.background) ? "none" : config.colors.background
      );
      const bodyFill = validateColor(
        isGradientColor(config.colors.body) ? "url(#body)" : config.colors.body
      );
      const svgParts = [
        `<svg`,
        `  xmlns="http://www.w3.org/2000/svg"`,
        `  xmlns:xlink="http://www.w3.org/1999/xlink"`,
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
      if (process.env.NODE_ENV === "development") {
        const validation = validateSVG(svg);
        if (!validation.valid) {
          console.warn("SVG validation warnings:", validation.errors);
        }
      }
      if (options == null ? void 0 : options.forReactNative) {
        return {
          svgString: svg,
          cellSize
        };
      }
      return svg;
    } catch (error) {
      console.error("Error generating SVG string:", error);
      throw new Error(
        `Failed to generate QR code: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
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
})();
//# sourceMappingURL=index.js.map