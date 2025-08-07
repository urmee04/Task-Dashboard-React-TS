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
    <div className="bg-white shadow-md rounded-lg px-4 py-3 mb-4 flex items-center justify-between">
      {/* Task info (left side) */}
      <div className="flex flex-wrap items-center gap-2 text-gray-800 text-sm">
        <span className="font-semibold">{task.title}</span>
        {task.description && <span>- {task.description}</span>}
        {task.dueDate && <span>- {task.dueDate}</span>}
      </div>

      {/* Status & actions (right side) */}
      <div className="flex items-center gap-3">
        {/* Status dropdown */}
        <select
          value={task.status}
          onChange={(e) =>
            onStatusChange(task.id, e.target.value as Task["status"])
          }
          className="border border-gray-300 rounded px-2 py-1 text-sm"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        {/* Delete button */}
        <button onClick={() => onDelete(task.id)}>🗑️</button>
      </div>
    </div>
  );
};

export default TaskItem;
