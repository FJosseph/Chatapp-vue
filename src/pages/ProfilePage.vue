<template>
  <q-page padding>
    <form @submit.prevent="updateData">
      <div id="profile">
        <!-- <img
          :src="
            dataUser.avatar ||
            'https://t4.ftcdn.net/jpg/04/83/90/95/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg'
          "
          class="img-profile"
        />
        <input
          type="file"
          @change="uploadImageProfile"
          name="at"
          placeholder="name"
          accept="image/png, image/gif, image/jpeg"
        /> -->

        <div class="avatar-upload">
          <div class="avatar-edit">
            <input
              @change="uploadImageProfile"
              type="file"
              id="imageUpload"
              placeholder="name"
              accept=".png, .jpg, .jpeg"
            />
            <label for="imageUpload">
              <q-icon name="edit"></q-icon>
            </label>
          </div>
          <div class="avatar-preview">
            <div
              id="imagePreview"
              :style="`background-image: url(${
                dataUser.avatar ||
                'https://t4.ftcdn.net/jpg/04/83/90/95/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg'
              })`"
            ></div>
          </div>
        </div>

        <div class="text-profile">
          <div class="text-field">
            <label for="firstname"
              >Firstname
              <q-btn
                @click="changeData('firstname')"
                flat
                round
                color="deep-purple-5"
                icon="edit"
              />
            </label>
            <q-input
              v-if="statusChange.firstname"
              v-model="dataEdit.firstname"
              :dense="true"
            />
            <p v-else id="firstname">
              {{ dataEdit.firstname }}
            </p>
          </div>
          <div class="text-field">
            <label for="lastname"
              >Lastname
              <q-btn
                @click="changeData('lastname')"
                flat
                round
                color="deep-purple-5"
                icon="edit"
              />
            </label>
            <q-input
              v-if="statusChange.lastname"
              v-model="dataEdit.lastname"
              :dense="true"
            />
            <p v-else id="lastname">{{ dataEdit.lastname }}</p>
          </div>
        </div>
        <label for="email">Email </label>
        <p id="email">{{ dataUser.email }}</p>
        <label for="description"
          >Description
          <q-btn
            @click="changeData('description')"
            flat
            round
            color="deep-purple-5"
            icon="edit"
          />
        </label>
        <q-input
          v-if="statusChange.description"
          v-model="dataEdit.description"
          :dense="true"
        />
        <p v-else id="description">
          {{
            dataEdit.description || "Escribe alguna descripción sobre ti. 😃"
          }}
        </p>
      </div>
    </form>
  </q-page>
</template>
<script setup>
import { computed, ref, watchEffect } from "vue";
import { useUsersStore } from "src/stores/useUser";
import uploadImageProfile from "src/controllers/profile_upload";

const store = useUsersStore();
const dataUser = computed(() => store.userData);

const dataEdit = ref({
  firstname: "",
  lastname: "",
  description: "",
});

const statusChange = ref({
  firstname: false,
  lastname: false,
  description: false,
});
watchEffect(() => {
  dataEdit.value = {
    firstname: dataUser.value.firstname,
    lastname: dataUser.value.lastname,
    description: dataUser.value.description,
  };
});
const changeData = (field) => {
  statusChange.value[field] = !statusChange.value[field];
};

const updateData = () => {
  if (!dataEdit.value.firstname || !dataEdit.value.lastname)
    return alert("No puede ser vacío");
  store.updateUser(dataEdit.value);
  statusChange.value = {
    firstname: false,
    lastname: false,
    description: false,
  };
  alert("¡Hola mundo!");
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
.img-profile {
  border-radius: 50%;
  /* min-width: 15em; */
  max-width: 25em;
  /* min-height: 15em; */
  max-height: 25em;
  width: 15em;
  height: 15em;
  margin-top: 5em;
  margin-bottom: 2em;
  box-shadow: rgba(179, 46, 240, 0.4) 0px 5px, rgba(75, 46, 240, 0.3) 0px 10px,
    rgba(46, 162, 240, 0.2) 0px 15px, rgba(240, 46, 170, 0.1) 0px 20px,
    rgba(240, 46, 170, 0.05) 0px 25px;
}
.text-profile {
  display: flex;
  /* justify-content: space-between; */
  font-family: "Poppins", sans-serif;
  margin-bottom: 2em;
}

label {
  font-weight: 600;
}
/* p {
} */

.text-field {
  width: 10em;
}
#profile {
  max-width: 50em;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
}
/* button {
} */

/* Style Image Profile */
.avatar-upload {
  position: relative;
  max-width: 205px;
  margin: 50px auto;
}
.avatar-upload .avatar-edit {
  position: absolute;
  right: 12px;
  z-index: 1;
  top: 10px;
}
.avatar-upload .avatar-edit input {
  display: none;
}
.avatar-upload .avatar-edit input + label {
  /* display: inline-block; */
  width: 34px;
  height: 34px;
  margin-bottom: 0;
  border-radius: 100%;
  background: #ffffff;
  border: 1px solid transparent;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  font-weight: normal;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar-upload .avatar-edit input + label:hover {
  background: #f1f1f1;
  border-color: #d6d6d6;
  display: flex;
  align-items: center;
}
/* .avatar-upload .avatar-edit input + label:after {
  content: "\f040";
  font-family: "FontAwesome";
  color: #757575;
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;
  text-align: center;
  margin: auto;
} */
.avatar-upload .avatar-preview {
  width: 192px;
  height: 192px;
  position: relative;
  border-radius: 100%;
  border: 6px solid #f8f8f8;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
}
.avatar-upload .avatar-preview > div {
  width: 100%;
  height: 100%;
  border-radius: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
