import React from "react";
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";

interface Props extends PressableProps {
  onPress: () => void;
  title: string;
  titleStyle?: TextStyle;
  style?: ViewStyle;
}

export function Button({ onPress, title, titleStyle, style, ...props }: Props) {
  return (
    <Pressable onPress={onPress} style={[styles.button, style]} {...props}>
      <Text style={[styles.buttonText, titleStyle]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
