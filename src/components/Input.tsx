import React from "react";
import { TextInput, TextInputProps, View, ViewStyle } from "react-native";

type Props = {
  leftView?: React.ReactNode;
  rightView?: React.ReactNode;
  containerStyle?: ViewStyle;
} & TextInputProps;

export const Input = ({
  leftView,
  rightView,
  containerStyle,
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
    >
      {leftView}
      <TextInput
        style={{
          height: "100%",
          flex: 1,
        }}
        {...props}
      />
      {rightView}
    </View>
  );
};
