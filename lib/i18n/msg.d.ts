import { DomChild } from "../dom/DomNode.js";
import I18NText from "./I18NText.js";
declare function msg(keyOrMessages: string | I18NText, replacements?: {
    [key: string]: string | number | undefined;
}, defaultLanguage?: string): string;
declare namespace msg {
    var setMessages: (messages: {
        [lang: string]: {
            [key: string]: string;
        };
    }) => Promise<void>;
    var getMessages: (key: string) => I18NText;
    var getLangMessages: (keyOrMessages: string | I18NText, defaultLanguage?: string) => {
        [x: string]: any;
    };
}
export declare function msgs(keyOrMessages: string | I18NText, replacements?: {
    [key: string]: DomChild;
}, defaultLanguage?: string): DomChild[];
export default msg;
//# sourceMappingURL=msg.d.ts.map