import { Config } from "../../../../../src/config";

export interface CustomizationSectionProps {
  qrConfig: Config;
  setQrConfig: (config: Config) => void;
}
