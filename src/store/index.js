import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        pet: {
            name: 'Fluffy',
            hunger: 50,
            happiness: 50,
        }
    },
    mutations: {
        feedPet(state) {
            state.pet.hunger = Math.max(state.pet.hunger - 10, 0);
        },
        playWithPet(state) {
            state.pet.happiness = Math.max(state.pet.happiness + 10, 100);
        }
    },
    actions: {
        feedPet({ commit }) {
            commit('feedPet');
        },
        playWithPet({ commit }) {
            commit('playWithPet');
        }
    },
    getters: {
        pet(state) {
            return state.pet;
        }
    }
});