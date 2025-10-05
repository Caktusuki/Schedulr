import { NavLink } from "react-router-dom";
import { useUser } from "../contexts/UserContext.jsx";

const linkClass = ({ isActive }) =>
  `flex gap-2 items-center justify-center sm:justify-start w-full text-left px-3 py-1 sm:py-2 transition-all duration-300 rounded-md hover:bg-gray-800 ${
    isActive ? "bg-gray-800" : ""
  }`;

export default function Sidebar() {
  const { user, logout } = useUser();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <aside className="peer fixed top-0 left-0 bg-gray-900 text-white t min-h-screen p-1.5 sm:p-3 md:p-4 transition-all duration-300 w-16  sm:w-44 md:hover:w-64"
    >
      <div className="text-lg sm:text-xl md:text-2xl font-bold mb-6 hidden sm:inline md:inline">Schedulr</div>

      {/* User Info */}
      {user && (
        <div className="mb-6 p-3 bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-300">Logged in as:</p>
          <p className="text-sm font-medium truncate">{user.email}</p>
        </div>
      )}

      <nav className="flex flex-col gap-4 sm:gap-2 flex-1 items-center mt-8 sm:mt-6">
        <NavLink to="/home" className={linkClass}>
         <img width="25" height="25" src="https://img.icons8.com/?size=100&id=wFfu6zXx15Yk&format=png&color=000000" alt="home"/>
          <span className="text-sm hidden sm:inline md:inline ">Home</span>
          
        </NavLink>
        <NavLink to="/dashboard" className={linkClass}>
         <img width="25" height="25" src="https://img.icons8.com/?size=100&id=XnHBz2LnhELw&format=png&color=000000" alt="dashboard"/>
          <span className="text-sm sm:text-md hidden sm:inline md:inline ">Dashboard</span>
        
        </NavLink>
        <NavLink to="/tasks" className={linkClass}>
           <img width="25" height="25" src="https://img.icons8.com/?size=100&id=Wo2fxhUTwDhv&format=png&color=000000" alt="task"/>
          <span className="text-sm sm:text-md hidden sm:inline md:inline">Tasks</span>
          
        </NavLink>
        <NavLink to="/calendar" className={linkClass}>
         <img width="25" height="25" src="https://img.icons8.com/?size=100&id=21528&format=png&color=000000" alt="calender"/>
          <span className="text-sm sm:text-md hidden sm:inline md:inline">Calender</span>
          
        </NavLink>
        <NavLink to="/schedule" className={linkClass}>
          <img width="25" height="25" src="https://img.icons8.com/?size=100&id=CcnMefzl28xf&format=png&color=000000" alt="schedule"/>
          <span className="text-sm sm:text-md hidden sm:inline md:inline ">Schedule</span>
          
        </NavLink>
        <NavLink to="/settings" className={linkClass}>
          <img width="25" height="25" src="https://img.icons8.com/?size=100&id=12784&format=png&color=000000" alt="settings"/>
          <span className="text-sm sm:text-md hidden sm:inline md:inline ">Settings</span>
        
        </NavLink>
      </nav>

      {/* Logout Button */}
      {user && (
        <div className="mt-auto pt-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800 rounded-md transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </aside>
  );
}
