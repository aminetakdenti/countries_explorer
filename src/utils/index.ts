import { z } from "zod";

export function isValidSvg(url: string | undefined) {
  if (!url) return false;
  const parse = z.url().safeParse(url);
  if (!parse.success) {
    return false;
  }
  return url.endsWith(".svg");
}

export * from "./icons";
