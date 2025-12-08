import React from "react";
import { Image, Pressable, Text, View } from "react-native";

import { useCountry } from "@/src/api";
import { Button, SafeScreen } from "@/src/components";
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
        accessible
        accessibilityRole="button"
        accessibilityLabel={t("country.goBack")}
        accessibilityHint={t("country.goBackHint")}
      >
        <Icons.LeftArrowIcon width={24} height={34} />
      </Pressable>

      <Text
        style={[
          styles.fontBold,
          { fontSize: 24, fontWeight: "700", marginVertical: 10 },
        ]}
        accessibilityRole="header"
        accessible
        accessibilityLabel={t("country.headerTitle")}
      >
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
          <Text style={[styles.font, { fontSize: 16, color: "#666" }]}>
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
            accessible
            accessibilityRole="image"
            accessibilityLabel={`Flag of ${currentCountry.data?.name.common}`}
          />
        </View>
        <Text
          style={[
            styles.fontBold,
            { fontSize: 20, fontWeight: "700", marginTop: 20 },
          ]}
          accessible
          accessibilityRole="text"
          accessibilityLabel={`Country name: ${currentCountry.data?.name.common}`}
        >
          {currentCountry.data?.name.common}
        </Text>
        <Text
          style={[styles.font, { fontSize: 16, marginTop: 5 }]}
          accessible
          accessibilityRole="text"
          accessibilityLabel={`Capital: ${currentCountry.data?.capital?.[0] || t("country.capital")}`}
        >
          {currentCountry.data?.capital?.[0] || t("country.capital")}
        </Text>
        <Text
          style={[styles.font, { fontSize: 16, marginTop: 5 }]}
          accessible
          accessibilityRole="text"
          accessibilityLabel={`Region: ${currentCountry.data?.region}`}
        >
          {currentCountry.data?.region}
        </Text>
        <Text
          style={[styles.font, { fontSize: 16, marginTop: 5 }]}
          accessible
          accessibilityRole="text"
          accessibilityLabel={`Population: ${currentCountry.data?.population.toLocaleString()}`}
        >
          {currentCountry.data?.population.toLocaleString()}
        </Text>
        <Text
          style={[styles.font, { fontSize: 16, marginTop: 5 }]}
          accessible
          accessibilityRole="text"
          accessibilityLabel={`Country code: ${currentCountry.data?.cca3}`}
        >
          {currentCountry.data?.cca3}
        </Text>
      </View>
    </SafeScreen>
  );
}
