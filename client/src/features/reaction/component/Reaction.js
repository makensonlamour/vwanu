import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useOutletContext } from "react-router-dom";
import { useQueryClient } from "react-query";
import { useCreateReaction, useUpdateReaction, useDeleteReaction } from "../reactionSlice";
import { Button, Popover } from "@mui/material";
import { ReactionBarSelector } from "@charkour/react-reactions";
import _ from "lodash";
import { FaThumbsUp } from "react-icons/fa";
import reactions from "../../../data/reactions";

const Reaction = ({ post }) => {
  const queryClient = useQueryClient();
  const user = useOutletContext();
  const [like, setLike] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const createReaction = useCreateReaction(["post", post.id], (oldData, newData) => [...oldData, newData]);
  const updateReaction = useUpdateReaction(["post", post.id], (oldData, newData) => [...oldData, newData]);
  const deleteReaction = useDeleteReaction();

  const handleReaction = async (label) => {
    const react = _.find(post?.Reactions, function (o) {
      return o.UserId === user?.id;
    });

    if (react?.UserId === user?.id) {
      if (react?.content === label) {
        // if user like this post and click on same reaction, delete reaction
        await deleteReaction.mutateAsync({ id: react?.id });
        queryClient.invalidateQueries(["posts", react?.PostId]);
      } else {
        // if user like this post and click on different reaction, update reaction
        await updateReaction.mutateAsync({ content: label, UserId: user?.id, PostId: post?.id, id: react?.id });
      }
    } else {
      // if user not like this post, create reaction
      await createReaction.mutateAsync({ content: label, UserId: user?.id, PostId: post.id });
    }
  };

  const isLike = () => {
    const react = _.find(post?.Reactions, function (o) {
      return o?.UserId === user?.id;
    });

    if (react?.UserId === user?.id) {
      return setLike(react);
    } else {
      return setLike(false);
    }
  };

  useEffect(() => {
    isLike();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  return (
    <>
      <Button
        onClick={handleClick}
        aria-describedby={id}
        className="text-left mt-2 text-md font-semibold hover:bg-gray-200 hover:rounded-lg px-2 py-2 lg:px-5 lg:py-2 normal-case"
      >
        <p
          style={{ alignItems: "center", display: "flex", textAlign: "left" }}
          className={`text-left normal-case text-md align-middle ${like ? " text-secondary" : " text-gray-700"}`}
        >
          {like ? (
            <Fragment>
              <p
                style={{
                  width: "24px",
                  alignItems: "center",
                  alignContent: "left",
                  marginRight: "0.5rem",
                  fontSize: "2rem",
                }}
                className="inline-flex text-lg items-center"
              >
                {like?.node}
              </p>{" "}
              <p style={{ textTransform: "capitalize" }} className="text-left align-middle">
                {" "}
                {like?.content}
              </p>
            </Fragment>
          ) : (
            <Fragment>
              <FaThumbsUp size={"24px"} className="bg-g-one/[0.3] p-1 mask mask-squircle inline mr-2" /> {" Like"}
            </Fragment>
          )}
        </p>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        onMouseDown={handleClose}
        onMouseLeave={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Fragment>
          <ReactionBarSelector
            className="bg-secondary p-2"
            iconSize={"28px"}
            reactions={reactions}
            onSelect={(label) => handleReaction(label)}
          />
        </Fragment>
      </Popover>
    </>
  );
};

Reaction.propTypes = {
  post: PropTypes.any,
};

export default Reaction;
