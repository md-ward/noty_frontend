import { useEffect, useRef } from 'react';
import useTaskStore from '../stateManagementStores/useTaskStore';
import { gsap } from 'gsap';

const CreateTaskForm = () => {
  const {
    title,
    description,
    dueDate,
    teamName,
    teamMembers,
    setTitle,
    setDescription,
    setDueDate,
    setTeam,
    setTeamMember,
    selectedTeamMember,
    createTask,
    fetchTeamMembers,
    teams,
    closeCreateTaskDialog
  } = useTaskStore();

  const formRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out', immediateRender: true }
    );
  }, []);

  useEffect(() => {
    fetchTeamMembers();
  }, [fetchTeamMembers]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTask();
    // Reset form or perform any other actions
  };

  const handleTeamChange = (e) => {
    const selectedTeamId = e.target.value;
    setTeam(selectedTeamId);
    if (selectedTeamMember) {
      setTeamMember('');
    }
  };

  const handleClose = () => {
    gsap.to(formRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: closeCreateTaskDialog,
    });
  };
  const currentDate = new Date().toISOString().split('T')[0]; // Get current date in "YYYY-MM-DD" format


  return (
    <div className="re fixed inset-0 flex items-center justify-center z-50">
      <form ref={formRef} onSubmit={handleSubmit} className="relative bg-white p-4 rounded shadow w-96">
        <h2 className="text-lg font-semibold mb-4 text-blue-500">Create Task</h2>
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
            min={currentDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="team" className="block text-sm font-medium text-gray-700">
            Team
          </label>
          {teams.length > 0 ? <select
            id="team"
            onChange={handleTeamChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          >
            <option value="">Select a team</option>
            {teams.map((team) => (
              <option key={team.teamId} value={team.teamId}>
                {team.teamName}
              </option>
            ))}
          </select>

            : <h1 className="border border-gray-300 text-red-500 rounded px-3 py-2 w-full"
            >
              No teams found,create a team first

            </h1>
          }
        </div>
        {teamName && (
          <div className="mb-4">
            <label htmlFor="teamMembers" className="block text-sm font-medium text-gray-700">
              Assigned To
            </label>
            <select
              id="teamMembers"
              onChange={(e) => setTeamMember(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            >
              <option value="">Select a team member</option>
              {teamMembers.map((member) => (
                <option key={member._id} value={member._id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
          Create
        </button>
        <button type="button" onClick={handleClose} className="absolute bg-blue-500 top-0 right-0 rounded-tr-md rounded-bl-lg text-white p-2 shadow-lg">
          {/* Close button code */}
          {/* ... */}
          Close
        </button>
      </form>
    </div>
  );
};

export default CreateTaskForm;