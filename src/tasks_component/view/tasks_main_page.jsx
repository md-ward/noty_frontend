import { useEffect } from 'react';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import EventCard from '../widgets/event_content_card';
import useTaskStore from '../stateManagementStores/useTaskStore';
import CreateTaskForm from '../widgets/create_task';
import useSidebarStore from '../../global/global_stores/useSidebarStore';
import Layout from "../../global/view/pages_layout";

const TasksPage = () => {
    const { tasks, currentTask, isDialogOpen, fetchTasks, setCurrentTask, openDialog, isCreateTaskDialogOpen } = useTaskStore();
    const isOpen = useSidebarStore((state) => state.isOpen);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleEventClick = (eventInfo) => {
        setCurrentTask(eventInfo.event.id);
        openDialog();
    };


    return (
        <>


            <Layout children={<FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                weekends={true}

                events={tasks.map((task) => ({
                    id: task._id,
                    title: task.title,
                    date: task.dueDate,
                }))}
                eventClick={handleEventClick}
            />
            }
            />
            {isDialogOpen && <EventCard task={currentTask} />}
            {
                isCreateTaskDialogOpen && <CreateTaskForm />
            }



        </>
    );
};

export default TasksPage;