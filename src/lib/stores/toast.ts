import { writable } from 'svelte/store';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

const createToastStore = () => {
  const { subscribe, update } = writable<ToastMessage[]>([]);

  function addToast(
    message: string, 
    type: ToastType = 'info', 
    duration: number = 3000,
    position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center' = 'top-right'
  ) {
    const id = Math.random().toString(36).substring(2, 9);
    
    update(toasts => [
      ...toasts,
      { id, type, message, duration, position }
    ]);

    return id;
  }

  function removeToast(id: string) {
    update(toasts => toasts.filter(toast => toast.id !== id));
  }

  function clearToasts() {
    update(() => []);
  }

  return {
    subscribe,
    add: addToast,
    success: (message: string, duration?: number, position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center') => 
      addToast(message, 'success', duration, position),
    error: (message: string, duration?: number, position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center') => 
      addToast(message, 'error', duration, position),
    info: (message: string, duration?: number, position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center') => 
      addToast(message, 'info', duration, position),
    warning: (message: string, duration?: number, position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center') => 
      addToast(message, 'warning', duration, position),
    remove: removeToast,
    clear: clearToasts
  };
};

export const toasts = createToastStore(); 