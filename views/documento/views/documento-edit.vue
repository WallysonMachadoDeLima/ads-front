<script setup lang="ts">
import DocumentoNewEdit from '../documento-new-edit.vue';

// Recebe o ID como prop
const props = defineProps<{
  id: string | number;
}>();
</script>

<template>
  <DocumentoNewEdit :current-id="props.id" is-edit />
</template>
