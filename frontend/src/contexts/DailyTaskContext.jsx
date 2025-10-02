import { useState, useEffect } from 'react';
import { DailyTaskContext } from './dailyTaskContext.js';

const STORAGE_KEY = 'schedulr_daily_tasks';
const RESET_DATE_KEY = 'schedulr_last_reset_date';

const getStoredTasks = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [
      {
        id: 1,
        name: 'Study DSA',
        description: 'Daily 1-hour Data Structures and Algorithms practice',
        time: '09:00',
        isCompleted: false,
        isActive: true,
        category: 'Learning',
        order: 1,
        createdAt: '2025-10-01T09:00:00Z',
        streak: 5,
        totalCompletions: 15,
        lastCompleted: '2025-10-01'
      },
      {
        id: 2,
        name: 'Morning Exercise',
        description: '30-minute morning workout or walk',
        time: '06:30',
        isCompleted: false,
        isActive: true,
        category: 'Health',
        order: 2,
        createdAt: '2025-09-28T06:30:00Z',
        streak: 3,
        totalCompletions: 8,
        lastCompleted: '2025-10-01'
      },
      {
        id: 3,
        name: 'Journaling',
        description: 'Write daily thoughts and reflections',
        time: '21:00',
        isCompleted: true,
        isActive: true,
        category: 'Personal',
        order: 3,
        createdAt: '2025-09-25T21:00:00Z',
        streak: 7,
        totalCompletions: 12,
        lastCompleted: '2025-10-02'
      },
      {
        id: 4,
        name: 'Brush Teeth',
        description: 'Morning dental hygiene routine',
        time: '07:00',
        isCompleted: true,
        isActive: true,
        category: 'Health',
        order: 4,
        createdAt: '2025-10-01T07:00:00Z',
        streak: 1,
        totalCompletions: 1,
        lastCompleted: '2025-10-02'
      }
    ];
  } catch (error) {
    console.error('Error loading daily tasks from localStorage:', error);
    return [];
  }
};

const getStoredResetDate = () => {
  try {
    return localStorage.getItem(RESET_DATE_KEY) || new Date().toISOString().split('T')[0];
  } catch (error) {
    console.error('Error loading reset date from localStorage:', error);
    return new Date().toISOString().split('T')[0];
  }
};

