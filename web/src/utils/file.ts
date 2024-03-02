import { generateSVGString } from "../../../src";
import { Config } from "../../../src/config";
import { cloneDeep } from "lodash";

interface DownloadSVGParams {
  downloadType: "svg" | "png" | "jpeg";
  imageSize: number;
  config: Config;
}

const FILE_NAME = "intosoft-qrcode";
export const downloadSVG = ({
  config,
  imageSize,
  downloadType,
}: DownloadSVGParams) => {
  const sizeConfig = cloneDeep(config);
  if (sizeConfig.logo?.url) {
    sizeConfig.logo.height =
      (sizeConfig.logo.height / sizeConfig.length) * imageSize;
    sizeConfig.logo.width =
      (sizeConfig.logo.width / sizeConfig.length) * imageSize;
  }
  const svgString = generateSVGString({
    ...sizeConfig,
    length: imageSize,
  });
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();

  img.src = "data:image/svg+xml;base64," + btoa(svgString);

  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx?.drawImage(img, 0, 0);

    if (["png", "jpeg"].includes(downloadType)) {
      canvas.toBlob((blob) => {
        if (blob) {
          const imageURL = URL.createObjectURL(blob);
          downloadFile(
            imageURL,
            downloadType === "png" ? "image/png" : "image/jpeg",
            `${FILE_NAME}.${downloadType}`
          );
        }
      });
    } else {
      const svgBlob = new Blob([svgString], { type: "image/svg+xml" });
      const svgUrl = URL.createObjectURL(svgBlob);
      downloadFile(svgUrl, "image/svg+xml", `${FILE_NAME}.${downloadType}`);
    }
  };
};

const downloadFile = (url: string, type: string, filename: string) => {
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  link.setAttribute("type", type);
  document.body.appendChild(link);
  link.click();
};

export const fileToBase64 = (file: File): Promise<string> => {
  var reader = new FileReader();

  reader.readAsDataURL(file);
  return new Promise((resolve, reject) => {
    reader.onloadend = async function () {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        // if (reader.result.includes("image/svg+xml")) {
        //   const pngFromSVG = await svgToPng({
        //     base64: reader.result,
        //     height: 100,
        //     width: 100,
        //   });
        //   resolve(pngFromSVG);
        // } else {
        //   resolve(reader.result);
        // }
      } else {
        reject("result is not string");
      }
    };
    reader.onerror = () => {
      reject("Couldn't process file");
    };
  });
};

interface SVGToPNG {
  base64: string;
  height: number;
  width: number;
}

export const svgToPng = ({
  base64,
  width,
  height,
}: SVGToPNG): Promise<string> => {
  var canvas = document.createElement("canvas");

  var context = canvas.getContext("2d");

  canvas.width = width;
  canvas.height = height;

  const image = new Image();
  image.src = base64;

  return new Promise((resolve, reject) => {
    image.onload = function () {
      context?.clearRect(0, 0, width, height);
      context?.drawImage(image, 0, 0, width, height);

      resolve(canvas.toDataURL("image/png"));
    };
  });
};
