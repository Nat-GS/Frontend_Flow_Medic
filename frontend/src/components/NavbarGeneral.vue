<template>
  <nav class="navbar">
    <!-- Logo -->
    <div class="logo" @click="goBack">
      <img src="../assets/logo_fm.png" alt="Logo" class="logo-img" />
    </div>

    <!-- Si estamos en Login, solo mostrar botón Volver -->
    <div v-if="$route.name === 'Login'" class="right-block">
      <button class="btn btn-outline" @click="goInicio">Inicio</button>
      <button class="btn btn-outline" @click="goBack">Volver</button>
    </div>

    <!-- Menú normal si no estamos en Login -->
    <div v-else>
      <!-- Desktop menu -->
      <div class="menu-desktop">
        <ul class="menu">
          <li><a @click.prevent="navigate('Home')" class="menu-link">Inicio</a></li>
        </ul>

        <div class="right-block">
  <button
    v-if="mode === 'user'"
    class="btn btn-outline"
    @click="goInicio"
  >
    Inicio
  </button>
  <button
    v-if="mode === 'user'"
    class="btn btn-outline"
    @click="goBack"
  >
    Volver
  </button>

  <button
    v-else-if="mode === 'public'"
    class="btn btn-outline"
    @click="navigate('Login')"
  >
    Iniciar Sesión
  </button>

  <button
    v-if="onSpecialRoute"
    class="btn btn-outline"
    @click="goBack"
  >
    Volver
  </button>
</div>

      </div>

      <!-- Mobile menu -->
      <div class="menuToggle">
        <input type="checkbox" id="menu-btn" v-model="menuOpen" />
        <span></span><span></span><span></span>
        <ul class="menuItem">
          <li><a @click.prevent="navigate('Home')" class="menu-link">Inicio</a></li>
          <li><a @click.prevent="navigate('Hospitales')" class="menu-link">Hospitales</a></li>
          <li v-if="mode === 'public'">
            <button class="btn btn-outline" @click="navigate('Login')">
              Iniciar Sesión
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>


<script>
export default {
  name: 'NavbarGeneral',
  props: {
    mode: {
      type: String,
      default: 'public'
    }
  },
  data() {
    return {
      menuOpen: false
    };
  },
  computed: {
    onSpecialRoute() {
      const specials = [
        'mis-mascotas',
        'perfil-mascota',
        'historial-actividades',
        'salud',
        'calendario',
        'notificaciones'
      ];
      return specials.includes(this.$route.name);
    }
  },
  methods: {
    navigate(routeName) {
      this.$router.push({ name: routeName });
      this.menuOpen = false;
    },
    scrollTo(hash) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      this.menuOpen = false;
    },
    goBack() {
      this.$router.push('/index');
    },
    goInicio() {
      this.$router.push('/')
    },
  }
};
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
