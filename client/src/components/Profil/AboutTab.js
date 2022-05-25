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
    },
    {
      name: "Last Name",
      value: user?.lastName,
    },
    {
      name: "Nick Name",
      value: user?.nickName,
    },
    {
      name: "Birth Date",
      value: format(new Date(user?.birthday), "MMMM dd, yyyy"),
    },
    {
      name: "Gender",
      value: user?.gender === "m" ? "male" : "female",
    },
    {
      name: "Interested By",
      value: user?.interestedBy === "m" ? "male" : "female",
    },
    {
      name: "Language",
      value: user?.language,
    },
  ];

  const objectContact = [
    {
      name: "Email",
      value: user?.email,
    },
    {
      name: "Telephone",
      value: user?.telephone,
    },
    {
      name: "Website",
      value: user?.website,
    },
    {
      name: "Facebook",
      value: user?.facebook,
    },
    {
      name: "Twitter",
      value: user?.twitter,
    },
    {
      name: "Instagram",
      value: user?.instagram,
    },
  ];

  const objectPlaces = [
    {
      name: "Current city",
      value: user?.country,
    },
    {
      name: "Hometown",
      value: user?.country,
    },
  ];

  const objectWorkedExperience = [
    {
      name: "Job Title",
      value: "Developer",
    },
  ];

  const objectBiography = [
    {
      name: "Biography",
      value: user?.about,
    },
  ];

  return (
    <>
      <div className="mb-10">
        <ViewDetails title="General Information" user={objectDetails} />
      </div>
      <div className="mb-10">
        <ViewDetails title="Contact Info" user={objectContact} />
      </div>
      <div className="mb-10">
        <ViewDetails title="Places Lived" user={objectPlaces} />
      </div>
      <div className="mb-10">
        <ViewDetails title="Work Experience" user={objectWorkedExperience} />
      </div>
      <div className="mb-10">
        <ViewDetails title="Biography" user={objectBiography} />
      </div>
    </>
  );
};

AboutTab.propTypes = {
  user: PropTypes.object,
};

export default AboutTab;
