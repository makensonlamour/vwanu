import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useOutletContext } from "react-router-dom";
import { useQueryClient } from "react-query";
import { useCreateReaction, useUpdateReaction, useDeleteReaction } from "../reactionSlice";
import { Tooltip, Button, ClickAwayListener } from "@mui/material";
import { ReactionBarSelector } from "@charkour/react-reactions";
import _ from "lodash";
import { FaThumbsUp } from "react-icons/fa";
import reactions from "../../../data/reactions";

const Reaction = ({ post }) => {
  const queryClient = useQueryClient();
  const user = useOutletContext();
  const [open, setOpen] = useState(false);
  const [like, setLike] = useState(false);
  const handleTooltipClose = () => {
    setOpen(false);
  };

  const createReaction = useCreateReaction(["post", post.id], (oldData, newData) => [...oldData, newData]);
  const updateReaction = useUpdateReaction(["post", post.id], (oldData, newData) => [...oldData, newData]);
  const deleteReaction = useDeleteReaction();

  const handleReaction = async (label) => {
    const react = _.find(post.Reactions, function (o) {
      return o.UserId === user.id;
    });

    if (react?.UserId === user?.id) {
      if (react.content === label) {
        // if user like this post and click on same reaction, delete reaction
        console.log("delete reaction");
        await deleteReaction.mutateAsync(react.id);
        queryClient.invalidateQueries(["posts", react.PostId]);
      } else {
        // if user like this post and click on different reaction, update reaction
        console.log("update reaction");
        await updateReaction.mutateAsync({ content: label, UserId: user?.id, PostId: post.id, id: react.id });
      }
    } else {
      // if user not like this post, create reaction
      console.log("create reaction");
      await createReaction.mutateAsync({ content: label, UserId: user?.id, PostId: post.id });
    }
  };

  const isLike = () => {
    const react = _.find(post.Reactions, function (o) {
      return o.UserId === user.id;
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

  const handleTooltipOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <Tooltip
          placement="top"
          open={open}
          title={
            <Fragment>
              <ReactionBarSelector
                className="bg-secondary"
                iconSize={"28px"}
                reactions={reactions}
                onSelect={(label) => handleReaction(label)}
              />
            </Fragment>
          }
          sx={{ border: "none", backgroundColor: "transparent" }}
        >
          <Button
            onClick={handleTooltipOpen}
            className="mt-2 text-md font-semibold  hover:bg-gray-200 hover:rounded-lg px-2 py-2 lg:px-5 lg:py-2 normal-case"
          >
            <p className={`normal-case ${like ? "text-secondary" : "text-gray-700"}`}>
              {like ? (
                <Fragment>
                  <p className="inline-flex text-lg">{like.node}</p> {like.content}
                </Fragment>
              ) : (
                <Fragment>
                  <FaThumbsUp size={20} className="inline mr-2" /> {" Like"}
                </Fragment>
              )}
            </p>
          </Button>
        </Tooltip>
      </ClickAwayListener>
    </>
  );
};

Reaction.propTypes = {
  post: PropTypes.any,
};

export default Reaction;
