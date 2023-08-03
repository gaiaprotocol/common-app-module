import DomNode from "../dom/DomNode.js";
import Component from "./Component.js";
export default class PageFooter extends Component {
    constructor(options: {
        logo: DomNode;
        href?: string;
        social?: {
            twitter?: string;
            discord?: string;
            telegram?: string;
            github?: string;
            youtube?: string;
            kakaotalk?: string;
        };
        copyRight?: string;
        privacyPolicy?: string;
        termsOfService?: string;
    });
}
//# sourceMappingURL=PageFooter.d.ts.map