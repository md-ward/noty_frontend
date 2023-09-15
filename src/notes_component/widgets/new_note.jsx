import { gsap } from 'gsap';
import { useRef, useEffect, useState } from 'react';
import { Power3 } from 'gsap/all';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faHashtag, faPlus } from '@fortawesome/free-solid-svg-icons';
import useNotesStore from '../stateManagementStores/notesStore';

const NewNoteDialog = ({ setisNewNoteOpen, oldNoteData, isNoteUpdate }) => {
  const dialogRef = useRef(null);
  const colorsRef = useRef(null);

  const { addNote, noteColor, setNoteColor, title, setTitle, text, setText, AddTag, setAddTag, tags, setTags, tagInput, setTagInput } = useNotesStore();


  const defaultColorsMap = [
    '#EF4444',
    '#FCD34D',
    '#34D399',
    '#3B82F6'
  ];

  // ! animation 
  useEffect(() => {
    const tl = gsap.timeline({ paused: true });
    tl.fromTo(
      dialogRef.current,
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.5, ease: Power3.easeOut }
    );

    tl.fromTo(
      '#colors > *',
      { opacity: 0, yPercent: -10 },
      { opacity: 1, yPercent: 0, stagger: 0.1 },
      0.2
    );

    tl.fromTo('#btn', { opacity: 0 }, { opacity: 1 }, 0.2);

    tl.play();
  }, []);

  useEffect(() => {
    if (isNoteUpdate && oldNoteData) {
      setTitle(oldNoteData.title || '');
      setText(oldNoteData.text || '');
      setNoteColor(oldNoteData.noteColor || '#34D399');
      setTags(oldNoteData.tags || []);
    }
  }, [isNoteUpdate, oldNoteData]);

  const handleNoteSubmit = async () => {
    try {
      const newNote = {
        userId: localStorage.getItem('token'),
        title,
        text,
        noteColor: noteColor,
        tags,
      };

      if (isNoteUpdate && oldNoteData) {
        // Update existing note
        newNote.id = oldNoteData.id;
        await updateNote(newNote);
      } else {
        // Add new note
        await addNote(newNote);
      }

      // Reset the form
      setTitle('');
      setText('');
      setNoteColor('#34D399');
      setTags([]);
      setisNewNoteOpen(false);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
  const handleAddTag = () => {
    if (tagInput.trim() !== '') {
      setTags(tagInput);
      setTagInput('');
    }
  };

  const handleRemoveTag = (index) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };



  return (
    <div
      ref={dialogRef}
      className={`fixed max-sm:my-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 p-2 rounded-lg ring-1 ring-black`}
      style={{ backgroundColor: noteColor }}
    >
      <span className='flex justify-around items-baseline'>
        <h2 className="text-white text-center text-2xl font-bold mb-4">New Note</h2>
        <FontAwesomeIcon icon={faHashtag} size='lg' color='white' className='cursor-pointer rounded-full' bounce onClick={() => setAddTag(!AddTag)} />
      </span>
      <form className="flex flex-col items-center justify-center">
        <input
          type="text"
          placeholder="Title"
          className="w-full rounded-lg py-2 px-4 mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          rows={10}
          placeholder="Note"
          className="custom-scrollbar resize-none w-full rounded-lg py-2 px-4 mb-4"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        {AddTag && (
          <div className="relative w-full " >
            <input
              type="text"
              placeholder="Tags"
              className="w-full rounded-lg py-2 px-4 mb-4"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faPlus}
              size='lg'
              className='text-gray-400 absolute top-3 hover:text-gray-600 right-4 cursor-pointer'
              onClick={handleAddTag}
            />
          </div>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="group bg-white px-2 py-1 rounded-lg text-gray-700 text-sm select-none cursor-pointer duration-200 ease-in-out transition-all"
              >
                {tag}
                <button
                  className="hidden group-hover:inline-block  bg-white rounded-full  w-4 h-4 text-center text-gray-500 hover:text-red-500"
                  onClick={() => handleRemoveTag(index)}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        )}

      </form>

      {/* choose color and confirm sidebar */}
      <div
        className="ring-black flex sm:flex-col justify-evenly ring-1 absolute bg-gray-50 rounded-md -top-16 w-80 max-sm:left-0 h-12 sm:h-96 sm:w-12 sm:-right-16 sm:-top-0"
      >
        <span
          className="relative sm:place-self-center max-sm:my-3"
          data-title="custom color"
        >
          <input
            type="color"
            value={noteColor}
            className="cursor-pointer w-6 h-6 p-1 aspect-square ring-rose-600 ring-2"
            ref={colorsRef}
            onChange={(val) => setNoteColor(val.target.value)}
          />
        </span>

        {/* default colors */}
        <span className="flex sm:flex-col justify-center gap-4 items-center pt-1" id="colors">
          {defaultColorsMap.map((color) => (
            <div
              key={color}
              className="w-6 h-6 rounded-full cursor-pointer hover:ring-1 ring-black"
              style={{ backgroundColor: color }}
              onClick={() => setNoteColor(color)}
            ></div>
          ))}
        </span>
        <span
          className="relative flex justify-center items-center"
          onClick={handleNoteSubmit}
        >
          <FontAwesomeIcon
            icon={faCheck}
            className="absolute z-50 text-white text-center justify-self-center cursor-pointer"
            size="xl"
          />
          <span
            className="absolute bg-dark-blue w-8 aspect-square rounded-full -z-0"
            id="btn"
          ></span>
        </span>
      </div>
    </div>
  );
};

export default NewNoteDialog;