import React, { useState } from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { useGetAlbum } from "../albumSlice";
import ViewPhoto from "./ViewPhoto";
import AddPhoto from "./AddPhoto";
import { format } from "date-fns";
import { Field, Form, Submit } from "../../../components/form";
import Loader from "../../../components/common/Loader";
import toast, { Toaster } from "react-hot-toast";
import { useUpdateAlbum } from "../albumSlice";

const ValidationSchema = Yup.object().shape({
  name: Yup.string().required().label("Album Name"),
});

const updateSuccess = () =>
  toast.success("Profile updated successfully!", {
    position: "top-center",
  });

const updateError = () =>
  toast.error("Sorry. Error on updating profile!", {
    position: "top-center",
  });

const ViewAlbum = ({ albumId, album, user }) => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { data: photos } = useGetAlbum(["me", "album", "photo"], true, { albumId });

  const updateName = useUpdateAlbum(["album", photos?.data?.id], undefined, undefined, photos?.data?.id);

  const initialValues = {
    name: photos?.data?.name || "",
  };

  const handleEdit = async (data) => {
    setIsLoading(true);
    try {
      await updateName.mutateAsync(data);
      updateSuccess();
    } catch (e) {
      console.log(e);
      updateError();
    } finally {
      setIsLoading(false);
      setIsEdit(false);
    }
  };

  return (
    <>
      <div className="">
        <div className="flex justify-center items-center">
          {isEdit ? (
            <div className="">
              <Form validationSchema={ValidationSchema} initialValues={initialValues} onSubmit={handleEdit} className="w-full">
                <h4 className="text-xl font-semibold">Edit Album {` "${photos?.data?.name}" `} name</h4>
                <Toaster />
                <Field
                  autoCapitalize="none"
                  label="Name"
                  placeholder="Name"
                  name="name"
                  type="text"
                  className=" mr-1 mt-1 mb-4 lg:mt-2 bg-placeholder-color text-secondary placeholder:text-secondary font-semibold rounded-2xl input-secondary border-none invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
                />
                <Submit className="inline rounded-2xl text-base-100 text-md w-2/5 mt-2" title={isLoading ? <Loader /> : "Save"} />{" "}
              </Form>
            </div>
          ) : (
            <>
              <h4 className="text-xl font-semibold mr-2">{photos?.data?.name}</h4>
              <button onClick={() => setIsEdit(true)} className="px-4 py-1 bg-primary text-white rounded-xl">
                edit
              </button>
            </>
          )}
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
