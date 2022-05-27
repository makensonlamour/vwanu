import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { useOutletContext } from "react-router-dom";
import * as Yup from "yup";
import { TextareaAutosize } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { Facebook } from "react-content-loader";

import { useCreateComment } from "../../comment/commentSlice";

const commentSuccess = () =>
  toast.success("Comment created successfully!", {
    position: "top-center",
  });

const commentError = () =>
  toast.error("Sorry. Error on creating comment!", {
    position: "top-center",
  });

const CommentForm = ({ PostId }) => {
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

  const ValidationSchema = Yup.object().shape({
    postText: Yup.string().label("Comment"),
  });

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
    } catch (e) {
      console.log(e);
      commentError();
    }
  };

  return (
    <>
      <Toaster />

      <div className="flex w-full space-x-2 items-center mt-4">
        <img className="object-cover mask mask-squircle h-10 w-10" src={user?.profilePicture?.original} alt="_picture" />
        <form
          validationSchema={ValidationSchema}
          style={{ padding: ".85rem" }}
          className={`flex bg-gray-100 rounded-3xl items-center w-full`}
        >
          <TextareaAutosize
            name="postText"
            type="text"
            className="resize-none outline-none w-full bg-transparent text-md placeholder-gray-400 font-light"
            placeholder={`Write a comment and press enter to post`}
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
};

export default CommentForm;
