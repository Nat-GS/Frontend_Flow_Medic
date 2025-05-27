<template>
  <div class="min-h-screen font-sans">
    <!-- Navbar -->
    <nav class="bg-[#121211] text-[#efdbbf] flex items-center justify-between px-6 py-4 shadow-md">
      <div class="text-3xl font-bold">
        <span class="text-[#efdbbf]">Flow</span><span class="text-[#ac3030]">Medic</span>
      </div>
      <ul class="flex gap-6 text-sm">
        <li><a href="#" class="hover:text-[#ac3030]">Inicio</a></li>
        <li><a href="#" class="hover:text-[#ac3030]">Beneficios</a></li>
        <li><a href="#" class="hover:text-[#ac3030]">Contacto</a></li>
        <li><a href="#" class="hover:text-[#ac3030]">Mi Cuenta</a></li>
        <li><a href="#" class="hover:text-[#ac3030]">Iniciar Sesión</a></li>
      </ul>
    </nav>

    <!-- Hero Section -->
    <section class="relative bg-cover bg-center h-[500px] flex items-center justify-center" style="background-image: url('https://images.unsplash.com/photo-1580281657527-47f249e16408?auto=format&fit=crop&w=1950&q=80');">
      <div class="bg-black bg-opacity-50 p-8 rounded-xl text-center">
        <h1 class="text-4xl md:text-5xl font-semibold text-white mb-4">Encuentra tu Doctor</h1>
        <p class="text-white text-sm md:text-base mb-6">Busca por especialidad, ciudad o seguro</p>
        <div class="bg-white flex rounded-lg overflow-hidden shadow-md max-w-2xl mx-auto">
          <input type="text" placeholder="Escribe especialidad o apellido" class="px-4 py-2 flex-grow outline-none text-black" />
          <select class="px-4 py-2 border-l outline-none text-black">
            <option>Ciudad</option>
            <option>La Paz</option>
            <option>Cochabamba</option>
            <option>Santa Cruz</option>
          </select>
          <select class="px-4 py-2 border-l outline-none text-black">
            <option>Seguro</option>
            <option>CNS</option>
            <option>UNIVIDA</option>
            <option>Particular</option>
          </select>
          <button class="bg-[#ac3030] px-4 py-2 text-white">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="p-6 text-center text-sm bg-[#121211] text-[#efdbbf] border-t border-[#68181f]">
      &copy; 2025 FlowMedic. Todos los derechos reservados.
    </footer>
  </div>
</template>

<script>
export default {
  name: 'FlowMedicLanding',
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
</style>
