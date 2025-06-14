<template>
  <div>
    <NavbarComponent />

    <div class="p-8 text-center">
      <h1 class="text-2xl font-bold">Página de Urgencias</h1>
      <p>Visualización y simulación en tiempo real.</p>
    </div>

    <form @submit.prevent="runSimulation" class="max-w-xl mx-auto space-y-4 p-4">
      <div v-for="(value, key) in form" :key="key" class="flex items-center">
        <label class="w-40 text-right mr-4">{{ key.replace(/_/g, ' ') }}</label>
        <input
          v-if="typeof value === 'number'"
          type="number"
          step="any"
          v-model.number="form[key]"
          class="flex-1 border rounded px-2 py-1"
        />
        <input
          v-else
          type="text"
          v-model="form[key]"
          class="flex-1 border rounded px-2 py-1"
        />
      </div>

      <button
        type="submit"
        class="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Ejecutar Simulación
      </button>
    </form>

    <div v-if="result" class="mt-8 p-4 bg-gray-100 rounded">
      <h2 class="text-xl font-semibold mb-2">Resultados</h2>
      <p><strong>Archivo:</strong> {{ result.file_name }}</p>
      <p><strong>ID en queue:</strong> {{ result.queue_id }}</p>
      <h3 class="mt-4 font-medium">Métricas</h3>
      <pre class="bg-white p-2 rounded">{{ result.metrics }}</pre>
    </div>

    <div v-if="error" class="mt-4 text-red-600">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
import axios from 'axios'
import NavbarComponent from '@/components/NavbarGeneral.vue'

export default defineComponent({
  name: 'UrgenciasPage',
  components: { NavbarComponent },
  setup() {
    // Aquí defines todos los campos que necesita tu API, con valores por defecto
    const form = reactive({
      peak_lambda: 15,
      night_lambda: 12,
      day_lambda: 10,
      triage_mean: 5,
      triage_std: 1,
      consult_mean: 10,
      consult_std: 2,
      diag_xray: 20,
      diag_lab: 30,
      treat_mean: 10,
      treat_std: 2,
      doctors_day: 5,
      doctors_night: 4,
      nurses_day: 9,
      nurses_night: 7,
      beds: 15,
      xray: 2,
      ultrasound: 1,
      priority_critical: 0.2,
      priority_urgent: 0.3,
      priority_non_urgent: 0.5,
      diag_prob: 0.5,
      admit_prob: 0.1,
      num_runs: 500, 
      hospital_id: Number(localStorage.getItem('hospital_id')) || 1
    })

    const result = ref(null)
    const error  = ref(null)

    async function runSimulation() {
      error.value = null
      result.value = null
      try {
        const resp = await axios.post('http://localhost:5000/simulate/', form)
        result.value = resp.data
      } catch (e) {
        error.value = e.response?.data?.error || e.message
      }
    }

    return { form, result, error, runSimulation }
  }
})
</script>

<style scoped>
/* ... */
</style>
