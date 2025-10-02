// Utility functions for task management

export const generateRecurringInstances = (recurringTask, maxInstances = 10) => {
  const instances = [];
  const startDate = new Date(recurringTask.deadline);
  const endDate = recurringTask.recurrence.endDate ? new Date(recurringTask.recurrence.endDate) : null;
  const { type, interval } = recurringTask.recurrence;
  
  let currentDate = new Date(startDate);
  let instanceCount = 0;
  
  while (instanceCount < maxInstances) {
    // Check if we've reached the end date
    if (endDate && currentDate > endDate) break;
    
    // Create instance
    const instance = {
      ...recurringTask,
      id: `${recurringTask.id}_instance_${instanceCount}`,
      deadline: currentDate.toISOString().split('T')[0],
      isInstance: true,
      parentId: recurringTask.id,
      instanceNumber: instanceCount + 1,
      status: 'pending' // Reset status for new instances
    };
    
    instances.push(instance);
    
    // Calculate next occurrence
    switch (type) {
      case 'daily':
        currentDate.setDate(currentDate.getDate() + interval);
        break;
      case 'weekly':
        currentDate.setDate(currentDate.getDate() + (interval * 7));
        break;
      case 'monthly':
        currentDate.setMonth(currentDate.getMonth() + interval);
        break;
      case 'yearly':
        currentDate.setFullYear(currentDate.getFullYear() + interval);
        break;
    }
    
    instanceCount++;
  }
  
  return instances;
};

export const getTasksForDate = (tasks, date) => {
  const dateStr = date instanceof Date ? date.toISOString().split('T')[0] : date;
  return tasks.filter(task => task.deadline === dateStr);
};

export const getTasksForWeek = (tasks, weekStartDate) => {
  const weekStart = new Date(weekStartDate);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);
  
  return tasks.filter(task => {
    const taskDate = new Date(task.deadline);
    return taskDate >= weekStart && taskDate <= weekEnd;
  });
};

export const getUpcomingTasks = (tasks, limit = 10) => {
  const today = new Date().toISOString().split('T')[0];
  return tasks
    .filter(task => task.deadline >= today && task.status !== 'completed')
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, limit);
};

export const getOverdueTasks = (tasks) => {
  const today = new Date().toISOString().split('T')[0];
  return tasks.filter(task => task.deadline < today && task.status !== 'completed');
};

export const getTaskStats = (tasks) => {
  return {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    overdue: getOverdueTasks(tasks).length
  };
};