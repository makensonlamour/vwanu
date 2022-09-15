import React from "react";
import { Link } from "react-router-dom";
import SingleBlog from "../../components/Blog/SingleBlog";
import { useGetBlogList } from "../../features/blog/blogSlice";
import { FaBlog } from "react-icons/fa";
import EmptyComponent from "../../components/common/EmptyComponent";

const Blog = () => {
  const { data: blogList } = useGetBlogList(["blog", "all"], true);
  return (
    <div className="mt-6 mx-2">
      <div className="flex justify-between">
        <h4 className="text-2xl font-semibold">Blog</h4>
        <Link
          to={"./add"}
          className="px-4 py-1 md:py-2 border border-gray-300  hover:bg-white rounded-xl bg-placeholder-color hover:text-black"
        >
          Create New Article
        </Link>
      </div>
      <div className="flex mt-10">
        <div className="basis-[100%] lg:basis-4/6">
          {blogList?.data?.length > 0 ? (
            blogList?.data?.map((blog) => {
              return <SingleBlog key={blog?.id} blog={blog} />;
            })
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
      </div>
    </div>
  );
};

export default Blog;
