<script setup lang="ts">
import { useRoute } from 'vue-router'
import MatrizCurricularEdit from '~/views/matriz-curricular/views/matriz-curricular-edit.vue'

const route = useRoute()
const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
</script>

<template>
  <MatrizCurricularEdit :id="id" />
</template>
