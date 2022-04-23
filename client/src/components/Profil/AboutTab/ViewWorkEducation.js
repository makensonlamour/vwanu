import React from "react";
import Proptypes from "prop-types";

const ViewWorkEducation = ({ user }) => {
  return (
    <>
      {console.log(user)}
      {/*}
      <div>
        <ul>
          <li>FirstName: {user?.firstName}</li>
          <li>lastName: {user?.lastName}</li>
        </ul>
      </div>
  {*/}
    </>
  );
};

ViewWorkEducation.propTypes = {
  user: Proptypes.object,
};

export default ViewWorkEducation;
