import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PhotoList = ({ user }) => {
  console.log(user);
  const medias = [
    { id: 1, src: "https://source.unsplash.com/user/c_v_r", name: "John Doe" },
    { id: 2, src: "https://source.unsplash.com/user/c_v_r", name: "Jane Doe" },
    { id: 3, src: "https://source.unsplash.com/user/c_v_r", name: "Lane Doe" },
    { id: 4, src: "https://source.unsplash.com/user/c_v_r", name: "Mayne Doe" },
    { id: 5, src: "https://source.unsplash.com/user/c_v_r", name: "Kes Doe" },
    { id: 6, src: "https://source.unsplash.com/user/c_v_r", name: "Laim Doe" },
    { id: 7, src: "https://source.unsplash.com/user/c_v_r", name: "Ken Doe" },
    { id: 8, src: "https://source.unsplash.com/user/c_v_r", name: "Mayne Dot" },
    { id: 9, src: "https://source.unsplash.com/user/c_v_r", name: "Mace Dot" },
  ];
  return (
    <>
      {medias?.length > 0 ? (
        <div className="mx-auto w-full">
          <div className="flex flex-wrap justify-start">
            {medias?.map((media) => {
              return (
                <Link to={"#"} key={media?.id} className="shadow-sm rounded-lg w-[130px] h-[130px] mx-3 mt-3 mb-3  hover:shadow-lg">
                  <div className=" ">
                    <img
                      className="shadow-sm h-[130px] w-[130px] object-cover rounded-lg hover:shadow-lg hover:brightness-75"
                      src={media?.src}
                      alt={media?.name}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </>
  );
};

PhotoList.propTypes = {
  user: PropTypes.object.isRequired,
};

export default PhotoList;
