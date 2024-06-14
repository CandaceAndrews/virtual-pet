import { createStore } from 'vuex';

export default createStore({
  state: {
    pet: {
      name: 'Fluffy',
      hunger: 50,
      happiness: 50,
    },
  },
  mutations: {
    feedPet(state) {
      state.pet.hunger = Math.max(state.pet.hunger - 10, 0);
    },
    playWithPet(state) {
      state.pet.happiness = Math.min(state.pet.happiness + 10, 100);
    },
  },
  actions: {
    feedPet({ commit }) {
      commit('feedPet');
    },
    playWithPet({ commit }) {
      commit('playWithPet');
    },
  },
  getters: {
    pet(state) {
      return state.pet;
    },
  },
});
