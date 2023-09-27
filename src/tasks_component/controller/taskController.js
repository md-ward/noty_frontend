import axios from 'axios';
import REACT_APP_API_URL from '../../../env';

export const fetchTasks = async () => {
  const userId = localStorage.getItem('token');
  if (!userId) {
    throw new Error('Unauthorized');
  }

  try {
    const response = await axios
      .get(`${REACT_APP_API_URL}/tasks`, {
        headers: {
          userid: userId,
        },
      });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching tasks');
  }
};

export const createTask = async (taskData) => {
  const userId = localStorage.getItem('token');
  if (!userId) {
    throw new Error('Unauthorized');
  }

  try {
    const response = await axios
      .post(`${REACT_APP_API_URL}/tasks/add_task`, taskData, {
        headers: {
          userid: userId,
        },
      });
    return response.data;
  } catch (error) {
    // console.error('Error creating task:', error);
    throw new Error('Error creating task');
  }
};

export const fetchTeamMembers = async () => {
  const userId = localStorage.getItem('token');
  if (!userId) {
    throw new Error('Unauthorized');
  }

  try {
    const response = await axios.get(`${REACT_APP_API_URL}/teams`, {
      headers: {
        userid: userId,
      },
    });
    return response.data;
  } catch (error) {
    // console.error('Error fetching team members:', error);
    throw new Error('Error fetching team members');
  }
};