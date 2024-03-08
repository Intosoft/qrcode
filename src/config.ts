export type EyeFrameShape =
  | "body"
  | "square"
  | "circle"
  | "rounded"
  | "styleA"
  | "styleB"
  | "body-square"
  | "body-square-small"
  | "body-square-horizontal"
  | "body-square-vertical"
  | "body-circle"
  | "body-rounded-horizontal"
  | "body-rounded-vertical"
  | "body-diamond"
  | "body-star"
  | "body-star-small"
  | "body-circle-small";

export type EyeballShape =
  | "body"
  | "square"
  | "circle"
  | "rounded"
  | "styleA"
  | "styleB"
  | "styleC"
  | "body-square"
  | "body-square-small"
  | "body-square-horizontal"
  | "body-square-vertical"
  | "body-circle"
  | "body-rounded-horizontal"
  | "body-rounded-vertical"
  | "body-diamond"
  | "body-star"
  | "body-star-small"
  | "body-circle-small";

export type BodyShape =
  | "square"
  | "square-small"
  | "square-horizontal"
  | "square-vertical"
  | "circle"
  | "rounded-horizontal"
  | "rounded-vertical"
  | "diamond"
  | "star"
  | "star-small"
  | "circle-small";

export interface Config {
  length: number;
  value: string;
  logo?: {
    url: string;
    height: number;
    width: number;
  };
  shapes: {
    eyeFrame: EyeFrameShape;
    body: BodyShape;
    eyeball: EyeballShape;
  };
  colors: {
    background: string;
    body: string;
    eyeFrame: {
      topLeft: string;
      topRight: string;
      bottomLeft: string;
    };
    eyeball: {
      topLeft: string;
      topRight: string;
      bottomLeft: string;
    };
  };
}

export const defaultConfig: Config = {
  length: 200,
  value: "https://intosoft.com",
  logo: {
    url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjIuMSAxOTQuNyI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiM0MmM5ODU7fS5jbHMtMntmaWxsOiM2NmJmODM7fTwvc3R5bGU+PC9kZWZzPjxnIGlkPSJMYXllcl8yIiBkYXRhLW5hbWU9IkxheWVyIDIiPjxnIGlkPSJMYXllcl8xLTIiIGRhdGEtbmFtZT0iTGF5ZXIgMSI+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNOTQuMzYsNzUuNTljMTguMzksMTkuNzUsMTguNzYsNDkuMjguODIsNjZsLTUuMjQsNC44Ny03LjQ5LDctMy4xNSwzLjEyTDQwLjQ3LDE5Mi44N2E2Ljc3LDYuNzcsMCwwLDEtOS41Ny0uMzFMMCwxNTkuNTVsMTguNi0xNy40MWEyMi43OCwyMi43OCwwLDAsMSwxLjU5LTEuNjhsLjE1LS4xNCw4LjE3LTcuNjIsOS4wOS04LjQ3LjkyLS44NywxMS4yNy0xMC41MWExOSwxOSwwLDAsMCwxMi40NSwzLjYzLDE5LjE2LDE5LjE2LDAsMSwwLTE3LjQ0LTlMMzEuMTQsMTIwLjI1QTEuODEsMS44MSwwLDAsMSwyOC42LDEyMGwtLjg2LS45MkM5LjM1LDk5LjM3LDksNjkuODQsMjYuOTIsNTMuMTZMMzkuNjUsNDEuMzFsMzgtMzUuNzZMNzIsMTAuODhsOS42NC05LjA2YTYuNzMsNi43MywwLDAsMSw5LjUyLjMxbDMwLjkyLDMzTDEwMy41LDUyLjU3YTIwLjg1LDIwLjg1LDAsMCwxLTEuNTksMS42OGwtLjE1LjE0TDkzLjYsNjIsODcuMDcsNjguMWw2LjE1LDYuMzJaIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNOTQuMzYsNzUuNTlsLTEuMTQtMS4xN2EyLjI2LDIuMjYsMCwwLDEsLjI5LjI1WiIvPjwvZz48L2c+PC9zdmc+",
    height: 70,
    width: 105,
  },
  shapes: {
    eyeFrame: "circle",
    body: "rounded-vertical",
    eyeball: "circle",
  },
  colors: {
    background: "white",
    body: "rgb(90, 90, 90)",
    eyeFrame: {
      topLeft: "body",
      topRight: "body",
      bottomLeft: "body",
    },
    eyeball: {
      topLeft: "body",
      topRight: "body",
      bottomLeft: "body",
    },
  },
};
