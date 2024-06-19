<!-- Displays the pet and its status (happiness, hunger, etc.) -->

<template>
    <div class="virtual-pet">
      <img :src="petImage" alt="Virtual Pet" class="pet-image" />
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  import petGif from '@/assets/quetzal.gif';
  
  export default {
    name: 'VirtualPet',
    computed: {
      ...mapGetters(['pet']),
    },
    data() {
      return {
        petImage: petGif, 
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
    width: 300px; /* Adjust size as needed */
    height: auto;
    position: relative;
    animation: walk 5s infinite alternate ease-in-out;
  }

  @keyframes walk {
    0% {
      left: 0;
    }
    100% {
      left: 200px; /* Adjust distance as needed */
    }
  }
  </style>
  