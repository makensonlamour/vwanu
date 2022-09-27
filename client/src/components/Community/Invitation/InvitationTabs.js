import React from "react";
import { useGetMyCommunityInvitation } from "../../../features/community/communitySlice";
import { useOutletContext, Link } from "react-router-dom";
import ViewInvitation from "./ViewInvitation";
import EmptyComponent from "../../common/EmptyComponent";
import { FaUsersSlash } from "react-icons/fa";
import InfiniteScroll from "../../InfiniteScroll/InfiniteScroll";
import Loader from "../../common/Loader";
import { useQueryClient } from "react-query";

const InvitationTabs = () => {
  const user = useOutletContext();
  const {
    data: listInvitation,
    isError,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useGetMyCommunityInvitation(["community", "invitation", "all"], user?.id !== undefined ? true : false, user?.id);

  const queryClient = useQueryClient();
  let content;
  function reloadPage() {
    // window.location.reload();
    queryClient.refetchQueries(["community", "invitation", "all"]);
  }
  if (isLoading) {
    content = (
      <div className="flex justify-center py-5">
        <Loader color="black" />
      </div>
    );
  } else if (listInvitation?.pages?.length > 0 && listInvitation?.pages[0]?.data?.total > 0) {
    content = (
      <>
        <InfiniteScroll
          fetchMore={fetchNextPage}
          isError={isError}
          hasNext={hasNextPage}
          container={true}
          classNameContainer={"overflow-y-auto h-[60vh]"}
          refetch={() => queryClient.invalidateQueries(["community", "invitation", "all"])}
          loader={
            <div className="flex justify-center py-5">
              <Loader color="black" />
            </div>
          }
          errorRender={
            <div className="my-5 py-10 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white rounded-lg shadow-md">
              {"There was an error while fetching the data. "}{" "}
              <Link className="text-secondary hover:text-primary" to={""} onClick={() => reloadPage(["community", "invitation", "all"])}>
                Tap to retry
              </Link>{" "}
            </div>
          }
        >
          <div className="flex flex-wrap lg:justify-start py-2 w-full">
            {listInvitation?.pages?.map((page) => {
              return page?.data?.data?.map((member) => {
                return <ViewInvitation key={member?.id} member={member} />;
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
          icon={<FaUsersSlash size={"32px"} className="" />}
          placeholder={"You don't have any community invitations yet."}
          tips={"Here, you can see all the invitations that someone sent you to join a community!"}
        />
      </div>
    );
  }

  return (
    <>
      <div className="w-full">
        <div className="w-full">
          {content}
          {/* {listInvitation?.data?.length > 0 ? (
            listInvitation?.data?.map((member) => {
              return <ViewInvitation key={member?.id} member={member} />;
            })
          ) : (
            <div className="flex justify-center">
              <EmptyComponent
                icon={<FaUsersSlash size={"32px"} className="" />}
                placeholder={"You don't have any community invitations yet."}
                tips={"Here, you can see all the invitations that someone sent you to join a community!"}
              />
            </div>
          )} */}
        </div>
      </div>
    </>
  );
};

export default InvitationTabs;
