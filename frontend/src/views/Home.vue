<template>
  <div class="homepage">
    <NavbarComponent />

    <!-- Hero Section rediseñada -->
    <section class="hero">
      <!-- IZQUIERDA: Título + CTA -->
      <div class="hero-content">
        <h1>
          ✨ Bienvenido a FlowMedic 🚑
        </h1>
        <button class="booking-btn" @click="goToSimulacion">
          Empezar ahora
        </button>
      </div>

      <!-- DERECHA: Imagen recortada con borde punteado -->
      <div class="hero-image">
        <div class="circular-image">
          <img 
            src="../assets/img_header.png" 
            alt="Interior hospitalario" 
          />
        </div>
      </div>
    </section>

    <!-- Resto de secciones… -->
    <section class="features">…</section>
    <section class="services">
  <!-- Header con guiones decorativos -->
  <div class="service-header">
    <h2 class="service-title">
      <span class="dash">~</span>
      ✨ Servicios Disponibles ✨
      <span class="dash">~</span>
    </h2>
  </div>

  <!-- Grid de tarjetas con blobs -->
  <div class="service-grid">
    <div class="service-card">
      <div class="blob"></div>
      <div class="card-content">
        <h3>Simulaciones de flujos hospitalarios</h3>
        <p>Algoritmos que modelan y optimizan el tránsito en urgencias.</p>
      </div>
    </div>
    <div class="service-card">
      <div class="blob"></div>
      <div class="card-content">
        <h3>Visualización de datos</h3>
        <p>Inspección de información.</p>
      </div>
    </div>
    <div class="service-card">
      <div class="blob"></div>
      <div class="card-content">
        <h3>Gestión de usuarios y hospitales</h3>
        <p>Administra accesos, perfiles y permisos desde un solo panel.</p>
      </div>
    </div>
  </div>
</section>

    <FooterComponent />
  </div>
</template>


<script>
import NavbarComponent from '@/components/NavbarGeneral.vue'
import FooterComponent from '@/components/Footer_Component.vue'

export default {
  name: 'HomePage',
  components: {
    NavbarComponent,
    FooterComponent
  },
  methods: {
    goToSimulacion() {
      this.$router.push('/urgencias')
    }
  }
}
</script>

<style scoped>
/* --- Hero Container --- */
.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3rem 1rem;
  background: #fff;
  flex-wrap: wrap;
}

/* Texto + CTA */
.hero-content {
  flex: 1 1 350px;
}
.hero-content h1 {
  font-size: 2.8rem;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
}
.thumbnail {
  display: inline-block;
  margin-left: 0.75rem;
}
.thumbnail img {
  width: 80px;
  height: 48px;
  object-fit: cover;
  border-radius: 30px 20px;
}

/* Botón estilo “pill” */
.booking-btn {
  display: inline-block;
  background: #ac3030;         /* igual que --primary del ejemplo */
  color: white;              /* --dark */
  padding: 0.9rem 2rem;
  font-size: 1.125rem;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  transition: background 0.3s;
}
.booking-btn:hover {
  background: #68181f;
}

/* Imagen recortada con borde punteado */
.hero-image {
  flex: 1 1 400px;
  position: relative;
  min-height: 300px;
}
.circular-image {
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  margin: auto;
  width: 100%;
  height: 100%;
  border-radius: 190px 0 0 140px;
  border-top: 3px dotted #979696;
  border-left: 3px dotted #979696;
  border-bottom: 3px dotted #979696;
  overflow: hidden;
  padding: 0.5rem;
}
.circular-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 180px 0 0 135px;
}

/* Responsive */
@media (max-width: 768px) {
  .hero {
    flex-direction: column;
    gap: 2rem;
  }
  .hero-image {
    height: 250px;
  }
}
/* Servicios con blobs de fondo */
.services {
  padding: 60px 20px;
  background: #ffffff;
}

.service-header {
  text-align: center;
  margin-bottom: 40px;
}

.service-title {
  font-size: 2rem;
  font-weight: bold;
}

.service-title .dash {
  margin: 0 0.5rem;
  color: #734e96; /* puedes ajustar al color primario de tu paleta */
}

/* Grid responsivo */
.service-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
}

/* Cada tarjeta */
.service-card {
  position: relative;
  width: 300px;
  padding: 2.5rem 1.5rem;
  overflow: hidden;
  border-radius: 12px;
  background: transparent;
}

/* Blob de fondo */
.service-card .blob {
  position: absolute;
  top: -20%;
  left: -10%;
  width: 140%;
  height: 140%;
  background: #efdbbf;  
  border-radius: 50% 40% 60% 50%;
  z-index: 0;
}

/* Contenido encima del blob */
.service-card .card-content {
  position: relative;
  z-index: 1;
}

.service-card h3 {
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
  color: #333333;
}

.service-card p {
  font-size: 0.95rem;
  line-height: 1.5;
  color: #555555;
}

/* Ajustes móviles */
@media (max-width: 768px) {
  .service-grid {
    flex-direction: column;
    align-items: center;
  }
}

</style>

