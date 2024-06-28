<template>
  <div class="pet-actions">
    <button @click="handleFeed" class="feed">Feed</button>
    <button @click="playWithPet" class="play">Play</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'PetActions',
  methods: {
    ...mapActions(['feedPet', 'playWithPet']),
    handleFeed() {
      this.feedPet(); // Trigger Vuex action to update hunger
    },
  },
};
</script>

<style scoped>
.pet-actions {
  background-color: #31483c;
  padding: 15px;
  border-top: solid rgb(23, 35, 31) 3px;
}

.feed {
  padding: 5px 10px;
  margin-right: 7px;
}

.play {
  padding: 5px 10px;
}
</style>




