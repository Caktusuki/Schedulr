import { NavLink } from "react-router-dom";
import { useUser } from "../contexts/UserContext.jsx";
import Logo from "./Logo.jsx";
import { SiFacebook, SiInstagram, SiLinkedin, SiX } from "react-icons/si";
import { useContext } from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";
import { ToggleSidebarContext } from "../contexts/ToggleSidebarContext.jsx";

export default function Sidebar({showSidebar}) {
  const { user, logout } = useUser();
  const {toggleSidebar, setToggleSidebar}=useContext(ToggleSidebarContext)

  const linkClass = ({ isActive }) =>
  `flex gap-2 items-center justify-start  w-full text-left 
  ${toggleSidebar ? "px-3 md:justify-start w-full": "px-1 md:justify-center w-fit"} py-1 sm:py-2 transition-all duration-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-800 ${
    isActive ? "bg-gray-300 dark:bg-gray-800" : ""
  }`;

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <aside className={`${showSidebar? "translate-x-0": "-translate-x-full md:translate-x-0"} md:block peer 
     ${toggleSidebar ? "w-48 md:px-3": "md:w-fit md:px-2"} md:py-4
    fixed top-0 left-0 bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-white min-h-screen px-1.5 py-3 sm:px-3 
     transform w-44 transition-all duration-500 ease-in-out`}
    >
      <Logo toggleSidebar={toggleSidebar}/>
      {/* <div className="text-lg sm:text-xl md:text-2xl font-bold mb-6 hidden sm:inline md:inline">Schedulr</div> */}

      {/* User Info */}
      {user && (
        <div className={`${toggleSidebar ? "block": "hidden"} my-6 p-3 bg-gray-200 dark:bg-gray-800 rounded-lg`}>
          <p className="text-sm text-gray-300 dark:text-gray-400">Logged in as:</p>
          <p className="text-sm font-medium truncate">{user.email}</p>
        </div>
      )}

      <nav className="flex flex-col gap-4 sm:gap-2 flex-1 items-center mt-8 sm:mt-6">
        <NavLink to="/home" className={linkClass}>
         <img width="25" height="25" src="https://img.icons8.com/?size=100&id=wFfu6zXx15Yk&format=png&color=000000" alt="home"/>
          <span className={`${toggleSidebar ? "inline" : "md:hidden"} text-sm sm:text-md `}>Home</span>
          {/* hidden sm:inline md:inline  for later use */}
        </NavLink> 
        <NavLink to="/dashboard" className={linkClass}>
         <img width="25" height="25" src="https://img.icons8.com/?size=100&id=XnHBz2LnhELw&format=png&color=000000" alt="dashboard"/>
          <span className={`${toggleSidebar ? "inline" : "md:hidden"} text-sm sm:text-md `}>Dashboard</span>
        
        </NavLink>
        <NavLink to="/tasks" className={linkClass}>
           <img width="25" height="25" src="https://img.icons8.com/?size=100&id=Wo2fxhUTwDhv&format=png&color=000000" alt="task"/>
          <span className={`${toggleSidebar ? "inline" : "md:md:hidden"} text-sm sm:text-md `}>Tasks</span>
          
        </NavLink>
        <NavLink to="/calendar" className={linkClass}>
         <img width="25" height="25" src="https://img.icons8.com/?size=100&id=21528&format=png&color=000000" alt="calender"/>
          <span className={`${toggleSidebar ? "inline" : "md:hidden"} text-sm sm:text-md `}>Calender</span>
          
        </NavLink>
        <NavLink to="/schedule" className={linkClass}>
          <img width="25" height="25" src="https://img.icons8.com/?size=100&id=CcnMefzl28xf&format=png&color=000000" alt="schedule"/>
          <span className={`${toggleSidebar ? "inline" : "md:hidden"} text-sm sm:text-md `}>Schedule</span>
          
        </NavLink>
        <NavLink to="/settings" className={linkClass}>
          <img width="25" height="25" src="https://img.icons8.com/?size=100&id=12784&format=png&color=000000" alt="settings"/>
          <span className={`${toggleSidebar ? "inline" : "md:hidden"} text-sm sm:text-md `}>Settings</span>
        
        </NavLink>
      </nav>

      {/* Logout Button */}
      {user && (
        <div className="mt-auto pt-4 border-t border-gray-300 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className={`${toggleSidebar? "md:w-full md:px-4": "md:w-fit md:px-2"} w-full px-4 text-left py-2 text-red-500 dark:text-red-400 hover:bg-gray-300 dark:hover:bg-gray-800 rounded-md transition-colors`}
          >
            Logout
          </button>
        </div>
      )}
      <div className={`${toggleSidebar? "flex": "hidden"} absolute bottom-0 left-0 flex w-full py-4 justify-center gap-3 border-t-[1px] border-gray-300 dark:border-white text-gray-500 dark:text-gray-400`}>
        <a href="https://www.instagram.com/" target="_blank">
          <SiInstagram className="hover:text-gray-800 dark:hover:text-white"/>
        </a>
        <a href="https://www.facebook.com/" target="_blank">
          <SiFacebook className="hover:text-gray-800 dark:hover:text-white"/>
        </a>
        <a href="https://x.com/" target="_blank">
          <SiX className="hover:text-gray-800 dark:hover:text-white"/>
        </a>
        <a href="https://www.linkedin.com/" target="_blank">
          <SiLinkedin className="hover:text-gray-800 dark:hover:text-white"/>
        </a>
      </div>

      <button className="hidden md:inline bg-gray-200 dark:bg-gray-900 p-2 rounded-full absolute top-[50%] left-full transform -translate-x-8 -translate-y-[50%]" onClick={()=>setToggleSidebar(!toggleSidebar)}>
        {toggleSidebar ? 
         <IoIosArrowDropleft size={"32px"} className="cursor-pointer"/>
         :
         <IoIosArrowDropright size={"32px"} className="cursor-pointer"/>
        }
      </button>
    </aside>
  );
}
