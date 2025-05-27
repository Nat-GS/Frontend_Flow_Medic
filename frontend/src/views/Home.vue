<template>
  <div class="min-h-screen font-sans">
    <NavbarComponent />

    <section class="h-[400px] flex items-center justify-center bg-[#121211] text-white">
      <div class="text-center">
        <h1 class="text-4xl font-bold mb-4">Bienvenido a FlowMedic</h1>
        <p>Monitorea y predice tiempos de espera en urgencias hospitalarias.</p>
      </div>
    </section>
  </div>
</template>

<script>
import NavbarComponent from '@/components/NavbarGeneral.vue'

export default {
  name: 'HomePage',
  components: {
    NavbarComponent
  }
}
</script>
