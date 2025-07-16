<script setup lang="ts">
import { useRoute } from 'vue-router'
import MatrizCurricularViewer from '~/views/matriz-curricular/views/matriz-curricular-viewer.vue'

const route = useRoute()
const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
</script>

<template>
  <MatrizCurricularViewer :id="id" />
</template>
