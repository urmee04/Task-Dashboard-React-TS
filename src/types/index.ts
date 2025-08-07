// Main task data structure used throughout the app
export interface Task {
  id: string; //Unique task ID
  title: string; //Title of the task
  description?: string; //Optional task description
  status: "pending" | "in-progress" | "completed"; //Current status of the task
  priority: "low" | "medium" | "high"; //Task urgency level
  dueDate?: string; //Optional due date (in ISO date string format)
  createdAt: string; //Creation date (in ISO format)
}

// Structure of data submitted from the TaskForm (no ID or status yet)
export interface TaskFormData {
  title: string; //Title input from the form
  description?: string; //Optional description input
  priority: "low" | "medium" | "high"; //Priority selected in the form
  dueDate?: string; //Optional due date input
}

// Props expected by the TaskList component
export interface TaskListProps {
  tasks: Task[]; //List of tasks to render
  onDelete: (id: string) => void; //Function to delete a task by ID
  onStatusChange: (id: string, status: Task["status"]) => void; //Function to update the status of a task
}

// Props expected by the TaskForm component
export interface TaskFormProps {
  onAddTask: (task: TaskFormData) => void; //Callback to send form data to parent
}

// Props expected by the TaskFilter component
export interface TaskFilterProps {
  onFilterChange: (filters: Partial<FilterOptions>) => void; //Callback to update filters
}

// Shape of filter options applied to the task list
export interface FilterOptions {
  status?: Task["status"]; //Optional status filter
  priority?: Task["priority"]; //Optional priority filter
  search?: string; //Optional search string for task title or description
}
