<template>
  <div id="app" class="background">
    <VirtualPet />
    <PetActions />
  </div>
</template>

<script>
import VirtualPet from './components/VirtualPet.vue';
import PetActions from './components/PetActions.vue';

export default {
  name: 'App',
  components: {
    VirtualPet,
    PetActions,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.background {
  background-image: url('@/assets/bg.png');
  background-size: cover;
  background-position: center;
  width: auto;
  height: 600px;
  overflow: hidden;
}

</style>
