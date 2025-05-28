<template>
  <nav class="navbar">
    <!-- Logo -->
    <div class="logo" @click="navigate('home')">
      <img src="../assets/logo_fm.png" alt="Logo" class="logo-img" />
    </div>

    <!-- Desktop menu -->
    <div class="menu-desktop">
      <!-- Zona central DERECHA: enlaces + botones/usuario -->
      <ul class="menu">
        <li><a @click.prevent="navigate('home')"             class="menu-link">Inicio</a></li>
        <li><a @click.prevent="scrollTo('#menu-usuario')" class="menu-link">Hospitales</a></li>
        <li><a @click.prevent="scrollTo('#')" class="menu-link">Información</a></li>
      </ul>

      <div class="right-block">
        <!-- Ruta especial -->
        <button v-if="onSpecialRoute" class="btn btn-outline" @click="goBack">Volver</button>

        <!-- NO autenticado -->
        <template v-else-if="!isAuthenticated">
          <button class="btn btn-outline" @click="navigate('login')">Iniciar Sesión</button>
        </template>

        <!-- SÍ autenticado -->
        <div v-else class="user-info">
          <i class="fas fa-bell"></i>
          <div class="user-profile" @click="toggleDropdown">
            <i class="fas fa-user-circle"></i>
            <span>{{ nombreUsuario }}</span>
          </div>
          <div v-if="dropdownOpen" class="dropdown-menu">
            <ul><li @click="confirmLogout">Cerrar sesión</li></ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Hamburguesa móvil -->
    <div class="menuToggle">
      <input type="checkbox" id="menu-btn" v-model="menuOpen" />
      <span></span><span></span><span></span>
      <ul class="menuItem">
        <li><a @click.prevent="navigate('home')" class="menu-link">Inicio</a></li>
        <li><a @click.prevent="scrollTo('#funcionalidades')" class="menu-link">Funcionalidades</a></li>
        <li><a @click.prevent="scrollTo('#redes')" class="menu-link">Redes Sociales</a></li>
        <li v-if="isAuthenticated"><a @click.prevent="navigate('panel-usuario')" class="menu-link">Panel de Usuario</a></li>
        <li v-if="!isAuthenticated">
          <button class="btn btn-outline" @click="navigate('login')">Iniciar Sesión</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'NavbarGeneral',
  props: { nombre: String },
  data() {
    return {
      isAuthenticated: false,
      nombreUsuario: this.nombre || '',
      dropdownOpen: false,
      menuOpen: false,
      isOnMisMascotas: false,
      isOnPerfilMascota: false,
      isOnHistorialActividades: false,
      isOnSalud: false,
      isOnCalendario: false,
      isOnNotificaciones: false
    }
  },
  computed: {
    onSpecialRoute() {
      return (
        this.isOnMisMascotas ||
        this.isOnPerfilMascota ||
        this.isOnHistorialActividades ||
        this.isOnSalud ||
        this.isOnCalendario ||
        this.isOnNotificaciones
      )
    }
  },
  mounted() {
    this.checkAuth()
    this.checkRoute()
  },
  watch: {
    '$route.name'() {
      this.checkAuth()
      this.checkRoute()
    }
  },
  methods: {
    checkAuth() {
      const token = localStorage.getItem('authToken')
      this.isAuthenticated = !!token
      if (token) {
        this.nombreUsuario = localStorage.getItem('nombre') || this.nombreUsuario
      }
    },
    checkRoute() {
      const name = this.$route.name
      this.isOnMisMascotas          = name === 'mis-mascotas'
      this.isOnPerfilMascota        = name === 'perfil-mascota'
      this.isOnHistorialActividades = name === 'historial-actividades'
      this.isOnSalud                = name === 'salud'
      this.isOnCalendario           = name === 'calendario'
      this.isOnNotificaciones       = name === 'notificaciones'
    },
    navigate(route) {
      this.$router.push({ name: route })
      this.menuOpen = false
    },
    scrollTo(hash) {
      const el = document.querySelector(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      this.menuOpen = false
    },
    goBack() {
      this.$router.go(-1)
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen
    },
    confirmLogout() {
      Swal.fire({
        title: '¿Estás seguro?',
        text:  '¿Deseas cerrar sesión?',
        icon:  'warning',
        showCancelButton: true,
        confirmButtonColor: '#9d8189',
        cancelButtonColor:  '#ffcad4',
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'Cancelar'
      }).then(res => {
        if (res.isConfirmed) this.logout()
      })
    },
    logout() {
      localStorage.removeItem('authToken')
      localStorage.removeItem('nombre')
      this.isAuthenticated = false
      this.$router.push({ name: 'home' })
      Swal.fire('Sesión cerrada','Has cerrado sesión correctamente.','success')
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
@import '@fortawesome/fontawesome-free/css/all.css';

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: #68181f;
  border-radius: 50px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.2);
  margin: 20px;
}

/* Logo */
.logo-img {
  width: 70px; height: 70px;
  cursor: pointer;
}

/* Menú de escritorio: enlaces + botones alineados a la derecha */
.menu-desktop {
  flex: 1;
  display: flex;
  justify-content: flex-end; /* todo al extremo derecho */
  align-items: center;
  gap: 2rem;
}

/* Enlaces */
.menu {
  display: flex;
  gap: 1.5rem;
  list-style: none;
  margin: 0; padding: 0;
}
.menu-link {
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  transition: color .3s;
}
.menu-link:hover {
  color: #f4cfc6;
}

/* Bloque derecho (botones/usuario) */
.right-block {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Botones */
.btn {
  padding: 8px 18px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color .3s;
}
.btn-outline {
  background: transparent;
  color: #efdbbf;
  border: 2px solid #efdbbf;
}
.btn-outline:hover {
  background: #efdbbf;
  color: #121211;
}

/* Usuario */
.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
}
.user-info i {
  font-size: 1.3rem;
  color: #f4cfc6;
  cursor: pointer;
}
.user-profile {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  cursor: pointer;
}
.user-profile span {
  color: #fff;
  font-weight: 600;
}

/* Dropdown */
.dropdown-menu {
  position: absolute;
  top: 40px; right: 0;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  padding: 8px;
}
.dropdown-menu ul {
  list-style: none; margin: 0; padding: 0;
}
.dropdown-menu li {
  padding: 6px 12px;
  cursor: pointer;
  transition: background .2s;
}
.dropdown-menu li:hover {
  background: #f4f4f4;
}

/* Hamburguesa móvil */
.menuToggle {
  display: none;
  flex-direction: column;
  align-items: flex-end;
}
.menuToggle input {
  display: none;
}
.menuToggle span {
  width: 25px; height: 3px;
  background: #fff;
  margin: 3px 0;
  transition: all .3s;
}
.menuItem {
  position: absolute;
  top: 60px; right: 20px;
  background: #68181f;
  border-radius: 10px;
  display: none;
  flex-direction: column;
  padding: 10px;
}
.menuToggle input:checked ~ .menuItem {
  display: flex;
}
.menuItem li {
  list-style: none;
  margin: 8px 0;
}
.menuItem .menu-link {
  color: #fff;
  font-size: 16px;
}

/* Responsive */
@media (max-width: 768px) {
  .menu-desktop { display: none; }
  .menuToggle { display: flex; }
}
</style>
