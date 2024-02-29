import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Config } from "../../../../src/config";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useState } from "react";
interface CodeBlockProps {
  config: Config;
}

type Platform =
  | "react"
  | "react-native"
  | "node"
  | "angular"
  | "vue"
  | "vanilla";

const CODES: { [key in Platform]: string } = {
  react: `
import QRCode from "@intosoft/qrcode/react";

export const QRCodeRenderer = () => {
    return <QRCode config={config} size={400} />
}
  
  `,
  "react-native": `
// Prerequisite
// npm i react-native-svg | yarn add react-native-svg
import QRCode from  '@intosoft/qrcode/native';

export const QRCodeRenderer = () => {
    return <QRCode config={config} size={400} />
}
`,
  node: ``,
  angular: ``,
  vue: ``,
  vanilla: `
<!DOCTYPE html>
<html>
  <body>
    <div id="svg-container"></div>
  </body>
  <script src="https://unpkg.com/@intosoft/qrcode@0.0.4/dist/index.js"></script>
  <script>
    window.addEventListener("load", function () {
      const svgString = window.IntosoftQRCode.generateSVGString();
      document.getElementById("svg-container").innerHTML = svgString;
    });
  </script>
</html>`,
};
const PlatformCode = ({ id }: { id: Platform }) => {
  return (
    <>
      <SyntaxHighlighter
        language="javascript"
        style={materialDark}
        customStyle={{
          width: "100%",
        }}
      >
        {CODES[id]}
      </SyntaxHighlighter>
    </>
  );
};
export const CodeBlock = ({ config }: CodeBlockProps) => {
  const codeString = JSON.stringify(config, undefined, 4);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const TABS: { id: Platform; title: string }[] = [
    {
      id: "react",
      title: "React",
    },
    {
      id: "react-native",
      title: "React Native",
    },
    {
      id: "vue",
      title: "VueJS",
    },
    {
      id: "angular",
      title: "Angular",
    },
    {
      id: "vanilla",
      title: "VanillaJS",
    },
    {
      id: "node",
      title: "Node.js",
    },
  ];
  return (
    <div style={{ width: "100%" }}>
      <SyntaxHighlighter
        language="javascript"
        style={materialDark}
        customStyle={{
          width: "100%",
        }}
      >
        {`const config = ${codeString};`}
      </SyntaxHighlighter>
      <Tabs
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
      >
        <TabList style={{ maxWidth: "100%" }}>
          {TABS.map(({ title }) => (
            <Tab key={title}>{title}</Tab>
          ))}
        </TabList>

        {TABS.map(({ id }) => (
          <TabPanel key={id}>
            <PlatformCode id={id} />
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};
