import React from "react";
import PropTypes from "prop-types";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { FormattedMessage } from "react-intl";

function ReusableDialog({ title, action, item, open, handleClose, handleDisagree, handleAgree }) {
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{`${title}`}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {" "}
          <FormattedMessage id="Dialog.dialogTxt" defaultMessage={`Are you sure you want to ${action} this ${item}?`} description="" />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button sx={{ color: "red" }} onClick={() => handleDisagree()}>
          <FormattedMessage id="Dialog.noTxt" defaultMessage="No" description="" />
        </Button>
        <Button sx={{ color: "green" }} onClick={() => handleAgree()}>
          <FormattedMessage id="Dialog.yesTxt" defaultMessage="Yes" description="" />
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
  post: PropTypes.string,
};

export default ReusableDialog;
