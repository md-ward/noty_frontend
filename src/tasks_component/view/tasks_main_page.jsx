import React, { useEffect } from 'react';
import SideBar from '../../global/sideBar';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import EventCard from '../widgets/event_content_card';
import useSidebarStore from '../../global/useSidebarStore';
import useTaskStore from '../stateManagementStores/useTaskStore';
import CreateTaskForm from '../widgets/create_task';


const TasksPage = () => {
    const { tasks, currentTask, isDialogOpen, fetchTasks, setCurrentTask, openDialog } = useTaskStore();
    const isOpen = useSidebarStore((state) => state.isOpen);

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleEventClick = (eventInfo) => {
        setCurrentTask(eventInfo.event.id);
        openDialog();
    };

    return (
        <div className="grid grid-cols-12 overflow-y-hidden">
            <div className={`sm:col-span-11 ${isOpen ? 'col-span-10' : 'col-span-12'} p-1 sm:p-4 relative overflow-y-auto h-screen custom-scrollbar`}>
                    <FullCalendar
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
                
            </div>
            {isDialogOpen && <EventCard task={currentTask} />}
            {/* <CreateTaskForm /> */}
            <SideBar />
        </div>
    );
};

export default TasksPage;