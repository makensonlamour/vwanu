import React from "react";
import PropTypes from "prop-types";

// eslint-disable-next-line no-unused-vars
const CustomModal = ({ modal, setModal, trigger, content, title, closeIcon, width = "sm", height = "fit", noButton = false }) => {
  return (
    <>
      {noButton ? null : trigger}
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-[1000]">
          <div className={`bg-white p-2 rounded w-full max-w-md lg:max-w-${width} h-${height}`}>
            <div className="flex justify-between">
              <p className="">{title}</p>
              <div className="cursor-pointer" onClick={() => setModal(!modal)}>
                {closeIcon}
              </div>
            </div>
            <div>{content}</div>
          </div>
        </div>
      )}
    </>
  );
};

CustomModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  setModal: PropTypes.func.isRequired,
  trigger: PropTypes.any.isRequired,
  title: PropTypes.string,
  classNameContainer: PropTypes.string,
  styleContainer: PropTypes.string,
  content: PropTypes.any,
  width: PropTypes.string,
  height: PropTypes.string,
  closeIcon: PropTypes.any,
  noButton: PropTypes.bool,
};

export default CustomModal;
