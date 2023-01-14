<template>
  <q-item clickable>
    <q-item-section>New group</q-item-section>
  </q-item>
  <q-item clickable>
    <q-item-section>Profile</q-item-section>
  </q-item>
  <q-item clickable>
    <q-item-section>Archived</q-item-section>
  </q-item>
  <q-item clickable>
    <q-item-section>Favorites</q-item-section>
  </q-item>
  <q-item clickable>
    <q-item-section>Settings</q-item-section>
  </q-item>
  <q-item @click="logout" clickable>
    <q-item-section>Logout</q-item-section>
  </q-item>
</template>
<script setup>
import { computed, onMounted, watchEffect } from "vue";
import { useAuth } from "@vueuse/firebase";
import { auth } from "boot/firebase";
import { useUsersStore } from "src/stores/useUser";
const store = useUsersStore();
const logout = () => {
  store.logoutUser();
};
</script>
<style></style>
