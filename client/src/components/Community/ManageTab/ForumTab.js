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
        </div>
      </div>
    </>
  );
};

export default ForumTab;
