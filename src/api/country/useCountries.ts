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

export const useCountry = (cca3: string) =>
  useQuery({
    queryKey: ["country", cca3],
    queryFn: () => countryService.getCountryByCca3(cca3),
    enabled: !!cca3,
  });
