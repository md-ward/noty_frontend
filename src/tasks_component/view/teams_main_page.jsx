import { useState } from 'react';
import Layout from '../../global/view/pages_layout';
import useCollaborationStore from '../stateManagementStores/useCollaborationStore';
import TeamsManagement from '../widgets/teams_management';
import CreateTeamForm from '../widgets/create_team';
import InviteManagement from '../widgets/invitations';

const TeamsPage = () => {
  const { selectedOption, setSelectedOption } = useCollaborationStore();

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <Layout>
      <div className="grid grid-cols-12 grid-rows-6 gap-4 h-full">
        <section className="col-span-12  row-span-5 rounded shadow p-4">
          {selectedOption === 'invite' && <InviteManagement />}
          {selectedOption === 'team' && <TeamsManagement />}
          {selectedOption === 'createTeam' && <CreateTeamForm />}
        </section>
        <TeamsItems handleOptionClick={handleOptionClick} selectedOption={selectedOption} />
      </div>
    </Layout>
  );
};

export default TeamsPage;

const TeamsItems = ({ handleOptionClick, selectedOption }) => {
  return (
    <section className="col-span-12 h-fit bg-slate-100 rounded-lg  row-span-1  shadow flex justify-around">
      <button
        onClick={() => handleOptionClick('invite')}
        className={`p-4 ${selectedOption === 'invite' ? 'text-blue-500' : 'text-gray-500'}`}
      >
        Manage Invitations
      </button>
      <button
        onClick={() => handleOptionClick('team')}
        className={`p-4 ${selectedOption === 'team' ? 'text-blue-500' : 'text-gray-500'}`}
      >
        Manage Teams
      </button>
      <button
        onClick={() => handleOptionClick('createTeam')}
        className={`p-4 ${selectedOption === 'createTeam' ? 'text-blue-500' : 'text-gray-500'}`}
      >
        Create Team
      </button>
    </section>
  );
};