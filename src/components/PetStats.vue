<!-- Displays the pet's statistics and current state -->
<template>
  <div class="pet-stats">
    <h1 class="name">{{ pet.name }}</h1>
    <p class="hunger">Hunger: {{ pet.hunger }}</p>
    <p class="happiness">Happiness: {{ pet.happiness }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PetStats',
  computed: {
    ...mapGetters(['pet']),
  }
};
</script>

<style scoped>
.pet-stats {
  background-color: #97d2b3; /* A light wheat color */
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 20%;
  height: auto;
  position: absolute;
  left: 20px; /* Position to the left of the screen */
  top: 20px; /* Add some margin from the top */
  font-family: 'Arial', sans-serif;
}

.name {
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 10px;
}

.hunger,
.happiness {
  font-size: 1.2em;
  margin: 5px 0;
  padding: 10px;
  background-color: #dbffdb; /* Slightly lighter background for the stats */
  border-radius: 5px;
}
</style>
