import styled from "styled-components";

import { CustomizationSectionProps } from "./type";
import { SketchPicker } from "react-color";
import { useState } from "react";

const Label = styled.p`
  width: 80px;
`;

const Title = styled.p``;

const ColorPicker = styled.button<{ $value: string }>`
  height: 40px;
  width: 100px;
  background-color: ${({ $value }) => $value};
  border: 1px solid #abe2fb;
  border-radius: 4px;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
`;
const LeftSection = styled.div``;
const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  margin-top: -4px;

  padding: 10px 10px 6px 10px;
  transition: all 0.2s ease;
  cursor: pointer;
  background-color: #41e08e;
  color: white;
  &:hover {
    color: black;
    background-color: white;
  }
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
`;

type ColorConfigLabel = "Background" | "Body" | "EyeFrame" | "Eyeball";
export const Colors = ({
  setQrConfig,
  qrConfig,
}: CustomizationSectionProps) => {
  const COLOR_CONFIG: {
    label: ColorConfigLabel;
    value: string;
    onChange: (value: string) => void;
  }[] = [
    {
      label: "Background",
      value: qrConfig.backgroundColor,
      onChange: (value: string) => {
        setQrConfig((prev) => ({
          ...prev,
          backgroundColor: value,
        }));
      },
    },
    {
      label: "Body",
      value: qrConfig.color,
      onChange: (value: string) => {
        setQrConfig((prev) => ({
          ...prev,
          color: value,
        }));
      },
    },
    {
      label: "EyeFrame",
      value: qrConfig.colors.eyeFrame,
      onChange: (value: string) => {
        setQrConfig((prev) => ({
          ...prev,
          colors: {
            ...prev.colors,
            eyeFrame: value,
          },
        }));
      },
    },
    {
      label: "Eyeball",
      value: qrConfig.colors.eyeball,
      onChange: (value: string) => {
        setQrConfig((prev) => ({
          ...prev,
          colors: {
            ...prev.colors,
            eyeball: value,
          },
        }));
      },
    },
  ];

  const [activeColorLabel, setActiveColorLabel] = useState<
    ColorConfigLabel | undefined
  >();
  return (
    <Container>
      <LeftSection>
        {COLOR_CONFIG.map((config) => (
          <Row key={config.label}>
            <Label>{config.label}</Label>
            <ColorPicker
              $value={config.value}
              onClick={() => setActiveColorLabel(config.label)}
            />
          </Row>
        ))}
      </LeftSection>
      {activeColorLabel && (
        <RightSection>
          <Title style={{ marginBottom: 10 }}>{activeColorLabel} Color</Title>
          <div
            style={{
              zIndex: 9,
            }}
          >
            <SketchPicker
              color={
                COLOR_CONFIG.find((config) => config.label === activeColorLabel)
                  ?.value
              }
              onChange={({ hex }) =>
                COLOR_CONFIG.find(
                  (config) => config.label === activeColorLabel
                )?.onChange(hex)
              }
            />
          </div>
          <Button style={{ width: "100%" }}>Done</Button>
        </RightSection>
      )}
    </Container>
  );
};
