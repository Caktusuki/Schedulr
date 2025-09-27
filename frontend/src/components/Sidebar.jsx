import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `block w-full text-left px-4 py-2 rounded-md hover:bg-gray-800 ${
    isActive ? "bg-gray-800" : ""
  }`;

export default function Sidebar() {
  return (
    <aside className="bg-gray-900 text-white w-64 min-h-screen p-6">
      <div className="text-2xl font-bold mb-6">Schedulr</div>
      <nav className="flex flex-col gap-1">
        <NavLink to="/dashboard" className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/tasks" className={linkClass}>
          Tasks
        </NavLink>
        <NavLink to="/calendar" className={linkClass}>
          Calendar
        </NavLink>
        <NavLink to="/schedule" className={linkClass}>
          Schedule
        </NavLink> 
        <NavLink to="/settings" className={linkClass}>
          Settings
        </NavLink>
      </nav>
    </aside>
  );
}
