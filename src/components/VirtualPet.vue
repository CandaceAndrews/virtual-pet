<!-- Displays the pet and its status (happiness, hunger, etc.) -->

<template>
    <div>
        <h1>{{  pet.name }}</h1>
        <p class="hunger">Hunger: {{ pet.hunger }}</p>
        <p class="happiness">Happiness: {{ pet.happiness }}</p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'VirtualPet',
    computed: {
        ...mapGetters(['pet']),
    },
};
</script>

<style>
.hunger {
    background-color: white;
    
}
</style>