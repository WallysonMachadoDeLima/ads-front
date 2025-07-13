import { defineStore } from 'pinia'

export type NotificationType = 'success' | 'error' | 'warning' | 'info'

interface Notification {
  id: number
  message: string
  type: NotificationType
  timeout: number
}

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref<Notification[]>([])
  let notificationId = 0

  const addNotification = (message: string, type: NotificationType = 'info', timeout: number = 5000) => {
    const id = ++notificationId
    const notification: Notification = {
      id,
      message,
      type,
      timeout
    }
    
    notifications.value.push(notification)
    
    // Auto remove after timeout
    if (timeout > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, timeout)
    }
    
    return id
  }

  const removeNotification = (id: number) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  const success = (message: string, timeout?: number) => addNotification(message, 'success', timeout)
  const error = (message: string, timeout?: number) => addNotification(message, 'error', timeout)
  const warning = (message: string, timeout?: number) => addNotification(message, 'warning', timeout)
  const info = (message: string, timeout?: number) => addNotification(message, 'info', timeout)

  return {
    notifications: readonly(notifications),
    addNotification,
    removeNotification,
    success,
    error,
    warning,
    info
  }
})
