import { createContext, useState, useEffect, useContext } from 'react';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  // 1. Initialize State from LocalStorage
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('myTasks');
    return saved ? JSON.parse(saved) : [];
  });

  // 2. Save to LocalStorage whenever 'tasks' changes
  useEffect(() => {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
  }, [tasks]);

  // 3. Actions
  const addTask = (newTask) => {
    // Add a unique ID and current timestamp
    const taskWithId = { ...newTask, id: Date.now().toString(), createdAt: new Date() };
    setTasks((prev) => [taskWithId, ...prev]);
  };

  const updateTask = (id, updatedTask) => {
    setTasks((prev) => prev.map(task => task.id === id ? { ...task, ...updatedTask } : task));
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter(task => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};