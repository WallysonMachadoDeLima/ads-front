<script setup lang="ts">
import { useRoute } from 'vue-router'
import AlunoEdit from '~/views/aluno/views/aluno-edit.vue'

const route = useRoute()
const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
</script>

<template>
  <AlunoEdit :id="id" />
</template>