import { useEffect } from 'react';
import useTaskStore from '../stateManagementStores/useTaskStore';

const TeamsManagement = () => {
  const {fetchTeamMembers, teams, teamMembers, setTeam, setTeamMember } = useTaskStore();

  useEffect(()=>fetchTeamMembers)
  // Render the teams and team members using the data from the store
  return (
    <div>
      <div>
        {/* Render the list of teams */}
        <ul >
          {teams.map((team) => (
            <li className='w-56 h-12 bg-indigo-400 rounded-lg p-2  text-white text-center uppercase select-none cursor-pointer'  key={team.teamId} onClick={() => setTeam(team.teamId)}>
              {team.teamName}
            </li>
          ))}
        </ul>
      </div>
      <div>
        {/* Render the list of team members */}
        <ul>
          {teamMembers.map((member) => (
            <li key={member._id} onClick={() => setTeamMember(member._id)}>
              {member.name}
            </li>
          ))}
        </ul>
      </div>
      {/* Add your teams management UI and functionalities */}
    </div>
  );
};

export default TeamsManagement;