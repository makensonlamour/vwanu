import React from "react";
import PropTypes from "prop-types";
import ViewDetails from "./AboutTab/ViewDetails";
import { format } from "date-fns";

const AboutTab = ({ user }) => {
  //object destructuring
  const objectDetails = [
    {
      name: "First Name",
      value: user?.firstName,
      view: true,
    },
    {
      name: "Last Name",
      value: user?.lastName,
      view: true,
    },
    {
      name: "Nick Name",
      value: user?.nickName,
      view: true,
    },
    {
      name: "Birth Date",
      value: format(new Date(user?.birthday), "MMMM dd, yyyy"),
      hideName: "birthdayPrivacy",
      view: user?.birthdayPrivacy,
    },
    {
      name: "Gender",
      value: user?.gender === "m" ? "male" : "female",
      view: true,
    },
    {
      name: "Interest",
      value: user?.Interests,
      view: true,
    },
    {
      name: "Language",
      value: user?.language,
      view: true,
    },
  ];

  const objectContact = [
    {
      name: "Email",
      value: user?.email,
      hideName: "emailPrivacy",
      view: user?.emailPrivacy,
    },
    {
      name: "Telephone",
      value: user?.phone,
      hideName: "phonePrivacy",
      view: user?.phonePrivacy,
    },
    {
      name: "Website",
      value: user?.website,
      hideName: "websitePrivacy",
      view: user?.websitePrivacy,
    },
    {
      name: "Facebook",
      value: user?.facebook,
      hideName: "facebookPrivacy",
      view: user?.facebookPrivacy,
    },
    {
      name: "Twitter",
      value: user?.twitter,
      hideName: "twitterPrivacy",
      view: user?.twitterPrivacy,
    },
    {
      name: "Instagram",
      value: user?.instagram,
      hideName: "instagramPrivacy",
      view: user?.instagramPrivacy,
    },
    {
      name: "Linkedin",
      value: user?.linkedin,
      hideName: "linkedinPrivacy",
      view: user?.linkedinPrivacy,
    },
    {
      name: "Tiktok",
      value: user?.tiktok,
      hideName: "tiktokPrivacy",
      view: user?.tiktokPrivacy || true,
    },
    {
      name: "Youtube",
      value: user?.youtube,
      hideName: "youtubePrivacy",
      view: user?.youtubePrivacy,
    },
  ];

  const objectPlaces = [
    {
      name: "Current city",
      value: user?.country,
      view: true,
    },
    {
      name: "Hometown",
      value: user?.country,
      view: true,
    },
  ];

  const objectWorkedExperience = [
    {
      name: "Job Title",
      value: "Developer",
      view: true,
    },
  ];

  const objectBiography = [
    {
      name: "Biography",
      value: user?.about,
      view: true,
    },
  ];

  return (
    <>
      <div className="mb-10">
        <ViewDetails substabs={"general"} title="General Information" user={objectDetails} />
      </div>
      <div className="mb-10">
        <ViewDetails substabs={"contact"} title="Contact Info" user={objectContact} />
      </div>
      <div className="mb-10">
        <ViewDetails substabs={"place"} title="Places Lived" user={objectPlaces} />
      </div>
      <div className="mb-10">
        <ViewDetails substabs={"work"} title="Work Experience" user={objectWorkedExperience} />
      </div>
      <div className="mb-10">
        <ViewDetails substabs={"biography"} title="Biography" user={objectBiography} />
      </div>
    </>
  );
};

AboutTab.propTypes = {
  user: PropTypes.object,
};

export default AboutTab;
