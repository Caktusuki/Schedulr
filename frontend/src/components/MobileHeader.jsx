import React from 'react';
import Logo from './Logo';
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";

const MobileHeader = ({showSidebar, setShowSidebar}) => {
  return (
    <div className={`${showSidebar? "bg-none" : "bg-gray-900 dark:bg-gray-900 text-white dark:text-white"} flex justify-between items-center md:hidden text-center px-4 sm:px-10 py-2`}>
      {/* logo */}
      <div className=''>
        <Logo/>
      </div>
      {/* hamburger menu */}
      <div onClick={()=>setShowSidebar(!showSidebar)}>
        {showSidebar? 
        <RxCross1 size={"30px"}/> :
        <GiHamburgerMenu size={"30px"}/>
        }
        
      </div>
    </div>
  )
}

export default MobileHeader
