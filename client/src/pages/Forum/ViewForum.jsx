import React from "react";
import ViewSingleDiscussion from "../../components/Forum/ViewSingleDiscussion";
import { useParams } from "react-router-dom";
import { useGetDiscussion } from "../../features/forum/forumSlice";
// import InputDiscussion from "../../components/Community/DiscussionTab/InputDiscussion";

const ViewForum = () => {
  // const data = {
  //   id: 1,
  //   category: "Mobile Application",
  //   profilePicture: "https://randomuser.me/api/portraits/men/22.jpg",
  //   title: "Mobile Application Management question",
  //   body: "o I’m testing out with some of my team the ability to bring some of our rogue devices into BYOD with Intune MAM. Long story short I enrolled a device and then changed the management of the Outlook app to the new intune profile. I use gmail and O365 mail in my Outlook app. When I “retired” the device in Intune it completely removed the Outlook app. Not a huge deal, but it would certainly be a better user experience if the app was instead reconfigured and the O365 mailbox removed. Am I doing somethig wrong or is this the expected behavior?",
  //   lastReply: "Steve",
  //   date: "2 years, 10 months ago",
  //   postedDate: "October 10, 2019 at 4:34 am",
  //   memberCount: "2",
  //   replyCount: "2",
  // };
  const { id } = useParams();

  const { data: discussionData } = useGetDiscussion(["forum", id], id !== undefined ? true : false, id);

  return (
    <>
      <div className="my-5 lg:mx-32">
        <div className="flex flex-col-reverse  flex-wrap lg:justify-between">
          {/* components */}
          <ViewSingleDiscussion data={discussionData || {}} />

          {/* <div className="flex lg:basis-[25%] justify-end h-10">
            <div className="basis-full mb-2 mx-auto">
              <InputDiscussion labelBtn={"Reply"} communityId={id || ""} data={discussion?.data || {}} type="reply" />
            </div>
            <div className="basis-full mb-2">
              <button className="bg-white px-4 lg:px-8 py-1 lg:py-2 border border-gray-200 rounded-lg mr-2 w-fit lg:w-48 hover:text-white hover:bg-primary">
                Subscribe
              </button>
            </div>
            <div className="basis-full">
              <button className="bg-white px-4 lg:px-8 py-1 lg:py-2 border border-gray-200 rounded-lg mr-2 w-fit lg:w-48 hover:text-white hover:bg-primary">
                Favorite
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ViewForum;
