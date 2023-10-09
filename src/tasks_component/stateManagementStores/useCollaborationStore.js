import { create } from 'zustand';
import { createNewTeam } from '../controller/teamsController';
import useNotificationStore from '../../global/global_stores/notificationStore';
import { createInvite } from '../controller/invitationController';

const useCollaborationStore = create((set) => ({
  selectedOption: null,
  teamName: '',
  toggleTeamForm: false,
  email: '',
  selectedTeam: null,
  setSelectedTeam: (team) => { set({ selectedTeam: team }) },
  setEmail: (email) => { set({ email: email }) },

  sendInvitation: async () => {
    try {
      const email = useCollaborationStore.getState().email;
      const selectedTeam = useCollaborationStore.getState().selectedTeam;
      console.warn(email, selectedTeam)
      await createInvite(email, selectedTeam);
      set({
        selectedTeam: null,
        email: '',
        toggleTeamForm: false
      })

    } catch (error) {
      useNotificationStore.getState().addError(error);
    }
  }
  ,

  settoggleTeamForm: () => {
    set((state) => ({
      toggleTeamForm: !state.toggleTeamForm,
    }));
  },
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