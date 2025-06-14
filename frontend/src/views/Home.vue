<template>
  <div class="min-h-screen font-sans">
    <NavbarComponent />

        <section class="h-[400px] flex flex-col justify-center items-center bg-[#1F2937] text-white px-4">
  <div class="text-center max-w-2xl">
    <h1 class="text-4xl font-bold mb-4">Bienvenido a FlowMedic</h1>
    <p class="text-lg">Monitorea y predice tiempos de espera en urgencias hospitalarias.</p>
  </div>
</section>



    <!-- sección hospitales -->
    <section class="mt-10">
      <HospitalCards />
    </section>
    <FooterComponent />
  </div>
</template>

<script>
import NavbarComponent from '@/components/NavbarGeneral.vue'
import HospitalCards from '@/components/HospitalCards.vue'
import FooterComponent from '@/components/Footer_Component.vue'

export default {
  name: 'HomePage',
  components: {
    NavbarComponent,
    HospitalCards,
    FooterComponent
  }
}
</script>
