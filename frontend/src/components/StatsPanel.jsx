import React from "react";

const StatsPanel = () => {
  const stats = [
    { label: "Active Users", value: "1,250", color: "text-teal-600" },
    { label: "Tasks Completed", value: "8,430", color: "text-indigo-600" },
    { label: "Schedules Created", value: "3,780", color: "text-teal-600" },
    { label: "Productivity Boost", value: "92%", color: "text-indigo-600" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-sm hover:scale-105 transition"
        >
          <span className={`text-4xl font-extrabold ${stat.color}`}>
            {stat.value}
          </span>
          <span className="mt-2 text-gray-600 dark:text-gray-300 font-medium">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StatsPanel;
