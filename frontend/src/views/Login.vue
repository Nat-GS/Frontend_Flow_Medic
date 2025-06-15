<template>
  <div>
    <NavbarComponent />

    <!-- Contenedor principal -->
    <div class="grid">
      <!-- Sección izquierda: formulario -->
      <div class="order__left centered">
        <div class="form">
          <!-- Logo -->
          <div class="logo">
            <h1 style="color: #ac3030; font-size: 28px; font-weight: bold;">
              <font-awesome-icon :icon="['fas', 'circle-user']" /> FlowMedic
            </h1>
          </div>
          <h4>
            Bienvenido a FlowMedic. Plataforma oficial para monitoreo de urgencias hospitalarias.
          </h4>

          <!-- Formulario -->
          <form @submit.prevent="login">
            <input
              type="email"
              placeholder="Correo"
              v-model="email"
              autocomplete="off"
            />
            <input
              type="password"
              placeholder="Contraseña"
              v-model="password"
              autocomplete="off"
            />
            <button type="submit" class="login__button">
              <font-awesome-icon :icon="['fas', 'sign-in-alt']" /> Ingresar
            </button>
          </form>
        </div>
      </div>

      <!-- Sección derecha: imagen decorativa -->
      <div class="order__right centered no__overflow">
        <img
          class="img"
          src="../assets/fondo_login.png"
          alt="Decoración médica"
        />
      </div>
    </div>
  </div>
</template>

<script>
import NavbarComponent from '@/components/NavbarGeneral.vue'
import axios from 'axios'
import Swal from 'sweetalert2'

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircleUser, faSignInAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faCircleUser, faSignInAlt)

export default {
  name: 'LoginPage',
  components: {
    FontAwesomeIcon,
    NavbarComponent
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      if (!this.email || !this.password) {
        Swal.fire({
          icon: 'warning',
          title: 'Campos incompletos',
          text: 'Por favor ingresa tu correo y contraseña.',
        })
        return
      }

      try {
        const response = await axios.post(`${process.env.VUE_APP_API_URL}/usuario/login`, {
          email: this.email,
          contrasenia: this.password
        })

        if (response.data.id_usuario) {
          localStorage.setItem('Usuario_id_usuario', response.data.id_usuario)
        }
        if (response.data.hospital_id) {
          localStorage.setItem('hospital_id', response.data.hospital_id)
        }

        localStorage.setItem('authToken', response.data.token)
        localStorage.setItem('nombre', response.data.nombre)

        Swal.fire({
          icon: 'success',
          title: 'Login exitoso',
          text: 'Has iniciado sesión correctamente',
        })

        this.$router.push('/menu-usuario')
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Login fallido',
          text: 'Verifica tus credenciales.',
        })
      }
    }
  }
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
}
.order__left {
  order: 1;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; 
}
.order__right {
  order: 2;
}
.centered {
  display: flex;
  align-items: center;
  justify-content: center;
}
.no__overflow {
  display: flex;
  align-items: center;
  overflow: hidden;
}
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.logo {
  margin-bottom: 12px;
  text-align: center;
}
h4 {
  color: #121211;
  text-align: center;
  margin-bottom: 30px;
  letter-spacing: 0.2px;
  line-height: 20px;
  font-size: 15px;
  max-width: 280px;
}
input[type=email],
input[type=password] {
  width: 260px;
  padding: 12px 16px;
  margin: 10px 0;
  border: 1px solid #c8c3cf;
  border-radius: 4px;
  background-color: #F6F5F7;
  font-size: 15px;
  color: #121211;
}
input:focus {
  border-color: #ac3030;
  background: #FDFCFE;
  box-shadow: 0 0 0 0.25rem #efdbbf;
}
.login__button {
  width: 260px;
  margin-top: 16px;
  border: none;
  background-color: #ac3030;
  padding: 12px;
  color: white;
  border-radius: 4px;
  font-size: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login__button :deep(svg) {
  margin-right: 8px;
}
.login__button:hover {
  background-color: #68181f;
}
.img {
  height: 100%;
  object-fit: cover;
}
@media only screen and (max-width: 800px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .order__left {
    order: 2;
    padding: 20px;
  }
  .order__right {
    order: 1;
  }
  .img {
    width: 100vw;
  }
}
</style>
