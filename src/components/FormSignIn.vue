<template>
  <div class="form-template">
    <h3 class="text-h3 text-center">Sign In</h3>
    <q-form @submit.prevent="onSubmit" @reset="onReset" ref="myForm">
      <q-input
        class="q-mx-sm q-my-sm"
        outlined
        v-model="input.email"
        lazy-rules
        :rules="[
          (val) =>
            (val &&
              val.length > 0 &&
              (/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(val) ||
                'Debe ser un email')) ||
            'Campo vacío',
        ]"
        label="Username"
      />
      <q-input
        class="q-mx-sm q-my-sm"
        outlined
        v-model="input.password"
        type="password"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Campo vacío']"
        label="Password"
      />
      <div class="row">
        <a href="/signup">¿No tienes una cuenta? Regístrate</a>
      </div>
      <div class="row items-center">
        <q-btn
          class="q-mx-sm"
          outline
          rounded
          color="primary"
          type="submit"
          label="Ingresar"
        ></q-btn>
      </div>
    </q-form>
    <!-- <q-btn v-if="isAuthenticated" @click="logout">Salir</q-btn> -->
  </div>
</template>
<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { useUsersStore } from "src/stores/useUser";
import { useAuth } from "@vueuse/firebase";
import { auth } from "src/boot/firebase";
export default {
  name: "FormComponent",
  setup() {
    const { isAuthenticated, user } = useAuth(auth);
    const store = useUsersStore();
    const $q = useQuasar();
    const myForm = ref(null);
    const input = ref({
      email: "",
      password: "",
    });
    const onSubmit = async () => {
      const data = await store.signinUser(
        input.value.email,
        input.value.password
      );
      if (data == "Error") {
        return $q.notify({
          color: "red-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Your password or Email are incorrect",
        });
      }
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "Submit succesfull",
      });
      myForm.value.resetValidation();
      onReset();
    };
    const onReset = () => {
      input.value = {
        email: "",
        password: "",
      };
    };
    const logout = () => {
      store.logoutUser();
    };
    return {
      onSubmit,
      onReset,
      input,
      myForm,
      isAuthenticated,
      user,
      logout,
    };
  },
};
</script>
<style>
.form-template {
  max-width: 100em;
  min-width: 30em;
  background: white;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin-top: -5em;
  border-radius: 1em;
  padding-bottom: 3em;
}
h3 {
  margin-top: 0.4em;
  margin-bottom: 0.6em;
}
a {
  text-decoration: none;
  color: black;
  font-weight: 700;
  padding: 0 1em;
  margin-bottom: 6px;
  margin-top: -0.4em;
}
.items-center {
  justify-content: center;
}
</style>
