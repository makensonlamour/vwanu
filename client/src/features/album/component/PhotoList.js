import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useGetPhotoList } from "../albumSlice";
import ViewPhoto from "./ViewPhoto";
import { ImSad } from "react-icons/im";
import EmptyComponent from "../../../components/common/EmptyComponent";
import Loader from "../../../components/common/Loader";
import InfiniteScroll from "../../../components/InfiniteScroll/InfiniteScroll";
import { useQueryClient } from "react-query";

const PhotoList = ({ user }) => {
  const queryClient = useQueryClient();
  const { data: photoList, isLoading, isError, hasNextPage, fetchNextPage } = useGetPhotoList(["user", "photos"], true, user?.id);
  function reloadPage() {
    queryClient.refetchQueries(["user", "photos"]);
  }
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center py-5">
          <Loader color="black" />
        </div>
      ) : isError ? (
        <div className="py-5 m-auto text-center px-2 lg:px-2">
          {"There was an error while fetching the data. "}
          <Link className="text-secondary hover:text-primary" to={""} onClick={() => queryClient.refetchQueries(["user", "photos"])}>
            Tap to retry
          </Link>
        </div>
      ) : photoList?.pages?.length > 0 && photoList?.pages[0]?.data?.total > 0 ? (
        <InfiniteScroll
          fetchMore={fetchNextPage}
          isError={isError}
          isLoading={isLoading}
          hasNext={hasNextPage}
          refetch={() => queryClient.invalidateQueries(["user", "photos"])}
          container={true}
          classNameContainer={"overflow-y-auto h-[60vh] w-full"}
          loader={
            <div className="flex justify-center py-5">
              <Loader color="black" />
            </div>
          }
          errorRender={
            <div className="my-5 py-10 m-auto text-center lg:pl-16 lg:pr-10 px-2 lg:px-0 bg-white rounded-lg shadow-md">
              {"There was an error while fetching the data. "}{" "}
              <Link className="text-secondary hover:text-primary" to={""} onClick={() => reloadPage(["user", "photos"])}>
                Tap to retry
              </Link>{" "}
            </div>
          }
        >
          {photoList?.pages?.map((page) => {
            return page?.data?.data?.map((photo) => {
              return (
                <div key={photo?.id} className="mx-auto w-full">
                  <div className="flex flex-wrap justify-start">
                    <Link
                      to={"#"}
                      key={photo?.id}
                      className="shadow-sm rounded-lg h-[120px] w-[120px] sm:w-[130px] sm:h-[130px] mx-3 sm:mx-3 mt-3 mb-3 hover:shadow-lg"
                    >
                      <ViewPhoto
                        photo={photo}
                        data={photo}
                        imgComponent={
                          <img
                            className="shadow-sm h-[120px] w-[120px] sm:h-[130px] sm:w-[130px] object-cover rounded-lg hover:shadow-lg hover:brightness-75"
                            src={photo?.original}
                            alt={"_img_" + photo?.id}
                          />
                        }
                      />
                    </Link>
                  </div>
                </div>
              );
            });
          })}
        </InfiniteScroll>
      ) : (
        <div className="flex justify-center w-full">
          <EmptyComponent
            border={false}
            icon={<ImSad size={"32px"} className="" />}
            placeholder={"Sorry, You don't have any pending request."}
            tips={""}
          />
        </div>
      )}
    </>
  );
};

PhotoList.propTypes = {
  user: PropTypes.object.isRequired,
};

export default PhotoList;
