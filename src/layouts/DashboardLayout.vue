<template>
  <div ref="RefMessages" class="WAL position-relative bg-grey-4" :style="style">
    <q-layout view="lHh Lpr lFf" class="WAL__layout shadow-3" container>
      <q-header
        v-if="currentConversationIndex !== null && !listenerProfile"
        elevated
      >
        <q-toolbar class="bg-grey-3 text-black">
          <q-btn
            round
            flat
            icon="keyboard_arrow_left"
            class="WAL__drawer-open q-mr-sm"
            @click="toggleLeftDrawer"
          />

          <q-btn round flat>
            <q-avatar>
              <img
                :src="
                  current.avatar ||
                  'https://t4.ftcdn.net/jpg/04/83/90/95/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg'
                "
              />
            </q-avatar>
          </q-btn>
          <span class="q-subtitle-1 q-pl-md">
            {{ current.firstname }}
          </span>

          <q-space />

          <q-btn round flat icon="search" />
          <q-btn round flat>
            <form>
              <input
                type="file"
                @change="uploadFile"
                name="at"
                placeholder="name"
              />
            </form>
            <q-icon name="attachment" class="rotate-135" />
          </q-btn>
          <q-btn round flat icon="more_vert">
            <q-menu auto-close :offset="[110, 0]">
              <q-list style="min-width: 150px">
                <q-item clickable>
                  <q-item-section>Contact data</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Block</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Select messages</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Silence</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Clear messages</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Erase messages</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        bordered
        :breakpoint="690"
      >
        <q-toolbar class="bg-grey-3">
          <q-avatar class="cursor-pointer">
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" />
          </q-avatar>

          <q-space />

          <q-btn round flat icon="message" />
          <q-btn round flat icon="more_vert">
            <q-menu auto-close :offset="[110, 8]">
              <q-list style="min-width: 150px">
                <functions-profile />
              </q-list>
            </q-menu>
          </q-btn>

          <q-btn
            round
            flat
            icon="close"
            class="WAL__drawer-close"
            @click="toggleLeftDrawer"
          />
        </q-toolbar>

        <q-toolbar class="bg-grey-2">
          <q-input
            rounded
            outlined
            dense
            class="WAL__field full-width"
            bg-color="white"
            v-model="search"
            placeholder="Search or start a new conversation"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </q-toolbar>

        <q-scroll-area style="height: calc(100% - 100px)">
          <!-- <q-list>
            <q-item
              v-for="(conversation, index) in conversations"
              :key="conversation.id"
              clickable
              v-ripple
              @click="setCurrentConversation(index)"
            >
              <q-item-section avatar>
                <q-avatar>
                  <img :src="conversation.avatar" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">
                  {{ conversation.person }}
                </q-item-label>
                <q-item-label class="conversation__summary" caption>
                  <q-icon name="check" v-if="conversation.sent" />
                  <q-icon name="not_interested" v-if="conversation.deleted" />
                  {{ conversation.caption }}
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-item-label caption>
                  {{ conversation.time }}
                </q-item-label>
                <q-icon name="keyboard_arrow_down" />
              </q-item-section>
            </q-item>
          </q-list> -->
          <user-list-active
            :conversations="conversations"
            v-on:change="(index) => setCurrentConversation(index)"
          />
        </q-scroll-area>
      </q-drawer>

      <q-page-container class="bg-grey-2">
        <router-view />
      </q-page-container>
      <q-footer>
        <emoji-picker
          v-on:emoji_click="(value) => addEmoji(value)"
          v-if="statusBoxEmojis"
          style="position: absolute; z-index: 50; bottom: 4em"
        />
        <q-form
          v-if="currentConversationIndex !== null && !listenerProfile"
          @submit.prevent="sendMessage"
        >
          <q-toolbar class="bg-grey-3 text-black row">
            <q-btn
              @click="openEmojis"
              round
              flat
              icon="insert_emoticon"
              class="q-mr-sm"
            />
            <q-input
              rounded
              outlined
              dense
              class="WAL__field col-grow q-mr-sm"
              bg-color="white"
              v-model="message"
              placeholder="Type a message"
            />
            <q-btn round flat icon="mic" />
          </q-toolbar>
        </q-form>
      </q-footer>
    </q-layout>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref, computed, onMounted, provide, watchEffect, watch } from "vue";
