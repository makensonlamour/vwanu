import React from "react";
import ViewDiscussion from "./../../components/Forum/ViewDiscussion";
// import { useGetDiscussion } from "../../features/forum/forumSlice";

const ForumList = () => {
  const data = {
    id: 2,
    coverPicture: "https://pbs.twimg.com/media/D70GvKCX4AEcbAt?format=jpg&name=4096x4096",
    name: "Mobile Application",
    description: "A mobile application also referred to as a mobile app or simply an app is a computer program",
    date: "2 years, 10 months ago",
    discussions: [
      {
        id: 1,
        profilePicture: "https://randomuser.me/api/portraits/men/22.jpg",
        title: "Mobile Application Management question",
        body: "It’s the best way to get started today.",
        lastReply: "Steve",
        date: "2 years, 10 months ago",
        memberCount: "2",
        replyCount: "2",
      },
      {
        id: 2,
        profilePicture: "https://randomuser.me/api/portraits/men/24.jpg",
        title: "How should I build my mobile application",
        body: "It’s the best way to get started today.",
        lastReply: "Steve",
        date: "2 years, 10 months ago",
        memberCount: "2",
        replyCount: "1",
      },
      {
        id: 3,
        profilePicture: "https://randomuser.me/api/portraits/women/88.jpg",
        title: "Mobile Application Idea",
        body: "It’s the best way to get started today.",
        lastReply: "Maverick",
        date: "2 years, 10 months ago",
        memberCount: "4",
        replyCount: "3",
      },
    ],
  };
  return (
    <>
      <div className="w-full">
        <div className="w-full bg-cover bg-center h-64 lg:h-80" style={{ backgroundImage: `url(${data?.coverPicture})` }}>
          <div className="bg-black/[.3] h-64 lg:h-80 flex">
            <div className="text-white self-end mb-10 ml-6">
              <p className="pl-4 lg:pl-16 text-2xl lg:text-5xl text-left pb-6 font-semibold text-white align-text-bottom">{data?.name}</p>
            </div>
          </div>
        </div>
        <div className="my-5 mx-2 lg:mx-32">
          <ViewDiscussion data={data?.discussions} type="forum" />
        </div>
      </div>
    </>
  );
};

export default ForumList;