export const DailyTaskProvider = ({ children }) => {
  const [dailyTasks, setDailyTasks] = useState(getStoredTasks);
  const [lastResetDate, setLastResetDate] = useState(getStoredResetDate);

  // Persist tasks to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dailyTasks));
    } catch (error) {
      console.error('Error saving daily tasks to localStorage:', error);
    }
  }, [dailyTasks]);

  // Persist reset date to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(RESET_DATE_KEY, lastResetDate);
    } catch (error) {
      console.error('Error saving reset date to localStorage:', error);
    }
  }, [lastResetDate]);

  // Check if we need to reset daily tasks for a new day
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (lastResetDate !== today) {
      resetDailyTasks();
      setLastResetDate(today);
    }
  }, [lastResetDate]);

  const resetDailyTasks = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    setDailyTasks(prevTasks => 
      prevTasks.map(task => {
        // Calculate streak
        let newStreak = task.streak;
        if (task.isCompleted && task.lastCompleted === yesterdayStr) {
          // Maintain streak if completed yesterday
          newStreak = task.streak;
        } else if (task.isCompleted && task.lastCompleted !== yesterdayStr) {
          // Reset streak if there's a gap
          newStreak = 0;
        } else if (!task.isCompleted && task.lastCompleted === yesterdayStr) {
          // Maintain streak if not completed today but completed yesterday
          newStreak = task.streak;
        } else {
          // Break streak if not completed and wasn't completed yesterday
          newStreak = 0;
        }

        return {
          ...task,
          isCompleted: false, // Reset completion status for new day
          streak: newStreak
        };
      })
    );
  };

  const addDailyTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: Date.now(), // Simple ID generation
      isCompleted: false,
      isActive: true,
      order: dailyTasks.length + 1, // Add to end
      createdAt: new Date().toISOString(),
      streak: 0,
      totalCompletions: 0,
      lastCompleted: null
    };
    setDailyTasks(prev => [...prev, newTask]);
  };

  const updateDailyTask = (taskId, updatedData) => {
    setDailyTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, ...updatedData } : task
      )
    );
  };

  const deleteDailyTask = (taskId) => {
    setDailyTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const toggleDailyTaskCompletion = (taskId) => {
    const today = new Date().toISOString().split('T')[0];
    
    setDailyTasks(prev => 
      prev.map(task => {
        if (task.id === taskId) {
          const newIsCompleted = !task.isCompleted;
          let newStreak = task.streak;
          let newTotalCompletions = task.totalCompletions;

          if (newIsCompleted) {
            // Task completed
            newTotalCompletions += 1;
            
            // Check if this continues a streak
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];
            
            if (task.lastCompleted === yesterdayStr || task.streak === 0) {
              newStreak = task.streak + 1;
            } else {
              newStreak = 1; // Start new streak
            }
          } else {
            // Task uncompleted
            newTotalCompletions = Math.max(0, task.totalCompletions - 1);
            newStreak = Math.max(0, task.streak - 1);
          }

          return {
            ...task,
            isCompleted: newIsCompleted,
            lastCompleted: newIsCompleted ? today : task.lastCompleted,
            streak: newStreak,
            totalCompletions: newTotalCompletions
          };
        }
        return task;
      })
    );
  };

  const getDailyTaskStats = () => {
    const activeTasks = dailyTasks.filter(task => task.isActive);
    const completedToday = activeTasks.filter(task => task.isCompleted);
    const totalActive = activeTasks.length;
    const completionRate = totalActive > 0 ? Math.round((completedToday.length / totalActive) * 100) : 0;
    
    return {
      total: totalActive,
      completed: completedToday.length,
      remaining: totalActive - completedToday.length,
      completionRate
    };
  };

  const getDailyTasksByCategory = () => {
    const categories = {};
    dailyTasks.filter(task => task.isActive).forEach(task => {
      if (!categories[task.category]) {
        categories[task.category] = [];
      }
      categories[task.category].push(task);
    });
    return categories;
  };

  const reorderDailyTasks = (dragIndex, hoverIndex) => {
    setDailyTasks(prev => {
      const activeTasks = prev.filter(task => task.isActive).sort((a, b) => a.order - b.order);
      const inactiveTasks = prev.filter(task => !task.isActive);
      
      const draggedTask = activeTasks[dragIndex];
      const newActiveTasks = [...activeTasks];
      
      // Remove dragged task
      newActiveTasks.splice(dragIndex, 1);
      // Insert at new position
      newActiveTasks.splice(hoverIndex, 0, draggedTask);
      
      // Update order for all tasks
      const reorderedTasks = newActiveTasks.map((task, index) => ({
        ...task,
        order: index + 1
      }));
      
      return [...reorderedTasks, ...inactiveTasks];
    });
  };

  const moveTaskUp = (taskId) => {
    setDailyTasks(prev => {
      const activeTasks = prev.filter(task => task.isActive).sort((a, b) => a.order - b.order);
      const inactiveTasks = prev.filter(task => !task.isActive);
      
      const taskIndex = activeTasks.findIndex(task => task.id === taskId);
      if (taskIndex > 0) {
        const newTasks = [...activeTasks];
        [newTasks[taskIndex], newTasks[taskIndex - 1]] = [newTasks[taskIndex - 1], newTasks[taskIndex]];
        
        // Update orders
        const reorderedTasks = newTasks.map((task, index) => ({
          ...task,
          order: index + 1
        }));
        
        return [...reorderedTasks, ...inactiveTasks];
      }
      return prev;
    });
  };

  const moveTaskDown = (taskId) => {
    setDailyTasks(prev => {
      const activeTasks = prev.filter(task => task.isActive).sort((a, b) => a.order - b.order);
      const inactiveTasks = prev.filter(task => !task.isActive);
      
      const taskIndex = activeTasks.findIndex(task => task.id === taskId);
      if (taskIndex < activeTasks.length - 1) {
        const newTasks = [...activeTasks];
        [newTasks[taskIndex], newTasks[taskIndex + 1]] = [newTasks[taskIndex + 1], newTasks[taskIndex]];
        
        // Update orders
        const reorderedTasks = newTasks.map((task, index) => ({
          ...task,
          order: index + 1
        }));
        
        return [...reorderedTasks, ...inactiveTasks];
      }
      return prev;
    });
  };

  const contextValue = {
    dailyTasks: dailyTasks.filter(task => task.isActive).sort((a, b) => a.order - b.order),
    addDailyTask,
    updateDailyTask,
    deleteDailyTask,
    toggleDailyTaskCompletion,
    getDailyTaskStats,
    getDailyTasksByCategory,
    resetDailyTasks,
    reorderDailyTasks,
    moveTaskUp,
    moveTaskDown
  };

  return (
    <DailyTaskContext.Provider value={contextValue}>
      {children}
    </DailyTaskContext.Provider>
  );
};