import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useGetPhotoList } from "../albumSlice";
import ViewPhoto from "./ViewPhoto";

const PhotoList = ({ user }) => {
  const { data: photos } = useGetPhotoList(["user", "albums"], true, user?.id);

  return (
    <>
      {photos?.data?.length > 0 ? (
        <div className="mx-auto w-full">
          <div className="flex flex-wrap justify-start">
            {photos?.data?.map((photo) => {
              return (
                <Link
                  to={"#"}
                  key={photo?.id}
                  className="shadow-sm rounded-lg h-[120px] w-[120px] sm:w-[130px] sm:h-[130px] mx-3 sm:mx-3 mt-3 mb-3 hover:shadow-lg"
                >
                  <ViewPhoto
                    photo={photo}
                    imgComponent={
                      <img
                        className="shadow-sm h-[120px] w-[120px] sm:h-[130px] sm:w-[130px] object-cover rounded-lg hover:shadow-lg hover:brightness-75"
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
    </>
  );
};

PhotoList.propTypes = {
  user: PropTypes.object.isRequired,
};

export default PhotoList;
