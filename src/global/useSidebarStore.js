import { create } from 'zustand';

const useSidebarStore = create((set) => ({
    isOpen: false,
    toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
    openSidebar: () => set(() => ({ isOpen: true })),
    closeSidebar: () => set(() => ({ isOpen: false })),
}));

export default useSidebarStore;