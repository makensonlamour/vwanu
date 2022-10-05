import React, { useState } from "react";
// import PreviewUrl from "./../../components/common/PreviewUrl";
import UploadAvatar2 from "../../components/form/uploadAvatar2";

const TestSingleComponent = () => {
  const [avatarState, setAvatarState] = useState(false);
  console.log(avatarState);
  return (
    <>
      <div className="m-10 w-[50%]">
        <UploadAvatar2 id={"img"} avatarState={avatarState} setAvatarState={setAvatarState} icon={"add"} />
      </div>
    </>
  );
};

export default TestSingleComponent;
