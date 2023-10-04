import { create } from 'zustand';
import { createNewTeam } from '../controller/teamsController';
import useNotificationStore from '../../global/global_stores/notificationStore';

const useCollaborationStore = create((set) => ({
  selectedOption: null,
  teamName: '',
  setTeamName: (name) => {
    set({ teamName: name });
  },
  setSelectedOption: (option) => {
    set({ selectedOption: option });
  },
  createTeam: async () => {
    try {

      await createNewTeam({ name: useCollaborationStore.getState().teamName })
      useNotificationStore.getState().addNotification('team created successfully..')
    }
    catch (error) {

      useNotificationStore.getState().addError(error)

    }
  },
}));

export default useCollaborationStore;