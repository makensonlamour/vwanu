import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AlbumList = ({ user }) => {
  console.log(user);
  const medias = [
    { id: 1, src: "https://source.unsplash.com/user/c_v_r", name: "Party", createdAt: "April 16, 2022" },
    { id: 2, src: "https://source.unsplash.com/user/c_v_r", name: "Architecture", createdAt: "April 16, 2022" },
    { id: 3, src: "https://source.unsplash.com/user/c_v_r", name: "Foods", createdAt: "April 16, 2022" },
    { id: 4, src: "https://source.unsplash.com/user/c_v_r", name: "Fashions", createdAt: "April 16, 2022" },
    { id: 5, src: "https://source.unsplash.com/user/c_v_r", name: "Explore", createdAt: "April 16, 2022" },
  ];
  return (
    <>
      <>
        {medias?.length > 0 ? (
          <div className="mx-auto w-full">
            <div className="flex flex-wrap justify-start">
              {medias?.map((media) => {
                return (
                  <Link
                    style={{ backgroundImage: `url('${media?.src}')` }}
                    to={"#"}
                    key={media?.id}
                    className="shadow-sm rounded-lg w-[170px] h-[170px] mx-3 mt-3 mb-3 hover:shadow-lg"
                  >
                    <div className=" ">
                      <span className="text-lg text-white font-semibold">{media?.name}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : null}
      </>
    </>
  );
};

AlbumList.propTypes = {
  user: PropTypes.object.isRequired,
};

export default AlbumList;
