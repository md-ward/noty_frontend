import { create } from 'zustand';
import {
    getAllNotes,
    addNote as addNoteAPI,
    deleteNote as deleteNoteAPI,
    updateNote as updateNoteAPI,
} from '../controller/notes_contorllers';

const useNotesStore = create((set) => ({
    notes: [],
    fetchNotes: async () => {
        try {
            const notesList = await getAllNotes();
            set({ notes: notesList });
        } catch (error) {
            console.error(error);
            // Handle error display or other actions
        }
    },
    addNote: async (newNote) => {
        try {
            // Add note logic
            const addedNote = await addNoteAPI(newNote);
            set((state) => ({
                notes: [...state.notes, addedNote],
            }));
        } catch (error) {
            console.error(error);
            // Handle error display or other actions
        }
    },
    deleteNote: async (noteId) => {
        try {
            // Delete note logic
            await deleteNoteAPI(noteId);
            set((state) => ({
                notes: state.notes.filter((note) => note._id !== noteId),
            }));
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
}));

export default useNotesStore;