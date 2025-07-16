<script setup lang="ts">
import TccNewEdit from '../tcc-new-edit.vue';

// Recebe o ID como prop
const props = defineProps<{
  id: string | number;
}>();
</script>

<template>
  <TccNewEdit :current-id="props.id" is-edit />
</template>
