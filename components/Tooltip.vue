<template>
  <div class="tooltip-box">
    <slot />
    <div class="tooltip">
      <span
        class="text"
        v-html="text"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>
<style scoped>
.tooltip-box {
  position: relative;
  display: inline-block;
}

.tooltip-box:hover .tooltip{
  opacity: 1;
}

.tooltip {
  font-size: 12px;
  color: #3914AF;
  text-align: center;
  padding: 5px;
  border-radius: 2px;
  border-color: #C4C4C4;
  width: 120px;
  bottom: 120%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.5s;
  position: absolute;
  z-index: 1;
  background: #fff;
}

.text::after {
  content: " ";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #a782e8 transparent transparent transparent;
}
</style>
