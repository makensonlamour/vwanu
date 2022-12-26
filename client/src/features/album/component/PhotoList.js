import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useGetPhotoList } from "../albumSlice";
import { ImSad } from "react-icons/im";
import EmptyComponent from "../../../components/common/EmptyComponent";
import Loader from "../../../components/common/Loader";
import InfiniteScroll from "../../../components/InfiniteScroll/InfiniteScroll";
import { useQueryClient } from "react-query";
// import ReactPlayer from "react-player";
// import ResponsivePlayer from "../../../components/common/ResponsivePlayer";
import ViewerMedia from "./ViewerMedia";
import { BsPlayCircle } from "react-icons/bs";

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
          <div className="mx-auto w-full">
            <div className="flex flex-wrap justify-start">
              {photoList?.pages?.map((page) => {
                return page?.data?.data?.map((photo, idx) => {
                  return (
                    <Link
                      to={"#"}
                      key={photo?.id}
                      style={{
                        backgroundImage: `url('${photo?.original?.replace("mp4", "jpg")}')`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPositionX: "center",
                      }}
                      className="shadow-sm rounded-lg h-[120px] w-[120px] sm:w-[130px] sm:h-[130px] mx-3 sm:mx-3 mt-3 mb-3 hover:shadow-lg hover:brightness-75"
                    >
                      {photo?.original.endsWith(".mp4") ||
                      photo?.original.endsWith(".avi") ||
                      photo?.original.endsWith(".mov") ||
                      photo?.original.endsWith(".wmv") ||
                      photo?.original.endsWith(".flv") ||
                      photo?.original.endsWith(".f4v") ||
                      photo?.original.endsWith(".swf") ||
                      photo?.original.endsWith(".mkv") ||
                      photo?.original.endsWith(".webm") ||
                      photo?.original.endsWith(".html5") ||
                      photo?.original.endsWith(".mpeg-2") ||
                      photo?.original.endsWith(".avchd") ||
                      photo?.original.endsWith(".ogv") ||
                      photo?.original.endsWith(".m3u8") ||
                      photo?.original.endsWith(".mpd") ||
                      photo?.original.endsWith(".m4v") ? (
                        <ViewerMedia
                          type={"video"}
                          idx={idx}
                          photo={photo}
                          dataPhoto={page?.data?.data}
                          imgComponent={
                            <div className="relative top-7 left-7 opacity-75">
                              <BsPlayCircle size={"72px"} className="text-secondary text-center align-middle" />
                            </div>
                          }
                        />
                      ) : (
                        <ViewerMedia
                          photo={photo}
                          dataPhoto={page?.data?.data}
                          type="photo"
                          idx={idx}
                          imgComponent={
                            <img
                              className="shadow-sm border border-gray-300 h-[130px] w-[130px] object-cover rounded-lg hover:shadow-lg hover:brightness-75"
                              src={photo?.original}
                              alt={"_img_" + photo?.id}
                            />
                          }
                        />
                      )}
                    </Link>
                  );
                });
              })}
            </div>
          </div>
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

/* <ReactPlayer
                                className={
                                  "bg-black border border-gray-300 h-full flex-wrap inline object-scale-down max-h-[350px] object-center w-full"
                                }
                                url={photo?.original}
                                muted={false}
                                pip={true}
                                volume={1}
                                light={photo?.original?.replace("mp4", "jpg")}
                              />
                            </div> */
