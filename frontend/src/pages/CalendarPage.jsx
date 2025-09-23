import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon, ClockIcon, CalendarDaysIcon, XMarkIcon } from '@heroicons/react/24/outline';

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', time: '', description: '' });

  // Mock tasks data for demonstration
  useEffect(() => {
    const mockTasks = [
      {
        id: 1,
        title: 'Team Meeting',
        date: new Date(2025, 8, 23), // September 23, 2025
        time: '10:00 AM',
        description: 'Weekly team sync',
        priority: 'high'
      },
      {
        id: 2,
        title: 'Code Review',
        date: new Date(2025, 8, 24),
        time: '2:00 PM',
        description: 'Review pull requests',
        priority: 'medium'
      },
      {
        id: 3,
        title: 'Project Deadline',
        date: new Date(2025, 8, 25),
        time: '11:59 PM',
        description: 'Submit final project',
        priority: 'high'
      }
    ];
    setTasks(mockTasks);
  }, []);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
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
  };

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

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      const task = {
        id: Date.now(),
        title: newTask.title,
        date: selectedDate,
        time: newTask.time || '9:00 AM',
        description: newTask.description,
        priority: 'medium'
      };
      setTasks([...tasks, task]);
      setNewTask({ title: '', time: '', description: '' });
      setShowAddTask(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const days = getDaysInMonth(currentDate);
  const selectedDateTasks = getTasksForDate(selectedDate);

  return (
    <div className={`relative p-6 bg-white min-h-screen transition-all duration-300 ${showAddTask ? 'overflow-hidden' : ''
      }`}>
      {/* Main Content */}
      <div className={`max-w-7xl mx-auto transition-all duration-300 ${showAddTask ? 'blur-sm pointer-events-none' : ''
        }`}>
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
            <button
              onClick={() => setShowAddTask(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Add Task
            </button>
          </div>
          <p className="text-gray-600">
            Organize your schedule and manage tasks efficiently
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Section */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              {/* Calendar Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => navigateMonth(-1)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 hover:scale-110 transform"
                  >
                    <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={() => setCurrentDate(new Date())}
                    className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-105 transform font-medium"
                  >
                    Today
                  </button>
                  <button
                    onClick={() => navigateMonth(1)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 hover:scale-110 transform"
                  >
                    <ChevronRightIcon className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="p-6">
                {/* Week Days Header */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {weekDays.map(day => (
                    <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-2">
                  {days.map((date, index) => {
                    const dayTasks = getTasksForDate(date);
                    return (
                      <div key={index} className="relative">
                        {date ? (
                          <button
                            onClick={() => handleDateClick(date)}
                            className={`
                              w-full h-24 p-2 rounded-lg border-2 transition-all duration-200 hover:scale-105 transform
                              ${isSelected(date)
                                ? 'border-blue-500 bg-blue-50 shadow-md'
                                : isToday(date)
                                  ? 'border-blue-300 bg-blue-25 shadow-sm'
                                  : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50 hover:shadow-sm'
                              }
                            `}
                          >
                            <div className="flex flex-col h-full">
                              <span className={`
                                text-sm font-medium
                                ${isToday(date) ? 'text-blue-600' : 'text-gray-900'}
                              `}>
                                {date.getDate()}
                              </span>
                              {dayTasks.length > 0 && (
                                <div className="flex-1 mt-1">
                                  {dayTasks.slice(0, 2).map((task, taskIndex) => (
                                    <div
                                      key={task.id}
                                      className="text-xs bg-blue-100 text-blue-800 rounded px-1 py-0.5 mb-1 truncate"
                                    >
                                      {task.title}
                                    </div>
                                  ))}
                                  {dayTasks.length > 2 && (
                                    <div className="text-xs text-gray-500">
                                      +{dayTasks.length - 2} more
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </button>
                        ) : (
                          <div className="w-full h-24"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Selected Date Tasks */}
          <div className="space-y-6">
            {/* Selected Date Info */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <CalendarDaysIcon className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </h3>
              </div>

              {/* Tasks for Selected Date */}
              {selectedDateTasks.length > 0 ? (
                <div className="space-y-3">
                  {selectedDateTasks.map(task => (
                    <div
                      key={task.id}
                      className={`p-4 rounded-lg border ${getPriorityColor(task.priority)} hover:shadow-md transition-all duration-200 hover:scale-105 transform`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{task.title}</h4>
                        <div className="flex items-center text-sm">
                          <ClockIcon className="w-4 h-4 mr-1" />
                          {task.time}
                        </div>
                      </div>
                      {task.description && (
                        <p className="text-sm opacity-75">{task.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CalendarDaysIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No tasks scheduled for this date</p>
                  <button
                    onClick={() => setShowAddTask(true)}
                    className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium hover:scale-105 transform transition-all duration-200"
                  >
                    Add a task
                  </button>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">This Month</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <span className="text-gray-600">Total Tasks</span>
                  <span className="font-semibold text-gray-900 bg-gray-100 px-2 py-1 rounded-full text-sm">
                    {tasks.length}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <span className="text-gray-600">High Priority</span>
                  <span className="font-semibold text-red-600 bg-red-100 px-2 py-1 rounded-full text-sm">
                    {tasks.filter(task => task.priority === 'high').length}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <span className="text-gray-600">Today's Tasks</span>
                  <span className="font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full text-sm">
                    {getTasksForDate(new Date()).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop Blur Modal */}
      {showAddTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-md transition-all duration-300"
            onClick={() => setShowAddTask(false)}
          />

          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 transform transition-all duration-300 scale-100 animate-in slide-in-from-bottom-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Add New Task</h3>
              <button
                onClick={() => setShowAddTask(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 hover:scale-110 transform"
              >
                <XMarkIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Task Title
                </label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400"
                  placeholder="Enter task title"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <input
                  type="time"
                  value={newTask.time}
                  onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 resize-none"
                  rows="3"
                  placeholder="Enter task description"
                />
              </div>

              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <div className="flex items-center">
                  <CalendarDaysIcon className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-blue-800">
                    Date: {selectedDate.toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowAddTask(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-105 transform font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                disabled={!newTask.title.trim()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 transform shadow-lg hover:shadow-xl font-medium"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
