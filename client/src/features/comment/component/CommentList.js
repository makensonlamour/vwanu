import React from "react";
import PropTypes from "prop-types";
import { formatDistance, parseISO } from "date-fns";
import { Link } from "react-router-dom";

const CommentList = ({ Comments, showAll }) => {
  return (
    <>
      {Comments?.length > 0
        ? Comments?.map((comment, idx) => {
            return showAll ? (
              <>
                <div key={idx} className="flex items-start pl-5 pr-3 mt-3">
                  <img src={comment?.User?.profilePicture} className="h-10 w-10 mr-2 rounded-full" alt="_profile_img" />
                  {/* extra div for flex of comment text div and the three dots  */}
                  <div className="flex items-center flex-shrink">
                    <div className={`px-4 py-2 bg-gray-100 rounded-3xl items-center`}>
                      <div className="flex space-x-6">
                        <Link to={`profile/${comment?.User?.id}`} className="text-secondary">
                          {`${comment?.User?.firstName} ${comment?.User?.lastName}`}
                        </Link>
                        <span className="text-gray-500 font-light text-sm" style={{ textDecoration: "none" }}>
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
              <div key={idx} className="flex items-start pl-5 pr-3 mt-3">
                <img src={comment?.User?.profilePicture} className="h-10 w-10 mr-2 rounded-full" alt="_profile_img" />
                {/* extra div for flex of comment text div and the three dots  */}
                <div className="flex items-center flex-shrink">
                  <div className={`px-4 py-2 bg-gray-100 rounded-3xl items-center`}>
                    <div className="flex space-x-6">
                      <Link to={`profile/${comment?.User?.id}`} className="text-secondary">
                        {`${comment?.User?.firstName} ${comment?.User?.lastName}`}
                      </Link>
                      <span className="text-gray-500 font-light text-sm" style={{ textDecoration: "none" }}>
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
