import { resolve } from "path";

export const isProd = process.env.NODE_ENV === "production";
export const distFolder = resolve(__dirname, "../dist");
export function generateRandomString(length) {
    let varChars = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
        varChars += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return varChars
};