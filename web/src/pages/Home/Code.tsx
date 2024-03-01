import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Config } from "../../../../src/config";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useState } from "react";
import copy from "copy-to-clipboard";
import CopyPNG from "../../assets/icons/copy-white.png";
import toast from "react-hot-toast";

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
  react: `import { generateSVGString } from  '@intosoft/qrcode';

  const svgString = generateSVGString(config);
  
  export  const  RenderQR = () => {
    return (<div dangerouslySetInnerHTML={{__html: svgString}}/>);
  };
  `,
  "react-native": `// Prerequisite
// npm i react-native-svg | yarn add react-native-svg
import { SvgFromXml } from  "react-native-svg";
import { generateSVGString } from  '@intosoft/qrcode';

const svgString = generateSVGString(config);

export  const  RenderQR = () => {
	return (<SvgFromXml  xml={svgString}  />);
};
`,
  node: ``,
  angular: ``,
  vue: ``,
  vanilla: `<!DOCTYPE html>
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
    <div style={{ position: "relative" }}>
      <button
        onClick={() => {
          copy(CODES[id]);
          toast.success("Code copied!", {
            position: "top-center",
          });
        }}
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          zIndex: 9999,
          backgroundColor: "transparent",
          padding: 20,
          cursor: "pointer",
        }}
      >
        <img src={CopyPNG} alt="Copy to clipboard" height={20} />
      </button>
      <SyntaxHighlighter
        language="javascript"
        style={materialDark}
        customStyle={{
          width: "100%",
          fontSize: 14,
          borderRadius: 4,
        }}
      >
        {CODES[id]}
      </SyntaxHighlighter>
    </div>
  );
};
export const CodeBlock = ({ config }: CodeBlockProps) => {
  const codeString = `const config = ${JSON.stringify(config, undefined, 4)}`;
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
    <div style={{ width: "100%", position: "relative" }}>
      <button
        onClick={() => {
          copy(codeString);
          toast.success("Config copied!", {
            position: "top-center",
          });
        }}
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          zIndex: 9999,
          backgroundColor: "transparent",
          padding: 20,
          cursor: "pointer",
        }}
      >
        <img src={CopyPNG} alt="Copy to clipboard" height={20} />
      </button>
      <SyntaxHighlighter
        language="javascript"
        style={materialDark}
        customStyle={{
          width: "100%",
          fontSize: 14,
          borderRadius: 4,
        }}
      >
        {codeString}
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
