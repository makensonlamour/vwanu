import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
//import { deleteComment } from "../utils/postActions";

function ReusableDialog({ title, action, item, open, handleClose, handleAgree, handleDisagree }) {
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{`${title}`}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{`Are you sure you want to ${action} this ${item}?`}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDisagree} color="red">
          No
        </Button>
        <Button onClick={handleAgree} color="primary">
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
