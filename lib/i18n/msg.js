import yaml from "js-yaml";
import BrowserInfo from "../browser/BrowserInfo.js";
import common_words from "./common_words.json" assert { type: "json" };
const data = common_words;
const getNormalizedLanguage = () => {
    let language = "";
    let locale = "";
    if (BrowserInfo.language.length === 2) {
        language = BrowserInfo.language.toLowerCase();
    }
    else {
        language = BrowserInfo.language.substring(0, 2).toLowerCase();
        locale = BrowserInfo.language.substring(3).toLowerCase();
    }
    return { language, locale };
};
const msg = (keyOrMessages, replacements = {}, defaultLanguage = "en") => {
    const messages = typeof keyOrMessages === "string"
        ? data[keyOrMessages]
        : keyOrMessages;
    if (messages === undefined) {
        console.error(`${keyOrMessages} not exists.`);
    }
    else {
        let str = messages[BrowserInfo.language];
        if (str === undefined) {
            const { language, locale } = getNormalizedLanguage();
            str = messages[language];
            if (typeof str === "object") {
                if (str[locale] !== undefined) {
                    str = str[locale];
                }
                else {
                    str = str[Object.keys(str)[0]];
                }
            }
        }
        if (str === undefined) {
            const message = messages[defaultLanguage];
            if (message !== undefined) {
                str = message;
            }
            else {
                str = messages[Object.keys(messages)[0]];
            }
        }
        if (str !== undefined && typeof str === "object") {
            str = str[Object.keys(str)[0]];
        }
        if (str !== undefined) {
            for (const [key, value] of Object.entries(replacements)) {
                const regex = new RegExp(`\{${key}\}`, "g");
                str = str.replace(regex, String(value));
            }
        }
        return str === undefined ? "" : str;
    }
    return "";
};
msg.loadYAML = (lang, content) => {
    const raw = yaml.load(content);
    for (const [key, value] of Object.entries(raw)) {
        if (data[key] === undefined) {
            data[key] = {};
        }
        data[key][lang] = value;
    }
};
msg.loadYAMLs = async (paths) => {
    const promises = [];
    for (const [lang, urls] of Object.entries(paths)) {
        for (const url of urls) {
            promises.push((async () => {
                const raw = yaml.load(await (await fetch(url)).text());
                if (raw !== undefined) {
                    for (const [key, value] of Object.entries(raw)) {
                        if (data[key] === undefined) {
                            data[key] = {};
                        }
                        data[key][lang] = value;
                    }
                }
            })());
        }
    }
    await Promise.all(promises);
};
msg.getMessages = (key) => {
    return data[key];
};
msg.getLangMessages = (keyOrMessages, defaultLanguage = "en") => {
    const { language, locale } = getNormalizedLanguage();
    const messages = typeof keyOrMessages === "string"
        ? data[keyOrMessages]
        : keyOrMessages;
    if (messages === undefined) {
        console.error(`${keyOrMessages} not exists.`);
    }
    else {
        let str = messages[BrowserInfo.language];
        if (str === undefined) {
            str = messages[language];
            if (str !== undefined) {
                if (typeof str === "object") {
                    if (str[locale] !== undefined) {
                        str = str[locale];
                    }
                    else {
                        str = str[Object.keys(str)[0]];
                    }
                }
            }
        }
        if (str === undefined) {
            const message = messages[defaultLanguage];
            if (message !== undefined) {
                str = message;
            }
            else {
                str = messages[Object.keys(messages)[0]];
            }
        }
        if (str !== undefined && typeof str === "object") {
            str = str[Object.keys(str)[0]];
        }
        return {
            [language]: str === undefined ? "" : str,
        };
    }
    return {
        [language]: "",
    };
};
export default msg;
//# sourceMappingURL=msg.js.map