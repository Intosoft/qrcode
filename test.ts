import fs from "fs";
import { generateSVGString } from "./src/index";

function main() {
  const svg = generateSVGString();
  fs.writeFile("./test-svg.svg", svg, (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return;
    }
    console.log("SVG file has been written!");
  });
}

main();
