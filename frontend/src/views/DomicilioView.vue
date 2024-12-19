<template>
  
  <div class="container">
    <AppNav />
    <br>
    <br>

    <h2>Formulario de Domicilio</h2>
    <form @submit.prevent="guardarDomicilio">
      <div class="form-group">
        <label for="fecha">Fecha</label>
        <input type="date" id="fecha" class="form-control" v-model="domicilio.fecha" required />
      </div>

      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input type="text" id="nombre" class="form-control" v-model="domicilio.nombre" required />
      </div>

      <div class="form-group">
        <label for="direccion">Dirección</label>
        <input type="text" id="direccion" class="form-control" v-model="domicilio.direccion" required />
      </div>

      <div class="form-group">
        <label for="telefono">Teléfono</label>
        <input type="text" id="telefono" class="form-control" v-model="domicilio.telefono" required />
      </div>

      <div class="form-group">
        <label for="estadoPago">Estado de Pago</label>
        <select id="estadoPago" class="form-control" v-model="domicilio.estadoPago" required>
          <option value="Pendiente">Pendiente</option>
          <option value="Pagado">Pagado</option>
        </select>
      </div>

      <div class="form-group">
        <label for="productos">Producto</label>
        <div id="productosBotones" class="mb-3">
          <h4 class="text-info">Selecciona un producto:</h4>
          <button
            v-for="(prod, index) in productos"
            :key="index"
            class="btn btn-success m-2"
            @click.prevent="seleccionarProducto(prod.nombre, prod.precio)"
          >
            {{ prod.nombre }} - ${{ prod.precio }}
          </button>
        </div>
      </div>

      <div v-if="productosSeleccionados.length > 0" class="mb-3">
        <h4 class="text-info">Productos Seleccionados:</h4>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(producto, index) in productosSeleccionados" :key="index">
              <td>{{ producto.nombre }}</td>
              <td>${{ producto.precio }}</td>
              <td>
                <input
                  type="number"
                  class="form-control"
                  v-model.number="producto.cantidad"
                  min="1"
                  @input="actualizarTotal(index)"
                />
              </td>
              <td>${{ producto.precio * producto.cantidad }}</td>
            </tr>
          </tbody>
        </table>
      </div>
         <center>
          <!-- Previsualizador de la suma total -->
      <div class="card mt-3" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Suma Total</h5>
          <p class="card-text">Total: ${{ sumaTotal }}</p>
        </div>
      </div>
         </center>
      

      <button type="submit" class="btn btn-primary" :disabled="botonDeshabilitado">
        Guardar Domicilio
      </button>
    </form>
    <br>
    <br>
  </div>
</template>

<script>
import AppNav from '@/components/AppNav.vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'; // Importando SweetAlert2
import axios from 'axios';

export default {
  name: 'DomicilioView', // Esta línea debe estar dentro del objeto `export default`
  components: {
    AppNav // Asegúrate de que el nombre del componente coincida con el archivo
  },
  data() {
    return {
      domicilio: {
        fecha: '',
        nombre: '',
        direccion: '',
        telefono: '',
        estadoPago: 'Pendiente',
      },
      productos: [
        { nombre: 'Avena', precio: 1000 },
        { nombre: 'Empanada de Pollo', precio: 1500 },
        { nombre: 'Empanada de Jamón y Queso', precio: 1500 },
        { nombre: 'Empanada de Queso', precio: 1500 },
        { nombre: 'Empanada Hawaiana', precio: 1500 },
        { nombre: 'Combo 3 Empanadas y 1 Avena', precio: 5000 },
        { nombre: 'Combo 5 Empanadas y 1 Avena', precio: 8000 },
      ],
      productosSeleccionados: [],
      botonDeshabilitado: false,
    };
  },
  computed: {
    sumaTotal() {
      return this.productosSeleccionados.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
    }
  },
  methods: {
    seleccionarProducto(nombre, precio) {
      const productoExistente = this.productosSeleccionados.find(prod => prod.nombre === nombre);
      if (!productoExistente) {
        this.productosSeleccionados.push({ nombre, precio, cantidad: 1 });
      } else {
        productoExistente.cantidad++;
      }
    },
    actualizarTotal(index) {
      const producto = this.productosSeleccionados[index];
      producto.total = producto.precio * producto.cantidad;
    },
    guardarDomicilio() {
      this.botonDeshabilitado = true;

      if (!this.domicilio.fecha || !this.domicilio.nombre || !this.domicilio.direccion || !this.domicilio.telefono || this.productosSeleccionados.length === 0) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Por favor, complete todos los campos.',
        });
        this.botonDeshabilitado = false;
        return;
      }

      try {
        const productosNombres = this.productosSeleccionados.map(prod => prod.nombre).join(' + ');
        const productosPrecio = this.productosSeleccionados.reduce((total, prod) => total + (prod.precio * prod.cantidad), 0).toString();
        const productosCantidad = this.productosSeleccionados.reduce((total, prod) => total + prod.cantidad, 0).toString();

        axios.post('/domicilios', {
          nombre: this.domicilio.nombre,
          direccion: this.domicilio.direccion,
          telefono: this.domicilio.telefono,
          fecha: this.domicilio.fecha,
          estadoPago: this.domicilio.estadoPago,
          producto: productosNombres,
          precio: productosPrecio,
          cantidad: productosCantidad,
        }).then((response) => {
          console.log('Domicilio guardado:', response.data);
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Domicilio guardado correctamente',
          });
          this.domicilio = { fecha: '', nombre: '', direccion: '', telefono: '', estadoPago: 'Pendiente' };
          this.productosSeleccionados = [];
        });
      } catch (error) {
        console.error('Error al guardar el domicilio:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al guardar el domicilio.',
        });
      } finally {
        this.botonDeshabilitado = false;
      }
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.btn {
  margin-top: 15px;
}

table th, table td {
  text-align: center;
}

table td input {
  width: 60px;
}
</style>
