<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Listado de Domicilios</h2>
    <div v-if="loading" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
      <p class="mt-3">Cargando datos, por favor espera...</p>
    </div>
    <div v-else>
      <div class="row">
        <div
          v-for="domicilio in domicilios"
          :key="domicilio.id"
          class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
        >
          <div class="card shadow-sm">
            <img
              v-if="domicilio.imagen"
              :src="domicilio.imagen"
              class="card-img-top"
              alt="Imagen del domicilio"
            />
            <div class="card-body">
              <h5 class="card-title">{{ domicilio.nombre }}</h5>
              <p class="card-text">
                <strong>Dirección:</strong> {{ domicilio.direccion }}<br />
                <strong>Teléfono:</strong> {{ domicilio.telefono }}<br />
                <strong>Productos:</strong>
                <ul class="list-group list-group-flush">
                  <li
                    v-for="(producto, idx) in domicilio.productos"
                    :key="idx"
                    class="list-group-item"
                  >
                    {{ producto.nombre }} ({{ producto.cantidad }})
                  </li>
                </ul>
                <strong>Total:</strong> {{ formatCurrency(domicilio.total) }}<br />
                <strong>Estado de pago:</strong>
                <span
                  v-if="domicilio.estadoPago === 'Pagado'"
                  class="badge bg-success"
                >
                  Pagado
                </span>
                <span
                  v-else
                  class="badge bg-danger"
                >
                  Pendiente
                </span>
              </p>

              <!-- Campo para ingresar ID y marcar como pagado -->
              <div v-if="domicilio.estadoPago === 'Pendiente'" class="d-flex justify-content-center">
                <input
                  v-model="domicilio.idOk"
                  type="text"
                  :placeholder="domicilio.id" 
                  class="form-control mb-2"
                  readonly
                />
                <button
                  @click="enviarId(domicilio)"
                  class="btn btn-primary mb-2 ms-2"
                >
                  Enviar ID OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
  data() {
    return {
      domicilios: [],
      loading: true,
    };
  },
  methods: {
    async cargarDomicilios() {
      const apiURL =
        "https://script.google.com/macros/s/AKfycbzMFhcTbesMQsZ24pdsHKfOLdCuL7iefJlzBNkWLBJL8-leOlrfN-e4PtFxr-B-uMXk/exec";

      try {
        const response = await fetch(apiURL);
        const data = await response.json();

        if (data.status === "success") {
          console.log(data);
          this.domicilios = data.domicilio.map((row) => ({
            id: row[0],
            nombre: row[2],
            direccion: row[3],
            telefono: row[4],
            productos: this.parseProductos(row[5]),
            total: parseFloat(row[6]),
            estadoPago: row[7],
            idOk: row[0], // Llenar automáticamente el ID
          }));
        } else {
          Swal.fire({
            icon: "error",
            title: "Error al cargar datos",
            text: data.message || "Ocurrió un error inesperado.",
          });
        }
      } catch (error) {
        console.error("Error de conexión:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo conectar al servidor. Intenta nuevamente.",
        });
      } finally {
        this.loading = false;

        if (this.domicilios.length === 0) {
          Swal.fire({
            icon: "info",
            title: "Sin domicilios",
            text: "No se encontraron domicilios disponibles.",
          });
        }
      }
    },
    parseProductos(productosStr) {
      if (typeof productosStr !== "string" || !productosStr.trim()) {
        return [];
      }

      return productosStr.split(", ").map((prod) => {
        const [nombre, cantidad] = prod.split(" (");
        return {
          nombre: nombre?.trim() || "Desconocido",
          cantidad: parseInt(cantidad?.replace(")", ""), 10) || 0,
        };
      });
    },
    async enviarId(domicilio) {
      if (!domicilio.idOk) {
        Swal.fire({
          icon: "warning",
          title: "ID vacío",
          text: "Por favor ingrese un ID válido.",
        });
        return;
      }

      const apiUpdateURL =
        "";

      try {
        const response = await fetch(apiUpdateURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            domicilioId: domicilio.id, // ID del domicilio
            idOk: domicilio.idOk, // El ID ingresado
          }),
        });

        const data = await response.json();

        if (data.status === "success") {
          Swal.fire({
            icon: "success",
            title: "ID enviado",
            text: `El ID de ${domicilio.nombre} ha sido enviado con éxito.`,
          });
        } else {
          throw new Error(data.message || "Error al enviar el ID");
        }
      } catch (error) {
        console.error("Error al enviar ID:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo enviar el ID. Intenta nuevamente.",
        });
      }
    },
    formatCurrency(value) {
      const number = parseFloat(value);
      if (isNaN(number)) {
        return '$0.00'; // Devolver un valor por defecto si no es un número
      }
      return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

    }
  },
  mounted() {
    this.cargarDomicilios();
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
  text-align: left;
}
</style>
