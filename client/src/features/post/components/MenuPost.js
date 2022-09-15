/*eslint-disable */
import React, { useRef, useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { BsThreeDots } from "react-icons/bs";
import { VscEdit } from "react-icons/vsc";
import { BiBlock } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import Loader from "../../../components/common/Loader";
import { ClickAwayListener, Grow, Paper, Popper, MenuItem, MenuList } from "@mui/material";
import ReusableDialog from "../../../components/common/ReusableDialog";
import { useDeletePost } from "../../post/postSlice";
import toast, { Toaster } from "react-hot-toast";
import EditPost from "../components/EditPost";

//import { deleteComment } from "../utils/postActions";
import { useQueryClient } from "react-query";

const deletePostError = () =>
  toast.error("Sorry. Error on deleting this user!", {
    position: "top-center",
  });

const deletePostSuccess = () =>
  toast.success("Post deleted successfully.", {
    position: "top-center",
  });
// import { useUnfriendUser } from "../friendSlice";

const MenuPost = ({ post }) => {
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const anchorRef = useRef(null);

  const deletePost = useDeletePost(["post", "home", post?.id], undefined, undefined);

  // const unfriend = useUnfriendUser(["user", "request"]);

  //error dialog

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

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const queryClient = useQueryClient();

  const handleAgree = async () => {
    try {
      let result = await deletePost.mutateAsync({ id: post?.id });
      console.log(result);
      deletePostSuccess();
      queryClient.invalidateQueries("post");
    } catch (e) {
      console.log(e);
      deletePostError();
    } finally {
      handleClose();
    }
    // notify();
  };

  const handleDisagree = () => {
    handleCloseDialog();
  };

  const handleClickOpen = () => {
    setOpenDialogEdit(true);
  };

  const [openDialogEdit, setOpenDialogEdit] = useState(false);

  return (
    <>
      <Toaster />

      <ReusableDialog
        post={post}
        title={"Delete Post"}
        action={"delete"}
        item={"post"}
        open={openDialog}
        handleAgree={handleAgree}
        handleDisagree={handleDisagree}
        handleClose={handleCloseDialog}
      />
      {showModal ? (
        <EditPost
          post={post}
          setShowModal={setShowModal}
          setOpenDialogEdit={setOpenDialogEdit}
          openDialogEdit={openDialogEdit}
          reference=""
          communityId={post?.id}
        />
      ) : null}

      <button
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        className="flex justify-center items-center"
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            <BsThreeDots size={"18px"} className="mr-1 items-center align-middle" />
          </>
        )}
      </button>
      <Popper
        open={open}
        sx={{ zIndex: "tooltip" }}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
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
                  className="px-2 rounded-xl"
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  zIndex="tooltip"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem
                    className="text-black rounded-xl hover:text-primary"
                    onClick={(e) => {
                      handleClickOpen(e);
                      handleClose(e);
                      setShowModal(true);
                    }}
                  >
                    <VscEdit size={"18px"} className="mr-1 items-center align-middle inline" />
                    Edit
                  </MenuItem>
                  <MenuItem
                    className="text-black  rounded-xl hover:text-primary"
                    onClick={(e) => {
                      //   window.location.href = `../../messages?newMessage=true&otherUserId=${otherUser?.id}`;
                      handleClickOpenDialog();
                      handleClose(e);
                    }}
                  >
                    {" "}
                    <AiOutlineDelete size={"18px"} className="mr-1 items-center align-middle" />
                    Delete
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

MenuPost.propTypes = {
  post: PropTypes.object,
};

export default MenuPost;
