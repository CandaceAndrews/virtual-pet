<template>
  <AppBackground>
    <VirtualPet />
    <PetStats />
  </AppBackground>
  <PetActions />
</template>

<script>
import VirtualPet from './components/VirtualPet.vue';
import PetStats from './components/PetStats.vue';
import PetActions from './components/PetActions.vue';
import AppBackground from './components/AppBackground.vue';

export default {
  name: 'App',
  components: {
    VirtualPet,
    PetStats,
    PetActions,
    AppBackground,
  },
};
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>