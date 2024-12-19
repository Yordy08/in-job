<template>
  
  <div class="container">
    <AppNav /> <!-- Usa el componente AppNav aquí -->
    <br>
    <br>
    <br>
    <h2>Formulario Dinámico de Productos</h2>
    <form @submit.prevent="guardarProductos">
      <div class="form-group">
        <label for="fecha">Fecha</label>
        <input type="date" id="fecha" class="form-control" v-model="venta.fecha" required />
      </div>

      <div class="form-group">
        <label for="producto">Producto</label>
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

      <!-- Tabla de Productos Seleccionados -->
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
                  @input="actualizarTotal()"
                />
              </td>
              <td>${{ producto.precio * producto.cantidad }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Previsualizador de Total -->
        <div class="mt-3">
          <h5>Total: ${{ calcularTotal() }}</h5>
        </div>
      </div>

      <button type="submit" class="btn btn-primary" :disabled="botonDeshabilitado">
        Guardar Venta
      </button>
    </form>
  </div>
</template>

<script>
import AppNav from '@/components/AppNav.vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import axios from 'axios';

export default {
  name: 'FactuasView', // Esta línea debe estar dentro del objeto `export default`
  components: {
    AppNav // Asegúrate de que el nombre del componente coincida con el archivo
  },
  data() {
    return {
      venta: {
        fecha: '',
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
  methods: {
    seleccionarProducto(nombre, precio) {
      const productoExistente = this.productosSeleccionados.find(prod => prod.nombre === nombre);
      if (!productoExistente) {
        this.productosSeleccionados.push({ nombre, precio, cantidad: 1 });
      } else {
        productoExistente.cantidad++;
      }
    },
    actualizarTotal() {
      // Actualiza automáticamente los totales
      this.productosSeleccionados.forEach(
        prod => (prod.total = prod.precio * prod.cantidad)
      );
    },
    calcularTotal() {
      // Calcula el total acumulado
      return this.productosSeleccionados.reduce(
        (total, prod) => total + prod.precio * prod.cantidad,
        0
      );
    },
    async guardarProductos() {
      this.botonDeshabilitado = true;

      if (!this.venta.fecha || this.productosSeleccionados.length === 0) {
        Swal.fire('Error', 'Por favor, complete todos los campos.', 'error');
        this.botonDeshabilitado = false;
        return;
      }

      try {
        const productosNombres = this.productosSeleccionados
          .map(prod => prod.nombre)
          .join(' + ');
        const productosPrecio = this.calcularTotal();
        const productosCantidad = this.productosSeleccionados.reduce(
          (total, prod) => total + prod.cantidad,
          0
        );

        await axios.post('/facturas', {
          fecha: this.venta.fecha,
          producto: productosNombres,
          precio: productosPrecio,
          cantidad: productosCantidad,
        });

        const horaActual = new Date().toLocaleTimeString();
        Swal.fire(
          'Venta Guardada',
          `La venta fue guardada con éxito.\nTotal: $${productosPrecio}\nHora: ${horaActual}`,
          'success'
        );

        this.productosSeleccionados = [];
        this.venta.fecha = '';
      } catch (error) {
        Swal.fire('Error', 'Hubo un error al guardar la venta.', 'error');
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
