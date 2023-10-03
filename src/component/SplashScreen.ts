import BodyNode from "../dom/BodyNode.js";
import DomNode from "../dom/DomNode.js";
import Component from "./Component.js";

export default class SplashScreen extends Component {
  constructor(logo: DomNode) {
    super(".splash-screen");
    this.append(logo);
    this.appendTo(BodyNode);
  }
}
