import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  View,
} from "react-native";

import {
  Button,
  CountryItem,
  Input,
  Loading,
  SafeScreen,
} from "@/src/components";
import { useCountry, usePagination } from "@/src/hooks";
import { styles } from "@/src/styles";
import { Icons } from "@/src/utils";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDebounce } from "use-debounce";

function SearchingState() {
  const { t } = useTranslation();
  return (
    <View style={[styles.flex1, styles.center]}>
      <ActivityIndicator size="large" />
      <Text style={[styles.font, { marginTop: 10 }]}>
        {t("home.searching")}
      </Text>
    </View>
  );
}

function EmptySearchResults({ search }: { search: string }) {
  const { t } = useTranslation();
  return (
    <View style={[styles.flex1, styles.center]}>
      <Text style={[styles.font, { fontSize: 16, color: "#666" }]}>
        {t("home.noCountriesFound")}
        {search}
      </Text>
    </View>
  );
}

function ListFooter({
  isLoadingMore,
  hasMore,
  onLoadMore,
}: {
  isLoadingMore: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}) {
  const { t } = useTranslation();

  if (isLoadingMore) {
    return (
      <View style={{ paddingVertical: 20, alignItems: "center" }}>
        <ActivityIndicator size="small" />
      </View>
    );
  }

  if (hasMore) {
    return (
      <View style={{ paddingVertical: 10 }}>
        <Button
          title={t("home.loadMore")}
          accessibilityLabel={t("home.loadMore")}
          accessibilityRole="button"
          onPress={onLoadMore}
        />
      </View>
    );
  }

  return null;
}

export default function Index() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const query = useCountry(debouncedSearch);
  const { paginated, loadMore, hasMore, isLoadingMore } = usePagination(
    query.data || [],
    20,
  );

  const clearSearchValue = () => setSearch("");

  const isSearchEmpty =
    query.isSearching && paginated.length === 0 && !query.isInitialLoading;

  const onCountryPressHandler = useCallback((cca3: string) => {
    router.navigate(`/country/${cca3}`);
  }, []);

  return (
    <SafeScreen>
      <View style={{ flex: 1, paddingHorizontal: 25 }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            accessibilityRole="header"
            accessible
            accessibilityLabel={t("home.headerTitle")}
            style={[
              styles.fontBold,
              { fontSize: 24, fontWeight: "700", marginVertical: 10 },
            ]}
          >
            {t("home.headerTitle")}
          </Text>
        </View>

        <Input
          value={search}
          onChangeText={setSearch}
          placeholder={t("home.searchPlaceholder")}
          accessibilityLabel={t("home.searchPlaceholder")}
          accessibilityHint={t("home.searchCountryHint")}
          placeholderTextColor="#999"
          containerStyle={{ marginTop: 15 }}
          leftView={
            <View style={{ marginRight: 8 }}>
              <Icons.SearchIcon width={20} height={20} />
            </View>
          }
          rightView={
            debouncedSearch.length > 0 && (
              <Pressable
                accessible
                accessibilityRole="button"
                accessibilityLabel={t("home.clearSearch")}
                style={{ marginLeft: 8 }}
                onPress={clearSearchValue}
              >
                <Icons.ClearIcon width={20} height={20} />
              </Pressable>
            )
          }
        />

        {query.isInitialLoading && !query.isSearching ? (
          <Loading />
        ) : query.isInitialLoading && query.isSearching ? (
          <SearchingState />
        ) : (
          <FlatList
            accessible
            accessibilityLabel={t("home.countriesList")}
            data={paginated}
            keyExtractor={(item) => item.cca3}
            onRefresh={query.refetch}
            refreshing={query.isRefetching}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: insets.bottom,
              marginTop: 20,
              flexGrow: 1,
            }}
            refreshControl={
              <RefreshControl
                refreshing={query.isRefetching}
                onRefresh={query.refetch}
              />
            }
            ListEmptyComponent={
              isSearchEmpty ? (
                <EmptySearchResults search={debouncedSearch} />
              ) : null
            }
            renderItem={({ item }) => (
              <CountryItem
                item={item}
                onPress={() => onCountryPressHandler(item.cca3)}
              />
            )}
            ListFooterComponent={
              <ListFooter
                isLoadingMore={isLoadingMore}
                hasMore={hasMore}
                onLoadMore={loadMore}
              />
            }
          />
        )}
      </View>
    </SafeScreen>
  );
}
