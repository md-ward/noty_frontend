import axios from 'axios';
import REACT_APP_API_URL from '../../../env';
import { getCookie } from '../../useCookies';
import socketManager from '../../socketManager';


export const fetchTasks = async () => {
  const token = getCookie('token');
  if (!token) {
    throw ('Unauthorized');
  }

  try {
    const response = await axios
      .get(`${REACT_APP_API_URL}/tasks`, {
        headers: {
          Authorization: token,
        },
      });
    return response.data;
  } catch (error) {
    throw ('Error fetching tasks');
  }
};

export const createTask = async (taskData) => {
  const token = getCookie('token');
  if (!token) {
    throw new Error('Unauthorized');
  }

  try {
    const socket = socketManager.getInstance();


    socket.emit('task_action', {
      action: 'create',
      taskData: taskData,
    });

  } catch (error) {
    throw new Error('Error creating task');
  }
};


export const deleteTask = async (taskId) => {
  const token = getCookie('token');
  if (!token) {
    throw new Error('Unauthorized');
  }

  try {
    const socket = socketManager.getInstance();


    socket.emit('task_action', {
      action: 'delete',
      taskId: taskId,
    });

  } catch (error) {
    throw new Error('Error Deleting task');
  }
};




export const fetchTeamMembers = async () => {
  const token = getCookie('token');
  if (!token) {
    throw new ('Unauthorized');
  }

  try {
    const response = await axios.get(`${REACT_APP_API_URL}/teams`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    // console.error('Error fetching team members:', error);
    throw ('Error fetching team members');
  }
};