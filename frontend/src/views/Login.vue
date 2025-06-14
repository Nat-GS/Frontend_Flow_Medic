<template>
  <div>
    <NavbarComponent />
    <div class="p-8 max-w-md mx-auto">
      <h1 class="text-2xl font-bold text-center mb-4">Iniciar Sesión</h1>
      <form class="flex flex-col gap-4" @submit.prevent="login">
<input
  type="email"
  placeholder="Correo"
  class="px-4 py-2 border rounded"
  v-model="email"
/>
<span v-if="errors.email" class="error-message">{{ errors.email }}</span>

<input
  type="password"
  placeholder="Contraseña"
  class="px-4 py-2 border rounded"
  v-model="password"
/>
<span v-if="errors.password" class="error-message">{{ errors.password }}</span>        <button class="bg-[#ac3030] text-white px-4 py-2 rounded hover:bg-[#68181f]">Ingresar</button>
      </form>
    </div>
  </div>
</template>

<script>
import NavbarComponent from '@/components/NavbarGeneral.vue'
import axios from 'axios'
import Swal from 'sweetalert2'


export default {
  name: 'LoginPage',
  components: {
    NavbarComponent
  },
  data(){
    return{
      email: '',
      password: '',
      showPassword: false,
      errors: {
        email: '',
        password: ''
      }
    }
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
methods:{
  validateForm() {
      this.errors.email = ''
      this.errors.password = ''
      let isValid = true

      // Validar que el correo no esté vacío y tenga un formato válido
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!this.email) {
        this.errors.email = 'El email no puede estar vacío'
        isValid = false
      } else if (!emailRegex.test(this.email)) {
        this.errors.email = 'El formato del email no es válido'
        isValid = false
      }

      // Validar que la contraseña no esté vacía
      if (!this.password) {
        this.errors.password = 'La contraseña no puede estar vacía'
        isValid = false
      }

      return isValid
    },
  async login() {
      if (!this.validateForm()) {
        return
      }

      try {
        const response = await axios.post('http://127.0.0.1:5000/usuario/login', {
          email: this.email,
          contrasenia: this.password
        })
        console.log('Respuesta de login:', response.data)

        if (response.data.id_usuario) {
          localStorage.setItem('Usuario_id_usuario', response.data.id_usuario)
         if (response.data.hospital_id) {
         localStorage.setItem('hospital_id', response.data.hospital_id)
        } else {
            console.warn('No se recibió hospital_id en la respuesta')
          return
        }
      }

        if (response.data.token && response.data.nombre) {
          localStorage.setItem('authToken', response.data.token)
          localStorage.setItem('nombre', response.data.nombre)

          Swal.fire({
            icon: 'success',
            title: 'Login exitoso',
            text: 'Has iniciado sesión correctamente',
            confirmButtonText: 'OK',
            customClass: {
              confirmButton: 'my-swal-button'
            }
          })
          this.$router.push('/menu-usuario')
        }
      } catch (error) {
        console.error('Error en el login:', error.response ? error.response.data : error.message)

        Swal.fire({
          icon: 'error',
          title: 'Login fallido',
          text: 'Verifica tus credenciales e intenta nuevamente',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'my-swal-button'
          }
        })
      }
    }  
} 
}
</script>
