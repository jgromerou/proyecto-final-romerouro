<template>
  <v-container>
    <Navbar />
    <div>
      <v-data-table
        :headers="headers"
        :items="products"
        :search="search"
        sort-by="nombre"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Productos</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              class="text-xs-center"
              v-model="search"
              append-icon="search"
              label="Búsqueda"
              single-line
              hide-details
            >
            </v-text-field>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="#0d47a1"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Nuevo
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="id" label="Id"></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="6">
                        <v-select v-model="nombre" label="Nombre"></v-select>
                      </v-col>

                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          type="number"
                          v-model="precio"
                          label="Precio"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          type="number"
                          v-model="cantidad"
                          label="Cantidad"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="12" md="12" v-show="valida">
                        <div
                          class="red--text"
                          v-for="v in validaMensaje"
                          :key="v"
                          v-text="v"
                        ></div>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancelar
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="guardarItemActualizado"
                  >
                    Guardar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Estás seguro/a que quieres eliminar el item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancelar</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >Eliminar</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <template>
            <v-icon small @click="eliminarItem(item)"> mdi-delete </v-icon>
          </template>
        </template>

        <template v-slot:no-data>
          <v-btn color="#0d47a1" @click="listar()"> Resetear </v-btn>
        </template>
      </v-data-table>
    </div>
  </v-container>
</template>

<script>
import Navbar from '../components/Navbar.vue';

export default {
  components: {
    Navbar,
  },
  data: () => ({
    dialog: false,
    search: '',
    productos: [],
    dialogDelete: false,
    headers: [
      { text: 'Actions', value: 'actions', sortable: false },
      { text: 'Código', value: 'id', sortable: false },
      { text: 'Nombre', value: 'nombre', sortable: true },
      { text: 'Precio', value: 'precio', sortable: false },
      { text: 'Cantidad', value: 'cantidad', sortable: false },
    ],
    id: '',
    nombre: '',
    stock: 0,
    precio: 0,
    cantidad: 0,
    valida: 0,
    validaMensaje: [],
    editedIndex: -1,
    adModal: 0,
    adAccion: 0,
    adNombre: '',
    adId: '',
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nuevo producto' : 'Editar producto';
    },
    products() {
      return this.$store.state.products;
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  mounted() {
    this.$store.dispatch('obtenerProductos');
  },

  methods: {
    editItem(item) {
      this.idarticulo = item.idarticulo;
      this.categoria = item.idcategoria;
      this.id = item.id;
      this.nombre = item.nombre;
      this.descripcion = item.descripcion;
      this.stock = item.stock;
      this.precio_venta = item.precio_venta;
      this.dialog = true;
      this.editedIndex = 1;
    },

    eliminarItem(item) {
      this.dialogDelete = true;
      console.log(item, `abrir dialog de eliminar item`);
    },

    limpiar() {
      this.idarticulo = '';
      this.idcategoria = '';
      this.nombre = '';
      this.cantidad = 0;
      this.precio = 0;
      this.valida = 0;
      this.validaMensaje = [];
      this.editedIndex = -1;
    },
    validar() {
      this.valida = 0;
      this.validaMensaje = [];
      if (!this.categoria) {
        this.validaMensaje.push('Seleccione una categoria');
      }
      /* if (this.codigo.length < 1 || this.codigo.length > 64) {
        this.validaMensaje.push('El código no debe tener más de 64 caracteres');
        this.valida = 1;
        return this.valida;
      } */
      if (this.nombre.length < 1 || this.nombre.length > 50) {
        this.validaMensaje.push(
          'El nombre del articulo debe tener entre 1 y 50 caracteres'
        );
        this.valida = 1;
        return this.valida;
      }
      if (this.descripcion.length < 1 || this.descripcion.length > 255) {
        this.validaMensaje.push(
          'La descripción del articulo no debe tener más 255 caracteres'
        );
      }
      if (this.stock < 0) {
        this.validaMensaje.push('Ingrese un stock válido');
        this.valida = 1;
        return this.valida;
      }
      if (this.precio_venta < 0) {
        this.validaMensaje.push('Ingrese un precio de venta válido');
        this.valida = 1;
        return this.valida;
      }
      if (this.validaMensaje.length) {
        this.valida = 1;
      }
      return this.valida;
    },

    activarDesactivarMostrar(accion, item) {
      this.adModal = 1;
      this.adNombre = item.nombre;
      this.adId = item.idarticulo;
      if (accion === 1) {
        this.adAccion = 1;
      } else if (accion == 2) {
        this.adAccion = 2;
      } else {
        this.adModal = 0;
      }
    },

    activarDesactivarCerrar() {
      this.adModal = 0;
    },

    guardarItemActualizado() {
      //this.categorias.splice(this.editedIndex, 1);
      console.log('item actualizado');
      this.close();
    },

    deleteItemConfirm() {
      //this.categorias.splice(this.editedIndex, 1);
      console.log('item eliminado');
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      /* this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }); */
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
};
</script>
