import React from "react";
import ForumReply from "./../../components/Forum/ForumReply";

const ViewForum = () => {
  const data = {
    id: 1,
    category: "Mobile Application",
    profilePicture: "https://randomuser.me/api/portraits/men/22.jpg",
    title: "Mobile Application Management question",
    body: "o I’m testing out with some of my team the ability to bring some of our rogue devices into BYOD with Intune MAM. Long story short I enrolled a device and then changed the management of the Outlook app to the new intune profile. I use gmail and O365 mail in my Outlook app. When I “retired” the device in Intune it completely removed the Outlook app. Not a huge deal, but it would certainly be a better user experience if the app was instead reconfigured and the O365 mailbox removed. Am I doing somethig wrong or is this the expected behavior?",
    lastReply: "Steve",
    date: "2 years, 10 months ago",
    postedDate: "October 10, 2019 at 4:34 am",
    memberCount: "2",
    replyCount: "2",
  };
  return (
    <>
      <div className="my-16">
        <div className="flex justify-between">
          <div className="bg-white border border-gray-200 rounded-xl basis-[75%] mr-10">
            <div className="flex justify-between p-6">
              <button className="text-sm bg-white px-6 py-2 border border-gray-200 rounded-lg hover:text-white hover:bg-primary">
                {data?.category}
              </button>
              <div className="flex justify-end items-center">
                <p className="mr-2">close</p>
                <p className="">more actions</p>
              </div>
            </div>
            <p className="px-6 text-lg font-semibold">{data?.title}</p>
            <p className="text-sm text-gray-500 py-2">
              <span className="px-6">{"Posted by " + data?.lastReply}</span>
              <span className="">{"on " + data?.postedDate}</span>
            </p>
            <p className="px-6 py-4">{data?.body}</p>
            <p className="pb-4 px-6 text-sm text-gray-500">
              <span className="">{data?.lastReply + " replied " + data?.date}</span>
              <span className="ml-2">{" " + data?.memberCount + " Members"}</span> ·
              <span className="">{" " + data?.replyCount + " Replies"}</span>
            </p>
            <div className="w-full h-[1px] bg-gray-300"></div>
            <p className="font-semibold py-6 px-4">{data?.replyCount + " Replies"}</p>
            <div className="w-full h-[1px] bg-gray-200"></div>
            <div className="">
              <ForumReply />
            </div>
          </div>

          <div className="flex flex-wrap basis-[25%] justify-end h-10">
            <div className="basis-full mb-2 mx-auto">
              <button className="text-white bg-primary px-8 py-2 border border-gray-200 rounded-lg mr-2 w-48">Reply</button>
            </div>
            <div className="basis-full mb-2">
              <button className="bg-white px-8 py-2 border border-gray-200 rounded-lg mr-2 w-48 hover:text-white hover:bg-primary">
                Subscribe
              </button>
            </div>
            <div className="basis-full">
              <button className="bg-white px-8 py-2 border border-gray-200 rounded-lg mr-2 w-48 hover:text-white hover:bg-primary">
                Favorite
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewForum;
