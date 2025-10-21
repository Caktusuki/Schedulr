import { useState, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import { useTaskContext } from '../hooks/useTaskContext.js';
import {
  Calendar,
  Clock,
  Plus,
  Filter,
  Download,
  CheckCircle,
  Circle,
  AlertCircle,
  TrendingUp,
  Users,
  Target
} from 'lucide-react';

// Enhanced Tabs Component with modern design
function Tabs({ view, setView, taskCounts }) {
  const tabs = [
    { id: "daily", label: "Daily View", icon: Clock, count: taskCounts.today },
    { id: "weekly", label: "Weekly View", icon: Calendar, count: taskCounts.week },
    { id: "tasks", label: "Task Timeline", icon: Target, count: taskCounts.total }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-1 mb-8">

      <div className="flex">
        {tabs.map(({ id, label, icon, count }) => {
          const IconComponent = icon;
          return (
            <button
              key={id}
              onClick={() => setView(id)}
              className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all duration-200 ${view === id
                ? "bg-blue-600 text-white shadow-lg transform scale-105"
                : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/40"

                }`}
            >
              <IconComponent size={18} className="mr-2" />
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{label.split(' ')[0]}</span>
              {count > 0 && (
                <span className={`ml-2 text-xs px-2 py-1 rounded-full ${view === id ? "bg-white/20" : "bg-blue-100 text-blue-600"
                  }`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Statistics Cards Component
function StatsCards({ stats }) {
  const cards = [
    {
      title: "Total Tasks",
      value: stats.total,
      icon: Target,
      color: "blue",
      change: "+12% from last week"
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: CheckCircle,
      color: "green",
      change: `${Math.round((stats.completed / stats.total) * 100) || 0}% completion rate`
    },
    {
      title: "High Priority",
      value: stats.highPriority,
      icon: AlertCircle,
      color: "red",
      change: "Needs attention"
    },
    {
      title: "This Week",
      value: stats.thisWeek,
      icon: Calendar,
      color: "purple",
      change: "Upcoming tasks"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map(({ title, value, icon, color, change }) => {
        const IconComponent = icon;
        return (
          <div key={title} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200">

            <div className="flex items-center justify-between mb-4">
            <div className={`p-2 rounded-lg bg-${color}-100 dark:bg-${color}-900/40`}>
              <IconComponent size={20} className={`text-${color}-600 dark:text-${color}-400`} />
            </div>

              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</span>

            </div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">{title}</h3>

            <p className="text-xs text-gray-500 dark:text-gray-400">{change}</p>

          </div>
        );
      })}
    </div>
  );
}

// Enhanced Task Card Component
function TaskCard({ task, onClick, isToday = false }) {
  const priorityStyles = {
    high: "bg-red-50 border-red-200 hover:bg-red-100",
    medium: "bg-yellow-50 border-yellow-200 hover:bg-yellow-100",
    low: "bg-green-50 border-green-200 hover:bg-green-100"
  };

  const priorityColors = {
    high: "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300",
    medium: "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300",
    low: "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
  };
  

  return (
    <div className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 
      ${task.status === 'completed'
        ? 'bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700 opacity-75'
        : priorityStyles[task.priority] + ' dark:' + priorityStyles[task.priority]
      } ${isToday ? 'ring-2 ring-blue-200 dark:ring-blue-700' : ''}`}
    >
    
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
        <h4 className={`font-semibold text-sm lg:text-base mb-1 ${task.status === 'completed' ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-gray-100'}`}>
            {task.name}
        </h4>

          {task.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{task.description}</p>

          )}
        </div>
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ml-3 ${task.status === 'completed' ? 'bg-green-500 border-green-500' : 'border-gray-300'
          }`}>
          {task.status === 'completed' && (
            <CheckCircle size={14} className="text-white" />
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
          {task.isRecurring && (
            <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">🔄</span>
          )}
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-300">{task.status}</span>

      </div>
    </div>
  );
}

export default function SchedulePage() {
  const { getTasksForDate, getTasksForWeek, toggleTaskStatus, getAllTasks } = useTaskContext();
  const navigate = useNavigate();
  const [view, setView] = useState("tasks");
  const [filter, setFilter] = useState("all");

  // Daily state
  const [dailyTasks, setDailyTasks] = useState([]);
  const [taskTime, setTaskTime] = useState("");
  const [taskName, setTaskName] = useState("");

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

  const addDailyTask = () => {
    if (!taskTime || !taskName.trim()) return;
    setDailyTasks([...dailyTasks, {
      id: Date.now(),
      time: taskTime,
      task: taskName.trim()
    }]);
    setTaskTime("");
    setTaskName("");
  };

  const generateReport = () => {
    const reportData = {
      generated: new Date().toLocaleString(),
      dailyTasks: dailyTasks,
      weeklyTasks: (() => {
        const weekStart = getCurrentWeekStart();
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        return days.map((day, index) => {
          const dayDate = new Date(weekStart);
          dayDate.setDate(weekStart.getDate() + index);
          const dateStr = dayDate.toISOString().split('T')[0];
          return {
            day,
            date: dayDate.toLocaleDateString(),
            tasks: getTasksForDate(dateStr)
          };
        });
      })(),
      statistics: stats
    };

    // Create downloadable report
    const reportText = `
📋 SCHEDULR REPORT
Generated: ${reportData.generated}

📊 STATISTICS
Total Tasks: ${stats.total}
Completed: ${stats.completed}
High Priority: ${stats.highPriority}
This Week: ${stats.thisWeek}

📅 DAILY TASKS
${dailyTasks.length === 0 ? 'No custom daily tasks.' : dailyTasks.map(t => `${t.time} - ${t.task}`).join('\n')}

📆 WEEKLY SCHEDULE
${reportData.weeklyTasks.map(day =>
      `${day.day} (${day.date}):\n${day.tasks.length === 0 ? '  No tasks scheduled' : day.tasks.map(task => `  - ${task.name} (${task.priority} priority, ${task.status})`).join('\n')}`
    ).join('\n\n')}
    `.trim();

    // Download as file
    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `schedulr-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">Schedule Dashboard</h1>
              <p className="text-gray-600">Plan, track, and optimize your productivity</p>
            </div>
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <button
                onClick={generateReport}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 hover:scale-105 shadow-lg"
              >
                <Download size={18} className="mr-2" />
                Export Report
              </button>
              <button
                onClick={() => navigate('/tasks')}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 hover:scale-105 shadow-lg"
              >
                <Plus size={18} className="mr-2" />
                Add Task
              </button>
            </div>
          </div>

          {/* Statistics Cards */}
          <StatsCards stats={stats} />
        </div>

        {/* Navigation Tabs */}
        <Tabs view={view} setView={setView} taskCounts={stats} />

        {/* Content Views */}
        {view === "tasks" ? (
          <div className="space-y-8">
            {/* Today's Tasks Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 lg:p-8">

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100">Today's Focus</h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">

                      {new Date().toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                {/* Filter Options */}
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Tasks</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="high">High Priority</option>
                </select>
              </div>

              {(() => {
                const todayTasks = getTasksForDate(new Date().toISOString().split('T')[0]);
                const filteredTasks = todayTasks.filter(task => {
                  if (filter === 'all') return true;
                  if (filter === 'pending') return task.status !== 'completed';
                  if (filter === 'completed') return task.status === 'completed';
                  if (filter === 'high') return task.priority === 'high';
                  return true;
                });

                if (filteredTasks.length === 0) {
                  return (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Target className="w-10 h-10 text-gray-400" />
                      </div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
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

            {/* Weekly Overview */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 lg:p-8">

              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Weekly Overview</h2>
                  <p className="text-gray-600 text-sm">
                    Week of {getCurrentWeekStart().toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
                {(() => {
                  const weekStart = getCurrentWeekStart();
                  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

                  return days.map((day, index) => {
                    const dayDate = new Date(weekStart);
                    dayDate.setDate(weekStart.getDate() + index);
                    const dateStr = dayDate.toISOString().split('T')[0];
                    const dayTasks = getTasksForDate(dateStr);
                    const isToday = dateStr === new Date().toISOString().split('T')[0];

                    return (
                      <div key={day} className={`p-4 rounded-xl border-2 transition-colors ${isToday
                        ? 'border-blue-300 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/40'
                        : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}>
                      
                        <div className="text-center mb-3">
                        <h4 className={`font-semibold ${isToday ? 'text-blue-700 dark:text-blue-400' : 'text-gray-700 dark:text-gray-200'}`}>
                              {day} {isToday && '(Today)'}
                        </h4>

                          <p className="text-xs text-gray-500">
                            {dayDate.getDate()}
                          </p>
                        </div>

                        <div className="space-y-1">
                          {dayTasks.slice(0, 2).map((task) => (
                            <div
                              key={task.id}
                              className={`text-xs p-2 rounded cursor-pointer transition-colors ${task.status === 'completed' ? 'bg-green-100 text-green-800' :
                                task.priority === 'high' ? 'bg-red-100 text-red-800' :
                                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-blue-100 text-blue-800'
                                }`}
                              onClick={() => toggleTaskStatus(task.id)}
                            >
                              <p className={`font-medium ${task.status === 'completed' ? 'line-through' : ''}`}>
                                {task.name}
                              </p>
                            </div>
                          ))}
                          {dayTasks.length > 2 && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                            +{dayTasks.length - 2} more
                          </p>
                        )}
                        {dayTasks.length === 0 && (
                          <p className="text-xs text-gray-400 dark:text-gray-500 text-center italic">No tasks</p>
                        )}

                        </div>

                        <div className="mt-2 text-center">
                          <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
                            {dayTasks.length} task{dayTasks.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          </div>
        ) : view === "daily" ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 lg:p-8">

            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Daily Planner</h2>
            </div>

            {/* Add Task Form */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">

              <input
                type="time"
                value={taskTime}
                onChange={(e) => setTaskTime(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
              />
              <input
                type="text"
                placeholder="What do you need to do?"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && addDailyTask()}
              />
              <button
                onClick={addDailyTask}
                disabled={!taskTime || !taskName.trim()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Add Task
              </button>
            </div>

            {/* Daily Tasks List */}
            {dailyTasks.length === 0 ? (
              <div className="text-center py-12">
                <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No daily tasks yet</h3>
                <p className="text-gray-500">Add your first task to start planning your day</p>
              </div>
            ) : (
              <div className="space-y-3">
                {dailyTasks
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-white dark:bg-gray-800 shadow-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <Clock className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{item.task}</p>
                          <p className="text-sm text-gray-500">{item.time}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setDailyTasks(dailyTasks.filter((_, i) => i !== idx))}
                        className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 lg:p-8">

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Weekly Schedule</h2>
                  <p className="text-gray-600 text-sm">
                    Week of {getCurrentWeekStart().toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded-lg">
                {stats.week} tasks this week
              </div>
            </div>

            <div className="space-y-6">
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
                    <div key={day} className={`rounded-xl border-2 p-6 transition-all duration-200 ${isToday
                      ? 'border-blue-300 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/40 shadow-lg'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md dark:hover:bg-gray-700'
                      }`}>
                    
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className={`text-lg font-bold ${isToday ? 'text-blue-700' : 'text-gray-900'}`}>
                            {day} {isToday && '(Today)'}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {dayDate.toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500 dark:text-gray-300 bg-white dark:bg-gray-700 px-3 py-1 rounded-full border dark:border-gray-600">

                            {dayTasks.length} task{dayTasks.length !== 1 ? 's' : ''}
                          </span>
                          {dayTasks.filter(t => t.status === 'completed').length > 0 && (
                            <span className="text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full">
                              {dayTasks.filter(t => t.status === 'completed').length} done
                            </span>
                          )}
                        </div>
                      </div>

                      {dayTasks.length === 0 ? (
                        <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-xl">
                          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                          <p className="text-gray-500">No tasks scheduled</p>
                          <button
                            onClick={() => navigate('/tasks')}
                            className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            Add a task
                          </button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {dayTasks.map((task) => (
                            <TaskCard
                              key={task.id}
                              task={task}
                              onClick={() => toggleTaskStatus(task.id)}
                              isToday={isToday}
                            />
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
      </div>
    </div>
  );
}