export const audioMixin = {
    methods: {
      playAudio(sound) {
        const audio = new Audio(sound);
        audio.play();
      },
    },
  };