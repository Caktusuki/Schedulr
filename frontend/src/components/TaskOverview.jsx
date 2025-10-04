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
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Task Overview</h3>
      
      {/* Today's Tasks */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Today's Tasks</span>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
            {todayTasks.length}
          </span>
        </div>
        {todayTasks.length > 0 ? (
          <div className="space-y-2">
            {todayTasks.slice(0, 3).map((task, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                <span className="text-sm text-gray-700 truncate flex-1">{task.title}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  task.priority === 'high' ? 'bg-red-100 text-red-800' :
                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {task.priority || 'low'}
                </span>
              </div>
            ))}
            {todayTasks.length > 3 && (
              <div className="text-xs text-gray-500 text-center">
                +{todayTasks.length - 3} more tasks
              </div>
            )}
          </div>
        ) : (
          <div className="text-sm text-gray-500 italic">No tasks for today</div>
        )}
      </div>

      {/* Upcoming Tasks */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Upcoming</span>
          <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded-full">
            {upcomingTasks.length}
          </span>
        </div>
        {upcomingTasks.length > 0 ? (
          <div className="space-y-2">
            {upcomingTasks.slice(0, 2).map((task, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-orange-50 rounded-lg">
                <span className="text-sm text-gray-700 truncate flex-1">{task.title}</span>
                <span className="text-xs text-gray-500">
                  {new Date(task.dueDate || task.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-500 italic">No upcoming tasks</div>
        )}
      </div>

      {/* Overdue Tasks */}
      {overdueTasks.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Overdue</span>
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
              {overdueTasks.length}
            </span>
          </div>
          <div className="space-y-2">
            {overdueTasks.slice(0, 2).map((task, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                <span className="text-sm text-gray-700 truncate flex-1">{task.title}</span>
                <span className="text-xs text-red-600 font-medium">
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
