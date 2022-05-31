import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useGetAlbumList } from "../albumSlice";

const AlbumList = ({ user }) => {
  console.log(user);

  const { data: albums } = useGetAlbumList(["user", "albums"], true);

  console.log("albums", albums);

  return (
    <>
      <>
        {albums?.data?.length > 0 ? (
          <div className="mx-auto w-full">
            <div className="flex flex-wrap justify-start">
              {albums?.data?.map((album) => {
                return (
                  <Link
                    style={{ backgroundImage: `url('${album?.src}')` }}
                    to={"#"}
                    key={album?.id}
                    className="bottom-auto shadow-sm rounded-lg w-[170px] h-[170px] mx-3 mt-3 mb-3 hover:shadow-lg"
                  >
                    <div className="relative shadow-sm rounded-lg bg-black/[.3] w-[170px] h-[170px] hover:shadow-lg">
                      <div className="absolute inset-x-0 bottom-0 p-2">
                        <div className=" ">
                          <span className="text-lg text-white font-semibold">{album?.name}</span>
                        </div>
                        <div className=" ">
                          <span className="text-sm text-white font-semibold">{album?.createdAt}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
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
};

export default AlbumList;
