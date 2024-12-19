<template>
  <nav class="navbar navbar-expand-lg navbar-light" :style="{ backgroundColor: '#343a40', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)' }">
    <div class="container-fluid">
      <!-- Logo -->
      <router-link style="color: aliceblue;" to="/" class="navbar-brand">IN-JON</router-link>

      <!-- Botón para menú en dispositivos móviles -->
      <button 
        class="navbar-toggler" 
        type="button" 
        @click="toggleMobileNav"
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Menú -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/domicilios" class="nav-link">Crear Domicilio</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/egresos" class="nav-link">Egresos</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/listadomicilio" class="nav-link">Domicilios</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin" class="nav-link">Análisis</router-link>
          </li>
        </ul>
      </div>
    </div>

    <!-- Sidebar para móviles -->
    <div class="mobile-nav" :class="{'mobile-nav-active': mobileNavActive}">
      <div class="close-btn" @click="toggleMobileNav">X</div>
      <ul class="mobile-nav-list">
        <li><router-link to="/domicilios" class="nav-link">Crear Domicilio</router-link></li>
        <li><router-link to="/egresos" class="nav-link">Egresos</router-link></li>
        <li><router-link to="/listadomicilio" class="nav-link">Domicilios</router-link></li>
        <li><router-link to="/admin" class="nav-link">Análisis</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppNav',
  data() {
    return {
      mobileNavActive: false
    };
  },
  methods: {
    toggleMobileNav() {
      this.mobileNavActive = !this.mobileNavActive;
    }
  }
};
</script>

<style scoped>
/* Estilos para la barra de navegación */
.navbar {
  z-index: 1000;
  padding: 15px 30px; /* Aumento el tamaño del navbar */
}

.navbar-light .navbar-nav .nav-link {
  color: white; /* Letras blancas */
  font-weight: 600; /* Aumento el peso de la fuente */
  font-size: 18px; /* Aumento el tamaño de la fuente */
  transition: color 0.3s;
}

.navbar-light .navbar-nav .nav-link:hover {
  color: #ffffff;
}

.navbar-light .navbar-toggler {
  border-color: #ffffff;
}

.navbar-light .navbar-toggler-icon {
  background-color: #ffffff00;
}

/* Estilos para el menú lateral en móviles */
.mobile-nav {
  display: none;
  position: fixed;
  top: 0;
  right: -250px;
  width: 250px;
  height: 100%;
  background-color: #141b23;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
  transition: right 0.3s ease;
  padding-top: 60px;
}

.mobile-nav-active {
  right: 0;
}

.mobile-nav .close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 30px;
  cursor: pointer;
}

.mobile-nav-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.mobile-nav-list li {
  padding: 20px;
  text-align: center;
}

.mobile-nav-list li .nav-link {
  color: white; /* Letras blancas en el menú lateral */
  font-weight: 600;
  font-size: 20px; /* Aumento el tamaño de la fuente en el menú lateral */
}

.mobile-nav-list li .nav-link:hover {
  color: #ffffff;
}

/* Media Query para dispositivos móviles */
@media (max-width: 767px) {
  .navbar .collapse {
    display: block !important;
  }

  .navbar-toggler {
    display: block;
  }

  .navbar-toggler:focus {
    outline: none;
  }

  .navbar-nav {
    display: none;
  }

  .navbar-toggler-icon {
    background-color: #fefefe;
  }

  .mobile-nav {
    display: block;
  }

  .mobile-nav-active {
    right: 0;
  }
}

/* Estilos para pantallas grandes (PC) */
@media (min-width: 768px) {
  .navbar-nav {
    margin-left: auto;
  }

  .navbar-nav .nav-link {
    font-size: 18px;
  }
}
</style>
