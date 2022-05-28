import React from "react";
import PropTypes from "prop-types";
import { formatDistance, parseISO } from "date-fns";
import { Link } from "react-router-dom";

const CommentList = ({ Comments, showAll }) => {
  console.log(Comments);
  return (
    <>
      {Comments?.length > 0
        ? Comments?.map((comment, idx) => {
            return showAll ? (
              <>
                <div key={idx} className="flex items-start pr-3 mt-3">
                  <img src={comment?.User?.profilePicture} className="h-8 w-8 mr-2 mt-1 mask mask-squircle" alt="_profile_img" />
                  {/* extra div for flex of comment text div and the three dots  */}
                  <div className="flex items-start flex-shrink">
                    <div className={`px-4 py-2 bg-gray-100 rounded-3xl items-center`}>
                      <div className="flex justify-between space-x-6">
                        <Link to={`../../profile/${comment?.User?.id}`} className="text-secondary text-sm">
                          {`${comment?.User?.firstName} ${comment?.User?.lastName}`}
                        </Link>
                        <span className="text-gray-500 font-light text-right">
                          {formatDistance(parseISO(comment?.createdAt), new Date(), [
                            {
                              includeSeconds: true,
                            },
                          ])}
                        </span>
                      </div>

                      <p className="text-gray-800 font-light" style={{ fontSize: "0.97rem" }}>
                        {comment?.postText}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : //to show preview of comments when not on post id
            idx < 3 ? (
              <div key={idx} className="flex items-start pr-3 mt-3">
                <img src={comment?.User?.profilePicture} className="h-8 w-8 mr-2 mt-1 mask mask-squircle" alt="_profile_img" />
                {/* extra div for flex of comment text div and the three dots  */}
                <div className="flex items-center flex-shrink">
                  <div className={`px-4 py-2 bg-gray-100 rounded-3xl items-center`}>
                    <div className="flex justify-between space-x-4">
                      <Link to={`../../profile/${comment?.User?.id}`} className="text-secondary text-sm">
                        {`${comment?.User?.firstName} ${comment?.User?.lastName}`}
                      </Link>
                      <span className="text-gray-500 font-light text-xs" style={{ textDecoration: "none" }}>
                        {formatDistance(parseISO(comment?.createdAt), new Date(), [
                          {
                            includeSeconds: true,
                          },
                        ])}
                      </span>
                    </div>

                    <p className="text-gray-800 font-light" style={{ fontSize: "0.97rem" }}>
                      {comment?.postText}
                    </p>
                  </div>
                </div>
              </div>
            ) : null;
          })
        : null}
    </>
  );
};

CommentList.propTypes = {
  Comments: PropTypes.array,
  showAll: PropTypes.bool,
};

export default CommentList;
