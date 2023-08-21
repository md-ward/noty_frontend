import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import NoteCard from '../widgets/note_card';
import useNotesStore from '../stateManagementStores/notesStore';

const MainContent = () => {
  const { notes, fetchNotes, deleteNote } = useNotesStore();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote(noteId);
    } catch (error) {
      console.error(error);
      // Handle error display or other actions
    }
  };

  const notesPerPage = 12;
  const totalPages = Math.ceil(notes.length / notesPerPage);

  // Function to slice the notes array based on the current page
  const getPageNotes = (page) => {
    const startIndex = (page - 1) * notesPerPage;
    const endIndex = startIndex + notesPerPage;
    return notes.slice(startIndex, endIndex);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="col-span-11 justify-center p-4  relative">
      <h2 className="text-lg font-bold mb-4 w-full border-b-2 text-dark-blue font-serif">Your Notes</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {getPageNotes(currentPage).map((note) => (
          <NoteCard key={note._id} note={note} onDeleteNote={handleDeleteNote} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-11 fixed w-full bottom-1">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      )}
    </div>
  );
};

export default MainContent;