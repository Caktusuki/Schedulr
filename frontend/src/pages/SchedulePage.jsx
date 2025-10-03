import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useTaskContext } from '../hooks/useTaskContext.js';

function Tabs({ view, setView }) {
  return (
    <div className="flex mb-6">
      <button
        onClick={() => setView("daily")}
        className={`px-4 py-2 rounded-l-lg border transition-colors duration-200 
          ${view === "daily" ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
      >
        Daily View
      </button>
      <button
        onClick={() => setView("weekly")}
        className={`px-4 py-2 border transition-colors duration-200 
          ${view === "weekly" ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
      >
        Weekly View
      </button>
      <button
        onClick={() => setView("tasks")}
        className={`px-4 py-2 rounded-r-lg border transition-colors duration-200 
          ${view === "tasks" ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
      >
        Task Timeline
      </button>
    </div>
  );
}

export default function SchedulePage() {
  const { getTasksForDate, getTasksForWeek, toggleTaskStatus } = useTaskContext();
  const navigate = useNavigate();
  const [view, setView] = useState("tasks");

  // Daily state
  const [dailyTasks, setDailyTasks] = useState([]);
  const [taskTime, setTaskTime] = useState("");
  const [taskName, setTaskName] = useState("");

  // Weekly state - now using real tasks from context
  
  // Get current week's start date (Monday)
  const getCurrentWeekStart = () => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const daysToMonday = currentDay === 0 ? -6 : 1 - currentDay;
    const monday = new Date(today);
    monday.setDate(today.getDate() + daysToMonday);
    return monday;
  };

  const addDailyTask = () => {
    if (!taskTime || !taskName) return;
    setDailyTasks([...dailyTasks, { time: taskTime, task: taskName }]);
    setTaskTime("");
    setTaskName("");
  };

  const generateReport = () => {
    let report = "📋 Daily Tasks:\n";
    if (dailyTasks.length === 0) report += "No custom daily tasks.\n";
    else report += dailyTasks.map(t => `${t.time} - ${t.task}`).join("\n") + "\n";

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
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6"> Schedule</h1>
      <Tabs view={view} setView={setView} />

      {view === "tasks" ? (
        <div className="space-y-6">
          {/* Task Timeline View */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Task Timeline</h2>
              <button
                onClick={() => navigate('/tasks')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Manage Tasks
              </button>
            </div>
            
            {/* Today's Tasks */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-700 mb-3">Today</h3>
              {getTasksForDate(new Date().toISOString().split('T')[0]).length === 0 ? (
                <p className="text-gray-500">No tasks scheduled for today</p>
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
                          <p className={`font-medium ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
                            {task.name}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
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
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* This Week's Tasks */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">This Week</h3>
              {(() => {
                const weekStart = getCurrentWeekStart();
                const weekTasks = getTasksForWeek(weekStart);
                
                if (weekTasks.length === 0) {
                  return <p className="text-gray-500">No tasks scheduled for this week</p>;
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
                        <h4 className="font-medium text-gray-700 mb-3">{day}</h4>
                        {tasksByDay[day].length === 0 ? (
                          <p className="text-gray-400 text-sm">No tasks</p>
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
        <div>
          <div className="flex gap-2 mb-4">
            <input
              type="time"
              value={taskTime}
              onChange={(e) => setTaskTime(e.target.value)}
              className="border rounded px-3 py-2 text-center w-32 font-medium bg-gray-50"
            />
            <input
              type="text"
              placeholder="Task Name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="border rounded px-2 py-2 flex-1"
            />
            <button
              onClick={addDailyTask}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>

          <div className="space-y-4">
            {dailyTasks.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-white shadow-sm rounded-lg p-4 border"
              >
                <span className="font-medium text-gray-700">{item.time}</span>
                <span className="text-gray-900">{item.task}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          {/* Week Navigation and Add Task Button */}
          <div className="flex gap-2 mb-6 items-center">
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-800">
                Week of {getCurrentWeekStart().toLocaleDateString()}
              </h2>
              <p className="text-sm text-gray-600">View and manage tasks for this week</p>
            </div>
            <button
              onClick={() => navigate('/tasks')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
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
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className={`font-semibold ${isToday ? 'text-blue-700' : 'text-gray-800'}`}>
                          {day} {isToday && '(Today)'}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {dayDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {dayTasks.length} task{dayTasks.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    
                    {dayTasks.length === 0 ? (
                      <p className="text-gray-400 italic">No tasks scheduled</p>
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
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <p className={`font-medium text-sm ${
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
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                task.status === 'completed' ? 'bg-green-500 border-green-500' : 'border-gray-300'
                              }`}>
                                {task.status === 'completed' && (
                                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
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
          className="px-6 py-2 rounded-md bg-blue-500 text-white"
        >
          Generate Schedule Report
        </button>
      </div>
    </div>
  );
}




