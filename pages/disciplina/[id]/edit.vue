<script setup lang="ts">
import { useRoute } from 'vue-router'
import DisciplinaEdit from '~/views/disciplina/views/disciplina-edit.vue'

const route = useRoute()
const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
</script>

<template>
  <DisciplinaEdit :id="id" />
</template>
