/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Tab } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import { useParams, useSearchParams } from "react-router-dom";
// import routesPath from "../../routesPath";
import AlbumList from "../../features/album/component/AlbumList";
import PhotoList from "../../features/album/component/PhotoList";
import toast, { Toaster } from "react-hot-toast";
import AddPhoto from "../../features/album/component/AddPhoto";
import { Field, Form, Submit } from "../../components/form";
import Loader from "../../components/common/Loader";
import { useCreateAlbum } from "../../features/album/albumSlice";
import ViewAlbum from "../../features/album/component/ViewAlbum";

const ValidationSchema = Yup.object().shape({
  name: Yup.string().required().label("Album Name"),
});

const addSuccess = () =>
  toast.success("Profile updated successfully!", {
    position: "top-center",
  });

const addError = () =>
  toast.error("Sorry. Error on updating profile!", {
    position: "top-center",
  });

const AlbumTab = ({ user }) => {
  // const navigate = useNavigate();
  const { id } = useParams();

  const initialValues = {
    name: "",
  };

  const addAlbum = useCreateAlbum(["user", "albums"], undefined, undefined);

  const [openAddAlbum, setOpenAddAlbum] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [viewAlbum, setViewAlbum] = useState(false);
  const [album, setAlbum] = useState(null);
  const [albumId, setAlbumId] = useState("");
  const [value, setValue] = useState("1");
  const [searchParams] = useSearchParams();
  const urlTabs = searchParams.get("subTabs");
  let run = true;

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setViewAlbum(false);
    setAlbumId("");
  };

  const handleUrlChange = () => {
    if (urlTabs === "album" && run) {
      run = false;
      setValue("2");
    } else if (urlTabs === "photo" && run) {
      run = false;
      setValue("1");
    } else {
      run = false;
      setValue("1");
    }
  };

  const handleCreateAlbum = async (data) => {
    setIsLoading(true);
    try {
      console.log(data);
      await addAlbum.mutateAsync(data);
      addSuccess();
      data.name = "";
    } catch (e) {
      console.log(e);
      addError();
    } finally {
      setIsLoading(false);
      setOpenAddAlbum(false);
    }
  };

  useEffect(() => {
    if (urlTabs && run) {
      handleUrlChange();
    }
    if (!run) {
      return () => {
        // cancel the subscription
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlTabs]);

  return (
    <>
      <div className="">
        <div className="bg-white border border-gray-300 w-full rounded-lg p-4 my-2">
          <div className="flex justify-between items-center pb-4">
            <p className="font-bold text-lg md:text-3xl text-black">{value === "1" ? "Media" : "Albums"}</p>
            {user?.id?.toString() === id?.toString() &&
              (value === "1" ? (
                <AddPhoto user={user} />
              ) : (
                <button
                  onClick={() => {
                    setOpenAddAlbum(!openAddAlbum);
                  }}
                  className="rounded-lg bg-placeholder-color hover:bg-primary hover:text-white py-1 md:py-2 px-4 md:px-6 font-semibold"
                >
                  Add Album
                </button>
              ))}
          </div>
          <PhotoList user={user} />
          {/* <TabContext value={value}>
            <div className="">
              <TabList
                TabIndicatorProps={{ style: { background: "inherit" } }}
                sx={{ justifyContent: "start" }}
                orientation="horizontal"
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab
                  style={{ heigth: "150px" }}
                  sx={{ textTransform: "capitalize", textAlign: "left", heigth: "150px" }}
                  label={
                    <Fragment>
                      {value === "1" ? (
                        <div className="capitalize rounded-lg btn btn-sm border-0 px-4 bg-secondary text-base-100">Photos</div>
                      ) : (
                        <div className="flex text-primary">Photos</div>
                      )}
                    </Fragment>
                  }
                  value="1"
                />
                {/* <Tab
                  sx={{ textTransform: "capitalize" }}
                  label={
                    <Fragment>
                      {value === "2" ? (
                        <div className="capitalize rounded-lg btn btn-sm border-0 px-4 bg-secondary text-base-100">Albums</div>
                      ) : (
                        <div className="flex text-primary">Albums</div>
                      )}
                    </Fragment>
                  }
                  value="2"
                /> }
              </TabList>
              <TabPanel value="1">
                <div className="">
                  <PhotoList user={user} />
                </div>
              </TabPanel>
              <TabPanel value="2">
                <div className="">
                  {openAddAlbum && (
                    <div className="">
                      <Form
                        validationSchema={ValidationSchema}
                        initialValues={initialValues}
                        onSubmit={handleCreateAlbum}
                        className="w-full"
                      >
                        <h4 className="text-xl font-semibold text-primary">Create New Album</h4>
                        <Toaster />
                        <Field
                          autoCapitalize="none"
                          label="Name"
                          placeholder="Name"
                          name="name"
                          type="text"
                          className=" mr-1 mt-1 mb-4 lg:mt-2 border border-gray-200 placeholder:text-secondary font-semibold rounded-xl input-secondary invalid:text-red-500 autofill:text-secondary autofill:bg-placeholder-color"
                        />
                        <Submit
                          className="inline rounded-lg py-2 text-base-100 text-md w-fit px-6 mt-2"
                          title={isLoading ? <Loader /> : "Save"}
                        />{" "}
                      </Form>
                    </div>
                  )}
                  {viewAlbum ? (
                    <ViewAlbum albumId={albumId} user={user} album={album} />
                  ) : (
                    <AlbumList user={user} fn={setViewAlbum} setAlbumId={setAlbumId} setAlbum={setAlbum} />
                  )}
                </div>
              </TabPanel>
            </div>
          </TabContext> */}
        </div>
      </div>
    </>
  );
};

AlbumTab.propTypes = {
  user: PropTypes.object.isRequired,
};

export default AlbumTab;
