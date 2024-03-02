import styled from "styled-components";
import packageJSON from "../../../package.json";
import { SVG } from "../../components/SVG";
import { useEffect, useState } from "react";
import { generateSVGString } from "../../../../src/index";

import { downloadSVG } from "../../utils/file";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { Shape } from "./customization/Shape";
import { Colors } from "./customization/Colors";
import { Logo } from "./customization/Logo";
import { Config, defaultConfig } from "../../../../src/config";
import { CodeBlock } from "./Code";
import { Content as ContentTab } from "./customization/Content";

const Container = styled.div`
  background-color: #f1f9ff;
  min-height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CustomizeSection = styled.div`
  background-color: #f4f4f4;
  border: 1px solid #d0d7df;
  border-right: 0;
  width: 100%;
  padding: 20px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`;
const QR = styled.div`
  background-color: white;
  padding: 20px;
  flex: 1;
  border: 1px solid #d0d7df;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
`;
const Content = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 900px;
  max-width: 100vw;
`;

const CustomizationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const Title = styled.p`
  font-size: 16px;
  margin-top: 20px;
`;

const DownloadSection = styled.div`
  border-top: 1px solid #d0d7df;
  margin-top: 10px;
  padding: 10px;
  gap: 5px;
  display: flex;
  justify-content: center;
`;

export const DownloadButton = styled.button`
  padding: 6px 10px;
  color: black;
  border-radius: 2px;
  transition: all 0.2s ease;
  cursor: pointer;
  &:hover {
    background-color: #41e08e;
    color: white;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const HomePage = () => {
  const [qrConfig, setQrConfig] = useState<Config>({
    ...defaultConfig,
  });
  const [svgString, setSvgString] = useState(
    generateSVGString({
      ...qrConfig,
      length: 200,
    })
  );

  const [imageSize, setImageSize] = useState(1000);

  const [selectedCustomizationTabIndex, setSelectedCustomizationTabIndex] =
    useState(1);

  const TABS = [
    {
      title: "Content",
      Component: ContentTab,
    },
    {
      title: "Shape",
      Component: Shape,
    },
    {
      title: "Colors",
      Component: Colors,
    },
    {
      title: "Logo",
      Component: Logo,
    },
  ];

  useEffect(() => {
    setSvgString(
      generateSVGString({
        ...qrConfig,
        length: 200,
      })
    );
  }, [qrConfig]);

  const handleSetConfig = (config: Config) => {
    localStorage.setItem(
      "qr-config",
      JSON.stringify({
        config: {
          ...config,
          length: 200,
        },
        version: packageJSON.version,
      })
    );

    setQrConfig(config);
  };

  useEffect(() => {
    const _config = localStorage.getItem("qr-config");
    if (_config) {
      try {
        const { config, version } = JSON.parse(_config);
        if (version === packageJSON.version) {
          // setQrConfig(config);
        }
      } catch (err) {
        console.log("Err", err);
      }
    }
  }, []);

  return (
    <Container>
      <Content>
        <Tabs
          selectedIndex={selectedCustomizationTabIndex}
          onSelect={(index) => setSelectedCustomizationTabIndex(index)}
          style={{
            width: "100%",
          }}
        >
          <TabList
            style={{
              marginBottom: 0,
              margin: "0px 5px",
              width: "calc(100% - 10px)",
            }}
          >
            {TABS.map(({ title }) => (
              <Tab key={title}>{title}</Tab>
            ))}
          </TabList>
          <CustomizationWrapper>
            <CustomizeSection>
              {TABS.map(({ title, Component }) => (
                <TabPanel key={title}>
                  <Component {...{ qrConfig, setQrConfig: handleSetConfig }} />
                </TabPanel>
              ))}
            </CustomizeSection>

            <QR>
              <SVG svgString={svgString} />

              <Row
                style={{
                  marginBottom: 4,
                }}
              >
                <Title
                  style={{
                    textAlign: "center",
                  }}
                >
                  Low
                </Title>
                <Title
                  style={{
                    textAlign: "center",
                  }}
                >
                  {imageSize} x {imageSize} px
                </Title>
                <Title
                  style={{
                    textAlign: "center",
                  }}
                >
                  High
                </Title>
              </Row>
              <Slider
                min={100}
                max={3200}
                onChange={(val) => setImageSize(val as number)}
                value={imageSize}
                styles={{
                  track: {
                    background: "#03C29C",
                  },
                  handle: {
                    background: "#03C29C",
                  },
                }}
              />
              <Title
                style={{
                  textAlign: "center",
                }}
              >
                Download
              </Title>

              <DownloadSection>
                <DownloadButton
                  onClick={() =>
                    downloadSVG({
                      config: qrConfig,
                      imageSize,
                      downloadType: "png",
                    })
                  }
                >
                  PNG
                </DownloadButton>
                <DownloadButton
                  onClick={() =>
                    downloadSVG({
                      config: qrConfig,
                      imageSize,
                      downloadType: "jpeg",
                    })
                  }
                >
                  JPEG
                </DownloadButton>
                <DownloadButton
                  onClick={() =>
                    downloadSVG({
                      config: qrConfig,
                      imageSize,
                      downloadType: "svg",
                    })
                  }
                >
                  SVG
                </DownloadButton>
              </DownloadSection>
            </QR>
          </CustomizationWrapper>
        </Tabs>
        <CodeBlock config={qrConfig} />
      </Content>
    </Container>
  );
};
