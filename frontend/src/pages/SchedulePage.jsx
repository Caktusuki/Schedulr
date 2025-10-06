import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTaskContext } from '../hooks/useTaskContext.js';
import { useDailyTaskContext } from '../hooks/useDailyTaskContext.js';
import DailyTaskItem from '../components/DailyTaskItem.jsx';
import DailyTaskForm from '../components/DailyTaskForm.jsx';
import DailyTaskStats from '../components/DailyTaskStats.jsx';

function Tabs({ view, setView }) {
  return (
    <div className="flex mb-6 w-full">
      <button
        onClick={() => setView("daily")}
        className={`text-xs sm:text-sm px-1 sm:px-2 md:px-4 py-2 rounded-l-lg border transition-colors duration-200 
          ${view === "daily" ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
      >
        Daily View
      </button>
      <button
        onClick={() => setView("weekly")}
        className={`text-xs sm:text-sm px-1 sm:px-2 md:px-4 py-2 border transition-colors duration-200 sm:rounded-none
          ${view === "weekly" ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
      >
        Weekly View
      </button>
      <button
        onClick={() => setView("tasks")}
        className={`text-xs sm:text-sm px-1 sm:px-2 md:px-4 py-2 rounded-r-lg border transition-colors duration-200 
          ${view === "tasks" ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
      >
        Task Timeline
      </button>
    </div>
  );
}

export default function SchedulePage() {
  const { getTasksForDate, getTasksForWeek, toggleTaskStatus } = useTaskContext();
  const { dailyTasks } = useDailyTaskContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [view, setView] = useState("tasks");
  const [showDailyTaskForm, setShowDailyTaskForm] = useState(false);

  // Check URL params to set initial view
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['daily', 'weekly', 'tasks'].includes(tabParam)) {
      setView(tabParam);
    }
  }, [searchParams]);

  // Weekly state - now using real tasks from context
  
  // Get current week's start date (Monday)
  const getCurrentWeekStart = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const daysToMonday = currentDay === 0 ? -6 : 1 - currentDay;
    const monday = new Date(today);
    monday.setDate(today.getDate() + daysToMonday);
    return monday;
  };

  // Calculate statistics
  const stats = useMemo(() => {
    const allTasks = getAllTasks ? getAllTasks() : [];
    const today = new Date().toISOString().split('T')[0];
    const todayTasks = getTasksForDate(today);
    const weekTasks = getTasksForWeek(getCurrentWeekStart());
    
    return {
      total: allTasks.length,
      completed: allTasks.filter(task => task.status === 'completed').length,
      highPriority: allTasks.filter(task => task.priority === 'high' && task.status !== 'completed').length,
      thisWeek: weekTasks.length,
      today: todayTasks.length,
      week: weekTasks.length
    };
  }, [getAllTasks, getTasksForDate, getTasksForWeek]);

  const handleAddDailyTask = () => {
    setShowDailyTaskForm(true);
  };

  const generateReport = () => {
    let report = "📋 Daily Recurring Tasks:\n";
    if (dailyTasks.length === 0) {
      report += "No daily recurring tasks.\n";
    } else {
      dailyTasks.forEach(task => {
        report += `${task.time} - ${task.name} ${task.isCompleted ? '✅' : '⭕'}\n`;
      });
    }

    report += "\n📅 This Week's Scheduled Tasks:\n";
    const weekStart = getCurrentWeekStart();
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    days.forEach((day, index) => {
      const dayDate = new Date(weekStart);
      dayDate.setDate(weekStart.getDate() + index);
      const dateStr = dayDate.toISOString().split('T')[0];
      const dayTasks = getTasksForDate(dateStr);
      
      report += `${day} (${dayDate.toLocaleDateString()}):\n`;
      if (dayTasks.length === 0) {
        report += "  No tasks scheduled\n";
      } else {
        report += dayTasks.map(task => `  - ${task.name} (${task.priority} priority, ${task.status})`).join("\n") + "\n";
      }
    });

    alert(report);
  };

  return (
    <div className=" mx-auto w-full">
      <h1 className="text-xl sm:text-2xl font-semibold mb-6"> Schedule</h1>
      <Tabs view={view} setView={setView} />

      {view === "tasks" ? (
        <div className="space-y-6">
          {/* Task Timeline View */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-wrap items-center justify-between mb-6 gap-3">
              <h2 className="text-sm sm:text-md md:text-lg font-semibold text-gray-800">Task Timeline</h2>
              <button
                onClick={() => navigate('/tasks')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs sm:text-sm transition-colors"
              >
                <Plus size={18} className="mr-2" />
                Add Task
              </button>
            </div>
            
            {/* Today's Tasks */}
            <div className="mb-6">
              <h3 className="text-sm sm:text-md md:text-lg font-medium text-gray-700 mb-3">Today</h3>
              {getTasksForDate(new Date().toISOString().split('T')[0]).length === 0 ? (
                <p className="text-xs sm:text-sm text-gray-500">No tasks scheduled for today</p>
              ) : (
                <div className="space-y-2">
                  {getTasksForDate(new Date().toISOString().split('T')[0]).map((task) => (
                    <div
                      key={task.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        task.status === 'completed' 
                          ? 'bg-green-50 border-green-200' 
                          : task.priority === 'high' 
                            ? 'bg-red-50 border-red-200'
                            : task.priority === 'medium'
                              ? 'bg-yellow-50 border-yellow-200'
                              : 'bg-blue-50 border-blue-200'
                      }`}
                      onClick={() => toggleTaskStatus(task.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className={`font-medium ${task.status === 'completed' ? 'line-through text-gray-500' : ''} text-xs sm:text-sm`}>
                            {task.name}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-600 mt-1">{task.description}</p>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          task.status === 'completed' ? 'bg-green-500 border-green-500' : 'border-gray-300'
                        }`}>
                          {task.status === 'completed' && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {filter === 'all' ? 'No tasks for today' : `No ${filter} tasks`}
                      </h3>
                      <p className="text-gray-500 mb-4">
                        {filter === 'all' 
                          ? 'Add some tasks to get started with your day' 
                          : `Try changing the filter to see other tasks`
                        }
                      </p>
                      <button
                        onClick={() => navigate('/tasks')}
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                      >
                        Add Your First Task
                      </button>
                    </div>
                  );
                }

                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onClick={() => toggleTaskStatus(task.id)}
                        isToday={true}
                      />
                    ))}
                  </div>
                );
              })()}
            </div>

            {/* This Week's Tasks */}
            <div>
              <h3 className="text-sm sm:text-md md:text-lg font-medium text-gray-700 mb-3">This Week</h3>
              {(() => {
                const weekStart = getCurrentWeekStart();
                const weekTasks = getTasksForWeek(weekStart);
                
                if (weekTasks.length === 0) {
                  return <p className="text-xs sm:text-sm text-gray-500">No tasks scheduled for this week</p>;
                }

                // Group tasks by day
                const tasksByDay = {};
                const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                
                days.forEach((day, index) => {
                  const dayDate = new Date(weekStart);
                  dayDate.setDate(weekStart.getDate() + index);
                  const dateStr = dayDate.toISOString().split('T')[0];
                  tasksByDay[day] = getTasksForDate(dateStr);
                });

                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {days.map((day) => (
                      <div key={day} className="bg-gray-50 rounded-lg p-4">
                        <h4 className="text-sm sm:text-md font-medium text-gray-700 mb-3">{day}</h4>
                        {tasksByDay[day].length === 0 ? (
                          <p className="text-gray-400 text-xs sm:text-sm">No tasks</p>
                        ) : (
                          <div className="space-y-2">
                            {tasksByDay[day].map((task) => (
                              <div
                                key={task.id}
                                className="text-sm p-2 bg-white rounded border cursor-pointer hover:bg-gray-50"
                                onClick={() => toggleTaskStatus(task.id)}
                              >
                                <p className={`font-medium ${task.status === 'completed' ? 'line-through' : ''}`}>
                                  {task.name}
                                </p>
                                <p className="text-xs text-gray-500">{task.priority} priority</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      ) : view === "daily" ? (
        <div className="space-y-6">
          {/* Daily Task Stats */}
          <DailyTaskStats />
          
          {/* Add Daily Task Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Daily Recurring Tasks</h2>
              <p className="text-sm text-gray-600">Manage your daily habits and routines</p>
            </div>
            <button
              onClick={handleAddDailyTask}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Daily Task</span>
            </button>
          </div>

          {/* Daily Tasks List */}
          <div className="space-y-3">
            {dailyTasks.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 text-4xl mb-4">📝</div>
                <h3 className="text-lg font-medium text-gray-500 mb-2">No Daily Tasks Yet</h3>
                <p className="text-gray-400 mb-4">Create recurring daily tasks to build consistent habits</p>
                <button
                  onClick={handleAddDailyTask}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Add your first daily task →
                </button>
              </div>
            ) : (
              dailyTasks.map((task, index) => (
                <div key={task.id} className="group">
                  <DailyTaskItem 
                    task={task} 
                    canMoveUp={index > 0}
                    canMoveDown={index < dailyTasks.length - 1}
                  />
                </div>
              ))
            )}
          </div>

          {/* Daily Task Form Modal */}
          {showDailyTaskForm && (
            <DailyTaskForm onClose={() => setShowDailyTaskForm(false)} />
          )}
        </div>
      ) : (
        <div>
          {/* Week Navigation and Add Task Button */}
          <div className="flex flex-wrap gap-3 mb-6 items-center">
            <div className="flex-1 gap-2">
              <h2 className="text-md sm:text-lg font-semibold text-gray-800">
                Week of {getCurrentWeekStart().toLocaleDateString()}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">View and manage tasks for this week</p>
            </div>
            <button
              onClick={() => navigate('/tasks')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-xs sm:text-sm transition-colors"
            >
              Add New Task
            </button>
          </div>

          {/* Weekly Tasks Grid */}
          <div className="space-y-4">
            {(() => {
              const weekStart = getCurrentWeekStart();
              const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
              
              return days.map((day, index) => {
                const dayDate = new Date(weekStart);
                dayDate.setDate(weekStart.getDate() + index);
                const dateStr = dayDate.toISOString().split('T')[0];
                const dayTasks = getTasksForDate(dateStr);
                const isToday = dateStr === new Date().toISOString().split('T')[0];
                
                return (
                  <div key={day} className={`bg-white shadow-sm rounded-lg p-4 border ${
                    isToday ? 'border-blue-300 ring-2 ring-blue-100' : 'border-gray-200'
                  }`}>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div>
                        <h3 className={`text-sm sm:text-md md:text-lg font-semibold ${isToday ? 'text-blue-700' : 'text-gray-800'}`}>
                          {day} {isToday && '(Today)'}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500">
                          {dayDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {dayTasks.length} task{dayTasks.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    
                    {dayTasks.length === 0 ? (
                      <p className="text-xs sm:text-sm text-gray-400 italic">No tasks scheduled</p>
                    ) : (
                      <div className="space-y-2">
                        {dayTasks.map((task) => (
                          <div
                            key={task.id}
                            className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                              task.status === 'completed'
                                ? 'bg-green-50 border-green-200 text-green-800'
                                : task.priority === 'high'
                                  ? 'bg-red-50 border-red-200 hover:bg-red-100'
                                  : task.priority === 'medium'
                                    ? 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'
                                    : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                            }`}
                            onClick={() => toggleTaskStatus(task.id)}
                          >
                            <div className="flex flex-wrap items-center justify-between">
                              <div className="flex-1">
                                <p className={`text-xs sm:text-sm font-medium ${
                                  task.status === 'completed' ? 'line-through text-gray-500' : ''
                                }`}>
                                  {task.name}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className={`text-xs px-2 py-0.5 rounded ${
                                    task.priority === 'high' ? 'bg-red-100 text-red-700' :
                                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-green-100 text-green-700'
                                  }`}>
                                    {task.priority}
                                  </span>
                                  <span className="text-xs text-gray-500">{task.status}</span>
                                  {task.isRecurring && (
                                    <span className="text-xs text-blue-600">🔄 Recurring</span>
                                  )}
                                </div>
                              </div>
                              <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center ${
                                task.status === 'completed' ? 'bg-green-500 border-green-500' : 'border-gray-300'
                              }`}>
                                {task.status === 'completed' && (
                                  <svg className="w-2 h-2 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              });
            })()}
          </div>
        </div>
      )}

      <div className="flex justify-center mt-8">
        <button
          onClick={generateReport}
          className="px-6 py-2 sm:py-1 rounded-md bg-blue-500 text-white text-xs sm:text-sm md:text-lg"
        >
          Generate Schedule Report
        </button>
      </div>
    </div>
  );
}
