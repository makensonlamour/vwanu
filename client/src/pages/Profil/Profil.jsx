import React from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useQueryClient } from "react-query";

import { useGetOtherProfile } from "../../features/user/userSlice";

//Core components
// import Loader from "../../components/common/Loader";
import ProfileHeader from "../../components/Profil/ProfileHeader";

const Profil = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const user = useOutletContext();

  if (user.id === id) {
    console.log();
    queryClient.removeQueries(["user", "otherUser"]);
  }

  const { data: otherUser } = useGetOtherProfile(["user", "otherUser"], user?.id === id ? false : true, id);

  /*   function reloadPage() {
    window.location.reload();
  }

  const isLoading = false;
  const isSuccess = true;
  const isError = false; */

  //generate content post with condition
  /* let content;
  if (isLoading) {
    content = <Loader />;
  } else if (isSuccess) {
    console.log("ok");
    /*
    content = posts?.map((post) => <PostList key={post.id} post={post} />);
    
  } else if (isError) {
    content = (
      <div className="my-20 m-auto text-center lg:pl-14 lg:pr-12 px-2 lg:px-0">
        {"Failed to load post. "}{" "}
        <Link className="text-secondary hover:text-primary" to={""} onClick={() => reloadPage()}>
          Reload the page
        </Link>{" "}
      </div>
    );
  }
 */
  return (
    <>
      <div className="mx-auto px-2">
        <div className="lg:mx-4">
          {user.id === id ? <ProfileHeader user={user} otherUser={null} /> : <ProfileHeader user={user} otherUser={otherUser} />}
        </div>

        {/* <div className="lg:pl-14 lg:pr-12 px-2 lg:px-0">{content}</div> */}
      </div>
    </>
  );
};

export default Profil;
