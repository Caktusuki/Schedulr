import { useNavigate } from 'react-router-dom';
import Hero from "../components/Hero.jsx";
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
    <div className="space-y-8">
      <Hero />
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/tasks')}>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Tasks</h3>
          <p className="text-3xl font-bold text-blue-600">{taskStats.total}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/tasks')}>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Pending</h3>
          <p className="text-3xl font-bold text-orange-600">{taskStats.pending}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/tasks')}>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Completed</h3>
          <p className="text-3xl font-bold text-green-600">{taskStats.completed}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/tasks')}>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Overdue</h3>
          <p className="text-3xl font-bold text-red-600">{taskStats.overdue}</p>
        </div>
      </div>

      {/* Daily Habits Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Today's Habits</h3>
            <p className="text-sm text-gray-500">
              {dailyTaskStats.completed} of {dailyTaskStats.total} completed ({dailyTaskStats.completionRate}%)
            </p>
          </div>
          <button 
            onClick={() => navigate('/schedule?tab=daily')}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Manage Habits →
          </button>
        </div>
        
        {dailyTasks.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-500 mb-2">No daily habits set up</p>
            <button 
              onClick={() => navigate('/schedule?tab=daily')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Create your first daily habit →
            </button>
          </div>
        ) : (
          <>
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
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
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => toggleDailyTaskCompletion(task.id)}
                >
                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      task.isCompleted 
                        ? 'bg-green-500 border-green-500' 
                        : 'border-gray-300'
                    }`}>
                      {task.isCompleted && (
                        <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${
                        task.isCompleted ? 'line-through text-gray-500' : 'text-gray-900'
                      }`}>
                        {task.name}
                      </p>
                      <p className="text-xs text-gray-500">{task.time}</p>
                    </div>
                    {task.streak > 0 && (
                      <span className="text-xs text-orange-600">🔥{task.streak}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {dailyTasks.length > 6 && (
              <div className="text-center mt-3">
                <p className="text-sm text-gray-500">
                  +{dailyTasks.length - 6} more habits
                </p>
              </div>
            )}
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Schedule */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Today's Tasks</h3>
            <button 
              onClick={() => navigate('/schedule')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View Schedule →
            </button>
          </div>
          
          {todayTasks.length === 0 ? (
            <p className="text-gray-500">No tasks scheduled for today</p>
          ) : (
            <div className="space-y-3">
              {todayTasks.slice(0, 3).map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{task.name}</p>
                    <p className="text-sm text-gray-500">{task.priority} priority</p>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    task.status === 'completed' ? 'bg-green-100 text-green-800' :
                    task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {task.status}
                  </div>
                </div>
              ))}
              {todayTasks.length > 3 && (
                <p className="text-sm text-gray-500 text-center">
                  +{todayTasks.length - 3} more tasks
                </p>
              )}
            </div>
          )}
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Upcoming Tasks</h3>
            <button 
              onClick={() => navigate('/calendar')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View Calendar →
            </button>
          </div>
          
          {upcomingTasks.length === 0 ? (
            <p className="text-gray-500">No upcoming tasks</p>
          ) : (
            <div className="space-y-3">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{task.name}</p>
                    <p className="text-sm text-gray-500">
                      Due: {new Date(task.deadline).toLocaleDateString()}
                    </p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    task.priority === 'high' ? 'bg-red-500' :
                    task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Overdue Tasks Alert */}
      {overdueTasks.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-red-800">
                ⚠️ {overdueTasks.length} Overdue Task{overdueTasks.length > 1 ? 's' : ''}
              </h3>
              <p className="text-red-600">These tasks need immediate attention</p>
            </div>
            <button 
              onClick={() => navigate('/tasks')}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Review Tasks
            </button>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button 
            onClick={() => navigate('/tasks')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <div className="text-2xl mb-2">📝</div>
            <h4 className="font-medium text-gray-800">Add New Task</h4>
            <p className="text-sm text-gray-500">Create and organize your tasks</p>
          </button>
          
          <button 
            onClick={() => navigate('/schedule?tab=daily')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <div className="text-2xl mb-2">🎯</div>
            <h4 className="font-medium text-gray-800">Daily Habits</h4>
            <p className="text-sm text-gray-500">Manage recurring daily routines</p>
          </button>
          
          <button 
            onClick={() => navigate('/calendar')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <div className="text-2xl mb-2">📅</div>
            <h4 className="font-medium text-gray-800">View Calendar</h4>
            <p className="text-sm text-gray-500">See tasks in calendar view</p>
          </button>
          
          <button 
            onClick={() => navigate('/schedule')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <div className="text-2xl mb-2">⏰</div>
            <h4 className="font-medium text-gray-800">Plan Schedule</h4>
            <p className="text-sm text-gray-500">Organize your day and week</p>
          </button>
        </div>
      </div>
    </div>
  );
}
