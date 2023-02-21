<template>
  <!-- <div
      v-if="file"
      @click="file = null"
      :style="{
        'background-image': `url(${file})`,
        width: '5rem',
        height: '5rem',
        border: '1px solid',
        'background-position': 'center',
        'background-size': 'cover',
        'margin-right': '1rem',
        'border-radius': '1rem',
        cursor: 'pointer',
      }"
    ></div> -->
  <q-dialog
    v-model="modal"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="text-white" style="width: 300px; background: #4e54c8">
      <q-card-section>
        <div class="text-h6">¿Deseas enviar este archivo?</div>
      </q-card-section>

      <q-card-section class="q-px-none q-py-none">
        <div style="width: 100%">
          <q-img :src="file" :ratio="4 / 3" />
        </div>
      </q-card-section>

      <q-card-actions align="center" class="bg-white text-teal">
        <q-input
          style="width: 80%"
          v-model="message"
          label="Escribe tu mensaje"
        ></q-input>
      </q-card-actions>
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn
          flat
          label="OK"
          v-close-popup
          @click="uploadFile(fileInitial, message)"
        />
        <q-btn flat label="Cancelar" v-close-popup @click="dropFiles" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import uploadFile from "src/controllers/toolbar";
import { inject } from "vue";

const message = inject("message");
const file = inject("fileChange");
const fileInitial = inject("file");
const modal = inject("modalState");
const dropFiles = () => {
  file.value = null;
  fileInitial.value = null;
};
defineProps({
  //   statusModal: {
  //     type: Boolean,
  //   },
});
</script>
<style></style>
