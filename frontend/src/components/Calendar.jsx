import { useState, useEffect } from "react";

export default function Calendar({ tasks = [], onDateClick, selectedDate }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeTask, setActiveTask] = useState(null);
  const [cellHeight, setCellHeight] = useState("h-28");

  // Responsive cell height
  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight;
      if (height < 700) setCellHeight("h-20");
      else if (height < 850) setCellHeight("h-24");
      else setCellHeight("h-28");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];
  const daysOfWeek = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const formatDateStr = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  };

  const navigateMonth = (dir) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + dir, 1));
  };

  // Group tasks by date
  const tasksByDate = {};
  tasks.forEach(task => {
    const key = formatDateStr(task.deadline);
    if (!tasksByDate[key]) tasksByDate[key] = [];
    tasksByDate[key].push(task);
  });

  const handleDayClick = (day) => {
    const dateStr = formatDateStr(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    onDateClick && onDateClick(dateStr);
  };

  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear();
  };

  const isSelectedDate = (day) => {
    if (!selectedDate) return false;
    const dateStr = formatDateStr(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    return dateStr === selectedDate;
  };

  const handleTaskHover = (task) => setActiveTask(task);
  const handleTaskLeave = () => setActiveTask(null);

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for offset
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className={`${cellHeight} border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800`} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = formatDateStr(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
      const dayTasks = tasksByDate[dateStr] || [];

      days.push(
        <div
          key={day}
          onClick={() => handleDayClick(day)}
          className={`relative border border-gray-200 dark:border-gray-700 rounded-md p-1 flex flex-col cursor-pointer transition-all hover:bg-blue-50 dark:hover:bg-blue-900 ${cellHeight}
            ${isToday(day) ? "ring-2 ring-blue-400 dark:ring-blue-300 bg-blue-50 dark:bg-blue-900" : ""}
            ${isSelectedDate(day) ? "ring-2 ring-purple-300 dark:ring-purple-400 bg-purple-50 dark:bg-purple-800" : ""}`}
        >
          {/* Day header */}
          <div className="flex justify-between items-center mb-1 px-1">
            <span className="font-semibold text-gray-700 dark:text-gray-200 text-sm">{day}</span>
            {isToday(day) && <div className="w-2 h-2 rounded-full bg-blue-500" />}
          </div>

          {/* Task list */}
          <div className="flex flex-col gap-1 overflow-y-auto scrollbar-hide px-1">
            {dayTasks.map(task => {
              const priority = task.priority?.toLowerCase();
              const priorityClasses =
                priority === "high"
                  ? "bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-400 dark:border-red-700"
                  : priority === "medium"
                  ? "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-400 dark:border-yellow-700"
                  : "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-400 dark:border-green-700";

              return (
                <div key={task.id} className="relative">
                  <div
                    onMouseEnter={() => handleTaskHover(task)}
                    onMouseLeave={handleTaskLeave}
                    className={`text-[12px] font-medium px-2 py-1 rounded-md transition-all shadow-sm border w-full text-left overflow-hidden text-ellipsis whitespace-nowrap
                      ${priorityClasses} hover:scale-[1.02] cursor-pointer`}
                  >
                    <span className="block truncate">{task.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 w-full overflow-hidden relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigateMonth(-1)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">{"<"}</button>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button onClick={() => navigateMonth(1)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">{">"}</button>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 text-center font-medium text-gray-500 dark:text-gray-400 text-sm mb-2">
        {daysOfWeek.map(d => <div key={d} className="py-1">{d}</div>)}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>

      {/* Hover popup */}
      {activeTask && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 w-[360px] max-w-[90%] text-sm text-center transition-all duration-200 animate-fadeIn">
            <div className="mb-3">
              <p className="text-base font-semibold text-gray-700 dark:text-gray-200">Task Name:</p>
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {activeTask.title || activeTask.name || "Unnamed Task"}
              </p>
            </div>

            {activeTask.description && (
              <div className="mb-4">
                <p className="text-base font-semibold text-gray-700 dark:text-gray-200">Description:</p>
                <p className="text-gray-600 dark:text-gray-300 italic">{activeTask.description}</p>
              </div>
            )}

            <div className="text-gray-700 dark:text-gray-300 space-y-1">
              <p><strong>Priority:</strong> {activeTask.priority}</p>
              {activeTask.complexity && <p><strong>Complexity:</strong> {activeTask.complexity}</p>}
              <p><strong>Status:</strong> {activeTask.status}</p>
              <p><strong>Deadline:</strong> {new Date(activeTask.deadline).toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
