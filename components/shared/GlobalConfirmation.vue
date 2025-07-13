<script setup lang="ts">
import { useConfirmationStore } from '~/stores/confirmation'

const confirmationStore = useConfirmationStore()

const getIcon = (type?: string) => {
  switch (type) {
    case 'error': return 'mdi-delete-alert'
    case 'warning': return 'mdi-alert'
    case 'info': return 'mdi-information'
    default: return 'mdi-help-circle'
  }
}

const getColor = (type?: string) => {
  switch (type) {
    case 'error': return 'error'
    case 'warning': return 'warning'
    case 'info': return 'info'
    default: return 'primary'
  }
}

const handleConfirm = (dialog: any) => {
  confirmationStore.closeDialog(dialog.id, true)
}

const handleCancel = (dialog: any) => {
  confirmationStore.closeDialog(dialog.id, false)
}
</script>

<template>
  <div class="confirmation-dialogs">
    <v-dialog
      v-for="dialog in confirmationStore.dialogs"
      :key="dialog.id"
      :model-value="true"
      :persistent="dialog.persistent"
      max-width="500"
      @update:model-value="!$event && handleCancel(dialog)"
    >
      <v-card>
        <!-- Header -->
        <v-card-title class="d-flex align-center pa-6">
          <v-icon 
            :icon="getIcon(dialog.type)" 
            :color="getColor(dialog.type)"
            size="24"
            class="mr-3"
          />
          <span class="text-h6">{{ dialog.title }}</span>
        </v-card-title>

        <!-- Content -->
        <v-card-text class="pa-6 pt-0">
          <p class="text-body-1 mb-0">{{ dialog.message }}</p>
        </v-card-text>

        <!-- Actions -->
        <v-card-actions class="pa-6 pt-0">
          <v-spacer />
          
          <v-btn
            variant="outlined"
            @click="handleCancel(dialog)"
          >
            {{ dialog.cancelText }}
          </v-btn>
          
          <v-btn
            :color="getColor(dialog.type)"
            variant="elevated"
            @click="handleConfirm(dialog)"
          >
            {{ dialog.confirmText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
.confirmation-dialogs {
  z-index: 10000;
}
</style>
