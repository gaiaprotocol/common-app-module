import Component from "./Component.js";

export default class MaterialIcon extends Component {
  constructor(iconName: string) {
    super("span.material-icon.material-symbols-outlined");
    this.text = iconName;
  }
}
