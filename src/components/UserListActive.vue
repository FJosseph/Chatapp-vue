<template>
  <q-list>
    <q-item
      v-for="(conversation, index) in store.users"
      :key="conversation.id"
      clickable
      v-ripple
      @click="$emit('change', index)"
    >
      <q-item-section avatar>
        <q-avatar>
          <img :src="conversation.avatar" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label lines="1">
          {{ conversation.person || conversation.firstname }}
        </q-item-label>
        <q-item-label lines="1">
          {{ conversation.person || conversation.status }}
        </q-item-label>
        <!-- <q-item-label class="conversation__summary" caption>
          <q-icon name="check" v-if="conversation.sent" />
          <q-icon name="not_interested" v-if="conversation.deleted" />
          {{ conversation.caption }}
        </q-item-label> -->
      </q-item-section>

      <!-- <q-item-section side>
        <q-item-label caption>
          {{ conversation.time }}
        </q-item-label>
        <q-icon name="keyboard_arrow_down" />
      </q-item-section> -->
    </q-item>
  </q-list>
</template>
<script setup>
import { collection, onSnapshot, query } from "@firebase/firestore";
import { useAuth } from "@vueuse/firebase";
import { auth, db } from "src/boot/firebase";
import { useUsersStore } from "src/stores/useUser";
import { ref, watchEffect } from "vue";

const users = ref([]);
const { user } = useAuth(auth);
const store = useUsersStore();
watchEffect(() => {
  const usersFilter = users.value.filter((x) => x.uid !== user._rawValue.uid);
  store.users = [...usersFilter];
});

const q = query(collection(db, "user"));
const changesListener = onSnapshot(q, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      // console.log("User add: ", change.doc.data());
      users.value = [...users.value, change.doc.data()];
    }
    if (change.type === "modified") {
      // console.log("User modified: ", change.doc.data());
      users.value = users.value.map((user) =>
        user.uid === change.doc.data().uid
          ? { ...user, status: change.doc.data().status }
          : user
      );
    }
    if (change.type === "removed") {
      console.log("Removed city: ", change.doc.data());
    }
  });
});
defineProps({
  conversations: {
    type: Array,
  },
  current: {
    type: Function,
  },
});
</script>
<style></style>
