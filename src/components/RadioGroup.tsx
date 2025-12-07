import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

import { styles } from "../styles";

type RadioOption = {
  label: string;
  value: string | number;
  isSelected: boolean;
};

type RadioGroupProps = {
  options: RadioOption[];
  selectedValue: RadioOption["value"];
  onValueChange: (value: string | number) => void;
  containerStyle?: StyleProp<ViewStyle>;
  optionStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

export function RadioGroup({
  options,
  selectedValue,
  onValueChange,
  containerStyle,
  optionStyle,
  labelStyle,
}: RadioGroupProps) {
  return (
    <View style={[radioGroupStyles.container, containerStyle]}>
      {options.map((option) => {
        return (
          <Pressable
            key={option.value}
            style={[radioGroupStyles.option, optionStyle]}
            onPress={() => onValueChange(option.value)}
          >
            <View style={[radioGroupStyles.circle]}>
              <View
                style={[option.isSelected && radioGroupStyles.selectedCircle]}
              />
            </View>
            <Text style={[styles.font, radioGroupStyles.label, labelStyle]}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const radioGroupStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 10,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  circle: {
    width: 15,
    height: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedCircle: {
    height: 7,
    width: 7,
    borderRadius: 10,
    backgroundColor: "#007AFF",
  },
  label: {
    fontSize: 16,
    color: "#000",
  },
});
