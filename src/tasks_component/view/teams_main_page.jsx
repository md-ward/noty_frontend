import Layout from '../../global/view/pages_layout';
import useCollaborationStore from '../stateManagementStores/useCollaborationStore';
import TeamsManagement from '../widgets/teams_management';
import CreateTeamForm from '../widgets/create_team'; // Import the CreateTeamForm component

const TeamsPage = () => {
  const { selectedOption, setSelectedOption } = useCollaborationStore();

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <Layout>
      <div className="grid grid-cols-12 gap-4 h-full">
        <section className="col-span-10  rounded shadow  p-4">
          {selectedOption === 'invite' && <InviteManagement />}
          {selectedOption === 'team' && <TeamsManagement />}
          {selectedOption === 'createTeam' && <CreateTeamForm />} {/* Render CreateTeamForm when selectedOption is 'createTeam' */}
        </section>
        <TeamsItems handleOptionClick={handleOptionClick} />
      </div>
    </Layout>
  );
};

export default TeamsPage;

const TeamsItems = ({ handleOptionClick }) => {
  return (
    <section className="col-span-2">
      <div className="flex flex-col space-y-4 justify-center h-full">
        <div className="p-4 bg-white rounded shadow">
          <h3 className="text-lg font-semibold text-center mb-2">Manage Invitations</h3>
          <button
            onClick={() => handleOptionClick('invite')}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2 transition-colors duration-300 mx-auto block"
          >
            Manage
          </button>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h3 className="text-lg font-semibold text-center mb-2">Manage Teams</h3>
          <button
            onClick={() => handleOptionClick('team')}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2 transition-colors duration-300 mx-auto block"
          >
            Manage
          </button>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h3 className="text-lg font-semibold text-center mb-2">Create Team</h3>
          <button
            onClick={() => handleOptionClick('createTeam')} // Set selectedOption to 'createTeam' when the button is clicked
            className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2 transition-colors duration-300 mx-auto block"
          >
            Create
          </button>
        </div>
      </div>
    </section>
  );
};

const InviteManagement = () => {
  return (
    <div>
      <h1>Invite Management</h1>
      {/* Add your invitation management content here */}
    </div>
  );
};