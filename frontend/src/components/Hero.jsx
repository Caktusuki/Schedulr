import { useTheme } from '../contexts/ThemeContext.jsx';

export default function Hero() {
  const { effectiveTheme } = useTheme();
  const isDark = effectiveTheme === 'dark';

  return (
    <section className={`relative overflow-hidden p-16 rounded-xl shadow-theme-lg mb-12 transition-colors duration-200 ${
      isDark 
        ? 'bg-gradient-to-r from-blue-900 to-indigo-900 text-white' 
        : 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white'
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-white bg-opacity-20 rounded-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold">Welcome to Schedulr</h1>
        </div>
        
        <p className="text-xl max-w-2xl mb-6 text-blue-100">
          Organize your tasks and schedule smartly with Schedulr. Boost productivity and stay on track effortlessly with our powerful task management system.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <button className="px-8 py-3 bg-white text-blue-700 rounded-lg shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all duration-200 font-semibold">
            Get Started
          </button>
          
          <button className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-700 transition-all duration-200 font-semibold">
            Learn More
          </button>
        </div>
        
        {/* Feature highlights */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3 text-blue-100">
            <div className="p-1 bg-white bg-opacity-20 rounded">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <span>Smart Task Management</span>
          </div>
          
          <div className="flex items-center gap-3 text-blue-100">
            <div className="p-1 bg-white bg-opacity-20 rounded">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span>Calendar Integration</span>
          </div>
          
          <div className="flex items-center gap-3 text-blue-100">
            <div className="p-1 bg-white bg-opacity-20 rounded">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
              </svg>
            </div>
            <span>Dark Mode Support</span>
          </div>
        </div>
      </div>
    </section>
  );
}
