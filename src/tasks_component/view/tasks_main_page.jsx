import { useEffect } from 'react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';

import FullCalendar from '@fullcalendar/react';
import EventCard from '../widgets/event_content_card';
import useTaskStore from '../stateManagementStores/useTaskStore';
import CreateTaskForm from '../widgets/create_task';
import Layout from '../../global/view/pages_layout';

const TasksPage = () => {
    const {
        tasks,
        currentTask,
        isDialogOpen,
        fetchTasks,
        setCurrentTask,
        openDialog,
        isCreateTaskDialogOpen,
    } = useTaskStore();

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleEventClick = (eventInfo) => {
        setCurrentTask(eventInfo.event.id);
        openDialog()
    };

    return (
        <>
            <Layout
                children={
                    <FullCalendar
                   
                        plugins={[dayGridPlugin, listPlugin]}
                        initialView="dayGridMonth"
                        weekends={true}
                        events={tasks.map((task) => ({
                            id: task._id,
                            title: task.title,
                            start: task.createdAt,
                            end: task.dueDate,
                            classNames: ['cursor-pointer'],
                        }))}
                        eventClick={handleEventClick}
                        headerToolbar={{

                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,listMonth',
                        }}

                        buttonText={{
                            today: 'Today',
                            dayGridMonth: 'Month',
                            listMonth: 'List',
                        }}
                    />
                }
            />
            {isDialogOpen && <EventCard task={currentTask} />}
            {isCreateTaskDialogOpen && <CreateTaskForm />}
        </>
    );
};

export default TasksPage;