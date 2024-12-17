<template>
  <div class="container">
    <h2>Formulario de Domicilio</h2>
    <form @submit.prevent="guardarDomicilio">
      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input type="text" id="nombre" class="form-control" v-model="domicilio.nombre" required />
      </div>

      <div class="form-group">
        <label for="clienteTipo">Tipo de Cliente</label>
        <select id="clienteTipo" class="form-control" v-model="clienteTipo">
          <option value="persona">Persona</option>
          <option value="distribuidor">Distribuidor</option>
        </select>
      </div>

      <div class="form-group">
        <h4>Selecciona Productos</h4>
        <button class="btn btn-success m-2" @click.prevent="seleccionarProducto('Avena', 1000)">Avena - $1,000</button>
        <button class="btn btn-success m-2" @click.prevent="seleccionarProducto('Empanada de Pollo', precioEmpanada('Empanada de Pollo'))">Empanada de Pollo - ${{ precioEmpanada('Empanada de Pollo') }}</button>
        <button class="btn btn-success m-2" @click.prevent="seleccionarProducto('Empanada de Jamón y Queso', precioEmpanada('Empanada de Jamón y Queso'))">Empanada de Jamón y Queso - ${{ precioEmpanada('Empanada de Jamón y Queso') }}</button>
        <button class="btn btn-success m-2" @click.prevent="seleccionarProducto('Empanada de Queso', precioEmpanada('Empanada de Queso'))">Empanada de Queso - ${{ precioEmpanada('Empanada de Queso') }}</button>
        <button class="btn btn-success m-2" @click.prevent="seleccionarProducto('Empanada Hawaiana', precioEmpanada('Empanada Hawaiana'))">Empanada Hawaiana - ${{ precioEmpanada('Empanada Hawaiana') }}</button>
        <button class="btn btn-success m-2" @click.prevent="seleccionarProducto('Combo 3 Empanadas y 1 Avena', 5000)">Combo 3 Empanadas y 1 Avena - $5,000</button>
        <button class="btn btn-success m-2" @click.prevent="seleccionarProducto('Combo 5 Empanadas y 1 Avena', 8000)">Combo 5 Empanadas y 1 Avena - $8,000</button>
      </div>

      <div class="form-group">
        <h4>Productos Seleccionados</h4>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(producto, index) in domicilio.productos" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ producto.nombre }}</td>
              <td>{{ producto.cantidad }}</td>
              <td>
                <button class="btn btn-danger btn-sm" @click="eliminarProducto(index)">Eliminar</button>
              </td>
            </tr>
          </tbody>
          <tfoot v-if="domicilio.productos.length > 0">
            <tr>
              <td colspan="4">
                <h2><strong>Total:</strong> ${{ totalProductos }}</h2>
              </td>
            </tr>
          </tfoot>
        </table>
        <p v-if="domicilio.productos.length === 0">No hay productos seleccionados.</p>
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
        <select id="estadoPago" class="form-control" v-model="domicilio.estadoPago">
          <option value="Pendiente">Pendiente</option>
          <option value="Pagado">Pagado</option>
        </select>
      </div>

      <br>
      <button type="submit" class="btn btn-primary" :disabled="botonDeshabilitado">
        Guardar Domicilio
      </button>

      <br><br>
    </form>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      domicilio: {
        nombre: '',
        direccion: '',
        telefono: '',
        productos: [],
        estadoPago: 'Pendiente', // Valor inicial para estado de pago
        id: '', // Se añadirá el domicilioId
      },
      clienteTipo: 'persona', // 'persona' o 'distribuidor'
      botonDeshabilitado: false,
    };
  },
  computed: {
    totalProductos() {
      return this.domicilio.productos.reduce(
        (total, producto) => total + producto.cantidad * producto.precio,
        0
      );
    },
  },
  methods: {
    precioEmpanada(nombre) {
      if (this.clienteTipo === 'distribuidor' && 
          (nombre === 'Empanada de Pollo' || 
           nombre === 'Empanada de Queso' || 
           nombre === 'Empanada Hawaiana' || 
           nombre === 'Empanada de Jamón y Queso')) {
        return 900;
      }
      return 1500; // Precio estándar para "persona"
    },
    seleccionarProducto(nombre, precio) {
      const productoExistente = this.domicilio.productos.find((p) => p.nombre === nombre);

      if (productoExistente) {
        productoExistente.cantidad++;
      } else {
        this.domicilio.productos.push({ nombre, precio, cantidad: 1 });
      }
    },
    eliminarProducto(index) {
      this.domicilio.productos.splice(index, 1);
    },
    // Método para generar domicilioId
    generarDomicilioId() {
      return `DOM-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    },
    async guardarDomicilio() {
      this.botonDeshabilitado = true;

      if (
        !this.domicilio.nombre ||
        !this.domicilio.direccion ||
        !this.domicilio.telefono ||
        this.domicilio.productos.length === 0
      ) {
        Swal.fire({
          icon: 'error',
          title: 'Campos incompletos',
          text: 'Por favor, completa todos los campos y selecciona al menos un producto para continuar.',
        });
        this.botonDeshabilitado = false;
        return;
      }

      // Generar un ID único para el domicilio
      this.domicilio.id = this.generarDomicilioId();
      console.log(this.domicilio);
      
      try {
        await fetch(
          'https://script.google.com/macros/s/AKfycbz3kUEpzwJsT9AQX7VUdo7lxsxPn5bwmtso7GR0w2cPUlb9BjTCBhaVBPpdKdCzqQUI/exec',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ domicilio: this.domicilio }),
            mode: 'no-cors',
          }
        );

        Swal.fire({
          icon: 'success',
          title: 'Domicilio Guardado',
          text: 'El domicilio y los productos han sido guardados exitosamente.',
        }).then(() => {
          this.limpiarCampos();
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error al Enviar',
          text: 'Hubo un error al enviar los datos. Intenta nuevamente.',
        });
      }
      this.botonDeshabilitado = false;
    },
    limpiarCampos() {
      this.domicilio.nombre = '';
      this.domicilio.direccion = '';
      this.domicilio.telefono = '';
      this.domicilio.productos = [];
      this.domicilio.estadoPago = 'Pendiente'; // Restablecer estado de pago al valor inicial
      this.domicilio.id = ''; // Limpiar el domicilioId
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 20px;
}
h2 {
  margin-bottom: 20px;
}
.table {
  margin-top: 10px;
}
</style>
