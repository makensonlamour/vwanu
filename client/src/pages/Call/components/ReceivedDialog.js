import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Box, Button, List, DialogTitle, DialogContent, DialogActions, Dialog } from "@mui/material";

// custom dependencies
import useCall from "../../../hooks/useCall";
function ConfirmationDialogRaw(props) {
  const { answerCall, denyCall, call } = useCall();
  console.log("incomming", call);
  const { onClose, open, ...other } = props;
  const radioGroupRef = useRef(null);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  //   const handleCancel = () => {
  //     onClose();
  //   };

  //   const handleOk = () => {
  //     onClose(value);
  //   };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>Incoming Call from Yves</DialogTitle>
      <DialogContent dividers>{`You're receiving a call from Yves Gervens Constant`}</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={denyCall}>
          Deny call
        </Button>
        <Button onClick={answerCall}>Answer call</Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

const ReceivedDialog = ({ open, caller }) => {
  const { denyCall } = useCall();
  console.log(caller);

  const handleClose = () => {
    console.log("closed ConfirmationDialogRaw");
    denyCall();
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <List component="div" role="group">
        <ConfirmationDialogRaw id="ringtone-menu" keepMounted open={open} onClose={handleClose} value={"ok"} />
      </List>
    </Box>
  );
};

ReceivedDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  caller: PropTypes.object,
};

export default ReceivedDialog;
