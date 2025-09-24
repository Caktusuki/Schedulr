import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";

const linkClass = ({ isActive }) =>
  `block w-full text-left px-4 py-2 rounded-md transition-colors duration-200 hover:bg-theme-tertiary text-theme-textPrimary ${
    isActive ? "bg-theme-tertiary text-theme-accent" : ""
  }`;

export default function Sidebar() {
  return (
    <aside className="bg-theme-secondary border-r border-theme-border w-64 min-h-screen p-6 transition-colors duration-200">
      <div className="flex items-center justify-between mb-6">
        <div className="text-2xl font-bold text-theme-textPrimary">
          📅 Schedulr
        </div>
        <ThemeToggle />
      </div>
      
      <nav className="flex flex-col gap-1">
        <NavLink to="/dashboard" className={linkClass}>
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v3H8V5z" />
            </svg>
            Dashboard
          </div>
        </NavLink>
        
        <NavLink to="/tasks" className={linkClass}>
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            Tasks
          </div>
        </NavLink>
        
        <NavLink to="/calendar" className={linkClass}>
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Calendar
          </div>
        </NavLink>
        
        <NavLink to="/settings" className={linkClass}>
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </div>
        </NavLink>
      </nav>
      
      {/* Theme info at bottom */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="text-xs text-theme-textTertiary text-center border-t border-theme-border pt-4">
          Built for GSSoC 2025 🚀
        </div>
      </div>
    </aside>
  );
}
