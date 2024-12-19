<template>
  <div class="container mt-4">
    <AppNav />
    <br>
    <br>
    <div class="row">
      <!-- Card de Facturación (Suma Total de Facturas) -->
      <div class="col-md-3">
        <div class="card mb-3 shadow-sm border-primary bg-light">
          <div class="card-body text-center">
            <h5 class="card-title text-primary">Total Facturación</h5>
            <p class="text-success"><strong>Total Facturas:</strong> ${{ totalFacturas }}</p>
          </div>
        </div>
      </div>

      <!-- Card de Domicilios (Suma Total de Domicilios) -->
      <div class="col-md-3">
        <div class="card mb-3 shadow-sm border-info bg-light">
          <div class="card-body text-center">
            <h5 class="card-title text-info">Total Domicilios</h5>
            <p class="text-warning"><strong>Total Domicilios:</strong> ${{ totalDomicilios }}</p>
          </div>
        </div>
      </div>

      <!-- Card de Egresos (Suma Total de Egresos) -->
      <div class="col-md-3">
        <div class="card mb-3 shadow-sm border-danger bg-light">
          <div class="card-body text-center">
            <h5 class="card-title text-danger">Total Egresos</h5>
            <p class="text-danger"><strong>Total Egresos:</strong> ${{ totalEgresos }}</p>
          </div>
        </div>
      </div>

      <!-- Card de Domicilios Pagos (Suma Total de Domicilios Pagos) -->
      <div class="col-md-3">
        <div class="card mb-3 shadow-sm border-success bg-light">
          <div class="card-body text-center">
            <h5 class="card-title text-success">Total Domicilios Pagos</h5>
            <p class="text-primary"><strong>Total Domicilios Pagos:</strong> ${{ totalDomiciliosPagos }}</p>
          </div>
        </div>
      </div>

      <!-- Card de Ventas (Suma Total Facturación + Total Domicilios) -->
      <div class="col-md-3">
        <div class="card mb-3 shadow-sm border-secondary bg-light">
          <div class="card-body text-center">
            <h5 class="card-title text-secondary">Total Ventas</h5>
            <p class="text-info"><strong>Total Ventas:</strong> ${{ totalVentas }}</p>
          </div>
        </div>
      </div>

      <!-- Card de Ganancias (Total Facturación + Total Domicilios Pagos - Total Egresos) -->
      <div class="col-md-3">
        <div class="card mb-3 shadow-sm border-success bg-light">
          <div class="card-body text-center">
            <h5 class="card-title text-success">Ganancias</h5>
            <p class="text-dark"><strong>Ganancias:</strong> ${{ ganancias }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppNav from '@/components/AppNav.vue'
import 'bootstrap/dist/css/bootstrap.min.css';
export default {

  name: 'AdminDashboard', 
  components: {
    AppNav // Asegúrate de que el nombre del componente coincida con el archivo
  },
  data() {
    return {
      facturas: [],
      domicilios: [],
      egresos: [],
    };
  },
  mounted() {
    this.fetchFacturas();
    this.fetchDomicilios();
    this.fetchEgresos();
  },
  methods: {
    async fetchFacturas() {
      try {
        const response = await fetch('/facturas');
        this.facturas = await response.json();
      } catch (error) {
        console.error('Error fetching facturas:', error);
      }
    },
    async fetchDomicilios() {
      try {
        const response = await fetch('/domicilios');
        this.domicilios = await response.json();
      } catch (error) {
        console.error('Error fetching domicilios:', error);
      }
    },
    async fetchEgresos() {
      try {
        const response = await fetch('/egresos');
        this.egresos = await response.json();
      } catch (error) {
        console.error('Error fetching egresos:', error);
      }
    },
  },
  computed: {
    // Suma total de facturas (solo precios, sin multiplicar por cantidad)
    totalFacturas() {
      const total = this.facturas.reduce((total, factura) => {
        const precio = parseFloat(factura.precio);
        return !isNaN(precio) ? total + precio : total;
      }, 0);
      return total.toFixed(2); // Formateo a 2 decimales
    },
    // Suma total de domicilios (solo precios, sin multiplicar por cantidad)
    totalDomicilios() {
      const total = this.domicilios.reduce((total, domicilio) => {
        const precio = parseFloat(domicilio.precio);
        return !isNaN(precio) ? total + precio : total;
      }, 0);
      return total.toFixed(2); // Formateo a 2 decimales
    },
    // Suma total de egresos (solo valores, sin multiplicar por cantidad)
    totalEgresos() {
      const total = this.egresos.reduce((total, egreso) => {
        const valor = parseFloat(egreso.valor);
        return !isNaN(valor) ? total + valor : total;
      }, 0);
      return total.toFixed(2); // Formateo a 2 decimales
    },
    // Suma total de domicilios pagos (solo aquellos con estadoPago "Pagado")
    totalDomiciliosPagos() {
      const total = this.domicilios
        .filter(domicilio => domicilio.estadoPago === "Pagado")
        .reduce((total, domicilio) => {
          const precio = parseFloat(domicilio.precio);
          return !isNaN(precio) ? total + precio : total;
        }, 0);
      return total.toFixed(2); // Formateo a 2 decimales
    },
    // Suma total de ventas (Total Facturación + Total Domicilios)
    totalVentas() {
      const ventas = parseFloat(this.totalFacturas) + parseFloat(this.totalDomicilios);
      return ventas.toFixed(2); // Formateo a 2 decimales
    },
    // Ganancias (Total Facturación + Total Domicilios Pagos - Total Egresos)
    ganancias() {
      const ganancias = parseFloat(this.totalFacturas) + parseFloat(this.totalDomiciliosPagos) - parseFloat(this.totalEgresos);
      return ganancias.toFixed(2); // Formateo a 2 decimales
    },
  },
};
</script>

<style scoped>
.card {
  border-radius: 10px;
  transition: all 0.3s ease;
  background-color: #f8f9fa;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
.card-body {
  padding: 1.2rem;
}
.card-title {
  font-weight: bold;
  font-size: 1.2rem;
}
.card-body p {
  font-size: 1.1rem;
  font-weight: normal;
}
.text-primary {
  color: #007bff !important;
}
.text-success {
  color: #28a745 !important;
}
.text-warning {
  color: #ffc107 !important;
}
.text-info {
  color: #17a2b8 !important;
}
.text-danger {
  color: #dc3545 !important;
}
.text-dark {
  color: #343a40 !important;
}
.bg-light {
  background-color: #f8f9fa !important;
}
</style>
