import { useCountries, useSearchCountries } from "@/src/api";

export function useCountry(search: string) {
  const all = useCountries();
  const searchQuery = useSearchCountries(search);
  const isSearching = search.length > 0;

  return {
    data: isSearching ? searchQuery.data : all.data,
    refetch: isSearching ? searchQuery.refetch : all.refetch,
    isRefetching: isSearching ? searchQuery.isRefetching : all.isRefetching,
    isInitialLoading: isSearching ? searchQuery.isLoading : all.isLoading,
    isSearching,
  };
}
