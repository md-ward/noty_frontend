import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

import useTaskStore from '../stateManagementStores/useTaskStore';
import CreateTeamForm from './create_team';
import useCollaborationStore from '../stateManagementStores/useCollaborationStore';

const TeamsManagement = () => {
  const { selectedTeam, setSelectedTeam
    , toggleTeamForm, sendInvitation,setEmail } = useCollaborationStore()

  const { fetchTeamMembers, teams } = useTaskStore();
  const [currentPage, setCurrentPage] = useState(1);
  const teamsPerPage = 4; // Number of teams to display per page

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const handleTeamClick = (teamId) => {
    if (selectedTeam === teamId) {
      // If the same team is clicked again, navigate back to show all teams
      navigateBack();
    } else {
      setSelectedTeam(teamId);

      // Animation to hide other teams and expand the selected one
      gsap.to('.team-card:not(.selected)', {
        opacity: 0,
        height: 0,
        ease: 'power2.inOut',
        duration: 0.3,
      });
      gsap.to(`#team-${teamId}`, {
        opacity: 1,
        height: 'auto',
        ease: 'power2.inOut',
        duration: 0.3,
      });
    }
  };

  const navigateBack = () => {
    setSelectedTeam(null);

    // Animation to show all teams
    gsap.to('.team-card', {
      opacity: 1,
      height: 'auto',
      ease: 'power2.inOut',
      duration: 0.3,
    });
  };

  const getTeamMembers = (teamId) => {
    const selectedTeamObj = teams.find((team) => team.teamId === teamId);
    return selectedTeamObj ? selectedTeamObj.members : [];
  };

  // Calculate the index of the last team to display on the current page
  const indexOfLastTeam = currentPage * teamsPerPage;
  // Calculate the index of the first team to display on the current page
  const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
  // Get the teams to display on the current page
  const currentTeams = teams.slice(indexOfFirstTeam, indexOfLastTeam);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="grid grid-rows-2 h-full w-full">
      {/* Show teams */}
      <section className="flex flex-wrap h-full justify-center">
        {currentTeams.map((team) => (
          <div
            id={`team-${team.teamId}`}
            className={`team-card h-14 w-1/3 m-2 bg-indigo-500 rounded-lg p-2 text-lg text-white uppercase text-center cursor-pointer ${selectedTeam === team.teamId ? 'selected' : ''
              }`}
            key={team.teamId}
            onClick={() => handleTeamClick(team.teamId)}
          >
            {team.teamName}
          </div>
        ))}
      </section>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {teams.length > teamsPerPage && (
          <ul className="flex">
            {Array.from(Array(Math.ceil(teams.length / teamsPerPage)).keys()).map((pageNumber) => (
              <li key={pageNumber} className="mx-2">
                <button
                  className={`px-2 py-1 rounded ${pageNumber + 1 === currentPage ? 'bg-indigo-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                  onClick={() => paginate(pageNumber + 1)}
                >
                  {pageNumber + 1}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Team members and invitation */}
      <section className="p-4">
        {selectedTeam ? (
          <div>
            <div className="flex items-center mb-4">
              <button
                onClick={navigateBack}
                className="text-indigo-500 font-medium hover:underline"
              >
                &larr; Back
              </button>
              <h2 className="text-xl font-bold ml-4">Team Members</h2>
            </div>
            {/* Render team members */}
            <ul>
              {getTeamMembers(selectedTeam).map((member) => (
                <li key={member.memberId}>{member.name}</li>
              ))}
            </ul>

            <div className="mt-4">
              <h2 className="text-xl font-bold mb-4">Send Email Invitation</h2>
              <div>

                <input
                onChange={(e)=>setEmail(e.target.value)}
                  type="text"
                  placeholder="Enter email address"
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                />
                <button
                  type="button"
                  onClick={sendInvitation}
                  className="bg-indigo-500 text-white rounded px-4 py-2"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        ) : (
          <h2 className="text-xl font-bold">Select a Team</h2>
        )}
      </section>


      {toggleTeamForm && <CreateTeamForm />}
    </div>
  );
};

export default TeamsManagement;