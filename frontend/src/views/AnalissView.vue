
<template>
  <div class="container">
    <h2>Análisis de Ventas</h2>
    <div v-if="loading">
      <p>Cargando datos, por favor espera...</p>
    </div>
    <div v-else>
      <h3>Productos más vendidos</h3>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Producto</th>
            <th>Cantidad Vendida</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(producto, index) in topProductos" :key="producto.nombre">
            <td>{{ index + 1 }}</td>
            <td>{{ producto.nombre }}</td>
            <td>{{ producto.cantidad }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productos: [], // Lista completa de productos
      topProductos: [], // Top 2 productos
      loading: true, // Indicador de carga
    };
  },
  methods: {
    async cargarDatos() {
      try {
        // URL de la API para obtener datos de Google Sheets
        const apiURL =
          "https://script.google.com/macros/s/AKfycbzgj6MEHGwaiAYS24H8GNIZRDuZwkSsgkJFDDqsoE4byqMrdgJsic9R6kRxWeIQQu1f/exec";

        // Obtener datos de la API
        const response = await fetch(apiURL);
        const data = await response.json();

        if (data.status === "success") {
          const { facturacion, domicilio } = data;

          // Combinar los datos de ambas hojas
          const productosFacturacion = facturacion.map(row => ({
            nombre: row[1],
            cantidad: parseInt(row[3], 10),
          }));
          const productosDomicilio = domicilio.map(row => {
            const productos = row[5].split(", ").map(prod => {
              const [nombre, cantidad] = prod.split(" (");
              return {
                nombre: nombre.trim(),
                cantidad: parseInt(cantidad, 10),
              };
            });
            return productos;
          }).flat();

          this.productos = [...productosFacturacion, ...productosDomicilio];

          // Contar las cantidades de cada producto
          const conteo = this.productos.reduce((acc, producto) => {
            acc[producto.nombre] = (acc[producto.nombre] || 0) + producto.cantidad;
            return acc;
          }, {});

          // Convertir a un arreglo y ordenar por cantidad
          const productosOrdenados = Object.entries(conteo)
            .map(([nombre, cantidad]) => ({ nombre, cantidad }))
            .sort((a, b) => b.cantidad - a.cantidad);

          // Obtener los dos productos más vendidos
          this.topProductos = productosOrdenados.slice(0, 2);

          console.log("Top productos:", this.topProductos);
        } else {
          console.error("Error en la respuesta de la API:", data.message);
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.cargarDatos();
  },
};
</script>

<style scoped>
.container {
  margin-top: 20px;
}
h2,
h3 {
  margin-bottom: 20px;
}
.table {
  margin-top: 10px;
  width: 100%;
  border-collapse: collapse;
}
.table-bordered {
  border: 1px solid #dee2e6;
}
.table th,
.table td {
  text-align: center;
  vertical-align: middle;
  border: 1px solid #dee2e6;
  padding: 8px;
}
</style>

