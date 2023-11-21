import BodyNode from "../dom/BodyNode.js";
import { DomChild } from "../dom/DomNode.js";
import Component from "./Component.js";

export default class SplashScreen extends Component {
  constructor(logo: DomChild) {
    super(".splash-screen");
    this.append(logo).appendTo(BodyNode);
  }
}
