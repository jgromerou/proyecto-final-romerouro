import router from '../../router';
import axios from 'axios';
export default {
  state: {
    carts: [],
  },
  mutations: {
    OBTENER_CARRITO(state, payload) {
      state.carts = payload;
      console.log(this.state.carts, `state carrito mutation`);
      //router.push({ name: 'Cart'})
    },

    /*  updateCart(state, payload) {
            state.carts.push(payload);
          }, */
  },
  actions: {
    obtenerCarrito(context) {
      axios({
        url: `https://61e45b6b1a976f00176ee447.mockapi.io/carrito`,
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
        url: `https://61e45b6b1a976f00176ee447.mockapi.io/carrito`,
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
        url: `https://61e45b6b1a976f00176ee447.mockapi.io/carrito/${payload.nId}`,
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
        url: `https://61e45b6b1a976f00176ee447.mockapi.io/carrito/${payload.nId}`,
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
        url: `https://61e45b6b1a976f00176ee447.mockapi.io/carrito/${payload}`,
        method: 'delete',
        /* headers: {
                token: localStorage.token,
              }, */
      }).then(() => {
        //context.commit('removeFavorite', payload)
        context.dispatch('obtenerCarrito');
      });
    },

    /*  checkout(context, payload) {
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
          }, */
  },
};
