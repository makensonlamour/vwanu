import React from "react";

const ForumTab = () => {
  return (
    <>
      <div className="bg-white border border-gray-300 py-10 px-2 md:px-16 rounded-xl w-full">
        <h4 className="md:text-left text-center mb-4a text-lg font-semibold">{`Forum`}</h4>
        <div className="">
          <p className="text-sm">
            {
              "Connect a discussion forum to allow members of this group to communicate in a structured, bulletin-board style fashion. Unchecking this option will not delete existing forum content."
            }
          </p>
          <div className="flex mt-6">
            <label className="flex items-center">
              <input type="checkbox" className="checked:bg-green-500 cursor-pointer w-12 h-12 border-3 border-rose-500 rounded-lg" />
              <span className="ml-2">Discussion Forum</span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForumTab;
