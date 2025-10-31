import { useDailyTaskContext } from '../hooks/useDailyTaskContext.js';

export default function DailyTaskStats() {
  const { getDailyTaskStats } = useDailyTaskContext();
  const stats = getDailyTaskStats();

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Today's Progress</h3>
      
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Total Tasks</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Completed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">{stats.remaining}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Remaining</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{stats.completionRate}%</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Complete</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${stats.completionRate}%` }}
        ></div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">
        {stats.completed} of {stats.total} daily tasks completed
      </p>
    </div>
  );
}
