<script setup lang="ts">
import { useNotificationStore } from '~/stores/notification'

const notificationStore = useNotificationStore()

const getColor = (type: string) => {
  switch (type) {
    case 'success': return 'success'
    case 'error': return 'error'
    case 'warning': return 'warning'
    case 'info': return 'info'
    default: return 'info'
  }
}

const getIcon = (type: string) => {
  switch (type) {
    case 'success': return 'mdi-check-circle'
    case 'error': return 'mdi-alert-circle'
    case 'warning': return 'mdi-alert'
    case 'info': return 'mdi-information'
    default: return 'mdi-information'
  }
}
</script>

<template>
  <div class="notification-container">
    <div 
      v-for="notification in notificationStore.notifications"
      :key="notification.id"
      class="notification-item"
    >
      <v-alert
        :type="notification.type"
        :icon="getIcon(notification.type)"
        variant="elevated"
        closable
        class="mb-2"
        @click:close="notificationStore.removeNotification(notification.id)"
      >
        {{ notification.message }}
      </v-alert>
    </div>
  </div>
</template>

<style scoped>
.notification-container {
  position: fixed;
  top: 80px;
  right: 20px;
  z-index: 9999;
  max-width: 400px;
  width: 100%;
}

.notification-item {
  margin-bottom: 8px;
}

@media (max-width: 768px) {
  .notification-container {
    left: 20px;
    right: 20px;
    max-width: none;
  }
}
</style>
