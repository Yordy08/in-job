<template>
  
  <div class="container mt-4">
    <AppNav />
    <br>
    <br>
    <!-- Espacio para mostrar el total -->
    <div class="mb-4">
      <h4>Total: {{ totalValue }}</h4>
    </div>

    <div v-for="(input, index) in inputs" :key="index" class="card mb-3 animate__animated animate__fadeInUp">
      <div class="card-body">
        <div class="row">
          <div class="col-md-5">
            <label for="descripcion" class="form-label">Descripción</label>
            <textarea class="form-control" v-model="input.descripcion" id="descripcion" rows="3" placeholder="Descripción"></textarea>
          </div>
          <div class="col-md-5">
            <label for="valor" class="form-label">Valor</label>
            <input type="number" class="form-control" v-model="input.valor" id="valor" placeholder="Valor">
          </div>
          <div class="col-md-2 d-flex align-items-end">
            <button @click="confirmRemoveInput(index)" class="btn btn-danger">Eliminar</button>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-between">
      <button @click="confirmSave" class="btn btn-primary">Guardar</button>
      <button @click="addInput" class="btn btn-success">Agregar</button>
    </div>
  </div>
</template>

<script>
import AppNav from '@/components/AppNav.vue'
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'EgresosView', // Esta línea debe estar dentro del objeto `export default`
  components: {
    AppNav // Asegúrate de que el nombre del componente coincida con el archivo
  },
  data() {
    return {
      inputs: [
        { descripcion: '', valor: '' },
      ],
      botonDeshabilitado: false,
    };
  },
  computed: {
    // Calcula el total de los valores
    totalValue() {
      return this.inputs.reduce((total, input) => total + (parseFloat(input.valor) || 0), 0);
    }
  },
  methods: {
    addInput() {
      this.inputs.push({ descripcion: '', valor: '' });
    },
    // Muestra confirmación antes de eliminar
    confirmRemoveInput(index) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "¡Este cambio no se puede deshacer!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.removeInput(index);
          Swal.fire('Eliminado!', 'El ítem ha sido eliminado.', 'success');
        }
      });
    },
    // Elimina el input
    removeInput(index) {
      this.inputs.splice(index, 1);
    },
    // Muestra confirmación antes de guardar
    confirmSave() {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Quieres guardar estos cambios?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, guardar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.save();
        }
      });
    },
    async save() {
      try {
        this.botonDeshabilitado = true;

        // Enviar los datos de cada objeto individualmente
        for (let input of this.inputs) {
          console.log("Datos a guardar:", input);  // Imprimir el objeto con 'descripcion' y 'valor'

          await axios.post("/egresos", {
            descripcion: input.descripcion,
            valor: input.valor,
          });
        }

        Swal.fire("Éxito", "Datos guardados correctamente.", "success");

        // Resetear formulario
        this.inputs = [{ descripcion: '', valor: '' }];
      } catch (error) {
        console.error("Error al guardar los datos:", error);
        Swal.fire(
          "Error",
          "Hubo un problema al guardar los datos. Inténtelo más tarde.",
          "error"
        );
      } finally {
        this.botonDeshabilitado = false;
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
}

.card {
  animation-duration: 0.5s;
}

.card-body {
  padding: 20px;
}

.card-text {
  font-size: 14px;
}

.card button {
  margin-top: 10px;
}

@media (max-width: 768px) {
  .container {
    padding: 0 15px;
  }

  .card {
    margin-bottom: 15px;
  }

  .card-body {
    padding: 15px;
  }

  .btn {
    width: 100%;
    margin-top: 10px;
  }

  .d-flex {
    flex-direction: column;
  }
}

/* Animaciones con Animate.css */
@import 'animate.css';

@import "~animate.css/animate.min.css";
</style>
