<template>
  <div :id="id" class="flex q-my-sm q-pa-xs justify-center msg-to">
    <div v-if="image.length" class="q-mb-sm row imageMessage">
      <img :src="image" />
    </div>
    <div v-if="text.length" class="flex q-px-xs row justify-start">
      {{ text }}
    </div>
  </div>
</template>
<script setup>
defineProps({
  id: {
    type: String,
  },
  text: {
    type: String,
  },
  image: {
    type: String,
  },
});
</script>
<style>
.msg-to {
  border-radius: 0.3em;
  max-width: 15em;
  min-height: 3em;
  background-color: rgb(129, 129, 129);
}

.imageMessage {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10em;
  width: 10em;
  padding: 0.1em;
}
.imageMessage img {
  height: 100%;
  width: 100%;
}
</style>
