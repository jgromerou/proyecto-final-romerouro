<template>
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
      <template v-if="esAdministrador || esAlmacenero">
        <v-list-group>
          <v-list-title slot="activator">
            <v-list-content>
              <v-list-item-title> Almacén </v-list-item-title>
            </v-list-content>
          </v-list-title>
          <v-list-item :to="{ name: 'categoria' }">
            <v-list-item-action>
              <v-icon>table_chart</v-icon>
            </v-list-item-action>
            <v-list-content>
              <v-list-item-title> Categorias </v-list-item-title>
            </v-list-content>
          </v-list-item>
          <v-list-item :to="{ name: 'articulo' }">
            <v-list-item-action>
              <v-icon>table_chart</v-icon>
            </v-list-item-action>
            <v-list-content>
              <v-list-item-title> Articulos </v-list-item-title>
            </v-list-content>
          </v-list-item>
        </v-list-group>
      </template>
      <template v-if="esAdministrador || esAlmacenero">
        <v-list-group>
          <v-list-title slot="activator">
            <v-list-content>
              <v-list-item-title> Compras </v-list-item-title>
            </v-list-content>
          </v-list-title>
          <v-list-item :to="{ name: 'ingreso' }">
            <v-list-item-action>
              <v-icon>table_chart</v-icon>
            </v-list-item-action>
            <v-list-content>
              <v-list-item-title> Ingresos </v-list-item-title>
            </v-list-content>
          </v-list-item>
          <v-list-item :to="{ name: 'proveedor' }">
            <v-list-item-action>
              <v-icon>table_chart</v-icon>
            </v-list-item-action>
            <v-list-content>
              <v-list-item-title> Proveedores </v-list-item-title>
            </v-list-content>
          </v-list-item>
        </v-list-group>
      </template>
      <template v-if="esAdministrador || esVendedor">
        <v-list-group>
          <v-list-title slot="activator">
            <v-list-content>
              <v-list-item-title> Ventas </v-list-item-title>
            </v-list-content>
          </v-list-title>
          <v-list-item :to="{ name: 'venta' }">
            <v-list-item-action>
              <v-icon>table_chart</v-icon>
            </v-list-item-action>
            <v-list-content>
              <v-list-item-title> Ventas </v-list-item-title>
            </v-list-content>
          </v-list-item>
          <v-list-item :to="{ name: 'cliente' }">
            <v-list-item-action>
              <v-icon>table_chart</v-icon>
            </v-list-item-action>
            <v-list-content>
              <v-list-item-title> Clientes </v-list-item-title>
            </v-list-content>
          </v-list-item>
        </v-list-group>
      </template>
      <template v-if="esAdministrador">
        <v-list-group>
          <v-list-title slot="activator">
            <v-list-content>
              <v-list-item-title> Accesos </v-list-item-title>
            </v-list-content>
          </v-list-title>
          <v-list-item :to="{ name: 'usuario' }">
            <v-list-item-action>
              <v-icon>table_chart</v-icon>
            </v-list-item-action>
            <v-list-content>
              <v-list-item-title> Usuarios </v-list-item-title>
            </v-list-content>
          </v-list-item>
        </v-list-group>
      </template>
      <template v-if="esAdministrador || esAlmacenero || esVendedor">
        <v-list-group>
          <v-list-title slot="activator">
            <v-list-content>
              <v-list-item-title> Consultas </v-list-item-title>
            </v-list-content>
          </v-list-title>
          <v-list-item :to="{ name: 'consultaingreso' }">
            <v-list-item-action>
              <v-icon>table_chart</v-icon>
            </v-list-item-action>
            <v-list-content>
              <v-list-item-title> Consultas Compras </v-list-item-title>
            </v-list-content>
          </v-list-item>
          <v-list-item :to="{ name: 'consultaventa' }">
            <v-list-item-action>
              <v-icon>table_chart</v-icon>
            </v-list-item-action>
            <v-list-content>
              <v-list-item-title> Consultas Ventas </v-list-item-title>
            </v-list-content>
          </v-list-item>
        </v-list-group>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Drawer',

  data: () => ({
    drawer: true,
  }),
  computed: {
    logueado() {
      return this.$store.state.usuario;
    },
    esAdministrador() {
      return (
        this.$store.state.usuario &&
        this.$store.state.usuario.rol === 'Administrador'
      );
    },
    esAlmacenero() {
      return (
        this.$store.state.usuario &&
        this.$store.state.usuario.rol === 'Almacenero'
      );
    },
    esVendedor() {
      return (
        this.$store.state.usuario &&
        this.$store.state.usuario.rol === 'Vendedor'
      );
    },
  },
  created() {
    this.$store.dispatch('autoLogin');
  },
  methods: {
    salir() {
      this.$store.dispatch('salir');
    },
  },
};
</script>

<style lang="scss" scoped></style>
