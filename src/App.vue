<template>
  <AppBackground>
    <VirtualPet />
    <PetActions />
  </AppBackground>
</template>

<script>
import VirtualPet from './components/VirtualPet.vue';
import PetActions from './components/PetActions.vue';
import AppBackground from './components/AppBackground.vue';

export default {
  name: 'App',
  components: {
    VirtualPet,
    PetActions,
    AppBackground,
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
</style>
