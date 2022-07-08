import React from "react";
import PropTypes from "prop-types";
import CardCommunity from "../../../components/Profil/CommunityTab/CardCommunity";
// import { format } from "date-fns";

const CommunityList = ({ communityList }) => {
  return (
    <>
      <div className="">
        {communityList?.data?.length > 0 ? (
          <div className="flex flex-wrap lg:justify-between py-2">
            {communityList?.data?.map((item) => {
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
  communityList: PropTypes.array.isRequired,
};

export default CommunityList;
