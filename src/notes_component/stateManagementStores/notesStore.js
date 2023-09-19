import { create } from 'zustand';
import {
  getAllNotes,
  addNote as addNoteAPI,
  deleteNote as deleteNoteAPI,
  updateNote as updateNoteAPI,
  searchNotes,
} from '../controller/notes_contorllers';

const useNotesStore = create((set) => ({
  // ! Adding a new note ............
  noteColor: '#34D399',
  setNoteColor: (state) => set({ noteColor: state }),

  title: '',
  setTitle: (state) => set({ title: state }),

  text: '',
  setText: (state) => set({ text: state }),



  //? Notes and pagination
  notes: [],
  currentPage: 1,
  totalPages: 0,
  totalItems: 0,

  // ! Search functionality ...............
  showSearchInput: false,
  setShowSearchInput: (state) => set({ showSearchInput: state }),
  searchQuery: '',
  setSearchQuery: (state) => set({ searchQuery: state }),

  fetchNotes: async () => {
    try {
      const { notesList, currentPage, totalPages, totalItems } = await getAllNotes(
        useNotesStore.getState().currentPage
      );
      set({
        notes: notesList,
        currentPage,
        totalPages,
        totalItems,
      });
    } catch (error) {
      console.error(error);
      // Handle error display or other actions
    }
  },

  fetchSearchNotes: async () => {
    try {
      const query = useNotesStore.getState().searchQuery;
      if (query.trim() === '') {
        // If the search query is empty, fetch all notes
        await useNotesStore.getState().fetchNotes();
        return;
      }

      const { notesList, totalItems } = await searchNotes(query);

      // console.warn(notesList)
      set({
        notes: notesList ?? [],
        totalItems: totalItems,
      });
      // console.warn(notes)
    } catch (error) {
      console.error(error);
      // Handle error display or other actions
    }
  },

  addNote: async (newNote) => {
    try {
      // Add note logic
      const addedNote = await addNoteAPI(newNote);
      await useNotesStore.getState().fetchNotes()

      // set((state) => ({
      //   notes: [...state.notes, addedNote],
      //   totalItems: state.totalItems + 1, // Increment totalItems by 1
      // }));
    } catch (error) {
      console.error(error);
      // Handle error display or other actions
    }
  },

  deleteNote: async (noteId) => {
    try {
      // Delete note logic
      await deleteNoteAPI(noteId);
      // set((state) => ({
      //   notes: state.notes.filter((note) => note._id !== noteId),
      //   totalItems: state.totalItems - 1, // Decrement totalItems by 1
      // }));
      await useNotesStore.getState().fetchNotes()
    } catch (error) {
      console.error(error);
      // Handle error display or other actions
    }
  },

  updateNote: async (noteId, updatedNote) => {
    try {
      // Update note logic
      await updateNoteAPI(noteId, updatedNote);
      set((state) => ({
        notes: state.notes.map((note) =>
          note._id === noteId ? { ...note, ...updatedNote } : note
        ),
      }));
    } catch (error) {
      console.error(error);
      // Handle error display or other actions
    }
  },

  setCurrentPage: async (page) => {
    try {
      set({ currentPage: page });
      const { notesList, totalPages, totalItems } = await getAllNotes(page);
      // console.warn(totalItems, totalPages, notesList)
      set({
        notes: notesList,
        totalPages,
        totalItems,
      });
    } catch (error) {
      console.error(error);
      // Handle error display or other actions
    }
  },
}));

export default useNotesStore;