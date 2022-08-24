import { resolve } from "path";

export const isProd = process.env.NODE_ENV === "production";
export const distFolder = resolve(__dirname, "../dist");