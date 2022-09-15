import React, { useState } from "react";
import Picker from "emoji-picker-react";
import { Popover } from "@mui/material";
import PropTypes from "prop-types";

const BoxEmoji = ({ setSelectedEmoji, label }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      {/* <img src={selectedGif} width="480" height="446" alt="_" className="" allowFullScreen /> */}
      <button
        onClick={handleClick}
        className="inline-flex justify-center px-1 py-2 text-gray-900 rounded-lg cursor-pointer hover:text-primary"
      >
        {label}
      </button>
      <Popover
        className="my-2"
        style={{ marginTop: "10px", marginBottom: "10px", padding: "20px", height: "70vh" }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div>
          <Picker onEmojiClick={setSelectedEmoji} />
        </div>
      </Popover>
    </>
  );
};

BoxEmoji.propTypes = {
  setSelectedEmoji: PropTypes.func,
  label: PropTypes.element,
};

export default BoxEmoji;
