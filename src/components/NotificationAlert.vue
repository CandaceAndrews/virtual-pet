<template>
  <div v-if="visible" class="notification">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'NotificationAlert',
  data() {
    return {
      visible: false,
      message: '',
    };
  },
  methods: {
    showNotification(msg) {
      this.message = msg;
      this.visible = true;
      setTimeout(() => {
        this.visible = false;
      }, 3000);
    },
  },
};
</script>

<style scoped>
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #ffcc00;
  border: 1px solid #ffaa00;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}
</style>
