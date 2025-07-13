import { useConfirmationStore } from '~/stores/confirmation'

export const useConfirmation = () => {
  const confirmationStore = useConfirmationStore()

  return {
    confirm: confirmationStore.confirm,
    confirmDelete: confirmationStore.confirmDelete,
    confirmAction: confirmationStore.confirmAction
  }
}
