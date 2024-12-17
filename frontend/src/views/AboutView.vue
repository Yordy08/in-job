<template>
  <div>
    <h1>Conexión Backend-Frontend</h1>
    <p>{{ mensaje }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      mensaje: 'Cargando...',
    };
  },
  mounted() {
    // Consumir el API del backend
    axios.get('http://localhost:5000/api/hello')
      .then((response) => {
        this.mensaje = response.data.message; // Asignar el mensaje del backend
      })
      .catch((error) => {
        console.error('Error al conectar con el backend:', error);
        this.mensaje = 'Error al conectar con el backend.';
      });
  },
};
</script>
