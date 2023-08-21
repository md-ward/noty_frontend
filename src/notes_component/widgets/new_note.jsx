import { gsap } from 'gsap';
import { useRef, useEffect, useState } from 'react';
import { Power3 } from 'gsap/all';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import useNotesStore from '../stateManagementStores/notesStore';
const NewNoteDialog = ({ setisNewNoteOpen }) => {
  const dialogRef = useRef(null);
  const colorsRef = useRef(null);

  const { addNote } = useNotesStore();

  const [noteColor, setNoteColor] = useState('#34D399');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const defaultColorsMap = [
    '#EF4444',
    '#FCD34D',
    '#34D399',
    '#3B82F6'
  ];

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

  const handleNoteSubmit = async () => {
    try {
      const newNote = {
        userId: localStorage.getItem('token'),
        title,
        text,
        noteColor: noteColor,
        tags: []
      };

      await addNote(newNote);

      // Reset the form
      setTitle('');
      setText('');
      setNoteColor('#34D399');
      setisNewNoteOpen(false);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <div
      ref={dialogRef}
      className={`fixed max-sm:my-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2   w-80 sm:w-96 h-96 p-2  rounded-lg  ring-1 ring-black`}
      style={{ backgroundColor: noteColor }}
    >
      <h2 className="text-white text-center text-2xl font-bold mb-4">New Note</h2>
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
          className="custom-scrollbar  resize-none w-full rounded-lg py-2 px-4 mb-4"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </form>

      {/* choose color and confirm sidebar  */}
      <div
        className="ring-black flex sm:flex-col  justify-evenly ring-1 absolute bg-gray-50 rounded-md -top-16 w-80 max-sm:left-0 h-12 sm:h-96 sm:w-12 sm:-right-16 sm:-top-0"
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
        <span className="flex  sm:flex-col justify-center  gap-4  items-center  pt-1" id="colors">
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
            className="absolute z-50  text-white text-center justify-self-center   cursor-pointer    "
            size="xl"
          />
          <span
className="absolute  bg-dark-blue w-8   aspect-square rounded-full  -z-0"
            id="btn"
          ></span>
        </span>
      </div>
    </div>
  );
};

export default NewNoteDialog;