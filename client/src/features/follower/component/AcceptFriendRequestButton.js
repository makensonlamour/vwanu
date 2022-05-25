import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import toast, { Toaster } from "react-hot-toast";
import { FiCheck } from "react-icons/fi";
import { AiOutlineClose, AiOutlineMenuUnfold } from "react-icons/ai";
import { ClickAwayListener, Grow, Paper, Popper, MenuItem, MenuList } from "@mui/material";
import { useAcceptFriendRequest, useDeclineFriendRequest } from "../friendSlice";
import Loader from "../../../components/common/Loader";

const AcceptFriendRequestButton = ({ otherUser }) => {
  const [open, setOpen] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const anchorRef = useRef(null);

  const acceptFriendRequest = useAcceptFriendRequest(["user", "request"]);
  const declineFriendRequest = useDeclineFriendRequest(["user", "request"]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const acceptFriendRequestError = () =>
    toast.error("Sorry. Error on accepting Friend Request!", {
      position: "top-center",
    });

  const declineFriendRequestError = () =>
    toast.error("Sorry. Error on refusing Friend Request!", {
      position: "top-center",
    });

  const handleAcceptfriendRequest = async (e) => {
    console.log("accepted");
    e.preventDefault();
    setIsLoading(true);
    try {
      await acceptFriendRequest.mutateAsync({ friendId: otherUser?.id, accept: true });
      //add query to fetch
    } catch (e) {
      console.log(e);
      acceptFriendRequestError();
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeclinefriendRequest = async (e) => {
    console.log("Decline");
    e.preventDefault();
    setIsLoading(true);
    try {
      await declineFriendRequest.mutateAsync({ friendId: otherUser?.id, accept: false });
      //add query to fetch
    } catch (e) {
      console.log(e);
      declineFriendRequestError();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <button
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        className="items-center align-middle mr-1 btn btn-sm btn-secondary text-base-100 rounded-full mb-2 lg:mb-0 hover:bg-primary justify-end"
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            <AiOutlineMenuUnfold size={"18px"} /> <span className="ml-[0.5px]">{"Accept friend"}</span>
          </>
        )}
      </button>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} placement="top-start" transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  className="text-secondary"
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem
                    onClick={(e) => {
                      handleAcceptfriendRequest(e);
                      handleClose();
                    }}
                    className="text-green-600"
                  >
                    <FiCheck size={"24px"} /> Accept
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      handleDeclinefriendRequest(e);
                      handleClose();
                    }}
                    className="text-red-600"
                  >
                    <AiOutlineClose size={"24px"} /> Decline
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

AcceptFriendRequestButton.propTypes = {
  otherUser: PropTypes.object,
};

export default AcceptFriendRequestButton;
