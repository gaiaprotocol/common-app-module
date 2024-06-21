const _audioContext = new AudioContext();
window.addEventListener("mousedown", () => _audioContext.resume());
window.addEventListener("touchend", () => _audioContext.resume());
class AudioBufferManager {
    canPlayOgg = new Audio().canPlayType("audio/ogg") !== "";
    buffers = {};
    loadingPromises = {};
    async getAudioContext() {
        if (_audioContext.state === "suspended")
            await _audioContext.resume();
        return _audioContext;
    }
    async loadBuffer(src) {
        if (this.buffers[src]) {
            return this.buffers[src];
        }
        if (!this.loadingPromises[src]) {
            this.loadingPromises[src] = (async () => {
                const response = await fetch(src);
                const arrayBuffer = await response.arrayBuffer();
                const audioContext = await this.getAudioContext();
                const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
                this.buffers[src] = audioBuffer;
                delete this.loadingPromises[src];
                return audioBuffer;
            })();
        }
        return this.loadingPromises[src];
    }
}
export default new AudioBufferManager();
//# sourceMappingURL=AudioBufferManager.js.map