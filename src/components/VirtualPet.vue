<!-- Displays the pet and its status (happiness, hunger, etc.) -->

<template>
  <div class="virtual-pet">
    <img :src="petImage" alt="Virtual Pet" class="pet-image" />
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
    };
  },
  mounted() {
    this.startAnimation();
  },
  methods: {
    startAnimation() {
      setInterval(() => {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
        this.petImage = this.images[this.currentImageIndex];
      }, 200); // Change image every 200ms
    },
  },
};
</script>

<style scoped>
.virtual-pet {
  position: absolute;
  top: 70%;
  left: 0;
  width: 100%;
  text-align: center;
}

.pet-image {
  width: 300px; /* Adjust size as needed */
  height: auto;
  position: absolute;
  animation: walk 10s infinite alternate ease-in-out;
}

@keyframes walk {
  0% {
    left: 0;
    transform: scaleX(1);
  }
  50% {
    left: calc(100% - 300px); /* Move to the right edge, considering the width of the pet */
    transform: scaleX(1);
  }
  50.01% {
    left: calc(100% - 300px);
    transform: scaleX(-1); /* Flip the pet image */
  }
  100% {
    left: 0;
    transform: scaleX(-1); /* Move back to the left edge */
  }
}
</style>

