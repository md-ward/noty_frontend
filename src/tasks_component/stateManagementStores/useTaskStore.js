import { create } from 'zustand';
import { fetchTasks, createTask, fetchTeamMembers } from '../controller/taskController';
import useNotificationStore from '../../global/global_stores/notificationStore';

const useTaskStore = create((set) => ({
    tasks: [],
    currentTask: null,
    isDialogOpen: false,
    title: '',
    description: '',
    dueDate: '',
    assignedTo: '',

    teams: [],
    teamName: '',
    teamMembers: [],
    selectedTeamMember: '',
    selectedTeamId: '',

    fetchTeamMembers: async () => {
        try {
            const teamsData = await fetchTeamMembers();
            //todo: consol log teams data .......
            set({ teams: teamsData });

        } catch (error) {
            useNotificationStore.getState().addError(error)
        }
    },

    fetchTasks: async () => {
        try {
            const fetchedTasks = await fetchTasks();

            set({ tasks: fetchedTasks });
            console.warn(useTaskStore.getState().tasks)
        } catch (error) {
            console.warn(error)
            useNotificationStore.getState().addError(error)


        }
    },

    setCurrentTask: (taskId) => {
        const { tasks } = useTaskStore.getState();
        const task = tasks.find((task) => task._id === taskId);
        set({ currentTask: task });
    },

    openDialog: () => set({ isDialogOpen: true }),
    closeDialog: () => set({ currentTask: null, isDialogOpen: false }),
    isCreateTaskDialogOpen: false,

    openCreateTaskDialog: () => set({ isCreateTaskDialogOpen: true }),
    closeCreateTaskDialog: () => set({ isCreateTaskDialogOpen: false }),


    // New functions to handle state changes of CreateTaskForm
    setTitle: (title) => set({ title }),
    setDescription: (description) => set({ description }),
    setDueDate: (dueDate) => set({ dueDate }),
    // setAssignedTo: (assignedTo) => set({ assignedTo }),

    setTeam: (teamId) => {
        const { teams } = useTaskStore.getState();
        const selectedTeam = teams.find((team) => team.teamId === teamId);
        set({ teamMembers: selectedTeam.members });
        set({ teamName: selectedTeam.teamName })
        set({ selectedTeamId: selectedTeam.teamId })
    },

    setTeamMember: (memberId) => {
        const { teamMembers } = useTaskStore.getState();
        const selectedTeamMember = teamMembers.find((member) => member._id === memberId)._id;
        set({ selectedTeamMember });
    },

    createTask: async () => {
        const { title, description, dueDate, selectedTeamMember, selectedTeamId } = useTaskStore.getState();
        const taskData = { title, description, dueDate, assignedTo: selectedTeamMember, teamId: selectedTeamId };
        try {
            const createdTask = await createTask(taskData);
            set((state) => ({
                tasks: [...state.tasks, createdTask],
                title: '',
                description: '',
                dueDate: '',
                assignedTo: '',
                teamId: '',
                isDialogOpen: false
            }));
            // Reset form or perform any other actions
        } catch (error) {
            // console.error('Error creating task:', error);
            useNotificationStore.getState().addError(error)

        }
    },
}));

export default useTaskStore;