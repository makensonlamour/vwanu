import React from "react";
import Step from "./Step";
import ViewFriend from "../../../components/Profil/ViewFriend";
import { useGetAllMembers } from "../../../features/user/userSlice";
import useAuth from "../../../hooks/useAuth";

const StepFour = () => {
  const { user } = useAuth();
  const { data: listMember } = useGetAllMembers(["user", "friend"], user?.user?.id === "undefined" ? false : true, user?.user?.id);

  return (
    <>
      <div>
        <Step step={4} className="step-primary" />
        <div className="w-full m-auto px-20">
          <h1 className="py-4 text-center card-title text-black">Find Friends</h1>
          <ViewFriend data={listMember?.data?.data} noDataLabel={"No Suggested Members"} />
          <div className="flex justify-center">
            <button
              onClick={() => window.location.reload()}
              className="m-auto w-1/2 bg-primary px-6 py-4 rounded-xl text-base-100 mt-6 hover:bg-secondary"
            >
              Finish
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepFour;
