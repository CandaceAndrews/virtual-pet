import { createStore } from 'vuex';

export default createStore({
  state: {
    pet: {
      name: 'Tyrannosaurus Rex',
      hunger: 30,
      happiness: 100,
      cleanliness: 100,
      energy: 100,
    },
  },
  mutations: {
    feedPet(state) {
      state.pet.hunger = Math.min(state.pet.hunger + 10, 100);
      // console.log('Hunger stat increased', state.pet.happiness);
    },
    playWithPet(state) {
      state.pet.happiness = Math.min(state.pet.happiness + 10, 100);
      // console.log('Happiness stat increased', state.pet.happiness);
    },
    cleanPet(state) {
      state.pet.cleanliness = Math.min(state.pet.cleanliness + 10, 100);
      // console.log('Cleanliness  stat increased', state.pet.cleanliness);
    },
    decreaseHunger(state) {
      state.pet.hunger = Math.max(state.pet.hunger - 1, 0);
      // console.log('Hunger stat decreased', state.pet.happiness);
    },
    decreaseHappiness(state) {
      state.pet.happiness = Math.max(state.pet.happiness - 1, 0);
      console.log('Happiness stat decreased', state.pet.happiness);
    },
    decreaseCleanliness(state) {
      state.pet.cleanliness = Math.max(state.pet.cleanliness - 1, 0);
      // console.log('Cleanliness stat decreased', state.pet.cleanliness);
    },
    decreaseEnergy(state) {
      if (state.energy > 0) {
        state.energy -= 5;
      }
    },
    increaseEnergy(state) {
      if (state.energy < 100) {
        state.energy += 5;
      }
    },
    setEnergy(state, value) {
      state.energy = value;
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
    setEnergy({ commit }) {
      commit('setEnergy');
    },
  },
  getters: {
    pet(state) {
      return state.pet;
    },
  },
});

