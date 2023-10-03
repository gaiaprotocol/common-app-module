import BodyNode from "../dom/BodyNode.js";
import Component from "./Component.js";
export default class SplashScreen extends Component {
    constructor(logo) {
        super(".splash-screen");
        this.append(logo);
        this.appendTo(BodyNode);
    }
}
//# sourceMappingURL=SplashScreen.js.map