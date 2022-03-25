import React from "react";

const InputModal = () => {
  return (
    <div>
      <label
        For="my-modal-4"
        className="btn modal-button mt-1 lg:mt-2 bg-blue-200 text-secondary placeholder:text-secondary font-semibold rounded-full input-secondary border-none "
      >
        <p>{`What's on your mind?`}</p>
      </label>

      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label For="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" For="">
          <h3 className="text-lg font-bold">Congratulations random Interner user!</h3>
          <button>Publish</button>
          <p className="py-4">{`You've been selected for a chance to get one year of subscription to use Wikipedia for free!`}</p>
        </label>
      </label>
    </div>
  );
};

export default InputModal;
