import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import useNotificationStore from '../global_stores/notificationStore';

const NotificationContainer = () => {
  const { notifications, errors, dismissNotification, dismissError } = useNotificationStore();
  const containerRef = useRef(null);

  useEffect(() => {
    if (notifications.length > 0) {
      const notification = notifications[0];
      const notificationId = `#notification-${notification.id}`;

      gsap.fromTo(
        notificationId,
        { x: '100%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.3, ease: 'power3.out' }
      );

      const dismissTimeout = setTimeout(() => {
        handleDismissNotification(notification.id);
      }, 1500); // Adjust the timeout duration as needed

      return () => {
        clearTimeout(dismissTimeout);
      };
    }
  }, [notifications]);

  useEffect(() => {
    if (errors.length === 1) {
      const error = errors[0];
      const errorId = `#error-${error.id}`;

      gsap.fromTo(
        errorId,
        { x: '100%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.3, ease: 'power3.out' }
      );

      const dismissTimeout = setTimeout(() => {
        handleDismissError(error.id);
      }, 1500); // Adjust the timeout duration as needed

      return () => {
        clearTimeout(dismissTimeout);
      };
    }
  }, [errors]);

  const handleDismissNotification = (id) => {
    const notificationId = `#notification-${id}`;

    gsap.to(notificationId, {
      x: '-100%',
      opacity: 0,
      duration: 0.3,
      ease: 'power3.in',
      onComplete: () => dismissNotification(id),
    });
  };

  const handleDismissError = (id) => {
    const errorId = `#error-${id}`;

    gsap.to(errorId, {
      x: '-100%',
      opacity: 0,
      duration: 0.3,
      ease: 'power3.in',
      onComplete: () => dismissError(id),
    });
  };

  return (
    <div className="fixed top-4 right-36 z-50" ref={containerRef}>
      {/* Render notifications */}
      {notifications.map((notification) => (
        <div
          key={notification.id}
          id={`notification-${notification.id}`}
          className="bg-green-500 text-white px-4 py-2 rounded mb-2 flex justify-between items-center"
        >
          <span>{notification.message}</span>
          <button
            className="ml-2 text-sm text-white bg-transparent border border-white px-2 py-1 rounded"
            onClick={() => handleDismissNotification(notification.id)}
          >
            Dismiss
          </button>
        </div>
      ))}

      {/* Render error messages */}
      {errors.map((error) => (
        <div
          key={error.id}
          id={`error-${error.id}`}
          className="bg-red-500 text-white px-4 py-2 rounded mb-2 flex justify-between items-center"
        >
          <span>{error.message}</span>
          <button
            className="ml-2 text-sm text-white bg-transparent border border-white px-2 py-1 rounded"
            onClick={() => handleDismissError(error.id)}
          >
            Dismiss
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationContainer;