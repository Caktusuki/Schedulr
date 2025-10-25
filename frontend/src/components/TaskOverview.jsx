export default function TaskOverview({ tasks = [] }) {
  const todayTasks = tasks.filter(task => {
    const today = new Date().toDateString();
    const taskDate = new Date(task.dueDate || task.createdAt).toDateString();
    return taskDate === today;
  });

  const upcomingTasks = tasks.filter(task => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const taskDate = new Date(task.dueDate || task.createdAt);
    return taskDate > new Date() && taskDate <= tomorrow;
  });

  const overdueTasks = tasks.filter(task => {
    const taskDate = new Date(task.dueDate || task.createdAt);
    return taskDate < new Date() && task.status !== 'completed';
  });

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
      <h3 className="text-sm sm:text-md md:text-lg font-semibold text-gray-800 dark:text-gray-200 mb-6">Task Overview</h3>
      
      {/* Today's Tasks */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Today's Tasks</span>
          <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 text-xs font-medium px-2 py-1 rounded-full">
            {todayTasks.length}
          </span>
        </div>
        {todayTasks.length > 0 ? (
          <div className="space-y-2">
            {todayTasks.slice(0, 3).map((task, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <span className="text-sm text-gray-700 dark:text-gray-300 truncate flex-1">{task.title}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  task.priority === 'high' ? 'bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100' :
                  task.priority === 'medium' ? 'bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100' :
                  'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100'
                }`}>
                  {task.priority || 'low'}
                </span>
              </div>
            ))}
            {todayTasks.length > 3 && (
              <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                +{todayTasks.length - 3} more tasks
              </div>
            )}
          </div>
        ) : (
          <div className="text-sm text-gray-500 dark:text-gray-400 italic">No tasks for today</div>
        )}
      </div>

      {/* Upcoming Tasks */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Upcoming</span>
          <span className="bg-orange-100 dark:bg-orange-800 text-orange-800 dark:text-orange-100 text-xs font-medium px-2 py-1 rounded-full">
            {upcomingTasks.length}
          </span>
        </div>
        {upcomingTasks.length > 0 ? (
          <div className="space-y-2">
            {upcomingTasks.slice(0, 2).map((task, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-orange-50 dark:bg-orange-900 rounded-lg">
                <span className="text-sm text-gray-700 dark:text-gray-300 truncate flex-1">{task.title}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(task.dueDate || task.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-500 dark:text-gray-400 italic">No upcoming tasks</div>
        )}
      </div>

      {/* Overdue Tasks */}
      {overdueTasks.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Overdue</span>
            <span className="bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100 text-xs font-medium px-2 py-1 rounded-full">
              {overdueTasks.length}
            </span>
          </div>
          <div className="space-y-2">
            {overdueTasks.slice(0, 2).map((task, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-red-50 dark:bg-red-900 rounded-lg">
                <span className="text-sm text-gray-700 dark:text-gray-300 truncate flex-1">{task.title}</span>
                <span className="text-xs text-red-600 dark:text-red-400 font-medium">
                  Overdue
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
