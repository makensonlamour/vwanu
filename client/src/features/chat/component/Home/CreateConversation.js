/*eslint-disable */
import React, { useState } from "react";
import PropTypes from "prop-types";
import InputSearch from "../../../search/components/InputSearch";
import Chip from "@mui/material/Chip";
import { BsSearch } from "react-icons/bs";

// import { IMAGE_PROXY, THEMES } from "../../shared/constants";

// import Spin from "react-cssfx-loading/src/Spin";
// import { useNavigate } from "react-router-dom";
// import { cleanup } from "@testing-library/react";
import InputMessage from "./../message/InputMessage";

const CreateConversation = ({ setIsOpened }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectMember, setSelectMember] = useState([]);
  const handleRemove = (chipToDelete) => () => {
    setSelectMember((chips) => chips.filter((chip) => chip.id !== chipToDelete.id));
  };

  const handleAdd = (data) => {
    setIsLoading(true);
    setSelectMember((selectMember) => [...selectMember, data]);
    setIsLoading(false);
  };

  return (
    <>
      <div className="w-full">
        <div className="py-[1.60rem] px-10">
          <p className="text-xl font-semibold">New Message</p>
        </div>
        <div className="h-[1px] w-full bg-gray-200"></div>
        <div className="grid grid-rows-4 max-h-full h-full">
          <div className="overflow-auto row-span-3">
            <div className="flex justify-between items-center">
              <div className="flex flex-wrap px-4 mt-2">
                {selectMember?.map((data) => {
                  return (
                    <div className="mr-2 mb-2" key={data?.id}>
                      <Chip label={data.firstName + " " + data?.lastName} onDelete={handleRemove(data)} />
                    </div>
                  );
                })}
              </div>
              {!(selectMember?.length == 0 || isSearchOpen) && (
                <button className="text-gray-400" onClick={() => setIsSearchOpen(true)}>
                  <BsSearch size={"24px"} className="" />
                </button>
              )}
            </div>
            {(selectMember?.length == 0 || isSearchOpen) && (
              <InputSearch
                setIsSearchOpen={setIsSearchOpen}
                placeholder={"Type to search a friend"}
                handleAdd={handleAdd}
                handleRemove={handleRemove}
                selectMember={selectMember}
              />
            )}
          </div>
          <div className="row-span-1">
            <InputMessage type={"new_conversation"} selectMember={selectMember} />
          </div>
        </div>
        {/* <div className="mt-10 py-4 px-6">
          <div className="flex justify-between items-center">
            <div className="flex flex-wrap px-4 mt-2">
              {selectMember?.map((data) => {
                return (
                  <div className="mr-2 mb-2" key={data?.id}>
                    <Chip label={data.firstName + " " + data?.lastName} onDelete={handleRemove(data)} />
                  </div>
                );
              })}
            </div>
            {!(selectMember?.length == 0 || isSearchOpen) && (
              <button className="text-gray-400" onClick={() => setIsSearchOpen(true)}>
                <BsSearch size={"24px"} className="" />
              </button>
            )}
          </div>
          {(selectMember?.length == 0 || isSearchOpen) && (
            <InputSearch
              setIsSearchOpen={setIsSearchOpen}
              placeholder={"Type to search a friend"}
              handleAdd={handleAdd}
              handleRemove={handleRemove}
              selectMember={selectMember}
            />
          )}
        </div>
        <div className="absolute bottom-0 w-full">
          <InputMessage type={"new_conversation"} selectMember={selectMember} />
        </div> */}
      </div>
    </>
  );
};

CreateConversation.propTypes = {
  setIsOpened: PropTypes.func.isRequired,
};

export default CreateConversation;
