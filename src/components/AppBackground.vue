 <template>
    <div class="background">
      <div v-if="isDead" class="dim-overlay"></div>
      <slot></slot>
    </div>
 </template>

 <script>
export default {
    name: 'AppBackground',
    props: {
      isDead: {
        type: Boolean,
        default: false
      }
    }
};
</script>

<style scoped>
.background {
  background-image: url('@/assets/images/bg.png');
  background-size: cover;
  background-position: center;
  width: auto;
  height: 600px;
  overflow: hidden;
  position: relative; /* Allows absolute positioning of child elements */
}

.dim-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 5;
}
</style>