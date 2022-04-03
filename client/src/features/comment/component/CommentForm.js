import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { useOutletContext } from "react-router-dom";
import * as Yup from "yup";
import { TextareaAutosize } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { Facebook } from "react-content-loader";

//RTK Query
import { useCreateCommentMutation } from "../../comment/commentSlice";

const commentSuccess = () =>
  toast.success("Comment created successfully!", {
    position: "top-center",
  });

const commentError = () =>
  toast.error("Sorry. Error on creating comment!", {
    position: "top-center",
  });

const CommentForm = ({ PostId }) => {
  const dataUser = useOutletContext();
  const UserId = dataUser?.user?.id;
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
  const [createComment, { isFetching }] = useCreateCommentMutation();

  //object comment to set all the parameters
  const objComment = { postText, UserId, PostId };

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      await createComment(objComment).unwrap();
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
        <img className="rounded-full h-8 w-8" src={dataUser?.user?.profilePicture} alt="_picture" />
        <form
          validationSchema={ValidationSchema}
          style={{ padding: ".85rem" }}
          className={`flex bg-gray-100 rounded-3xl items-center w-full`}
        >
          <TextareaAutosize
            name="postText"
            type="text"
            className="resize-none outline-none w-full bg-transparent text-md placeholder-gray-400 font-light"
            placeholder={`Write a comment...`}
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
        {isFetching && <Facebook />}
      </div>
    </>
  );
};

CommentForm.propTypes = {
  PostId: PropTypes.string.isRequired,
};

export default CommentForm;
