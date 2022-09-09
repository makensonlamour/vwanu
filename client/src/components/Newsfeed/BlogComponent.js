import React from "react";
import cryptoRandomString from "crypto-random-string";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Stack, styled, Paper } from "@mui/material";

const BlogComponent = ({ data }) => {
  const Item = styled(Paper)(() => ({
    backgroundColor: "inherit",
  }));

  return (
    <>
      <div className="bg-white w-full 4xl:w-[70%] border border-gray-200 rounded-lg p-2 mb-8">
        <h2 className="my-3 px-6 text-xl font-medium">Blog</h2>
        {data?.length > 0 ? (
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
                    <div className="w-[6rem]">
                      <img
                        className="object-cover mask mask-squircle w-[5rem] h-16 rounded-lg"
                        src={blog?.coverPicture}
                        alt={blog?.blogTitle}
                      />
                    </div>
                    <div>
                      <p className=" text-sm line-clamp-2 max-w-[25ch] text-ellipsis whitespace-wrap overflow-hidden font-medium ml-2 pb-1">
                        <Link className="hover:text-secondary" to={`../../blogs/${blog?.id}`}>
                          {blog?.blogTitle}
                        </Link>
                      </p>
                      <p className=" text-gray-400 text-xs ml-2">{blog?.createdAt}</p>
                    </div>
                  </Item>
                );
              } else {
                return null;
              }
            })}
          </Stack>
        ) : (
          <div className="">
            <p className="">{"No Blog to show"}</p>
          </div>
        )}
      </div>
    </>
  );
};

BlogComponent.propTypes = {
  data: PropTypes.array.isRequired,
};

export default BlogComponent;
