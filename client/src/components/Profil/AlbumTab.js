import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Tab } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import { useNavigate, useParams } from "react-router-dom";
import routesPath from "../../routesPath";
import AlbumList from "../../features/album/component/AlbumList";
import PhotoList from "../../features/album/component/PhotoList";

const AlbumTab = ({ user }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="">
        <div className="bg-white border border-gray-300 w-full rounded-lg p-4 my-2">
          <div className="flex justify-between items-center pb-4">
            <p className="font-bold text-3xl">{"Photos"}</p>
            {user?.id?.toString() === id?.toString() && (
              <button
                onClick={() => {
                  navigate("../.." + routesPath.PROFILE_EDIT);
                }}
                className="rounded-lg bg-placeholder-color hover:bg-primary hover:text-white py-2 px-6 font-semibold"
              >
                Add Photos
              </button>
            )}
          </div>
          <TabContext value={value}>
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
                        <div className="capitalize rounded-lg btn btn-sm border-0 px-4 bg-primary text-base-100">Photos</div>
                      ) : (
                        <div className="flex">Photos</div>
                      )}
                    </Fragment>
                  }
                  value="1"
                />
                <Tab
                  sx={{ textTransform: "capitalize" }}
                  label={
                    <Fragment>
                      {value === "2" ? (
                        <div className="capitalize rounded-lg btn btn-sm border-0 px-4 bg-primary text-base-100">Album</div>
                      ) : (
                        <div className="flex">Albums</div>
                      )}
                    </Fragment>
                  }
                  value="2"
                />
              </TabList>
              <TabPanel value="1">
                <div className="mt-8">
                  <PhotoList user={user} />
                </div>
              </TabPanel>
              <TabPanel value="2">
                <div className="mt-8">
                  <AlbumList user={user} />
                </div>
              </TabPanel>
            </div>
          </TabContext>
        </div>
      </div>
    </>
  );
};

AlbumTab.propTypes = {
  user: PropTypes.object.isRequired,
};

export default AlbumTab;
