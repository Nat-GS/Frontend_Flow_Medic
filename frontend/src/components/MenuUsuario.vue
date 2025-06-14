<template>
  <div>
    <NavbarGeneral :mode="'user'" />
    </div>
</template>

<script>
import NavbarGeneral from './NavbarGeneral.vue'

export default {
  name: 'MenuUsuario',
  components: {
    NavbarGeneral,
  },
  
}
</script>

<style scoped>

</style>
