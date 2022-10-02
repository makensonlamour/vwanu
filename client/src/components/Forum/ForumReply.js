import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { IoMdShareAlt } from "react-icons/io";
import { useQueryClient } from "react-query";
import InfiniteScroll from "../../components/InfiniteScroll/InfiniteScroll";
import Loader from "../../components/common/Loader";
import EmptyComponent from "../common/EmptyComponent";
import { ImSad } from "react-icons/im";

const ForumReply = ({ data, isLoading, isError, hasNextPage, fetchNextPage }) => {
  const [over, setOver] = useState(false);
  const queryClient = useQueryClient();

  function reloadPage() {
    queryClient.refetchQueries(["community", "reply", data?.id]);
  }

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center py-5">
          <Loader color="black" />
        </div>
      ) : isError ? (
        <div className="py-5 m-auto text-center px-2">
          {"There was an error while fetching the data. "}{" "}
          <Link className="text-secondary hover:text-primary" to={""} onClick={() => reloadPage()}>
            Tap to retry
          </Link>{" "}
        </div>
      ) : data?.pages && data?.pages?.length > 0 && data?.pages[0]?.data?.total > 0 ? (
        <InfiniteScroll
          fetchMore={fetchNextPage}
          isError={isError}
          isLoading={isLoading}
          hasNext={hasNextPage}
          refetch={() => queryClient.invalidateQueries(["community", "reply", data?.id])}
          container={true}
          classNameContainer={"overflow-y-auto h-[46vh]"}
          loader={
            <div className="flex justify-center py-5">
              <Loader color="black" />
            </div>
          }
          errorRender={
            <div className="my-5 py-10 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white rounded-lg shadow-md">
              {"There was an error while fetching the data. "}{" "}
              <Link className="text-secondary hover:text-primary" to={""} onClick={() => reloadPage(["community", "reply", data?.id])}>
                Tap to retry
              </Link>{" "}
            </div>
          }
        >
          {data?.pages.map((page) => {
            return page?.data?.data?.map((item) => {
              return (
                <div
                  key={item?.id}
                  onMouseOver={() => setOver(true)}
                  onMouseOut={() => setOver(false)}
                  className="hover:bg-gray-100 px-4 py-4 border-t border-gray-200"
                >
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <div className="">
                        <img src={item?.User?.profilePicture} alt="_profile_picture" className="w-10 h-10 border mask mask-squircle" />
                      </div>
                      <div className="ml-2">
                        <p className="font-[400] align-middle text-md">{item?.User?.firstName + " " + item?.User?.lastName}</p>
                        <p className="text-sm">{item?.createdAt}</p>
                      </div>
                    </div>
                    {over && (
                      <div className="">
                        <button className="mr-2">
                          <IoMdShareAlt size={"24px"} className="inline" />
                        </button>
                        <button className="">
                          <BsThreeDots size={"24px"} className="inline" />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="py-2">
                    <p className="">{item?.body}</p>
                  </div>
                </div>
              );
            });
          })}
        </InfiniteScroll>
      ) : (
        <div className="flex justify-center">
          <EmptyComponent
            border={false}
            icon={<ImSad size={"32px"} className="" />}
            placeholder={"Sorry, There were no responses found."}
            tips={"You can be the first to responseto this discussion in this forum by clicking on the Reply button."}
          />
        </div>
      )}
      {/* <div
        onMouseOver={() => setOver(true)}
        onMouseOut={() => setOver(false)}
        className="hover:bg-gray-100 px-4 py-4 border-t border-gray-200"
      >
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="">
              <img src={data?.User?.profilePicture} alt="_profile_picture" className="w-12 h-12 border mask mask-squircle" />
            </div>
            <div className="ml-2">
              <p className="font-[400] align-middle text-lg">{data?.User?.firstName + " " + data?.User?.lastName}</p>
              <p className="">{data?.createdAt}</p>
            </div>
          </div>
          {over && (
            <div className="">
              <button className="mr-2">
                <IoMdShareAlt size={"24px"} className="inline" />
              </button>
              <button className="">
                <BsThreeDots size={"24px"} className="inline" />
              </button>
            </div>
          )}
        </div>
        <div className="py-2">
          <p className="">{data?.body}</p>
        </div>
      </div> */}
    </>
  );
};

ForumReply.propTypes = {
  data: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  hasNextPage: PropTypes.bool,
  fetchNextPage: PropTypes.func,
};

export default ForumReply;
