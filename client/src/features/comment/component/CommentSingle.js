import React from "react";
import { PropTypes } from "prop-types";
import { Link, useOutletContext } from "react-router-dom";
import { formatDistance, parseISO } from "date-fns";
import MenuPost from "./../../post/components/MenuPost";
import { transformHashtagAndLink } from "../../../helpers/index";

const CommentSingle = ({ comment, PostId }) => {
  const user = useOutletContext();
  return (
    <div className="flex items-start pr-3 mt-3">
      <img src={comment?.User?.profilePicture} className="h-8 w-8 mr-2 mt-1 mask mask-squircle" alt="_profile_img" />
      {/* extra div for flex of comment text div and the three dots  */}
      <div className="flex items-start flex-shrink">
        <div className={`px-4 py-1 bg-gray-100 rounded-3xl items-center`}>
          <div className="flex justify-between space-x-6">
            <Link to={`../../profile/${comment?.User?.id}`} className="text-secondary text-sm">
              {`${comment?.User?.firstName} ${comment?.User?.lastName}`}
            </Link>
            <span className="text-gray-500 font-light text-right text-xs">
              {formatDistance(parseISO(comment?.createdAt), new Date(), [
                {
                  includeSeconds: true,
                },
              ])}
            </span>
            {user?.id === comment?.User?.id || user?.id === PostId ? <MenuPost post={comment} /> : null}
          </div>

          <p className="text-gray-800 font-light" style={{ fontSize: "0.97rem" }}>
            {transformHashtagAndLink(comment?.postText)}
          </p>
        </div>
      </div>
    </div>
  );
};

CommentSingle.propTypes = {
  comment: PropTypes.object,
  PostId: PropTypes.string,
};

export default CommentSingle;
