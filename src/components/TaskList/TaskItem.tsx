import React from "react";
import { type Task } from "../../types";

//Props interface for TaskItem component
interface Props {
  task: Task; //single task object
  onDelete: (id: string) => void; //handler to delete task
  onStatusChange: (id: string, status: Task["status"]) => void; //handler to change task status
}

//TaskItem component displays an individual task
const TaskItem: React.FC<Props> = ({ task, onDelete, onStatusChange }) => {
  return (
    <div className="border border-gray-300 p-4 rounded shadow-sm bg-white">
      {" "}
      {/* Card-like task box */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg text-gray-800">{task.title}</h3>{" "}
          {/* Task title */}
          {task.description && (
            <p className="text-sm text-gray-600">{task.description}</p>
          )}{" "}
          {/* Optional description */}
          <p className="text-xs text-gray-500 mt-1">
            Priority: {task.priority}
          </p>{" "}
          {/* Priority label */}
        </div>

        <button
          onClick={() => onDelete(task.id)} //Call delete handler
          className="text-red-500 hover:text-red-600 text-sm"
        >
          ✕
        </button>
      </div>
      {/* Status selector */}
      <div className="mt-2">
        <select
          value={task.status} //Bind to current status
          onChange={(e) =>
            onStatusChange(task.id, e.target.value as Task["status"])
          } //Call change handler
          className="mt-1 border rounded px-2 py-1 text-sm bg-gray-50"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
};

export default TaskItem;
