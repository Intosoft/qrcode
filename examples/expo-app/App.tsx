import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { generateSVGString } from "@qrcode";
import { SvgFromXml } from "react-native-svg";

const svgString = generateSVGString();

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
