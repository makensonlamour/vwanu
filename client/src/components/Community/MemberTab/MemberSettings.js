import React from "react";
import PropTypes from "prop-types";
import { useOutletContext } from "react-router-dom";

const MemberSettings = ({ data }) => {
  const user = useOutletContext();
  return (
    <>
      <div className="mt-8">
        {data?.length > 0 &&
          data?.map((member) => {
            return (
              <div key={member?.id} className="border border-gray-200 p-4">
                <div className="flex justify-start items-center">
                  <div className="mr-3">
                    <img src={member?.User?.profilePicture} alt={"_profilePicture"} className="mask mask-squircle w-10 h-10" />
                  </div>
                  <div className="text-md">
                    <p className="">{member?.User?.firstName + " " + member?.User?.lastName}</p>
                    {user?.id !== member?.UserId && (
                      <div className="py-2 flex justify-start">
                        {member?.UserId !== user?.id && member?.CommunityRole?.name === "member" && (
                          <button className="text-xs w-fit bg-secondary text-white px-2 mr-2 py-[0.1rem] rounded-lg hover:bg-primary">
                            {"Kick & Ban"}
                          </button>
                        )}
                        {member?.UserId !== user?.id &&
                          (member?.CommunityRole?.name === "member" || member?.CommunityRole?.name === "moderator") && (
                            <button className="text-xs w-fit bg-secondary text-white px-2 mr-2 py-[0.1rem] rounded-lg hover:bg-primary">
                              {member?.CommunityRole?.name === "member" ? "Promote to Moderator" : "Demote to regular member"}
                            </button>
                          )}
                        {user?.id !== member?.UserId && member?.CommunityRole?.name !== "admin" && (
                          <button className="text-xs w-fit bg-secondary text-white px-2 mr-2 py-[0.1rem] rounded-lg hover:bg-primary">
                            {"Promote to Administrator"}
                          </button>
                        )}
                        {user?.id !== member?.UserId && member?.CommunityRole?.name === "member" && (
                          <button className="text-xs w-fit bg-secondary text-white px-2 mr-2 py-[0.1rem] rounded-lg hover:bg-primary">
                            {"Remove from Group"}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

MemberSettings.propTypes = {
  data: PropTypes.array.isRequired,
};

export default MemberSettings;
