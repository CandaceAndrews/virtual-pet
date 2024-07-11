import { createStore } from 'vuex';

export default createStore({
  state: {
    pet: {
      name: 'Tyrannosaurus Rex',
      hunger: 100,
      happiness: 100,
    },
  },
  // mutations: {
  //   feedPet(state) {
  //     state.pet.hunger = Math.max(state.pet.hunger - 10, 0);
  //     console.log('Pet hunger reduced', state.pet.hunger);
  //   },
  //   playWithPet(state) {
  //     state.pet.happiness = Math.min(state.pet.happiness + 10, 100);
  //     console.log('Pet happiness increased', state.pet.happiness);
  //   },
  //   decreaseHunger(state) {
  //     state.pet.hunger = Math.min(state.pet.hunger + 1, 100);
  //     console.log('Pet hunger increased', state.pet.hunger);
  //   },
  //   decreaseHappiness(state) {
  //     state.pet.happiness = Math.max(state.pet.happiness - 1, 0);
  //     console.log('Pet happiness decreased', state.pet.happiness);
  //   },
  mutations: {
    feedPet(state) {
      state.pet.hunger = Math.min(state.pet.hunger + 10, 100);
      console.log('Pet hunger increased', state.pet.happiness);
    },
    playWithPet(state) {
      state.pet.happiness = Math.min(state.pet.happiness + 10, 100);
      console.log('Pet happiness increased', state.pet.happiness);
    },
    decreaseHunger(state) {
      state.pet.hunger = Math.max(state.pet.hunger - 1, 0);
      console.log('Pet hunger decreased', state.pet.happiness);
    },
    decreaseHappiness(state) {
      state.pet.happiness = Math.max(state.pet.happiness - 1, 0);
      console.log('Pet happiness decreased', state.pet.happiness);
    },
  },
  actions: {
    feedPet({ commit }) {
      commit('feedPet');
    },
    playWithPet({ commit }) {
      commit('playWithPet');
    },
    decreaseHunger({ commit }) {
      commit('decreaseHunger');
    },
    decreaseHappiness({ commit }) {
      commit('decreaseHappiness');
    }
  },
  getters: {
    pet(state) {
      return state.pet;
    },
  },
});

