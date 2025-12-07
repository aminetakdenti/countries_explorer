import React from "react";
import { Text } from "react-native";

import { useCountry } from "@/src/api";
import { SafeScreen } from "@/src/components";
import { useLocalSearchParams } from "expo-router";

type Params = {
  cca3: string;
};

export default function Index() {
  const { cca3 } = useLocalSearchParams<Params>();
  const currentCountry = useCountry(cca3);

  console.log("here: ", currentCountry.data);

  return (
    <SafeScreen>
      <Text>index</Text>
    </SafeScreen>
  );
}
