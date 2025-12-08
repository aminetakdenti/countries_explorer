import React from "react";
import {
  StyleProp,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

import { styles } from "@/src/styles";

interface Props extends TextInputProps {
  leftView?: React.ReactNode;
  rightView?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export const Input = ({
  leftView,
  rightView,
  containerStyle,
  accessibilityLabel,
  accessibilityHint,
  ...props
}: Props) => {
  return (
    <View
      style={[
        {
          width: "100%",
          height: 40,
          borderWidth: 1,
          borderColor: "black",
          borderRadius: 4,
          paddingHorizontal: 8,
          flexDirection: "row",
          alignItems: "center",
        },
        containerStyle,
      ]}
      accessible={false} // container should not be a single accessible element
    >
      {leftView}

      <TextInput
        style={[
          {
            height: "100%",
            width: "100%",
            flex: 1,
          },
          styles.font,
          props.style,
        ]}
        accessibilityLabel={accessibilityLabel ?? props.placeholder}
        accessibilityHint={accessibilityHint}
        {...props}
      />

      {rightView}
    </View>
  );
};
