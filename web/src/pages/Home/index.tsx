import styled from "styled-components";

import { SVG } from "../../components/SVG";
import { useEffect, useState } from "react";
import { generateSVGString } from "../../../../src/index";

import { config } from "./config";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CustomizeSection = styled.div``;
const QR = styled.div``;
const Content = styled.div`
  width: 100%;
  margin-top: 40px;
  max-width: 900px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;
const Title = styled.p`
  font-size: 18px;
  margin-top: 20px;
`;

const ShapeImg = styled.img`
  height: 30px;
  width: 30px;
`;

const Shape = styled.div<{ $active: boolean }>`
  cursor: pointer;
  border: 4px solid ${({ $active }) => ($active ? "#41E08E" : "transparent")};
  border-radius: 4px;
  padding: 4px;
`;

const ShapeWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

export const HomePage = () => {
  const [qrConfig, setQrConfig] = useState({
    bodyShape: "circle",
    eyeballShape: "circle",
    eyeFrameShape: "rounded",
  });
  const [svgString, setSvgString] = useState(
    //@ts-ignore
    generateSVGString({
      length: 200,
      ...qrConfig,
    })
  );

  useEffect(() => {
    setSvgString(
      //@ts-ignore
      generateSVGString({
        length: 200,
        ...qrConfig,
      })
    );
  }, [qrConfig]);

  return (
    <Container>
      <Content>
        <CustomizeSection>
          <Title>Body Shape</Title>
          <ShapeWrapper>
            {config.body.map((item) => (
              <Shape
                key={item[0]}
                $active={item[0] === qrConfig.bodyShape}
                onClick={() =>
                  setQrConfig((prev) => ({
                    ...prev,
                    bodyShape: item[0],
                  }))
                }
              >
                <ShapeImg src={item[1]} />
              </Shape>
            ))}
          </ShapeWrapper>
          <Title>Eyeball Shape</Title>
          <ShapeWrapper>
            {config.eyeball.map((item) => (
              <Shape
                key={item[0]}
                $active={item[0] === qrConfig.eyeballShape}
                onClick={() =>
                  setQrConfig((prev) => ({
                    ...prev,
                    eyeballShape: item[0],
                  }))
                }
              >
                <ShapeImg src={item[1]} />
              </Shape>
            ))}
          </ShapeWrapper>
          <Title>Eye Frame Shape</Title>
          <ShapeWrapper>
            {config.eyeFrame.map((item) => (
              <Shape
                key={item[0]}
                $active={item[0] === qrConfig.eyeFrameShape}
                onClick={() =>
                  setQrConfig((prev) => ({
                    ...prev,
                    eyeFrameShape: item[0],
                  }))
                }
              >
                <ShapeImg src={item[1]} />
              </Shape>
            ))}
          </ShapeWrapper>
        </CustomizeSection>
        <QR>
          <SVG svgString={svgString} />
        </QR>
      </Content>
    </Container>
  );
};
