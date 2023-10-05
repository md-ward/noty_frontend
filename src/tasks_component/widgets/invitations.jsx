import { useState, useEffect } from 'react';
import { getUserInvitations, acceptInvite, declineInvite } from '../controller/invitationController';

const Invitations = () => {
  const [invitations, setInvitations] = useState([]);

  useEffect(() => {
    fetchInvitations();
  }, []);

  const fetchInvitations = async () => {
    try {
      const response = await getUserInvitations();
      setInvitations(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAcceptInvitation = async (inviteId) => {
    try {
      await acceptInvite(inviteId);
      fetchInvitations();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeclineInvitation = async (inviteId) => {
    try {
      await declineInvite(inviteId);
      fetchInvitations();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Invitations</h1>
      {invitations.length === 0 ? (
        <p>No invitations</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {invitations.map((invitation) => (
            <div key={invitation._id} className="border border-gray-300 rounded p-4">
              <p className="font-semibold">Sender: {invitation.senderId.name}</p>
              <p className="mt-2">Team: {invitation.teamId.name}</p>
              <p className="mt-2">Status: {invitation.status}</p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => handleAcceptInvitation(invitation._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleDeclineInvitation(invitation._id)}
                  className="bg-red-500 text-white px-4 py-2 ml-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Invitations;