<script setup lang="ts">
import { useRoute } from 'vue-router'
import TccEdit from '~/views/tcc/views/tcc-edit.vue'

const route = useRoute()
const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
</script>

<template>
  <TccEdit :id="id" />
</template>
