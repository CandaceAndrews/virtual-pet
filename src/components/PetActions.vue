<template>
  <div class="pet-actions">
    <img
      src="@/assets/icons/food.png"
      alt="Food"
      class="draggable"
      id="food"
      @dragstart="onDragStart($event, 'feed')"
    />
    <img
      src="@/assets/icons/water.png"
      alt="Water"
      class="draggable"
      id="water"
      @dragstart="onDragStart($event, 'water')"
    />
    <img
      src="@/assets/icons/toy.png"
      alt="Toy"
      class="draggable"
      id="play"
      @dragstart="onDragStart($event, 'play')"
    />
  <img
      src="@/assets/icons/clean.png"
      alt="Brush"
      class="draggable"
      id="clean"
      @dragstart="onDragStart($event, 'clean')"
    />
  </div>
</template>

<script>
export default {
  name: 'PetActions',
  methods: {
    onDragStart(event, action) {
      event.dataTransfer.setData('action', action);
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

#water {
  width: 60px;
  height: 60px;
  cursor: grab;
  margin: 0px 35px 2px 35px;
}

#play {
  width: 50px;
  height: 50px;
  cursor: grab;
  margin: 0px 35px 2px 0px;
}

#clean {
  width: 50px;
  height: 50px;
  cursor: grab;
}
</style>