<!-- Displays the pet and its status (happiness, hunger, etc.) -->

<template>
    <div class="virtual-pet">
      <img :src="petImage" alt="Virtual Pet" class="pet-image" />
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  import petGif from '@/assets/quetzal.gif'; // Adjust the path to your GIF file
  
  export default {
    name: 'VirtualPet',
    computed: {
      ...mapGetters(['pet']),
    },
    data() {
      return {
        petImage: petGif, // Path to your GIF file
      };
    },
  };
  </script>
  
  <style scoped>
  .virtual-pet {
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
  
  .pet-image {
    width: 200px; /* Adjust size as needed */
    height: auto;
  }
  </style>
  