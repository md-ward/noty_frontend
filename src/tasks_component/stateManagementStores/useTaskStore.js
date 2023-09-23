import { create } from 'zustand';
import { fetchTasks, createTask } from '../controller/taskController';

const useTaskStore = create((set) => ({
    tasks: [],
    currentTask: null,
    isDialogOpen: false,
    title: '',
    description: '',
    dueDate: '',
    assignedTo: '',
    team: '',

    fetchTasks: async () => {
        const fetchedTasks = await fetchTasks();
        set({ tasks: fetchedTasks });
    },

    setCurrentTask: (taskId) => {
        const { tasks } = useTaskStore.getState();
        const task = tasks.find((task) => task._id === taskId);
        set({ currentTask: task });
    },

    openDialog: () => set({ isDialogOpen: true }),
    closeDialog: () => set({ currentTask: null, isDialogOpen: false }),

    // New functions to handle state changes of CreateTaskForm
    setTitle: (title) => set({ title }),
    setDescription: (description) => set({ description }),
    setDueDate: (dueDate) => set({ dueDate }),
    setAssignedTo: (assignedTo) => set({ assignedTo }),
    setTeam: (team) => set({ team }),

    createTask: async () => {
        const { title, description, dueDate, assignedTo, team } = useTaskStore.getState();
        const taskData = { title, description, dueDate, assignedTo, team };
        try {
            const createdTask = await createTask(taskData);
            set((state) => ({
                tasks: [...state.tasks, createdTask],
                title: '',
                description: '',
                dueDate: '',
                assignedTo: '',
                team: '',
            }));
            console.log('Task created:', createdTask);
            // Reset form or perform any other actions
        } catch (error) {
            console.error('Error creating task:', error);
        }
    },
}));

export default useTaskStore;