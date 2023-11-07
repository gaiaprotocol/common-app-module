import BodyNode from "../dom/BodyNode.js";
import el from "../dom/el.js";
import Supabase from "../supabase/Supabase.js";
import View from "../view/View.js";
export default class TestLoginView extends View {
    container;
    constructor(params) {
        super();
        BodyNode.append(this.container = el(".test-login-view", el("button.login", "Login", {
            click: () => Supabase.signIn("github"),
        })));
    }
    close() {
        this.container.delete();
        super.close();
    }
}
//# sourceMappingURL=TestLoginView.js.map