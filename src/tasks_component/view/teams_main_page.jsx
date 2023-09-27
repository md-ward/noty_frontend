import { useEffect, useState } from 'react';
import axios from 'axios';
import useSidebarStore from '../../global/global_stores/useSidebarStore';
import SideBar from '../../global/view/sideBar';

const TeamsPage = () => {
  const { isOpen } = useSidebarStore()
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Retrieve the user ID from local storage or the desired location

        if (!userId) {
          throw new Error('Unauthorized user');
        }

        const response = await axios.get('/api/teams', {
          headers: {
            userid: userId,
          },
        });

        setTeams(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch teams. Please try again.'); // Update the error message accordingly
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const handleRemoveMember = async (teamId, memberId) => {
    try {
      const teamAdminId = localStorage.getItem('teamAdminId'); // Retrieve the team admin ID from local storage or the desired location

      if (!teamAdminId) {
        throw new Error('Unauthorized user');
      }

      await axios.delete(`/api/teams/${teamId}/members/${memberId}`, {
        headers: {
          userid: teamAdminId,
        },
      });

      // Remove the member from the team
      setTeams((prevTeams) => {
        return prevTeams.map((team) => {
          if (team.teamId === teamId) {
            const updatedMembers = team.members.filter(
              (member) => member._id !== memberId
            );
            return { ...team, members: updatedMembers };
          }
          return team;
        });
      });
    } catch (error) {
      console.error(error);
      setError('Failed to remove member from the team. Please try again.'); // Update the error message accordingly
    }
  };

  if (loading) {
    return <div>Loading teams...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (


    <>

      <h2>Teams</h2>
      {
        teams.length === 0 ? (
          <div>No teams yet, create one</div>
        ) : (
          <ul>
            {teams.map((team) => (
              <li key={team.teamId}>
                <h3>{team.teamName}</h3>
                <ul>
                  {team.members.map((member) => (
                    <li key={member._id}>
                      {member.name}
                      <button
                        onClick={() => handleRemoveMember(team.teamId, member._id)}
                      >
                        Remove Member
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )
      }


    </>
  );
};

export default TeamsPage;