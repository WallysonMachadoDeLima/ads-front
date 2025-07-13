<script setup lang="ts">
import { useRoute } from 'vue-router'
import CorpoDocenteEdit from '~/views/corpo-docente/views/corpo-docente-edit.vue'

const route = useRoute()
const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
</script>

<template>
  <CorpoDocenteEdit :id="id" />
</template>
