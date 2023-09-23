import axios from 'axios';
import REACT_APP_API_URL from '../../../env';


// Retrieve all notes with pagination
async function getAllNotes(page = 1, limit = 8) {
  try {
    const userId = localStorage.getItem('token');
    if (!userId) {
      throw new ('Unauthorized');
    } else {
      const response = await axios.get(`${REACT_APP_API_URL}/notes/all_notes/`, {
        params: {
          page,
          limit,
        },
        headers: {
          userId: userId
        }
      });

      const notesList = response.data.notes;
      const currentPage = response.data.currentPage;
      const totalPages = response.data.totalPages;
      const totalItems = response.data.totalItems;

      return { notesList, currentPage, totalItems, totalPages };
    }
  } catch (error) {
    console.error(error);
    throw new Error('Error retrieving notes');
  }
}

// Search notes based on a query
const searchNotes = async (query) => {
  try {
    const userId = localStorage.getItem('token');


    const response = await axios.post(
      `${REACT_APP_API_URL}/notes/search`,
      { query },
      {
        headers: {
          userId: userId,
        },
      }
    );
    const notesList = response.data.notes;
    const totalItems = response.data.totalItems;

    return { notesList, totalItems };
  } catch (error) {
    console.error(error);
    // Handle error
  }
};

// Delete a note
async function deleteNote(noteId) {
  try {
    const userId = localStorage.getItem('token');
    if (!userId) {
      throw new Error('Unauthorized');
    } else {
      const response = await axios.delete(`${REACT_APP_API_URL}/notes/deleteNote`, {
        data: {
          userId: userId,
          noteId: noteId,
        },
      });

      const deletedNote = response.data;
      return deletedNote;
    }
  } catch (error) {
    console.error(error);
    throw new Error('Error deleting note');
  }
}

// Add a new note
async function addNote(newNote) {
  try {
    const userId = localStorage.getItem('token');
    if (!userId) {
      throw new Error('Unauthorized');
    } else {
      const response = await axios.post(`${REACT_APP_API_URL}/notes/add_note/`, newNote);

      const addedNote = response.data;
      return addedNote;
    }
  } catch (error) {
    console.error(error);
    throw new Error('Error adding note');
  }
}

// Update an existing note
async function updateNote(noteId, updatedNote) {
  try {
    const userId = localStorage.getItem('token');
    if (!userId) {
      throw new Error('Unauthorized');
    } else {
      const response = await axios.put(
        `${REACT_APP_API_URL}/notes/update_note/${noteId}`,
        updatedNote
      );

      const updatedNoteData = response.data;
      return updatedNoteData;
    }
  } catch (error) {
    console.error(error);
    throw new Error('Error updating note');
  }
}

export { getAllNotes, deleteNote, addNote, updateNote, searchNotes };