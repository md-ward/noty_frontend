import React, { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faExpand } from '@fortawesome/free-solid-svg-icons';
import { gsap } from 'gsap';
import useNotesStore from '../stateManagementStores/notesStore';
import NoteDialog from './note_dialog';

const NoteCard = ({ note }) => {
  const { title, text, noteColor, _id, createdAt } = note;
  const { deleteNote } = useNotesStore();
  const [showDialog, setShowDialog] = useState(false);
  const formattedDate = new Date(createdAt).toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });


  const handleDeleteNote = () => {
    deleteNote(_id);
  };

  const handleOpenDialog = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  return (
    <div className="h-72 rounded-lg shadow-lg bg-white">
      <div className="h-8  rounded-t-lg" style={{ backgroundColor: noteColor }}>
        <div className="font-bold text-xl text-center mb-2 overflow-x-auto text-white">
          {title}
        </div>
      </div>
      <div className="px-6 py-4 h-4/5 overflow-hidden border-l-4 border-r-4 " style={{ borderColor: noteColor }}>
        <p className="text-gray-700 text-base ">{text}</p>
      </div>
      <div className=" rounded-b-lg p-2 flex justify-around  items-center" style={{ backgroundColor: noteColor }} >
        <h1>{formattedDate}</h1>
        <span className='flex items-center'>
          <img src="/assets/icons/icons8-delete.svg" className="h-9 cursor-pointer" onClick={handleDeleteNote} />
          <img src="/assets/icons/icons8-expand-96.png" className="h-6 cursor-pointer" onClick={handleOpenDialog} />
        </span>
      </div>
      {showDialog && (
        <NoteDialog noteColor={noteColor} title={title} text={text} onClose={handleCloseDialog} />
      )}
    </div>
  );
};

export default NoteCard;