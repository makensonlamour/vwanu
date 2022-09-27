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

  const {
    data: listDiscussion,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useGetListDiscussionCommunity(["community", "discussion", "all"], id !== "undefined" ? true : false, id);
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
              <ViewSingleDiscussion type="community" data={discussion} />
            </div>
          ) : (
            <ViewDiscussion
              type="community"
              data={listDiscussion || []}
              isLoading={isLoading}
              isError={isError}
              hasNextPage={hasNextPage}
              fetchNextPage={fetchNextPage}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default DiscussionTabs;
