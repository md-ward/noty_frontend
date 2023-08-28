import { create } from 'zustand';

const useSidebarStore = create((set) => ({
    isOpen: true,
    toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
    openSidebar: () => set(() => ({ isOpen: true })),
    closeSidebar: () => set(() => ({ isOpen: false })),
}));

export default useSidebarStore;