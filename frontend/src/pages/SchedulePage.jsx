import { useState } from "react";

function Tabs({ view, setView }) {
  return (
    <div className="flex mb-6">
      <button
        onClick={() => setView("daily")}
        className={`px-4 py-2 rounded-l-lg border transition-colors duration-200 
          ${view === "daily" ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
      >
        Daily
      </button>
      <button
        onClick={() => setView("weekly")}
        className={`px-4 py-2 rounded-r-lg border transition-colors duration-200 
          ${view === "weekly" ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
      >
        Weekly
      </button>
    </div>
  );
}

export default function SchedulePage() {
  const [view, setView] = useState("daily");

  // Daily state
  const [dailyTasks, setDailyTasks] = useState([]);
  const [taskTime, setTaskTime] = useState("");
  const [taskName, setTaskName] = useState("");

  // Weekly state
  const [weeklyTasks, setWeeklyTasks] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });
  const [weeklyTaskName, setWeeklyTaskName] = useState("");
  const [selectedDay, setSelectedDay] = useState("Monday");

  const addDailyTask = () => {
    if (!taskTime || !taskName) return;
    setDailyTasks([...dailyTasks, { time: taskTime, task: taskName }]);
    setTaskTime("");
    setTaskName("");
  };

  const addWeeklyTask = () => {
    if (!weeklyTaskName) return;
    setWeeklyTasks({
      ...weeklyTasks,
      [selectedDay]: [...weeklyTasks[selectedDay], weeklyTaskName],
    });
    setWeeklyTaskName("");
  };

  const generateReport = () => {
    let report = " Daily Tasks:\n";
    if (dailyTasks.length === 0) report += "No tasks.\n";
    else report += dailyTasks.map(t => `${t.time} - ${t.task}`).join("\n") + "\n";

    report += "\n Weekly Tasks:\n";
    for (const day in weeklyTasks) {
      report += `${day}:\n`;
      if (weeklyTasks[day].length === 0) report += "  No tasks\n";
      else report += weeklyTasks[day].map(task => `  - ${task}`).join("\n") + "\n";
    }

    alert(report);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6"> Schedule</h1>
      <Tabs view={view} setView={setView} />

      {view === "daily" ? (
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
          <div className="flex gap-2 mb-4 items-center">
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="border rounded px-2 py-2"
            >
              {Object.keys(weeklyTasks).map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Task Name"
              value={weeklyTaskName}
              onChange={(e) => setWeeklyTaskName(e.target.value)}
              className="border rounded px-2 py-2 flex-1"
            />
            <button
              onClick={addWeeklyTask}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>

          <div className="space-y-4">
            {Object.keys(weeklyTasks).map(day => (
              <div key={day} className="bg-white shadow-sm rounded-lg p-4 border">
                <h3 className="font-semibold mb-2">{day}</h3>
                {weeklyTasks[day].length === 0 ? (
                  <p className="text-gray-400">No tasks</p>
                ) : (
                  <ul className="list-disc list-inside text-gray-800">
                    {weeklyTasks[day].map((task, idx) => (
                      <li key={idx}>{task}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
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




