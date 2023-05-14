<template>
  <div
    :style="`width: 100%; display: flex; ${
      sent ? 'justify-content: end' : 'justify-content:start'
    }`"
  >
    <message-from v-if="sent" :text="text" :image="image" />
    <message-to v-else :text="text" :image="image" />
  </div>
</template>
<script setup>
import MessageFrom from "./MessageFrom.vue";
import MessageTo from "./MessageTo.vue";

defineProps({
  id: {
    type: String,
  },
  sent: {
    type: Boolean,
  },
  text: {
    type: String,
  },
  image: {
    type: String,
  },
});
</script>
<style></style>
