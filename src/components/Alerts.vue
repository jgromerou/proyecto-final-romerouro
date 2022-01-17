<template>
  <div>
    <!--      <transition name="fade" mode="out-in">
      <v-alert type="success" class="custom-alert" v-show="cartAdd" key="1">
        Item agregado al carrito!
      </v-alert>
    </transition> 
    <transition name="fade" mode="out-in">
      <v-alert type="success" class="custom-alert" v-show="userUpdate" key="1">
        Usuario actualizado satisfactoramente!
      </v-alert>
    </transition>
    <transition name="fade" mode="out-in">
      <v-alert
        type="error"
        class="custom-alert"
        v-show="userUpdateError"
        key="1"
      >
        No es posible actualizar los datos.
      </v-alert>
    </transition> -->
    <transition name="fade" mode="out-in">
      <v-alert
        type="warning"
        class="custom-alert"
        v-show="alert_warning"
        key="1"
      >
        No es posible loguearse. Verifique usuario y contraseña.
      </v-alert>
    </transition>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'Alerts',
  computed: {
    ...mapState({
      alert_warning: (state) => state.alert_warning,
    }),
    ...mapGetters(['alert_warning']),
  },
};
</script>

<style lang="scss">
.custom-alert {
  position: fixed !important;
  z-index: 99999;
  top: 92vh;
  left: 50%;
  transform: translateX(-50%);
  @media (max-width: 600px) {
    top: 80vh;
  }
}
</style>
