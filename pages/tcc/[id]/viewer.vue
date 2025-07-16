<script setup lang="ts">
import { useRoute } from 'vue-router'
import TccViewer from '~/views/tcc/views/tcc-viewer.vue'

const route = useRoute()
const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
</script>

<template>
  <TccViewer :id="id" />
</template>
