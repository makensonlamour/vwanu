import React, { useState } from "react";
import PropTypes from "prop-types";
import InputPhoto from "../../post/components/InputPhoto";
import { useGetAlbumList, useAddPhoto } from "../albumSlice";

const AddPhoto = ({ user }) => {
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

  return (
    <>
      <button
        onClick={() => {
          setShowModal(true);
        }}
        className="px-2 sm:px-4 py-2 text-xs sm:text-sm bg-placeholder-color text-gray-900 hover:bg-primary hover:text-white rounded-xl mr-2"
      >
        Add Photos
      </button>
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-[90%] sm:w-[50%] shadow-lg rounded-md bg-white">
            <div className="flex justify-between border-b border-gray-300 pb-2 mb-2">
              <p className="text-xl font-semibold">Upload Photo</p>
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
                placeholder="Write something about your photos to be shown on your timeline"
                className="resize-none p-2 border border-gray-300 w-full rounded-lg focus:border-gray-300"
                name="caption"
                rows="4"
                onChange={(e) => handleData("caption", e.target.value)}
              ></textarea>
            </div>
            <div className="mt-3 text-center">
              {media?.length === 0 ? (
                <div className="flex items-center justify-center mt-2 bg-gray-300 w-full h-36 rounded-xl">
                  <InputPhoto fn={setMedia} maxFiles={16} />
                </div>
              ) : null}
              {media?.length > 0 && (
                <div className="flex flex-wrap mt-2 overflow-auto scrollbar h-36">
                  <>
                    <div className="flex items-center justify-center bg-gray-300 m-1 w-32 h-32 mask mask-squircle">
                      {" "}
                      <InputPhoto fn={setMedia} maxFiles={16} />
                    </div>
                    {media?.map((file) => {
                      return (
                        <img
                          key={file?.name}
                          src={file?.preview}
                          className="object-cover bg-gray-300 m-1 w-32 h-32 mask mask-squircle"
                          alt={file?.path}
                        />
                      );
                    })}
                  </>
                </div>
              )}
            </div>
            {media?.length !== 0 && (
              <div className="flex flex-col sm:flex-row justify-end">
                <select
                  required
                  onChange={(e) => handleData("selectAlbum", e.target.value)}
                  name="selectAlbum"
                  className="mb-5 mt-2 border w-full border-gray-300 mr-3 px-4 py-2 rounded-lg text-primary"
                >
                  <option>Select Album</option>
                  {albums?.data?.map((album) => {
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
};

export default AddPhoto;
