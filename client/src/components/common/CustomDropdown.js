import React, { useState } from "react";

const CustomDropdown = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="">
        <button onClick={() => setOpen(!open)}>{"menu"}</button>
      </div>
      {open && (
        <div className="z-50 w-52 bg-white h-fit absolute">
          <p>item 1</p>
          <p>item 2</p>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
