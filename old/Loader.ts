import el from "../dom/el.js";
import Component from "./Component.js";

export default class Loader extends Component {
  constructor() {
    super(".loader", el(".spinner"));
  }
}
