const fs = require("fs");
const packageJson = require("../package.json");

const version = packageJson.version;
console.log("version", version);

const FILE_PATH = "./dist/index.js";
const NEW_FILE_NAME = `./dist/intosoft-qrcode-v${version}.js`;

fs.rename(FILE_PATH, NEW_FILE_NAME, (err) => {
  if (err) {
    console.error("Error renaming file:", err);
    process.exit(1);
  } else {
    console.log("File renamed successfully");
  }
});
