<template>
  <div class="virtual-pet" @dragover.prevent @drop="onDrop">
    <img :src="petImage" :class="{ 'flipped': flipped }" alt="Virtual Pet" class="pet-image" />
    <NotificationAlert ref="notification" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import NotificationAlert from './NotificationAlert.vue';

// Walking Images
import pet1 from '@/assets/pet1.png';
import pet2 from '@/assets/pet2.png';
import pet3 from '@/assets/pet3.png';
import pet4 from '@/assets/pet4.png';
// Eating Images
import eat1 from '@/assets/eat1.png';
import eat2 from '@/assets/eat2.png';
import eat3 from '@/assets/eat3.png';
import eat4 from '@/assets/eat4.png';
// Play Images
import play1 from '@/assets/play1.png';
import play2 from '@/assets/play2.png';
// Clean Images
import clean1 from '@/assets/clean1.png';
import clean2 from '@/assets/clean2.png';
import clean3 from '@/assets/clean3.png';
import clean4 from '@/assets/clean4.png';
import clean5 from '@/assets/clean5.png';

// Sleep Images
import sleep1 from '@/assets/sleep1.png';
import sleep2 from '@/assets/sleep2.png';

import eventBus from '@/eventBus';

// Sounds
import feedSound from '@/assets/sounds/feed.mp3';
import playSound from '@/assets/sounds/play.wav';
import cleanSound from '@/assets/sounds/clean.wav';
import sleepSound from '@/assets/sounds/sleep.wav';
import thresholdSound from '@/assets/sounds/threshold.wav';

export default {
  name: 'VirtualPet',
  components: {
    NotificationAlert,
  },
  computed: {
    ...mapGetters(['pet']),
  },
  data() {
    return {
      walkingImages: [pet1, pet2, pet3, pet4],
      eatingImages: [eat1, eat2, eat3, eat4],
      playingImages: [play1, play2],
      cleaningImages: [clean1, clean2, clean3, clean4, clean5],
      sleepingImages: [sleep1, sleep2],
      currentImageIndex: 0,
      petImage: pet1,
      flipped: false,
      isEating: false,
      isPlaying: false,
      isCleaning: false,
      isSleeping: false,
      animationInterval: null,
      movementInterval: null,
      position: -900, // Added to keep track of position
      direction: 1, // Added to keep track of direction
      feedAudio: new Audio(feedSound),
      playAudio: new Audio(playSound),
      cleanAudio: new Audio(cleanSound),
      sleepAudio: new Audio(sleepSound),
      thresholdAudio: new Audio(thresholdSound),
      notificationMessage: '',
    };
  },
  watch: {
    'pet.energy'(newVal) {
      if (newVal === 0 && !this.isSleeping) {
        this.startSleeping();
      } else if (newVal === 100 && this.isSleeping) {
        this.stopSleeping();
      }
    },
    'pet.hunger'(newVal) {
      if (newVal === 0) {
        this.$refs.notification.showNotification('Your pet is very hungry!');
      }
    },
    'pet.happiness'(newVal) {
      if (newVal === 0) {
        this.$refs.notification.showNotification('Your pet is very sad!');
      }
    },
    'pet.cleanliness'(newVal) {
      if (newVal === 0) {
        this.$refs.notification.showNotification('Your pet is very dirty!');
      }
    },
  },
  mounted() {
    this.startWalkingAnimation();
    eventBus.$on('feedPet', this.handleFeed); // Listen for 'feedPet' event
    eventBus.$on('playWithPet', this.handlePlay); // Listen for 'playWithPet' event
    eventBus.$on('cleanPet', this.handleClean); // Listen for 'cleanPet'
    this.startHungerTimer();
    this.startHappinessTimer();
    this.startCleanlinessTimer();
    this.startEnergyTimer();
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
    clearInterval(this.energyInterval);
  },
  methods: {
    ...mapActions(['feedPet']),
    ...mapActions(['playWithPet']),
    ...mapActions(['cleanPet']),
    ...mapActions(['decreaseEnergy']),
    ...mapActions(['increaseEnergy']),
    startWalkingAnimation() {
      // console.log('Walking animation started');
      clearInterval(this.animationInterval); // Ensure any previous interval is cleared
      this.animationInterval = setInterval(() => {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.walkingImages.length;
        this.petImage = this.walkingImages[this.currentImageIndex];
      }, 230);
      this.movePet();
    },
    startEatingAnimation() {
      // console.log('Eating animation started');
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
      // console.log('Play animation started');
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
      // console.log('Cleaning animation started');
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
    startSleeping() {
      this.isSleeping = true;
      clearInterval(this.animationInterval); // Stop other animations
      clearInterval(this.movementInterval); // Stop movement
      this.currentImageIndex = 0;
      this.animationInterval = setInterval(() => {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.sleepingImages.length;
        this.petImage = this.sleepingImages[this.currentImageIndex];
      }, 230);
      this.sleepAudio.play(); 
      this.energyInterval = setInterval(() => {
        this.increaseEnergy();
      }, 1500); // Refill energy every 1.5 seconds
    },
    stopSleeping() {
      this.isSleeping = false;
      clearInterval(this.animationInterval); // Stop sleeping animation
      clearInterval(this.energyInterval); // Stop refilling energy
      this.startWalkingAnimation();
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
      }, 2000); // Decrease hunger every 2 seconds
    },
    startHappinessTimer() {
      this.happinessInterval = setInterval(() => {
        this.decreaseHappiness();
      }, 15000); // Decrease happiness every 15 seconds
    },
    startCleanlinessTimer() {
      this.cleanlinessInterval = setInterval(() => {
        this.decreaseEnergy();
      }, 1000); // Decrease cleanliness every 15 seconds
    },
    startEnergyTimer() {
      this.energyInterval = setInterval(() => {
        this.decreaseEnergy();
      }, 1500); // Decrease energy every 15 seconds
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
    decreaseEnergy() {
      this.$store.dispatch('decreaseEnergy');
    },
    handleFeed() {
      console.log('handleFeed called');
      this.feedAudio.play(); 
      this.feedPet(); // Trigger Vuex action to update hunger
      this.startEatingAnimation(); 
    },
    handlePlay() {
      console.log('handlePlay called');
      this.playAudio.play(); 
      this.playWithPet(); // Trigger Vuex action to update play
      this.startPlayAnimation(); 
    },
    handleClean() {
      console.log('handleClean called');
      this.cleanAudio.play(); 
      this.cleanPet(); //Trigger Vuex action to update cleanliness
      this.startCleaningAnimation(); 
    },
    onDrop(event) {
      const action = event.dataTransfer.getData('action');
      if (action === 'feed') {
        this.handleFeed();
      } else if (action === 'play') {
        this.handlePlay();
      } else if (action === 'clean') {
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

