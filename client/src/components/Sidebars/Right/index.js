import React from "react";
import Online from "../../Online/Online";

const SidebarRight = () => {
  return (
    <>
      <div className="bg-slate-100 h-screen overflow-scroll w-full">
        <div className="h-10"></div>
        <Online />
      </div>
    </>
  );
};

export default SidebarRight;
