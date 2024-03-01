import IconSystem from "./IconSystem.js";
class MaterialIconSystem {
    launch() {
        IconSystem.baseIconTag =
            "span.icon.material-icon.material-symbols-outlined";
        IconSystem.createContent = (iconName) => {
            if (iconName === "x")
                return "close";
            if (iconName === "error")
                return "error";
            if (iconName === "warning")
                return "warning";
            if (iconName === "attachment")
                return "attach_file";
            if (iconName === "image")
                return "image";
            if (iconName === "section-menu")
                return "more_vert";
            if (iconName === "comment")
                return "comment";
            if (iconName === "repeat")
                return "repeat";
            if (iconName === "like")
                return "favorite_border";
            if (iconName === "back")
                return "arrow_back";
            if (iconName === "prev")
                return "arrow_back_ios_new";
            if (iconName === "next")
                return "arrow_forward_ios";
            return iconName;
        };
    }
}
export default new MaterialIconSystem();
//# sourceMappingURL=MaterialIconSystem.js.map