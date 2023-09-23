import React from 'react';
import useTaskStore from '../stateManagementStores/useTaskStore';


const CreateTaskForm = () => {
   
    const {
        title,
        description,
        dueDate,
        assignedTo,
        team,
        setTitle,
        setDescription,
        setDueDate,
        setAssignedTo,
        setTeam,
        createTask,
    } = useTaskStore();


    const handleSubmit = async (e) => {
        e.preventDefault();
        await createTask();
        // Reset form or perform any other actions
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
                <h2 className="text-lg font-semibold mb-4">Create Task</h2>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                        Due Date
                    </label>
                    <input
                        type="date"
                        id="dueDate"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700">
                        Assigned To
                    </label>
                    <input
                        type="text"
                        id="assignedTo"
                        value={assignedTo}
                        onChange={(e) => setAssignedTo(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="team" className="block text-sm font-medium text-gray-700">
                        Team
                    </label>
                    <input
                        type="text"
                        id="team"
                        value={team}
                        onChange={(e) => setTeam(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
                    Create
                </button>
            </form>
        </div>
    );
};

export default CreateTaskForm;