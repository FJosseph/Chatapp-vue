import { boot } from "quasar/wrappers";
import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuth } from "@vueuse/firebase";
import { computed } from "vue";

console.log(process.env.API_KEY);
const { API_KEY, MESSAGIN_SENDER_ID, APP_ID } = process.env;
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "chat-quasar-f620e.firebaseapp.com",
  projectId: "chat-quasar-f620e",
  storageBucket: "chat-quasar-f620e.appspot.com",
  messagingSenderId: MESSAGIN_SENDER_ID,
//   appId: APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth(app);
const marcaTiempo = serverTimestamp;

export { db, auth, marcaTiempo };
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
        setTimeout(() => redirect({ path: "/chatapp" }), 1100);
        return;
      }
    }
  });
});
