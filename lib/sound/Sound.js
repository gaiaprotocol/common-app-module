import AudioBufferManager from "./AudioBufferManager.js";
export default class Sound {
    loop;
    volume;
    src;
    playing = false;
    audioBuffer;
    audioContext;
    gainNode;
    source;
    constructor(srcs, loop = false, volume = 0.8) {
        this.loop = loop;
        this.volume = volume;
        if (srcs.ogg && AudioBufferManager.canPlayOgg)
            this.src = srcs.ogg;
        else if (srcs.mp3)
            this.src = srcs.mp3;
        else
            this.src = srcs.wav;
        if (this.src)
            AudioBufferManager.loadBuffer(this.src);
    }
    async playBuffer() {
        if (this.src) {
            if (!this.audioBuffer) {
                this.audioBuffer = await AudioBufferManager.loadBuffer(this.src);
            }
            if (!this.playing)
                return;
            if (!this.audioContext) {
                this.audioContext = await AudioBufferManager.getAudioContext();
            }
            if (!this.playing)
                return;
            if (!this.gainNode) {
                this.gainNode = this.audioContext.createGain();
                this.gainNode.gain.value = this.volume;
                this.gainNode.connect(this.audioContext.destination);
            }
            if (!this.source) {
                this.source = this.audioContext.createBufferSource();
                this.source.buffer = this.audioBuffer;
                this.source.loop = this.loop;
                this.source.connect(this.gainNode);
                this.source.start();
            }
        }
    }
    play() {
        this.playing = true;
        this.playBuffer();
        return this;
    }
    stop() {
        this.playing = false;
        if (this.source) {
            this.source.stop();
            this.source.disconnect();
            this.source = undefined;
        }
        if (this.gainNode) {
            this.gainNode.disconnect();
            this.gainNode = undefined;
        }
        return this;
    }
}
//# sourceMappingURL=Sound.js.map