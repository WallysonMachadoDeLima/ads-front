<script setup lang="ts">
import { useRoute } from 'vue-router'
import ServidorEdit from '~/views/servidor/views/servidor-edit.vue'

const route = useRoute()
const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
</script>

<template>
  <ServidorEdit :id="id" />
</template>