import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { generateSVGString } from "@qrcode";
import { SvgFromXml } from "react-native-svg";
import logo from "./logo.svg";

const config = {
  length: 200,
  value: "https://intosoft.com",
  logo: {
    url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjIuMSAxOTQuNyI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiM0MmM5ODU7fS5jbHMtMntmaWxsOiM2NmJmODM7fTwvc3R5bGU+PC9kZWZzPjxnIGlkPSJMYXllcl8yIiBkYXRhLW5hbWU9IkxheWVyIDIiPjxnIGlkPSJMYXllcl8xLTIiIGRhdGEtbmFtZT0iTGF5ZXIgMSI+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNOTQuMzYsNzUuNTljMTguMzksMTkuNzUsMTguNzYsNDkuMjguODIsNjZsLTUuMjQsNC44Ny03LjQ5LDctMy4xNSwzLjEyTDQwLjQ3LDE5Mi44N2E2Ljc3LDYuNzcsMCwwLDEtOS41Ny0uMzFMMCwxNTkuNTVsMTguNi0xNy40MWEyMi43OCwyMi43OCwwLDAsMSwxLjU5LTEuNjhsLjE1LS4xNCw4LjE3LTcuNjIsOS4wOS04LjQ3LjkyLS44NywxMS4yNy0xMC41MWExOSwxOSwwLDAsMCwxMi40NSwzLjYzLDE5LjE2LDE5LjE2LDAsMSwwLTE3LjQ0LTlMMzEuMTQsMTIwLjI1QTEuODEsMS44MSwwLDAsMSwyOC42LDEyMGwtLjg2LS45MkM5LjM1LDk5LjM3LDksNjkuODQsMjYuOTIsNTMuMTZMMzkuNjUsNDEuMzFsMzgtMzUuNzZMNzIsMTAuODhsOS42NC05LjA2YTYuNzMsNi43MywwLDAsMSw5LjUyLjMxbDMwLjkyLDMzTDEwMy41LDUyLjU3YTIwLjg1LDIwLjg1LDAsMCwxLTEuNTksMS42OGwtLjE1LjE0TDkzLjYsNjIsODcuMDcsNjguMWw2LjE1LDYuMzJaIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNOTQuMzYsNzUuNTlsLTEuMTQtMS4xN2EyLjI2LDIuMjYsMCwwLDEsLjI5LjI1WiIvPjwvZz48L2c+PC9zdmc+",
    height: 83,
    width: 96,
  },
  shapes: {
    eyeFrame: "circle",
    body: "circle",
    eyeball: "circle",
  },
  colors: {
    background: "white",
    body: "linear-gradient(90deg, rgba(62,35,146,1) 3%, rgba(0,212,255,1) 100%)",
    eyeFrame: {
      topLeft: "rgb(146, 5, 225)",
      topRight: "rgb(146, 5, 225)",
      bottomLeft: "rgb(146, 5, 225)",
    },
    eyeball: {
      topLeft: "rgb(158, 118, 178)",
      topRight: "rgb(158, 118, 178)",
      bottomLeft: "rgb(158, 118, 178)",
    },
  },
};

const svgString = generateSVGString(config);

export default function App() {
  return (
    <View style={styles.container}>
      <SvgFromXml xml={svgString} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
