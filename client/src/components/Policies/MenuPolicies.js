import React from "react";
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const MenuPolicies = ({ data = [] }) => {
  return (
    <div className="border border-gray-100 lg:w-[30%]">
      {data &&
        data?.map((item, idx) => {
          return (
            <a href={`#${item?.path}`} key={item?.name} className="font-semibold text-primary hover:text-secondary block">
              {`${idx + 1}.  `}
              {item?.name}
            </a>
          );
        })}
    </div>
  );
};

MenuPolicies.propTypes = { data: PropTypes.array };

export default MenuPolicies;
