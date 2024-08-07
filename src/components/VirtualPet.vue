<template>
  <AppBackground :isDead="isDead">
    <div class="virtual-pet" @dragover.prevent @drop="onDrop">
      <img :src="petImage" :class="{ 'flipped': flipped }" alt="Virtual Pet" class="pet-image" />
      <NotificationAlert ref="notification" />
      <button v-if="isDead" @click="handleRestart" class="restart-button">Restart</button>
    </div>
  </AppBackground>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import NotificationAlert from './NotificationAlert.vue';
import AppBackground from './AppBackground.vue';
import { audioMixin } from '@/mixins/audioMixin.js';
import eventBus from '@/eventBus';

// Walk Images
import walk1 from '@/assets/images/walkImages/walk1.png';
import walk2 from '@/assets/images/walkImages/walk2.png';
import walk3 from '@/assets/images/walkImages/walk3.png';
import walk4 from '@/assets/images/walkImages/walk4.png';
// Eat Images
import eat1 from '@/assets/images/eatImages/eat1.png';
import eat2 from '@/assets/images/eatImages/eat2.png';
import eat3 from '@/assets/images/eatImages/eat3.png';
import eat4 from '@/assets/images/eatImages/eat4.png';
// Drink Images
import drink1 from '@/assets/images/drinkImages/drink1.png';
import drink2 from '@/assets/images/drinkImages/drink2.png';
import drink3 from '@/assets/images/drinkImages/drink3.png';
import drink4 from '@/assets/images/drinkImages/drink4.png';
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
// Death Images
import death1 from '@/assets/images/deathImages/death1.png';
import death2 from '@/assets/images/deathImages/death2.png';
import death3 from '@/assets/images/deathImages/death3.png';
import death4 from '@/assets/images/deathImages/death4.png';

// Sounds
import feedSound from '@/assets/sounds/feed.mp3';
import drinkSound from '@/assets/sounds/drink.wav';
import playSound from '@/assets/sounds/play.wav';
import cleanSound from '@/assets/sounds/clean.wav';

