import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router';
import axios from 'axios';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,

    products: [],
    carts: [],
  },
  mutations: {
    GUARDAR_ITEM_CART_LOCALSTORAGE(state) {
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    login(state) {
      state.isLogin = true;
      router.push({ name: 'Home' });
    },
    OBTENER_PRODUCTOS(state, payload) {
      state.products = payload;
      console.log(this.state.products, `state producto mutation`);
      //router.push({name: 'Home'})
    },
    OBTENER_CARRITO(state, payload) {
      state.carts = payload;
      console.log(this.state.carts, `state carrito mutation`);
      //router.push({ name: 'Cart'})
    },

    updateCart(state, payload) {
      state.carts.push(payload);
    },
    loggedIn(state) {
      state.isLogin = true;
      // router.push({name: 'Home'})
    },
    loggedOut(state) {
      state.isLogin = false;
      router.push({ name: 'Home' });
    },
    LOGOUT(state) {
      localStorage.clear();
      state.isLogin = false;
      router.push({ name: 'Home' });
    },
  },
  actions: {
    toCarrito() {
      router.push({ name: 'Carrito' });
      console.log('Al Carrito');
    },
    toDrawer() {
      router.push({ name: 'Drawer' });
      console.log('Al Drawer');
    },
    login(context, payload) {
      console.log(payload, `masuk sini`);
      axios({
        url: 'http://localhost:3000/login',
        method: 'post',
        data: payload,
      })
        .then(({ data }) => {
          console.log(data, `<<<<<`);
          localStorage.setItem('token', data.token);
          localStorage.setItem('Email', payload.email);
          context.commit('login', data);
        })
        .catch((err) => {
          console.log(err, 'error');
        });
    },
    toHome() {
      router.push({ name: 'Home' });
    },
    toLogin() {
      router.push({ name: 'Login' });
    },
    toRegister() {
      router.push({ name: 'Register' });
    },
    obtenerProductos(context) {
      console.log('store <<<');
      axios({
        url: 'https://61b0b20e3c954f001722a59e.mockapi.io/productos',
        method: 'get',
      })
        .then(({ data }) => {
          console.log(data, `<<< accion obtenerProductos`);
          context.commit('OBTENER_PRODUCTOS', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    obtenerCarrito(context) {
      axios({
        url: `https://61b0b20e3c954f001722a59e.mockapi.io/carrito`,
        method: 'get',
        /* headers: {
          token: localStorage.token,
        }, */
      })
        .then(({ data }) => {
          console.log(data.carts, `<<< accion obtenerCarrito`);
          context.commit('OBTENER_CARRITO', data);
        })
        .catch(() => {
          router.push({ name: 'Home' });
        });
    },

    agregarProductoCarrito(context, payload) {
      axios({
        url: `https://61b0b20e3c954f001722a59e.mockapi.io/carrito`,
        method: 'POST',
        /* headers: {
          token: localStorage.token,
        }, */
        data: {
          id: payload.id,
          nombre: payload.nombre,
          precio: payload.precio,
          cantidad: payload.cantidad,
          image: payload.image,
        },
      })
        .then(({ data }) => {
          context.dispatch('obtenerCarrito', data);
        })
        .catch(() => {});
    },

    agregarCantidad(context, payload) {
      axios({
        url: `https://61b0b20e3c954f001722a59e.mockapi.io/carrito/${payload.nId}`,
        method: 'put',
        /* headers: {
          token: localStorage.token,
        }, */
        data: {
          cantidad: payload.nCantidad,
        },
      }).then(({ data }) => {
        console.log('Item sumado 1 en Carrito', data);
        context.dispatch('obtenerCarrito');
      });
    },
    restarCantidad(context, payload) {
      axios({
        url: `https://61b0b20e3c954f001722a59e.mockapi.io/carrito/${payload.nId}`,
        method: 'put',
        /* headers: {
          token: localStorage.token,
        }, */
        data: {
          cantidad: payload.nCantidad,
        },
      }).then(({ data }) => {
        console.log('Item restado 1 en Carrito', data);
        context.dispatch('obtenerCarrito');
      });
    },

    eliminarItemCarrito(context, payload) {
      axios({
        url: `https://61b0b20e3c954f001722a59e.mockapi.io/carrito/${payload}`,
        method: 'delete',
        /* headers: {
          token: localStorage.token,
        }, */
      }).then(() => {
        //context.commit('removeFavorite', payload)
        context.dispatch('obtenerCarrito');
      });
    },

    loginCheck(context) {
      if (localStorage.token) {
        context.commit('loggedIn');
      } else {
        context.commit('loggedOut');
      }
    },
    checkout(context, payload) {
      console.log(payload, `here`);
      axios({
        url: 'http://localhost:3000/cart/checkout',
        method: 'put',
        headers: {
          token: localStorage.token,
        },
      }).then(({ data }) => {
        console.log(data, `here in store`);

        context.dispatch('fetchCart');
      });
    },
    logout(context) {
      context.commit('LOGOUT');
    },
  },
});
