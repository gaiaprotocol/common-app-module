import { IconName } from "./Icon.js";
import IconSystem from "./IconSystem.js";

class MaterialIconSystem {
  public launch() {
    IconSystem.baseIconTag = "span.material-icon.material-symbols-outlined";
    IconSystem.createContent = (iconName: IconName) => {
      if (iconName === "x") return "close";
      if (iconName === "error") return "error";
      if (iconName === "warning") return "warning";
      if (iconName === "attachment") return "attach_file";
      return iconName;
    };
  }
}

export default new MaterialIconSystem();
