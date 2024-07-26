<template>
  <div class="pet-actions">
    <img
      src="@/assets/food.png"
      alt="Food"
      class="draggable"
      id="food"
      @dragstart="onDragStart($event, 'feed')"
      :draggable="!isPetSleeping"
    />
    <img
      src="@/assets/toy.png"
      alt="Toy"
      class="draggable"
      id="play"
      @dragstart="onDragStart($event, 'play')"
      :draggable="!isPetSleeping"
    />
  <img
      src="@/assets/clean.png"
      alt="Brush"
      class="draggable"
      id="clean"
      @dragstart="onDragStart($event, 'clean')"
      :draggable="!isPetSleeping"
    />
  </div>
</template>

<script>
export default {
  name: 'PetActions',
  computed: {
    ...mapState([pet]),
    isPetSleeping() {
      return this.pet.isSleeping;
    }
  },
  methods: {
    onDragStart(event, action) {
      if (!this.isPetSleeping) {
        event.dataTransfer.setData('action', action);
      }
    }
  }
};
</script>

<style scoped>
.pet-actions {
  background-color: #31483c;
  padding: 15px;
  border-top: solid rgb(23, 35, 31) 3px;
}

#food {
  width: 60px;
  height: 60px;
  cursor: grab;
}

#play {
  width: 50px;
  height: 50px;
  cursor: grab;
  margin: 0px 20px 2px 20px;
}

#clean {
  width: 50px;
  height: 50px;
  cursor: grab;
}
</style>