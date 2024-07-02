import { createStore } from 'vuex';

export default createStore({
  state: {
    pet: {
      name: 'Tyrannosaurus Rex',
      hunger: 50,
      happiness: 50,
    },
  },
  mutations: {
    feedPet(state) {
      state.pet.hunger = Math.max(state.pet.hunger - 10, 0);
      console.log('Pet hunger reduced', state.pet.hunger);
    },
    playWithPet(state) {
      state.pet.happiness = Math.min(state.pet.happiness + 10, 100);
      console.log('Pet happiness increased', state.pet.happiness);
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

