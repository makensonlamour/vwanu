import React from "react";
import PropTypes from "prop-types";
const AboutTab = ({ user }) => {
  return (
    <>
      {console.log(user)}
      <div className="bg-white w-full rounded-lg mx-2 border p-4">
        <h4 className="text-secondary font-semibold">About</h4>
        {/*Tab for About goes here*/}
      </div>
    </>
  );
};

AboutTab.propTypes = {
  user: PropTypes.object,
};

export default AboutTab;
