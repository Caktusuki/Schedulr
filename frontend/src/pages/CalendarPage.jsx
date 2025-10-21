import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "../components/Calendar.jsx";
import { useTaskContext } from "../hooks/useTaskContext.js";

export default function CalendarPage() {
  const { tasks, getUpcomingTasks, getTasksForDate, toggleTaskStatus } = useTaskContext();
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  const upcomingTasks = getUpcomingTasks(10);
  const selectedDateTasks = selectedDate ? getTasksForDate(selectedDate) : [];

  const handleDateClick = (date) => setSelectedDate(date);
  const handleAddTask = () => navigate("/tasks");

  const priorityColors = {
    low: "bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700 text-green-800 dark:text-green-300",
    medium: "bg-yellow-100 dark:bg-yellow-900 border-yellow-300 dark:border-yellow-700 text-yellow-800 dark:text-yellow-300",
    high: "bg-red-100 dark:bg-red-900 border-red-300 dark:border-red-700 text-red-800 dark:text-red-300",
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 dark:bg-gray-900 overflow-x-hidden">

      {/* Header */}
      <div className="w-full max-w-6xl px-6 mt-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Calendar</h1>
      <p className="text-gray-600 dark:text-gray-400">View your tasks and deadlines in an interactive calendar format.</p>

      </div>

      {/* Calendar */}
      <div className="w-full max-w-6xl px-6 mt-6 flex-grow flex flex-col items-center justify-start">
        <Calendar tasks={tasks} onDateClick={handleDateClick} selectedDate={selectedDate} />
      </div>

      {/* Task Panels */}
      <div className="w-full max-w-6xl px-6 mt-10 pb-12 space-y-8 overflow-y-auto">
        {/* Selected Date Tasks */}
        {selectedDate && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">

            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Tasks for {new Date(selectedDate).toLocaleDateString()}
            </h3>

            <div className="max-h-64 overflow-y-auto space-y-3">
              {selectedDateTasks.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">No tasks for this date</p>

              ) : (
                selectedDateTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-3 rounded-lg border transition-colors cursor-pointer ${priorityColors[task.priority]}`}
                    onClick={() => toggleTaskStatus(task.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p
                          className={`font-medium ${
                            task.status === "completed" ? "line-through" : ""
                          }`}
                        >
                          {task.name}
                        </p>
                        <p className="text-xs opacity-75 mt-1">
                          {task.priority} priority • {task.status}
                        </p>
                      </div>
                      <div
                        className={`w-3 h-3 rounded-full border-2 ${
                          task.status === "completed" ? "bg-current" : "bg-transparent"
                        }`}
                      ></div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Upcoming Tasks */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Upcoming Tasks</h3>


          <div className="max-h-56 overflow-y-auto space-y-3">
            {upcomingTasks.length === 0 ? (
              <p className="text-gray-500 text-sm">No upcoming tasks</p>
            ) : (
              upcomingTasks.map((task) => (
                <div
                key={task.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"

                  onClick={() => handleDateClick(task.deadline)}
                >
                  <div>
                  <p className="font-medium text-gray-800 dark:text-gray-100">{task.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">

                      Due: {new Date(task.deadline).toLocaleDateString()}
                    </p>
                  </div>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      task.priority === "high"
                        ? "bg-red-500"
                        : task.priority === "medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  ></div>
                </div>
              ))
            )}
          </div>

          <button
            onClick={handleAddTask}
            className="w-full mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"

          >
            Add New Task
          </button>
        </div>
      </div>
    </div>
  );
}
