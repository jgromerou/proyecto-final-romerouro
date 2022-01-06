import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router';
import axios from 'axios';
import auth from './modules/auth';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    usuario: [],

    productos: [],
    carts: [],
  },
  mutations: {
    /* GUARDAR_ITEM_CART_LOCALSTORAGE(state) {
      localStorage.setItem('cart', JSON.stringify(state.cart));
    }, */

    LOGIN(state) {
      state.isLogin = true;
      router.push({ name: 'Home' }).catch(() => {});
    },
    SET_USUARIO(state, payload) {
      state.usuario = payload;
      console.log('usuario', payload);
    },
    REGISTER() {
      router.push({ name: 'Home' }).catch(() => {});
    },
    OBTENER_PRODUCTOS(state, payload) {
      state.productos = payload;
      console.log(this.state.productos, `state producto mutation`);
      //router.push({name: 'Home'})
    },
    OBTENER_CARRITO(state, payload) {
      state.carts = payload;
      console.log(this.state.carts, `state carrito mutation`);
      //router.push({ name: 'Cart'})
    },

    /*  updateCart(state, payload) {
      state.carts.push(payload);
    }, */
    LOGUEADO(state) {
      state.isLogin = true;
      // router.push({name: 'Home'})
    },
    NO_LOGUEADO(state) {
      state.isLogin = false;
      router.push({ name: 'Home' }).catch(() => {});
    },
    LOGOUT(state) {
      localStorage.removeItem('Usuario');
      localStorage.removeItem('token');
      localStorage.removeItem('Email');

      //localStorage.clear();
      state.isLogin = false;
      router.push({ name: 'Home' }).catch(() => {});
    },
  },
  actions: {
    guardarUsuario({ commit }, payload) {
      commit('SET_USUARIO', payload);
      console.log(payload, 'payload de usuario');
      console.log(payload.token, 'efsefes');
      localStorage.setItem('token', payload.token);
      localStorage.setItem('Email', payload.email);
      commit('LOGIN');
    },
    toCarrito() {
      router.push({ name: 'Carrito' }).catch(() => {});
      console.log('Al Carrito');
    },

    login(context, payload) {
      console.log(payload, `login de usuario actions`);
      /* axios({
        url: 'http://localhost:3000/login',
        method: 'post',
        data: payload,
      }) */

      console.log(`<<<<<`);
      console.log(payload, `login usuario`);
      localStorage.setItem('token', payload.token);
      localStorage.setItem('Email', payload.email);
      context.commit('LOGIN');
    },
    register(context, payload) {
      console.log(payload, `registro de usuario actions`);
      axios({
        url: 'https://61b0b20e3c954f001722a59e.mockapi.io/usuarios',
        method: 'post',
        data: payload,
      }).then((data) => {
        console.log(`registrado correctamente:`, data.data);

        /*   localStorage.setItem('token', payload.token);
        localStorage.setItem('Email', payload.email); */
        context.commit('REGISTER');
      });
    },
    toHome() {
      router.push({ name: 'Home' }).catch(() => {});
    },
    toLogin() {
      router.push({ name: 'Login' }).catch(() => {});
    },
    toRegister() {
      router.push({ name: 'Register' }).catch(() => {});
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
          router.push({ name: 'Home' }).catch(() => {});
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
        context.commit('LOGUEADO');
        let usuario = JSON.parse(localStorage.getItem('Usuario'));
        console.log(usuario, 'loginCheck');
        if (usuario) {
          //context.commit('setToken', usuario);
          context.commit('SET_USUARIO', usuario);
          console.log('usuario', usuario);
        }
        router.push({ name: 'Home' }).catch(() => {});
      } else {
        context.commit('NO_LOGUEADO');
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
    logout({ commit }) {
      commit('SET_USUARIO', null);
      commit('LOGOUT');
    },
  },
  getters: {
    isLogin: (state) => state.isLogin,
    productos: (state) => state.productos,
    usuario: (state) => state.usuario,
  },
  modules: {
    auth,
  },
});
