import React from "react";
import { Button, Image, Pressable, Text, View } from "react-native";

import { useCountry } from "@/src/api";
import { SafeScreen } from "@/src/components";
import { styles } from "@/src/styles";
import { Icons } from "@/src/utils";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

type Params = {
  cca3: string;
};

function Header() {
  const { t } = useTranslation();
  const router = useRouter();
  return (
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

      <Text style={{ fontSize: 24, fontWeight: "bold", marginVertical: 10 }}>
        {t("country.headerTitle")}
      </Text>
    </View>
  );
}

function CountryDetailsSkeleton() {
  return (
    <SafeScreen>
      <View style={[styles.container]}>
        <Header />
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item height={240} borderRadius={10} />
          <SkeletonPlaceholder.Item height={20} width={190} marginTop={20} />
          <SkeletonPlaceholder.Item height={15} width={130} marginTop={10} />
          <SkeletonPlaceholder.Item height={15} width={90} marginTop={10} />
          <SkeletonPlaceholder.Item height={15} width={200} marginTop={10} />
          <SkeletonPlaceholder.Item height={15} width={30} marginTop={10} />
        </SkeletonPlaceholder>
      </View>
    </SafeScreen>
  );
}

function CountryError({ onPress }: { onPress: () => void }) {
  const { t } = useTranslation();
  return (
    <SafeScreen>
      <View style={[styles.container]}>
        <Header />
        <View style={[styles.flex1, styles.center, { marginBottom: 100 }]}>
          <Text style={{ fontSize: 16, color: "#666" }}>
            {t("country.errorLoadingCountry")}
          </Text>
          <Button title={t("country.refetch")} onPress={onPress} />
        </View>
      </View>
    </SafeScreen>
  );
}

export default function Index() {
  const { cca3 } = useLocalSearchParams<Params>();
  const currentCountry = useCountry(cca3);

  const { t } = useTranslation();

  if (currentCountry.isError) {
    return <CountryError onPress={() => currentCountry.refetch()} />;
  }

  if (currentCountry.isLoading) {
    return <CountryDetailsSkeleton />;
  }

  return (
    <SafeScreen>
      <View style={[styles.container]}>
        <Header />
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
          {currentCountry.data?.capital?.[0] || t("country.capital")}
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
