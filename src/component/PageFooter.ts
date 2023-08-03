import DomNode from "../dom/DomNode.js";
import ResponsiveImage from "../dom/ResponsiveImage.js";
import el from "../dom/el.js";
import Component from "./Component.js";

export default class PageFooter extends Component {

    constructor(options: {
        logo: DomNode,
        href?: string,
        social?: {
            twitter?: string,
            discord?: string,
            telegram?: string,
            github?: string,
            youtube?: string,
            kakaotalk?: string,
        },
        copyRight?: string,
        privacyPolicy?: string,
        termsOfService?: string,
    }) {
        super("footer.page-footer");

        this.append(
            el(".container",

                el(".contact",
                    options.logo,
                    el(".social",
                        options.social?.twitter ? el("a", el("i.fa-brands.fa-twitter"), {
                            href: options.social.twitter,
                            target: "_blank",
                        }) : undefined,
                        options.social?.discord ? el("a", el("i.fa-brands.fa-discord"), {
                            href: options.social.discord,
                            target: "_blank",
                        }) : undefined,
                        options.social?.telegram ? el("a", el("i.fa-brands.fa-telegram"), {
                            href: options.social.telegram,
                            target: "_blank",
                        }) : undefined,
                        options.social?.github ? el("a", el("i.fa-brands.fa-github"), {
                            href: options.social.github,
                            target: "_blank",
                        }) : undefined,
                        options.social?.youtube ? el("a", el("i.fa-brands.fa-youtube"), {
                            href: options.social.youtube,
                            target: "_blank",
                        }) : undefined,
                        options.social?.kakaotalk ? el("a", new ResponsiveImage("img", "https://resources.gaia.cc/signer-logos/kakaotalk.png"), {
                            href: options.social.kakaotalk,
                            target: "_blank",
                        }) : undefined,
                    ),
                ),

                el(".bottom",
                    options.copyRight ? el(".copy-right", options.copyRight) : undefined,
                    options.privacyPolicy ? el(".privacy", el("a", "Privacy Policy", {
                        href: options.privacyPolicy,
                        target: "_blank",
                    })) : undefined,
                    options.termsOfService ? el(".terms", el("a", "Terms of Service", {
                        href: options.termsOfService,
                        target: "_blank",
                    })) : undefined,
                ),
            ),
        );
    }
}
