<template>
  <div class="virtual-pet" @dragover.prevent @drop="onDrop">
    <img :src="petImage" :class="{ 'flipped': flipped }" alt="Virtual Pet" class="pet-image" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import pet1 from '@/assets/pet1.png';
import pet2 from '@/assets/pet2.png';
import pet3 from '@/assets/pet3.png';
import pet4 from '@/assets/pet4.png';
import eat1 from '@/assets/eat1.png';
import eat2 from '@/assets/eat2.png';
import eat3 from '@/assets/eat3.png';
import eat4 from '@/assets/eat4.png';
import play1 from '@/assets/play1.png';
import play2 from '@/assets/play2.png';
import clean1 from '@/assets/clean1.png';
import clean2 from '@/assets/clean2.png';
import clean3 from '@/assets/clean3.png';
import clean4 from '@/assets/clean4.png';
import clean5 from '@/assets/clean5.png';
import eventBus from '@/eventBus';
import feedSound from '@/assets/sounds/feed.mp3';
import playSound from '@/assets/sounds/play.wav';
import cleanSound from '@/assets/sounds/clean.wav';
import thresholdSound from '@/assets/sounds/threshold.wav';

export default {
  name: 'VirtualPet',
  computed: {
    ...mapGetters(['pet']),
  },
  data() {
    return {
      walkingImages: [pet1, pet2, pet3, pet4],
      eatingImages: [eat1, eat2, eat3, eat4],
      playingImages: [play1, play2],
      cleaningImages: [clean1, clean2, clean3, clean4, clean5],
      currentImageIndex: 0,
      petImage: pet1,
      flipped: false,
      isEating: false,
      isPlaying: false,
      isCleaning: false,
      animationInterval: null,
      movementInterval: null,
      position: -900, // Added to keep track of position
      direction: 1, // Added to keep track of direction
      feedAudio: new Audio(feedSound),
      playAudio: new Audio(playSound),
      cleanAudio: new Audio(cleanSound),
      thresholdAudio: new Audio(thresholdSound),
    };
  },
  mounted() {
    this.startWalkingAnimation();
    eventBus.$on('feedPet', this.handleFeed); // Listen for 'feedPet' event
    eventBus.$on('playWithPet', this.handlePlay); // Listen for 'playWithPet' event
    eventBus.$on('cleanPet', this.handleClean); // Listen for 'cleanPet'
    this.startHungerTimer();
    this.startHappinessTimer();
    this.startCleanlinessTimer();
  },
  beforeUnmount() {
    eventBus.$off('feedPet', this.handleFeed); // Remove event listener
    eventBus.$off('playWithPet', this.handlePlay); // Remove event listener
    eventBus.$off('cleanPet', this.handleClean); // Remove event listener
    clearInterval(this.animationInterval);
    clearInterval(this.movementInterval);
    clearInterval(this.hungerInterval);
    clearInterval(this.happinessInterval);
    clearInterval(this.cleanlinessInterval);
  },
  methods: {
    ...mapActions(['feedPet']),
    ...mapActions(['playWithPet']),
    ...mapActions(['cleanPet']),
    startWalkingAnimation() {
      console.log('Walking animation started');
      clearInterval(this.animationInterval); // Ensure any previous interval is cleared
      this.animationInterval = setInterval(() => {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.walkingImages.length;
        this.petImage = this.walkingImages[this.currentImageIndex];
      }, 230);
      this.movePet();
    },
    startEatingAnimation() {
      console.log('Eating animation started');
      this.isEating = true;
      clearInterval(this.animationInterval); // Stop walking animation
      clearInterval(this.movementInterval); // Stop movement animation
      this.currentImageIndex = 0;
      this.animationInterval = setInterval(() => {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.eatingImages.length;
        this.petImage = this.eatingImages[this.currentImageIndex];
      }, 230);
      setTimeout(() => {
        this.isEating = false;
        clearInterval(this.animationInterval);
        this.startWalkingAnimation(); // Resume walking animation
      }, 2000);
    },
    startPlayAnimation() {
      console.log('Play animation started');
      this.isPlaying = true;
      clearInterval(this.animationInterval); // Stop walking animation
      clearInterval(this.movementInterval); // Stop movement animation
      this.currentImageIndex = 0;
      this.animationInterval = setInterval(() => {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.playingImages.length;
        this.petImage = this.playingImages[this.currentImageIndex];
      }, 230);
      setTimeout(() => {
        this.isPlaying = false;
        clearInterval(this.animationInterval);
        this.startWalkingAnimation(); // Resume walking animation
      }, 2000);
    },
    startCleaningAnimation() {
      console.log('Cleaning animation started');
      this.isCleaning = true;
      clearInterval(this.animationInterval); // Stop walking animation
      clearInterval(this.movementInterval); // Stop movement animation
      this.currentImageIndex = 0;
      this.animationInterval = setInterval(() => {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.cleaningImages.length;
        this.petImage = this.cleaningImages[this.currentImageIndex];
      }, 230);
      setTimeout(() => {
        this.isCleaning = false;
        clearInterval(this.animationInterval);
        this.startWalkingAnimation(); // Resume walking animation
      }, 2000);
    },
    movePet() {
      const petElement = this.$el.querySelector('.pet-image');
      clearInterval(this.movementInterval); // Ensure any previous interval is cleared
      this.movementInterval = setInterval(() => {
        if (!this.isEating && !this.isPlaying) { // Ensure pet doesn't move during eating or playing
          if (this.direction === 1 && this.position >= window.innerWidth) {
            this.direction = -1;
            this.flipped = true;
          } else if (this.direction === -1 && this.position <= -900) { // Updated with this.position and this.direction
            this.direction = 1;
            this.flipped = false;
          }
          this.position += 5 * this.direction;
          petElement.style.left = `${this.position}px`;
        }
      }, 40);
    },
    startHungerTimer() {
      this.hungerInterval = setInterval(() => {
        this.decreaseHunger();
      }, 10000); // Decrease hunger every 10 seconds
    },
    startHappinessTimer() {
      this.happinessInterval = setInterval(() => {
        this.decreaseHappiness();
      }, 15000); // Decrease happiness every 15 seconds
    },
    startCleanlinessTimer() {
      this.cleanlinessInterval = setInterval(() => {
        this.decreaseCleanliness();
      }, 1500); // Decrease cleanliness every 15 seconds
    },
    decreaseHunger() {
      this.$store.dispatch('decreaseHunger');
    },
    decreaseHappiness() {
      this.$store.dispatch('decreaseHappiness');
    },
    decreaseCleanliness() {
      this.$store.dispatch('decreaseCleanliness');
    },
    handleFeed() {
      console.log('handleFeed called');
      this.feedAudio.play(); // Play feed sound
      this.feedPet(); // Trigger Vuex action to update hunger
      this.startEatingAnimation(); // Trigger eating animation
    },
    handlePlay() {
      console.log('handlePlay called');
      this.playAudio.play(); // Play play sound
      this.playWithPet(); // Trigger Vuex action to update play
      this.startPlayAnimation(); // Trigger play animation
    },
    handleClean() {
      console.log('handleClean called');
      this.cleanAudio.play(); // Play clean sound
      this.cleanPet(); //Trigger Vuex action to update cleanliness
      this.startCleaningAnimation(); // Trigger clean animation
    },
    onDrop(event) {
      const action = event.dataTransfer.getData('action');
      if (action == 'feed') {
        this.handleFeed();
      } else if (action == 'play') {
        this.handlePlay();
      } else if (action == 'clean') {
        this.handleClean();
      }
    }
  },
};
</script>

<style scoped>
.virtual-pet {
  position: absolute;
  top: 37%;
  left: 0;
  width: 100%;
  text-align: center;
}

.pet-image {
  width: 900px;
  height: auto;
  position: absolute;
  transition: left 0.05s linear;
}

.flipped {
  transform: scaleX(-1);
}
</style>