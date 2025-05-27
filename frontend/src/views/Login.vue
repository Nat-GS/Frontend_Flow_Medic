<template>
  <div>
    <NavbarComponent />
    <div class="p-8 max-w-md mx-auto">
      <h1 class="text-2xl font-bold text-center mb-4">Iniciar Sesión</h1>
      <form class="flex flex-col gap-4">
        <input type="email" placeholder="Correo" class="px-4 py-2 border rounded" />
        <input type="password" placeholder="Contraseña" class="px-4 py-2 border rounded" />
        <button class="bg-[#ac3030] text-white px-4 py-2 rounded hover:bg-[#68181f]">Ingresar</button>
      </form>
    </div>
  </div>
</template>

<script>
import NavbarComponent from '@/components/NavbarGeneral.vue'

export default {
  name: 'LoginPage',
  components: {
    NavbarComponent
  }
}
</script>
