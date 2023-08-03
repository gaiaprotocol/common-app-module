import yaml from "js-yaml";
import BrowserInfo from "../browser/BrowserInfo.js";
import I18NText from "./I18NText.js";

const data: { [key: string]: I18NText } = {};

const getNormalizedLanguage = () => {
    let language: string = "";
    let locale: string = "";

    if (BrowserInfo.language.length === 2) {
        language = BrowserInfo.language.toLowerCase();
    } else {
        language = BrowserInfo.language.substring(0, 2).toLowerCase();
        locale = BrowserInfo.language.substring(3).toLowerCase();
    }

    return { language, locale };
}

const msg = (keyOrMessages: string | I18NText, replacements: { [key: string]: string | number } = {}, defaultLanguage: string = "en") => {

    const messages: I18NText = typeof keyOrMessages === "string" ? data[keyOrMessages] : keyOrMessages;
    if (messages === undefined) {
        console.error(`${keyOrMessages} not exists.`);
    } else {

        let str = (messages as any)[BrowserInfo.language];
        if (str === undefined) {

            const { language, locale } = getNormalizedLanguage();

            str = (messages as any)[language];
            if (typeof str === "object") {
                if (str[locale] !== undefined) {
                    str = str[locale];
                } else {
                    // if not found, return the first string
                    str = str[Object.keys(str)[0]];
                }
            }
        }

        if (str === undefined) {
            const message = (messages as any)[defaultLanguage];
            if (message !== undefined) {
                str = message;
            } else {
                str = (messages as any)[Object.keys(messages)[0]];
            }
        }

        if (str !== undefined && typeof str === "object") {
            // if not found, return the first string
            str = str[Object.keys(str)[0]];
        }

        if (str !== undefined) {
            for (const [key, value] of Object.entries(replacements)) {
                // Assumes the template string uses {key} for replacements
                const regex = new RegExp(`\{${key}\}`, "g");
                str = str.replace(regex, String(value));
            }
        }

        return str === undefined ? "" : str;
    }

    return "";
};

msg.loadYAML = (lang: string, content: string) => {
    const raw: any = yaml.load(content);
    for (const [key, value] of Object.entries(raw)) {
        if (data[key] === undefined) {
            data[key] = {};
        }
        (data[key] as any)[lang] = value;
    }
};

msg.loadYAMLs = async (paths: { [lang: string]: string[] }) => {
    const promises: Promise<void>[] = [];
    for (const [lang, urls] of Object.entries(paths)) {
        for (const url of urls) {
            promises.push((async () => {
                const raw: any = yaml.load(await (await fetch(url)).text());
                if (raw !== undefined) {
                    for (const [key, value] of Object.entries(raw)) {
                        if (data[key] === undefined) {
                            data[key] = {};
                        }
                        (data[key] as any)[lang] = value;
                    }
                }
            })());
        }
    }
    await Promise.all(promises);
};

msg.getMessages = (key: string) => {
    return data[key];
};

msg.getLangMessages = (keyOrMessages: string | I18NText, defaultLanguage: string = "en") => {

    const { language, locale } = getNormalizedLanguage();

    const messages = typeof keyOrMessages === "string" ? data[keyOrMessages] : keyOrMessages;
    if (messages === undefined) {
        console.error(`${keyOrMessages} not exists.`);
    } else {

        let str = (messages as any)[BrowserInfo.language];
        if (str === undefined) {

            str = (messages as any)[language];
            if (str !== undefined) {
                if (typeof str === "object") {
                    if (str[locale] !== undefined) {
                        str = str[locale];
                    } else {
                        // if not found, return the first string
                        str = str[Object.keys(str)[0]];
                    }
                }
            }
        }

        if (str === undefined) {
            const message = (messages as any)[defaultLanguage];
            if (message !== undefined) {
                str = message;
            } else {
                str = (messages as any)[Object.keys(messages)[0]];
            }
        }

        if (str !== undefined && typeof str === "object") {
            // if not found, return the first string
            str = str[Object.keys(str)[0]];
        }

        return {
            [language]: str === undefined ? "" : str,
        };
    }

    return {
        [language]: "",
    };
}

export default msg;
