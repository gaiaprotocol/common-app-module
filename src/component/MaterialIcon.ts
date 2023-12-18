import Component from "./Component.js";

export default class MaterialIcon extends Component {
  constructor(iconName: string) {
    super("span.icon.material-icon.material-symbols-outlined");
    this.text = iconName;
  }
}
