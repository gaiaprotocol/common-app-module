import Sound from "./Sound.js";
export default class Bgm extends Sound {
    constructor(srcs: {
        ogg?: string;
        mp3?: string;
    }, volume?: number);
    private visibilityChangeListener;
    delete(): void;
}
//# sourceMappingURL=Bgm.d.ts.map