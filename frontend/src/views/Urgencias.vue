<template>
  <div>
    <NavbarComponent />
    <div class="p-8 text-center">
      <h1 class="text-2xl font-bold">Página de Urgencias</h1>
      <p>Visualización y simulación en tiempo real.</p>
    </div>
  </div>
</template>

<script>
import NavbarComponent from '@/components/NavbarGeneral.vue'

export default {
  name: 'UrgenciasPage',
  components: {
    NavbarComponent
  }
}
</script>
