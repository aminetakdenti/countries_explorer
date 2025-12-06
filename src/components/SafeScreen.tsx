import React, { ReactNode } from "react";
import { View, ViewProps } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = { children: ReactNode } & ViewProps;

export const SafeScreen = ({ children, ...props }: Props) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
      }}
      {...props}
    >
      {children}
    </View>
  );
};
