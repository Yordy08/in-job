<template>
  <div class="container">
    <AppNav />
    <br>
    <br>
    <!-- Previsualizador de estado de pagos -->
    <div class="row">
      <div class="col-12 mb-4">
        <div class="alert alert-info">
          <p><strong>Total de Pagados: </strong>{{ totalPagado }}</p>
          <p><strong>Total de Pendientes: </strong>{{ totalPendiente }}</p>
        </div>
      </div>
    </div>

    <div class="row">
      <!-- Iteramos sobre los elementos y los mostramos en un card responsivo -->
      <div
        class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
        v-for="item in items"
        :key="item.id"
        :class="{
          'bg-danger': item.estadoPago === 'Pendiente',
          'bg-success': item.estadoPago !== 'Pendiente'
        }"
      >
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
            <form @submit.prevent="confirmUpdate">
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
                <select v-model="currentItem.estadoPago" class="form-select" id="estadoPago" required>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Pagado">Pagado</option>
                </select>
              </div>

              <button type="submit" class="btn btn-success">Guardar cambios</button>
            </form>
            <!-- Botón Eliminar -->
<!--             <button @click="deleteItem(currentItem._id)" class="btn btn-danger mt-3">Eliminar</button>
 -->          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'; // Estilos CSS de Bootstrap
import * as bootstrap from 'bootstrap'; // Importar el JavaScript de Bootstrap
import axios from 'axios';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import AppNav from '@/components/AppNav.vue'

export default {
  name: 'ListadoDomicilio', // Esta línea debe estar dentro del objeto `export default`
  components: {
    AppNav // Asegúrate de que el nombre del componente coincida con el archivo
  },
  data() {
    return {
      items: [],
      currentItem: {} // Almacenará el ítem actual que se edita en el modal
    };
  },
  computed: {
    // Computada para contar los elementos con estado 'Pendiente'
    totalPendiente() {
      return this.items.filter(item => item.estadoPago === 'Pendiente').length;
    },
    // Computada para contar los elementos con estado 'Pagado'
    totalPagado() {
      return this.items.filter(item => item.estadoPago === 'Pagado').length;
    }
  },
  created() {
    this.fetchItems(); // Llamamos a la función para obtener los domicilios
  },
  methods: {
    async fetchItems() {
      try {
        const response = await axios.get('/domicilios'); // Reemplaza con la URL de tu API
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
    async confirmUpdate() {
      // Usando SweetAlert2 para confirmar si desea guardar los cambios
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Deseas guardar los cambios?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, guardar',
        cancelButtonText: 'No, cancelar'
      });

      if (result.isConfirmed) {
        this.updateItem();
      } else {
        console.log("Actualización cancelada por el usuario.");
      }
    },
    async updateItem() {
      try {
        // Llamar a la API para actualizar el domicilio
        const response = await axios.put(`/domicilios/${this.currentItem._id}`, this.currentItem);
        this.fetchItems(); // Llamamos a la función para obtener los domicilios

        console.log(response.data);

        // Cerrar el modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('crudModal'));
        modal.hide();

        // Mostrar confirmación de éxito
        Swal.fire('¡Actualizado!', 'El domicilio se ha actualizado correctamente.', 'success');
      } catch (error) {
        console.error('Error al actualizar los datos', error);
      }
    },
    async deleteItem(id) {
      try {
        // Usando SweetAlert2 para confirmar si desea eliminar
        const result = await Swal.fire({
          title: '¿Estás seguro?',
          text: "¿Deseas eliminar este domicilio?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'No, cancelar'
        });

        if (result.isConfirmed) {
          // Si el usuario confirma, llamar a la API para eliminar el domicilio
          await axios.delete(`/domicilios/${id}`);

          // Actualizar la lista de domicilios
          this.fetchItems();

          // Cerrar el modal
          const modal = bootstrap.Modal.getInstance(document.getElementById('crudModal'));
          modal.hide();

          // Mostrar confirmación de éxito
          Swal.fire('¡Eliminado!', 'El domicilio ha sido eliminado correctamente.', 'success');
        } else {
          console.log("Eliminación cancelada por el usuario.");
        }
      } catch (error) {
        console.error("Error al eliminar el domicilio", error);
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

/* Fondo rojo tenue para 'Pendiente' */
.bg-danger {
  background-color: rgb(235, 118, 98); /* Rojo tenue */
}

/* Fondo verde tenue para cualquier otro estado de pago */
.bg-success {
  background-color: rgb(34, 139, 34); /* Verde tenue */
}
</style>
