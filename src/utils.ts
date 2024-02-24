import QRCode, { QRCodeErrorCorrectionLevel } from "qrcode";

export const generateMatrix = (
  value: string,
  errorCorrectionLevel: QRCodeErrorCorrectionLevel
) => {
  const arr = [...QRCode.create(value, { errorCorrectionLevel }).modules.data];
  const sqrt = Math.sqrt(arr.length);

  const rows = [];
  for (let i = 0; i < arr.length; i += sqrt) {
    rows.push(arr.slice(i, i + sqrt));
  }

  return rows;
};
