import { ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { storage } from "src/boot/firebase";
import { useUsersStore } from "src/stores/useUser";
import { computed, onMounted, provide, watchEffect, watch } from "vue";

const store = useUsersStore();
const userData = computed(() => store.userData);
export default function uploadFile(event) {
  // Obtener el archivo
  const file = event.target.files[0];
  console.log(file, userData.value);
  // Creación de referencia
  const refAttachment = ref(
    storage,
    `messages/${userData.value.uid}/` + file.name
  );
  // Subida de archivo
  const upload = uploadBytesResumable(refAttachment, file);

  // Supervisar carga
  upload.on(
    "state_changed",
    (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
    },
    (error) => {
      console.log(error);
    },
    () => {
      console.log("Finished!!");
    }
  );
}