import FunctionsProfile from "src/components/FunctionsProfile.vue";
import { useUsersStore } from "src/stores/useUser";
import uploadFile from ".././controllers/toolbar";
import UserListActive from "src/components/UserListActive.vue";
import EmojiPicker from "src/components/emojiPicker/EmojiPicker.vue";
const conversations = [
  {
    id: 1,
    person: "Razvan Stoenescu",
    avatar: "https://cdn.quasar.dev/team/razvan_stoenescu.jpeg",
    caption: "I'm working on Quasar!",
    time: "15:00",
    sent: true,
  },
  {
    id: 2,
    person: "Dan Popescu",
    avatar: "https://cdn.quasar.dev/team/dan_popescu.jpg",
    caption: "I'm working on Quasar!",
    time: "16:00",
    sent: true,
  },
];

export default {
  name: "WhatsappLayout",
  components: { FunctionsProfile, UserListActive, EmojiPicker },
  setup() {
    const store = useUsersStore();
    onMounted(() => {
      store.getUser();
    });
    const listenerProfile = ref(false);
    provide("listenerProfile", listenerProfile);
    const $q = useQuasar();
    const leftDrawerOpen = ref(false);
    const search = ref("");
    const message = ref("");
    const currentConversationIndex = ref(null);
    const RefMessages = ref(null);
    const statusBoxEmojis = ref(false);
    const openEmojis = () => {
      statusBoxEmojis.value = !statusBoxEmojis.value;
    };
    const addEmoji = (value) => {
      message.value += value;
    };
    watchEffect(() => {
      if (
        RefMessages.value !== null &&
        !Object.values(store.chat).includes("")
      ) {
        setTimeout(() => {
          document
            .getElementsByClassName("scroll")[0]
            .scrollTo(0, RefMessages.value.scrollHeight);
          // .scrollTo(0, RefMessages.value.scrollHeight);
        }, 5);
      }
    });

    const current = ref({
      firstname: "",
      lastname: "",
      avatar: "",
      email: "",
      uid: "",
    });

    const users = computed(() => store.users);
    watchEffect(() => {
      users.value[currentConversationIndex.value]
        ? (current.value = {
            ...users.value[currentConversationIndex.value],
          }) &&
          (store.currentUserContact = {
            ...users.value[currentConversationIndex.value],
          })
        : (current.value = { ...current.value }) &&
          (store.currentUserContact = { ...current.value });
    });

    const currentConversation = computed(() => {
      return conversations[currentConversationIndex.value];
    });
    provide("currentConversation", current);

    const style = computed(() => ({
      height: $q.screen.height + "px",
    }));

    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }

    function setCurrentConversation(index) {
      currentConversationIndex.value = index;
      listenerProfile.value = false;
      statusBoxEmojis.value = false;
    }
    function sendMessage() {
      if (!message.value) return;
      store.sendMessage(message.value);
      message.value = "";
      statusBoxEmojis.value = false;
    }

    return {
      leftDrawerOpen,
      search,
      message,
      currentConversationIndex,
      conversations,
      currentConversation,
      setCurrentConversation,
      style,
      toggleLeftDrawer,
      current,
      sendMessage,
      listenerProfile,
      RefMessages,
      openEmojis,
      statusBoxEmojis,
      addEmoji,
      uploadFile,
    };
  },
};
</script>

<style lang="sass">
.WAL
  width: 100%
  height: 100%
  padding-top: 20px
  padding-bottom: 20px

  &:before
    content: ''
    height: 100vh
    position: fixed
    top: 0
    width: 100%
    background: #4e54c8
    background: -webkit-linear-gradient(to right, #8f94fb, #4e54c8)
    background: linear-gradient(to right, #8f94fb, #4e54c8)


  &__layout
    margin: 0 auto
    z-index: 4000
    height: 100%
    width: 90%
    max-width: 950px
    border-radius: 5px

  &__field.q-field--outlined .q-field__control:before
    border: none

  .q-drawer--standard
    .WAL__drawer-close
      display: none

@media (max-width: 850px)
  .WAL
    padding: 0
    &__layout
      width: 100%
      border-radius: 0

@media (min-width: 691px)
  .WAL
    &__drawer-open
      display: none

.conversation__summary
  margin-top: 4px

.conversation__more
  margin-top: 0!important
  font-size: 1.4rem
</style>
