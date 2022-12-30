import React, { useEffect, useRef, useState } from "react";
import { useDebouncedState } from "@mantine/hooks";
import PropTypes from "prop-types";
import { useSearch, useCommunitySearch, useBlogSearch } from "../../features/search/searchSlice";
import { AiOutlineClose } from "react-icons/ai";

const Search = ({ placeholder, setIsSearchOpen }) => {
  const [keyword, setKeyword] = useDebouncedState("", 200);
  const [filterSearch, setFilterSearch] = useState("");
  const {
    data: filterData,
    isError,
    isLoading,
  } = useSearch(
    ["search", "member", keyword],
    keyword !== "" && (filterSearch === "" || filterSearch === "members") ? true : false,
    keyword
  );

  const {
    data: filterDataCommunity,
    isError: errorCommunity,
    isLoading: loadingCommunity,
  } = useCommunitySearch(["search", "community", keyword], keyword !== "" && filterSearch === "community" ? true : false, keyword);

  const {
    data: filterDataBlog,
    isError: errorBlog,
    isLoading: loadingBlog,
  } = useBlogSearch(["search", "blog", keyword], keyword !== "" && filterSearch === "blogs" ? true : false, keyword);

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
            <button onClick={() => setIsSearchOpen(false)} className="text-primary">
              <AiOutlineClose size={"24px"} className="" />
            </button>
          </span>
          <input
            ref={inputRef}
            onChange={(e) => setKeyword(e?.target?.value)}
            className="w-full outline-1 outline-primary py-2 px-4 border border-gray-300 rounded-lg "
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
          <div onChange={handleChange} className="flex flex-start items-center gap-x-2 my-1">
            <p className="text-sm mr-3">Search by:</p>
            <input type="radio" id="members" name="filter" value="members" />
            <label htmlFor="members" className="text-sm">
              People
            </label>

            <input type="radio" id="blogs" name="filter" value="blogs" />
            <label htmlFor="blogs" className="text-sm">
              Blog
            </label>

            <input type="radio" id="community" name="filter" value="community" />
            <label htmlFor="community" className="text-sm">
              Community
            </label>
          </div>
          {isLoading || loadingCommunity || loadingBlog ? (
            <li>
              <p className="text-center py-4 text-lg">Loading...</p>
            </li>
          ) : isError || errorCommunity || errorBlog ? (
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
                  className="pointer py-1 px-2 text-sm hover:bg-placeholder-color rounded-lg"
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
                    <p className="text-sm font-500 align-center">{data?.firstName + " " + data?.lastName}</p>
                  </div>
                </li>
              );
            })
          ) : filterDataCommunity?.data?.length > 0 ? (
            filterDataCommunity?.data?.slice(0, 10)?.map((data) => {
              return (
                <li
                  onClick={() => {
                    setIsSearchOpen(false);
                    window.location.href = `../../groups/${data?.id}`;
                  }}
                  className="pointer py-1 px-2 text-sm hover:bg-placeholder-color rounded-lg"
                  key={data?.id}
                >
                  <div className="basis-[80%] flex items-center">
                    <div className="mr-4 w-10 h-10">
                      <img
                        src={data?.profilePicture}
                        alt={data?.firstName + " " + data?.lastName}
                        className="mask mask-squircle w-10 h-10"
                      />
                    </div>
                    <p className="text-sm font-500 align-center">{data?.name}</p>
                  </div>
                </li>
              );
            })
          ) : filterDataBlog?.data?.length > 0 ? (
            filterDataBlog?.data?.slice(0, 10)?.map((data) => {
              return (
                <li
                  onClick={() => {
                    setIsSearchOpen(false);
                    window.location.href = `../../blogs/${data?.id}`;
                  }}
                  className="pointer py-1 px-2 text-sm hover:bg-placeholder-color rounded-lg"
                  key={data?.id}
                >
                  <div className="basis-[80%] flex items-center">
                    <div className="mr-4">
                      <img src={data?.coverPicture} alt={data?.blogTitleblogTitle} className="mask mask-squircle w-10 h-10" />
                    </div>
                    <p className="text-sm font-500 align-center">{data?.blogTitle}</p>
                  </div>
                </li>
              );
            })
          ) : (
            <li>
              <p className="text-center py-2 text-sm">No results</p>
            </li>
          )}
        </ul>
      </div>
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
