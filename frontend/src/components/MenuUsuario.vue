<template>
  <div class="cards-wrapper">
    <div class="cards-container">
      <div
        class="card"
        v-for="(card, i) in cards"
        :key="i"
      >
        <div class="card-head">
          <div class="card-product-img">
            <img :src="card.productImg" alt="image" />
          </div>
        </div>

        <div class="card-body">
          <a href="#">
            <h3 class="card-title">{{ card.title }}</h3>
          </a>

          <p class="card-text">{{ card.text }}</p>

          <!-- Botón centrado con color dinámico -->
          <button
            class="status-btn"
            :style="{ backgroundColor: card.available ? '#c7ea46' : '#e00000' }"
          >
            {{ card.available ? 'Disponible' : 'Lleno' }}
          </button>
        </div>

        <!-- Botón pequeño inferior derecho con “•••” -->
        <button
          class="view-btn"
          aria-label="Ver"
          @click="openPopup(i)"
        >
          <span class="dots">•••</span>
        </button>
      </div>
    </div>

    <!-- Popup de opciones -->
    <EstadoPopup
      v-if="popupVisible"
      :card="cards[popupIndex]"
      @close="popupVisible = false"
    />
  </div>
</template>

<script>
import EstadoPopup from './Estado_Popup.vue'

export default {
  name: 'MenuUsuario',
  components: { EstadoPopup },
  data() {
    return {
      popupVisible: false,
      popupIndex: null,
      cards: [
        {
          productImg: require('../assets/arco_iris.jpg'),
          title: 'Hospital Arco Iris',
          text:
            'Villa Fátima Av. 15 de Abril No. 40, La Paz – Bolivia · Teléfono: (+591 2) 221 6021 · Atención Lunes-Domingo 24h.',
          available: true
        },
        {
          productImg: require('../assets/cotahuma.jpg'),
          title: 'Hospital Cotahuma',
          text:
            'Av. Victor Agustín Ugarte Jaime Zudañes · Teléfono: 2 2652767 · Atención Lunes-Domingo 24h.',
          available: false
        },
        {
          productImg: require('../assets/obrero.jpg'),
          title: 'Hospital Obrero No. 1',
          text:
            'Av. Brasil #1745 entre Lucas Jaimes y José Gutiérrez · Teléfono: (591-2) 2223392 · Atención Lunes-Domingo 24h.',
          available: true
        },
        {
          productImg: require('../assets/materno.jpg'),
          title: 'Hospital Materno Infantil',
          text:
            'Calle República Dominicana entre Díaz Romero y Villalobos, Miraflores · Tel: (591-2) 2242424 · Atención Lunes-Domingo 24h.',
          available: false
        }
      ]
    }
  },
  methods: {
    openPopup(index) {
      this.popupIndex = index
      this.popupVisible = true
    }
  }
}
</script>

<style scoped>
/* Quicksand */
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700;800;900&display=swap');

:root {
  --oxford-blue: hsl(217, 54%, 11%);
  --light-oxford-blue: hsl(216, 50%, 16%);
  --indigo-dye: hsl(215, 32%, 27%);
  --blue-yonder: hsl(216, 30%, 55%);
  --white: hsl(0, 0%, 100%);
  --border-color: #68181f;
}

/* Aplica Quicksand */
.cards-wrapper,
.cards-wrapper * {
  font-family: 'Quicksand', sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a {
  text-decoration: none;
}

/* Layout general */
.cards-wrapper {
  background: var(--oxford-blue);
  min-height: 100vh;
  padding: 25px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

/* Contenedor de cards */
.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: center;
  max-width: 1280px;
}

/* Card con borde y sombra reducida */
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  border: 2px solid var(--border-color);
  border-radius: 15px;
  box-shadow:
    4px 10px 15px rgba(0,0,0,0.05),
    0px 20px 20px rgba(0,0,0,0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow:
    4px 15px 20px rgba(0,0,0,0.08),
    0px 25px 30px rgba(0,0,0,0.06);
}

/* Imagen fija en 200px de alto */
.card-product-img {
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  height: 200px;
}
.card-product-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Cuerpo de la card */
.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px 0;
  border-bottom: 1px solid var(--indigo-dye);
  margin-bottom: 12px;
}

.card-title {
  color: #121211;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
  text-align: center;
  transition: color 0.3s ease;
}
.card-title:hover {
  color: #68181f;
}

.card-text {
  color: #121211;
  font-size: 15px;
  line-height: 1.4;
  margin-bottom: 16px;
  text-align: justify;
}

/* Botón “Disponible / Lleno” */
.status-btn {
  align-self: center;
  margin-top: auto;
  padding: 12px 36px;
  color: #ffffff;
  font-weight: 600;
  font-size: 14px;
  border: none;
  border-radius: 40px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.3s;
}
.status-btn:hover {
  transform: translateY(-2px);
}

/* Botón pequeño inferior derecho */
.view-btn {
  position: absolute;
  right: 12px;
  bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: #ac3030;
  border: none;
  border-radius: 50%;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}
.view-btn:hover {
  background-color: #efdbbf;
  transform: translateY(-2px);
}

.dots {
  color: #121211;
  font-size: 18px;
  line-height: 1;
}
</style>
