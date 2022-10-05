import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { useOutletContext } from "react-router-dom";
import { TextareaAutosize } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { Facebook } from "react-content-loader";
import { useQueryClient } from "react-query";

import { useCreateComment } from "../../comment/commentSlice";

const commentSuccess = () =>
  toast.success("Comment created successfully!", {
    position: "top-center",
  });

const commentError = () =>
  toast.error("Sorry. Error on creating comment!", {
    position: "top-center",
  });

const CommentForm = ({ PostId, response = false }) => {
  const queryClient = useQueryClient();
  const user = useOutletContext();
  const UserId = user?.id;
  let buttonRef = useRef();
  const [postText, setPostText] = useState("");

  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      buttonRef.current.click();
    }
  };

  //rtk query to create comment
  const mutationAddComment = useCreateComment(["post", PostId], (oldData, newData) => [...oldData, newData]);

  //object comment to set all the parameters
  const objComment = { postText, UserId, PostId };

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      await mutationAddComment.mutateAsync(objComment);
      setPostText("");
      commentSuccess();
      queryClient.refetchQueries(["post", "home"]);
      queryClient.refetchQueries(["post", PostId]);
    } catch (e) {
      console.log(e);
      commentError();
    }
  };

  return (
    <>
      <Toaster />

      <div className={`${response ? "ml-10" : ""} flex space-x-1 items-center my-2`}>
        <img
          className={`${response ? "h-6 w-6" : "h-10 w-10"} object-cover mask mask-squircle `}
          src={user?.profilePicture?.original}
          alt="_picture"
        />
        <form className={`${response ? "py-[0.10rem]" : "py-[0.38rem]"} flex bg-gray-100 rounded-xl items-center w-full`}>
          <TextareaAutosize
            name="postText"
            type="text"
            className="resize-none hover:border-0 border-0 align-middle items-center text-xs outline-none w-full bg-transparent text-md placeholder-gray-400 font-light"
            placeholder={`${response ? "Write a response and press enter..." : "Write a comment and press enter..."}`}
            maxRows={4}
            autoFocus={true}
            onKeyDown={onEnterPress}
            value={postText}
            onChange={(e) => {
              setPostText(e.target.value);
            }}
          ></TextareaAutosize>
          <button ref={buttonRef} hidden onClick={handleComment} name="comment"></button>
        </form>
      </div>
      {mutationAddComment?.isLoading && <Facebook />}
    </>
  );
};

CommentForm.propTypes = {
  PostId: PropTypes.string.isRequired,
  response: PropTypes.bool,
};

export default CommentForm;
