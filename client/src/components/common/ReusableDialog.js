import React from "react";
import PropTypes from "prop-types";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
//import { deleteComment } from "../utils/postActions";

function ReusableDialog({ title, action, item, open, handleClose, handleAgree, handleDisagree }) {
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{`${title}`}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{`Are you sure you want to ${action} this ${item}?`}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button sx={{ color: "red" }} onClick={handleDisagree}>
          No
        </Button>
        <Button sx={{ color: "green" }} onClick={handleAgree}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ReusableDialog.propTypes = {
  title: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleAgree: PropTypes.func.isRequired,
  handleDisagree: PropTypes.func.isRequired,
};

export default ReusableDialog;
