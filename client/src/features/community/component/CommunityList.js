import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import cryptoRandomString from "crypto-random-string";
import CardCommunity from "../../../components/Profil/CommunityTab/CardCommunity";
import EmptyComponent from "../../../components/common/EmptyComponent";
import { TiGroup } from "react-icons/ti";
// import InfiniteScroll from "react-infinite-scroller"; //for infinite scrolling
// import { Facebook } from "react-content-loader";
import InfiniteScroll from "../../../components/InfiniteScroll/InfiniteScroll";
import Loader from "../../../components/common/Loader";
import { useQueryClient } from "react-query";
// import { format } from "date-fns";

const CommunityList = ({ communityList, isLoading, isError, hasNextPage, fetchNextPage }) => {
  const queryClient = useQueryClient();
  let content;
  function reloadPage(arrayQueryKey) {
    // window.location.reload();
    queryClient.refetchQueries(arrayQueryKey);
  }
  if (isLoading) {
    content = (
      <div className="flex justify-center py-5">
        <Loader color="black" />
      </div>
    );
  } else if (communityList?.pages?.length > 0 && communityList?.pages[0]?.data?.total > 0) {
    content = (
      <>
        <InfiniteScroll
          fetchMore={fetchNextPage}
          isError={isError}
          hasNext={hasNextPage}
          refetch={() => queryClient.invalidateQueries(["post", "home"])}
          loader={
            <div className="flex justify-center py-5">
              <Loader color="black" />
            </div>
          }
          errorRender={
            <div className="my-5 py-10 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white rounded-lg shadow-md">
              {"There was an error while fetching the data. "}{" "}
              <Link className="text-secondary hover:text-primary" to={""} onClick={() => reloadPage(["post", "home"])}>
                Tap to retry
              </Link>{" "}
            </div>
          }
        >
          <div className="flex flex-wrap lg:justify-start py-2 w-full">
            {communityList?.pages?.map((page) => {
              return page?.data?.data?.map((community) => {
                return (
                  <div key={community?.id} className="w-[100%] md:w-[45%] lg:w-[31%] m-2">
                    <CardCommunity data={community} />
                  </div>
                );
                // return <PostList key={cryptoRandomString({ length: 10 })} post={post} pageTitle={""} />;
              });
            })}
          </div>
        </InfiniteScroll>
      </>
    );
  } else if (isError) {
    content = (
      <div className="my-5 py-10 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white rounded-lg shadow-md">
        {"Failed to load post. "}{" "}
        <Link className="text-secondary hover:text-primary" to={""} onClick={() => reloadPage()}>
          Reload the page
        </Link>{" "}
      </div>
    );
  } else {
    content = (
      <div className="flex justify-center">
        <EmptyComponent
          icon={<TiGroup size={"32px"} className="" />}
          placeholder={"You don't have have any community yet."}
          tips={"To create a community, you can just click on the button Create Community on top of this community."}
        />
      </div>
      // <div className="py-4 my-4 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white shadow-lg rounded-lg">{"No posts "} </div>
    );
  }
  return (
    <>
      <div className="">{content}</div>
    </>
  );
};

CommunityList.propTypes = {
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  hasNextPage: PropTypes.bool,
  fetchNextPage: PropTypes.func,
  communityList: PropTypes.array.isRequired,
};

export default CommunityList;
