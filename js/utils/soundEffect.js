/**
 * SINTETIZADOR DE EFECTOS DE SONIDO DE ALTO RENDIMIENTO (WEB AUDIO API)
 * Sin dependencias externas, sonido nítido para feedback interactivo.
 */

const SoundFX = {
    audioCtx: null,

    initCtx: () => {
        if (!SoundFX.audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                SoundFX.audioCtx = new AudioContext();
            }
        }
        if (SoundFX.audioCtx && SoundFX.audioCtx.state === 'suspended') {
            SoundFX.audioCtx.resume();
        }
    },

    playCheck: () => {
        SoundFX.initCtx();
        if (!SoundFX.audioCtx) return;

        const osc = SoundFX.audioCtx.createOscillator();
        const gain = SoundFX.audioCtx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, SoundFX.audioCtx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, SoundFX.audioCtx.currentTime + 0.1); // E5

        gain.gain.setValueAtTime(0.15, SoundFX.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, SoundFX.audioCtx.currentTime + 0.15);

        osc.connect(gain);
        gain.connect(SoundFX.audioCtx.destination);

        osc.start();
        osc.stop(SoundFX.audioCtx.currentTime + 0.15);
    },

    playFoodAdd: () => {
        SoundFX.initCtx();
        if (!SoundFX.audioCtx) return;

        const osc = SoundFX.audioCtx.createOscillator();
        const gain = SoundFX.audioCtx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(440, SoundFX.audioCtx.currentTime); // A4
        osc.frequency.exponentialRampToValueAtTime(880, SoundFX.audioCtx.currentTime + 0.12); // A5

        gain.gain.setValueAtTime(0.2, SoundFX.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, SoundFX.audioCtx.currentTime + 0.15);

        osc.connect(gain);
        gain.connect(SoundFX.audioCtx.destination);

        osc.start();
        osc.stop(SoundFX.audioCtx.currentTime + 0.15);
    },

    playTimerAlarm: () => {
        SoundFX.initCtx();
        if (!SoundFX.audioCtx) return;

        [0, 0.15, 0.3].forEach((delay) => {
            const osc = SoundFX.audioCtx.createOscillator();
            const gain = SoundFX.audioCtx.createGain();

            osc.type = "sine";
            osc.frequency.setValueAtTime(880, SoundFX.audioCtx.currentTime + delay);

            gain.gain.setValueAtTime(0.2, SoundFX.audioCtx.currentTime + delay);
            gain.gain.exponentialRampToValueAtTime(0.001, SoundFX.audioCtx.currentTime + delay + 0.1);

            osc.connect(gain);
            gain.connect(SoundFX.audioCtx.destination);

            osc.start(SoundFX.audioCtx.currentTime + delay);
            osc.stop(SoundFX.audioCtx.currentTime + delay + 0.1);
        });
    }
};
