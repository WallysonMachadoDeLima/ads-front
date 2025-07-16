<script setup lang="ts">
import { useRoute } from 'vue-router'
import DocumentoViewer from '~/views/documento/views/documento-viewer.vue'

const route = useRoute()
const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
</script>

<template>
  <DocumentoViewer :id="id" />
</template>
