<script setup lang="ts">
import { useRoute } from 'vue-router'
import DisciplinaViewer from '~/views/disciplina/views/disciplina-viewer.vue'

const route = useRoute()
const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
</script>

<template>
  <DisciplinaViewer :id="id" />
</template>
