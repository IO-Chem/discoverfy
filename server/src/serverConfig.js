import { resolve } from "path";

const isProd = process.env.NODE_ENV === "production";
const distFolder = resolve(__dirname, "../dist");

function generateRandomString(length) {
    let varChars = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
        varChars += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return varChars
};

export { isProd, distFolder, generateRandomString }