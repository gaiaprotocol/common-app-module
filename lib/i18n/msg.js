import messages_de from "../../locales/de.yml";
import messages_en from "../../locales/en.yml";
import messages_es from "../../locales/es.yml";
import messages_fr from "../../locales/fr.yml";
import messages_it from "../../locales/it.yml";
import messages_ja from "../../locales/ja.yml";
import messages_ko from "../../locales/ko.yml";
import messages_pt from "../../locales/pt.yml";
import messages_ru from "../../locales/ru.yml";
import messages_zh from "../../locales/zh.yml";
import messages_zh_HK from "../../locales/zh_HK.yml";
import messages_zh_TW from "../../locales/zh_TW.yml";
import BrowserInfo from "../browser/BrowserInfo.js";
const data = {};
function getNormalizedLanguage() {
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
}
function getMessage(keyOrMessages, defaultLanguage) {
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
        return str === undefined ? "" : str;
    }
    return "";
}
function msg(keyOrMessages, replacements = {}, defaultLanguage = "en") {
    let message = getMessage(keyOrMessages, defaultLanguage);
    for (const [key, value] of Object.entries(replacements)) {
        const regex = new RegExp(`\{${key}\}`, "g");
        message = message.replace(regex, String(value ?? ""));
    }
    return message;
}
export function msgs(keyOrMessages, replacements = {}, defaultLanguage = "en") {
    const message = getMessage(keyOrMessages, defaultLanguage);
    const parts = message.split(/\{|\}/);
    const elements = [];
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (i % 2 === 0) {
            elements.push(part);
        }
        else {
            elements.push(replacements[part]);
        }
    }
    return elements;
}
msg.setMessages = async (messages) => {
    for (const [lang, ms] of Object.entries(messages)) {
        if (ms) {
            for (const [key, message] of Object.entries(ms)) {
                if (data[key] === undefined) {
                    data[key] = {};
                }
                data[key][lang] = message;
            }
        }
    }
};
msg.setMessages({
    en: messages_en,
    ko: messages_ko,
    es: messages_es,
    fr: messages_fr,
    de: messages_de,
    it: messages_it,
    pt: messages_pt,
    ru: messages_ru,
    zh: messages_zh,
    "zh-tw": messages_zh_TW,
    "zh-hk": messages_zh_HK,
    ja: messages_ja,
});
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