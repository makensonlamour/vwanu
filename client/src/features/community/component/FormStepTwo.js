/*eslint-disable*/
import React, { useState } from "react";
import PropTypes from "prop-types";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../../components/common/Loader";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { Form } from "../../../components/form";
import { useUpdateCommunity } from "../communitySlice";

//Functions for notification after actions
const updateSuccess = () =>
  toast.success("Profile updated successfully!", {
    position: "top-center",
  });

const updateError = () =>
  toast.error("Sorry. Error on updating profile!", {
    position: "top-center",
  });

const FormStepTwo = ({ setStep, currentStep, data, setData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const updateCommunity = useUpdateCommunity(["community", data?.id], data?.id, undefined, undefined);
  //data
  //A=administrator M=moderators E=members
  const [privacyType, setPrivacyType] = useState(data?.privacyType);
  const [canInvite, setCanInvite] = useState(data?.canInvite);
  const [canInPost, setCanInPost] = useState(data?.canInPost);
  const [groupMedia, setGroupMedia] = useState(data?.canInUploadPhotos);
  const [canMessageInGroup, setCanMessageInGroup] = useState(data?.canMessageInGroup);
  // const [canInvite, setCanInvite] = useState("organizers");
  // const [canInPost, setCanInPost] = useState("members");
  // const [groupMedia, setGroupMedia] = useState("members");
  // const [canMessageInGroup, setCanMessageInGroup] = useState("moderators");

  const handleNext = async () => {
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
      setData(result?.data);
      setStep(currentStep + 1);
      //   window.location.reload();
    } catch (e) {
      console.log(e);
      updateError();
    } finally {
      setIsLoading(false);
      console.log(data);
    }
  };
  const handlePrevious = () => {
    setData(data);
    setStep(currentStep - 1);
  };
  return (
    <>
      <div className="py-2 lg:mx-24">
        <Form className="w-full">
          <Toaster />

          {/*Privacy Options*/}
          <div className="mb-4">
            <p className="text-xl font-semibold">{"Privacy Options"}</p>
            <div className="w-full h-[1px] bg-gray-300 my-4"></div>
            <RadioGroup
              onChange={(e) => setPrivacyType(e.target.value)}
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={privacyType}
              name="privacyType"
            >
              <FormControlLabel value="public" control={<Radio />} label="This is a public group" />
              <ul className="list-disc mb-4 ml-12 pl-1">
                <li>Any site member can join this group.</li>
                <li>This group will be listed in the groups directory and in search results.</li>
                <li>Group content and activity will be visible to any site member.</li>
              </ul>
              <FormControlLabel value="private" control={<Radio />} label="This is a private group" />
              <ul className="list-disc mb-4 ml-12 pl-1">
                <li>Only people who request membership and are accepted can join the group.</li>
                <li>This group will be listed in the groups directory and in search results.</li>
                <li>Group content and activity will only be visible to members of the group.</li>
              </ul>
              <FormControlLabel value="hidden" control={<Radio />} label="This is a hidden group" />
              <ul className="list-disc mb-4 ml-12 pl-1">
                <li>Only people who are invited can join the group.</li>
                <li>This group will not be listed in the groups directory or search results.</li>
                <li>This group will not be listed in the groups directory or search results.</li>
              </ul>
            </RadioGroup>
          </div>

          {/*Community Invitations*/}
          <div className="mb-10">
            <p className="text-xl font-semibold">{"Community Invitations"}</p>
            <div className="w-full h-[1px] bg-gray-300 my-4"></div>
            <RadioGroup
              onChange={(e) => setCanInvite(e.target.value)}
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={canInvite}
              name="canInvite"
            >
              <p className="text-lg py-2">Which members of this group are allowed to invite others?</p>
              <FormControlLabel value="E" control={<Radio />} label="All group members" />
              <FormControlLabel value="M" control={<Radio />} label="Organizers and Moderators only" />
              <FormControlLabel value="A" control={<Radio />} label="Organizers only" />
            </RadioGroup>
          </div>

          {/*Activity Feeds*/}
          <div className="mb-10">
            <p className="text-xl font-semibold">{"Activity Feeds"}</p>
            <div className="w-full h-[1px] bg-gray-300 my-4"></div>
            <RadioGroup
              onChange={(e) => setCanInPost(e.target.value)}
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={canInPost}
              name="canInPost"
            >
              <p className="text-lg py-2">Which members of this group are allowed to post into the activity feed?</p>
              <FormControlLabel value="E" control={<Radio />} label="All group members" />
              <FormControlLabel value="M" control={<Radio />} label="Organizers and Moderators only" />
              <FormControlLabel value="A" control={<Radio />} label="Organizers only" />
            </RadioGroup>
          </div>

          {/*Group Medias*/}
          <div className="mb-10">
            <p className="text-xl font-semibold">{"Group Medias"}</p>
            <div className="w-full h-[1px] bg-gray-300 my-4"></div>
            <RadioGroup
              onChange={(e) => setGroupMedia(e.target.value)}
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={groupMedia}
              name="groupMedias"
            >
              <p className="text-lg py-2">Which members of this group are allowed to upload medias?</p>
              <FormControlLabel value="E" control={<Radio />} label="All group members" />
              <FormControlLabel value="M" control={<Radio />} label="Organizers and Moderators only" />
              <FormControlLabel value="A" control={<Radio />} label="Organizers only" />
            </RadioGroup>
          </div>

          {/*Group Messages*/}
          <div className="mb-10">
            <p className="text-xl font-semibold">{"Group Messages"}</p>
            <div className="w-full h-[1px] bg-gray-300 my-4"></div>
            <RadioGroup
              onChange={(e) => setCanMessageInGroup(e.target.value)}
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={canMessageInGroup}
              name="canMessageInGroup"
            >
              <p className="text-lg py-2">Which members of this group are allowed to send group messages?</p>
              <FormControlLabel value="E" control={<Radio />} label="All group members" />
              <FormControlLabel value="M" control={<Radio />} label="Organizers and Moderators only" />
              <FormControlLabel value="A" control={<Radio />} label="Organizers only" />
            </RadioGroup>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => handlePrevious()}
              className="btn btn-primary mt-4 normal-case hover:bg-secondary w-full rounded-2xl text-base-100 py-1 text-md md:w-1/5"
            >
              {isLoading ? <Loader /> : "Previous Step"}
            </button>
            <button
              onClick={() => handleNext()}
              className="btn btn-primary mt-4 normal-case hover:bg-secondary w-full rounded-2xl text-base-100 py-1 text-md md:w-1/5"
            >
              {isLoading ? <Loader /> : "Next Step"}
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

FormStepTwo.propTypes = {
  setStep: PropTypes.func.isRequired,
  currentStep: PropTypes.number,
  setData: PropTypes.func,
  data: PropTypes.object,
};

export default FormStepTwo;
