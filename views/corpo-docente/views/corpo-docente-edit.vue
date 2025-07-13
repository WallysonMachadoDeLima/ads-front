<script setup lang="ts">
import CorpoDocenteNewEdit from '../corpo-docente-new-edit.vue';

// Recebe o ID como prop
const props = defineProps<{
  id: string | number;
}>();
</script>

<template>
  <CorpoDocenteNewEdit :current-id="props.id" is-edit />
</template>
