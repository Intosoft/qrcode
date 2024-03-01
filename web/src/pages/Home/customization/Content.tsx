import styled from "styled-components";

import { CustomizationSectionProps } from "./type";

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

export const Content = ({
  setQrConfig,
  qrConfig,
}: CustomizationSectionProps) => {
  return (
    <>
      <Label>Enter your URL</Label>
      <Input
        value={qrConfig.value}
        onChange={({ target: { value } }) =>
          setQrConfig({
            ...qrConfig,
            value,
          })
        }
      />
    </>
  );
};
