<script setup lang="ts">
// Redireciona para a página de visualização
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id

// Redireciona automaticamente para o viewer
await router.replace(`/documento/${id}/viewer`)
</script>

<template>
  <div>Redirecionando...</div>
</template>