import React from 'react'

const Logo = ({toggleSidebar}) => {
  return (
    <div className={`${toggleSidebar ? "md:text-2xl": "md:text-sm"} text-2xl font-bold `}>
      Schedulr
    </div>
  )
}

export default Logo

