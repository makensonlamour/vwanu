import React from "react";
import PropTypes from "prop-types";
import { useGetAlbumList } from "../albumSlice";
import { format } from "date-fns";

const AlbumList = ({ user, fn, setAlbumId, setAlbum }) => {
  const { data: albums } = useGetAlbumList(["user", "albums"], true, user?.id);

  return (
    <>
      <>
        {albums?.data?.length > 0 ? (
          <div className="mx-auto w-full">
            <div className="flex flex-wrap justify-start">
              {albums?.data?.map((album) => {
                return (
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
                );
              })}
            </div>
          </div>
        ) : (
          <div className="mx-auto w-full">
            <p className="text-xl font-semibold text-center">No Albums</p>
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
