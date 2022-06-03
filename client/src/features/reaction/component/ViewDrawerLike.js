import React, { useState } from "react";
import PropTypes from "prop-types";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { CssBaseline, Box, Typography, SwipeableDrawer } from "@mui/material";
import { grey } from "@mui/material/colors";

const drawerBleeding = 56;

const Root = styled("div")(() => ({
  height: "100%",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

const ViewDrawerLike = (props) => {
  const { window, label, reactions } = props;
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  console.log(reactions);

  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />

      <Box sx={{ textAlign: "center", pt: 1, backgroundColor: "transparent" }}>
        <button className="bg-inherit" onClick={toggleDrawer(true)}>
          {label}
        </button>
      </Box>
      {open ? (
        <SwipeableDrawer
          container={container}
          anchor="bottom"
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          swipeAreaWidth={drawerBleeding}
          disableSwipeToOpen={false}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <StyledBox
            sx={{
              position: "absolute",
              top: -drawerBleeding,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              visibility: "visible",
              right: 0,
              left: 0,
            }}
          >
            <Puller />
            <Typography sx={{ p: 2, color: "blue" }}>
              {reactions?.length} {" reactions"}
            </Typography>
          </StyledBox>
          <StyledBox
            sx={{
              px: 2,
              pb: 2,
              height: "100%",
              overflow: "auto",
            }}
          >
            <ul className="block border-b border-primary" style={{ borderTop: "1px solid #efefef" }}>
              {reactions.map((reaction, idx) => {
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
          </StyledBox>
        </SwipeableDrawer>
      ) : null}
    </Root>
  );
};

ViewDrawerLike.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
  reactions: PropTypes.array,
  label: PropTypes.any,
};

export default ViewDrawerLike;
