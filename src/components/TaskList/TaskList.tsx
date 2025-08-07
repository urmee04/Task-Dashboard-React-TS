import React from "react";
import { type TaskListProps } from "../../types";
import TaskItem from "./TaskItem";

//TaskList component receives tasks and renders each one using TaskItem
const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onDelete,
  onStatusChange,
}) => {
  return (
    <div className="space-y-3">
      {" "}
      {/* Add vertical spacing between task items */}
      {tasks.map((task) => (
        <TaskItem
          key={task.id} //unique key for rendering list
          task={task} //task object passed to child
          onDelete={onDelete} //delete handler
          onStatusChange={onStatusChange} //status change handler
        />
      ))}
    </div>
  );
};

export default TaskList;
