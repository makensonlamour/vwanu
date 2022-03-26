import React from "react";
import PropTypes from "prop-types";
import { formatDistance, parseISO } from "date-fns";

import { FaThumbsUp, FaComment, FaShareAlt } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import MediaPost from "../../components/form/Post/MediaPost";

const PostList = ({ post }) => {
  /* Add outlet context to pass datapost to post list */
  //  const post = useOutletContext();

  return (
    <>
      {post ? (
        <>
          <div className="border pb-3 mb-5 mt-4 rounded-lg shadow-sm lg:w-full">
            <div className="pt-3 pb-1 px-3">
              <div className="flex flex-wrap">
                <img alt="" className="w-10 h-10 rounded-full" src="https://i.pravatar.cc/300" />{" "}
                <span className="ml-3 pt-3 text-md font-bold text-primary">{post?.user?.name}</span>
                <span className="ml-auto pt-3 text-xs text-gray-500">
                  {formatDistance(parseISO(post.createdAt), new Date(), [
                    {
                      includeSeconds: true,
                    },
                  ])}
                </span>
              </div>

              <p className="card-text pt-2 w-[100%] font-semibold">{post.postText}</p>
              {post.Media.length > 0 ? <MediaPost medias={post.Media} /> : null}
              <div className="flex flex-nowrap mt-5 pt-2 pb-3 border-b">
                <p className="text-sm text-secondary">
                  <FcLike size={20} className="inline text-secondary" /> <FaThumbsUp size={16} className="inline text-secondary mr-2" />
                  <span className=""> {post?.likes ? post.likes : 0 + " Likes"}</span>
                </p>
                <p className="ml-auto">
                  <span className="ml-auto pt-3 text-sm text-primary mr-3">{post?.comments ? post.comments : 0 + " Comments"}</span>
                  <span className="ml-auto pt-3 text-sm text-primary">{post?.shares ? post.shares : 0 + " shares"}</span>
                </p>
              </div>

              <div className="flex flex-wrap">
                <button className="mt-2 text-md font-semibold text-secondary hover:bg-gray-200 hover:rounded-lg px-2 py-2 lg:px-5 lg:py-2">
                  <FaThumbsUp size={20} className="inline text-secondary" /> Like
                </button>
                <button className="ml-auto mt-2 text-md font-semibold text-secondary hover:bg-gray-200 hover:rounded-lg p-2 lg:px-5 lg:py-2">
                  <FaComment size={20} className="inline text-secondary" />
                  {" Comment"}
                </button>
                <button className="ml-auto mt-2 text-md font-semibold text-secondary hover:bg-gray-200 hover:rounded-lg p-2 lg:px-5 lg:py-2">
                  <FaShareAlt size={20} className="inline text-secondary" />
                  {" Share"}
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

PostList.propTypes = { post: PropTypes.object };

export default PostList;
