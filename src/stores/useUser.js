import { defineStore } from "pinia";
import { auth, db, marcaTiempo } from "boot/firebase";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
let unsubscribe;
export const useUsersStore = defineStore("user", {
  state: () => ({
    userData: {
      uid: "",
      firstname: "",
      lastname: "",
      email: "",
      description: "",
      avatar: "",
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
    async loginWithGoogle() {
      try {
        const provider = new GoogleAuthProvider();
        const login = await signInWithPopup(auth, provider);
        const user = await getDoc(doc(db, "user", login.user.uid));
        console.log(user);
        if (!user._document) {
          const { uid, displayName, email } = login.user;
          this.userData = {
            uid,
            firstname: displayName,
            email,
          };
          await setDoc(doc(db, "user", this.userData.uid), {
            ...this.userData,
            status: true,
          });
        }
      } catch (error) {
        console.log(error.message);
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
        const { firstname, lastname, uid, email, avatar, description } =
          usuario._document.data.value.mapValue.fields;
        this.userData = {
          avatar: avatar?.stringValue || avatar,
          firstname: firstname?.stringValue || firstname,
          lastname: lastname?.stringValue || lastname || "Complétalo😃",
          uid: uid?.stringValue || uid,
          email: email?.stringValue || email,
          description: description?.stringValue || description,
        };
      });
    },
    async updateUser(data) {
      await updateDoc(doc(db, "user", this.userData.uid), {
        ...data,
      });
    },
    async sendMessage(message, file) {
      try {
        const user = this.userData;
        const userContact = this.currentUserContact;
        const dataMessage = {
          user: user.email,
          text: message,
          file,
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
