import React from "react";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import ViewCategory from "../../components/Forum/ViewCategory";
import { useGetListDiscussionCategory } from "../../features/forum/forumSlice";
import { useQueryClient } from "react-query";
import InfiniteScroll from "../../components/InfiniteScroll/InfiniteScroll";
import Loader from "../../components/common/Loader";
import EmptyComponent from "../../components/common/EmptyComponent";
import { ImSad } from "react-icons/im";

const Forum = () => {
  const queryClient = useQueryClient();
  function reloadPage() {
    queryClient.refetchQueries(["category", "discussion"]);
  }
  const {
    data: categoryList,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useGetListDiscussionCategory(["category", "discussion"], true);

  return (
    <>
      <div className="w-full">
        <div className="w-full bg-gradient-to-tr from-g-one/[0.78] to-g-two/[0.78]">
          <div className="text-white py-20">
            <p className="text-3xl text-center pb-6">Discussions</p>
            <div className="flex justify-center">
              <p className="mb-2 text-center pb-6 text-lg w-full lg:w-[30%] font-light">
                Find answers, ask questions, and connect with our community around the world.
              </p>
            </div>
            <div className="flex justify-center">
              <label className="relative text-white focus-within:text-white block">
                <BsSearch size={"24px"} className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3" />
                <input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Search..."
                  className="form-input w-full lg:w-[40rem] h-14 border-[0.20px] appearance-none bg-white/[.20] border-white pl-12 text-white placeholder:text-white placeholder:font-light focus:outline-none rounded-lg"
                />
              </label>
            </div>
          </div>
        </div>
        <div className="py-5">
          {isLoading ? (
            <div className="flex justify-center py-5">
              <Loader color="black" />
            </div>
          ) : isError ? (
            <div className="my-5 py-10 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white rounded-lg shadow-md">
              {"There was an error while fetching the data. "}{" "}
              <Link className="text-secondary hover:text-primary" to={""} onClick={() => reloadPage(["category", "discussion"])}>
                Tap to retry
              </Link>{" "}
            </div>
          ) : categoryList && categoryList?.pages && categoryList?.pages[0]?.data?.total > 0 ? (
            <InfiniteScroll
              fetchMore={fetchNextPage}
              isError={isError}
              isLoading={isLoading}
              hasNext={hasNextPage}
              refetch={() => queryClient.invalidateQueries(["category", "discussion"])}
              container={false}
              classNameContainer={"overflow-y-auto h-[46vh]"}
              loader={
                <div className="flex justify-center py-5">
                  <Loader color="black" />
                </div>
              }
              errorRender={
                <div className="my-5 py-10 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white rounded-lg shadow-md">
                  {"There was an error while fetching the data. "}{" "}
                  <Link className="text-secondary hover:text-primary" to={""} onClick={() => reloadPage(["category", "discussion"])}>
                    Tap to retry
                  </Link>{" "}
                </div>
              }
            >
              <div className="flex justify-evenly flex-wrap px-4 lg:mx-36">
                {categoryList?.pages.map((page) => {
                  return page?.data?.data?.map((category) => {
                    return <ViewCategory key={category?.id} data={category || {}} />;
                  });
                })}
              </div>
            </InfiniteScroll>
          ) : (
            <div className="flex justify-center">
              <EmptyComponent
                border={false}
                icon={<ImSad size={"32px"} className="" />}
                placeholder={"Sorry, There's no category of discussion yet."}
                tips={""}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Forum;
