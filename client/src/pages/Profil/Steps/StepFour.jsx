/*eslint-disable*/
import React from "react";
import Step from "./Step";
import { Link } from "react-router-dom";
import { useGetSuggestMembers } from "../../../features/user/userSlice";
import useAuth from "../../../hooks/useAuth";
import FindFriend from "../../../features/user/Profile/FindFriend";
import { useQueryClient } from "react-query";
import Loader from "../../../components/common/Loader";
import InfiniteScroll from "../../../components/InfiniteScroll/InfiniteScroll";
import EmptyComponent from "../../../components/common/EmptyComponent";
import { ImSad } from "react-icons/im";

const StepFour = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  var randomItem =
    user !== undefined && user?.Interests !== null ? user?.Interests[Math.floor(Math.random() * user?.Interests?.length)] : undefined;

  const {
    data: listMember,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useGetSuggestMembers(["user", "suggest"], randomItem !== undefined ? true : false, randomItem?.name);

  return (
    <>
      <div>
        <Step step={4} className="step-primary" />
        <div className="w-full flex justify-center lg:w-[70%] lg:mx-auto pt-5 lg:pt-10">
          <div className="w-full mx-auto bg-white px-2 lg:px-5 pb-5 rounded-xl ">
            <div className="flex justify-center">
              <h1 className="py-4 text-center text-md lg:text-xl font-semibold text-black">Suggested people you may know</h1>
            </div>
            {isLoading ? (
              <div className="flex justify-center py-5">
                <Loader color="black" />
              </div>
            ) : isError ? (
              <div className="py-5 m-auto text-center px-2 lg:px-2">
                {"There was an error while fetching the data. "}
                <Link className="text-secondary hover:text-primary" to={""} onClick={() => queryClient.refetchQueries(["user", "suggest"])}>
                  Tap to retry
                </Link>
              </div>
            ) : listMember?.pages?.length > 0 && listMember?.pages[0]?.data?.total > 0 ? (
              <InfiniteScroll
                fetchMore={fetchNextPage}
                isError={isError}
                isLoading={isLoading}
                hasNext={hasNextPage}
                refetch={() => queryClient.refetchQueries(["user", "suggest"])}
                container={true}
                classNameContainer={"overflow-y-auto scrollbar h-fit max-h-[57vh] w-full"}
                loader={
                  <div className="flex justify-center py-5">
                    <Loader color="black" />
                  </div>
                }
                errorRender={
                  <div className="my-5 py-10 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white rounded-lg shadow-md">
                    {"There was an error while fetching the data. "}{" "}
                    <Link
                      className="text-secondary hover:text-primary"
                      to={""}
                      onClick={() => queryClient.refetchQueries(["user", "suggest"])}
                    >
                      Tap to retry
                    </Link>{" "}
                  </div>
                }
              >
                {listMember?.pages.map((page) => {
                  return page?.data?.data?.map((member) => {
                    return <FindFriend key={member?.key} data={member} />;
                  });
                })}
              </InfiniteScroll>
            ) : (
              <div className="flex justify-center">
                <EmptyComponent
                  border={false}
                  icon={<ImSad size={"32px"} className="" />}
                  placeholder={"Sorry, We don't have any user to suggest you."}
                  tips={"This may happen if you didn't select your list of interest."}
                />
              </div>
            )}
            <div className="flex justify-end">
              <button
                onClick={() => window.location.reload()}
                className="py-2 w-fit bg-primary px-10 rounded-xl text-base-100 mt-6 hover:bg-secondary"
              >
                Finish
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepFour;
