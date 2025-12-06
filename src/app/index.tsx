import { useState } from "react";
import {
  Button,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  Text,
  View,
} from "react-native";

import { useCountries, useSearchCountries } from "@/src/api";
import { Input, SafeScreen } from "@/src/components";
import { usePagination } from "@/src/hooks";
import { Icons } from "@/src/utils";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDebounce } from "use-debounce";

export default function Index() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);

  const insets = useSafeAreaInsets();

  const all = useCountries();

  const searchQuery = useSearchCountries(debouncedSearch);

  const countries = debouncedSearch.length > 0 ? searchQuery.data : all.data;
  const refetch =
    debouncedSearch.length > 0 ? searchQuery.refetch : all.refetch;
  const isRefetching =
    debouncedSearch.length > 0 ? searchQuery.isRefetching : all.isRefetching;

  const { paginated, loadMore, hasMore, isLoadingMore } = usePagination(
    countries || [],
    20,
  );

  const clearSearchValue = () => {
    setSearch("");
  };

  if (all.isLoading) {
    return (
      <SafeScreen
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Loading...</Text>
      </SafeScreen>
    );
  }

  if (all.isError) {
    return (
      <SafeScreen
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>{all.error?.message}</Text>
      </SafeScreen>
    );
  }

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

        <FlatList
          data={paginated}
          keyExtractor={(item) => item.cca3}
          onRefresh={refetch}
          refreshing={isRefetching}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: insets.bottom,
          }}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 10,
                  gap: 10,
                }}
              >
                <Image
                  source={{ uri: item.flags.png }}
                  style={{ height: 40, width: 60 }}
                />
                <View>
                  <Text>{item.name.common}</Text>
                  <Text>{item.cca3}</Text>
                </View>
              </View>
            );
          }}
          ListFooterComponent={
            isLoadingMore ? (
              <Text>Loading more...</Text>
            ) : hasMore ? (
              <Button title="Load More" onPress={loadMore} />
            ) : null
          }
        />
      </View>
    </SafeScreen>
  );
}
