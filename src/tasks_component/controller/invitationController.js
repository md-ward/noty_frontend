import axios from 'axios';
import REACT_APP_API_URL from '../../../env';
import { getCookie } from '../../useCookies'
// Create an invitation
export const createInvite = async (recipientEmail, teamId) => {
  try {

    const response = await axios.post(`${REACT_APP_API_URL}/invites/create`,
      {
        recipientEmail,
        teamId,
      }
      , {
        headers: {
          Authorization: getCookie('token')
        }
      }
    );

    return response.data;
  } catch (error) {
    throw new Error('Failed to create the invitation.');
  }
};
// Accept an invitation
export const acceptInvite = async (inviteId) => {
  try {
    const response = await axios.put(
      `${REACT_APP_API_URL}/invites/${inviteId}/accept`,
      {},
      {
        headers: { Authorization: getCookie('token') }
      }
    );

    return response.data;
  } catch (error) {
    throw new Error('Failed to accept the invitation.');
  }
};// Decline an invitation
export const declineInvite = async (inviteId) => {
  try {
    const response = await axios.delete(`${REACT_APP_API_URL}/invites/${inviteId}/decline`,

      {
        headers: { Authorization: getCookie('token') }


      }
    );

    return response.data;
  } catch (error) {
    throw new Error('Failed to decline the invitation.');
  }
};

// Get all invitations for a user
export const getUserInvitations = async (userEmail) => {
  try {
    const response = await axios.get(`${REACT_APP_API_URL}/invites`,


      {
        headers: { Authorization: getCookie('token') }


      }
    );

    return response.data;
  } catch (error) {
    throw new Error('Failed to retrieve user invitations.');
  }
};