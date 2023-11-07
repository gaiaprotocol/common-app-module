import Component from "./Component.js";
import IconSystem from "./IconSystem.js";
export default class Icon extends Component {
    constructor(iconName) {
        super(IconSystem.baseIconTag);
        this.append(IconSystem.createContent(iconName));
    }
}
//# sourceMappingURL=Icon.js.map