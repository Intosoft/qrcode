import styled from "styled-components";

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

const Container = styled.div`
  background-color: #f7f8fa;
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

  return (
    <Container>
      <Content>
        <CustomizationWrapper>
          <CustomizeSection>
            <Tabs
              selectedIndex={selectedCustomizationTabIndex}
              onSelect={(index) => setSelectedCustomizationTabIndex(index)}
            >
              <TabList style={{ maxWidth: 200 }}>
                {TABS.map(({ title }) => (
                  <Tab key={title}>{title}</Tab>
                ))}
              </TabList>

              {TABS.map(({ title, Component }) => (
                <TabPanel key={title}>
                  {Component({ qrConfig, setQrConfig })}
                </TabPanel>
              ))}
            </Tabs>
          </CustomizeSection>
          <QR>
            <SVG svgString={svgString} />

            <Row>
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
                Hight
              </Title>
            </Row>
            <Slider
              min={100}
              max={3200}
              onChange={(val) => setImageSize(val as number)}
              value={imageSize}
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
                onClick={() => downloadSVG({ svgString, downloadType: "png" })}
              >
                PNG
              </DownloadButton>
              <DownloadButton
                onClick={() => downloadSVG({ svgString, downloadType: "jpeg" })}
              >
                JPEG
              </DownloadButton>
              <DownloadButton
                onClick={() => downloadSVG({ svgString, downloadType: "svg" })}
              >
                SVG
              </DownloadButton>
            </DownloadSection>
          </QR>
        </CustomizationWrapper>
        <CodeBlock config={qrConfig} />
      </Content>
    </Container>
  );
};
