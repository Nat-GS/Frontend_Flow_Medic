<template>
  <div class="popup-backdrop">
    <div class="popup-wrapper">
      <button class="close-btn" @click="$emit('close')">×</button>
      <div class="popup-content">
        <h2>Estado en emergencias de {{ hospital.nombre }}</h2>

        <p>
          <strong>Tiempo promedio de estancia:</strong>
          {{ hospital.avg_los.toFixed(2) }} minutos
        </p>
        <p v-if="hospital.available">
          Este hospital está <span style="color:green">Disponible</span>
          porque su tiempo medio de estadía
          ({{ hospital.avg_los.toFixed(2) }} min) es menor que el umbral (100 min).
        </p>
        <p v-else>
          Este hospital está <span style="color:red">Lleno</span>
          porque su tiempo medio de estadía
          ({{ hospital.avg_los.toFixed(2) }} min) supera el umbral (100 min).
        </p>

        <!-- animación Lottie -->
        <div ref="lottieContainer" class="lottie-animation"></div>
      </div>
    </div>
  </div>
</template>

<script>
import lottie from 'lottie-web'

export default {
  name: 'EstadoPopup',
  props: {
    hospital: { type: Object, required: true }
  },
  mounted() {
    // carga la animación en el contenedor
    fetch('https://lottie.host/cb610833-aad9-46a4-baa9-58c1ecd21df9/3H3P6HSFGb.json')
      .then(res => res.json())
      .then(animationData => {
        lottie.loadAnimation({
          container: this.$refs.lottieContainer,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData
        })
      })
      .catch(err => {
        console.error('Error cargando animación Lottie:', err)
      })
  }
}
</script>


<style scoped>
.popup-backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex; justify-content: center; align-items: center;
  z-index: 1000;
}
.popup-wrapper {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  width: 320px;
  position: relative;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
.close-btn {
  position: absolute;
  top: 8px; right: 8px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}
.popup-content {
  text-align: center;
}
.popup-content h2 {
  margin-bottom: 12px;
}
.lottie-animation {
  width: 120px;
  height: 120px;
  margin: 0 auto 16px;
}
</style>
