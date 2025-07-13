<script setup lang="ts">
import DisciplinaNewEdit from '../disciplina-new-edit.vue';

// Recebe o ID como prop
const props = defineProps<{
  id: string | number;
}>();
</script>

<template>
  <DisciplinaNewEdit :current-id="props.id" is-edit />
</template>
