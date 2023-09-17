import React, { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faExpand, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { gsap } from 'gsap';
import useNotesStore from '../stateManagementStores/notesStore';
import NoteDialog from './note_dialog';

const NoteCard = ({ note }) => {
  const { title, text, noteColor, _id, createdAt, tags } = note;
  const { deleteNote } = useNotesStore();
  const formattedDate = new Date(createdAt).toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  const cardRef = useRef(null);
  const [showDialog, setShowDialog] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleDeleteNote = () => {
    if (window.confirm('Do you want to delete this note?')) {
      deleteNote(_id);
    }
  };

  const handleOpenDialog = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleToggleMenu = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  return (
    <div ref={cardRef} className="h-72 w-80 sm:w-full place-self-center rounded-lg shadow-lg bg-white relative">
      <div className="h-8 rounded-t-lg" style={{ backgroundColor: noteColor }}>
        <span className='flex justify-between px-2'>
          <div className="font-bold text-xl text-center mb-2 overflow-x-auto text-white title_scroll">
            {title}
          </div>
          <div className="relative ml-2">
            <FontAwesomeIcon
              icon={faEllipsisV}
              className="h-4 cursor-pointer text-white"
              onClick={handleToggleMenu}
            />
            {showMenu && (
              <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg">
                <div className="flex flex-col p-2">
                  <div className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-gray-200">
                    <FontAwesomeIcon icon={faExpand} className="text-gray-600" />
                    <span>Update</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-gray-200" onClick={handleDeleteNote}>
                    <FontAwesomeIcon icon={faTrash} className="text-gray-600" />
                    <span>Delete</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </span>
      </div>
      <div className="px-6 py-4 h-4/5 overflow-hidden border-l-4 border-r-4" style={{ borderColor: noteColor }}>
        <p className="text-gray-700 text-base">{text}</p>
      </div>
      <div className="rounded-b-lg p-2 flex flex-col justify-between items-center" style={{ backgroundColor: noteColor }}>
        <span className='flex justify-around w-full'>
          <h1 className="text-white">{formattedDate}</h1>
          <span className="flex items-center">
            <img src="/assets/icons/icons8-expand-96.png" className="h-6 cursor-pointer" onClick={handleOpenDialog} />
          </span>
        </span>

      </div>
      {showDialog && (
        <NoteDialog noteColor={noteColor} title={title} text={text} onClose={handleCloseDialog} />
      )}
    </div>
  );
};

export default NoteCard;