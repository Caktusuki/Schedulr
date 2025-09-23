import React, { useState, useEffect, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  Calendar,
  X,
  AlertTriangle,
  CheckCircle,
  RotateCw
} from 'lucide-react';

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', time: '', description: '', priority: 'medium' });
  const [isLoading, setIsLoading] = useState(false);

  // LocalStorage key
  const TASKS_STORAGE_KEY = 'schedulr_tasks';

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const loadTasksFromStorage = () => {
      try {
        const storedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
        if (storedTasks) {
          const parsedTasks = JSON.parse(storedTasks);
          // Convert date strings back to Date objects
          const tasksWithDates = parsedTasks.map(task => ({
            ...task,
            date: new Date(task.date)
          }));
          setTasks(tasksWithDates);
        }
      } catch (error) {
        console.error('Failed to load tasks from localStorage:', error);
      }
    };

    loadTasksFromStorage();
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    try {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks to localStorage:', error);
    }
  }, [tasks]);

  // Set CSS custom property for dynamic viewport height
  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    return () => window.removeEventListener('resize', setViewportHeight);
  }, []);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = useCallback((date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  }, []);

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const isToday = (date) => {
    const today = new Date();
    return date &&
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const isSelected = (date) => {
    return date &&
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear();
  };

  const getTasksForDate = (date) => {
    if (!date) return [];
    return tasks.filter(task =>
      task.date.getDate() === date.getDate() &&
      task.date.getMonth() === date.getMonth() &&
      task.date.getFullYear() === date.getFullYear()
    );
  };

  const handleDateClick = (date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleAddTask = async () => {
    if (!newTask.title.trim()) return;

    setIsLoading(true);

    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 500));

    const task = {
      id: Date.now(),
      title: newTask.title.trim(),
      date: selectedDate,
      time: newTask.time || '9:00 AM',
      description: newTask.description.trim(),
      priority: newTask.priority,
      completed: false,
      createdAt: new Date().toISOString()
    };

    setTasks(prevTasks => [...prevTasks, task]);
    setNewTask({ title: '', time: '', description: '', priority: 'medium' });
    setShowAddTask(false);
    setIsLoading(false);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const handleToggleComplete = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-gradient-to-r from-red-50 to-red-100 text-red-800 border-red-200 shadow-red-100';
      case 'medium': return 'bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-800 border-yellow-200 shadow-yellow-100';
      case 'low': return 'bg-gradient-to-r from-green-50 to-green-100 text-green-800 border-green-200 shadow-green-100';
      default: return 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 border-gray-200 shadow-gray-100';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return <AlertTriangle size={16} />;
      case 'medium': return <Clock size={16} />;
      case 'low': return <CheckCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const days = getDaysInMonth(currentDate);
  const selectedDateTasks = getTasksForDate(selectedDate);
  const completedTasks = tasks.filter(task => task.completed).length;
  const highPriorityTasks = tasks.filter(task => task.priority === 'high' && !task.completed).length;
  const todayTasks = getTasksForDate(new Date()).length;

  return (
    <div
      className={`relative bg-gradient-to-br from-blue-50 via-white to-purple-50 transition-all duration-300 ${showAddTask ? 'overflow-hidden' : 'overflow-hidden'
        }`}
      style={{
        height: 'calc(var(--vh, 1vh) * 100)',
        minHeight: '-webkit-fill-available'
      }}
    >
      {/* Main Content */}
      <div className={`h-full flex flex-col transition-all duration-300 ${showAddTask ? 'blur-sm pointer-events-none' : ''
        }`}>
        {/* Modern Header with Glass Morphism */}
        <div className="flex-shrink-0 backdrop-blur-xl bg-white/70 border-b border-white/20 shadow-lg">
          <div className="px-4 py-3 lg:px-6 lg:py-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Calendar size={20} className="lg:w-6 lg:h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Schedulr Calendar
                  </h1>
                  <p className="text-xs lg:text-sm text-gray-600">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAddTask(true)}
                className="group inline-flex items-center px-4 py-2.5 lg:px-6 lg:py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-sm lg:text-base font-medium"
              >
                <Plus size={16} className="lg:w-5 lg:h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                Add Task
              </button>
            </div>
          </div>
        </div>

        {/* Content Area with improved spacing */}
        <div className="flex-1 overflow-hidden px-2 py-3 lg:px-4 lg:py-4">
          <div className="h-full grid grid-cols-1 xl:grid-cols-4 gap-3 lg:gap-6">
            {/* Modern Calendar Section */}
            <div className="xl:col-span-3 h-full">
              <div className="backdrop-blur-lg bg-white/80 border border-white/20 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                {/* Calendar Header with modern styling */}
                <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 lg:px-6 lg:py-4 border-b border-white/10">
                  <h2 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h2>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => navigateMonth(-1)}
                      className="p-2.5 lg:p-3 hover:bg-white/50 rounded-xl transition-all duration-200 hover:scale-110 transform shadow-md hover:shadow-lg"
                    >
                      <ChevronLeft size={16} className="lg:w-5 lg:h-5 text-gray-700" />
                    </button>
                    <button
                      onClick={() => setCurrentDate(new Date())}
                      className="px-4 py-2 lg:px-5 lg:py-2.5 text-xs lg:text-sm bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 hover:scale-105 transform font-medium shadow-md hover:shadow-lg"
                    >
                      Today
                    </button>
                    <button
                      onClick={() => navigateMonth(1)}
                      className="p-2.5 lg:p-3 hover:bg-white/50 rounded-xl transition-all duration-200 hover:scale-110 transform shadow-md hover:shadow-lg"
                    >
                      <ChevronRight size={16} className="lg:w-5 lg:h-5 text-gray-700" />
                    </button>
                  </div>
                </div>

                {/* Calendar Grid with enhanced design */}
                <div className="flex-1 p-3 lg:p-6 overflow-hidden">
                  <div className="h-full flex flex-col">
                    {/* Week Days Header */}
                    <div className="flex-shrink-0 grid grid-cols-7 gap-1 lg:gap-2 mb-3">
                      {weekDays.map(day => (
                        <div key={day} className="text-center text-xs lg:text-sm font-semibold text-gray-600 py-2 bg-white/50 rounded-lg">
                          <span className="hidden sm:inline">{day}</span>
                          <span className="sm:hidden">{day.substring(0, 1)}</span>
                        </div>
                      ))}
                    </div>

                    {/* Calendar Days Grid */}
                    <div className="flex-1 grid grid-cols-7 gap-1 lg:gap-2">
                      {days.map((date, index) => {
                        const dayTasks = getTasksForDate(date);
                        return (
                          <div key={index} className="relative">
                            {date ? (
                              <button
                                onClick={() => handleDateClick(date)}
                                className={`
                                  w-full h-full p-2 lg:p-3 rounded-xl border-2 transition-all duration-300 hover:scale-105 transform flex flex-col backdrop-blur-sm
                                  ${isSelected(date)
                                    ? 'border-blue-400 bg-gradient-to-br from-blue-100 to-purple-100 shadow-lg shadow-blue-200'
                                    : isToday(date)
                                      ? 'border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50 shadow-md shadow-purple-200'
                                      : 'border-white/30 bg-white/40 hover:bg-white/60 hover:shadow-lg hover:border-white/50'
                                  }
                                `}
                                style={{
                                  minHeight: 'calc((100vh - 320px) / 6)',
                                  maxHeight: 'calc((100vh - 320px) / 6)'
                                }}
                              >
                                <span className={`
                                  text-xs lg:text-sm font-bold flex-shrink-0 mb-1
                                  ${isToday(date) ? 'text-purple-700' : isSelected(date) ? 'text-blue-700' : 'text-gray-700'}
                                `}>
                                  {date.getDate()}
                                </span>
                                {dayTasks.length > 0 && (
                                  <div className="flex-1 overflow-hidden">
                                    {dayTasks.slice(0, 2).map((task, taskIndex) => (
                                      <div
                                        key={task.id}
                                        className={`text-xs rounded-md px-1.5 py-0.5 mb-1 truncate font-medium shadow-sm ${task.priority === 'high' ? 'bg-red-200 text-red-800' :
                                            task.priority === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                                              'bg-green-200 text-green-800'
                                          } ${task.completed ? 'opacity-50 line-through' : ''}`}
                                      >
                                        {task.title}
                                      </div>
                                    ))}
                                    {dayTasks.length > 2 && (
                                      <div className="text-xs text-gray-600 font-medium">
                                        +{dayTasks.length - 2} more
                                      </div>
                                    )}
                                  </div>
                                )}
                              </button>
                            ) : (
                              <div
                                className="w-full h-full"
                                style={{
                                  minHeight: 'calc((100vh - 320px) / 6)',
                                  maxHeight: 'calc((100vh - 320px) / 6)'
                                }}
                              ></div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Sidebar */}
            <div className="xl:col-span-1 space-y-4 h-full overflow-y-auto">
              {/* Selected Date Tasks */}
              <div className="backdrop-blur-lg bg-white/80 border border-white/20 rounded-2xl shadow-xl p-4 lg:p-5">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                    <Calendar size={16} className="text-white" />
                  </div>
                  <h3 className="text-sm lg:text-base font-bold text-gray-900 leading-tight">
                    {selectedDate.toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </h3>
                </div>

                {selectedDateTasks.length > 0 ? (
                  <div className="space-y-3">
                    {selectedDateTasks.map(task => (
                      <div
                        key={task.id}
                        className={`p-3 rounded-xl border transition-all duration-300 hover:scale-105 transform shadow-lg ${getPriorityColor(task.priority)} ${task.completed ? 'opacity-60' : ''
                          }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center flex-1 min-w-0">
                            {getPriorityIcon(task.priority)}
                            <h4 className={`font-semibold text-sm ml-2 truncate ${task.completed ? 'line-through' : ''}`}>
                              {task.title}
                            </h4>
                          </div>
                          <div className="flex items-center space-x-2 ml-2">
                            <span className="text-xs font-medium">{task.time}</span>
                            <div className="flex space-x-1">
                              <button
                                onClick={() => handleToggleComplete(task.id)}
                                className="p-1 hover:bg-white/50 rounded-full transition-colors duration-200"
                                title={task.completed ? 'Mark incomplete' : 'Mark complete'}
                              >
                                <CheckCircle size={16} className={task.completed ? 'text-green-600' : 'text-gray-400'} />
                              </button>
                              <button
                                onClick={() => handleDeleteTask(task.id)}
                                className="p-1 hover:bg-red-100 rounded-full transition-colors duration-200"
                                title="Delete task"
                              >
                                <X size={16} className="text-red-500" />
                              </button>
                            </div>
                          </div>
                        </div>
                        {task.description && (
                          <p className="text-xs opacity-75 ml-6">{task.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Calendar size={32} className="text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-sm mb-3">No tasks scheduled</p>
                    <button
                      onClick={() => setShowAddTask(true)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-semibold hover:scale-105 transform transition-all duration-200"
                    >
                      Add your first task
                    </button>
                  </div>
                )}
              </div>

              {/* Enhanced Stats */}
              <div className="backdrop-blur-lg bg-white/80 border border-white/20 rounded-2xl shadow-xl p-4 lg:p-5">
                <h3 className="text-sm lg:text-base font-bold text-gray-900 mb-4">Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-200">
                    <span className="text-gray-700 text-sm font-medium">Total Tasks</span>
                    <span className="font-bold text-blue-600 bg-white px-3 py-1 rounded-full text-sm shadow-sm">
                      {tasks.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 transition-all duration-200">
                    <span className="text-gray-700 text-sm font-medium">High Priority</span>
                    <span className="font-bold text-red-600 bg-white px-3 py-1 rounded-full text-sm shadow-sm">
                      {highPriorityTasks}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-all duration-200">
                    <span className="text-gray-700 text-sm font-medium">Completed</span>
                    <span className="font-bold text-green-600 bg-white px-3 py-1 rounded-full text-sm shadow-sm">
                      {completedTasks}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 transition-all duration-200">
                    <span className="text-gray-700 text-sm font-medium">Today</span>
                    <span className="font-bold text-purple-600 bg-white px-3 py-1 rounded-full text-sm shadow-sm">
                      {todayTasks}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Modal with Glass Morphism */}
      {showAddTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-md transition-all duration-300"
            onClick={() => setShowAddTask(false)}
          />

          {/* Modal Content */}
          <div className="relative backdrop-blur-xl bg-white/90 border border-white/20 rounded-3xl shadow-2xl w-full max-w-md mx-4 transform transition-all duration-300 scale-100">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Plus size={16} className="text-white" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Add New Task
                </h3>
              </div>
              <button
                onClick={() => setShowAddTask(false)}
                className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200 hover:scale-110 transform"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Task Title
                </label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full px-4 py-3 bg-white/50 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:bg-white/70 backdrop-blur-sm"
                  placeholder="Enter task title"
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    value={newTask.time}
                    onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
                    className="w-full px-4 py-3 bg-white/50 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:bg-white/70 backdrop-blur-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Priority
                  </label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    className="w-full px-4 py-3 bg-white/50 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:bg-white/70 backdrop-blur-sm"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="w-full px-4 py-3 bg-white/50 border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:bg-white/70 resize-none backdrop-blur-sm"
                  rows="3"
                  placeholder="Add task description..."
                />
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-200/50">
                <div className="flex items-center">
                  <Calendar size={20} className="text-blue-600 mr-3" />
                  <span className="text-sm font-semibold text-blue-800">
                    {selectedDate.toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end space-x-3 p-6 border-t border-white/10">
              <button
                onClick={() => setShowAddTask(false)}
                className="px-5 py-2.5 text-gray-600 hover:text-gray-800 hover:bg-white/30 rounded-xl transition-all duration-200 hover:scale-105 transform font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                disabled={!newTask.title.trim() || isLoading}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 transform shadow-lg hover:shadow-xl font-semibold flex items-center"
              >
                {isLoading ? (
                  <>
                    <RotateCw size={16} className="mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  'Add Task'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
