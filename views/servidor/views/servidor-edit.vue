
<script setup lang="ts">
import ServidorNewEdit from '../servidor-new-edit.vue';

// Recebe o ID como prop
const props = defineProps<{
  id: string | number;
}>();
</script>

<template>
  <ServidorNewEdit :current-id="props.id" is-edit />
</template>