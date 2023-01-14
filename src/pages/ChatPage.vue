<template>
  <q-page>
    <div class="q-pa-md row justify-center">
      <div style="width: 100%; max-width: 650px">
        <q-chat-message :text="['hey, how are you?']" sent />
        <q-chat-message :text="['doing fine, how r you?']" />
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { useUsersStore } from "src/stores/useUser";
import { computed, watch, watchEffect } from "vue";
const store = useUsersStore();
const currentContact = computed(() => store.currentUserContact);
watchEffect(() => {
  // console.log(currentContact.value);
});
</script>
<style></style>
