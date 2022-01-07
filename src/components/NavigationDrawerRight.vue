<template>
  <v-navigation-drawer
    style="width: auto"
    app
    right
    :clipped="$vuetify.breakpoint.mdAndUp"
    v-model="drawerOpen"
    @input="onInput"
    v-if="isLogin"
  >
    <v-container>
      <div>
        <p class="text-right">
          <v-btn @click="drawerOpen = false" class="d-inline-block"
            ><v-icon>fa-times</v-icon></v-btn
          >
        </p>
      </div>
      <div class="container col">
        <div class="row">
          <!-- <table v-if="carts.length > 0" class="col-8 table mt-8 mr-8">
            <tbody>
              <TableRow
                :headers="carritoHeaders"
                v-for="cart in carts"
                :key="cart.id"
                :cart="cart"
              ></TableRow>
            </tbody>
          </table> -->
          <v-simple-table height="280px" v-if="carts.length > 0">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">Imagen</th>
                  <th class="text-center">Nombre</th>

                  <th class="text-center">Cantidad</th>
                  <th class="text-center">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in carts" :key="item.id">
                  <td><img class="checkout-img" :src="item.image" /></td>
                  <td>{{ item.nombre }}</td>

                  <td>
                    <v-btn
                      v-if="item.cantidad > 1 && !reload"
                      @click.prevent="restarCantidad(item.id, item.cantidad)"
                      class="quantity-button"
                      icon
                      color="grey"
                    >
                      <v-icon>fas fa-minus</v-icon>
                    </v-btn>
                    <v-btn
                      v-else
                      disabled
                      @click.prevent="restarCantidad(item.id, item.cantidad)"
                      class="quantity-button"
                      icon
                      color="grey"
                    >
                      <v-icon>fas fa-minus</v-icon>
                    </v-btn>

                    {{ item.cantidad }}

                    <v-btn
                      v-if="!reload"
                      @click.prevent="agregarCantidad(item.id, item.cantidad)"
                      class="quantity-button"
                      icon
                      color="grey"
                    >
                      <v-icon>fas fa-plus</v-icon>
                    </v-btn>
                    <v-btn
                      v-else
                      disabled
                      @click.prevent="agregarCantidad(item.id, item.cantidad)"
                      class="quantity-button"
                      icon
                      color="grey"
                    >
                      <v-icon>fas fa-plus</v-icon>
                    </v-btn>
                  </td>
                  <td>{{ item.precio * item.cantidad }}</td>
                  <td class="align-middle">
                    <v-btn
                      small
                      @click.prevent="removeProduct(item.id)"
                      class="delete-button"
                      icon
                      color="grey"
                    >
                      <v-icon>fas fa-trash-alt</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <h1 v-else class="col text--disabled" style="margin-top: 10rem">
            Su Carrito está Vacio..
          </h1>
        </div>
        <div class="col">
          <v-card class="mx-auto" max-width="344">
            <v-card-text>
              <p class="display-1 font-weight-black text--primary">
                Resumen del Pedido
              </p>
              <v-row align="center" class="mx-0 mb-2 justify-lg-space-between">
                <v-card-subtitle
                  class="col"
                  style="padding-top: 0px; padding-bottom: 0"
                  >Total Item:</v-card-subtitle
                >
                <v-card-subtitle
                  class="col mr-5 font-weight-light"
                  style="padding: 5px"
                  >{{ carts.length }} item(s)</v-card-subtitle
                >
              </v-row>
              <v-row align="center" class="mx-0 mb-2 justify-lg-space-between">
                <v-card-subtitle
                  class="col"
                  style="padding-top: 0px; padding-bottom: 0"
                  >Gastos de Envio:</v-card-subtitle
                >
                <v-card-subtitle
                  class="col mr-5 font-weight-light"
                  style="padding: 5px"
                  >Gratis</v-card-subtitle
                >
              </v-row>
            </v-card-text>

            <v-card-text>
              <v-row align="center" class="mx-0 mb-2 justify-lg-space-between">
                <v-card-subtitle
                  class="col-4"
                  style="padding-top: 0px; padding-bottom: 0"
                  >Subtotal:</v-card-subtitle
                >
                <v-card-title class="col font-weight-black" style="padding: 5px"
                  >Precio: {{ price }}
                </v-card-title>
              </v-row>
            </v-card-text>
          </v-card>
          <div class="my-4 row">
            <v-btn
              @click="checkout"
              x-large
              color="success"
              class="col-7 mx-auto"
              dark
              >Generar Pedido</v-btn
            >
          </div>
        </div>
      </div>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
//import TableRow from '../components/CartTableRow';
import { mapGetters } from 'vuex';
export default {
  name: 'NavigationDrawerLeft',
  components: {
    //TableRow,
  },
  props: {
    open: {
      type: Boolean,
      default: true,
    },
    carritoHeaders: [
      { text: 'Precio', value: 'precio' },
      { text: 'Cantidad', value: 'cantidad', width: '200px' },
      { text: 'Total', value: 'total' },
    ],
  },

  data() {
    return {
      drawerOpen: this.open,
      reload: false,
    };
  },
  watch: {
    open(newVal) {
      this.drawerOpen = newVal;
      console.log('open: ' + this.drawerOpen);
    },
  },
  methods: {
    onInput(isOpen) {
      this.$emit('drawer-opened', isOpen);
      console.log('onInput: ' + isOpen);
    },
    checkout() {
      this.$store.dispatch('checkout');
    },
    agregarCantidad(id, cantidad) {
      this.reload = true;
      //let cantidad = this.cart.cantidad;
      //let id = this.cart.id;
      cantidad++;
      console.log(cantidad);
      const newCantidad = {
        nId: id,
        nCantidad: cantidad,
      };
      this.$store.dispatch('agregarCantidad', newCantidad);
      setTimeout(() => {
        this.reload = false;
      }, 1000);
    },
    restarCantidad(id, cantidad) {
      this.reload = true;
      //let cantidad = this.cart.cantidad;
      //let id = this.cart.id;
      cantidad--;
      console.log(cantidad);
      const newCantidad = {
        nId: id,
        nCantidad: cantidad,
      };
      this.$store.dispatch('restarCantidad', newCantidad);
      setTimeout(() => {
        this.reload = false;
      }, 1000);
    },
    removeProduct(id) {
      this.$store.dispatch('eliminarItemCarrito', id);
    },
  },
  computed: {
    email() {
      return localStorage.Email;
    },
    numberOfItem() {
      return this.$store.state.carrito.carts.length;
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
    ...mapGetters(['isLogin']),

    carts() {
      return this.$store.state.carrito.carts;
    },
    price() {
      let precioInicial = 0;
      let precioTotal = 0;
      //   let carts = this.$store.state.carts
      console.log(this.carts, `carrito inicial`);
      for (let i = 0; i < this.carts.length; i++) {
        precioInicial += this.carts[i].precio * this.carts[i].cantidad;
      }
      precioTotal = parseFloat(precioInicial).toLocaleString('id');

      return precioTotal;
    },
  },
  mounted() {
    this.$store.dispatch('obtenerCarrito');
  },
};
</script>

<style lang="scss" scoped>
.checkout-img {
  height: 3rem;
}
th {
  text-align: center;
}
.quantity-toggle {
  display: flexbox;
  flex-direction: column;
  align-items: center;
}
.quantity-button {
  display: inline;
  align-items: center;
  justify-content: center;
}
.quantity {
  border: 1px solid rgba(0, 0, 0);
  padding-top: 2px;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
