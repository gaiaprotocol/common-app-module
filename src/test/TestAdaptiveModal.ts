import AdaptiveModal from "../component/exitable/AdaptiveModal.js";
import el from "../dom/el.js";

export default class TestAdaptiveModal extends AdaptiveModal {
  constructor() {
    super(".test-adaptive-modal", { barrierDismissible: true });
    this.title = "Test Adaptive Modal";
    for (let i = 0; i < 1000; i++) {
      this.main.append(
        el("p", "This is a test of the adaptive modal component."),
      );
    }
  }
}
