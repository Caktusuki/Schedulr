import { useState, useEffect } from 'react';
import { TaskContext } from './taskContext.js';
import { generateRecurringInstances } from '../utils/taskUtils.js';
import { useUser } from './UserContext.jsx';

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const { user } = useUser();

  // Load tasks from localStorage when user changes
  useEffect(() => {
    if (user) {
      const userTasksKey = `tasks_${user.id}`;
      const storedTasks = localStorage.getItem(userTasksKey);
      if (storedTasks) {
        try {
          setTasks(JSON.parse(storedTasks));
        } catch (error) {
          console.error('Error parsing stored tasks:', error);
          setTasks([]);
        }
      } else {
        // If no tasks for this user, set empty array
        setTasks([]);
      }
    } else {
      // Clear tasks when no user is logged in
      setTasks([]);
    }
  }, [user]);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (user && tasks.length >= 0) {
      const userTasksKey = `tasks_${user.id}`;
      localStorage.setItem(userTasksKey, JSON.stringify(tasks));
    }
  }, [tasks, user]);

  // Task management functions
  const addTask = (taskData) => {
    let updatedTasks = [...tasks, taskData];
    
    // If it's a recurring task, generate instances
    if (taskData.isRecurring) {
      const instances = generateRecurringInstances(taskData, 5);
      updatedTasks = [...updatedTasks, ...instances];
    }
    
    setTasks(updatedTasks);
  };

  const updateTask = (taskId, updatedData) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, ...updatedData, updatedAt: new Date().toISOString() } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleTaskStatus = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      const newStatus = task.status === 'completed' ? 'pending' : 'completed';
      updateTask(taskId, { status: newStatus });
    }
  };

  const contextValue = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    setTasks
  };

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
};