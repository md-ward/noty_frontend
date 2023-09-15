import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { gsap } from 'gsap';
import NoteCard from '../widgets/note_card';
import useNotesStore from '../stateManagementStores/notesStore';
import useSidebarStore from '../../global/useSidebarStore';

const MainContent = () => {
  const { notes, fetchNotes, deleteNote, currentPage, totalPages, setCurrentPage, showSearchInput, setSearchQuery, searchQuery } = useNotesStore();
  const { isOpen } = useSidebarStore();
  const searchInputRef = useRef(null);

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

  //! Controlling Search Functionality..........

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async () => {
    if (searchQuery.trim() !== '') {
      // Perform search logic
      try {
        const { notesList, currentPage, totalPages, totalItems } = await searchNotes(searchQuery);
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
    } else {
      // If search query is empty, fetch all notes
      fetchNotes();
    }
  };


  // ? search animation........
  useEffect(() => {
    // GSAP animation for search input
    const animationDuration = 0.4;

    if (showSearchInput) {
      gsap.to(searchInputRef.current, {
        width: '350',
        duration: animationDuration,
      });
    } else {
      gsap.to(searchInputRef.current, {
        width: 0,
        duration: animationDuration,
        onComplete: () => {
          setSearchQuery('');
          searchInputRef.current.classList.add('hidden'); // Add the "hidden" class when animation is complete
        },
      });
    }
  }, [showSearchInput]);

  useEffect(() => {
    // Remove the "hidden" class when search input is shown
    if (showSearchInput) {
      searchInputRef.current.classList.remove('hidden');
    }
  }, [showSearchInput]);


  return (
    <div className={`sm:col-span-11 ${isOpen ? 'col-span-10' : 'col-span-12'}   p-1 sm:p-4 relative overflow-y-auto h-screen custom-scrollbar`}>


      <span className='w-full  flex justify-end'>
        <input
          ref={searchInputRef}
          type="search"
          placeholder='Search notes'
          className=" m-2 px-4 py-2 border border-indigo-800 focus:border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={handleSearchInputChange}
        />
      </span>


      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {notes.map((note) => (
          <NoteCard key={note._id} note={note} onDeleteNote={handleDeleteNote} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-7 fixed bottom-1 left-0 right-0">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
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