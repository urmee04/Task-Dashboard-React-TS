import React, { useState } from "react";
import { type TaskFormData, type TaskFormProps } from "../../types";

//TaskForm allows users to add new tasks
const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  //Local state for form fields
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });

  //handle input changes for all fields
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //submit handler for form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); //prevent page refresh
    onAddTask(formData); //send form data to parent
    setFormData({
      //reset form
      title: "",
      description: "",
      priority: "low",
      dueDate: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded p-4 mb-6 space-y-3"
    >
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Task title"
        required
        className="w-full border p-2 rounded"
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description (optional)"
        className="w-full border p-2 rounded"
      />

      <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
