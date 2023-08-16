import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SideBar from "../../global/sideBar";
import MainContent from "./main_content_page";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import NewNoteDialog from "../widgets/new_note";
import React, { useState } from 'react';



const NotesPage = () => {
  const [isNewNoteOpen, setisNewNoteOpen] = useState(false);
  return (

    <div>

      <div className="flex">

        <div className="sm:w-24">
          <SideBar />

        </div>
        <div className="w-full ">

          <MainContent></MainContent>
        </div>
      </div>
      <span className="group  absolute  bottom-3 right-3 sm:right-24 sm:bottom-24 flex flex-row ">
        <p className="bg-black bg-opacity-30 rounded-lg text-center my-auto mx-2 px-1  opacity-0  group-hover:w-full group-hover:opacity-100 ease-in-out duration-300"> {isNewNoteOpen ? 'close' : 'New Note'}</p>

        <img
          onClick={() => setisNewNoteOpen(!isNewNoteOpen)}

          src="/assets/icons/add+.svg"
          className={` text-3xl  p-1 rounded-full text-white aspect-square hover:scale-110 hover:shadow-lg cursor-pointer duration-300 ease-in-out ${isNewNoteOpen ? 'rotate-45' : ''}`}

        />

        {/* <FontAwesomeIcon
          onClick={() => setisNewNoteOpen(!isNewNoteOpen)}
          icon={faAdd} 
          className={` text-3xl bg-dark-blue p-1 rounded-full text-white aspect-square hover:scale-110 hover:shadow-lg cursor-pointer duration-300 ease-in-out ${isNewNoteOpen ? 'rotate-45' : ''}`}
          
        /> */}

      </span>
      {isNewNoteOpen && <NewNoteDialog setisNewNoteOpen={setisNewNoteOpen} ></NewNoteDialog>
      }
    </div>
  );
}

export default NotesPage;