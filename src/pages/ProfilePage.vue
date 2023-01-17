<template>
  <q-page padding>
    <div id="profile">
      <img :src="dataUser.avatar" class="img-profile" />
      <div class="text-profile">
        <p>{{ dataUser.firstname }}</p>
        <p>{{ dataUser.lastname }}</p>
      </div>
      <p>{{ dataUser.email }}</p>
    </div>
  </q-page>
</template>
<script setup>
import { computed } from "vue";
import { useUsersStore } from "src/stores/useUser";

const store = useUsersStore();
const dataUser = computed(() => store.userData);
</script>
<style>
.img-profile {
  border-radius: 50%;
  /* min-width: 15em; */
  max-width: 25em;
  /* min-height: 15em; */
  max-height: 25em;
  width: 15em;
  height: 15em;
  margin: 2em 0;
}
.text-profile {
  /* display: flex; */
  /* justify-content: space-between; */
}
p {
  /* margin: 0 5px; */
}
#profile {
  max-width: 50em;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
}
</style>
