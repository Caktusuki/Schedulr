import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from "../components/Calendar.jsx";
import { useTaskContext } from '../hooks/useTaskContext.js';

export default function CalendarPage() {
  const { tasks, getUpcomingTasks, getTasksForDate, toggleTaskStatus } = useTaskContext();
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();
  
  const upcomingTasks = getUpcomingTasks(10);
  const selectedDateTasks = selectedDate ? getTasksForDate(selectedDate) : [];

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleAddTask = () => {
    navigate('/tasks');
  };

  const priorityColors = {
    low: 'bg-green-100 border-green-300 text-green-800',
    medium: 'bg-yellow-100 border-yellow-300 text-yellow-800',
    high: 'bg-red-100 border-red-300 text-red-800'
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Calendar</h1>
        <p className="text-gray-600">
          View your tasks and deadlines in an interactive calendar format.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Calendar */}
        <div className="lg:col-span-2">
          <Calendar tasks={tasks} onDateClick={handleDateClick} selectedDate={selectedDate} />
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Selected Date Tasks */}
          {selectedDate && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Tasks for {new Date(selectedDate).toLocaleDateString()}
              </h3>
              <div className="space-y-3">
                {selectedDateTasks.length === 0 ? (
                  <p className="text-gray-500 text-sm">No tasks for this date</p>
                ) : (
                  selectedDateTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`p-3 rounded-lg border transition-colors cursor-pointer ${priorityColors[task.priority]}`}
                      onClick={() => toggleTaskStatus(task.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className={`font-medium ${task.status === 'completed' ? 'line-through' : ''}`}>
                            {task.name}
                          </p>
                          <p className="text-xs opacity-75 mt-1">
                            {task.priority} priority • {task.status}
                          </p>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          task.status === 'completed' ? 'bg-current' : 'bg-transparent'
                        }`}></div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
          
          {/* Upcoming Tasks Sidebar */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Upcoming Tasks
            </h3>
            <div className="space-y-3">
              {upcomingTasks.length === 0 ? (
                <p className="text-gray-500 text-sm">No upcoming tasks</p>
              ) : (
                upcomingTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => handleDateClick(task.deadline)}
                  >
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
                ))
              )}
            </div>
            
            <button 
              onClick={handleAddTask}
              className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add New Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
