import { IconName } from "./Icon.js";
import IconSystem from "./IconSystem.js";

class MaterialIconSystem {
  public launch() {
    IconSystem.baseIconTag =
      "span.icon.material-icon.material-symbols-outlined";
    IconSystem.createContent = (iconName: IconName) => {
      if (iconName === "x") return "close";
      if (iconName === "error") return "error";
      if (iconName === "warning") return "warning";
      if (iconName === "attachment") return "attach_file";
      if (iconName === "image") return "image";
      if (iconName === "section-menu") return "more_vert";
      if (iconName === "comment") return "comment";
      if (iconName === "repeat") return "repeat";
      if (iconName === "like") return "favorite_border";
      return iconName;
    };
  }
}

export default new MaterialIconSystem();
