import styled from "styled-components";

import { CustomizationSectionProps } from "./type";
import { fileToBase64 } from "../../../utils/file";

const Input = styled.input`
  height: 40px;
  width: 100%;
  border: 1px solid #d0d7df;
  border-radius: 4px;
  padding: 4px 10px;
  outline: none;

  &:focus {
    border: 1px solid #a2e344;
  }
`;

const Label = styled.p`
  margin: 4px 2px;
`;

const Upload = styled.div`
  height: 80px;
  width: 100px;
  border: 1px solid #d0d7df;
  border-radius: 4px;
  cursor: pointer;
  background-color: white;
`;

export const Logo = ({ setQrConfig, qrConfig }: CustomizationSectionProps) => {
  return (
    <>
      <Label>Enter your image URL</Label>
      <Input
        value={qrConfig.logo?.url}
        onChange={({ target: { value } }) =>
          setQrConfig({
            ...qrConfig,
            logo: {
              ...(qrConfig.logo || { url: "", height: 0, width: 0 }),
              url: value,
            },
          })
        }
      />

      <p
        style={{
          textAlign: "center",
          margin: 10,
        }}
      >
        OR
      </p>
      <Label>Upload Image</Label>
      <Upload>
        <input
          type="file"
          accept="image/*"
          style={{
            height: "100%",
            width: "100%",
            zIndex: 99,
            opacity: 0,
          }}
          onChange={async ({ target: { files } }) => {
            if (files?.[0]) {
              const base64 = await fileToBase64(files[0]);
              setQrConfig({
                ...qrConfig,
                logo: {
                  ...(qrConfig.logo || { url: "", height: 0, width: 0 }),
                  url: base64,
                },
              });
            }
          }}
        />
      </Upload>
      <p
        style={{
          margin: "20px 0px",
        }}
      >
        Dimensions
      </p>
      <Label>Height</Label>
      <Input
        type="number"
        value={qrConfig.logo?.height}
        onChange={({ target: { value } }) =>
          setQrConfig({
            ...qrConfig,
            logo: {
              ...(qrConfig.logo || { url: "", height: 0, width: 0 }),
              height: parseInt(value),
            },
          })
        }
      />
      <Label>Width</Label>
      <Input
        type="number"
        value={qrConfig.logo?.width}
        onChange={({ target: { value } }) =>
          setQrConfig({
            ...qrConfig,
            logo: {
              ...(qrConfig.logo || { url: "", height: 0, width: 0 }),
              width: parseInt(value),
            },
          })
        }
      />
    </>
  );
};
