import axios from 'axios';
import REACT_APP_API_URL from '../../../env';

export const fetchTasks = async (setTasks) => {
  try {
    const userId = localStorage.getItem('token');
    if (!userId) {
      throw new Error('Unauthorized');
    } else {
      const response = await axios.get(`${REACT_APP_API_URL}/tasks`, {
        headers: {
          userid: userId,
        },
      });

      return response.data;
    }
  } catch (error) {
    // console.error('Error fetching tasks:', error);
    throw new Error('Error fetching tasks');
  }
};

export const createTask = async (taskData) => {
  try {
    const userId = localStorage.getItem('token');
    if (!userId) {
      throw new Error('Unauthorized');
    } else {
      const response = await axios.post(
        `${REACT_APP_API_URL}/tasks/add_task`,
        taskData,
        {
          headers: {
            userid: userId,
          },
        }
      );

      return response.data;
    }
  } catch (error) {
    // console.error('Error creating task:', error);
    throw new Error('Error creating task');
  }
};