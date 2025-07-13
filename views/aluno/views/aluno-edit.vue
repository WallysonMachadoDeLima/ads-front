<script setup lang="ts">
import AlunoNewEdit from '../aluno-new-edit.vue';

// Recebe o ID como prop
const props = defineProps<{
  id: string | number;
}>();
</script>

<template>
  <AlunoNewEdit :current-id="props.id" is-edit />
</template>
