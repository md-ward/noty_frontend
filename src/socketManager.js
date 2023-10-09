import { io } from "socket.io-client";
import { getCookie } from "./useCookies";
import useNotificationStore from "./global/global_stores/notificationStore";
import useTaskStore from "./tasks_component/stateManagementStores/useTaskStore";


class SocketManager {
  constructor() {
    this.socket = null;
  }

  init() {
    return new Promise((resolve, reject) => {
      if (!this.socket) {
        const token = getCookie("token"); // Get the token from the cookie using the getCookie function

        this.socket = io("http://localhost:3000", {
          transports: ["websocket"], // Use only WebSocket transport
          auth: {
            token: token // Pass the token as an authentication parameter
          }
        });

        // Socket.io event handling
        this.socket.on("connect", () => {
          console.log("Connected to Socket.io server");

          // Custom event for task creation
          this.socket.on("task_created", (taskData) => {
            console.log("Task created:", taskData);
            useNotificationStore.getState().addNotification('new task added ')
            useTaskStore.getState().resetTasks(taskData)
            // Perform any necessary actions or update the UI
          });

          // Custom event for task update
          this.socket.on("task_updated", (taskData) => {
            console.log("Task updated:", taskData);
            // Perform any necessary actions or update the UI
          });


          this.socket.on("task_deleted", (taskId) => {
            // Perform any necessary actions or update the UI
            useNotificationStore.getState().addNotification(`Task with id  ${taskId} has been deleted `)

          });


          // ... Add more event handlers for other events as needed

          resolve(); // Resolve the promise once the socket is connected
        });

        // Socket.io error handling
        this.socket.on("connect_error", (error) => {
          console.error("Socket.io connection error:", error);
          // Handle connection error, e.g., show an error message to the user
        });

        this.socket.on("disconnect", (reason) => {
          console.log("Socket.io disconnected:", reason);
          // Handle disconnection, e.g., show a notification to the user
        });

        // Socket.io reconnection logic
        this.socket.on("reconnect_attempt", (attemptNumber) => {
          console.log("Socket.io reconnecting. Attempt:", attemptNumber);
          // Perform any necessary actions, e.g., show a loading indicator
        });

        this.socket.on("reconnect_failed", () => {
          console.error("Socket.io reconnection failed");
          // Handle reconnection failure, e.g., show an error message to the user
        });
      } else {
        resolve(); // Resolve the promise if the socket is already initialized
      }
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  getInstance() {
    if (!this.socket) {
      throw new Error("Socket instance has not been initialized. Call `init` first.");
    }

    return this.socket;
  }
}

const socketManager = new SocketManager();

export default socketManager;