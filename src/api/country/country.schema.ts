import { z } from "zod";

const nameSchema = z.object({
  common: z.string(),
  official: z.string(),
});

const flagsSchema = z.object({
  png: z.string().url().optional(),
  svg: z.string().url().optional(),
  alt: z.string().optional(),
});

export const countrySchema = z
  .object({
    name: nameSchema,
    flag: z.string().optional(),
    flags: flagsSchema,
    cca3: z.string(),
    capital: z.array(z.string()).optional(),
    region: z.string(),
    population: z.number(),
  })
  .passthrough();

export const countriesSchema = z.array(countrySchema);

export type Country = z.infer<typeof countrySchema>;
export type Countries = z.infer<typeof countriesSchema>;
