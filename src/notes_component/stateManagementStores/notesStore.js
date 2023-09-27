
import { create } from 'zustand';
import {
  getAllNotes,
  addNote as addNoteAPI,
  deleteNote as deleteNoteAPI,
  updateNote as updateNoteAPI,
  searchNotes,
} from '../controller/notes_contorllers';
import useNotificationStore from '../../global/global_stores/notificationStore';

const useNotesStore = create((set) => ({
  isNewNoteOpen: false,
  setisNewNoteOpen: (state) => { set({ isNewNoteOpen: state }) },



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
        // error: null, // Reset error state if successful
      });
    } catch (error) {


      useNotificationStore.getState().addError(error.message)
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

      });
    } catch (error) {

      useNotificationStore.getState().addError(error.message)

    }


  },

  addNote: async () => {
    try {
      const note = {
        title: useNotesStore.getState().title,
        text: useNotesStore.getState().text,
        noteColor: useNotesStore.getState().noteColor,
      }
      if (useNotesStore.getState().title === '' || useNotesStore.getState().text == '') {

        throw Error('Add a title and text to submit new note '
        )
      }

      else {
        await addNoteAPI(note);
        await useNotesStore.getState().fetchNotes();

        // Reset the form

        useNotificationStore.getState().addNotification('note added successfuly');
        useNotesStore.getState().setTitle('');
        useNotesStore.getState().setText('');
        useNotesStore.getState().setNoteColor('#34D399');
        useNotesStore.getState().setisNewNoteOpen(false);
      }

    } catch (error) {

      useNotificationStore.getState().addError(error.message)

    }

  },

  deleteNote: async (noteId) => {
    try {
      await deleteNoteAPI(noteId);
      await useNotesStore.getState().fetchNotes();
      // set({ error: null }); // Reset error state if successful
      useNotificationStore.getState().addNotification('note deleted successfuly')

    } catch (error) {
      // console.error(error);
      // set({ error: error.message }); // Set error state
      useNotificationStore.getState().addError(error.message)

    }
  },

  updateNote: async (noteId, updatedNote) => {
    try {
      await updateNoteAPI(noteId, updatedNote);
      set((state) => ({
        notes: state.notes.map((note) =>
          note._id === noteId ? { ...note, ...updatedNote } : note
        ),
        // error: null, // Reset error state if successful
      }));
    } catch (error) {
      // console.error(error);
      // set({ error: error.message }); // Set error state
      useNotificationStore.getState().addError(error.message)

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
        // error: null, // Reset error state if successful
      });
    } catch (error) {
      //   console.error(error);
      //   set({ error: error.message }); // Set error state
      useNotificationStore.getState().addError(error.message)

    }
  },
}));

export default useNotesStore;