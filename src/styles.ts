import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
  flex1: {
    flex: 1,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  layoutRow: {
    flexDirection: "row",
  },
  layoutCol: {
    flexDirection: "column",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  font: {
    fontFamily: "SpaceMono",
  },
  fontBold: {
    fontFamily: "SpaceMonoBold",
  },
  tabFocused: { color: "#007AFF" },
  tabUnfocused: { color: "#8E8E93" },
});
