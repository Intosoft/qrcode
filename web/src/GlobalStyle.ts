import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
   * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
   }

   button {
      outline:none;
      border:none;
   }

   .sketch-picker {
      box-shadow: none !important;
      border-bottom-left-radius: 0px !important;
      border-bottom-right-radius: 0px !important;
   }
`;
