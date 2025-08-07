import React, { useState, useEffect } from "react";
import { type Task, type TaskFormData, type FilterOptions } from "../../types";
import TaskForm from "../TaskForm/TaskForm";
import TaskList from "../TaskList/TaskList";
import TaskFilter from "../TaskFilter/TaskFilter";
import { filterTasks } from "../../utils/taskUtils";

// Dashboard is the main container component that manages task state and logic
const Dashboard: React.FC = () => {
  // -----------------------
  //State Declarations
  // -----------------------

  //All tasks are stored in this array
  const [tasks, setTasks] = useState<Task[]>([]);

  //Filters for status, priority, and search
  const [filters, setFilters] = useState<Partial<FilterOptions>>({});

  //Load tasks from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) {
      setTasks(JSON.parse(stored));
    }
  }, []);

  // -----------------------
  //save tasks on every change
  // -----------------------
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Store in browser
  }, [tasks]); //run every time tasks change

  // -----------------------
  //Task Handlers
  // -----------------------

  //Function to add a new task (called by TaskForm)
  const handleAddTask = (data: TaskFormData) => {
    const newTask: Task = {
      id: crypto.randomUUID(), //generate unique ID for each task
      title: data.title,
      description: data.description,
      priority: data.priority,
      dueDate: data.dueDate,
      status: "pending", //default status on creation
      createdAt: new Date().toISOString(), //store current timestamp
    };

    //Add new task to the existing list
    setTasks((prev) => [...prev, newTask]);
  };

  //Function to delete a task by ID (called by TaskItem)
  const handleDeleteTask = (id: string) => {
    //Remove task from state
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  //Function to update the status of a task (called by TaskItem)
  const handleStatusChange = (id: string, status: Task["status"]) => {
    setTasks((prev) =>
      prev.map(
        (task) => (task.id === id ? { ...task, status } : task) //Only update the matching task
      )
    );
  };

  // -----------------------
  //Filter Handler
  // -----------------------

  //function to update filter options (called by TaskFilter)
  const handleFilterChange = (filters: Partial<FilterOptions>) => {
    //merge new filters with previous state
    setFilters((prev) => ({ ...prev, ...filters }));
  };

  // -----------------------
  //Filtered View
  // -----------------------

  //Apply filters to the task list before passing to TaskList
  const filteredTasks = filterTasks(tasks, filters);

  // -----------------------
  //UI Rendering
  // -----------------------

  return (
    <div className="bg-blue-100 p-6 max-w-4xl mx-auto">
      {" "}
      {/* Container styling */}
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Task Management Dashboard
      </h1>
      {/* Task creation form */}
      <TaskForm onAddTask={handleAddTask} />
      {/* Filter controls for status, priority, and search */}
      <TaskFilter onFilterChange={handleFilterChange} />
      {/* No matches found message */}
      {filteredTasks.length === 0 && tasks.length > 0 && (
        <div className="bg-white p-4 rounded shadow mb-4 text-center text-gray-500">
          No tasks match your current filters.
        </div>
      )}
      {/* Empty state when no tasks exist */}
      {tasks.length === 0 && (
        <div className="bg-white p-4 rounded shadow mb-4 text-center text-gray-500">
          No tasks found. Add your first task above!
        </div>
      )}
      {/* Filtered task list with delete and status control */}
      {filteredTasks.length > 0 && (
        <TaskList
          tasks={filteredTasks} //pass only the tasks that match filters
          onDelete={handleDeleteTask}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default Dashboard;
