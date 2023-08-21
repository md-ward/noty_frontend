import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { gsap } from 'gsap';

const NoteDialog = ({ noteColor, title, text, onClose }) => {
    const NoteDialogRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            NoteDialogRef.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out', immediateRender: true }
        );
    }, []);

    const handleClose = () => {
        gsap.to(NoteDialogRef.current, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: onClose,
        });
    };

    return (
        <div className="fixed inset-0 mx-auto my-auto flex items-center justify-center z-50   " >
            <div className="bg-white  shadow-lg p-6 rounded-lg " ref={NoteDialogRef} style={{ backgroundColor: noteColor }}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold h-8 w-full text-center text-white rounded-lg" >{title}</h2>
                    <FontAwesomeIcon
                        icon={faTimes}
                        className="text-gray-500 cursor-pointer"
                        onClick={handleClose}
                    />
                </div>
                <p className="text-gray-700 overflow-auto h-96 p-1 w-96 bg-white custom-scrollbar" >{text}</p>
                <button className="text-dark-blue  bg-slate-100 p-2 rounded-lg   shadow-xl font-semibold mt-4 h-10" onClick={handleClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default NoteDialog;