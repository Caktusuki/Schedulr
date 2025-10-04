export default function Hero({ userName = "User", todayTasks = 0, completedTasks = 0 }) {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Good Morning" : currentHour < 18 ? "Good Afternoon" : "Good Evening";
  
  return (
    <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white p-8 rounded-xl shadow-lg mb-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{greeting}, {userName}! 👋</h1>
            <p className="text-lg text-blue-100 mb-4 max-w-2xl">
              Ready to tackle your day? Let's organize your tasks and boost productivity.
            </p>
            
            {/* Quick stats */}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>{completedTasks} tasks completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span>{todayTasks} tasks for today</span>
              </div>
            </div>
          </div>
          
          {/* Time display */}
          <div className="hidden md:block text-right">
            <div className="text-sm text-blue-100">Today</div>
            <div className="text-2xl font-bold">{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
