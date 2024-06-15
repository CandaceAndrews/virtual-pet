<!-- Buttons or controls for interacting with the pet (feeding, playing, etc.) -->
 <template>
    <div>
        <button @click="feedPet">Feed</button>
        <button @click="playWithPet">Play</button>
    </div>
 </template>

 <script>
import { mapActions } from 'vuex';

export default {
    name: 'PetActions',
    methods: {
        ...mapActions(['feedPet', 'playWithPet']),
    },
};
</script>
