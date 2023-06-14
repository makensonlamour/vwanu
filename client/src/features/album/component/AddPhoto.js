import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import InputPhoto from "../../post/components/InputPhoto";
import { useGetAlbumList, useAddPhoto } from "../albumSlice";
import { MdPhotoSizeSelectActual, MdVideoLibrary } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";

const AddPhoto = ({ user, type = "photo" }) => {
  const [showModal, setShowModal] = useState(false);
  const [media, setMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data: albums } = useGetAlbumList(["user", "albums"], true, user?.id);
  const [data, setData] = useState({ caption: "", selectAlbum: "", privacy: "" });

  const addPhoto = useAddPhoto(["me", "photo"], undefined, undefined, data?.selectAlbum);

  const handleData = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (!data?.selectAlbum) {
      alert("Select an album to continue");
      return;
    }
    setIsLoading(true);
    let formData = new FormData();
    if (media?.length) {
      media?.map((file) => {
        return formData.append("albumImage", file);
      });
    }
    formData.append("id", data?.selectAlbum);

    try {
      addPhoto.mutateAsync(formData);
      setShowModal(false);
      setMedia([]);
      setData({ caption: "", selectAlbum: "", privacy: "" });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = (itemToRemove) => {
    setMedia((files) => files.filter((f) => f.name !== itemToRemove.name));
  };

  return (
    <>
      <button
        onClick={() => {
          setShowModal(true);
        }}
        className="px-2 sm:px-4 py-2 text-xs sm:text-sm bg-placeholder-color text-gray-900 hover:bg-primary hover:text-white rounded-xl mr-2"
      >
        {type === "photo" ? " Add Media" : " Add Videos"}
      </button>
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-[90%] sm:w-[50%] shadow-lg rounded-md bg-white">
            <div className="flex justify-between border-b border-gray-300 pb-2 mb-2">
              <p className="text-xl font-semibold">{type === "photo" ? "Upload Photo" : "Upload Video"}</p>
              <button
                onClick={() => {
                  setMedia([]);
                  setShowModal(false);
                }}
                className="text-black text-xl font-semibold"
              >
                X
              </button>
            </div>
            <div className="py-2">
              <textarea
                placeholder={`Write something about your ${type === "photo" ? "photos" : "videos"}  to be shown on your timeline`}
                className="resize-none p-2 border border-gray-300 w-full rounded-lg focus:border-gray-300"
                name="caption"
                rows="4"
                onChange={(e) => handleData("caption", e.target.value)}
              ></textarea>
            </div>
            {type === "photo" ? (
              <div className="flex">
                <div className="w-full">
                  {media?.length === 0 ? (
                    <div className="flex items-center justify-center mt-2 bg-gray-300 m-1 w-full h-36 rounded-xl">
                      <InputPhoto
                        files={media}
                        label={
                          <Fragment>
                            <MdPhotoSizeSelectActual size={"28px"} className="text-center mx-auto" />
                            <p className="text-center text-md font-semibold">{"Add Photos"}</p>
                            <p className="text-center text-sm font-light">{"or Drag and drop"}</p>
                          </Fragment>
                        }
                        type={type}
                        fn={setMedia}
                        maxFiles={4}
                      />
                    </div>
                  ) : null}
                  {media?.length > 0 && (
                    <div className="flex flex-wrap mt-2 overflow-auto scrollbar h-36">
                      <>
                        {media?.length < 4 && (
                          <div className="flex items-center justify-center bg-gray-300 m-1 w-32 h-32 mask mask-squircle">
                            {" "}
                            <InputPhoto
                              files={media}
                              maxFiles={4 - media?.length}
                              label={
                                <Fragment>
                                  <MdPhotoSizeSelectActual size={"28px"} className="text-center mx-auto" />
                                  <p className="text-center text-md font-semibold">{"Add Photos"}</p>
                                  <p className="text-center text-sm font-light">{"or Drag and drop"}</p>
                                </Fragment>
                              }
                              type={type}
                              fn={setMedia}
                            />
                          </div>
                        )}
                        {media?.map((file) => {
                          return (
                            <div key={file?.preview} className="w-32 relative">
                              <img
                                src={file?.preview}
                                className="object-fit bg-gray-300 m-1 w-32 h-32 mask mask-squircle"
                                alt={file?.path}
                              />
                              <button
                                onClick={() => handleRemove(file)}
                                className="absolute top-0 right-0 bg-white m-1 p-1 rounded-full hover:bg-primary hover:text-white"
                              >
                                <AiOutlineDelete size={"24px"} className="" />
                              </button>
                            </div>
                          );
                        })}
                      </>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex">
                <div className="w-full">
                  {media?.length === 0 ? (
                    <div className="flex items-center justify-center mt-2 bg-gray-300 m-1 w-full h-36 rounded-xl">
                      <InputPhoto
                        label={
                          <Fragment>
                            <MdVideoLibrary size={"28px"} className="text-center mx-auto" />
                            <p className="text-center text-md font-semibold">{"Add Video"}</p>
                            <p className="text-center text-sm font-light">{"or Drag and drop"}</p>
                          </Fragment>
                        }
                        type={type}
                        fn={setMedia}
                        maxFiles={1}
                      />
                    </div>
                  ) : null}
                  {media?.length > 0 && (
                    <div className="flex flex-wrap mt-2 overflow-auto scrollbar h-36">
                      <>
                        {media?.length < 1 && (
                          <div className="flex items-center justify-center bg-gray-300 m-1 w-32 h-32 mask mask-squircle">
                            <InputPhoto
                              label={
                                <Fragment>
                                  <MdPhotoSizeSelectActual size={"28px"} className="text-center mx-auto" />
                                  <p className="text-center text-md font-semibold">{"Add Photos"}</p>
                                  <p className="text-center text-sm font-light">{"or Drag and drop"}</p>
                                </Fragment>
                              }
                              type={type}
                              fn={setMedia}
                            />
                          </div>
                        )}
                        {media?.map((file) => {
                          return (
                            <div key={file?.preview} className="w-32 relative">
                              <div>
                                <video className="object-fit bg-gray-300 m-1 w-32 h-32 mask mask-squircle" controls alt={file?.path}>
                                  <source alt={file?.path} src={file?.preview} type="video/mp4" />
                                  Your browser does not support the video tag.
                                </video>
                              </div>
                              <button
                                onClick={() => handleRemove(file)}
                                className="absolute top-0 right-0 bg-white m-1 p-1 rounded-full hover:bg-primary hover:text-white"
                              >
                                <AiOutlineDelete size={"24px"} className="" />
                              </button>
                            </div>
                          );
                        })}
                      </>
                    </div>
                  )}
                </div>
              </div>
            )}
            {media?.length !== 0 && (
              <div className="flex flex-col sm:flex-row justify-end">
                <select
                  required
                  onChange={(e) => handleData("selectAlbum", e.target.value)}
                  name="selectAlbum"
                  className="mb-5 mt-2 border w-full border-gray-300 mr-3 px-4 py-2 rounded-lg text-primary"
                >
                  <option>Select Album</option>
                  {albums &&
                    albums?.pages[0]?.data?.data?.map((album) => {
                      return (
                        <option key={album?.name} value={album?.id}>
                          {album?.name}
                        </option>
                      );
                    })}
                </select>
                {!isLoading && (
                  <button onClick={handleSubmit} className="bg-primary px-4 py-2 rounded-lg text-white hover:bg-secondary">
                    Upload
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

AddPhoto.propTypes = {
  user: PropTypes.object.isRequired,
  type: PropTypes.string,
};

export default AddPhoto;
