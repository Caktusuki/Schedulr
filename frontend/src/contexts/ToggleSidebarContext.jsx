import { createContext, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const ToggleSidebarContext = createContext();

export const ToggleValueProvider=({children}) =>{

const [toggleSidebar, setToggleSidebar]=useState(true)

const contextVal={
     toggleSidebar,
     setToggleSidebar
  }

return (
  <ToggleSidebarContext.Provider value={contextVal}>
    {children}
  </ToggleSidebarContext.Provider>
)

} 