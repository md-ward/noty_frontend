import  { useEffect, useRef } from 'react';
import useTaskStore from '../stateManagementStores/useTaskStore';
import { gsap } from 'gsap';

const EventCard = ({ task }) => {
  const { closeDialog } = useTaskStore();
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out', immediateRender: true }
    );
  }, []);

  const handleClose = () => {
    gsap.to(cardRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: closeDialog,
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };
  return (
    <>
      {task && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            ref={cardRef}
            className="relative bg-white rounded-lg p-4 w-96 flex flex-col bg-gradient-to-b from-indigo-500 to-blue-500   bg-opacity-25 shadow-lg"
          >
        <button
  className="absolute top-2 right-2 text-white text-sm bg-indigo-500 rounded-lg px-4 py-2 shadow-xl hover:bg-indigo-600 hover:shadow-none transition-all duration-300 ease-in-out border border-indigo-500 hover:border-white"
  onClick={handleClose}
>
  Close
</button>
            <div className="mb-4 text-white flex flex-row gap-7">
              <h1 className="text-lg font-bold text-center">{task.title}</h1>
            </div>
            <div>
              <h1 className="text-lg font-semibold mb-2 text-white">Team: {task.team.name}</h1>
              <div className="mb-2">
                <h2 className="text-lg font-semibold text-white">Description:</h2>
                <p className="rounded-lg bg-white p-2 text-sm">{task.description}</p>
              </div>
              <div className="mb-2">
                <h2 className="text-lg font-semibold text-white">Assigned To:</h2>
                <p className="rounded-lg bg-white p-2 text-sm">{task.assignedTo.name}</p>
              </div>
              <div className="mb-2">
                <h2 className="text-lg font-semibold text-white">Status:</h2>
                <p className="rounded-lg bg-white p-2 text-sm">{task.status}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">End Date:</h2>
                <p className="rounded-lg bg-white p-2 text-sm">{formatDate(task.dueDate)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventCard;