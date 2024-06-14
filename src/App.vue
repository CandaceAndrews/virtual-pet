<template>
  <div id="app">
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
  margin-top: 60px;
}
</style>
