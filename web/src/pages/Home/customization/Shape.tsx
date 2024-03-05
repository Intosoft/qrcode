import styled from "styled-components";

import { config } from "../config";
import { CustomizationSectionProps } from "./type";

const Title = styled.p`
  font-size: 16px;
  margin-top: 20px;
`;

const ShapeImg = styled.img`
  height: 34px;
  width: 40px;
  object-fit: contain;
`;

export const StyledShape = styled.div<{ $active: boolean }>`
  cursor: pointer;
  border: 5px solid ${({ $active }) => ($active ? "#03C29C" : "transparent")};
  border-radius: 4px;
  padding: 4px;
  background-color: #f2f9ff;
  transition: all 0.1s ease-in-out;
`;

const ShapeWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
`;

export const Shape = ({ setQrConfig, qrConfig }: CustomizationSectionProps) => {
  return (
    <>
      <Title>Body Shape</Title>
      <ShapeWrapper>
        {config.body.map((item) => (
          <StyledShape
            style={{
              height: 80,
              width: 80,
              overflow: "hidden",
            }}
            key={item[0]}
            $active={item[0] === qrConfig.shapes.body}
            onClick={() =>
              setQrConfig({
                ...qrConfig,
                shapes: {
                  ...qrConfig.shapes,
                  body: item[0],
                },
              })
            }
          >
            <ShapeImg
              src={item[1]}
              style={{
                height: 350,
                width: 350,
                marginTop: -80,
                marginLeft: -90,
              }}
            />
          </StyledShape>
        ))}
      </ShapeWrapper>
      <Title>Eyeball Shape</Title>
      <ShapeWrapper>
        {config.eyeball.map((item) => (
          <StyledShape
            key={item[0]}
            $active={item[0] === qrConfig.shapes.eyeball}
            onClick={() =>
              setQrConfig({
                ...qrConfig,
                shapes: {
                  ...qrConfig.shapes,
                  eyeball: item[0],
                },
              })
            }
          >
            <ShapeImg src={item[1]} />
          </StyledShape>
        ))}
        <StyledShape
          $active={"body" === qrConfig.shapes.eyeball}
          onClick={() =>
            setQrConfig({
              ...qrConfig,
              shapes: {
                ...qrConfig.shapes,
                eyeball: "body",
              },
            })
          }
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <p>Same as body</p>
        </StyledShape>
      </ShapeWrapper>
      <Title>Eye Frame Shape</Title>
      <ShapeWrapper>
        {config.eyeFrame.map((item) => (
          <StyledShape
            key={item[0]}
            $active={item[0] === qrConfig.shapes.eyeFrame}
            onClick={() =>
              setQrConfig({
                ...qrConfig,
                shapes: {
                  ...qrConfig.shapes,
                  eyeFrame: item[0],
                },
              })
            }
          >
            <ShapeImg src={item[1]} />
          </StyledShape>
        ))}
        <StyledShape
          $active={"body" === qrConfig.shapes.eyeFrame}
          onClick={() =>
            setQrConfig({
              ...qrConfig,
              shapes: {
                ...qrConfig.shapes,
                eyeFrame: "body",
              },
            })
          }
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <p>Same as body</p>
        </StyledShape>
      </ShapeWrapper>
    </>
  );
};
