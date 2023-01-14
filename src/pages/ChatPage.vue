<template>
  <q-page>
    <div v-if="id !== null" class="q-pa-md row justify-center">
      <div style="width: 100%; max-width: 650px">
        <q-chat-message
          v-for="chat in chats"
          :key="chat.uid"
          :text="[chat.text]"
          :sent="chat.uid === myUser.uid"
        />
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { db } from "src/boot/firebase";
import { useUsersStore } from "src/stores/useUser";
import { computed, onMounted, ref, watch, watchEffect } from "vue";
let unsubscribe;
const store = useUsersStore();
const chats = computed(() => store.chat);
const myUser = computed(() => store.userData);
const currentContact = computed(() => store.currentUserContact);
const id = computed(() => store.currentUserContact.uid);

onMounted(() => {
  store.getDataChat(id.value);
});
watch(
  () => id.value,
  (NEWID) => {
    store.getDataChat(NEWID);
  }
);
</script>
<style></style>
