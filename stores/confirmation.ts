import { defineStore } from 'pinia'

interface ConfirmationOptions {
  title?: string
  message: string
  confirmText?: string
  cancelText?: string
  type?: 'warning' | 'error' | 'info'
  persistent?: boolean
}

interface ConfirmationDialog extends ConfirmationOptions {
  id: number
  resolve: (confirmed: boolean) => void
}

export const useConfirmationStore = defineStore('confirmation', () => {
  const dialogs = ref<ConfirmationDialog[]>([])
  let dialogId = 0

  const confirm = (options: ConfirmationOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      const id = ++dialogId
      const dialog: ConfirmationDialog = {
        id,
        title: options.title || 'Confirmação',
        message: options.message,
        confirmText: options.confirmText || 'Confirmar',
        cancelText: options.cancelText || 'Cancelar',
        type: options.type || 'warning',
        persistent: options.persistent || false,
        resolve
      }
      
      dialogs.value.push(dialog)
    })
  }

  const closeDialog = (id: number, confirmed: boolean) => {
    const index = dialogs.value.findIndex(d => d.id === id)
    if (index > -1) {
      const dialog = dialogs.value[index]
      dialog.resolve(confirmed)
      dialogs.value.splice(index, 1)
    }
  }

  // Métodos específicos para diferentes tipos de confirmação
  const confirmDelete = (itemName: string = 'este item'): Promise<boolean> => {
    return confirm({
      title: 'Confirmar Exclusão',
      message: `Deseja realmente excluir ${itemName}?`,
      confirmText: 'Excluir',
      cancelText: 'Cancelar',
      type: 'error',
      persistent: true
    })
  }

  const confirmAction = (message: string, title?: string): Promise<boolean> => {
    return confirm({
      title: title || 'Confirmação',
      message,
      confirmText: 'Confirmar',
      cancelText: 'Cancelar',
      type: 'warning'
    })
  }

  return {
    dialogs: readonly(dialogs),
    confirm,
    closeDialog,
    confirmDelete,
    confirmAction
  }
})
