import React from "react";
import cryptoRandomString from "crypto-random-string";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Stack, styled, Paper } from "@mui/material";
import { ImSad } from "react-icons/im";
import EmptyComponent from "../common/EmptyComponent";
import { useQueryClient } from "react-query";
import Loader from "../common/Loader";
import { format } from "date-fns";
import placeholderBlog from "../../assets/images/placeholderBlog.png";

const BlogComponent = ({ data, isError, isLoading }) => {
  const queryClient = useQueryClient();
  const Item = styled(Paper)(() => ({
    backgroundColor: "inherit",
  }));
  return (
    <div>
      <div className="bg-white w-full  border border-gray-200 rounded-lg p-2 mb-8">
        <h2 className="my-2 px-2 text-md font-medium">Blog</h2>
        {isLoading ? (
          <div className="flex justify-center py-5">
            <Loader color="black" />
          </div>
        ) : isError ? (
          <div className="py-5 m-auto text-center px-2 lg:px-2">
            {"There was an error while fetching the data. "}
            <Link className="text-secondary hover:text-primary" to={""} onClick={() => queryClient.refetchQueries(["blog", "all"])}>
              Tap to retry
            </Link>
          </div>
        ) : data?.length > 0 ? (
          <Stack spacing={1}>
            {data?.map((blog, idx) => {
              if (idx < 6) {
                return (
                  <Item
                    key={cryptoRandomString({ length: 10 })}
                    elevation={0}
                    style={{
                      paddingTop: "0.5rem",
                      paddingBottom: "0.5rem",
                      display: "flex",
                      paddingLeft: "1rem",
                      paddingRight: "1rem",
                    }}
                  >
                    {blog?.coverPicture !== null ? (
                      <div className="w-[6rem]">
                        <img
                          className="object-cover mask mask-squircle w-[5rem] h-16 rounded-lg"
                          src={blog?.coverPicture}
                          alt={blog?.blogTitle}
                        />
                      </div>
                    ) : (
                      <div className="w-[6rem]">
                        <img
                          className="object-cover mask mask-squircle w-[5rem] h-16 rounded-lg"
                          src={placeholderBlog}
                          alt={blog?.blogTitle}
                        />
                      </div>
                    )}
                    <div>
                      <p className=" text-sm line-clamp-2 max-w-[25ch] text-ellipsis whitespace-wrap overflow-hidden font-medium ml-2 pb-1">
                        <Link className="hover:text-secondary" to={`../../blogs/${blog?.id}`}>
                          {blog?.blogTitle}
                        </Link>
                      </p>
                      <p className=" text-gray-400 text-xs ml-2">{blog && format(new Date(blog?.createdAt), "MMM dd, yyyy hh:mm aaaa")}</p>
                    </div>
                  </Item>
                );
              } else {
                return null;
              }
            })}
            {data && data?.length > 6 ? (
              <Link className="hover:text-primary text-xs text-center font-semibold" to={"../../blogs"}>
                see more
              </Link>
            ) : null}
          </Stack>
        ) : (
          <div className="flex justify-center">
            <EmptyComponent
              border={false}
              icon={<ImSad size={"32px"} className="" />}
              placeholder={"Sorry, There's no blog."}
              tips={"Here, you can see all the latest blog published on Vwanu,LLC."}
            />
          </div>
        )}
      </div>
    </div>
  );
};

BlogComponent.propTypes = {
  data: PropTypes.array.isRequired,
  isError: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default BlogComponent;
