import * as React from "react";
import PropTypes from "prop-types";
import { Button, Menu, MenuItem } from "@mui/material";
import { GoGlobe } from "react-icons/go";
import { BiLockAlt } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";

function ModalPrivacy({ title, fn }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="bg-placeholder-color border-gray-300 rounded-lg hover:rounded-lg"
      >
        <span className="normal-case text-md">
          {title === "public" ? <GoGlobe size={20} className="inline mr-1" /> : null}
          {title === "network" ? <FaUsers size={20} className="inline mr-1 " /> : null}
          {title === "me" ? <BiLockAlt size={20} className="inline mr-1 " /> : null}
          {title}
        </span>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            fn("public");
            handleClose();
          }}
        >
          <div style={{ display: "flex", alignItems: "center", color: `${title === "public" ? "#ff4200" : ""}` }}>
            <div style={{ backgroundColor: "#EFF3FF", borderRadius: "25px", padding: "0.5rem", marginRight: "0.5rem" }}>
              <GoGlobe size={"24px"} className="inline mr-1 " />
            </div>
            <div className="inline">
              <p style={{ fontSize: "18px", fontWeight: "600" }}>Public</p>
              <p style={{ fontSize: "14px", fontWeight: "100" }}>Visible to anyone, on this site</p>
            </div>
          </div>
        </MenuItem>
        <MenuItem
          onClick={() => {
            fn("network");
            handleClose();
          }}
        >
          <div style={{ display: "flex", alignItems: "center", color: `${title === "network" ? "#ff4200" : ""}` }}>
            <div style={{ backgroundColor: "#EFF3FF", borderRadius: "25px", padding: "0.5rem", marginRight: "0.5rem" }}>
              <FaUsers size={"24px"} className="inline mr-1 " />
            </div>
            <div className="inline">
              <p style={{ fontSize: "18px", fontWeight: "600" }}>My Network</p>
              <p style={{ fontSize: "14px", fontWeight: "100" }}>Visible only to your network</p>
            </div>
          </div>
        </MenuItem>
        <MenuItem
          onClick={() => {
            fn("me");
            handleClose();
          }}
        >
          <div style={{ display: "flex", alignItems: "center", color: `${title === "me" ? "#ff4200" : ""}` }}>
            <div style={{ backgroundColor: "#EFF3FF", borderRadius: "25px", padding: "0.5rem", marginRight: "0.5rem" }}>
              <BiLockAlt size={"24px"} className="inline mr-1 " />
            </div>
            <div className="inline">
              <p style={{ fontSize: "18px", fontWeight: "600" }}>Only Me</p>
              <p style={{ fontSize: "14px", fontWeight: "100" }}>Visible only to you</p>
            </div>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}

ModalPrivacy.propTypes = {
  title: PropTypes.any.isRequired,
  fn: PropTypes.func,
};

export default ModalPrivacy;
