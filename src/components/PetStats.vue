<template>
  <div class="pet-stats">
    <!-- NAME -->
    <h1 class="name">{{ pet.name }}</h1>
    <!-- HUNGER BAR -->
    <div class="bar">
      <span>Hunger</span>
      <div class="progress">
        <div class="progress-bar" :style="{ width: hungerPercentage + '%' }"></div>
      </div>
    </div>
    <!-- HAPPINESS BAR -->
    <div class="bar">
      <span>Happiness</span>
      <div class="progress">
        <div class="progress-bar" :style="{ width: happinessPercentage + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PetStats',
  computed: {
    ...mapGetters(['pet']),
    hungerPercentage() {
      return this.pet.hunger;
    },
    happinessPercentage() {
      return this.pet.happiness;
    }
  }
};
</script>

<style scoped>
.pet-stats {
  background-color: #97d2b3; 
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 20%;
  height: auto;
  max-width: 300px; /* Maximum width to maintain layout */
  min-width: 200px; /* Minimum width for smaller screens */
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

.bar {
  margin: 10px 0;
  text-align: center;
}

.progress {
  width: 100%;
  height: 20px;
  background-color: #e64a4a;
  border-radius: 10px;
  overflow: hidden;
  border: solid 1px rgb(68, 84, 72); 
}

.progress-bar {
  height: 100%;
  background-color: #7ac672;
  transition: width 0.5s;
}

/* Responsive text sizing for the pet's name */
@media (max-width: 1024px) {
  .name {
    font-size: 1.4em;
  }
}

@media (max-width: 767px) {
  .name {
    font-size: 1.2em;
  }
}

@media (max-width: 480px) {
  .name {
    font-size: 1em;
  }
}
</style>

