import Sound from "./Sound.js";
export default class Bgm extends Sound {
    constructor(srcs, volume = 0.8) {
        super(srcs, true, volume);
        document.addEventListener("visibilitychange", this.visibilityChangeListener);
    }
    visibilityChangeListener = () => {
        if (document.hidden) {
            this.pause();
        }
        else {
            this.play();
        }
    };
    delete() {
        document.removeEventListener("visibilitychange", this.visibilityChangeListener);
        super.delete();
    }
}
//# sourceMappingURL=Bgm.js.map