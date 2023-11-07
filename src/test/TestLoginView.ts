import BodyNode from "../dom/BodyNode.js";
import DomNode from "../dom/DomNode.js";
import el from "../dom/el.js";
import Supabase from "../supabase/Supabase.js";
import View, { ViewParams } from "../view/View.js";

export default class TestLoginView extends View {
  private container: DomNode;

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

  public close(): void {
    this.container.delete();
    super.close();
  }
}
