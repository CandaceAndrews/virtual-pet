<template>
  <div class="pet-actions">
      <div class="action-buttons">
          <button class="feed" @click="feedPet">Feed</button>
          <button class="play" @click="playWithPet">Play</button>
      </div>
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

<style scoped>
.pet-actions {
  background-color: #31483c;
  padding: 15px 15px 15px 15px;
  border-top: solid rgb(23, 35, 31) 3px;
}
.feed {
  padding: 5px 10px 5px 10px;
  margin-right: 7px;
}

.play {
  padding: 5px 10px 5px 10px;
}

</style>

