<template>
  <div>
    <NavbarGeneral :mode="'user'" />

    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4 text-center">Menú Principal del Usuario</h1>

      <!-- Botón para ir a generar simulación -->
      <div class="flex justify-center mb-6">
        <button
          @click="goToSimulacion"
          class="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Generar Simulación
        </button>
      </div>

      <!-- Tabla de archivos -->
      <div v-if="files.length > 0" class="overflow-x-auto">
        <h2 class="text-xl font-semibold mb-2">Archivos Generados</h2>
        <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead class="bg-gray-200 text-gray-700">
            <tr>
              <th class="py-2 px-4 text-left">Archivo JSON</th>
              <th class="py-2 px-4 text-left">Ver JSON</th>
              <th class="py-2 px-4 text-left">Descargar CSV</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="file in files" :key="file" class="border-b">
              <td class="py-2 px-4">{{ file }}</td>
              <td class="py-2 px-4">
                <a
                  :href="`${apiUrl}/app/output/simulations/${file}`"
                  target="_blank"
                  class="text-blue-600 underline hover:text-blue-800"
                >
                  Ver JSON
                </a>
              </td>
              <td class="py-2 px-4">
                <button
                  @click="descargarCSVDesdeJSON(file)"
                  class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Descargar CSV
                </button>
                <button
                  @click="previsualizarCSV(file)"
                  class="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                >
                  Previsualizar CSV
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="text-center mt-6 text-gray-500">
        No se encontraron archivos generados para tu hospital.
      </div>
    </div>
  </div>
  <!-- Modal de previsualización -->
<div v-if="mostrarPreview" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div class="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-5xl overflow-auto max-h-[80vh]">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-xl font-bold">Vista previa del CSV</h3>
      <button @click="cerrarPreview" class="text-red-500 font-bold text-lg">✖</button>
    </div>

    <table class="min-w-full border text-sm">
      <thead>
        <tr>
          <th v-for="col in columnasPreview" :key="col" class="border px-2 py-1 bg-gray-200">{{ col }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(fila, index) in filasPreview" :key="index">
          <td v-for="col in columnasPreview" :key="col" class="border px-2 py-1">{{ fila[col] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

</template>

<script>
import axios from 'axios'
import NavbarGeneral from './NavbarGeneral.vue'
const apiUrl = process.env.VITE_API_URL;
export default {
  name: 'MenuUsuario',
  components: {
    NavbarGeneral
  },
  data() {
    return {
      files: [],
      mostrarPreview: false,
      columnasPreview: [],
      filasPreview: []

    }
  },
  methods: {
    async previsualizarCSV(nombreArchivoJson) {
  try {
    const response = await axios.get(`${apiUrl}/app/output/simulations/${nombreArchivoJson}`)
    const jsonData = response.data
    const registros = jsonData.records

    if (!Array.isArray(registros) || registros.length === 0) {
      throw new Error('El JSON no contiene registros válidos.')
    }

    this.columnasPreview = Object.keys(registros[0])
    this.filasPreview = registros
    this.mostrarPreview = true
  } catch (error) {
    console.error('❌ Error al cargar la vista previa:', error)
    alert('No se pudo cargar la vista previa del CSV.')
  }
},
cerrarPreview() {
  this.mostrarPreview = false
  this.columnasPreview = []
  this.filasPreview = []
},
    async fetchFiles() {
      const hospitalId = localStorage.getItem('hospital_id')
      if (!hospitalId) {
        console.warn('Hospital ID no encontrado en localStorage.')
        return
      }

      try {
        const response = await axios.get(`${apiUrl}/queue/files/${hospitalId}`)
        this.files = response.data.files || []
      } catch (error) {
        console.error('Error al obtener archivos:', error)
      }
    },

    async descargarCSVDesdeJSON(nombreArchivoJson) {
      try {
        const response = await axios.get(`${apiUrl}/app/output/simulations/${nombreArchivoJson}`)
        const jsonData = response.data

        const registros = jsonData.records
        if (!Array.isArray(registros) || registros.length === 0) {
          throw new Error('El JSON no contiene registros válidos.')
        }

        const keys = Object.keys(registros[0])
        const csvRows = [
          keys.join(','), // encabezado
          ...registros.map(obj => keys.map(k => JSON.stringify(obj[k] || '')).join(','))
        ]

        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' })
        const url = URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', nombreArchivoJson.replace('.json', '.csv'))
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)

        console.log('✅ CSV generado y descargado desde el frontend.')
      } catch (error) {
        console.error('❌ Error al obtener o convertir JSON:', error)
        alert('No se pudo convertir el JSON a CSV.')
      }
    },

    goToSimulacion() {
      this.$router.push('/urgencias')
    }
  },
  mounted() {
    this.fetchFiles()
  }
}
</script>

<style scoped>
table {
  border-collapse: collapse;
}
th, td {
  border: 1px solid #e5e7eb;
}
</style>
