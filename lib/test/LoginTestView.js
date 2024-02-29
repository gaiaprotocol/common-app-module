import BodyNode from "../dom/BodyNode.js";
import el from "../dom/el.js";
import Supabase from "../supabase/Supabase.js";
import View from "../view/View.js";
export default class LoginTestView extends View {
    constructor(params) {
        super();
        BodyNode.append(this.container = el(".login-test-view.test-view", el("button.login", "Login", {
            click: () => Supabase.signIn("github"),
        })));
    }
}
//# sourceMappingURL=LoginTestView.js.map