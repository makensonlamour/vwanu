import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSearch } from "../searchSlice";
import { useOutletContext } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

const InputSearch = ({ selectMember, handleAdd, handleRemove, placeholder, setIsSearchOpen }) => {
  const user = useOutletContext();
  const [keyword, setKeyword] = useState("");
  const { data: filterData, isError, isLoading } = useSearch(["search", keyword], keyword === "" ? false : true, keyword);

  function isIntoArray(data) {
    let memb = selectMember?.filter((member) => member?.id === data?.id);
    return memb?.length === 0 ? false : true;
  }
  console.log(filterData);

  return (
    <>
      <div className="flex flex-wrap p-2 lg:p-4 mt-2 lg:mt-4">
        <div className="w-full relative text-gray-400 focus-within:text-gray-400">
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <button onClick={() => setIsSearchOpen(false)} className="">
              <AiOutlineClose size={"24px"} className="" />
            </button>
          </span>
          <input
            onChange={(e) => setKeyword(e?.target?.value)}
            className="w-full outline-0 py-2 px-4 border border-gray-300 rounded-lg"
            placeholder={placeholder}
          />
        </div>
      </div>
      <div className="bg-white">
        {isLoading ? (
          <p className="text-center py-4 text-lg">Loading...</p>
        ) : isError ? (
          <p className="text-center py-4 text-lg">{`Sorry, Something went wrong ;(`}</p>
        ) : (
          <>
            <div className="py-2 lg:py-4">
              {filterData?.length > 0 &&
                filterData?.slice(0, 10)?.map((data) => {
                  return (
                    <>
                      <div className="flex justify-between items-center px-2 py-2 lg:p-2 hover:bg-placeholder-color rounded-xl">
                        <div className="basis-[80%] flex items-center">
                          <div className="mr-4">
                            <img
                              src={data?.profilePicture}
                              alt={data?.firstName + " " + data?.lastName}
                              className="mask mask-squircle w-10 h-10"
                            />
                          </div>
                          <p className="text-lg font-500 align-center">{data?.firstName + " " + data?.lastName}</p>
                        </div>
                        {user?.id !== data?.id && (
                          <div className="">
                            {isIntoArray(data) ? (
                              <button onClick={handleRemove(data)}>remove</button>
                            ) : (
                              <button onClick={() => handleAdd(data)}>add</button>
                            )}
                          </div>
                        )}
                      </div>
                    </>
                  );
                })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

InputSearch.propTypes = {
  handleAdd: PropTypes.func,
  handleRemove: PropTypes.func,
  selectMember: PropTypes.array,
  placeholder: PropTypes.string,
  setIsSearchOpen: PropTypes.bool,
};

export default InputSearch;
