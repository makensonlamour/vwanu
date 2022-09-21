import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ViewDiscussion from "./../../components/Forum/ViewDiscussion";
import { useGetListDiscussionCommunity, useGetDiscussion } from "../../features/forum/forumSlice";
import ViewSingleDiscussion from "./../Forum/ViewSingleDiscussion";
// import InputDiscussion from "../../components/Community/DiscussionTab/InputDiscussion";

const DiscussionTabs = () => {
  const [searchParams] = useSearchParams();
  const idDiscussion = searchParams.get("idD");
  const { id } = useParams();

  const { data: listDiscussion } = useGetListDiscussionCommunity(["community", "discussion", "all"], id !== "undefined" ? true : false, id);
  const { data: discussion } = useGetDiscussion(
    ["community", "discussion", idDiscussion],
    idDiscussion !== null ? true : false,
    idDiscussion
  );

  return (
    <>
      <div className="w-full">
        <div className="mb-5 mt-2 lg:my-5">
          {idDiscussion !== null ? (
            <div className="flex flex-col-reverse lg:flex-row lg:justify-between">
              {" "}
              <ViewSingleDiscussion type="community" data={discussion?.data} />
              {/* <div className="flex flex-nowrap lg:flex-wrap w-full lg:basis-[25%] justify-center lg:justify-end h-10"> */}
              {/* {!discussion?.data?.locked && (
                  <div className="lg:basis-full mb-2 lg:mx-auto">
                    {/* <button className="text-white bg-primary px-8 py-2 border border-gray-200 rounded-lg mr-2 w-48"> */}
              {/* <InputDiscussion labelBtn={"Reply"} communityId={id} data={discussion?.data} type="reply" /> */}
              {/* </button> }
                  </div>
                )} */}
              {/* <div className="lg:basis-full mb-2">
                  <button className="bg-white lg:px-8 px-4 lg:py-2 py-1 border border-gray-200 rounded-lg mr-2 lg:w-48 w-fit hover:text-white hover:bg-primary">
                    Subscribe
                  </button>
                </div>
                <div className="lg:basis-full">
                  <button className="bg-white lg:px-8 px-4 lg:py-2 py-1 border border-gray-200 rounded-lg mr-2 lg:w-48 w-fit hover:text-white hover:bg-primary">
                    Favorite
                  </button>
                </div> */}
              {/* </div> */}
            </div>
          ) : (
            <ViewDiscussion type="community" data={listDiscussion?.data || {}} />
          )}
        </div>
      </div>
    </>
  );
};

export default DiscussionTabs;
