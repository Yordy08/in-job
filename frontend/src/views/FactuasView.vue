<template>
  <div class="container">
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
                  @input="actualizarTotal(index)"
                />
              </td>
              <td>${{ producto.precio * producto.cantidad }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <button type="submit" class="btn btn-primary" :disabled="botonDeshabilitado">
        Guardar Venta
      </button>
    </form>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default {
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
      // Verifica si el producto ya está seleccionado, si no, lo agrega
      const productoExistente = this.productosSeleccionados.find(prod => prod.nombre === nombre);
      if (!productoExistente) {
        this.productosSeleccionados.push({ nombre, precio, cantidad: 1 });
      } else {
        // Si ya está, solo se puede incrementar la cantidad
        productoExistente.cantidad++;
      }
    },
    actualizarTotal(index) {
      // Actualiza el total cuando se cambia la cantidad de un producto
      const producto = this.productosSeleccionados[index];
      producto.total = producto.precio * producto.cantidad;
    },
    async guardarProductos() {
      this.botonDeshabilitado = true;

      // Verificamos si todos los campos están completos
      if (!this.venta.fecha || this.productosSeleccionados.length === 0) {
        alert('Por favor, complete todos los campos.');
        this.botonDeshabilitado = false;
        return;
      }

      try {
        // Crear los datos a enviar
        const productosNombres = this.productosSeleccionados.map(prod => prod.nombre).join(' + ');
        const productosPrecio = this.productosSeleccionados.reduce((total, prod) => total + (prod.precio * prod.cantidad), 0);
        const productosCantidad = this.productosSeleccionados.reduce((total, prod) => total + prod.cantidad, 0);

        // Llamada al backend con axios
        const response = await axios.post('http://localhost:5000/facturas', {
          fecha: this.venta.fecha,
          producto: productosNombres,
          precio: productosPrecio,
          cantidad: productosCantidad,
        });

        console.log('Venta guardada:', response.data);
        alert('Venta guardada correctamente');
        
        // Limpiar el formulario solo si se guarda correctamente
        this.productosSeleccionados = [];
        this.venta.fecha = '';
      } catch (error) {
        console.error('Error al guardar la venta:', error);
        alert('Hubo un error al guardar la venta.');
      } finally {
        this.botonDeshabilitado = false;
      }
    },
  },
};
</script>

<style scoped>
/* Estilos CSS */
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
