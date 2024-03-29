import { boot } from "quasar/wrappers";
import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { useAuth } from "@vueuse/firebase";
import { computed } from "vue";

// console.log(process.env.API_KEY);
// const { API_KEY, MESSAGIN_SENDER_ID, APP_ID } = process.env;
const firebaseConfig = {
  apiKey: "AIzaSyDUVwF2oMTbVHbMHpusv0prHEaDWoclWEA",
  authDomain: "chat-quasar-f620e.firebaseapp.com",
  projectId: "chat-quasar-f620e",
  storageBucket: "chat-quasar-f620e.appspot.com",
  messagingSenderId: "426273383763",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth(app);
const storage = getStorage(app);
const marcaTiempo = serverTimestamp;

export { db, auth, storage, marcaTiempo };
// alert("Ok");
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot((/* { app, router, ... } */ { urlPath, redirect }) => {
  // something to do
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      if (!urlPath.startsWith("/Login") && !urlPath.startsWith("/signup")) {
        setTimeout(() => redirect({ path: "/Login" }), 1200);
        return;
      }
    } else {
      if (urlPath.startsWith("/Login") || urlPath.startsWith("/signup")) {
        setTimeout(() => redirect({ path: "/chatapp" }), 2000);
        return;
      }
    }
  });
});
