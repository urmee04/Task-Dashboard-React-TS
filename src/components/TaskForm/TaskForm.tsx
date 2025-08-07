import React, { useState } from "react";
import { type TaskFormData, type TaskFormProps } from "../../types";

//TaskForm component: Handles task creation with validation

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  //Form state management
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    priority: "medium", //default to medium priority
    dueDate: "",
  });

  //validation errors state
  const [errors, setErrors] = useState<{
    title?: string;
    dueDate?: string;
  }>({});

  //handles input changes for all form fields

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    //update form data while preserving other fields
    setFormData((prev) => ({ ...prev, [name]: value }));
    //clear any existing error for this field
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  //Validates form inputs and returns error messages

  const validateForm = () => {
    const newErrors: { title?: string; dueDate?: string } = {};

    //title validation
    if (!formData.title.trim()) {
      newErrors.title = "Task title is required";
    }

    // due date validation
    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required";
    } else {
      const dueDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (dueDate < today) {
        newErrors.dueDate = "Due date cannot be in the past";
      }
    }

    return newErrors;
  };

  // handles form submission with validation

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // validate form inputs
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return; //stop submission if errors exist
    }

    //submit valid data to parent component
    onAddTask(formData);

    //reset form to initial state
    setFormData({
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded p-4 mb-6 space-y-3"
    >
      {/* Title Input */}
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Task title*"
        className="w-full border p-2 rounded"
      />
      {/* Title validation error */}
      {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}

      {/* Description Textarea */}
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description (optional)"
        className="w-full border p-2 rounded"
      />

      {/* Priority Select Dropdown */}
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

      {/* Due Date Input */}
      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        min={new Date().toISOString().split("T")[0]} // Disable past dates in picker
      />
      {/* Due date validation error */}
      {errors.dueDate && (
        <p className="text-red-500 text-sm">{errors.dueDate}</p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition-colors"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
