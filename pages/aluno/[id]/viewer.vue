<script setup lang="ts">
import { useRoute } from 'vue-router'
import AlunoViewer from '~/views/aluno/views/aluno-viewer.vue'

const route = useRoute()
const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
</script>

<template>
  <AlunoViewer :id="id" />
</template>