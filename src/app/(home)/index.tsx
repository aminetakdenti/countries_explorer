import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  View,
} from "react-native";

import { CountryItem, Input, Loading, SafeScreen } from "@/src/components";
import { useCountry, usePagination } from "@/src/hooks";
import { styles } from "@/src/styles";
import { Icons } from "@/src/utils";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDebounce } from "use-debounce";

function SearchingState() {
  return (
    <View style={[styles.flex1, styles.center]}>
      <ActivityIndicator size="large" />
      <Text style={{ marginTop: 10 }}>Searching...</Text>
    </View>
  );
}

function EmptySearchResults({ search }: { search: string }) {
  return (
    <View style={[styles.flex1, styles.center]}>
      <Text style={{ fontSize: 16, color: "#666" }}>
        No countries found for {search}
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
        <Button title="Load More" onPress={onLoadMore} />
      </View>
    );
  }

  return null;
}

export default function Index() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const insets = useSafeAreaInsets();

  const query = useCountry(debouncedSearch);
  const { paginated, loadMore, hasMore, isLoadingMore } = usePagination(
    query.data || [],
    20,
  );

  const clearSearchValue = () => setSearch("");

  const isSearchEmpty =
    query.isSearching && paginated.length === 0 && !query.isInitialLoading;

  const onCountryPressHandler = useCallback((cca3: string) => {
    router.navigate(`/country/[${cca3}]`);
  }, []);

  return (
    <SafeScreen>
      <View style={{ flex: 1, paddingHorizontal: 25 }}>
        <Input
          value={search}
          onChangeText={setSearch}
          placeholder="Search countries..."
          leftView={
            <View style={{ marginRight: 8 }}>
              <Icons.SearchIcon width={20} height={20} />
            </View>
          }
          rightView={
            debouncedSearch.length > 0 && (
              <Pressable style={{ marginLeft: 8 }} onPress={clearSearchValue}>
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
            data={paginated}
            keyExtractor={(item) => item.cca3}
            onRefresh={query.refetch}
            refreshing={query.isRefetching}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: insets.bottom,
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
