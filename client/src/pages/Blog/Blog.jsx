import React from "react";
import { Link } from "react-router-dom";
import SingleBlog from "../../components/Blog/SingleBlog";
import { useGetBlogList } from "../../features/blog/blogSlice";

const Blog = () => {
  const { data: blogList } = useGetBlogList(["blog", "all"], true);
  return (
    <div className="mt-6">
      <div className="flex justify-between">
        <h4 className="text-2xl font-semibold">Blog</h4>
        <Link to={"./add"} className="px-4 py-2 border border-gray-300  hover:bg-white rounded-xl bg-placeholder-color hover:text-black">
          Create New Article
        </Link>
      </div>
      <div className="flex mt-10">
        <div className="basis-4/6">
          {blogList?.data?.length > 0 ? (
            blogList?.data?.map((blog) => {
              return <SingleBlog key={blog?.id} blog={blog} />;
            })
          ) : (
            <div className="">No blog to show</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
