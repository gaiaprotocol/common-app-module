export default class Sound {
    private loop;
    private volume;
    private src;
    private playing;
    private paused;
    private audioBuffer;
    private audioContext;
    private gainNode;
    private source;
    private pauseTime;
    private offset;
    constructor(srcs: {
        ogg?: string;
        mp3?: string;
        wav?: string;
    }, loop?: boolean, volume?: number);
    private playBuffer;
    play(): this;
    pause(): this;
    delete(): void;
}
//# sourceMappingURL=Sound.d.ts.map