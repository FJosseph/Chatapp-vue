<template>
  <q-page>
    <div ref="RefChat" v-if="id !== null" class="q-pa-md row justify-center">
      <div style="width: 100%; max-width: 650px">
        <!-- <q-chat-message
          v-for="(chat, index) in chats"
          :id="`chat-${index}`"
          :key="chat.uid"
          :text="[chat.text]"
          :sent="chat.uid === myUser.uid"
        /> -->
        <all-messages
          v-for="(chat, index) in chats"
          :id="`chat-${index}`"
          :key="chat.uid"
          :text="chat.text"
          :sent="chat.uid == myUser.uid"
          :image="chat.file"
        />
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { db } from "src/boot/firebase";
import AllMessages from "src/components/messages/AllMessages.vue";
import { useUsersStore } from "src/stores/useUser";
import { computed, onMounted, ref, watch, watchEffect } from "vue";

// Insertar componente
const insertComponents = () => {
  chats.value.map((x, index) => {
    if (x.file) {
      const contentImage = document.createElement("div");
      const image = document.createElement("img");
      contentImage.setAttribute("class", "imageMessage");
      image.setAttribute("src", `${x.file}`);
      contentImage.appendChild(image);
      console.log(contentImage);
      const elementCurrent = document.querySelector(
        `#chat-${index} div div div`
      );
      console.log(elementCurrent);
      elementCurrent.appendChild(contentImage);
    }
  });
};

let unsubscribe;
const store = useUsersStore();
const chats = computed(() => store.chat);
const myUser = computed(() => store.userData);
const currentContact = computed(() => store.currentUserContact);
const id = computed(() => store.currentUserContact.uid);
const RefChat = ref(null);
watchEffect(() => {
  store.getDataChat(id.value);
  if (RefChat.value !== null) {
    setTimeout(() => {
      window.scroll(0, 100);
      // insertComponents();
    }, 60);
  }
});
// watch(
//   () => id.value,
//   (NEWID) => {
//     store.getDataChat(NEWID);
//     setTimeout(() => {
//       insertComponents();
//       window.scroll(0, 200);
//     }, 300);
//   }
// );
</script>
<style>
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
