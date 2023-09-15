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



      {isNewNoteOpen && <NewNoteDialog setisNewNoteOpen={setisNewNoteOpen} isNewNoteOpen={isNewNoteOpen}></NewNoteDialog>
      }
    </div>
  );
}

export default NotesPage;