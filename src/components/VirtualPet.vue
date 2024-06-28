<template>
  <div class="virtual-pet">
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

export default {
  name: 'VirtualPet',
  computed: {
    ...mapGetters(['pet']),
  },
  data() {
    return {
      walkingImages: [pet1, pet2, pet3, pet4],
      eatingImages: [eat1, eat2, eat3, eat4],
      currentImageIndex: 0,
      petImage: pet1,
      flipped: false,
      isEating: false,
      animationInterval: null,
      movementInterval: null,
    };
  },
  mounted() {
    this.startWalkingAnimation();
    this.$root.$on('feedPet', this.handleFeed); // Listen for 'feedPet' event
  },
  beforeUnmount() {
    this.$root.$off('feedPet', this.handleFeed); // Remove event listener
  },
  methods: {
    ...mapActions(['feedPet']),
    startWalkingAnimation() {
      this.animationInterval = setInterval(() => {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.walkingImages.length;
        this.petImage = this.walkingImages[this.currentImageIndex];
      }, 230);
      this.movePet();
    },
    startEatingAnimation() {
      this.isEating = true;
      clearInterval(this.animationInterval); // Stop walking animation
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
    movePet() {
      const petElement = this.$el.querySelector('.pet-image');
      let direction = 1;
      let position = -900;
      const petWidth = 900;

      this.movementInterval = setInterval(() => {
        if (!this.isEating) {
          if (direction === 1 && position >= window.innerWidth) {
            direction = -1;
            this.flipped = true;
          } else if (direction === -1 && position <= -petWidth) {
            direction = 1;
            this.flipped = false;
          }
          position += 5 * direction;
          petElement.style.left = `${position}px`;
        }
      }, 40);
    },
    handleFeed() {
      this.feedPet(); // Trigger Vuex action to update hunger
      this.startEatingAnimation(); // Trigger eating animation
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

