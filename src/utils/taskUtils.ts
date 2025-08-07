import { type Task, type FilterOptions } from "../types";

//this function filters and searches tasks based on filters
export function filterTasks(
  tasks: Task[],
  filters: Partial<FilterOptions>
): Task[] {
  return tasks.filter((task) => {
    //check status filter
    if (filters.status && task.status !== filters.status) return false;

    //check priority filter
    if (filters.priority && task.priority !== filters.priority) return false;

    //check search filter (title or description)
    if (filters.search) {
      const searchText = filters.search.toLowerCase();
      const inTitle = task.title.toLowerCase().includes(searchText);
      const inDesc =
        task.description?.toLowerCase().includes(searchText) ?? false;
      if (!inTitle && !inDesc) return false;
    }

    return true;
  });
}
