import React from "react";
import { useOutletContext } from "react-router-dom";
import PropTypes from "prop-types";
import { Tab } from "@mui/material";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import CardGroup from "./CardGroup";
import { useGetCommunitySuggest, useGetCommunityByNew, useGetCommunityPopular } from "../../features/community/communitySlice";

const GroupsPreview = () => {
  const [value, setValue] = React.useState("one");

  const user = useOutletContext();
  var randomItem =
    user !== undefined && user?.Interests !== null ? user?.Interests[Math.floor(Math.random() * user?.Interests?.length)] : undefined;

  const {
    data: communitySuggest,
    isLoading: loadingSuggest,
    isError: errorSuggest,
  } = useGetCommunitySuggest(["community", "suggest"], randomItem !== undefined ? true : false, randomItem?.name);
  const {
    data: communityPopular,
    isLoading: loadingPopular,
    isError: errorPopular,
  } = useGetCommunityPopular(["community", "popular"], true);
  const { data: communityNewest, isLoading: loadingNewest, isError: errorNewest } = useGetCommunityByNew(["community", "newest"], true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg p-2 my-8">
        <h2 className="my-2 px-2 text-md font-medium">Communities</h2>
        <TabContext value={value}>
          <div>
            <TabList
              sx={{ marginBottom: "0.1rem" }}
              value={value}
              onChange={handleChange}
              textColor="primary"
              indicatorColor="primary"
              aria-label="secondary tabs example"
            >
              <Tab sx={{ textTransform: "capitalize" }} value="one" label="Newest" />
              <Tab sx={{ textTransform: "capitalize" }} value="two" label="Popular" />
              <Tab sx={{ textTransform: "capitalize" }} value="three" label="Suggested" />
            </TabList>
          </div>
          <TabPanel sx={{ margin: "0px", padding: "0.25rem" }} value="one">
            <div>
              <CardGroup
                data={communityNewest ? communityNewest?.pages[0]?.data?.data : []}
                isError={errorNewest}
                isLoading={loadingNewest}
              />
            </div>
          </TabPanel>
          <TabPanel sx={{ margin: "0px", padding: "0.25rem" }} value="two">
            <div>
              <CardGroup
                data={communityPopular ? communityPopular?.pages[0]?.data?.data : []}
                isError={errorPopular}
                isLoading={loadingPopular}
              />
            </div>
          </TabPanel>
          <TabPanel sx={{ margin: "0px", padding: "0.25rem" }} value="three">
            <div>
              <CardGroup
                data={communitySuggest ? communitySuggest?.pages[0]?.data?.data : []}
                isError={errorSuggest}
                isLoading={loadingSuggest}
              />
            </div>
          </TabPanel>
        </TabContext>
      </div>
    </>
  );
};

GroupsPreview.propTypes = {
  data: PropTypes.array.isRequired,
  isError: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default GroupsPreview;
