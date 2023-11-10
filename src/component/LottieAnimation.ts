import Lottie, { AnimationItem } from "lottie-web";
import Component from "./Component.js";

export default class LottieAnimation extends Component {
  private animation: AnimationItem;

  constructor(animationData: any) {
    super(".lottie-animation");
    this.animation = Lottie.loadAnimation({
      container: this.domElement,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData,
    });
  }

  public delete(): void {
    this.animation.destroy();
    super.delete();
  }
}
