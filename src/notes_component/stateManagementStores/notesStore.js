import React from 'react';
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

  error: null,
  setError: (error) => set({ error }),

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
        error: null, // Reset error state if successful
      });
    } catch (error) {
      console.error(error);
      set({ error: error.message }); // Set error state
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

      set({
        notes: notesList ?? [],
        totalItems,
        error: null, // Reset error state if successful
      });
    } catch (error) {
      console.error(error);
      set({ error: error.message }); // Set error state
    }
  },

  addNote: async (newNote) => {
    try {
      const addedNote = await addNoteAPI(newNote);
      await useNotesStore.getState().fetchNotes();
      set({ error: null }); // Reset error state if successful
    } catch (error) {
      console.error(error);
      set({ error: error.message }); // Set error state
    }
  },

  deleteNote: async (noteId) => {
    try {
      await deleteNoteAPI(noteId);
      await useNotesStore.getState().fetchNotes();
      set({ error: null }); // Reset error state if successful
    } catch (error) {
      console.error(error);
      set({ error: error.message }); // Set error state
    }
  },

  updateNote: async (noteId, updatedNote) => {
    try {
      await updateNoteAPI(noteId, updatedNote);
      set((state) => ({
        notes: state.notes.map((note) =>
          note._id === noteId ? { ...note, ...updatedNote } : note
        ),
        error: null, // Reset error state if successful
      }));
    } catch (error) {
      console.error(error);
      set({ error: error.message }); // Set error state
    }
  },

  setCurrentPage: async (page) => {
    try {
      set({ currentPage: page });
      const { notesList, totalPages, totalItems } = await getAllNotes(page);
      set({
        notes: notesList,
        totalPages,
        totalItems,
        error: null, // Reset error state if successful
      });
    } catch (error) {
      console.error(error);
      set({ error: error.message }); // Set error state
    }
  },
}));

export default useNotesStore;