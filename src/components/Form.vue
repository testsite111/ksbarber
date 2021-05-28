<template>
  <div>
    <v-form action="/" method="post" name="form" v-model="valid">
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
      <p>
        <v-text-field
          name="mes"
          label="Сообщение (не обязательное поле)"
          type="text"
          v-model="mes"
          maxlength="200"
          minlength="20"
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
          >Отправить</v-btn>
        </v-card-actions>
      </transition>
    </v-form>
    <transition name="fade">
      <v-alert color="green" dense type="success" v-if="show">Ваша заявка успешно отправлена!</v-alert>
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
    mes: "",
    valid: false,
    show: false,
    order: "*** Заявка на обучение ***",
    nameRules: [
      v => !!v || "Пожалуйста введите имя",
      v => (v && v.length) >= 3 || "Имя слишком короткое - минимум 3 символов"
    ],
    telRules: [
      v => !!v || "Пожалуйста введите телефон",
      v => (v && v.length) >= 11 || "Телефон должен состоять из 11 цифр",
      v => /[7-8]{1}[0-9]{10}/.test(v) || "Неправильный номер"
    ]
  }),
  computed: {
    error() {
      return this.$store.getters.getError;
    },
    processing() {
      return this.$store.getters.getProcessing;
    }
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
            this.order +
            "%0A" +
            this.name +
            "%0A" +
            this.tel +
            "%0A" +
            this.mes,
          {
            order: encodeURI(this.order),
            name: encodeURI(this.name),
            tel: encodeURI(this.tel),
            mes: encodeURI(this.mes)
          }
        )
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style lang="scss" scoped></style>
