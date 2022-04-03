import * as React from "react";
import PropTypes from "prop-types";
import { Button, Menu, MenuItem } from "@mui/material";
import { GoGlobe } from "react-icons/go";

function ModalPrivacy({ title }) {
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
      >
        <span className="normal-case text-md">
          <GoGlobe size={20} className="inline mr-1" />
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
        <MenuItem onClick={handleClose}>Everyone</MenuItem>
        <MenuItem onClick={handleClose}>Friends</MenuItem>
        <MenuItem onClick={handleClose}>Friends and their friends</MenuItem>
        <MenuItem onClick={handleClose}>Only me</MenuItem>
      </Menu>
    </div>
  );
}

ModalPrivacy.propTypes = {
  title: PropTypes.any.isRequired,
};

export default ModalPrivacy;
