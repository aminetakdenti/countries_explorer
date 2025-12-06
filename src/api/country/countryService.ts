import { api } from "../api";
import { Countries, countriesSchema } from "./country.schema";

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
};
