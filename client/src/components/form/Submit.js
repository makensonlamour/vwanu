import React from "react";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../store/auth";
import Loader from "../common/Loader";

function SubmitBtn({ title, className, ...otherProps }) {
  const { handleSubmit } = useFormikContext();
  let currentUser = useSelector(getCurrentUser);
  const auth = currentUser;
  let isLoading = auth?.loading;

  return (
    <button
      type="submit"
      className={"btn btn-primary mt-4 normal-case text-base-100 hover:bg-secondary " + className}
      {...otherProps}
      onClick={handleSubmit}
    >
      {isLoading ? <Loader /> : title}
    </button>
  );
}

SubmitBtn.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default SubmitBtn;
