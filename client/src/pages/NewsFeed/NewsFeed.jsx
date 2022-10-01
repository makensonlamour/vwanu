/*eslint-disable */
import React, { useEffect, useState } from "react";
import cryptoRandomString from "crypto-random-string";
import { Link, useOutletContext } from "react-router-dom";
// import { Paper, styled } from "@mui/material";
// import InfiniteScroll from "react-infinite-scroller"; //for infinite scrolling
// import InfiniteScroll from "react-infinite-scroll-component";
import { Facebook } from "react-content-loader";
import { FiRefreshCcw } from "react-icons/fi";
import client from "../../features/feathers";
import InfiniteScroll from "../../components/InfiniteScroll/InfiniteScroll";
import { useQueryClient } from "react-query";
//Core components

import PostList from "../../features/post/PostList";
import { useGetTimelineList } from "../../features/post/postSlice";
import { useGetListFollowing } from "../../features/follower/followerSlice";
import { useGetBlogList } from "../../features/blog/blogSlice";
import { useGetOnline } from "../../features/user/userSlice";
import InputModal from "../../features/post/components/InputModal";
import BlogComponent from "../../components/Newsfeed/BlogComponent";
import FollowingPreview from "../../components/Newsfeed/FollowingPreview";
import RecentlyActive from "../../components/Newsfeed/RecentlyActive";
// import CompleteProfile from "../../components/Newsfeed/CompleteProfile";
import UpdatesComponent from "../../components/Newsfeed/UpdatesComponent";
import GroupsPreview from "../../components/Newsfeed/GroupsPreview";

