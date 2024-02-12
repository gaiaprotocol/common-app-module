import { DomChild } from "../dom/DomNode.js";
import { IconName } from "./Icon.js";

class IconSystem {
  public baseIconTag = "i.notranslate";
  public createContent: (iconName: IconName) => DomChild = (
    iconName: IconName,
  ) => {
    return iconName;
  };
}

export default new IconSystem();
