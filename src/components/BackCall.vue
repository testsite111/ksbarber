<template>
  <div>
    <v-form action="/" method="post" name="call" v-model="valid">
      <p>
        <v-text-field
          name="name"
          label="Ваше имя *"
          type="text"
          required
          v-model="name"
          :rules="nameRules"
          maxlength="35"
          minlength="3"
        ></v-text-field>
      </p>
      <p>
        <v-text-field
          name="tel"
          label="Ваш телефон *"
          type="tel"
          required
          v-model="tel"
          :rules="telRules"
          maxlength="11"
          minlength="11"
        ></v-text-field>
      </p>
      <transition name="fade">
        <v-card-actions class="justify-center" v-if="!show">
          <v-btn
            @click.prevent="send"
            @click="show = !show"
            :disabled="processing || !valid"
            text
            elevation="24"
            class="btn-backcall"
            >Отправить</v-btn
          >
        </v-card-actions>
      </transition>
    </v-form>
    <transition name="fade">
      <v-alert color="green" dense type="success" v-if="show"
        >Спасибо за обращение! В ближайшее время с вами свяжутся!</v-alert
      >
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import { TOKEN, CHAD_ID } from "@/api/index";
export default {
  data: () => ({
    name: "",
    tel: "",
    valid: false,
    show: false,
    call: "(- Обратный звонок -)",
    nameRules: [
      (v) => !!v || "Пожалуйста введите имя",
      (v) =>
        (v && v.length) >= 3 || "Имя слишком короткое - минимум 3 символов",
    ],
    telRules: [
      (v) => !!v || "Пожалуйста введите телефон",
      (v) => (v && v.length) >= 11 || "Телефон должен состоять из 11 цифр",
      (v) => /[7-8]{1}[0-9]{10}/.test(v) || "Неправильный номер",
    ],
  }),
  computed: {
    error() {
      return this.$store.getters.getError;
    },
    processing() {
      return this.$store.getters.getProcessing;
    },
  },
  methods: {
    send() {
      axios
        .post(
          "https://api.telegram.org/bot" +
            TOKEN +
            "/sendMessage?chat_id=" +
            CHAD_ID +
            "&parse_mode=html&text=" +
            this.call +
            "%0A" +
            this.name +
            "%0A" +
            this.tel,
          {
            call: encodeURI(this.call),
            name: encodeURI(this.name),
            tel: encodeURI(this.tel),
          }
        )
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-backcall {
  background: linear-gradient(#8c732e, #eac251);
  color: #101010;
}
</style>
