<template>
  <v-container>
    <v-layout class="justify-center">
      <v-card>
        <v-toolbar dark>
          <v-toolbar-title>Вход в админ. панель</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-alert type="error" :value="error">{{error}}</v-alert>
          <v-form v-model="valid">
            <v-text-field
              name="login"
              label="E-mail"
              type="email"
              required
              v-model="email"
              :rules="emailRules"
            ></v-text-field>
            <v-text-field
              id="password"
              name="password"
              label="Пароль"
              type="password"
              required
              v-model="password"
              :rules="passwordRules"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-spacer></v-spacer>
        <v-card-actions class="justify-center">
          <v-btn @click.prevent="signin" :disabled="processing || !valid" dark>Войти</v-btn>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    email: null,
    password: null,
    valid: false,
    emailRules: [
      v => !!v || "Пожалуйста введите email",
      v => /.+@.+/.test(v) || "Неправильный email"
    ],
    passwordRules: [
      v => !!v || "Пожалуйста введите пароль",
      v =>
        (v && v.length) >= 7 || "Пароль слишком короткий - минимум 7 символов"
    ]
  }),
  computed: {
    error() {
      return this.$store.getters.getError;
    },
    processing() {
      return this.$store.getters.getProcessing;
    },
    isUserAuthenticated() {
      return this.$store.getters.isUserAuthenticated;
    }
  },
  watch: {
    isUserAuthenticated(val) {
      if (val === true) this.$router.push("/");
    }
  },
  methods: {
    signin() {
      this.$store.dispatch("SIGNIN", {
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>
<style lang="scss" scoped></style>
