import { useEffect } from "react";

import "@/src/translation/i18n";

import { LanguageProvider } from "@/src/translation/LanguageContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useTranslation } from "react-i18next";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { styles } from "../styles";
import { Icons } from "../utils";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5,
    },
  },
});

function TabsLayout() {
  const { t } = useTranslation();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: t("tabs.home"),
          tabBarIcon(props) {
            return (
              <Icons.HomeIcon
                width={24}
                height={24}
                color={
                  props.focused
                    ? styles.tabFocused.color
                    : styles.tabUnfocused.color
                }
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="(settings)/index"
        options={{
          title: t("tabs.settings"),
          tabBarIcon(props) {
            return (
              <Icons.SettingsIcon
                width={24}
                height={24}
                color={
                  props.focused
                    ? styles.tabFocused.color
                    : styles.tabUnfocused.color
                }
              />
            );
          },
        }}
      />
    </Tabs>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
    SpaceMonoBold: require("@/assets/fonts/SpaceMono-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <TabsLayout />
        </QueryClientProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}
