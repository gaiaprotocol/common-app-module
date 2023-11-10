import Lottie from "lottie-web";
import Component from "./Component.js";
export default class LottieAnimation extends Component {
    animation;
    constructor(animationData) {
        super(".lottie-animation");
        this.animation = Lottie.loadAnimation({
            container: this.domElement,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData,
        });
    }
    delete() {
        this.animation.destroy();
        super.delete();
    }
}
//# sourceMappingURL=LottieAnimation.js.map