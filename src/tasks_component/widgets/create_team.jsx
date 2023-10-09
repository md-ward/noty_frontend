import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import useCollaborationStore from '../stateManagementStores/useCollaborationStore';

const CreateTeamForm = () => {
  const { teamName, setTeamName, createTeam, settoggleTeamForm } = useCollaborationStore();

  const formRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out', immediateRender: true }
    );
  }, []);

  const handleClose = () => {
    gsap.to(formRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        settoggleTeamForm(false);
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTeam();
    // Additional logic or handling after team creation
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    console.log(inputValue)
    setTeamName(inputValue);
  };

  return (
    <div className="re fixed inset-0 flex items-center justify-center z-50">
      <form ref={formRef} className="relative bg-white p-4 rounded shadow w-96">
        <h2 className="text-lg font-semibold mb-4 text-blue-500">Create Team</h2>
        <div className="mb-4">
          <label htmlFor="teamName" className="block text-sm font-medium text-gray-700">
            Team Name
          </label>
          <input
            type="text"
            id="teamName"
            value={teamName}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <button onClick={handleSubmit} className="bg-blue-500 text-white rounded px-4 py-2">
          Create
        </button>
        <button
          type="button"
          onClick={handleClose}
          className="absolute bg-blue-500 top-0 right-0 rounded-tr-md rounded-bl-lg text-white p-2 shadow-lg"
        >
          Close
        </button>
      </form>
    </div>
  );
};

export default CreateTeamForm;