import React, { useEffect, useState } from "react";
import cryptoRandomString from "crypto-random-string";
import { Link, useOutletContext } from "react-router-dom";
// import { Paper, styled } from "@mui/material";
import InfiniteScroll from "react-infinite-scroller"; //for infinite scrolling
import { Facebook } from "react-content-loader";
import { FiRefreshCcw } from "react-icons/fi";
import client from "../../features/feathers";

//Core components

import PostList from "../../features/post/PostList";
import { useGetTimelineList } from "../../features/post/postSlice";
import { useGetListFollowing } from "../../features/follower/followerSlice";
import { useGetBlogList } from "../../features/blog/blogSlice";
import InputModal from "../../features/post/components/InputModal";
import BlogComponent from "../../components/Newsfeed/BlogComponent";
import FollowingPreview from "../../components/Newsfeed/FollowingPreview";
import RecentlyActive from "../../components/Newsfeed/RecentlyActive";
// import CompleteProfile from "../../components/Newsfeed/CompleteProfile";
import UpdatesComponent from "../../components/Newsfeed/UpdatesComponent";
import GroupsPreview from "../../components/Newsfeed/GroupsPreview";

const NewsFeed = () => {
  let run = false;
  const user = useOutletContext();
  const [notificationList, setNotificationList] = useState([]);
  const { data: list, isLoading, fetchNextPage, hasNextPage, isError } = useGetTimelineList(["post", "home"]);
  const { data: listFollowing } = useGetListFollowing(["user", "following"], true);
  const { data: blogList } = useGetBlogList(["blog", "all"], true);

  const onCreatedListener = (notification) => {
    if (notification.to.toString() === user.id.toString() && notification?.UserId?.toString() !== user.id.toString()) {
      setNotificationList((notificationList) => [...notificationList, notification]);
    }
  };
  const notificationService = client.service("notification");

  const nots = async () => {
    if (!run) {
      run = true;
      const notifications = await notificationService.find({ query: { to: user.id } });
      notifications.forEach(onCreatedListener);
      notificationService.on("created", onCreatedListener);
    }
  };

  useEffect(() => {
    if (!run) {
      nots();
    }

    if (run) {
      return () => {
        console.log("listenner remove");
        notificationService.removeListener("created", onCreatedListener);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function reloadPage() {
    window.location.reload();
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
  } else if (list?.pages?.length > 0) {
    content = (
      <>
        <InfiniteScroll
          /* next is the function for fetching data from backend when the user reaches the end */
          hasMore={hasNextPage}
          loadMore={fetchNextPage}
          loader={
            <div className="py-10">
              <Facebook foregroundColor="#000" />
            </div>
          }
          isReverse={true}
          pageStart={0}
        >
          {list?.pages.map((page) => {
            return page?.data?.map((post) => {
              return <PostList key={cryptoRandomString({ length: 10 })} post={post} pageTitle={""} />;
            });
          })}
        </InfiniteScroll>
        <div className="w-full mt-6 mb-6 mx-auto text-center">
          <button className="" onClick={() => reloadPage()}>
            <FiRefreshCcw className="h-7 mx-auto" />
          </button>
        </div>
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
      <div className="py-4 my-4 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white shadow-lg rounded-lg">{"No posts "} </div>
    );
  }

  return (
    <>
      <div className="mx-auto mt-6 max-w-screen-3xl">
        <div className="flex justify-evenly">
          <div className="basis-[25%] hidden xl:block">
            <BlogComponent data={blogList?.data || []} />
            <FollowingPreview data={listFollowing?.data || []} />
          </div>
          <div className="basis-full lg:basis-[56%] ">
            <div className="px-3">
              <h2 className="pb-5 text-2xl font-bold">Activity Feed</h2>
              <InputModal reference="newsfeed" />
              <div className="w-full py-2">{content}</div>
            </div>
          </div>
          <div className="basis-[22%] hidden lg:block">
            <span className="block xl:hidden">
              <BlogComponent data={blogList?.data || []} />
            </span>
            <span className="block xl:hidden">
              <FollowingPreview data={listFollowing?.data || []} />
            </span>

            {/* <CompleteProfile percentage={percentage} data={steps} /> */}
            <UpdatesComponent data={notificationList || []} />
            <RecentlyActive data={recentlyActive || []} />
            <GroupsPreview data={groups || []} />
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsFeed;
