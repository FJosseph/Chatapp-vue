<template>
  <div class="row justify-center">
    <q-btn
      rounded
      outline
      @click="googleSignIn"
      icon="img:https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
    >
      <div class="q-ml-sm">Ingresa con Google</div>
    </q-btn>
  </div>
</template>
<script>
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "src/boot/firebase";
import { useUsersStore } from "src/stores/useUser";
export default {
  name: "ButtonGoogle",
  setup() {
    const store = useUsersStore();
    const googleSignIn = async () => {
      // const provider = new GoogleAuthProvider();
      // signInWithPopup(auth, provider)
      //   .then((res) => console.log(res))
      //   .catch((e) => console.log(e));
      await store.loginWithGoogle();
    };
    return {
      googleSignIn,
    };
  },
};
</script>
<style></style>
