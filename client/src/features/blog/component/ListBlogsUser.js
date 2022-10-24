import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useGetMyBlogList, useDeleteBlog } from "..//blogSlice";
import { useQueryClient } from "react-query";
import { useOutletContext } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { MdPreview } from "react-icons/md";
import Loader from "../../../components/common/Loader";
import EmptyComponent from "../../../components/common/EmptyComponent";
import { FaBlog } from "react-icons/fa";
import InfiniteScroll from "./../../../components/InfiniteScroll/InfiniteScroll";
import { format } from "date-fns";

const blogSuccess = () =>
  toast.success("Blog deleted successfully!", {
    position: "top-center",
  });

const blogError = () =>
  toast.error("Sorry. Error on deleting Blog!", {
    position: "top-center",
  });

const ListBlogUser = ({ setEditData, textInput = "", editData }) => {
  const user = useOutletContext();
  const queryClient = useQueryClient();
  const {
    data: blogList,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useGetMyBlogList(["blog", user?.id], user?.id?.toString() !== "undefined" ? true : false, user?.id);

  const deleteBlog = useDeleteBlog(["blog", "delete"], undefined, undefined);

  function reloadPage(arrayQuery) {
    queryClient.refetchQueries(arrayQuery);
  }

  const handleDelete = async (blogId) => {
    try {
      const dataObj = { id: blogId };
      await deleteBlog.mutateAsync(dataObj);
      queryClient.invalidateQueries(["blog", user?.id]);
      blogSuccess();
      window.location.reload();
    } catch (e) {
      blogError();
      console.log(e);
    }
  };
  return (
    <>
      <Toaster />
      <div className="">
        {isLoading ? (
          <div className="flex justify-center py-5">
            <Loader color="black" />
          </div>
        ) : isError ? (
          <div className="my-5 py-10 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white rounded-lg shadow-md">
            {"There was an error while fetching the data. "}{" "}
            <Link className="text-secondary hover:text-primary" to={""} onClick={() => reloadPage(["interest", "all"])}>
              Tap to retry
            </Link>{" "}
          </div>
        ) : blogList?.pages?.length > 0 && blogList?.pages[0]?.data?.total > 0 ? (
          <InfiniteScroll
            fetchMore={fetchNextPage}
            isError={isError}
            hasNext={hasNextPage}
            container={true}
            classNameContainer={"overflow-y-auto scrollbar h-fit max-h-[85vh]"}
            refetch={() => queryClient.invalidateQueries(["blog", "all"])}
            loader={
              <div className="flex justify-center py-5">
                <Loader color="black" />
              </div>
            }
            errorRender={
              <div className="my-5 py-10 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white rounded-lg shadow-md">
                {"There was an error while fetching the data. "}{" "}
                <Link className="text-secondary hover:text-primary" to={""} onClick={() => reloadPage(["blog", "all"])}>
                  Tap to retry
                </Link>{" "}
              </div>
            }
          >
            {blogList?.pages?.map((page) => {
              return page?.data?.data?.map((blog) => {
                return (
                  <div
                    key={blog?.id}
                    onClick={() => {
                      if (textInput === null || textInput === "<p><br></p>") {
                        setEditData(blog);
                      } else {
                        // eslint-disable-next-line no-restricted-globals
                        if (confirm("Do you want to continue? You will lose all unsave works!") === true) {
                          setEditData(blog);
                        } else {
                          return;
                        }
                      }
                    }}
                    className={`${
                      editData?.id === blog?.id ? "bg-placeholder-color" : ""
                    } border-b border-gray-200 py-2 hover:bg-placeholder-color hover:px-2 hover:rounded-xl hover:border-none`}
                  >
                    <div className="flex justify-between">
                      <div className="flex justify-start w-fit w-max-[70%]">
                        <p
                          className={`${
                            blog?.publish ? "bg-green-500 w-fit mr-2" : "bg-secondary w-[80%] mr-2 text-center"
                          } text-xs px-2 py-1 rounded-md text-white`}
                        >
                          {blog?.publish ? "Published" : "Draft"}
                        </p>
                        <p className="font-semibold line-clamp-1 mr-1">{blog?.blogTitle}</p>
                      </div>
                      <div className="flex justify-end">
                        <div onClick={() => handleDelete(blog?.id)} className="hover:text-primary mr-1">
                          <AiOutlineDelete size={"24px"} className="" />
                        </div>
                        <div onClick={() => (window.location.href = "../../blogs/" + blog?.id)} className="hover:text-primary ml-1">
                          <MdPreview size={"24px"} className="" />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-start text-xs pt-1">
                      <p className="mr-1">
                        {blog?.amountOfComments > 1 ? blog?.amountOfComments + " comments • " : blog?.amountOfComments + " comment • "}
                      </p>
                      <p className="mr-1">
                        {blog?.amountOfLikes > 1 ? blog?.amountOfLikes + " likes • " : blog?.amountOfLikes + " like • "}
                      </p>
                      <p className="">
                        {" last edited: "}
                        {blog && format(new Date(blog?.updatedAt), "MMM dd, yyyy hh:mm aaaa")}
                      </p>
                    </div>
                  </div>
                );
              });
            })}
          </InfiniteScroll>
        ) : (
          <div className="flex justify-center w-full">
            <EmptyComponent
              icon={<FaBlog size={"32px"} className="" />}
              placeholder={"There's no blog published yet."}
              tips={"Here, Be the first one to create a blog by just click on the button Create New Article."}
            />
          </div>
        )}
      </div>
    </>
  );
};

ListBlogUser.propTypes = {
  setEditData: PropTypes.func,
  textInput: PropTypes.string,
  editData: PropTypes.object,
};

export default ListBlogUser;
