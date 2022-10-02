import React from "react";
import Step from "./Step";
import ViewFriend from "../../../components/Profil/ViewFriend";
import { useGetSuggestMembers } from "../../../features/user/userSlice";
import useAuth from "../../../hooks/useAuth";

const StepFour = () => {
  const { user } = useAuth();
  var randomItem =
    user !== undefined && user?.Interests !== null ? user?.Interests[Math.floor(Math.random() * user?.Interests?.length)] : undefined;

  const {
    data: listMember,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useGetSuggestMembers(["community", "suggest"], randomItem !== undefined ? true : false, randomItem?.name);

  return (
    <>
      <div>
        <Step step={4} className="step-primary" />
        <div className="w-full m-auto px-20">
          <h1 className="py-4 text-center card-title text-black">Find Friends</h1>
          <ViewFriend data={listMember} isLoading={isLoading} isError={isError} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
          <div className="flex justify-center">
            <button
              onClick={() => window.location.reload()}
              className="m-auto py-2 w-fit bg-primary px-6 rounded-xl text-base-100 mt-6 hover:bg-secondary"
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
