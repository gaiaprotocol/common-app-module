export default class Sound {
    private loop;
    private volume;
    private src;
    private playing;
    private audioBuffer;
    private audioContext;
    private gainNode;
    private source;
    constructor(srcs: {
        ogg?: string;
        mp3?: string;
        wav?: string;
    }, loop?: boolean, volume?: number);
    private playBuffer;
    play(): this;
    stop(): this;
}
//# sourceMappingURL=Sound.d.ts.map