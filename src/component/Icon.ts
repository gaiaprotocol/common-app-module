import Component from "./Component.js";
import IconSystem from "./IconSystem.js";

export type IconName =
  | "x"
  | "error"
  | "warning"
  | "attachment"
  | "image"
  | "section-menu"
  | "comment"
  | "repeat"
  | "like"
  | "post"
  | "chat"
  | "activity"
  | "explore";

export default class Icon extends Component {
  constructor(iconName: IconName) {
    super(IconSystem.baseIconTag);
    this.append(IconSystem.createContent(iconName));
  }
}
