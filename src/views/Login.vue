<template>
  <v-layout id="login" align-center justify-center>
    <div class="wrapper-test">
      <div class="message"></div>
      <v-form @submit.prevent="login" method="post" class="form-signin">
        <h2 class="form-signin-heading text-center">Login</h2>
        <v-text-field
          v-model="email"
          autofocus
          color="accent"
          label="Email"
          required
        >
        </v-text-field>
        <v-text-field
          v-model="password"
          type="password"
          color="accent"
          label="Password"
          required
        >
        </v-text-field>

        <v-btn class="btn lg primary block" @click="login()">Login</v-btn>
        <v-spacer></v-spacer>
        <div class="mt-8">
          No tienes una cuenta?
          <a href="" @click.prevent="toRegister">Registrate</a>
        </div>
        <v-spacer></v-spacer>
        <div class="mt-8">
          <a href="" @click.prevent="toHome">Página Principal</a>
        </div>
      </v-form>
    </div>
  </v-layout>
</template>

<script>
export default {
  name: 'Login',

  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    toRegister() {
      this.$store.dispatch('toRegister');
    },
    toHome() {
      this.$store.dispatch('toHome');
    },
    login() {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<style>
#login {
  background: rgb(34, 193, 195);
  background: linear-gradient(
    0deg,
    rgba(34, 193, 195, 1) 0%,
    rgba(72, 161, 118, 1) 100%
  );
  min-height: 100vh;
}
.form-signin {
  max-width: 1000px;
  margin: 0 auto;
  background-color: #fff;
  padding: 15px 40px 50px;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
}
.form-signin input[type='text'],
.form-signin input[type='password'] {
  margin-bottom: 20px;
}
.form-signin .form-control {
  padding: 10px;
}
</style>
