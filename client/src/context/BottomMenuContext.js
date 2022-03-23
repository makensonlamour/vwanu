import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";

// create context
export const BottomMenuContext = React.createContext();

export const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  function closeSidebar() {
    setIsSidebarOpen(false);
  }

  const value = useMemo(
    () => ({
      isSidebarOpen,
      toggleSidebar,
      closeSidebar,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isSidebarOpen]
  );

  return <BottomMenuContext.Provider value={value}>{children}</BottomMenuContext.Provider>;
};

SidebarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
