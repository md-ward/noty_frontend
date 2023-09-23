import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import useTaskStore from "../stateManagementStores/useTaskStore";

const EventCard = ({ task }) => {
  // const [expanded, setExpanded] = useState(false);
  // const cardRef = useRef(null);
  // const timeline = gsap.timeline({ paused: true });

  // useEffect(() => {
  //   if (expanded) {
  //     timeline.fromTo(
  //       cardRef.current,
  //       { opacity: 0, scale: 0.9 },
  //       { opacity: 1, scale: 1, duration: 0.2 }
  //     );
  //   } else {
  //     timeline.to(cardRef.current, {
  //       opacity: 0,
  //       scale: 0.9,
  //       duration: 0.2,
  //     });
  //   }

  //   timeline.play();
  // }, [expanded]);

  // const toggleExpand = () => {
  //   setExpanded(!expanded);
  // };

  const { closeDialog } = useTaskStore();

  return (
    <>
      {task && (
        <div
          className={`fixed inset-0  flex items-center justify-center bg-black bg-opacity-25`}
          style={{ zIndex: 999 }}
        >
          <div
            className={`bg-white rounded-lg p-4 cursor-auto w-96 h-96 flex justify-center flex-col items-center
              }`}
          >
            <h1 className="text-xl font-bold mb-2" style={{ color: "red" }}>
              {task.title}
            </h1>
            <div className=''>
              <h1 className="text-lg font-semibold mb-2">
                Team: {task.team.name}
              </h1>
              <div className="mb-2">
                <h2 className="text-lg font-semibold">Description:</h2>
                <p>{task.description}</p>
              </div>
              <p className="mb-2">Assigned To: {task.assignedTo.name}</p>
              <p className="mb-2">Status: {task.status}</p>
              <p className="mb-0">End Date: {task.dueDate}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventCard;