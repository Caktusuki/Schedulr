import { useState } from 'react';
import { TaskContext } from './taskContext.js';
import { generateRecurringInstances } from '../utils/taskUtils.js';

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: 'Complete project proposal',
      description: 'Draft and finalize the project proposal for the client meeting.',
      deadline: '2025-10-15',
      priority: 'high',
      status: 'in-progress',
      createdAt: '2025-10-01T10:00:00Z',
      updatedAt: '2025-10-01T10:00:00Z'
    },
    {
      id: 2,
      name: 'Review design mockups',
      description: 'Go through the latest design mockups and provide feedback.',
      deadline: '2025-10-10',
      priority: 'medium',
      status: 'pending',
      createdAt: '2025-10-01T11:00:00Z',
      updatedAt: '2025-10-01T11:00:00Z'
    },
    {
      id: 3,
      name: 'Update documentation',
      description: 'Update the API documentation with recent changes.',
      deadline: '2025-10-08',
      priority: 'low',
      status: 'completed',
      createdAt: '2025-09-28T14:00:00Z',
      updatedAt: '2025-10-01T09:00:00Z'
    },
    {
      id: 4,
      name: 'Daily standup meeting',
      description: 'Participate in the daily team standup meeting.',
      deadline: '2025-10-02',
      priority: 'medium',
      status: 'pending',
      isRecurring: true,
      recurrence: {
        type: 'daily',
        interval: 1,
        endDate: '2025-10-31'
      },
      createdAt: '2025-10-01T12:00:00Z',
      updatedAt: '2025-10-01T12:00:00Z'
    },
    {
      id: 5,
      name: 'Weekly team retrospective',
      description: 'Reflect on the week and plan improvements for the next sprint.',
      deadline: '2025-10-07',
      priority: 'high',
      status: 'pending',
      isRecurring: true,
      recurrence: {
        type: 'weekly',
        interval: 1,
        endDate: ''
      },
      createdAt: '2025-10-01T13:00:00Z',
      updatedAt: '2025-10-01T13:00:00Z'
    }
  ]);

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