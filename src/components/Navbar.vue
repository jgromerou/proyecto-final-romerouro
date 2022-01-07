<template>
  <div>
    <NavigationDrawerLeft
      :open="openLeftNavigationDrawer"
      @drawer-opened="handleDrawerChange('left', $event)"
    >
    </NavigationDrawerLeft>

    <NavigationDrawerRight
      :open="openRightNavigationDrawer"
      @drawer-opened="handleDrawerChange('right', $event)"
    >
    </NavigationDrawerRight>
    <v-app-bar
      flat
      dense
      :clipped-left="$vuetify.breakpoint.mdAndUp"
      :clipped-right="$vuetify.breakpoint.mdAndUp"
      app
      color="#0D47A1"
      dark
      v-if="isLogin"
    >
      <v-container class="d-flex align-center justify-space-between">
        <v-toolbar-title>
          <v-app-bar-nav-icon
            @click.stop="openLeftNavigationDrawer = !openLeftNavigationDrawer"
          ></v-app-bar-nav-icon>

          <router-link
            tag="span"
            class="hidden-sm-and-down font-weight-black"
            to="/"
            >HW TIENDA DE ROPAS</router-link
          >
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <!-- <a>
          <div @click.prevent="toHome" class="home align-left">
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

        <!--  <template>
          <v-btn @click="logout" class="mx-2" color="blue">
            <v-icon>mdi-logout</v-icon> Salir
          </v-btn>
        </template> -->
        <v-menu left bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon color="white">mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list class="align-center">
            <v-list-item>
              <v-toolbar-title class="title blue--text">{{
                email
              }}</v-toolbar-title>
            </v-list-item>
            <v-list-item v-for="n in 1" :key="n" @click="() => {}">
              <v-list-item-title @click.prevent="toCarrito"
                >Ver Perfil</v-list-item-title
              >
            </v-list-item>
            <v-list-item v-for="n in 1" :key="n" @click="() => {}">
              <v-list-item-title @click.prevent="logout"
                >Logout</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn
          small
          style="position: relative"
          @click.stop="openRightNavigationDrawer = !openRightNavigationDrawer"
          class="cart-button mt-2"
          icon
          color="white"
        >
          <v-badge
            small
            v-if="numberOfItem > 0"
            color="red"
            :content="numberOfItem"
            class="badge-carrito"
          >
            <v-icon small>fas fa-shopping-bag</v-icon>
          </v-badge>
          <v-icon small v-else>fas fa-shopping-bag</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-app-bar color="white" dense flat v-else>
      <v-container class="d-flex align-center justify-space-between">
        <a>
          <div @click.prevent="toHome" class="home">
            <img src="../assets/logo.jpeg" class="logo" />
          </div>
        </a>
        <a>
          <div @click.prevent="toHome" class="home ml-8">
            <v-toolbar-title class="title font-weight-black display-4"
              >HW TIENDA DE ROPAS</v-toolbar-title
            >
          </div>
        </a>

        <v-spacer></v-spacer>

        <div @click.prevent="toLogin">
          <v-btn depressed large color="primary">Login</v-btn>
        </div>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import NavigationDrawerLeft from './NavigationDrawerLeft.vue';
import NavigationDrawerRight from './NavigationDrawerRight.vue';

export default {
  name: 'Navbar',
  components: {
    NavigationDrawerLeft,
    NavigationDrawerRight,
  },
  data() {
    return {
      //drawer: true,
      openLeftNavigationDrawer: false,
      openRightNavigationDrawer: false,
    };
  },
  methods: {
    toHome() {
      this.$store.dispatch('toHome');
    },
    toLogin() {
      this.$store.dispatch('toLogin');
    },
    toCarrito() {
      this.$store.dispatch('toCarrito');
    },
    logout() {
      this.$store.dispatch('logout');
    },
    handleDrawerChange(type, isOpen) {
      if (type == 'left') {
        this.openLeftNavigationDrawer = isOpen;
        console.log('left');
      } else {
        this.openRightNavigationDrawer = isOpen;
        console.log('right');
      }
    },
  },
  computed: {
    email() {
      return localStorage.Email;
    },
    numberOfItem() {
      return this.$store.state.carts.length;
    },
    esAdministrador() {
      return (
        this.$store.getters.usuario &&
        this.$store.getters.usuario.rol === 'Administrador'
      );
    },
    esCliente() {
      return (
        this.$store.getters.usuario &&
        this.$store.getters.usuario.rol === 'Cliente'
      );
    },
    ...mapGetters(['usuario', 'isLogin']),
  },

  /* mounted() {
    this.$store.dispatch('loginCheck');

    console.log('rol', this.$store.getters.usuario.rol);
  }, */
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
.badge-carrito {
  display: absolute;
  top: 0;
  right: 0;
}
</style>
