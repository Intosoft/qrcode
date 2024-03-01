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
    reader.onloadend = function () {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject("result is not string");
      }
    };
    reader.onerror = () => {
      reject("Couldn't process file");
    };
  });
};
