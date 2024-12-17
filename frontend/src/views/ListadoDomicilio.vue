<template>
  <div class="container">
    <div class="row">
      <!-- Iteramos sobre los elementos y los mostramos en un card responsivo -->
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" v-for="item in items" :key="item.id">
        <div class="card">
          <img v-if="item.imagen" :src="item.imagen" class="card-img-top" alt="Imagen del producto" />
          <div class="card-body">
            <h5 class="card-title">{{ item.nombre }}</h5>
            <p class="card-text">Fecha: {{ item.fecha }}</p>
            <p class="card-text">Precio: {{ item.precio }}</p>
            <p class="card-text">Cantidad: {{ item.cantidad }}</p>
            <p class="card-text">Dirección: {{ item.direccion }}</p>
            <p class="card-text">Teléfono: {{ item.telefono }}</p>
            <p class="card-text">Producto: {{ item.producto }}</p>
            <p class="card-text">Estado de Pago: {{ item.estadoPago }}</p>
            <!-- Botón para abrir el modal -->
            <button class="btn btn-primary" @click="openModal(item)">Editar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para CRUD -->
    <div class="modal fade" id="crudModal" tabindex="-1" aria-labelledby="crudModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="crudModalLabel">Editar Domicilio</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateItem">
              <div class="mb-3">
                <label for="nombre" class="form-label">Nombre</label>
                <input v-model="currentItem.nombre" type="text" class="form-control" id="nombre" required />
              </div>
              <div class="mb-3">
                <label for="precio" class="form-label">Precio</label>
                <input v-model="currentItem.precio" type="text" class="form-control" id="precio" required />
              </div>
              <div class="mb-3">
                <label for="cantidad" class="form-label">Cantidad</label>
                <input v-model="currentItem.cantidad" type="text" class="form-control" id="cantidad" required />
              </div>
              <div class="mb-3">
                <label for="direccion" class="form-label">Dirección</label>
                <input v-model="currentItem.direccion" type="text" class="form-control" id="direccion" required />
              </div>
              <div class="mb-3">
                <label for="telefono" class="form-label">Teléfono</label>
                <input v-model="currentItem.telefono" type="text" class="form-control" id="telefono" required />
              </div>
              <div class="mb-3">
                <label for="producto" class="form-label">Producto</label>
                <input v-model="currentItem.producto" type="text" class="form-control" id="producto" required />
              </div>
              <div class="mb-3">
                <label for="estadoPago" class="form-label">Estado de Pago</label>
                <input v-model="currentItem.estadoPago" type="text" class="form-control" id="estadoPago" required />
              </div>
              <button type="submit" class="btn btn-success">Guardar cambios</button>
            </form>
            <!-- Botón Eliminar -->
            <button @click="deleteItem(currentItem._id)" class="btn btn-danger mt-3">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'; // Estilos CSS de Bootstrap
import * as bootstrap from 'bootstrap'; // Importar el JavaScript de Bootstrap
import axios from 'axios';

export default {
  data() {
    return {
      items: [],
      currentItem: {} // Almacenará el ítem actual que se edita en el modal
    };
  },
  created() {
    this.fetchItems(); // Llamamos a la función para obtener los domicilios
  },
  methods: {
    async fetchItems() {
      try {
        const response = await axios.get('http://localhost:5000/domicilios'); // Reemplaza con la URL de tu API
        this.items = response.data;
      } catch (error) {
        console.error('Error al obtener los datos', error);
      }
    },
    openModal(item) {
      // Copiar los datos del item seleccionado al currentItem
      this.currentItem = { ...item };
      // Mostrar el modal con Bootstrap
      const modal = new bootstrap.Modal(document.getElementById('crudModal'));
      modal.show();
    },
    async updateItem() {
      try {
        // Llamar a la API para actualizar el domicilio

        const response = await axios.put(`http://localhost:5000/domicilios/${this.currentItem._id}`, this.currentItem);
        this.fetchItems(); // Llamamos a la función para obtener los domicilios

        console.log(response.data);



        // Cerrar el modal
        const modal = new bootstrap.Modal(document.getElementById('crudModal'));
        modal.hide();
      } catch (error) {
        console.error('Error al actualizar los datos', error);
      }
    },
    async deleteItem(id) {
      try {
        // Llamamos a la API para eliminar el domicilio
        await axios.delete(`http://localhost:5000/domicilios/${id}`);

        // Eliminar el item de la lista en la UI
        //this.items = this.items.filter(item => item.id !== id);
        this.fetchItems(); // Llamamos a la función para obtener los domicilios

        // Cerrar el modal
        const modal = new bootstrap.Modal(document.getElementById('crudModal'));
        modal.hide();
      } catch (error) {
        console.error('Error al eliminar el domicilio', error);
      }
    }
  }
};
</script>

<style scoped>
/* Estilos adicionales para el card */
.card {
  height: 100%;
}

.card-img-top {
  height: 200px;
  object-fit: cover;
}
</style>
