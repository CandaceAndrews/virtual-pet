 <template>
    <div class="background">
        <slot></slot>
    </div>
 </template>

 <script>
export default {
    name: 'AppBackground',
};
</script>

<style scoped>
.background {
  background-image: url('@/assets/bg.png');
  background-size: cover;
  background-position: center;
  width: auto;
  height: 600px;
  overflow: hidden;
  position: relative; /* Allows absolute positioning of child elements */
}
</style>