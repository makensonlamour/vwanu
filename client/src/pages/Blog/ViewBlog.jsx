import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetBlog, useGetBlogList } from "../../features/blog/blogSlice";
import parse from "html-react-parser";
import { Chip, Stack } from "@mui/material";
import { GoComment } from "react-icons/go";
import SingleBlogRelated from "../../components/Blog/SingleBlogRelated";
import SingleResponse from "../../components/Blog/SingleResponse";
import { useCreateResponse, useGetAllResponse } from "../../features/blog/blogSlice";
import "./testcss.css";
import { useQueryClient } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import {
  EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
  EmailIcon,
  FacebookIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WhatsappIcon,
  WorkplaceIcon,
} from "react-share";

export const url = process.env.REACT_APP_API_URL || "http://localhost:4000";

const responseSuccess = () =>
  toast.success("Response submitted successfully!", {
    position: "top-center",
  });

const responseError = () =>
  toast.error("Sorry. Error on creating Response!", {
    position: "top-center",
  });

const ViewBlog = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [responseText, setResponseText] = useState("");
  const queryClient = useQueryClient();
  const { data: blog } = useGetBlog(["blog", id], id?.toString() !== "undefined" ? true : false, id);
  const { data: blogList } = useGetBlogList(["blog", "all"], true);
  const { data: listResponse } = useGetAllResponse(["blog", "response", "all"], id?.toString() !== "undefined" ? true : false, id);
  const createResponse = useCreateResponse(["blog", "response", "all"]);

  console.log(blog);

  const handleChange = (e) => {
    setResponseText(e.target.value);
  };

  const handleResponse = async () => {
    setIsLoading(true);

    try {
      const dataObj = {
        BlogId: id,
        responseText,
      };

      await createResponse.mutateAsync(dataObj);

      queryClient.invalidateQueries(["blog", "response", "all"]);
      setResponseText("");
      responseSuccess();
    } catch (e) {
      console.log(e);
      responseError();
    } finally {
      setIsLoading(false);
      setResponseText("");
    }
  };

  return (
    <>
      <Toaster />
      <div className="mb-10 md:max-w-[600px] md:mx-auto lg:max-w-[1450px]">
        <div className="w-full">
          {blog?.data?.coverPicture !== "undefined" && (
            <div className="w-full">
              <img src={blog?.data?.coverPicture} alt={"_coverPicture"} className="w-full object-cover h-64 lg:h-96" />
            </div>
          )}
          {blog?.data?.Interests?.length > 0 && (
            <div className="px-4 lg:px-28 mt-5 lg:mt-6">
              <Stack direction="row" spacing={1}>
                {blog?.data?.Interests?.length > 0 &&
                  blog?.data?.Interests?.map((interest) => {
                    return <Chip key={interest?.id} label={interest?.name} size="small" />;
                  })}
              </Stack>
            </div>
          )}
          <div className="mt-5 lg:mt-6 px-4 lg:px-28">
            <p className="text-md lg:text-2xl font-semibold">{blog?.data?.blogTitle}</p>
          </div>
          <div className="mt-6 lg:mt-10 px-4 lg:px-28">
            <div className="flex mt-7 mb-4 justify-between items-center">
              <Link to={"../../profile/" + blog?.data?.User?.id} className="flex items-center hover:text-primary">
                <img
                  className="w-[2rem] h-[2rem] lg:w-[3rem] lg:h-[3rem] mask mask-squircle"
                  src={blog?.data?.User?.profilePicture}
                  alt={"img_" + blog?.data?.User?.firstName}
                />
                <div className="ml-4">
                  <p className="font-semibold text-left text-md">{blog?.data?.User?.firstName + " " + blog?.data?.User?.lastName}</p>
                  <p className="text-gray-400 text-sm">{blog?.data?.createdAt}</p>
                </div>
              </Link>
              <div className="">
                <Link to={`#responses`} className="text-md px-4 py-2 hover:bg-gray-50 rounded-lg flex items-center align-middle">
                  <GoComment size={"18px"} className="mr-2 inline align-middle" />{" "}
                  {blog?.data?.amountOfComments <= 1
                    ? blog?.data?.amountOfComments + " Comment"
                    : blog?.data?.amountOfComments + " Comments"}
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-5 lg:mt-6 px-4 lg:px-28">
            <p className="">{parse(`${blog?.data?.blogText}`)}</p>
          </div>
          <div className="mt-6 lg:mt-8 px-4 lg:px-28 flex flex-wrap">
            <p className="py-2 mr-1">Share:</p>
            <EmailShareButton
              subject={`${blog?.data?.blogTitle}`}
              body={`${blog?.data?.blogText}`}
              className="m-1"
              quote={blog?.data?.blogTitle}
              url={`${url}/blogs/${blog?.data?.id}`}
            >
              <EmailIcon size={32} round={false} borderRadius={26} />
            </EmailShareButton>
            <FacebookShareButton
              className="m-1"
              quote={blog?.data?.blogTitle}
              hashtag={`#vwanu #haitian_social_media #blog #social #haiti`}
              url={`${url}/blogs/${blog?.data?.id}`}
            >
              <FacebookIcon bgStyle={{ fill: "#1778F2" }} size={32} round={false} borderRadius={26} />
            </FacebookShareButton>
            <TwitterShareButton
              className="m-1"
              title={blog?.data?.blogTitle}
              via={"Vwanu"}
              hashtags={["vwanu", "haitian_social_media", "blog", "social", "haiti"]}
              url={`${url}/blogs/${blog?.data?.id}`}
            >
              <TwitterIcon size={32} round={false} borderRadius={26} />
            </TwitterShareButton>
            <LinkedinShareButton
              className="m-1"
              title={blog?.data?.blogTitle}
              summary={blog?.data?.blogText}
              source={"Vwanu"}
              url={`${url}/blogs/${blog?.data?.id}`}
            >
              <LinkedinIcon size={32} round={false} borderRadius={26} />
            </LinkedinShareButton>
            <PinterestShareButton
              className="m-1"
              description={blog?.data?.blogTitle}
              media={blog?.data?.coverPicture}
              url={`${url}/blogs/${blog?.data?.id}`}
            >
              <PinterestIcon size={32} round={false} borderRadius={26} />
            </PinterestShareButton>
            <WhatsappShareButton className="m-1" title={blog?.data?.blogTitle} url={`${url}/blogs/${blog?.data?.id}`}>
              <WhatsappIcon size={32} round={false} borderRadius={26} />
            </WhatsappShareButton>
            <TelegramShareButton className="m-1" title={blog?.data?.blogTitle} url={`${url}/blogs/${blog?.data?.id}`}>
              <TelegramIcon size={32} round={false} borderRadius={26} />
            </TelegramShareButton>
            <LineShareButton className="m-1" title={blog?.data?.blogTitle} url={`${url}/blogs/${blog?.data?.id}`}>
              <LineIcon size={32} round={false} borderRadius={26} />
            </LineShareButton>
            <ViberShareButton className="m-1" title={blog?.data?.blogTitle} url={`${url}/blogs/${blog?.data?.id}`}>
              <ViberIcon size={32} round={false} borderRadius={26} />
            </ViberShareButton>
            <RedditShareButton className="m-1" title={blog?.data?.blogTitle} url={`${url}/blogs/${blog?.data?.id}`}>
              <RedditIcon size={32} round={false} borderRadius={26} />
            </RedditShareButton>
            <HatenaShareButton className="m-1" title={blog?.data?.blogTitle} url={`${url}/blogs/${blog?.data?.id}`}>
              <HatenaIcon size={32} round={false} borderRadius={26} />
            </HatenaShareButton>
            <InstapaperShareButton
              className="m-1"
              title={blog?.data?.blogTitle}
              description={blog?.data?.blogText}
              url={`${url}/blogs/${blog?.data?.id}`}
            >
              <InstapaperIcon size={32} round={false} borderRadius={26} />
            </InstapaperShareButton>
            <LivejournalShareButton
              className="m-1"
              title={blog?.data?.blogTitle}
              description={blog?.data?.blogText}
              url={`${url}/blogs/${blog?.data?.id}`}
            >
              <LivejournalIcon size={32} round={false} borderRadius={26} />
            </LivejournalShareButton>
            <MailruShareButton
              className="m-1"
              title={blog?.data?.blogTitle}
              description={blog?.data?.blogText}
              imageUrl={blog?.data?.coverPicture}
              url={`${url}/blogs/${blog?.data?.id}`}
            >
              <MailruIcon size={32} round={false} borderRadius={26} />
            </MailruShareButton>
            <OKShareButton
              className="m-1"
              title={blog?.data?.blogTitle}
              description={blog?.data?.blogText}
              image={blog?.data?.coverPicture}
              url={`${url}/blogs/${blog?.data?.id}`}
            >
              <OKIcon size={32} round={false} borderRadius={26} />
            </OKShareButton>
            <PocketShareButton className="m-1" title={blog?.data?.blogTitle} url={`${url}/blogs/${blog?.data?.id}`}>
              <PocketIcon size={32} round={false} borderRadius={26} />
            </PocketShareButton>
            <TumblrShareButton
              className="m-1"
              title={blog?.data?.blogTitle}
              caption={blog?.data?.blogText}
              tags={["vwanu", "haitian_social_media", " blog", "social", "haiti"]}
              url={`${url}/blogs/${blog?.data?.id}`}
            >
              <TumblrIcon size={32} round={false} borderRadius={26} />
            </TumblrShareButton>
            <VKShareButton
              className="m-1"
              title={blog?.data?.blogTitle}
              image={blog?.data?.coverPicture}
              url={`${url}/blogs/${blog?.data?.id}`}
            >
              <VKIcon size={32} round={false} borderRadius={26} />
            </VKShareButton>
            <WorkplaceShareButton
              className="m-1"
              quote={blog?.data?.blogTitle}
              hashtag={`#vwanu #haitian_social_media #blog #social #haiti`}
              url={`${url}/blogs/${blog?.data?.id}`}
            >
              <WorkplaceIcon size={32} round={false} borderRadius={26} />
            </WorkplaceShareButton>
          </div>
          <div className="mt-10 lg:px-28">
            <div className="border-b border-t border-gray-300">
              <Link to={"../../profile/" + blog?.data?.User?.id} className="px-4 py-2 lg:py-10 flex items-center">
                <img
                  src={blog?.data?.User?.profilePicture}
                  alt={"_img_" + blog?.data?.User?.firstName}
                  className="w-[2rem] h-[2rem] lg:w-[3rem] lg:h-[3rem] mask mask-squircle"
                />
                <p className="text-md lg:text-lg font-semibold ml-3 hover:text-primary">
                  {blog?.data?.User?.firstName + " " + blog?.data?.User?.lastName}
                </p>
              </Link>
            </div>
          </div>
          <div className="mt-4 lg:mt-5 px-4 lg:px-28">
            <div className="">
              <p className="text-lg lg:text-2xl font-semibold pb-5 lg:pb-10">Related Articles</p>
              <div className="flex justify-start lg:justify-between flex-wrap">
                {blogList?.data?.length > 0 &&
                  blogList?.data?.map((blog, idx) => {
                    if (idx < 2) {
                      return (
                        <div key={blog?.id} className="w-[100%] lg:w-[48%]">
                          {" "}
                          <SingleBlogRelated blog={blog} />
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
              </div>
            </div>
          </div>
          <div className="mt-6 lg:mt-10 lg:px-28">
            <div className="border-t border-gray-300 my-5">
              <p className="px-4 lg:px-0 text-lg lg:text-2xl font-semibold pt-3 lg:pt-0">
                {blog?.data?.amountOfComments < 1
                  ? blog?.data?.amountOfComments + " Response"
                  : blog?.data?.amountOfComments + " Responses"}
              </p>
              <div id="responses" className="bg-white border border-gray-300 rounded-xl m-2 p-4 mt-4 lg:mt-6 flex flex-col justify-end">
                <Link to={"../../profile/" + blog?.data?.User?.id} className="py-2 lg:py-4 flex items-center">
                  <img
                    src={blog?.data?.User?.profilePicture}
                    alt={"_img_" + blog?.data?.User?.firstName}
                    className="w-[2rem] h-[2rem] lg:w-[3rem] lg:h-[3rem] mask mask-squircle"
                  />
                  <p className="text-md font-[500] ml-3 hover:text-primary">
                    {blog?.data?.User?.firstName + " " + blog?.data?.User?.lastName}
                  </p>
                </Link>
                <textarea
                  className="w-full border border-gray-300 rounded-xl p-4 mt-3 h-28"
                  rows={"8"}
                  name="responseText"
                  onChange={handleChange}
                  placeholder="Write a response..."
                ></textarea>
                <button
                  onClick={() => {
                    handleResponse();
                  }}
                  className="ml-auto px-6 py-1 bg-primary text-white hover:bg-secondary rounded-xl mt-4"
                >
                  {isLoading ? "Loading..." : "Publish"}
                </button>
              </div>
              <div className="mx-2">
                <SingleResponse blogs={listResponse?.data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewBlog;
