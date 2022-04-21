import React from "react";
import PropTypes from "prop-types";
import EditProfileTabs from "../../features/user/Profile/component/EditProfileTabs";

const EditProfile = ({ user }) => {
  return (
    <>
      <EditProfileTabs user={user} />
    </>
  );
};

EditProfile.propTypes = {
  user: PropTypes.object,
};

export default EditProfile;
