import { useNavigate } from 'react-router-dom';
import Hero from "../components/Hero.jsx";
import MetricCard from "../components/MetricCard.jsx";
import ProgressChart from "../components/ProgressChart.jsx";
import { useTaskContext } from '../hooks/useTaskContext.js';
import { useDailyTaskContext } from '../hooks/useDailyTaskContext.js';

export default function DashboardPage() {
  const { getUpcomingTasks, getOverdueTasks, getTaskStats, getTasksForDate } = useTaskContext();
  const { dailyTasks, getDailyTaskStats, toggleDailyTaskCompletion } = useDailyTaskContext();
  const navigate = useNavigate();
  
  const taskStats = getTaskStats();
  const upcomingTasks = getUpcomingTasks(5);
  const overdueTasks = getOverdueTasks();
  const todayTasks = getTasksForDate(new Date().toISOString().split('T')[0]);
  const dailyTaskStats = getDailyTaskStats();

  return (
    <div className="space-y-8 dark:bg-gray-900 dark:text-gray-100">
      <Hero 
        userName="User"
        todayTasks={todayTasks.length}
        completedTasks={taskStats.completed}
      />
      
      {/* Quick Stats */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div onClick={() => navigate('/tasks')}>
          <MetricCard 
            title="Total Tasks" 
            count={taskStats.total} 
            bgColor="bg-slate-50 dark:bg-gray-800" 
            textColor="text-blue-600 dark:text-blue-400"
            icon={<img width="70" height="70" src="https://img.icons8.com/bubbles/70/task.png" alt="task"/>}
          />
        </div>
        
        <div onClick={() => navigate('/tasks')}>
          <MetricCard 
            title="Pending" 
            count={taskStats.pending} 
            bgColor="bg-slate-50 dark:bg-gray-800" 
            textColor="text-orange-600 dark:text-orange-400"
            icon={<img width="50" height="50" src="https://img.icons8.com/emoji/50/hourglass-done.png" alt="hourglass-done"/>}
          />
        </div>
        
        <div onClick={() => navigate('/tasks')}>
          <MetricCard 
            title="Completed" 
            count={taskStats.completed} 
            bgColor="bg-slate-50 dark:bg-gray-800" 
            textColor="text-green-600 dark:text-green-400"
            icon={<img width="48" height="48" src="https://img.icons8.com/fluency/48/approval.png" alt="approval"/>}
          />
        </div>
        
        <div onClick={() => navigate('/tasks')}>
          <MetricCard 
            title="Overdue" 
            count={taskStats.overdue} 
            bgColor="bg-slate-50 dark:bg-gray-800" 
            textColor="text-red-600 dark:text-red-400"
            icon={<img width="64" height="64" src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-deadline-agile-flaticons-flat-flat-icons-2.png" alt="external-deadline-agile-flaticons-flat-flat-icons-2"/>}
          />
        </div>
      </div>

      {/* Daily Habits Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Today's Habits</h3>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {dailyTaskStats.completed} of {dailyTaskStats.total} completed ({dailyTaskStats.completionRate}%)
            </p>
          </div>
          <button 
            onClick={() => navigate('/schedule?tab=daily')}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
          >
            Manage Habits →
          </button>
        </div>
        
        {dailyTasks.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-500 dark:text-gray-400 mb-2">No daily habits set up</p>
            <button 
              onClick={() => navigate('/schedule?tab=daily')}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
            >
              Create your first daily habit →
            </button>
          </div>
        ) : (
          <>
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${dailyTaskStats.completionRate}%` }}
                ></div>
              </div>
            </div>
            
            {/* Daily Tasks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-40 overflow-y-auto">
              {dailyTasks.slice(0, 6).map((task) => (
                <div 
                  key={task.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    task.isCompleted 
                      ? 'bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700' 
                      : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                  onClick={() => toggleDailyTaskCompletion(task.id)}
                >
                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      task.isCompleted 
                        ? 'bg-green-500 border-green-500' 
                        : 'border-gray-300 dark:border-gray-500'
                    }`}>
                      {task.isCompleted && (
                        <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${
                        task.isCompleted ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-gray-100'
                      }`}>
                        {task.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-300">{task.time}</p>
                    </div>
                    {task.streak > 0 && (
                      <span className="text-xs text-orange-600 dark:text-orange-400">🔥{task.streak}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {dailyTasks.length > 6 && (
              <div className="text-center mt-3">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  +{dailyTasks.length - 6} more habits
                </p>
              </div>
            )}
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Schedule */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm sm:text-md md:text-lg font-semibold text-gray-800 dark:text-gray-100">Today's Tasks</h3>
            <button 
              onClick={() => navigate('/schedule')}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
            >
              View Schedule →
            </button>
          </div>
          
          {todayTasks.length === 0 ? (
            <p className="text-sm sm:text-md md:text-lg text-gray-500 dark:text-gray-300">No tasks scheduled for today</p>
          ) : (
            <div className="space-y-3">
              {todayTasks.slice(0, 3).map((task) => (
                <div key={task.id} className="flex flex-wrap items-center gap-2 justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-100">{task.name}</p>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300">{task.priority} priority</p>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    task.status === 'completed' ? 'bg-green-100 dark:bg-green-700 text-green-800 dark:text-green-300' :
                    task.status === 'in-progress' ? 'bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-300' :
                    'bg-yellow-100 dark:bg-yellow-700 text-yellow-800 dark:text-yellow-300'
                  }`}>
                    {task.status}
                  </div>
                </div>
              ))}
              {todayTasks.length > 3 && (
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center">
                  +{todayTasks.length - 3} more tasks
                </p>
              )}
            </div>
          )}
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex flex-wrap items-center justify-between mb-4">
            <h3 className="text-sm sm:text-md md:text-lg font-semibold text-gray-800 dark:text-gray-100">Upcoming Tasks</h3>
            <button 
              onClick={() => navigate('/calendar')}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
            >
              View Calendar →
            </button>
          </div>
          
          {upcomingTasks.length === 0 ? (
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">No upcoming tasks</p>
          ) : (
            <div className="space-y-3">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="text-sm sm:text-md md:text-lg font-medium text-gray-800 dark:text-gray-100">{task.name}</p>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300">
                      Due: {new Date(task.deadline).toLocaleDateString()}
                    </p>
                  </div>
                  <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                    task.priority === 'high' ? 'bg-red-500 dark:bg-red-400' :
                    task.priority === 'medium' ? 'bg-yellow-500 dark:bg-yellow-400' : 'bg-green-500 dark:bg-green-400'
                  }`}></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ProgressChart 
            totalTasks={taskStats.total}
            completedTasks={taskStats.completed}
            todayTasks={todayTasks.length}
          />
        </div>
        <div className="space-y-6">
          {/* Additional metrics or widgets can go here */}
        </div>
      </div>

      {/* Overdue Tasks Alert */}
      {overdueTasks.length > 0 && (
        <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-6">
          <div className="flex flex-wrap items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-md md:text-lg font-semibold text-red-800 dark:text-red-300">
                ⚠️ {overdueTasks.length} Overdue Task{overdueTasks.length > 1 ? 's' : ''}
              </h3>
              <p className="text-sm sm:text-md text-red-600 dark:text-red-200">These tasks need immediate attention</p>
            </div>
            <button 
              onClick={() => navigate('/tasks')}
              className="px-4 py-2 bg-red-600 dark:bg-red-700 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition-colors"
            >
              Review Tasks
            </button>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-sm sm:text-md md:text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button 
            onClick={() => navigate('/tasks')}
            className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
          >
            <div className="mb-2"><img width="48" height="48" src="https://img.icons8.com/external-bearicons-flat-bearicons/64/external-New-Task-reminder-and-to-do-bearicons-flat-bearicons.png" alt="external-New-Task-reminder-and-to-do-bearicons-flat-bearicons"/></div>
            <h4 className="text-sm sm:text-md md:text-lg font-medium text-gray-800 dark:text-gray-100">Add New Task</h4>
            <p className="text-sm text-gray-500 dark:text-gray-300">Create and organize your tasks</p>
          </button>
          
          <button 
            onClick={() => navigate('/schedule?tab=daily')}
            className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
          >
            <div className="text-2xl mb-2">🎯</div>
            <h4 className="font-medium text-gray-800 dark:text-gray-100">Daily Habits</h4>
            <p className="text-sm text-gray-500 dark:text-gray-300">Manage recurring daily routines</p>
          </button>
          
          <button 
            onClick={() => navigate('/calendar')}
            className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
          >
            <div className="mb-2"><img width="48" height="48" src="https://img.icons8.com/color/48/calendar--v1.png" alt="calendar--v1"/></div>
            <h4 className="text-sm sm:text-md md:text-lg font-medium text-gray-800 dark:text-gray-100">View Calendar</h4>
            <p className="text-sm text-gray-500 dark:text-gray-300">See tasks in calendar view</p>
          </button>
          
          <button 
            onClick={() => navigate('/schedule')}
            className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
          >
            <div className="mb-2"><img width="48" height="48" src="https://img.icons8.com/color/48/overtime.png" alt="overtime"/></div>
            <h4 className="text-sm sm:text-md md:text-lg font-medium text-gray-800 dark:text-gray-100">Plan Schedule</h4>
            <p className="text-sm text-gray-500 dark:text-gray-300">Organize your day and week</p>
          </button>
          
          <button 
            onClick={() => navigate('/settings')}
            className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
          >
            <div className="mb-2"><img width="48" height="48" src="https://img.icons8.com/color/48/settings--v1.png" alt="settings--v1"/></div>
            <h4 className="text-sm sm:text-md md:text-lg font-medium text-gray-800 dark:text-gray-100">Settings</h4>
            <p className="text-sm text-gray-500 dark:text-gray-300">Configure your preferences</p>
          </button>
        </div>
      </div>
    </div>
  );
}
