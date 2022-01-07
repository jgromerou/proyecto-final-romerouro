import router from '../../router';
import axios from 'axios';
export default {
  state: {
    isLogin: false,
    usuario: [],
  },
  mutations: {
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
      localStorage.setItem('Usuario', JSON.stringify(payload));
      localStorage.setItem('token', payload.token);
      localStorage.setItem('Email', payload.email);
      commit('LOGIN');
    },
    login(context, payload) {
      console.log(payload, `login de usuario actions`);
      /* axios({
        url: 'http://localhost:3000/login',
        method: 'post',
        data: payload,
      }) */
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
    logout({ commit }) {
      commit('SET_USUARIO', null);
      commit('LOGOUT');
    },
  },
  getters: {
    isLogin: (state) => state.isLogin,
    usuario: (state) => state.usuario,
  },
};
