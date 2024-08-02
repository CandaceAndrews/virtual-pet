import { createStore } from 'vuex';

export default createStore({
  state: {
    pet: {
      name: 'Tyrannosaurus Rex',
      life: 20,
      hunger: 10,
      happiness: 10,
      cleanliness: 10,
      energy: 20,
    },
  },
  mutations: {
    feedPet(state) {
      state.pet.hunger = Math.min(state.pet.hunger + 10, 100);
    },
    playWithPet(state) {
      state.pet.happiness = Math.min(state.pet.happiness + 10, 100);
    },
    cleanPet(state) {
      state.pet.cleanliness = Math.min(state.pet.cleanliness + 10, 100);
    },
    decreaseHunger(state) {
      state.pet.hunger = Math.max(state.pet.hunger - 1, 0);
    },
    decreaseHappiness(state) {
      state.pet.happiness = Math.max(state.pet.happiness - 1, 0);
    },
    decreaseCleanliness(state) {
      state.pet.cleanliness = Math.max(state.pet.cleanliness - 1, 0);
    },
    decreaseEnergy(state) {
      state.pet.energy = Math.max(state.pet.energy - 1, 0);
    },
    decreaseLife(state) {
      state.pet.life = Math.max(state.pet.life - 1, 0);
    },
    increaseLife(state){
      state.pet.life = Math.min(state.pet.life + 5, 100);
    },
    increaseEnergy(state) {
      state.pet.energy = Math.min(state.pet.energy + 15, 100);
    },
    resetPet(state) {
      state.pet.hunger = 100;
      state.pet.happiness = 100;
      state.pet.cleanliness = 100;
      state.pet.energy = 100;
      state.pet.life = 100;
    },
  },
  actions: {
    feedPet({ commit }) {
      commit('feedPet');
    },
    playWithPet({ commit }) {
      commit('playWithPet');
    },
    cleanPet({ commit }) {
      commit('cleanPet');
    },
    decreaseHunger({ commit }) {
      commit('decreaseHunger');
    },
    decreaseHappiness({ commit }) {
      commit('decreaseHappiness');
    },
    decreaseCleanliness({ commit }) {
      commit('decreaseCleanliness');
    },
    decreaseEnergy({ commit }) {
      commit('decreaseEnergy');
    },
    increaseEnergy({ commit }) {
      commit('increaseEnergy');
    },
    decreaseLife({ commit }) {
      commit('decreaseLife');
    },
    increaseLife({ commit }) {
      commit('increaseLife');
    },
    resetPet({ commit }) {
      commit('resetPet');
    },
  },
  getters: {
    pet(state) {
      return state.pet;
    },
  },
});