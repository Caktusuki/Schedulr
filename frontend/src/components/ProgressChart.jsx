export default function ProgressChart({ totalTasks, completedTasks, todayTasks }) {
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const dailyProgress = todayTasks > 0 ? Math.round((completedTasks / todayTasks) * 100) : 0;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
      <h3 className="text-sm sm:text-md md:text-lg font-semibold text-gray-800 dark:text-gray-100 mb-6">Progress Overview</h3>
      
      {/* Overall Progress */}
      <div className="mb-6">
        <div className="flex flex-wrap justify-between items-center mb-2">
          <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Overall Completion</span>
          <span className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400">{completionRate}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
      </div>

      {/* Daily Progress */}
      <div className="mb-6">
        <div className="flex flex-wrap justify-between items-center mb-2">
          <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Today's Progress</span>
          <span className="text-xs sm:text-sm font-bold text-green-600 dark:text-green-400">{dailyProgress}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-green-500 to-teal-600 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${dailyProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">{completedTasks}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Completed</div>
        </div>
        <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
          <div className="text-lg sm:text-xl md:text-2xl font-bold text-orange-600 dark:text-orange-400">{pendingTasks}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Pending</div>
        </div>
      </div>
    </div>
  );
}
