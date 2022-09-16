import React from "react";
import PropTypes from "prop-types";
import toast, { Toaster } from "react-hot-toast";
import { useGetMyBlogList, useDeleteBlog } from "..//blogSlice";
import { useQueryClient } from "react-query";
import { useOutletContext } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { MdPreview } from "react-icons/md";

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
  const { data: blogList } = useGetMyBlogList(["blog", user?.id], user?.id?.toString() !== "undefined" ? true : false, user?.id);

  const deleteBlog = useDeleteBlog(["blog", "delete"], undefined, undefined);

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
        {blogList?.data?.length > 0 ? (
          blogList?.data?.map((blog) => {
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
                  <p className="mr-1">{blog?.amountOfLikes > 1 ? blog?.amountOfLikes + " likes • " : blog?.amountOfLikes + " like • "}</p>
                  <p className="">{" last edited: " + blog?.updatedAt}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="">No Blog to show</p>
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
