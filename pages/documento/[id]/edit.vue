<script setup lang="ts">
import { useRoute } from 'vue-router'
import DocumentoEdit from '~/views/documento/views/documento-edit.vue'

const route = useRoute()
const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
</script>

<template>
  <DocumentoEdit :id="id" />
</template>
