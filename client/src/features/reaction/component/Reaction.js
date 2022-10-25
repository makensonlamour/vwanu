/*eslint-disable*/
import React, { Fragment } from "react";
import PropTypes from "prop-types";
// import { useOutletContext } from "react-router-dom";
import { useQueryClient } from "react-query";
import { useCreateReaction, useDeleteReaction } from "../reactionSlice";
import { Button } from "@mui/material";
import koremPNG from "../../../assets/images/reactions/korem2.png";
import koremBlackPNG from "../../../assets/images/reactions/korem3.png";
import { useHover } from "@mantine/hooks";

// import { ReactionBarSelector } from "@charkour/react-reactions";
// import _ from "lodash";
// import { FaThumbsUp } from "react-icons/fa";
// import reactions from "../../../data/reactions";

const Reaction = ({ post }) => {
  const queryClient = useQueryClient();
  // const user = useOutletContext();
  const { hovered, ref } = useHover();

  const createReaction = useCreateReaction(["post", "home", { id: post?.id }], (oldData, newData) => [...oldData, newData]);
  // const updateReaction = useUpdateReaction(["post", "home", post.id], (oldData, newData) => [...oldData, newData]);
  const deleteReaction = useDeleteReaction(["post", "home", { id: post?.id }]);

  const handleReaction = async () => {
    if (post && post?.isReactor?.length === 1) {
      await deleteReaction.mutateAsync({ id: post?.isReactor[0]?.id });
      queryClient.invalidateQueries(["post", post?.id]);
    } else {
      await createReaction.mutateAsync({ content: "like", entityId: post?.id, entityType: "Post" });
      queryClient.invalidateQueries(["post", post?.id]);
    }

    // queryClient.invalidateQueries(["post", "home"]);
  };

  return (
    <>
      <Button
        onClick={handleReaction}
        className="text-left mt-2 text-md hover:bg-gray-200 hover:rounded-lg px-2 py-2 lg:px-5 lg:py-2 normal-case"
      >
        <p
          style={{ alignItems: "center", display: "flex", textAlign: "left" }}
          className={`text-left normal-case text-md align-middle ${
            post && post?.isReactor?.length === 1 ? " text-primary font-semibold" : " text-gray-700"
          }`}
        >
          {post && post?.isReactor?.length === 1 ? (
            <Fragment>
              <p style={{ textTransform: "capitalize" }} className="text-left align-middle flex justify-center items-center">
                <img height={20} width={20} src={koremPNG} alt="_kore" />
                <span className="ml-1">{"Kore"}</span>
              </p>
            </Fragment>
          ) : (
            <Fragment>
              {/* <FaThumbsUp size={"24px"} className="bg-g-one/[0.3] p-1 mask mask-squircle inline mr-2" /> */}
              <div ref={ref} className="text-semibold hover:text-primary flex justify-center items-center">
                {hovered ? (
                  <img height={20} width={20} src={koremPNG} alt="_kore" />
                ) : (
                  <img height={20} width={20} src={koremBlackPNG} alt="_kore" />
                )}
                <span className="ml-1">{"Kore"}</span>
              </div>
            </Fragment>
          )}
        </p>
      </Button>
    </>
  );
};

Reaction.propTypes = {
  post: PropTypes.any,
};

export default Reaction;
