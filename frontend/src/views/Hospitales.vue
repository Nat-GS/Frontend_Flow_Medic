<template>
  <div>
    <NavbarComponent />
    <div class="p-8 text-center">
      <h1 class="text-2xl font-bold">Página de Hospitales</h1>
      <p>Lista de hospitales y sus estadísticas.</p>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import NavbarComponent from '@/components/NavbarGeneral.vue'
import FooterComponent from '@/components/Footer_Component.vue'

export default {
  name: 'HospitalesPage',
  components: {
    NavbarComponent,
    FooterComponent
  }
}
</script>
