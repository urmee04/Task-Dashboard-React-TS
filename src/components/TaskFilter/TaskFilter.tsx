import React from "react";
import { type TaskFilterProps } from "../../types";

//taskFilter allows user to filter tasks by status, priority, and search
const TaskFilter: React.FC<TaskFilterProps> = ({ onFilterChange }) => {
  //handler to update parent when filter fields change
  const handleFilter = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value }); // Send updated filter field
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6 items-center">
      <select
        name="status"
        onChange={handleFilter}
        className="border p-2 rounded"
      >
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <select
        name="priority"
        onChange={handleFilter}
        className="border p-2 rounded"
      >
        <option value="">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <input
        name="search"
        onChange={handleFilter}
        placeholder="Search tasks..."
        className="border p-2 rounded flex-1"
      />
    </div>
  );
};

export default TaskFilter;
