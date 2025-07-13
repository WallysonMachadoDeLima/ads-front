<script setup lang="ts">
import { useRoute } from 'vue-router'
import ServidorViewer from '~/views/servidor/views/servidor-viewer.vue'

const route = useRoute()
const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
</script>

<template>
  <ServidorViewer :id="id" />
</template>