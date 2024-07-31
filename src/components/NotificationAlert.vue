<template>
  <div class="notifications">
    <div v-for="(notification, index) in notifications" :key="index" class="notification" :style="{ top: `${index * 60}px` }">
      {{ notification }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotificationAlert',
  data() {
    return {
      notifications: [],
    };
  },
  methods: {
    showNotification(msg) {
      this.notifications.push(msg);
      this.visible = true;
      setTimeout(() => {
        this.notifications.shift();
      }, 5000);
    },
  },
};
</script>

<style scoped>
.notifications {
  position: fixed;
  top: 40px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #ffcc00;
  border: 1px solid #ffaa00;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  margin-top: 30px;
  margin-bottom: 10px;
}

</style>
