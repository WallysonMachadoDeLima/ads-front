<script setup lang="ts">
import { useRoute } from 'vue-router'
import CorpoDocenteViewer from '~/views/corpo-docente/views/corpo-docente-viewer.vue'

const route = useRoute()
const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
</script>

<template>
  <CorpoDocenteViewer :id="id" />
</template>
