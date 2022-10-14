import React from "react";
import { PropTypes } from "prop-types";
import { Link, useOutletContext } from "react-router-dom";
import { formatDistance, parseISO } from "date-fns";
import MenuPost from "./../../post/components/MenuPost";
import { transformHashtagAndLink } from "../../../helpers/index";

const CommentSingle = ({ comment, response = false, PostId }) => {
  const user = useOutletContext();
  return (
    <div className="z-0 flex items-start pr-3 gap-y-2">
      <img
        src={comment?.User?.profilePicture}
        className={`${response ? "h-6 w-6" : "h-8 w-8"} mr-2 mt-1 object-cover mask mask-squircle`}
        alt="_profile_img"
      />
      {/* extra div for flex of comment text div and the three dots  */}
      <div className="z-10 flex items-start flex-shrink">
        <div className={`px-3 py-1 bg-gray-100 rounded-xl items-center`}>
          <div className="flex justify-between space-x-6">
            <Link to={`../../profile/${comment?.User?.id}`} className="text-secondary text-sm">
              {`${comment?.User?.firstName} ${comment?.User?.lastName}`}
            </Link>
            <span className={`text-gray-500 font-light text-right text-xs`}>
              {formatDistance(parseISO(comment?.createdAt), new Date(), [
                {
                  includeSeconds: true,
                },
              ])}
            </span>
            {user?.id === comment?.User?.id || user?.id === PostId ? <MenuPost post={comment} /> : null}
          </div>

          <p className={`text-gray-800 font-light ${response ? "text-[0.85rem]" : "text-[0.97rem]"}`}>
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
  response: PropTypes.bool,
};

export default CommentSingle;
