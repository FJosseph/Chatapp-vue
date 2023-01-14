<template>
  <div class="form-template">
    <h3 class="text-h3 text-center">Sign Up</h3>
    <q-form @submit.prevent="onSubmit" @reset="reset" ref="myForm">
      <div class="row q-my-sm">
        <q-input
          class="col q-p-xl q-mx-sm"
          outlined
          v-model="input.firstname"
          label="Nombre"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Campo vacío']"
        />
        <q-input
          class="col q-p-xl q-mx-sm"
          outlined
          v-model="input.lastname"
          label="Apellido"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Campo vacío']"
        />
      </div>
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
        label="Correo"
      />
      <q-input
        class="q-mx-sm q-my-sm"
        outlined
        v-model="input.password"
        lazy-rules
        :rules="[
          (val) =>
            (val && val.length > 5) ||
            'Tu contraseña tener más de 5 caracteres',
        ]"
        label="Password"
        type="password"
      />
      <q-input
        class="q-mx-sm q-my-sm"
        outlined
        v-model="confirmPassword"
        lazy-rules
        :rules="[
          (val) =>
            (val && val.length > 0 && val == input.password) ||
            'Deben coincidir ambas contraseñas',
        ]"
        label="Confirm Password"
        type="password"
      />
      <div class="row">
        <a href="/login">¿Ya tienes una cuenta? Ingresa</a>
      </div>
      <div class="row items-center">
        <q-btn
          class="q-mx-sm"
          outline
          rounded
          color="primary"
          type="submit"
          label="Regístrate"
        ></q-btn>
      </div>
    </q-form>
    <!-- <q-btn v-if="isAuthenticated" @click="logout"> Salir </q-btn> -->
  </div>
</template>
<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { useAuth } from "@vueuse/firebase";
import { useUsersStore } from "src/stores/useUser";
import { auth } from "src/boot/firebase";
export default {
  name: "FormComponent",
  setup() {
    const { isAuthenticated, user } = useAuth(auth);
    const store = useUsersStore();
    const $q = useQuasar();
    const myForm = ref(null);
    const confirmPassword = ref("");
    const input = ref({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    });
    const onSubmit = () => {
      if (
        confirmPassword.value !== input.value.password ||
        input.value.password.length < 6
      ) {
        return $q.notify({
          color: "red-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Write passwords correctly",
        });
      }
      store.registerUser(input.value);
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "Submit succesfull",
      });
      myForm.value.resetValidation();
      reset();
    };

    const reset = () => {
      input.value = {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      };
      confirmPassword.value = "";
    };
    const logout = () => {
      store.logoutUser();
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "Logout success",
      });
    };
    return {
      onSubmit,
      logout,
      reset,
      input,
      myForm,
      confirmPassword,
      isAuthenticated,
      user,
    };
  },
};
</script>
<style>
.form-template {
  max-width: 100em;
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
