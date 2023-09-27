import MainContent from "./main_content_page";
import NewNoteDialog from "../widgets/new_note";
import useNotesStore from "../stateManagementStores/notesStore";
import Layout from "../../global/view/pages_layout";



const NotesPage = () => {
  const { isNewNoteOpen } = useNotesStore();
  return (

    < >

      <Layout children={<MainContent />} />


      {isNewNoteOpen && <NewNoteDialog ></NewNoteDialog>
      }
    </>
  );
}

export default NotesPage;