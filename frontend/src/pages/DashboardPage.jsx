import Hero from "../components/Hero.jsx";

export default function DashboardPage() {
  const stats = [
    { label: 'Total Tasks', value: '12', color: 'text-theme-accent', bg: 'bg-theme-secondary' },
    { label: 'Completed', value: '8', color: 'text-theme-success', bg: 'bg-theme-secondary' },
    { label: 'In Progress', value: '3', color: 'text-theme-warning', bg: 'bg-theme-secondary' },
    { label: 'Overdue', value: '1', color: 'text-theme-error', bg: 'bg-theme-secondary' },
  ];

  return (
    <div className="space-y-8">
      <Hero />
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-theme-primary rounded-xl p-6 shadow-theme border border-theme-border transition-colors duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-theme-textSecondary text-sm font-medium">{stat.label}</p>
                <p className={`text-3xl font-bold ${stat.color} mt-1`}>{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <svg className={`w-6 h-6 ${stat.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-theme-primary rounded-xl p-6 shadow-theme border border-theme-border">
        <h2 className="text-xl font-semibold text-theme-textPrimary mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center gap-3 p-4 bg-theme-secondary hover:bg-theme-tertiary rounded-lg transition-colors duration-200 text-left">
            <div className="p-2 bg-theme-accent rounded-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-theme-textPrimary">Add Task</h3>
              <p className="text-sm text-theme-textSecondary">Create a new task</p>
            </div>
          </button>
          
          <button className="flex items-center gap-3 p-4 bg-theme-secondary hover:bg-theme-tertiary rounded-lg transition-colors duration-200 text-left">
            <div className="p-2 bg-theme-success rounded-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-theme-textPrimary">View Calendar</h3>
              <p className="text-sm text-theme-textSecondary">Check your schedule</p>
            </div>
          </button>
          
          <button className="flex items-center gap-3 p-4 bg-theme-secondary hover:bg-theme-tertiary rounded-lg transition-colors duration-200 text-left">
            <div className="p-2 bg-theme-warning rounded-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-theme-textPrimary">Generate Report</h3>
              <p className="text-sm text-theme-textSecondary">Export your tasks</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
