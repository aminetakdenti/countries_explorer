import { api } from "../api";
import { Countries, countriesSchema, countrySchema } from "./country.schema";

const FIELDS = [
  "name",
  "flags",
  "cca3",
  "capital",
  "region",
  "population",
].join(",");

export const countryService = {
  getAllCountries: async (): Promise<Countries> => {
    const res = await api.get(`/all?fields=${FIELDS}`);

    const parsed = countriesSchema.safeParse(res.data);
    if (!parsed.success) {
      throw new Error(parsed.error.message);
    }

    return parsed.data;
  },

  searchCountries: async (name: string): Promise<Countries> => {
    const res = await api.get(`/name/${name}?fields=${FIELDS}`);

    const parsed = countriesSchema.safeParse(res.data);
    if (!parsed.success) {
      throw new Error(parsed.error.message);
    }

    return parsed.data;
  },

  getCountryByCca3: async (cca3: string) => {
    const res = await api.get(`/alpha/${cca3}?fields=${FIELDS}`);

    const parsed = countrySchema.safeParse(res.data);
    if (!parsed.success) {
      throw new Error(parsed.error.message);
    }

    return parsed.data;
  },
};
