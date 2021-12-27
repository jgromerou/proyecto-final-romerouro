<template>
  <div class="mt-7">
    <v-app-bar color="white" dense flat>
      <a>
        <div @click.prevent="toHome" class="home">
          <img src="../assets/logo.jpeg" class="logo" />
        </div>
      </a>
      <a>
        <div @click.prevent="toHome" class="home ml-8">
          <v-toolbar-title class="title">TIENDA DE COMIDAS</v-toolbar-title>
        </div>
      </a>

      <v-spacer></v-spacer>

      <div @click.prevent="toLogin" class="">
        <v-btn depressed large color="primary">Login</v-btn>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'NavbarLogout',
  methods: {
    toHome() {
      this.$store.dispatch('toHome');
    },
    toLogin() {
      this.$store.dispatch('toLogin');
    },
  },
};
</script>

<style>
.title {
  color: #0d47a1;
}
.logo {
  width: 6rem;
  height: auto;
}
</style>
