<template>
  <div class="mt-7">
    <v-navigation-drawer
      fixed
      :clipped="$vuetify.breakpoint.mdAndUp"
      app
      v-model="drawer"
    >
      <v-list dense>
        <template>
          <v-list-item :to="{ name: 'Home' }">
            <v-list-item-action>
              <v-icon>home</v-icon>
            </v-list-item-action>
            <v-list-item-title> Inicio </v-list-item-title>
          </v-list-item>
        </template>
        <template>
          <v-list-group>
            <v-list-title slot="activator">
              <v-list-content>
                <v-list-item-title> Panel de Administración</v-list-item-title>
              </v-list-content>
            </v-list-title>
            <v-list-item :to="{ name: 'Productos' }">
              <v-list-item-action>
                <v-icon>table_chart</v-icon>
              </v-list-item-action>
              <v-list-content>
                <v-list-item-title> Productos </v-list-item-title>
              </v-list-content>
            </v-list-item>
            <v-list-item :to="{ name: 'Carrito' }">
              <v-list-item-action>
                <v-icon>table_chart</v-icon>
              </v-list-item-action>
              <v-list-content>
                <v-list-item-title> Carrito </v-list-item-title>
              </v-list-content>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      flat
      dense
      :clipped-left="$vuetify.breakpoint.mdAndUp"
      app
      color="#0D47A1"
      dark
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <router-link tag="span" class="hidden-sm-and-down" to="/"
          >TIENDA DE COMIDAS</router-link
        >
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <!-- <a>
        <div @click.prevent="toHome" class="home">
          <img
            src="https://images.pexels.com/photos/1162361/pexels-photo-1162361.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            class="logo"
          />
        </div>
      </a> -->
      <!-- <a>
        <div @click.prevent="toHome" class="home">
          <v-toolbar-title class="title ml-8">SISTEMA</v-toolbar-title>
        </div>
      </a> -->

      <v-btn
        @click.prevent="toCarrito"
        class="cart-button mb-6 mx-10 mt-8"
        icon
        color="white"
      >
        <v-badge
          v-if="numberOfItem > 0"
          color="red"
          :content="numberOfItem"
          class="mr-4"
        >
          <v-icon>fas fa-shopping-bag</v-icon>
        </v-badge>
        <v-icon v-else>fas fa-shopping-bag</v-icon>
      </v-btn>

      <v-btn
        @click.prevent="toDrawer"
        class="cart-button mb-6 mx-10 mt-8"
        icon
        color="white"
      >
        <v-icon>fas </v-icon>
      </v-btn>

      <v-toolbar-title class="title mb-6 mt-8 ml-6 white--text">{{
        email
      }}</v-toolbar-title>
      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="mb-5 mt-5" icon v-bind="attrs" v-on="on">
            <v-icon color="white">mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            class="mb-6 mt-8"
            v-for="n in 1"
            :key="n"
            @click="() => {}"
          >
            <v-list-item-title @click="logout">Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      drawer: true,
    };
  },
  methods: {
    toCarrito() {
      this.$store.dispatch('toCarrito');
    },
    toDrawer() {
      this.$store.dispatch('toDrawer');
    },
    toHome() {
      this.$store.dispatch('toHome');
    },
    logout() {
      this.$store.dispatch('logout');
    },
  },
  computed: {
    email() {
      return localStorage.Email;
    },
    numberOfItem() {
      return this.$store.state.carts.length;
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
