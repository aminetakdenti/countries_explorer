import { useQuery } from "@tanstack/react-query";

import { countryService } from "./countryService";

export const useCountries = () =>
  useQuery({
    queryKey: ["countries"],
    queryFn: () => countryService.getAllCountries(),
  });

export const useSearchCountries = (search: string) =>
  useQuery({
    queryKey: ["countries", search],
    queryFn: () => countryService.searchCountries(search),
    enabled: search.length > 0,
  });
