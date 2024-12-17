<template>
    <div class="container mt-5">
      <h1 class="text-center mb-4 text-primary">Facturación</h1>
  
      <!-- Botones para Selección de Producto -->
      <h4 class="text-info">Selecciona un producto:</h4>
      <div id="productosBotones" class="mb-3">
        <button class="btn btn-success m-2" @click="seleccionarProducto('Avena', 1000)">Avena - $1,000</button>
        <button class="btn btn-success m-2" @click="seleccionarProducto('Empanada de Pollo', 1500)">Empanada de Pollo - $1,500</button>
        <button class="btn btn-success m-2" @click="seleccionarProducto('Empanada de Jamón y Queso', 1500)">Empanada de Jamón y Queso - $1,500</button>
        <button class="btn btn-success m-2" @click="seleccionarProducto('Empanada de Queso', 1500)">Empanada de Queso - $1,500</button>
        <button class="btn btn-success m-2" @click="seleccionarProducto('Empanada Hawaiana', 1500)">Empanada Hawaiana - $1,500</button>
        <button class="btn btn-success m-2" @click="seleccionarProducto('Combo 3 Empanadas y 1 Avena', 5000)">Combo 3 Empanadas y 1 Avena - $5,000</button>
        <button class="btn btn-success m-2" @click="seleccionarProducto('Combo 5 Empanadas y 1 Avena', 8000)">Combo 5 Empanadas y 1 Avena - $8,000</button>
      </div>
  
      <!-- Previsualización de la Compra -->
      <h3 class="mt-4 text-success">Previsualización de Compra:</h3>
      <div class="table-responsive">
        <table id="productosTabla" class="table table-bordered table-striped">
          <thead class="thead-dark">
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Subtotal</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(producto, index) in productosSeleccionados" :key="index">
              <td>{{ producto.nombre }}</td>
              <td>{{ producto.cantidad }}</td>
              <td>${{ producto.precio }}</td>
              <td>${{ producto.subtotal }}</td>
              <td><button class="btn btn-danger" @click="eliminarProducto(index, producto.subtotal)">Eliminar</button></td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Total de la compra -->
      <h4>Total: <span class="text-danger">${{ totalPrecio }}</span></h4>
  
      <!-- Monto recibido y cambio -->
      <div class="mb-3">
        <label for="montoRecibido" class="form-label">Monto Recibido</label>
        <input type="number" v-model.number="montoRecibido" class="form-control" min="0" @change="calcularCambio">
      </div>
  
      
  
      <!-- Botón para guardar la factura -->
      <button 
      class="btn btn-success mt-3 w-100" 
      @click="guardarFactura" 
      :disabled="botonDeshabilitado">
      Guardar Factura
    </button>
    <br>
    <br>
    <br>

    </div>
  </template>
  <script>
  import 'bootstrap/dist/css/bootstrap.min.css';
  import Swal from 'sweetalert2';
  
  export default {
    data() {
      return {
        esDistribuidor: false,
        productosSeleccionados: [],
        totalPrecio: 0,
        montoRecibido: 0,
        cambio: 0,
        botonDeshabilitado: false, // Nuevo estado para controlar el botón
      };
    },
    methods: {
      cambiarPreciosDistribuidor() {
        if (this.esDistribuidor) {
          console.log("Precios ajustados para distribuidor");
        } else {
          console.log("Precios estándar");
        }
      },
  
      seleccionarProducto(nombre, precio) {
        console.log(`Seleccionando producto: ${nombre} con precio ${precio}`);
        const productoExistente = this.productosSeleccionados.find(p => p.nombre === nombre);
        if (productoExistente) {
          productoExistente.cantidad += 1;
          productoExistente.subtotal = productoExistente.precio * productoExistente.cantidad;
          console.log(`Producto actualizado: ${productoExistente}`);
        } else {
          this.productosSeleccionados.push({
            nombre,
            cantidad: 1,
            precio,
            subtotal: precio,
          });
          console.log(`Producto agregado: ${nombre}`);
        }
        this.actualizarTotal(precio);
      },
  
      eliminarProducto(index, subtotal) {
        console.log(`Eliminando producto en el índice ${index} con subtotal ${subtotal}`);
        this.productosSeleccionados.splice(index, 1);
        this.actualizarTotal(-subtotal);
      },
  
      actualizarTotal(cantidad) {
        console.log(`Actualizando total con cantidad: ${cantidad}`);
        this.totalPrecio += cantidad;
        console.log(`Nuevo total: ${this.totalPrecio}`);
      },
  
      calcularCambio() {
        this.cambio = this.montoRecibido - this.totalPrecio;
        if (this.cambio < 0) {
          this.cambio = 0;
        }
        console.log(`Monto recibido: ${this.montoRecibido}, Total: ${this.totalPrecio}, Cambio: ${this.cambio}`);
      },
  
      // Método para guardar la factura
      async guardarFactura() {
        // Deshabilitar el botón para evitar doble clic
        this.botonDeshabilitado = true;
  
        // Validación de campos Monto recibido y Cambio
        if (this.montoRecibido <= 0 || this.cambio === null || this.cambio === undefined) {
          Swal.fire({
            icon: 'error',
            title: 'Campos incompletos',
            text: 'Por favor, ingresa el monto recibido para proceder.',
          });
          this.botonDeshabilitado = false; // Habilitar el botón nuevamente
          return;
        }
  
        if (this.totalPrecio === 0 || this.productosSeleccionados.length === 0) {
          Swal.fire({
            icon: 'error',
            title: '¡Oops!',
            text: 'Por favor selecciona al menos un producto.',
          });
          this.botonDeshabilitado = false; // Habilitar el botón nuevamente
          return;
        }
  
        // Enviar los datos directamente al hacer clic en Guardar Factura
       /*  const respuesta = await fetch("https://script.google.com/macros/s/AKfycbwZBjhB6_Sw5VF-VRTgvnXUIyvC78qftcPFQpSH9WBBfR6asApcv3CzG2kEK2_Cppq1/exec", {
            method: 'POST',
            headers: { */
        try {
          const respuesta = await fetch("https://script.google.com/macros/s/AKfycbx0A_ynzwudVV8NKj0_d8GDmIckwmbOCkgkd_opjuiUdaeNuso9ZhSF9EzfgRfl_FSc/exec", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              productos: this.productosSeleccionados.map(p => ({
                nombre: p.nombre,
                cantidad: p.cantidad,
                precioUnitario: p.precio,
                subtotal: p.subtotal,
              })),
              total: this.totalPrecio,
              montoRecibido: this.montoRecibido,
              cambio: this.cambio,
            }),
            mode: 'no-cors', // Asegúrate de que esté configurado en 'no-cors' si lo necesitas
          });
  
          console.log("Factura enviada:", respuesta);
          
          // Mostrar mensaje de éxito y limpiar campos
          Swal.fire({
            icon: 'success',
            title: 'Factura Guardada',
            html: `La factura ha sido guardada exitosamente.<br><strong style="font-size: 24px;">El cambio es $${this.cambio}.</strong>`,
          }).then(() => {
            this.limpiarCampos(); 
          });
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error al Enviar',
            text: 'Hubo un error al enviar los datos. Intenta nuevamente.',
          });
          console.error("Error al enviar datos:", error);
        } finally {
          // Habilitar el botón nuevamente después de la operación
          this.botonDeshabilitado = false;
        }
      },
  
      // Método para limpiar todos los campos
      limpiarCampos() {
        this.productosSeleccionados = [];
        this.totalPrecio = 0;
        this.montoRecibido = 0;
        this.cambio = 0;
      },
    },
  };
  </script>