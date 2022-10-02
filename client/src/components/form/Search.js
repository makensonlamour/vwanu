import React, { useEffect, useRef, useState } from "react";
import { useDebouncedState } from "@mantine/hooks";
import PropTypes from "prop-types";
import { useSearch } from "../../features/search/searchSlice";
// import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

const Search = ({ placeholder, setIsSearchOpen }) => {
  //   const user = useOutletContext();
  //   const navigate = useNavigate();
  const [keyword, setKeyword] = useDebouncedState("", 200);
  const [filterSearch, setFilterSearch] = useState("");
  const { data: filterData, isError, isLoading } = useSearch(["search", keyword], keyword === "" ? false : true, keyword);
  console.log("filter", filterSearch);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    setFilterSearch(e.target.value);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <div className="w-full dropdown">
        <div tabIndex={0} className="w-full relative text-gray-400 focus-within:text-gray-400">
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <button onClick={() => setIsSearchOpen(false)} className="">
              <AiOutlineClose size={"24px"} className="" />
            </button>
          </span>
          <input
            ref={inputRef}
            onChange={(e) => setKeyword(e?.target?.value)}
            className="w-full outline-0 py-2 px-4 border border-gray-300 rounded-lg "
            placeholder={
              filterSearch === "" || filterSearch === "members"
                ? placeholder
                : filterSearch === "community"
                ? "Search a Community"
                : "Search a Blog"
            }
          />
        </div>
        <ul tabIndex={0} className="w-full dropdown-content menu p-2 shadow bg-base-100 rounded-b-xl">
          <div onChange={handleChange} className="flex flex-start items-center my-1">
            <p className="text-sm mr-3">Search by:</p>
            <label htmlFor="members" className="mr-1 text-sm">
              members
            </label>
            <input type="radio" id="members" name="filter" value="members" />
            <label htmlFor="blogs" className="mr-1 ml-2 text-sm">
              blogs
            </label>
            <input type="radio" id="blogs" name="filter" value="blogs" />

            <label htmlFor="community" className="mr-1 ml-2 text-sm">
              community
            </label>
            <input type="radio" id="community" name="filter" value="community" />
          </div>
          {isLoading ? (
            <li>
              <p className="text-center py-4 text-lg">Loading...</p>
            </li>
          ) : isError ? (
            <li>
              <p className="text-center py-4 text-lg">{`Sorry, Something went wrong ;(`}</p>
            </li>
          ) : filterData?.data?.length > 0 ? (
            filterData?.data?.slice(0, 10)?.map((data) => {
              return (
                <li
                  onClick={() => {
                    setIsSearchOpen(false);
                    window.location.href = `../../profile/${data?.id}`;
                  }}
                  className="pointer py-2 px-2 hover:bg-placeholder-color rounded-xl"
                  key={data?.id}
                >
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
                </li>
              );
            })
          ) : (
            <li>
              <p className="text-center py-4 text-lg">No results</p>
            </li>
          )}
        </ul>
      </div>

      {/* <div className="flex flex-wrap items-center">
        <div className="w-full relative text-gray-400 focus-within:text-gray-400">
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <button onClick={() => setIsSearchOpen(false)} className="">
              <AiOutlineClose size={"24px"} className="" />
            </button>
          </span>
          <input
            onChange={(e) => setKeyword(e?.target?.value)}
            className="w-full outline-0 py-2 px-4 border border-gray-300 rounded-lg "
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
            <div className="py-4 z-50">
              {filterData?.data?.length > 0 &&
                filterData?.data?.slice(0, 10)?.map((data) => {
                  return (
                    <>
                      <div className="flex justify-between items-center p-2 hover:bg-placeholder-color rounded-xl">
                        <div className="basis-[80%] flex items-center">
                          <div className="mr-4">
                            <img
                              src={data?.profilePicture}
                              alt={data?.firstName + " " + data?.lastName}
                              className="mask mask-squircle w-10 h-10"
                            />
                          </div>
                          <p classsName="text-lg font-500 align-center">{data?.firstName + " " + data?.lastName}</p>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
          </>
        )}
      </div> */}
    </>
  );
};

Search.propTypes = {
  setToggleBackdrop: PropTypes.func,
  selectMember: PropTypes.array,
  placeholder: PropTypes.string,
  setIsSearchOpen: PropTypes.bool,
};

export default Search;
