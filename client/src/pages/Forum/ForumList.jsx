import React from "react";
import ViewDiscussion from "./../../components/Forum/ViewDiscussion";
import { useGetCategory, useGetListDiscussionByCategories } from "../../features/forum/forumSlice";
import { useParams } from "react-router-dom";
import Loader from "./../../components/common/Loader";

const ForumList = () => {
  const { categoryId } = useParams();
  const {
    data: categoryData,
    isLoading: loadingCategory,
    isError: categoryError,
  } = useGetCategory(["category", categoryId], categoryId !== undefined ? true : false, categoryId);
  const {
    data: discussionList,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useGetListDiscussionByCategories(["category", "discussion"], categoryId !== undefined ? true : false, categoryId);

  return (
    <>
      <div className="w-full">
        {loadingCategory ? (
          <div className="flex justify-center py-5">
            <Loader color="black" />
          </div>
        ) : categoryError ? (
          "Error"
        ) : (
          <div className="w-full bg-cover bg-center h-64 lg:h-80" style={{ backgroundImage: `url(${categoryData?.coverPicture})` }}>
            <div className="bg-black/[.3] h-64 lg:h-80 flex">
              <div className="text-white self-end mb-10 ml-6">
                <p className="pl-4 lg:pl-16 text-2xl lg:text-5xl text-left pb-6 font-semibold text-white align-text-bottom">
                  {categoryData?.name}
                </p>
                <p className="pl-4 lg:pl-16 text-md lg:text-xl text-left pb-6 font-semibold text-white align-text-bottom">
                  {categoryData?.description}
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="my-5 mx-2 lg:mx-32">
          {isLoading ? (
            <div className="flex justify-center py-5">
              <Loader color="black" />
            </div>
          ) : (
            <ViewDiscussion
              CategoryId={categoryId}
              data={discussionList}
              isLoading={isLoading}
              isError={isError}
              hasNextPage={hasNextPage}
              fetchNextPage={fetchNextPage}
              type="forum"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ForumList;
