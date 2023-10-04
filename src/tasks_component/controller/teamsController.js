import { getCookie } from "../../useCookies";

import axios from 'axios';
import REACT_APP_API_URL from '../../../env'




export const createNewTeam = async (teamData) => {
    const token = getCookie('token');
    if (!token) {
        throw ('Unauthorized');
    }

    try {
        const response = await axios.post(`${REACT_APP_API_URL}/teams/new_team`, { data: teamData }, {
            headers: {
                Authorization: token,
            },
        });
        return response.data;
    } catch (error) {
        console.warn(error)
        throw ('Error creating team');
    }
};



