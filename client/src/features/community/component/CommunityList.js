import React from "react";
import PropTypes from "prop-types";
import CardCommunity from "../../../components/Profil/CommunityTab/CardCommunity";
// import { useGetAlbumList } from "../albumSlice";
// import { format } from "date-fns";

const CommunityList = () => {
  //   const { data: albums } = useGetAlbumList(["user", "albums"], true, user?.id);
  const community = [
    {
      id: 1,
      coverPicture: "https://picsum.photos/600/600?random=1",
      profilePicture: "https://picsum.photos/200/300?random=2",
      name: "Sports Players",
      privacy: "Public",
      type: "Club",
      statut: "Organizer",
    },
    {
      id: 2,
      coverPicture: "https://picsum.photos/600/600?random=1",
      profilePicture: "https://picsum.photos/200/300?random=2",
      name: "Coffee Addicts",
      privacy: "Private",
      type: "Meetup",
      statut: "Organizer",
    },
    {
      id: 3,
      coverPicture: "https://picsum.photos/600/600?random=1",
      profilePicture: "https://picsum.photos/200/300?random=2",
      name: "Sports Players",
      privacy: "Private",
      type: "Meetup",
      statut: "Organizer",
    },
    {
      id: 4,
      coverPicture: "https://picsum.photos/600/600?random=1",
      profilePicture: "https://picsum.photos/200/300?random=2",
      name: "Lorem ipsum",
      privacy: "Hidden",
      type: "Club",
      statut: "Organizer",
    },
  ];
  console.log(community);

  return (
    <>
      <div className="">
        {community?.length > 0 ? (
          <div className="flex flex-wrap lg:justify-between py-2">
            {community?.map((item) => {
              return (
                <div key={item?.name} className="w-[48%] my-2">
                  <CardCommunity data={item} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="">
            <p className="">No Community</p>
          </div>
        )}
      </div>
    </>
  );
};

CommunityList.propTypes = {
  user: PropTypes.object.isRequired,
  fn: PropTypes.func,
  setAlbum: PropTypes.func,
  setAlbumId: PropTypes.func,
};

export default CommunityList;
