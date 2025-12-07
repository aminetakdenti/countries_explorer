import React from "react";
import { Image, Pressable, Text, View } from "react-native";

import { useCountry } from "@/src/api";
import { SafeScreen } from "@/src/components";
import { styles } from "@/src/styles";
import { Icons } from "@/src/utils";
import { useLocalSearchParams, useRouter } from "expo-router";

type Params = {
  cca3: string;
};

export default function Index() {
  const { cca3 } = useLocalSearchParams<Params>();
  const currentCountry = useCountry(cca3);

  const router = useRouter();

  if (currentCountry.isLoading) {
    return (
      <SafeScreen>
        <Text>Loading...</Text>
      </SafeScreen>
    );
  }

  return (
    <SafeScreen>
      <View style={[styles.container]}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Pressable
            style={{
              position: "absolute",
              left: 0,
              height: 40,
              width: 40,
              justifyContent: "center",
              alignItems: "flex-start",
            }}
            onPress={() => router.back()}
          >
            <Icons.LeftArrowIcon width={24} height={34} />
          </Pressable>

          <Text
            style={{ fontSize: 24, fontWeight: "bold", marginVertical: 10 }}
          >
            Country Details
          </Text>
        </View>

        <View
          style={{
            height: 240,
            width: "100%",
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <Image
            source={{ uri: currentCountry.data?.flags.png }}
            style={{ height: "100%", width: "100%" }}
          />
        </View>

        <Text style={{ fontSize: 20, fontWeight: "700", marginTop: 20 }}>
          {currentCountry.data?.name.common}
        </Text>

        <Text style={{ fontSize: 16, marginTop: 5 }}>
          {currentCountry.data?.capital?.[0] || "N/A"}
        </Text>
        <Text style={{ fontSize: 16, marginTop: 5 }}>
          {currentCountry.data?.region}
        </Text>
        <Text style={{ fontSize: 16, marginTop: 5 }}>
          {currentCountry.data?.population.toLocaleString()}
        </Text>
        <Text style={{ fontSize: 16, marginTop: 5 }}>
          {currentCountry.data?.cca3}
        </Text>
      </View>
    </SafeScreen>
  );
}
