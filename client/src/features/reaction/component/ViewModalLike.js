import * as React from "react";
import PropTypes from "prop-types";
import { Backdrop, Box, Modal, Fade, Typography } from "@mui/material/";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 2,
  borderRadius: "15px",
};

const ViewModalLike = ({ reactions, label }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button style={{ backgroundColor: "transparent" }} onClick={handleOpen}>
        {label}
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography sx={{ paddingBottom: 2, color: "blue" }}>
              {reactions?.length} {" reactions"}
            </Typography>
            <ul className="block border-b border-primary" style={{ borderTop: "1px solid #efefef" }}>
              {reactions?.map((reaction, idx) => {
                return (
                  <>
                    <li key={idx} style={{ display: "flex", justifyContent: "between", padding: "5px", borderBottom: "1px solid #efefef" }}>
                      <div style={{ marginRight: "20px", alignItems: "center" }}>{reaction?.node} </div>
                      <div style={{ marginRight: "20px", alignItems: "center" }}>
                        <img
                          width="32px"
                          height="32px"
                          className="mask mask-squircle"
                          src={reaction?.User?.profilePicture}
                          alt="_profile"
                        />
                      </div>
                      <div style={{ alignItems: "center" }}>
                        <span>{reaction?.by}</span>
                      </div>
                    </li>
                  </>
                );
              })}
            </ul>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

ViewModalLike.propTypes = {
  reactions: PropTypes.array,
  label: PropTypes.any,
};

export default ViewModalLike;
