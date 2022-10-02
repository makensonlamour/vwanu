import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useGetAlbumList } from "../albumSlice";
import { format } from "date-fns";
import { ImSad } from "react-icons/im";
import EmptyComponent from "../../../components/common/EmptyComponent";
import Loader from "../../../components/common/Loader";
import InfiniteScroll from "../../../components/InfiniteScroll/InfiniteScroll";
import { useQueryClient } from "react-query";

const AlbumList = ({ user, fn, setAlbumId, setAlbum }) => {
  const queryClient = useQueryClient();
  const { data: albumList, isLoading, isError, hasNextPage, fetchNextPage } = useGetAlbumList(["user", "albums"], true, user?.id);
  function reloadPage() {
    queryClient.refetchQueries(["user", "albums"]);
  }
  return (
    <>
      <>
        {isLoading ? (
          <div className="flex justify-center py-5">
            <Loader color="black" />
          </div>
        ) : isError ? (
          <div className="py-5 m-auto text-center px-2 lg:px-2">
            {"There was an error while fetching the data. "}
            <Link className="text-secondary hover:text-primary" to={""} onClick={() => queryClient.refetchQueries(["user", "albums"])}>
              Tap to retry
            </Link>
          </div>
        ) : albumList?.pages?.length > 0 && albumList?.pages[0]?.data?.total > 0 ? (
          <InfiniteScroll
            fetchMore={fetchNextPage}
            isError={isError}
            isLoading={isLoading}
            hasNext={hasNextPage}
            refetch={() => queryClient.invalidateQueries(["user", "albums"])}
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
                <Link className="text-secondary hover:text-primary" to={""} onClick={() => reloadPage(["user", "albums"])}>
                  Tap to retry
                </Link>{" "}
              </div>
            }
          >
            {albumList?.pages?.map((page) => {
              return page?.data?.data?.map((album) => {
                return (
                  <div key={album?.id} className="mx-auto w-full">
                    <div className="flex flex-wrap justify-start">
                      <button
                        style={{ backgroundImage: `url('${album?.coverPicture}')` }}
                        onClick={() => {
                          fn(true);
                          setAlbumId(album?.id);
                          setAlbum(album);
                        }}
                        key={album?.id}
                        className="bottom-auto shadow-sm rounded-lg w-[160px] h-[160px] mx-1 mt-3 mb-3 hover:shadow-lg"
                      >
                        <div
                          className={`${
                            album?.coverPicture !== null ? "bg-black/[.3]" : "bg-black"
                          } relative shadow-sm rounded-lg w-[160px] h-[160px] hover:shadow-lg`}
                        >
                          <div className="absolute inset-x-0 bottom-0 p-2">
                            <div className=" ">
                              <span className="text-lg text-white font-semibold">{album?.name}</span>
                            </div>
                            <div className=" ">
                              <span className="text-sm text-white font-semibold">{format(new Date(album?.createdAt), "MMM dd, yyyy")}</span>
                            </div>
                          </div>
                        </div>
                      </button>
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
              placeholder={"Sorry, You don't have any albums."}
              tips={"Create an album by clicking on Add Album"}
            />
          </div>
        )}
      </>
    </>
  );
};

AlbumList.propTypes = {
  user: PropTypes.object.isRequired,
  fn: PropTypes.func,
  setAlbum: PropTypes.func,
  setAlbumId: PropTypes.func,
};

export default AlbumList;
