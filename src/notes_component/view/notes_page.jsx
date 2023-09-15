import SideBar from "../../global/sideBar";
import MainContent from "./main_content_page";
import NewNoteDialog from "../widgets/new_note";
import React, { useState } from 'react';



const NotesPage = () => {
  const [isNewNoteOpen, setisNewNoteOpen] = useState(false);
  return (

    <div >

      <div className="grid grid-cols-12 ">


        <MainContent></MainContent>
        <SideBar setisNewNoteOpen={setisNewNoteOpen} isNewNoteOpen={isNewNoteOpen} />
      </div>

      {/* 
      <span className="group  fixed  bottom-3 right-3 sm:right-24 sm:bottom-24 flex flex-row ">
        <p className="bg-black bg-opacity-30 rounded-lg text-center my-auto mx-2 px-1  opacity-0  group-hover:w-full group-hover:opacity-100 ease-in-out duration-300"> {isNewNoteOpen ? 'close' : 'New Note'}</p>

         <img
          onClick={() => setisNewNoteOpen(!isNewNoteOpen)}

          src="/assets/icons/add+.svg"
          className={` text-3xl  bg-white  p-1 rounded-full text-white aspect-square hover:scale-110 hover:shadow-lg cursor-pointer duration-300 ease-in-out ${isNewNoteOpen ? 'rotate-45' : ''}`}

        /> 


      </span> */}


      {isNewNoteOpen && <NewNoteDialog setisNewNoteOpen={setisNewNoteOpen}  isNewNoteOpen={isNewNoteOpen}></NewNoteDialog>
      }
    </div>
  );
}

export default NotesPage;