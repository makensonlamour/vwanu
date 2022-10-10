/*eslint-disable*/
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useQueryClient } from "react-query";
import { Backdrop, Modal, Fade } from "@mui/material/";
// import SocialMediaShare from "../common/SocialMediaShare";
import { useGetListFriend } from "./../../features/friend/friendSlice";
import Loader from "./../common/Loader";
import CustomModal from "./../common/CustomModal";
import InfiniteScroll from "./../InfiniteScroll/InfiniteScroll";
import EmptyComponent from "./../common/EmptyComponent";
import { ImSad } from "react-icons/im";
import { useClipboard } from "@mantine/hooks";

export const url = process.env.REACT_APP_API_URL || "http://localhost:3000";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "#fff",
  padding: "10px",
  borderRadius: "15px",
};

// eslint-disable-next-line no-unused-vars
const Share = ({ post, label }) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const clipboard = useClipboard({ timeout: 1000 });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data: listFriend, isLoading, isError, hasNextPage, fetchNextPage } = useGetListFriend(["friends", "all"], undefined, undefined);
  // eslint-disable-next-line no-unused-vars
  const sharePrivate = async () => {};
  // eslint-disable-next-line no-unused-vars
  const sharePublic = async () => {};

  function reloadPage() {
    queryClient.refetchQueries(["friends", "all"]);
  }

  let content;
  if (isLoading) {
    content = (
      <div className="flex justify-center py-5">
        <Loader color="black" />
      </div>
    );
  } else if (isError) {
    content = (
      <div className="py-5 m-auto text-center px-2 lg:px-2">
        {"There was an error while fetching the data. "}
        <Link className="text-secondary hover:text-primary" to={""} onClick={() => queryClient.refetchQueries(["friends", "all"])}>
          Tap to retry
        </Link>
      </div>
    );
  } else if (listFriend && listFriend?.pages?.length > 0 && listFriend?.pages[0]?.data?.total > 0) {
    content = (
      <InfiniteScroll
        fetchMore={fetchNextPage}
        isError={isError}
        isLoading={isLoading}
        hasNext={hasNextPage}
        refetch={() => queryClient.invalidateQueries(["friends", "all"])}
        container={true}
        classNameContainer={"overflow-y-auto h-[60vh] w-full"}
        loader={
          <div className="flex justify-center py-5">
            <Loader color="black" />
          </div>
        }
        errorRender={
          <div className="my-5 py-10 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white rounded-lg shadow-md">
            {"There was an error while fetching the data. "}{" "}
            <Link className="text-secondary hover:text-primary" to={""} onClick={() => reloadPage(["friends", "all"])}>
              Tap to retry
            </Link>{" "}
          </div>
        }
      >
        {listFriend?.pages?.map((page) => {
          return page?.data?.data?.map((friend) => {
            return (
              <div key={friend?.id}>
                <p>{friend?.firstName}</p>
              </div>
            );
          });
        })}
      </InfiniteScroll>
    );
  } else {
    content = (
      <div className="!flex !justify-center">
        <EmptyComponent
          border={false}
          icon={<ImSad size={"32px"} className="" />}
          placeholder={"Sorry, You don't follow anyone."}
          tips={"Follow someone you may know or appreciate to everything about they."}
        />
      </div>
    );
  }

  return (
    <>
      <CustomModal
        modal={modal}
        setModal={setModal}
        content={
          <div>
            <div className="block border-primary">
              <div className="cursor-pointer border-b border-gray-200 p-2 hover:bg-gray-200 hover:rounded-lg">Share to Wall</div>
              <div
                onClick={() => setModal(!modal)}
                className="cursor-pointer border-b border-gray-200 p-2 hover:bg-gray-200 hover:rounded-lg"
              >
                Share in private
              </div>
              <div className="flex items-center p-2">
                <p>Copy link:</p>
                <div onClick={() => clipboard.copy(window.location.href)} className="bg-gray-200 p-1 rounded-lg w-[80%] cursor-pointer">
                  {clipboard.copied ? "link copied" : window.location.href}
                </div>
              </div>
            </div>
          </div>
        }
        closeIcon={"X"}
        title={""}
        trigger={
          <button
            onClick={() => setModal(!modal)}
            className="text-gray-700 normal-case font-[500] ml-auto mt-2 text-sm hover:text-primary hover:bg-gray-200 hover:rounded-lg p-2 lg:px-5 lg:py-2"
          >
            {label}
          </button>
        }
      />
      {/* <button
        onClick={handleOpen}
        className="text-gray-700 normal-case font-[500] ml-auto mt-2 text-sm hover:text-primary hover:bg-gray-200 hover:rounded-lg p-2 lg:px-5 lg:py-2"
      >
        {/* <RiShareForwardLine size={"24px"} className="inline text-white bg-g-one p-1 mask mask-squircle" /> }
        {label}
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div style={style}>
            <div className="block border-primary">
              <div
                
                className="cursor-pointer border-b border-gray-200 p-2 hover:bg-gray-200"
              >
                Share to Wall
              </div>
              <div
                onClick={() => setModal(!modal)}
                style={{
                  borderBottom: "0.5px solid #efefef",
                  cursor: "pointer",
                  padding: "5px",
                  "&:hover": { backgroundColor: "#efefef", color: "blue" },
                }}
                className="cursor-pointer"
              >
                Share in private
              </div>
              <div style={{ display: "flex" }} className="">
                <p>Copy link:</p>
                <p style={{ backgroundColor: "#efefef", paddingLeft: "5px", paddingRight: "5px" }}>{window.location.href}</p>
              </div> */}
      {/* List Friends */}
      {/* <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={modal}
                onClose={() => setModal(!modal)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={modal}>
                  <Box sx={style}>
                    <div className="block border-primary">{content}</div>
                  </Box>
                </Fade>
              </Modal> */}

      {/* <SocialMediaShare
                className={"m-1"}
                style={{ padding: "2px" }}
                title={post?.postText}
                quote={post?.postText}
                url={`${url}/post/${post?.id}`}
                image={""}
                hashtag={`#vwanu #haitian_social_media #post #social #haiti`}
                description={post?.postText}
                imageUrl={""}
                caption={post?.postText}
                media={""}
                summary={post?.postText}
                source={"Vwanu"}
                hashtags={["vwanu", "haitian_social_media", "post", "social", "haiti"]}
                subject={`${post?.postText}`}
                body={`${post?.postText}`}
                via={"Vwanu"}
                tags={["vwanu", "haitian_social_media", " blog", "social", "haiti"]}
              /> */}
      {/* </div>
          </div>
        </Fade>
      </Modal> */}
    </>
  );
};

Share.propTypes = {
  label: PropTypes.any,
  post: PropTypes.object,
};

export default Share;
