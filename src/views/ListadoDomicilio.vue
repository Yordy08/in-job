<template>
    <div class="container mt-4">
      <h2>Listado de Domicilios</h2>
      <div v-if="loading">
        <p>Cargando datos, por favor espera...</p>
      </div>
      <div v-else>
        <div class="row">
          <div
            v-for="(domicilio, index) in domicilios"
            :key="domicilio.id"
            class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
          >
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{{ domicilio.nombre }}</h5>
                <p class="card-text">
                  <strong>Dirección:</strong> {{ domicilio.direccion }}<br />
                  <strong>Teléfono:</strong> {{ domicilio.telefono }}<br />
                  <strong>Productos:</strong>
                  <ul>
                    <li v-for="(producto, idx) in domicilio.productos" :key="idx">
                      {{ producto.nombre }} ({{ producto.cantidad }})
                    </li>
                  </ul>
                  <strong>Total:</strong> {{ formatCurrency(domicilio.total) }}<br />
                  <strong>Estado de pago:</strong>
                  <span v-if="domicilio.estadoPago === 'Pagado'" class="badge bg-success">Pagado</span>
                  <span v-else class="badge bg-danger">Pendiente</span><br />
                </p>
                <!-- Botón Pagar solo si el estado de pago está en pendiente -->
                <button
                  v-if="domicilio.estadoPago === 'Pendiente'"
                  @click="marcarComoPagado(domicilio, index)"
                  class="btn btn-primary"
                >
                  Pagar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import "bootstrap/dist/css/bootstrap.min.css";
  
  export default {
    data() {
      return {
        domicilios: [], // Lista de domicilios
        loading: true, // Indicador de carga
      };
    },
    methods: {
      async cargarDomicilios() {
        try {
          const apiURL =
            "https://script.google.com/macros/s/AKfycbwAv03pwCKWpp29FcJ_JIXgZMGD5K-veuvZlqBwy_ECFjqrxs9BM1IPFz_StOYbMkLs/exec";
  
          const response = await fetch(apiURL);
          const data = await response.json();
  
          console.log(data); // Verifica la respuesta de la API
  
          if (data.status === "success") {
            const { domicilio } = data; // Cambia esto si la estructura de la API es diferente
            this.domicilios = domicilio.map((row) => {
              let productos = [];
  
              // Verifica si row[4] es una cadena antes de intentar usar .split()
              if (typeof row[4] === 'string') {
                productos = row[4].split(", ").map((prod) => {
                  const [nombre, cantidad] = prod.split(" (");
                  return {
                    nombre: nombre.trim(),
                    cantidad: parseInt(cantidad.replace(')', ''), 10), // Eliminar el paréntesis al final
                  };
                });
              } else {
                // Si no es una cadena, no hacemos nada o tratamos el valor de otra manera
                productos = [{ nombre: row[4], cantidad: 0 }];
              }
  
              return {
                id: row[0], // Asegúrate de incluir el ID para usarlo en la actualización
                nombre: row[1], // Columna 2
                direccion: row[2], // Columna 3
                telefono: row[3], // Columna 4
                productos, // Columna 5
                total: parseFloat(row[5]), // Columna 6
                estadoPago: row[6] || "Desconocido", // Columna 7
              };
            });
          } else {
            console.error("Error en la respuesta de la API:", data.message);
          }
        } catch (error) {
          console.error("Error al cargar los domicilios:", error);
        } finally {
          this.loading = false;
          console.log(this.domicilios); // Verifica si los domicilios se han llenado correctamente
        }
      },
      formatCurrency(value) {
        return `$${value.toFixed(2)}`;
      },
      async marcarComoPagado(domicilio, index) {
        try {
          // Cambiar el estado localmente
          this.domicilios[index].estadoPago = "Pagado";
  
          // Actualizar el estado en la base de datos
          const apiUpdateURL =
            "https://script.google.com/macros/s/AKfycbwAv03pwCKWpp29FcJ_JIXgZMGD5K-veuvZlqBwy_ECFjqrxs9BM1IPFz_StOYbMkLs/exec";
  
          const response = await fetch(apiUpdateURL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: domicilio.id, // Enviar el ID para identificar el domicilio
              estadoPago: "Pagado", // Actualización a "Pagado"
            }),
          });
  
          const data = await response.json();
  
          if (data.status === "success") {
            console.log("Estado de pago actualizado correctamente");
          } else {
            console.error("Error al actualizar el estado de pago:", data.message);
          }
        } catch (error) {
          console.error("Error al marcar como pagado:", error);
        }
      },
    },
    mounted() {
      this.cargarDomicilios();
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
  .card {
    border: 1px solid #dee2e6;
  }
  .card-body {
    padding: 15px;
  }
  .card-title {
    font-size: 1.25rem;
    font-weight: bold;
  }
  .card-text {
    margin-bottom: 10px;
  }
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  ul li {
    margin-bottom: 5px;
  }
  </style>
  