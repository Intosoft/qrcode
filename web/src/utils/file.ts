interface DownloadSVGParams {
  svgString: string;
  downloadType: "svg" | "png" | "jpeg";
}

const FILE_NAME = "intosoft-qrcode";
export const downloadSVG = ({ svgString, downloadType }: DownloadSVGParams) => {
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
