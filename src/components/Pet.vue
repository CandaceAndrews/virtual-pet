<!-- Displays the pet and its status (happiness, hunger, etc.) -->

<template>
    <div>
        <h1>{{  pet.name }}</h1>
        <p>Hunger: {{ pet.hunger }}</p>
        <p>Happiness: {{ pet.happiness }}</p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['pet']),
    },
};
</script>