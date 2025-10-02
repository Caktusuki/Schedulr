import { useContext } from 'react';
import { TaskContext } from '../contexts/taskContext.js';
import { 
  getTasksForDate,
  getTasksForWeek,
  getUpcomingTasks,
  getOverdueTasks,
  getTaskStats
} from '../utils/taskUtils.js';

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  
  // Create helper functions that use the tasks from context
  const contextWithHelpers = {
    ...context,
    getTasksForDate: (date) => getTasksForDate(context.tasks, date),
    getTasksForWeek: (weekStartDate) => getTasksForWeek(context.tasks, weekStartDate),
    getUpcomingTasks: (limit = 10) => getUpcomingTasks(context.tasks, limit),
    getOverdueTasks: () => getOverdueTasks(context.tasks),
    getTaskStats: () => getTaskStats(context.tasks)
  };
  
  return contextWithHelpers;
};