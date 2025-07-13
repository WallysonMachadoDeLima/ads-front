import { useNotificationStore } from '~/stores/notification'

export const useNotification = () => {
  const notificationStore = useNotificationStore()

  return {
    success: notificationStore.success,
    error: notificationStore.error,
    warning: notificationStore.warning,
    info: notificationStore.info
  }
}