export default {
  name: 'VirtualPet',
  mixins: [audioMixin],
  components: {
    NotificationAlert,
    AppBackground,
  },
  computed: {
    ...mapGetters(['pet']),
    energyPercentage() {
      return this.pet.energy;
    }
  },
  data() {
    return {
      walkImages: [walk1, walk2, walk3, walk4],
      eatImages: [eat1, eat2, eat3, eat4],
      drinkImages: [drink1, drink2, drink3, drink4],
      playImages: [play1, play2],
      cleanImages: [clean1, clean2, clean3, clean4, clean5],
      sleepImages: [sleep1, sleep2],
      deathImages: [death1, death2, death3, death4],
      currentImageIndex: 0,
      petImage: walk1,
      flipped: false,
      isEating: false,
      isDrinking: false,
      isPlaying: false,
      isCleaning: false,
      isSleeping: false,
      isDead: false,
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
    'pet.thirst'(newVal) {
      if (newVal === 0) {
        this.$refs.notification.showNotification('Your pet is very thirsty!');
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
    'pet.life'(newVal) {
      if (newVal === 0 && !this.isDead) {
        this.handleDeath();
      }
    },
  },
  mounted() {
    this.startWalkingAnimation();
    eventBus.$on('feedPet', this.handleFeed); // Listen for 'feedPet' event
    eventBus.$on('waterPet', this.handleThirst);
    eventBus.$on('playWithPet', this.handlePlay); 
    eventBus.$on('cleanPet', this.handleClean); 
    this.startHungerTimer();
    this.startThirstTimer();
    this.startHappinessTimer();
    this.startCleanlinessTimer();
    this.startEnergyTimer();
    this.startLifeTimer();
  },
  beforeUnmount() {
    eventBus.$off('feedPet', this.handleFeed); // Remove event listener
    eventBus.$off('waterPet', this.handleThirst);
    eventBus.$off('playWithPet', this.handlePlay); 
    eventBus.$off('cleanPet', this.handleClean); 
    clearInterval(this.animationInterval);
    clearInterval(this.movementInterval);
    clearInterval(this.hungerInterval);
    clearInterval(this.thirstInterval);
    clearInterval(this.happinessInterval);
    clearInterval(this.cleanlinessInterval);
    clearInterval(this.energyInterval);
    clearInterval(this.lifeInterval);
  },
  methods: {
    ...mapActions(['feedPet', 'waterPet', 'playWithPet', 'cleanPet', 'increaseEnergy', 'decreaseEnergy', 'increaseLife', 'decreaseLife', 'resetPet']),

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
        this.currentImageIndex = (this.currentImageIndex + 1) % this.walkImages.length;
        this.petImage = this.walkImages[this.currentImageIndex];
      }, 230);
      this.movePet();
    },
    startSleeping() {
      if (this.isDead) return;
      this.isSleeping = true;
      clearInterval(this.animationInterval); // Stop other animations
      clearInterval(this.movementInterval); // Stop movement
      this.currentImageIndex = 0;
      this.animationInterval = setInterval(() => {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.sleepImages.length;
        this.petImage = this.sleepImages[this.currentImageIndex];
      }, 230);
      this.energyInterval = setInterval(() => {
        this.increaseEnergy();
      }, 1500); // Refill every 1.5 seconds
    },
    stopSleeping() {
      if (this.isDead || this.pet.energy === 0 || !this.isSleeping) return;
      this.isSleeping = false;
      clearInterval(this.animationInterval); // Stop sleeping animation
      clearInterval(this.energyInterval); // Stop refilling energy
      this.startWalkingAnimation();
    },
    movePet() {
      const speed = 5;
      const petElement = this.$el.querySelector('.pet-image');
      clearInterval(this.movementInterval);
      this.movementInterval = setInterval(() => {
        if (!this.isEating && !this.isPlaying && !this.isCleaning && !this.isSleeping && !this.isDead) { // Ensure pet doesn't move during these
          if (this.direction === 1 && this.position >= window.innerWidth) {
            this.direction = -1;
            this.flipped = true;
          } else if (this.direction === -1 && this.position <= -900) { // Updated with this.position and this.direction
            this.direction = 1;
            this.flipped = false;
          }
          this.position += speed * this.direction;
          petElement.style.left = `${this.position}px`;
        }
      }, 40);
    },

    // -- Timer Methods --
    startHungerTimer() {
      this.hungerInterval = setInterval(() => {
        this.decreaseHunger();
      }, 2000); // Decrease every 2 seconds
    },
    startThirstTimer() {
      this.thirstInterval = setInterval(() => {
        this.decreaseThirst();
      }, 2000);
    },
    startHappinessTimer() {
      this.happinessInterval = setInterval(() => {
        this.decreaseHappiness();
      }, 2000);
    },
    startCleanlinessTimer() {
      this.cleanlinessInterval = setInterval(() => {
        this.decreaseCleanliness();
      }, 1000); 
    },
    startEnergyTimer() {
      this.energyInterval = setInterval(() => {
        this.decreaseEnergy();
      }, 1500);
    },
    startLifeTimer() {
      this.lifeInterval = setInterval(() => {
        if (this.pet.hunger === 0 && this.pet.thirst === 0 && this.pet.happiness === 0 && this.pet.cleanliness === 0) {
          this.decreaseLife();
        } else if (this.pet.hunger !== 0 && this.pet.thirst !== 0 && this.pet.happiness !== 0 && this.pet.cleanliness !== 0) {
          this.increaseLife();
        }
      }, 1000); // Check every 1 second
    },
    stopLifeTimer() {
      clearInterval(this.lifeInterval);
    },

    // -- Decrease - Increase Methods --
    decreaseHunger() {
      this.$store.dispatch('decreaseHunger');
    },
    decreaseThirst() {
      this.$store.dispatch('decreaseThirst');
    },
    decreaseHappiness() {
      this.$store.dispatch('decreaseHappiness');
    },
    decreaseCleanliness() {
      this.$store.dispatch('decreaseCleanliness');
    },
    decreaseEnergy() {
      if (this.isDead) return;
      this.$store.dispatch('decreaseEnergy');
    },
    increaseEnergy() {
      if (this.isDead) return;
      this.$store.dispatch('increaseEnergy');
    },

    // -- Handle Methods --
    handleFeed() {
      if (this.isSleeping) {
        this.stopSleeping();
      }
      if (!this.isDead) {
        this.playAudio(feedSound);
        this.feedPet();
        this.startAnimation(this.eatImages, 3000);
      }
    },
    handleThirst() {
      if (this.isSleeping) {
        this.stopSleeping();
      }
      if (!this.isDead) {
        this.playAudio(drinkSound);
        this.waterPet();
        this.startAnimation(this.drinkImages, 3000);
      }
    },
    handlePlay() {
      if (this.isSleeping) {
        this.stopSleeping();
      }
      if (!this.isDead) {
        this.playAudio(playSound);
        this.playWithPet();
        this.startAnimation(this.playImages, 3000);
      }
    },
    handleClean() {
      if (this.isSleeping) {
        this.stopSleeping();
      }
      if (!this.isDead) {
        this.playAudio(cleanSound); 
        this.cleanPet();
        this.startAnimation(this.cleanImages, 3000);
      }
    },
    handleDeath() {
      this.isDead = true;
      clearInterval(this.animationInterval);
      clearInterval(this.movementInterval);
      clearInterval(this.energyInterval);
      this.$refs.notification.showNotification('Your pet has died!');
      // Start continuous death animation
      this.animationInterval = setInterval(() => {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.deathImages.length;
        this.petImage = this.deathImages[this.currentImageIndex];
      }, 230); // 230 milliseconds between each frame of the death animation
    },
    handleRestart() {
      clearInterval(this.animationInterval);
      this.resetPet();
      this.isDead = false;
      this.startWalkingAnimation();
      this.startHungerTimer();
      this.startThirstTimer();
      this.startHappinessTimer();
      this.startCleanlinessTimer();
      this.startEnergyTimer();
      this.startLifeTimer();
    },
    
    // -- Drop Methods --
    onDrop(event) {
      const action = event.dataTransfer.getData('action');
      if (action === 'feed') {
        this.handleFeed();
      } else if (action === 'water') {
        this.handleThirst();
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

.restart-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px 20px;
  font-size: 16px;
  background-color: #ff4a4a;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 10;
}

.restart-button:hover {
  background-color: #ff0000;
}
</style>