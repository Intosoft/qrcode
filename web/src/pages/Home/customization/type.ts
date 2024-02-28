import { Dispatch, SetStateAction } from "react";
import { Config } from "../../../../../src/config";

export interface CustomizationSectionProps {
  qrConfig: Config;
  setQrConfig: Dispatch<SetStateAction<Config>>;
}
