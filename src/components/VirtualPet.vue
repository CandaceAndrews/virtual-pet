<template>
  <div class="virtual-pet" @dragover.prevent @drop="onDrop">
    <img :src="petImage" :class="{ 'flipped': flipped }" alt="Virtual Pet" class="pet-image" />
    <NotificationAlert ref="notification" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import NotificationAlert from './NotificationAlert.vue';
import { audioMixin } from '@/mixins/audioMixin.js';
import eventBus from '@/eventBus';

// Walking Images
import walk1 from '@/assets/images/walkImages/walk1.png';
import walk2 from '@/assets/images/walkImages/walk2.png';
import walk3 from '@/assets/images/walkImages/walk3.png';
import walk4 from '@/assets/images/walkImages/walk4.png';
// Eating Images
import eat1 from '@/assets/images/eatImages/eat1.png';
import eat2 from '@/assets/images/eatImages/eat2.png';
import eat3 from '@/assets/images/eatImages/eat3.png';
import eat4 from '@/assets/images/eatImages/eat4.png';
// Play Images
import play1 from '@/assets/images/playImages/play1.png';
import play2 from '@/assets/images/playImages/play2.png';
// Clean Images
import clean1 from '@/assets/images/cleanImages/clean1.png';
import clean2 from '@/assets/images/cleanImages/clean2.png';
import clean3 from '@/assets/images/cleanImages/clean3.png';
import clean4 from '@/assets/images/cleanImages/clean4.png';
import clean5 from '@/assets/images/cleanImages/clean5.png';

// Sleep Images
import sleep1 from '@/assets/images/sleepImages/sleep1.png';
import sleep2 from '@/assets/images/sleepImages/sleep2.png';

// Sounds
import feedSound from '@/assets/sounds/feed.mp3';
import playSound from '@/assets/sounds/play.wav';
import cleanSound from '@/assets/sounds/clean.wav';
import sleepSound from '@/assets/sounds/sleep.wav';

export default {
  name: 'VirtualPet',
  mixins: [audioMixin],
  components: {
    NotificationAlert,
  },
  computed: {
    ...mapGetters(['pet']),
    energyPercentage() {
      return this.pet.energy;
    }
  },
  data() {
    return {
      walkingImages: [walk1, walk2, walk3, walk4],
      eatingImages: [eat1, eat2, eat3, eat4],
      playingImages: [play1, play2],
      cleaningImages: [clean1, clean2, clean3, clean4, clean5],
      sleepingImages: [sleep1, sleep2],
      currentImageIndex: 0,
      petImage: walk1,
      flipped: false,
      isEating: false,
      isPlaying: false,
      isCleaning: false,
      isSleeping: false,
      animationInterval: null,
      movementInterval: null,
      position: -900, // Added to keep track of position
      direction: 1, // Added to keep track of direction
      notificationMessage: '',
    };
  },
  watch: {
    'pet.energy'(newVal) {
      if (newVal === 0 && !this.isSleeping) {
        this.startSleeping();
        this.$refs.notification.showNotification('Your pet is sleeping!');
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
    ...mapActions(['feedPet', 'playWithPet', 'cleanPet', 'decreaseEnergy', 'increaseEnergy']),

    startAnimation(images, duration, callback) {
      clearInterval(this.animationInterval);
      clearInterval(this.movementInterval);
      this.currentImageIndex = 0;
      this.animationInterval = setInterval(() => {
        this.currentImageIndex = (this.currentImageIndex + 1) % images.length;
        this.petImage = images[this.currentImageIndex];
      }, 230);
      setTimeout(() => {
        clearInterval(this.animationInterval);
        this.startWalkingAnimation();
        if (callback) callback();
      }, duration);
    },

    startWalkingAnimation() {
      clearInterval(this.animationInterval); // Ensure any previous interval is cleared
      this.animationInterval = setInterval(() => {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.walkingImages.length;
        this.petImage = this.walkingImages[this.currentImageIndex];
      }, 230);
      this.movePet();
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
      this.playAudio(sleepSound); 
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

    // Timers
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
        this.decreaseCleanliness();
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

    increaseEnergy() {
      this.$store.dispatch('increaseEnergy');
    },

    handleFeed() {
      this.playAudio(feedSound); 
      this.feedPet();
      this.startAnimation(this.eatingImages, 3000);
    },
    handlePlay() {
      this.playAudio(playSound);
      this.playWithPet();
      this.startAnimation(this.playingImages, 3000);
    },
    handleClean() {
      this.playAudio(cleanSound); 
      this.cleanPet();
      this.startAnimation(this.cleaningImages, 3000);
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
    },
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