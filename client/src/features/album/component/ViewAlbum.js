import React from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { useGetAlbum } from "../albumSlice";
import ViewPhoto from "./ViewPhoto";
import AddPhoto from "./AddPhoto";
import { format } from "date-fns";

const ViewAlbum = ({ albumId, album, user }) => {
  const { id } = useParams();
  const { data: photos } = useGetAlbum(["me", "album", "photo"], true, { albumId });
  console.log(photos?.createdAt);
  return (
    <>
      <div className="">
        <div className="flex justify-center items-center">
          <h4 className="text-xl font-semibold mr-2">{photos?.data?.name}</h4>
          <button className="px-4 py-1 bg-primary text-white rounded-xl">edit</button>
        </div>
        <div className="flex justify-center py-3">
          <span className="text-sm">{format(new Date(album.createdAt), "MMM dd, yyyy")}</span>
          <span className="px-1">•</span>
          <span className="text-sm">{photos?.data?.Medias?.length + " Medias"}</span>
        </div>
        {user?.id?.toString() === id?.toString() && (
          <div className="flex flex-col md:flex-row justify-between items-center py-5">
            <div className="flex">
              <button className="px-2 sm:px-4 py-2 text-xs sm:text-sm bg-white border border-red-500 text-gray-900 rounded-xl mr-2">
                Delete Album
              </button>
              <AddPhoto user={user} />
              <button className="px-2 sm:px-4 py-2 text-xs sm:text-sm bg-placeholder-color text-gray-900 rounded-xl">Add Videos</button>
            </div>
            <select className="my-3 md:my-0 w-full md:w-1/5 px-2 sm:px-4 py-2 text-gray-900 border border-gray-300 rounded-xl">
              <option value="public">Public</option>
              <option value="network">My Network</option>
              <option value="me">Only Me</option>
            </select>
          </div>
        )}
        <div className="">
          {photos?.data?.Medias?.length > 0 ? (
            <div className="mx-auto w-full">
              <div className="flex flex-wrap justify-start">
                {photos?.data?.Medias?.map((photo) => {
                  return (
                    <Link to={"#"} key={photo?.id} className="shadow-sm rounded-lg w-[130px] h-[130px] mx-3 mt-3 mb-3 hover:shadow-lg">
                      <ViewPhoto
                        photo={photo}
                        imgComponent={
                          <img
                            className="shadow-sm h-[130px] w-[130px] object-cover rounded-lg hover:shadow-lg hover:brightness-75"
                            src={photo?.original}
                            alt={"_img_" + photo?.id}
                          />
                        }
                      />
                      {/*} <div className=" ">
                    <img
                      className="shadow-sm h-[130px] w-[130px] object-cover rounded-lg hover:shadow-lg hover:brightness-75"
                      src={photo?.original}
                      alt={"_img_" + photo?.id}
                    />
              </div> {*/}
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="mx-auto w-full">
              <p className="text-xl font-semibold text-center">No photos</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

ViewAlbum.propTypes = {
  albumId: PropTypes.string,
  album: PropTypes.object,
  user: PropTypes.object,
};

export default ViewAlbum;
