### SBA 9: React Dashboard Application

A React application that demonstrates an understanding of React components, state management, TypeScript integration, form handling, and component composition.

---

#### Folder Structure

```bash
task-dashboard/
    ├── src/
    │   ├── components/
    │   │   ├── TaskList/
    │   │   │   ├── TaskList.tsx
    │   │   │   └── TaskItem.tsx
    │   │   ├── TaskForm/
    │   │   │   └── TaskForm.tsx
    │   │   ├── TaskFilter/
    │   │   │   └── TaskFilter.tsx
    │   │   └── Dashboard/
    │   │       └── Dashboard.tsx
    │   ├── types/
    │   │   └── index.ts
    │   ├── utils/
    │   │   └── taskUtils.ts
    │   ├── App.tsx
    ├── main.tsx
    └── package.json
```

#### Cloning the Repository

To clone this repository, open terminal or command prompt and run the following command:

```bash
git clone https://github.com/urmee04/Task-Dashboard-React-TS.git
cd task-dashboard
npm install
npm run dev
```

#### Reflection

**How you implemented React and TypeScript features**

In this project, I built a task management dashboard using React for UI rendering and TypeScript for type safety. I created reusable components such as TaskForm, TaskList, TaskItem, and TaskFilter, each with strongly-typed props and state.

I defined all custom interfaces for tasks, form data, and filter options in a shared types/index.ts file. This helped ensure consistent data structures across components.

I used the useState hook to manage tasks and filters, and useEffect to load and save data from localStorage. I also used event handlers and props to pass functions between parent and child components (e.g., adding a task or updating its status).

**The challenges you encountered and how you overcame them**

One of the key challenges I faced was syncing the task list with localStorage correctly. At first, tasks would disappear after a page refresh because `useEffect` in Dashboard.tsx file was having issues from `StrictMode` functionality.

To fix this, as a temporary solution, I disabled the `StrictMode` and localStorage is performing fine now.

Another challenge was managing the layout and alignment of the status dropdown in TaskItem. I used Tailwind CSS and Flexbox utilities to structure the card layout and ensure consistent spacing and alignment.

Debugging localStorage also taught me the importance of using console.log and the browser’s DevTools to inspect saved data and confirm everything is working as expected.

**Your approach to component composition and state management**

I used a top-down component architecture, with the Dashboard component serving as the central controller. All the task-related state (task list and filters) was kept in the Dashboard component.

The components are broken down as follows:

`TaskForm`: A controlled form that collects user input and passes the data to Dashboard using onAddTask.

`TaskFilter`: Sends selected filter options to Dashboard to control which tasks are shown.

`TaskList`: Receives the filtered list and renders each TaskItem.

`TaskItem`: Handles individual task display, including delete and status change.

This structure allowed me to lift state up to a single source of truth and pass down data and handlers via props, which is a best practice in React for predictable behavior. It also kept each component focused on one responsibility.

#### References

Besides class lectures and materials, I also used previous similar labs/projects code references and the  below mentioned resources:

- [React Hooks Tutorial](https://www.youtube.com/watch?v=XEU3jlV9syI&t=281s)
- [usestate](https://react.dev/reference/react/useState)
- [useEffect](https://react.dev/reference/react/useEffect)



