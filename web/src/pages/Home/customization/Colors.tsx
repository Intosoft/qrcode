import styled from "styled-components";

import { CustomizationSectionProps } from "./type";

import GradientPicker from "react-best-gradient-color-picker";

import { useState } from "react";
import { isGradientColor } from "../../../../../src/utils/gradient";

const Label = styled.p`
  width: 80px;
`;

const Title = styled.p``;

const ColorPicker = styled.button<{ $value: string }>`
  height: 30px;
  width: 100px;
  border: 2px solid #ccffdd;
  border-radius: 4px;
  cursor: pointer;
  ${({ $value }) =>
    isGradientColor($value)
      ? `background-image: ${$value}`
      : `background-color:${$value}`};
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
  margin-top: -70px;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  margin-top: 4px;
  padding: 10px;
  transition: all 0.2s ease;
  cursor: pointer;
  background-color: #41e08e;
  color: white;
  &:hover {
    color: black;
    background-color: white;
  }
  border-radius: 4px;
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
      value: qrConfig.colors.background,
      onChange: (value: string) => {
        setQrConfig({
          ...qrConfig,
          colors: {
            ...qrConfig.colors,
            background: value,
          },
        });
      },
    },
    {
      label: "Body",
      value: qrConfig.colors.body,
      onChange: (value: string) => {
        setQrConfig({
          ...qrConfig,
          colors: {
            ...qrConfig.colors,
            body: value,
          },
        });
      },
    },
    {
      label: "EyeFrame",
      value: qrConfig.colors.eyeFrame.topLeft,
      onChange: (value: string) => {
        setQrConfig({
          ...qrConfig,
          colors: {
            ...qrConfig.colors,
            eyeFrame: {
              topLeft: value,
              topRight: value,
              bottomLeft: value,
            },
          },
        });
      },
    },
    {
      label: "Eyeball",
      value: qrConfig.colors.eyeball.topLeft,
      onChange: (value: string) => {
        setQrConfig({
          ...qrConfig,
          colors: {
            ...qrConfig.colors,
            eyeball: {
              topLeft: value,
              topRight: value,
              bottomLeft: value,
            },
          },
        });
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
              onClick={() => {
                setActiveColorLabel(config.label);
              }}
            />
          </Row>
        ))}
      </LeftSection>
      {activeColorLabel && (
        <RightSection>
          <Title style={{ marginBottom: 4, marginTop: -10, fontSize: 12 }}>
            {activeColorLabel} Color
          </Title>
          <div
            style={{
              zIndex: 9,
            }}
          >
            <GradientPicker
              value={
                COLOR_CONFIG.find((config) => config.label === activeColorLabel)
                  ?.value
              }
              onChange={(value) => {
                COLOR_CONFIG.find(
                  (config) => config.label === activeColorLabel
                )?.onChange(value);
              }}
            />
          </div>
          <Button
            style={{ width: "100%" }}
            onClick={() => setActiveColorLabel(undefined)}
          >
            Done
          </Button>
        </RightSection>
      )}
    </Container>
  );
};
