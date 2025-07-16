<script setup lang="ts">
import MatrizCurricularNewEdit from '../matriz-curricular-new-edit.vue';

// Recebe o ID como prop
const props = defineProps<{
  id: string | number;
}>();
</script>

<template>
  <MatrizCurricularNewEdit :current-id="props.id" is-edit />
</template>
