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
};

const msg = (
  keyOrMessages: string | I18NText,
  replacements: { [key: string]: string | number | undefined } = {},
  defaultLanguage: string = "en",
) => {
  const messages: I18NText = typeof keyOrMessages === "string"
    ? data[keyOrMessages]
    : keyOrMessages;
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

msg.setMessages = async (
  messages: { [lang: string]: { [key: string]: string } },
) => {
  for (const [lang, ms] of Object.entries(messages)) {
    if (ms) {
      for (const [key, message] of Object.entries(ms)) {
        if (data[key] === undefined) {
          data[key] = {};
        }
        (data[key] as any)[lang] = message;
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

msg.getMessages = (key: string) => {
  return data[key];
};

msg.getLangMessages = (
  keyOrMessages: string | I18NText,
  defaultLanguage: string = "en",
) => {
  const { language, locale } = getNormalizedLanguage();

  const messages = typeof keyOrMessages === "string"
    ? data[keyOrMessages]
    : keyOrMessages;
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
};

export default msg;
