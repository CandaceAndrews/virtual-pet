<template>
  <div class="pet-actions">
    <img
      src="@/assets/food.png"
      alt="Food"
      class="draggable"
      id="food"
      @dragstart="onDragStart($event, 'feed')"
    />
    <img
      src="@/assets/toy.png"
      alt="Toy"
      class="draggable"
      id="play"
      @dragstart="onDragStart($event, 'play')"
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

/* .draggable {
  width: 50px;
  height: 50px;
  cursor: grab;
  margin: 0px 15px 2px 15px;
} */

#food {
  width: 60px;
  height: 60px;
  cursor: grab;
  /* margin: 0px 15px 2px 15px; */
}

#play {
  width: 50px;
  height: 50px;
  cursor: grab;
  margin: 0px 15px 2px 15px;
}

</style>