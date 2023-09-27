import {create} from 'zustand';

const useNotificationStore = create((set) => ({
  notifications: [],
  errors: [],
  addNotification: (message) => {
    set((state) => ({
      notifications: [
        ...state.notifications,
        { id: Date.now(), message: message },
      ],
    }));
  },
  addError: (message) => {
    set((state) => ({
      errors: [...state.errors, { id: Date.now(), message: message }],
    }));
  },
  dismissNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter(
        (notification) => notification.id !== id
      ),
    }));
  },
  dismissError: (id) => {
    set((state) => ({
      errors: state.errors.filter((error) => error.id !== id),
    }));
  },
}));

export default useNotificationStore;