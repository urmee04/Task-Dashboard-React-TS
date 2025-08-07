import React, { useState } from "react";
import { type Task, type TaskFormData, type FilterOptions } from "../../types";
import TaskForm from "../TaskForm/TaskForm";
import TaskList from "../TaskList/TaskList";
import TaskFilter from "../TaskFilter/TaskFilter";

const Dashboard: React.FC = () => {
  //Task state: array of Task objects
  const [tasks, setTasks] = useState<Task[]>([]);

  //Add a new task when submitted from form
  const handleAddTask = (data: TaskFormData) => {
    const newTask: Task = {
      id: crypto.randomUUID(), //Generate unique ID
      title: data.title,
      description: data.description,
      priority: data.priority,
      dueDate: data.dueDate,
      status: "pending", //default status
      createdAt: new Date().toISOString(), //current timestamp
    };

    setTasks((prev) => [...prev, newTask]); //update task state
  };

  //delete task by ID
  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  //update task status
  const handleStatusChange = (id: string, status: Task["status"]) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status } : task))
    );
  };

  //filtering will be implemented in Step 4
  const handleFilterChange = (filters: Partial<FilterOptions>) => {
    console.log("Filters to be applied:", filters);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Task Management Dashboard
      </h1>

      {/* Task creation form */}
      <TaskForm onAddTask={handleAddTask} />

      {/* Filters */}
      <TaskFilter onFilterChange={handleFilterChange} />

      {/* Render task list */}
      <TaskList
        tasks={tasks}
        onDelete={handleDeleteTask}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default Dashboard;
