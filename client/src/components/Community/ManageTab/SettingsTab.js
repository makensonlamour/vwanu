import React, { useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../../components/common/Loader";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { Form } from "../../../components/form";
import { useUpdateCommunity } from "../../../features/community/communitySlice";

//Functions for notification after actions
const updateSuccess = () => {
  toast.success("Profile updated successfully!", {
    position: "top-center",
  });
};

const updateError = () => {
  toast.error("Sorry. Error on updating profile!", {
    position: "top-center",
  });
};

const SettingsTab = ({ communityData }) => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const updateCommunity = useUpdateCommunity(["community", id], id, undefined, undefined);
  //data
  //A=administrator M=moderators E=members
  const [privacyType, setPrivacyType] = useState(communityData?.privacyType);
  const [canInvite, setCanInvite] = useState(communityData?.canInvite);
  const [canInPost, setCanInPost] = useState(communityData?.canInPost);
  const [groupMedia, setGroupMedia] = useState(communityData?.canInUploadPhotos);
  const [canMessageInGroup, setCanMessageInGroup] = useState(communityData?.canMessageInGroup);

  const handleSubmit = async () => {
    setIsLoading(true);
    const dataObj = {
      privacyType,
      canInvite,
      canInPost,
      canInUploadPhotos: groupMedia,
      canInUploadVideo: groupMedia,
      canMessageInGroup,
    };

    try {
      let result = await updateCommunity.mutateAsync(dataObj);
      updateSuccess();
      console.log(result);
      //   window.location.reload();
    } catch (e) {
      console.log(e);
      updateError();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white border border-gray-300 py-5 lg:py-10 px-2 md:px-10 rounded-xl w-full">
        <h4 className="md:text-left text-center mb-4 lg:mb-8 text-lg font-semibold">{`Settings`}</h4>
        <div className="py-2 lg:mx-0">
          <Form className="w-full px-2">
            <Toaster />

            {/*Privacy Options*/}
            <div className="mb-4">
              <p className="text-base lg:text-xl font-semibold">{"Privacy Options"}</p>
              <div className="w-full h-[1px] bg-gray-300 my-4"></div>
              <RadioGroup
                onChange={(e) => setPrivacyType(e.target.value)}
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={privacyType}
                name="privacyType"
              >
                <FormControlLabel value="public" control={<Radio />} label="This is a public group" />
                <ul className="list-disc text-sm lg:text-base mb-4 ml-12 pl-1">
                  <li>Any site member can join this group.</li>
                  <li>This group will be listed in the groups directory and in search results.</li>
                  <li>Group content and activity will be visible to any site member.</li>
                </ul>
                <FormControlLabel value="private" control={<Radio />} label="This is a private group" />
                <ul className="list-disc text-sm lg:text-base mb-4 ml-12 pl-1">
                  <li>Only people who request membership and are accepted can join the group.</li>
                  <li>This group will be listed in the groups directory and in search results.</li>
                  <li>Group content and activity will only be visible to members of the group.</li>
                </ul>
                <FormControlLabel value="hidden" control={<Radio />} label="This is a hidden group" />
                <ul className="list-disc text-sm lg:text-base mb-4 ml-12 pl-1">
                  <li>Only people who are invited can join the group.</li>
                  <li>This group will not be listed in the groups directory or search results.</li>
                  <li>This group will not be listed in the groups directory or search results.</li>
                </ul>
              </RadioGroup>
            </div>

            {/*Community Invitations*/}
            <div className="mb-10">
              <p className="text-base lg:text-xl font-semibold">{"Community Invitations"}</p>
              <div className="w-full h-[1px] bg-gray-300 my-4"></div>
              <RadioGroup
                onChange={(e) => setCanInvite(e.target.value)}
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={canInvite}
                name="canInvite"
              >
                <p className="lg:text-lg text-base py-2">Which members of this group are allowed to invite others?</p>
                <FormControlLabel value="E" control={<Radio />} label="All group members" />
                <FormControlLabel value="M" control={<Radio />} label="Organizers and Moderators only" />
                <FormControlLabel value="A" control={<Radio />} label="Organizers only" />
              </RadioGroup>
            </div>

            {/*Activity Feeds*/}
            <div className="mb-10">
              <p className="text-base lg:text-xl font-semibold">{"Activity Feeds"}</p>
              <div className="w-full h-[1px] bg-gray-300 my-4"></div>
              <RadioGroup
                onChange={(e) => setCanInPost(e.target.value)}
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={canInPost}
                name="canInPost"
              >
                <p className="lg:text-lg text-base py-2">Which members of this group are allowed to post into the activity feed?</p>
                <FormControlLabel value="E" control={<Radio />} label="All group members" />
                <FormControlLabel value="M" control={<Radio />} label="Organizers and Moderators only" />
                <FormControlLabel value="A" control={<Radio />} label="Organizers only" />
              </RadioGroup>
            </div>

            {/*Group Medias*/}
            <div className="mb-10">
              <p className="text-base lg:text-xl font-semibold">{"Group Medias"}</p>
              <div className="w-full h-[1px] bg-gray-300 my-4"></div>
              <RadioGroup
                onChange={(e) => setGroupMedia(e.target.value)}
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={groupMedia}
                name="groupMedias"
              >
                <p className="lg:text-lg text-base py-2">Which members of this group are allowed to upload medias?</p>
                <FormControlLabel value="E" control={<Radio />} label="All group members" />
                <FormControlLabel value="M" control={<Radio />} label="Organizers and Moderators only" />
                <FormControlLabel value="A" control={<Radio />} label="Organizers only" />
              </RadioGroup>
            </div>

            {/*Group Messages*/}
            <div className="mb-10">
              <p className="text-base lg:text-xl font-semibold">{"Group Messages"}</p>
              <div className="w-full h-[1px] bg-gray-300 my-4"></div>
              <RadioGroup
                onChange={(e) => setCanMessageInGroup(e.target.value)}
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={canMessageInGroup}
                name="canMessageInGroup"
              >
                <p className="lg:text-lg text-base py-2">Which members of this group are allowed to send group messages?</p>
                <FormControlLabel value="E" control={<Radio />} label="All group members" />
                <FormControlLabel value="M" control={<Radio />} label="Organizers and Moderators only" />
                <FormControlLabel value="A" control={<Radio />} label="Organizers only" />
              </RadioGroup>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => handleSubmit()}
                className="btn btn-primary mt-2 lg:mt-4 normal-case hover:bg-secondary w-full rounded-xl text-base-100 py-1 text-base md:w-2/5"
              >
                {isLoading ? <Loader /> : "Save settings"}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

SettingsTab.propTypes = {
  communityData: PropTypes.object,
};

export default SettingsTab;
