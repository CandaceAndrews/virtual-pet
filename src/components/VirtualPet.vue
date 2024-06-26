<!-- Displays the pet and its status (happiness, hunger, etc.) -->

<template>
  <div class="virtual-pet">
    <img :src="petImage" :class="{ 'flipped': flipped }" alt="Virtual Pet" class="pet-image" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import pet1 from '@/assets/pet1.png';
import pet2 from '@/assets/pet2.png';
import pet3 from '@/assets/pet3.png';
import pet4 from '@/assets/pet4.png';

export default {
  name: 'VirtualPet',
  computed: {
    ...mapGetters(['pet']),
  },
  data() {
    return {
      images: [pet1, pet2, pet3, pet4],
      currentImageIndex: 0,
      petImage: pet1,
      flipped: false, // To track the flipping state
    };
  },
  mounted() {
    this.startAnimation();
  },
  methods: {
    startAnimation() {
      setInterval(() => {
        // Update the image for walking animation
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
        this.petImage = this.images[this.currentImageIndex];
      }, 230); // Change image every 230ms

      // Move the pet across the screen and flip direction
      this.movePet();
    },
    movePet() {
      const petElement = this.$el.querySelector('.pet-image');
      let direction = 1; // 1 for right, -1 for left
      let position = -900; // Start off-screen to the left
      const petWidth = 900; // Adjust width to match the pet image width

      setInterval(() => {
        if (direction === 1 && position >= window.innerWidth) { // Right edge off-screen
          direction = -1;
          this.flipped = true;
        } else if (direction === -1 && position <= -petWidth) { // Left edge off-screen
          direction = 1;
          this.flipped = false;
        }
        position += 5 * direction;
        petElement.style.left = `${position}px`;
      }, 40); // Adjust the interval as needed for smoothness
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
  width: 900px; /* Adjust size as needed */
  height: auto;
  position: absolute;
  transition: left 0.05s linear; /* Smooth transition for the movement */
}

.flipped {
  transform: scaleX(-1); /* Flip the image horizontally */
}
</style>
