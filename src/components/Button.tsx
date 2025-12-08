import React from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

import { styles } from "@/src/styles";

interface Props extends TouchableOpacityProps {
  onPress: () => void;
  title: string;
  titleStyle?: TextStyle;
  style?: ViewStyle;
}

export function Button({
  onPress,
  title,
  titleStyle,
  style,
  accessibilityLabel,
  accessible = true,
  ...props
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[buttonStyles.button, style]}
      accessible={accessible}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      {...props}
    >
      <Text style={[styles.font, buttonStyles.buttonText, titleStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const buttonStyles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
