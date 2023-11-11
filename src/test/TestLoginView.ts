import BodyNode from "../dom/BodyNode.js";
import el from "../dom/el.js";
import Supabase from "../supabase/Supabase.js";
import View, { ViewParams } from "../view/View.js";

export default class TestLoginView extends View {
  constructor(params: ViewParams) {
    super();
    BodyNode.append(
      this.container = el(
        ".test-login-view",
        el("button.login", "Login", {
          click: () => Supabase.signIn("github"),
        }),
      ),
    );
  }
}
