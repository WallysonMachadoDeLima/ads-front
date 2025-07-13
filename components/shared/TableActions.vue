<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  id: string | number | undefined;
  onView?: (id: string | number) => void;
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
}>();

// Função auxiliar para verificar se o ID é válido
const isValidId = (id: string | number | undefined): id is string | number => {
  return id !== undefined && id !== null && id !== '';
};
</script>

<template>
  <div class="d-flex align-center" style="gap: 6px;">
    <!-- Visualizar -->
    <v-tooltip text="Visualizar" location="bottom" v-if="props.onView && isValidId(props.id)">
      <template #activator="{ props: tooltip }">
        <v-btn
          v-bind="tooltip"
          icon
          size="small"
          color="info"
          @click="() => isValidId(props.id) && props.onView?.(props.id)"
        >
          <v-icon>mdi-eye</v-icon>
        </v-btn>
      </template>
    </v-tooltip>

    <!-- Editar -->
    <v-tooltip text="Editar" location="bottom" v-if="props.onEdit && isValidId(props.id)">
      <template #activator="{ props: tooltip }">
        <v-btn
          v-bind="tooltip"
          icon
          size="small"
          color="warning"
          @click="() => isValidId(props.id) && props.onEdit?.(props.id)"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
    </v-tooltip>

    <!-- Excluir -->
    <v-tooltip text="Excluir" location="bottom" v-if="props.onDelete && isValidId(props.id)">
      <template #activator="{ props: tooltip }">
        <v-btn
          v-bind="tooltip"
          icon
          size="small"
          color="error"
          @click="() => isValidId(props.id) && props.onDelete?.(props.id)"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-tooltip>
  </div>
</template>
