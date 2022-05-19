import React, { useRef, useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import toast, { Toaster } from "react-hot-toast";
import { FiUserCheck } from "react-icons/fi";
import Loader from "../../../components/common/Loader";
import { ClickAwayListener, Grow, Paper, Popper, MenuItem, MenuList } from "@mui/material";
import { useUnfriendUser } from "../friendSlice";

const FriendButton = ({ otherUser }) => {
  const [open, setOpen] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const anchorRef = useRef(null);

  const unfriend = useUnfriendUser(["user", "request"]);

  //error dialog
  const unFriendRequestError = () =>
    toast.error("Sorry. Error on unFriend this user!", {
      position: "top-center",
    });

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

  const handleUnfriend = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await unfriend.mutateAsync({ friendId: otherUser?.id });
    } catch (e) {
      unFriendRequestError();
      console.log(e);
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
        className="items-center align-middle mr-1 btn btn-sm btn-primary text-base-100 rounded-lg mb-2 lg:mb-0 hover:bg-primary justify-end"
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            <FiUserCheck size={"18px"} className="mr-1 items-center align-middle" /> {" Friend"}
          </>
        )}
      </button>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} placement="bottom-start" transition disablePortal>
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
                  <MenuItem onClick={handleClose}>Unfollow</MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleUnfriend();
                      handleClose();
                    }}
                  >
                    Unfriend
                  </MenuItem>
                  <MenuItem onClick={handleClose}>Block</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

FriendButton.propTypes = {
  otherUser: PropTypes.object,
};

export default FriendButton;