const NewsFeed = () => {
  let run = false;
  const queryClient = useQueryClient();
  const user = useOutletContext();
  const [notificationList, setNotificationList] = useState([]);
  const { data: list, isLoading, fetchNextPage, hasNextPage, isError } = useGetTimelineList(["post", "home"]);
  const { data: listFollowing, isLoading: loadingFollowing, isError: errorFollowing } = useGetListFollowing(["user", "following"], true);
  const { data: blogList, isLoading: loadingBlog, isError: errorBlog } = useGetBlogList(["blog", "all"], true);
  const {
    data: listOnline,
    isLoading: loadingOnline,
    isError: onlineError,
    hasNextPage: hasNextPageOnline,
    fetchNextPage: fetchNextPageOnline,
  } = useGetOnline(["user", "online"]);

  const onCreatedListener = (notification) => {
    if (notification?.to?.toString() === user?.id?.toString() && notification?.UserId?.toString() !== user?.id?.toString()) {
      setNotificationList((notificationList) => [...notificationList, notification]);
    }
  };
  const notificationService = client.service("notification");

  const nots = async () => {
    if (!run) {
      run = true;
      const notifications = await notificationService.find({ query: { to: user?.id } });
      notifications?.data?.forEach(onCreatedListener);
      notificationService.on("created", onCreatedListener);
    }
  };
  useEffect(() => {
    if (!run) {
      nots();
    }

    if (run) {
      return () => {
        notificationService.removeListener("created", onCreatedListener);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function reloadPage(arrayQueryKey) {
    // window.location.reload();
    queryClient.refetchQueries(arrayQueryKey);
  }

  const recentlyActive = [
    { image: "https://picsum.photos/200/300?image=0" },
    { image: "https://picsum.photos/200/300?image=1" },
    { image: "https://picsum.photos/200/300?image=2" },
    { image: "https://picsum.photos/200/300?image=3" },
    { image: "https://picsum.photos/200/300?image=4" },
    { image: "https://picsum.photos/200/300?image=8" },
    { image: "https://picsum.photos/200/300?image=9" },
    { image: "https://picsum.photos/200/300?image=10" },
    { image: "https://picsum.photos/200/300?image=11" },
    { image: "https://picsum.photos/200/300?image=12" },
  ];

  const groups = [
    {
      name: "Mountain Riders",
      image: "https://picsum.photos/200/300?image=0",
      members: "20",
    },
    {
      name: "Graphic Design",
      image: "https://picsum.photos/200/300?image=1",
      members: "20",
    },
    {
      name: "Nature Lovers",
      image: "https://picsum.photos/200/300?image=2",
      members: "19",
    },
    {
      name: "Coffee Addicts",
      image: "https://picsum.photos/200/300?image=3",
      members: "19",
    },
    {
      name: "Architecture",
      image: "https://picsum.photos/200/300?image=4",
      members: "17",
    },
  ];

  // const percentage = 73;

  // const steps = [
  //   { title: "General Information", total: 6, complete: 5 },
  //   { title: "Work Experience", total: 3, complete: 1 },
  //   { title: "Profile Photo", total: 1, complete: 1 },
  //   { title: "Cover Photo", total: 1, complete: 1 },
  // ];

  let content;
  if (isLoading) {
    content = <Facebook foregroundColor="#fff" />;
  } else if (list?.pages?.length > 0 && list?.pages[0]?.data?.total > 0) {
    content = (
      <>
        <InfiniteScroll
          fetchMore={fetchNextPage}
          isError={isError}
          isLoading={isLoading}
          hasNext={hasNextPage}
          refetch={() => queryClient.invalidateQueries(["post", "home"])}
          loader={
            <div className="py-10">
              <Facebook foregroundColor="#000" />
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
          noDataRender={
            <div className="flex justify-center py-4 my-4 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white shadow-lg rounded-lg">
              <p>{"No more post. "}</p>
              <p className="font-semibold hover:text-primary cursor-pointer">{"Back to top ^"}</p>
            </div>
          }
        >
          {list?.pages.map((page) => {
            // totalItems = page?.length;
            return page?.data?.data?.map((post) => {
              return (
                <div key={cryptoRandomString({ length: 10 })}>
                  <PostList key={cryptoRandomString({ length: 10 })} post={post} pageTitle={""} />
                </div>
              );
            });
          })}
        </InfiniteScroll>

        <div className="w-full mt-6 mb-6 mx-auto text-center">
          <button className="" onClick={() => reloadPage(["post", "home"])}>
            <FiRefreshCcw className="h-7 mx-auto" />
          </button>
        </div>
      </>
    );
  } else if (isError) {
    content = (
      <div className="my-5 py-10 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white rounded-lg shadow-md">
        {"There was an error while fetching the data. "}{" "}
        <Link className="text-secondary hover:text-primary" to={""} onClick={() => reloadPage()}>
          Tap to retry
        </Link>{" "}
      </div>
    );
  } else {
    content = (
      <div className="py-4 my-4 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white shadow-lg rounded-lg">{"No posts "} </div>
    );
  }

  return (
    <>
      <div className="mx-auto mt-6 max-w-screen-3xl">
        <div className="flex justify-evenly">
          <div className="basis-[25%] hidden xl:block">
            <BlogComponent data={blogList?.pages[0]?.data?.data || []} isLoading={loadingBlog} isError={errorBlog} />
            <FollowingPreview isLoading={loadingFollowing} isError={errorFollowing} data={listFollowing || []} />
          </div>
          <div className="basis-full lg:basis-[56%] ">
            <div className="px-3">
              <h2 className="pb-5 text-lg font-bold">Activity Feed</h2>
              <InputModal reference="newsfeed" />
              <div className="w-full py-2">{content}</div>
            </div>
          </div>
          <div className="basis-[22%] hidden lg:block">
            <span className="block xl:hidden">
              <BlogComponent data={blogList?.pages[0]?.data?.data || []} isLoading={loadingBlog} isError={errorBlog} />
            </span>
            <span className="block xl:hidden">
              <FollowingPreview isLoading={loadingFollowing} isError={errorFollowing} data={listFollowing || []} />
            </span>

            {/* <CompleteProfile percentage={percentage} data={steps} /> */}
            <UpdatesComponent data={notificationList || []} />
            <RecentlyActive
              data={listOnline || []}
              isLoading={loadingOnline}
              isError={onlineError}
              hasNextPage={hasNextPageOnline}
              fetchNextPage={fetchNextPageOnline}
            />
            <GroupsPreview data={groups || []} />
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsFeed;
