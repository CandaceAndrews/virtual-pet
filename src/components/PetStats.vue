<!-- Displays the pet's statistics and current state -->
 <template>
  <div class="pet-stats">
    <h1>{{ pet.name }}</h1>
    <p class="hunger">Hunger: {{ pet.hunger }}</p>
    <p class="happiness">Happiness: {{ pet.happiness }}</p>
  </div>
 </template>

 <script>
import { mapGetters } from 'vuex';

export default {
    name: 'PetStats',
    computed: {
      ...mapGetters(['pet']),
    }
};
</script>

<style scoped>
.hunger {
    background-color: wheat;
  }

.happiness {
    background-color: wheat;
  }
</style>