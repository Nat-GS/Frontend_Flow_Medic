<template>
  <div>
    <NavbarComponent />
    <div class="p-8 text-center">
      <h1 class="text-2xl font-bold">Página de Hospitales</h1>
      <p>Lista de hospitales y sus estadísticas.</p>
    </div>
  </div>
</template>

<script>
import NavbarComponent from '@/components/NavbarGeneral.vue'

export default {
  name: 'HospitalesPage',
  components: {
    NavbarComponent
  }
}
</script>
