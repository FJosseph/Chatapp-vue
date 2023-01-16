import { defineStore } from "pinia";
import { auth, db, marcaTiempo } from "boot/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
let unsubscribe;
export const useUsersStore = defineStore("user", {
  state: () => ({
    userData: {
      uid: "",
      firstname: "",
      lastname: "",
      email: "",
    },
    users: [],
    currentUserContact: {
      uid: "",
      firstname: "",
      lastname: "",
      email: "",
    },
    chat: [],
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2,
  },
  actions: {
    async registerUser({ email, password, firstname, lastname }) {
      try {
        const userRegister = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.userData = {
          uid: userRegister.user.uid,
          firstname,
          lastname,
          email: userRegister.user.email,
        };
        await setDoc(doc(db, "user", this.userData.uid), {
          ...this.userData,
          status: true,
        });
        return userRegister;
      } catch (error) {
        const err = JSON.stringify(error.customData._tokenResponse.error);
        return err;
      }
    },
    async signinUser(email, password) {
      try {
        const userSignIn = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.userData = {
          uid: userSignIn.user.uid,
          email: userSignIn.user.email,
        };
        await updateDoc(doc(db, "user", this.userData.uid), {
          status: true,
        });
        return userSignIn;
      } catch (error) {
        return "Error";
      }
    },
    async logoutUser() {
      try {
        await signOut(auth);
        await updateDoc(doc(db, "user", this.userData.uid), {
          status: false,
        });
        this.userData = {
          uid: "",
          email: "",
        };
        return signOut;
      } catch (error) {
        console.log(error.message);
      }
    },
    getUser() {
      onAuthStateChanged(auth, async (user) => {
        const usuario = await getDoc(doc(db, "user", user.uid));
        console.log(usuario);
        const { firstname, lastname, uid, email, avatar } =
          usuario._document.data.value.mapValue.fields;
        this.userData = {
          avatar: avatar.stringValue,
          firstname: firstname.stringValue,
          lastname: lastname.stringValue,
          uid: uid.stringValue,
          email: email.stringValue,
        };
      });
    },
    async sendMessage(message) {
      try {
        const user = this.userData;
        const userContact = this.currentUserContact;
        const dataMessage = {
          user: user.email,
          text: message,
          date: serverTimestamp(),
          uid: user.uid,
        };
        await addDoc(
          collection(db, `chat/${user.uid}/${userContact.uid}`),
          dataMessage
        );
        await addDoc(
          collection(db, `chat/${userContact.uid}`, user.uid),
          dataMessage
        );
      } catch (error) {
        console.log(error);
      }
    },
    async getDataChat(idUserSelect) {
      if (unsubscribe) this.UNSUSCRIBE();
      const q = query(
        collection(db, `chat/${this.userData.uid}`, idUserSelect),
        orderBy("date")
      );
      this.chat = [];
      unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            this.chat.push({
              ...change.doc.data(),
              uid: change.doc.data().uid,
            });
          }
        });
      });
    },
    UNSUSCRIBE() {
      unsubscribe();
    },
  },
});
